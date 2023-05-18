import React, { useState } from 'react';

const CategFilters = ({ categorias }) => {
  const [href, sethref] = useState('Hamburguesas');
  return (
    <>
      <div className="flex justify-between buttonsFilter h-full ">
        <ul className="flex bg-white gap-2 items-center buttonsFilter rounded-[18px] boxShadow ">
          {categorias?.map((arr, index) => (
            <li
              key={index}
              className={`${
                href === arr.nombre
                  ? 'bg-secondary text-white'
                  : 'text-secondary hover:bg-[#f7f4eb]'
              } font-bold h-full flex items-center justify-center px-2 min-w-[150px] Outfit py-2 `}
            >
              <a
                href={`#${arr.nombre}`}
                onClick={() => sethref(arr.nombre)}
                className="w-full text-center"
              >
                {arr.nombre}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategFilters;
