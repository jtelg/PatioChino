import '../../styles/globals.css';
import { wrapper } from '../redux/store';
import Header from '../components/client/general/header';
import PedidoFloat from '../components/client/page/shop/pedido/pedidoFloat';
import { useRouter } from 'next/router';
import Session from '../components/client/userSession';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useEffect } from 'react';

const ctrlUrl = (Component, router) => {
  return (
    router.pathname !== '/resumen' &&
    Component.auth?.role !== 'Admin' &&
    router.pathname !== '/session'
  );
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  pageProps.phone = '54 9 353 6 570 880';
  pageProps.appName = 'Patio Chino';
  pageProps.addres = 'Bv Carcano 469';

  // useEffect(() => {
  //   const scroll = document.getElementById('contenedor');
  //   scroll.addEventListener('scroll', handlerScroll);
  // }, []);

  // const handlerScroll = () => {
  //   console.log(window);
  // };

  return (
    <Session comp={Component}>
      <div className="flex md:flex-row flex-col ">
        <Header></Header>
        <div
          id="contenedor"
          className={`h-screen lg:overflow-y-auto overflow-x-hidden w-full lg:pb-0 pb-8 `}
        >
          <Component {...pageProps} />
          <PedidoFloat
            className={`${
              !ctrlUrl(Component, router)
                ? 'hidden'
                : router.pathname === '/shop/producto/[id]'
                ? 'lg:block hidden'
                : 'block w-full '
            }`}
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        draggable
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </Session>
  );
}

export default wrapper.withRedux(MyApp);
