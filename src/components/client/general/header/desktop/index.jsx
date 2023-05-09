import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import localStorage from '../../../../../utils/localstorage.utils';

const HeaderDesktop = () => {
  const router = useRouter();
  const state = useSelector((s) => s.globalVars);
  const sessionLocal = localStorage.getFromStorage('session');
  const [buttonAdmin, setButtonAdmin] = useState(false);

  useEffect(() => {
    if (sessionLocal && sessionLocal.role === 'Admin') {
      setButtonAdmin(true);
    }
  }, []);

  return (
    <div className="h-full  p-4 w-full overflow-hidden bg-header-texture bg-repeat-round">
      <div className="flex flex-col justify-between border-4 border-secondary h-full p-4 rounded-2xl z-[2]">
        <Link href="/" className="flex justify-center">
          <img src="/media/logoPatio.png" alt="foto " className="w-[80%]" />
        </Link>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push('/shop')}
            className="duration-150 text-[30px] text-shadow bg-primary-500 hover:bg-secondary text-white  uppercase font-bold leading-10 Outfit rounded-2xl py-2"
          >
            Hacé tu pedido
          </button>
          {buttonAdmin && (
            <button
              onClick={() => router.push('/admin')}
              className="duration-150 bg-primary-500 hover:bg-white hover:border-2 hover:border-primary-500 text-white hover:text-primary-500 w-full Outfit rounded-2xl uppercase font-bold py-1 shadow "
            >
              Tablero
            </button>
          )}
        </div>
        <div className="text-primary-500 flex items-center justify-around">
          <i className="bx bxl-whatsapp text-[40px] font-medium"></i>
          <i className="bx bxl-instagram text-[40px] font-medium "></i>
          <i className="bx bxl-facebook text-[40px] font-medium "></i>
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktop;
