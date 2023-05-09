import React from 'react';
import HeaderDesktop from './desktop';
import HeaderMobile from './mobile';

const Header = () => {
  return (
    <div className="md:w-[25%] md:h-screen">
      <div className="md:block hidden h-full">
        <HeaderDesktop></HeaderDesktop>
      </div>
      <div className="md:hidden ">
        <HeaderMobile></HeaderMobile>
      </div>
    </div>
  );
};

export default Header;
