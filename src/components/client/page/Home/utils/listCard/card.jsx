import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Card = ({ info }) => {
  const [clas, setClas] = useState(false);
  const router = useRouter();

  return (
    <div className="md:w-[25%] md:min-w-[25%] min-w-[80%] md:h-1/2 h-full flex even:text-white CardHome overflow-hidden">
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
        <div className="relative flex justify-center px-8 xl:pt-6 lg:pt-4 pt-8 ">
          <h1 className="Recoleta  xl:text-[45px] lg:text-[30px] text-[55px] xl:leading-[2.8rem] lg:leading-[2rem] leading-[2.8rem]  max-w-[300px]">
            {info.nombre}
          </h1>
        </div>
        <div className="absolute top-[50%] right-4">
          <button className="row" onClick={() => setClas(true)}>
            <i className="bx bx-chevron-right text-[18px]"></i>
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

        <div className="relative w-full flex flex-col justify-between lg:pb-4 xl:pb-6 pb-8">
          <div>
            <div className="relative flex justify-center px-8 xl:pt-6 lg:pt-4 pt-8  ">
              <h1 className="Recoleta xl:text-[45px] lg:text-[30px] text-[55px] xl:leading-[2.8rem] lg:leading-[2rem] leading-[2.8rem] max-w-[300px] ">
                {info.nombre}
              </h1>
            </div>
            <ul className="list-disc pl-10 md:mt-0 mt-2 ">
              {info.ingredientes.map((i, index) => (
                <li
                  key={index}
                  className="Outfit font-medium xl:text-[15px] xl:leading-5 lg:text-xs text-base "
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full px-6">
            <button
              onClick={() => router.push('/shop')}
              className="border-2 border-secondary bg-white w-full rounded-[20px] Outfit font-bold text-secondary text-sm py-2"
            >
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
