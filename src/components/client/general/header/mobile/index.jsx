import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import ServUsos from '../../../../../utils/usos.utils';

const HeaderMobile = () => {
  const router = useRouter();
  const state = useSelector((s) => s);

  const [open, setOpen] = useState(false);
  const [arr_nav, setItemNav] = useState([]);
  const [personalInfo, setPersonalInfo] = useState([]);

  const pedido = `
  ¡Hola! Buenas noches, tengo una consulta.
`;

  useEffect(() => {
    if (state.arr_nav) {
      setItemNav(state.arr_nav.data || []);
    }
    setPersonalInfo(state.globalVars || []);

    setOpen(false);
  }, [router, state]);

  return (
    <div
      className={`w-screen bg-[#000033a3] h-screen fixed z-50 transitionCont ${
        open && 'is-active'
      } `}
    >
      <div className="bg-mobile-header-texture p-2 rounded-b-[20px] w-full bg-repeat-round">
        <div
          id="box"
          className={` border-[3px] border-secondary rounded-[20px] p-2 transition boxShadow ${
            open && 'is-active'
          } ${open && arr_nav.length > 2 && 'is-admin'} `}
        >
          <div className="flex justify-between items-center">
            <button onClick={() => setOpen(!open)}>
              <i className="bx bx-menu text-[35px] text-primary-500 "></i>
            </button>
            <Link href="/" className="flex justify-center">
              <img src="/media/logoPatio.png" alt="foto " className="w-[50%]" />
            </Link>
            <button
              onClick={() =>
                ServUsos.SendWhatsapp(personalInfo[0]?.valor, pedido)
              }
            >
              <i className="bx bxl-whatsapp text-[35px] text-primary-500 "></i>
            </button>
          </div>
          <div>
            <ul className="flex flex-col items-center justify-center gap-8 mt-4">
              {arr_nav.map((arr) => (
                <Link href={arr.href} key={arr.id}>
                  <li
                    className={`text-xl Outfit uppercase font-bold ${
                      router.asPath === arr.href
                        ? 'text-primary-500'
                        : 'text-secondary'
                    } `}
                  >
                    {arr.nombre}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
