// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper';

const arr_img = [
  {
    id: 1,
    img: '/media/EjemploHome.png'
  },
  {
    id: 2,
    img: '/media/EjemploHome.png'
  },
  {
    id: 3,
    img: '/media/EjemploHome.png'
  }
];

export default function Carousel() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper  md:rounded-[40px] rounded-[20px] boxShadow max-h-[90vh]"
      >
        {arr_img.map((img) => (
          <SwiperSlide key={img.id} className="w-full h-full max-h-[90vh]">
            <img
              src={img.img}
              alt="foto"
              className=" w-full h-full max-h-[90vh]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

// className="h-full bg-white rounded-[40px] "
