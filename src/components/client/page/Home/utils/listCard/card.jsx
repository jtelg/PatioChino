import React, { useState } from 'react';

const Card = ({ info }) => {
  const [clas, setClas] = useState(false);

  return (
    <div className="md:w-[25%] md:min-w-[25%] min-w-[80%] h-1/2 flex even:text-white CardHome overflow-hidden">
      {/* CARD IZQUIERDA */}
      <div
        className={`w-full min-w-full max-w-full h-full rounded-[20px] relative overflow-hidden duration-500  boxShadow  ${
          clas === true ? 'translate-x-[-100%]' : ''
        }  `}
      >
        <img
          src={info.img}
          alt="foto"
          className="w-full h-full rounded-[20px] absolute top-0 left-0"
        />
        <div className="relative flex justify-center p-6  ">
          <h1 className="Recoleta text-[50px] leading-[2.8rem]">
            {info.nombre}
          </h1>
        </div>
        <div className="absolute top-[50%] right-4">
          <button className="row" onClick={() => setClas(true)}>
            <i className="bx bx-chevron-right text-[19px]"></i>
          </button>
        </div>
      </div>
      {/* CARD DERECHA */}
      <div
        className={`bg-white h-full w-full min-w-full max-w-full rounded-[20px] relative flex overflow-hidden duration-500 ${
          clas === true ? 'translate-x-[-100%]' : ''
        }  `}
      >
        <img
          src={info.img2}
          alt="foto"
          className="w-full h-full rounded-[20px] absolute top-0 left-0"
        />

        <div className="relative p-6 w-full flex flex-col justify-between">
          <div>
            <h1 className="Recoleta text-[50px] leading-[2.8rem]">
              {info.nombre}
            </h1>
            <ul className="list-disc pl-4 ">
              {info.ingredientes.map((i, index) => (
                <li key={index} className="Outfit font-medium ">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <button className="border-2 border-secondary bg-white w-full rounded-[20px] Outfit font-bold text-secondary text-sm py-2">
              Hacé tu pedido
            </button>
          </div>
        </div>
        <div className="absolute top-[50%] right-4">
          <button className="row" onClick={() => setClas(false)}>
            <i className="bx bx-chevron-left text-[19px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
