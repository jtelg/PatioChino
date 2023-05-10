import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import APIConsultas from '../../../services/consultas';
import ModalView from '../../utils/modalView';

const WppBot = (props) => {
  const dispatch = useDispatch();
  const botState = useSelector((s) => s.botState);
  const [botData, setBotData] = useState({ data: 'INIT' });
  const [modalQR, setModalQR] = useState(false);
  const botDataUseHTML = {
    INIT: (
      <button
        onClick={(ev) => initializeBot(ev)}
        className="enviar bg-secondary text-white"
      >
        iniciar Bot
        <span className="material-icons-outlined">smart_toy</span>
      </button>
    ),
    LOADING: (
      <div>
        <p>Cargando datos...</p>
      </div>
    ),
    'QR-CODE': (
      <>
        <button
          onClick={(ev) => initializeBot(ev)}
          className="enviar bg-secondary text-white"
        >
          Escanear QR
          <span className="material-icons-outlined">smart_toy</span>
        </button>
        <ModalView
          open={modalQR}
          titulo="Escanear QR de whatsapp"
          close={() => setModalQR(false)}
        >
          <Image
            src={botData.src}
            width={300}
            height={300}
            alt="qr"
            loading="lazy"
          />
        </ModalView>
      </>
    ),
    READY: (
      <div className="uppercase text-sm font-bold text-secondary mr-2">
        WHATSAPP INICIADO EN +{botData.number}
      </div>
    )
  };
  useEffect(() => {
    const botDataUseJS = {
      INIT: () => {},
      LOADING: () => {
        toast.info('Iniciando whatsapp', {
          autoClose: false,
          position: 'bottom-right'
        });
      },
      'QR-CODE': () => {
        toast.dismiss();
        setModalQR(true);
      },
      READY: () => {
        toast.dismiss();
        setModalQR(false);
        toast.success('Whatsapp inicializado', {
          position: 'bottom-right'
        });
      }
    };
    const fetchData = (data) => {
      setBotData(botState);
      return botDataUseJS[data]();
    };
    if (botState) fetchData(botState.data);
  }, [botState]);
  useEffect(() => {
    const botDataUseJS = {
      INIT: () => {},
      LOADING: () => {
        toast.info('Iniciando whatsapp', {
          autoClose: false,
          position: 'bottom-right'
        });
      },
      'QR-CODE': () => {
        toast.dismiss();
        setModalQR(true);
      },
      READY: () => {
        toast.dismiss();
        setModalQR(false);
      }
    };
    const fetchData = async () => {
      const re = await APIConsultas.usuario.LoadWppBot(true);
      if (re) {
        setBotData(re.response);
        return botDataUseJS[re.response.data]();
      }
    };
    fetchData();
  }, [botState]);

  const initializeBot = (ev) => {
    ev.preventDefault();
    if (botData.data === 'READY') return toast.success('Whatsapp Iniciado');
    // inicializa bot whatsapp
    if (botData.data === 'QR-CODE') {
      return setModalQR(true);
    }
    APIConsultas.usuario.InitWppBot(dispatch, true);
  };
  return (
    <>
      <div className="w-full flex justify-end mt-4">
        {<>{botDataUseHTML[botData.data]}</>}
      </div>
    </>
  );
};

export default WppBot;
