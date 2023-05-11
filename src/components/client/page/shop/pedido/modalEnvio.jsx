import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import APIConsultas from '../../../../../services/consultas';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { CARRITO_DELETE_ALL } from '../../../../../redux/actions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2
};
const tipoPago = [
  { idtipo: 1, nombre: 'Efectivo' },
  { idtipo: 2, nombre: 'Transferencia' },
  { idtipo: 3, nombre: 'Tarjeta' }
];
const tipoEntrega = [
  { idtipo: '1', nombre: 'Retiro del local' },
  { idtipo: '2', nombre: 'Envio a domicilio' }
];

const ModalEnvioUse = (arr_cartprods, open, setOpen, user) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClose = () => setOpen(false);
  const globalVars = useSelector((s) => s.globalVars);
  const [userVars, setUserVars] = useState({
    direccion: '',
    telefono: ''
  });
  const [entrega, setEntrega] = useState({
    direccion: '',
    tipopago: 'Efectivo',
    comentario: '',
    telefono: '',
    tipoentrega: 'Retiro del local',
    nombre: ''
  });
  const [tipoSelect, setTipoSelect] = useState({
    pago: 0,
    entrega: 0
  });

  useEffect(() => {
    if (globalVars) {
      setUserVars({
        telefono: globalVars[0].valor,
        direccion: globalVars[3].valor
      });
    }
  }, [globalVars]);

  const onChange = (e) => {
    e.preventDefault();
    setEntrega({
      ...entrega,
      [e.target.name]: e.target.value
    });
  };
  const Entrega = (e, i, uso) => {
    e.preventDefault();
    if (uso === 'tipoPago') {
      setTipoSelect({
        ...tipoSelect,
        pago: i
      });
    } else if (uso === 'tipoEntrega') {
      setTipoSelect({
        ...tipoSelect,
        entrega: i
      });
    }
    setEntrega({ ...entrega, [e.target.name]: e.target.value });
  };
  const venta_add = () => {
    const total = arr_cartprods.reduce(
      (a, b) => a + b.precioventa * b.cantidadForm,
      0
    );
    const venta = {
      iduser: user?.iduser || 0,
      CP: '5900',
      destino_calle: null,
      destino_nro: null,
      destino_dpto: null,
      destino_barrio: null,
      destino_ciudad: entrega.direccion,
      tel_form: entrega.telefono,
      tipo_alta: 'Web',
      entrega: entrega.tipoentrega,
      otra_persona: 0,
      retira_nombre: entrega.nombre,
      retira_apellido: null,
      montototal: total,
      tipo_pago: entrega.tipopago,
      seguimiento_idestado: 1,
      comentario: entrega.comentario,
      estado: 'Pendiente',
      anulado_porque: null,
      fec_anulado: null
    };
    return venta;
  };
  const enviarPedido = async (ev) => {
    ev.preventDefault();
    handleClose();

    try {
      Swal.fire({
        icon: 'success',
        title: '¡Realizando Compra!',
        showConfirmButton: false
      });
      const obj = venta_add();
      await APIConsultas.ventas.VENTAS_ADD(obj, arr_cartprods, entrega);

      dispatch(CARRITO_DELETE_ALL());
      Swal.close();
      router.push('/');
    } catch (error) {
      console.error('alta de venta ', error);
    }
  };
  return {
    handleClose,
    onChange,
    Entrega,
    tipoSelect,
    enviarPedido,
    userVars,
    entrega
  };
};

const ModalEnvio = ({ arr_cartprods, open, setOpen, user }) => {
  const {
    handleClose,
    onChange,
    Entrega,
    tipoSelect,
    enviarPedido,
    userVars,
    entrega
  } = ModalEnvioUse(arr_cartprods, open, setOpen, user);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="rounded"
      >
        <Box sx={style} className="contenedor rounded-2xl Outfit">
          <h1 className={`font-commuter font-bold titulo`}>
            ¡ Lo último !
            <div className="close" onClick={handleClose} aria-hidden>
              <span className="material-icons">close</span>
            </div>
          </h1>
          <div className="terminarPedido">
            <form className="formulario" onSubmit={(ev) => enviarPedido(ev)}>
              <div className="grid grid-cols-1 mr-3 w-full">
                <label
                  className="text-sm text-gray-500 font-bold "
                  htmlFor="nombre"
                >
                  Nombre y apellido
                  <abbr className="text-red-400 pl-1" title="required">
                    *
                  </abbr>
                </label>
                <input
                  className="px-3 h-10 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600 "
                  onChange={onChange}
                  name="nombre"
                  id="nombre"
                  type="text"
                  required={true}
                />
              </div>
              <div className="grid grid-cols-1 mr-3 w-full">
                <label
                  className="text-sm text-gray-500 font-bold text-light"
                  htmlFor="telefono"
                >
                  Whatsapp de contacto
                  <abbr className="text-red-400 pl-1" title="required">
                    *
                  </abbr>
                </label>
                <input
                  className="px-3 h-10 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600"
                  onChange={onChange}
                  type="text"
                  name="telefono"
                  id="telefono"
                  placeholder={userVars.telefono}
                  required={true}
                />
              </div>
              <div className="grid grid-cols-1 mr-3 w-full">
                <label
                  className="text-sm text-gray-500 font-bold text-light"
                  htmlFor="tipopago"
                >
                  Tipo de pago
                </label>
                <div className="botones">
                  {tipoPago.map((tipo, index) => (
                    <button
                      key={index}
                      onClick={(e) => Entrega(e, index, 'tipoPago')}
                      value={tipo.nombre}
                      name="tipopago"
                      id="tipopago"
                      className={tipoSelect.pago === index && 'horaActive'}
                    >
                      {tipo.nombre}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 mr-3 w-full">
                <label
                  className="text-sm text-gray-500 font-bold text-light"
                  htmlFor="tipoentrega"
                >
                  Tipo de entrega
                </label>
                <div className="botones">
                  {tipoEntrega.map((tipo, index) => (
                    <button
                      key={index}
                      onClick={(e) => Entrega(e, index, 'tipoEntrega')}
                      value={tipo.nombre}
                      name="tipoentrega"
                      id="tipoentrega"
                      className={tipoSelect.entrega === index && 'horaActive'}
                    >
                      {tipo.nombre}
                    </button>
                  ))}
                </div>
              </div>
              {entrega.tipoentrega === 'Envio a domicilio' && (
                <div className="grid grid-cols-1 mr-3 w-full">
                  <label
                    className="text-sm text-gray-500 font-bold text-light"
                    htmlFor="direccion"
                  >
                    Direccion
                    <abbr className="text-red-400 pl-1" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    className="px-3 h-10 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600 "
                    onChange={onChange}
                    name="direccion"
                    id="direccion"
                    type="text"
                    placeholder={userVars.direccion}
                    required={true}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 mr-3 w-full">
                <label
                  className="text-sm text-gray-500 font-bold text-light"
                  htmlFor="comentario"
                >
                  ¿Querés decirnos algo más sobre tu pedido?
                </label>
                <textarea
                  className="px-3 pt-1 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600 "
                  onChange={onChange}
                  name="comentario"
                  id="comentario"
                  type="text"
                  placeholder="Ingresa un comentario"
                />
              </div>
              <div className="pt-6">
                <input
                  type="submit"
                  className={`enviar font-bold border-primary-500 border-2 text-white bg-primary-500  rounded-3xl py-2 w-full justify-center`}
                  value="Pedir por whatsapp"
                />
              </div>
            </form>
          </div>
        </Box>
      </Modal>

      <style jsx>{`
        .contenedor {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 95%;
          max-width: 420px;
          border-radius: 12px;
          border: none !important;
          padding: 0.8rem 1rem;
        }
        .error {
          color: red;
          text-align: start;
        }
        .titulo {
          font-weight: 700;
          font-size: 18px;
          line-height: 26px;
          color: var(--primary);
          width: 100%;
          display: flex;
          padding: 5px 0px 20px 0px;
          justify-content: space-between;
        }
        .close {
          color: var(--danger);
          cursor: pointer;
        }
        .close span {
          font-weight: bold;
          font-size: 1.5rem;
        }
        .eliminarEnvio button {
          background-color: transparent;
          border: none;
          margin-top: 5px;
          cursor: pointer;
          font-size: 20px;
        }
        .terminarPedido {
          width: 100%;
        }
        .eliminarMobile {
          display: none;
        }
        .formulario {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          gap: 1rem;
        }

        .botones {
          display: flex;
          gap: 1rem;
          padding-top: 0.3rem;
        }
        .botones button {
          font-weight: 500;
          font-size: 12px;
          padding: 0.4rem 0;
          width: 100%;
          background-color: transparent;
          border-radius: 12px;
          border: 1px solid black;
          cursor: pointer;
          transition: var(--timer-animation);
        }
        .horaActive {
          /* color: white; */
          border: none !important;
          color: white;
          background-color: #47973b !important;
        }
      `}</style>
    </>
  );
};

export default ModalEnvio;
