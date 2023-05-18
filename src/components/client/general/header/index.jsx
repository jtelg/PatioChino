import React, { useState, useEffect } from 'react';
import HeaderDesktop from './desktop';
import HeaderMobile from './mobile';
import { useSelector } from 'react-redux';

const Header = () => {
  const [personalInfo, setPersonalInfo] = useState([]);
  const state = useSelector((s) => s);
  const pedido = `
  ¡Hola! Buenas noches, tengo una consulta.
`;
  useEffect(() => {
    setPersonalInfo(state.globalVars || []);
  }, []);

  return (
    <div className="md:w-[350px] max-w-[350px] md:h-screen">
      <div className="md:block hidden h-full">
        <HeaderDesktop
          personalInfo={personalInfo}
          pedido={pedido}
        ></HeaderDesktop>
      </div>
      <div className="md:hidden ">
        <HeaderMobile
          personalInfo={personalInfo}
          pedido={pedido}
        ></HeaderMobile>
      </div>
    </div>
  );
};

export default Header;
