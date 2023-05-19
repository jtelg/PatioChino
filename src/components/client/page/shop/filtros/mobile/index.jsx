import React, { useState } from 'react';

const CategFilterMobile = ({ categorias }) => {
  const [href, setHref] = useState(1);

  return (
    <div className="text-secondary  Outfit w-full ">
      <ul className="flex gap-4 w-screen">
        {categorias?.map((name, i) =>
          name.nombre === 'Todo' ? (
            <a
              key={name.nombre}
              className="flex items-center justify-center"
              href={`#${name.nombre}`}
            >
              <i className="bx bx-chevrons-up text-2xl"></i>
            </a>
          ) : (
            <a
              key={name.nombre}
              onClick={() => setHref(i)}
              href={`#${name.nombre}`}
            >
              <li
                className={`flex items-center justify-center  ${
                  href === i && 'border-b-2 border-b-secondary font-semibold'
                } `}
              >
                {name.nombre}
              </li>
            </a>
          )
        )}
      </ul>
    </div>
  );
};

export default CategFilterMobile;
