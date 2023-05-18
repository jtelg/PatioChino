import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const HeaderMobile = ({ personalInfo, pedido }) => {
  const router = useRouter();
  const state = useSelector((s) => s);

  const [open, setOpen] = useState(false);
  const [arr_nav, setItemNav] = useState([]);
  const [state_cartprods, setState_cartprods] = useState([]);

  useEffect(() => {
    if (state.arr_nav) {
      setItemNav(state.arr_nav.data || []);
    }
    setState_cartprods(state?.CART_DATA);

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
            <div className="relative ">
              <button
                onClick={() => router.push('/resumen')}
                className={` ${
                  state_cartprods?.length > 0
                    ? 'bg-primary-500 text-white'
                    : 'bg-trasparent text-primary-500'
                } border-none  p-5 md:p-4 rounded-full w-10 h-10 flex items-center justify-center`}
              >
                <i
                  className={`bx bxs-cart ${
                    state_cartprods?.length > 0 ? 'text-2xl' : 'text-3xl'
                  }`}
                ></i>
              </button>
              {state_cartprods?.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full  border-2 border-[#f7f4eb]">
                  {state_cartprods.length}
                </div>
              )}
            </div>
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
