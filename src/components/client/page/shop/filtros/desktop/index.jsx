import React from 'react';
import Link from 'next/link';

const CategFilters = ({ categorias, href }) => {
  return (
    <>
      <div className="flex justify-between buttonsFilter h-full ">
        <ul className="flex bg-white gap-2 items-center buttonsFilter rounded-[18px] boxShadow ">
          {categorias.arrCategs?.map((arr, index) => (
            <li
              key={index}
              className={`${
                href === arr.nombre
                  ? 'bg-secondary text-white'
                  : 'text-secondary hover:bg-[#f7f4eb]'
              } font-bold h-full flex items-center justify-center px-2 min-w-[150px] Outfit py-2 `}
            >
              <Link href={`/shop/${arr.nombre}`} className="w-full text-center">
                {arr.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategFilters;
