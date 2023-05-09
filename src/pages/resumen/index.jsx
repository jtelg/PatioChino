import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Carrito from '../../components/client/page/shop/pedido/carrito';
import localStorage from '../../utils/localstorage.utils';
const ResumenC = (props) => {
  const router = useRouter();
  useEffect(() => {
    const prods = localStorage.getFromStorage('arr_carro');
    if (!prods || prods.length === 0) router.push('/shop');
  }, [router]);

  return (
    <>
      <Head>
        <title>Patio Chino | Resumen de compra</title>
        <meta name="description" content="Resumen de compra" />
        <link rel="icon" href="/media/logoPatio.png" />
      </Head>
      <div className="md:pt-0 pt-[80px]">
        <div className="pl-4 w-full flex   py-4 items-start  border-b-2 border-[#DEDBD3]">
          <div className="flex items-center gap-1  relative top-4 sm:top-0">
            <Link href="/shop">
              <i className="bx bx-chevron-left text-3xl font-bold text-primary-500"></i>
            </Link>
            <span className=" tracking-wide text-lg Outfit text-secondary font-bold">
              Volver a la carta
            </span>
          </div>
        </div>
        <Carrito />
      </div>
    </>
  );
};

export default ResumenC;
