import { Navigation, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
/*
  Inputs del componente carrousel:
  - images: Recibe las imagenes a reproducir
  - Info: boolean que representa si se muestra o no la informacion de head del swip.
  - Position: Posicion de la imagen.
  - Buttons: boolean que representa si se muestarn o no los botones del slide.
  - perView: Representa el numero de items a visualizar por vista en la pantalla
  - height: tamaño de la imagen
*/
const Carousel = ({
  images = [],
  info = false,
  position = 'center',
  buttons = false,
  perView = 1,
  height = 'min-h-screen'
}) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={perView}
        spaceBetween={0}
        navigation={buttons}
        pagination={{ clickable: true }}
        className="w-full bg-primary-100 overflow-hidden"
        loop={true}
      >
        {images?.map((img, index) => (
          <SwiperSlide className="w-full bg-white overflow-hidden " key={index}>
            <div className={`relative ${height}`}>
              <Image
                src={img}
                alt=""
                layout="fill"
                loading="lazy"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;