import React from 'react';
import CarouselHomeDesk from './utils/carousel';
import CarouselMob from './utils/carouselMob';
import ListCard from './utils/listCard/listCard';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Patio Chino | Tienda online</title>
        <meta name="description" content="Tienda online de comida rapida" />
        <link rel="icon" href="/media/logoPatio.png" />
      </Head>
      <div className="px-4 md:pt-4 pt-[90px]">
        <div className="py-4 md:hidden">
          <button
            onClick={() => router.push('/shop')}
            className="duration-150 shadow-lg text-[24px] text-shadow bg-primary-500  text-white  uppercase font-bold leading-10 Outfit rounded-2xl  w-full"
          >
            Hacé tu pedido
          </button>
        </div>
        <div className="md:mb-[150px] mb-4  md:block hidden ">
          <CarouselHomeDesk></CarouselHomeDesk>
        </div>
        <div className="md:mb-[150px] mb-4  md:hidden ">
          <CarouselMob></CarouselMob>
        </div>
        <div className="my-4">
          <div className="w-full bg-white md:rounded-[40px] rounded-[20px] md:p-4 p-2 md:mb-12 mb-3 boxShadow">
            <h1 className="md:text-[40px] text-[20px] Outfit text-center uppercase  text-secondary font-bold md:border-4 border-[3px] border-primary-500 md:rounded-[40px] rounded-[20px] md:py-3 py-2 tracking-[0.15rem]">
              Nuestras creaciones
            </h1>
          </div>
          <ListCard></ListCard>
          <div className="w-full bg-white p-4 rounded-[20px] mt-16 boxShadow">
            <div className="w-full h-full md:border-4 border-[3px] rounded-[20px] border-primary-500 flex items-center justify-center md:py-16 py-20">
              <img
                src="/media/logoPatio.png"
                alt="foto "
                className="md:w-[25%]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
