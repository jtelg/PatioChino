import servusos from '../../../utils/usos.utils';
import Head from 'next/head';
import APIConsultas from '../../../services/consultas';
import ProductoNormal from '../../../components/client/page/shop/producto/productoviewNormal';
import { useEffect, useState } from 'react';
// import CartSide from '../../../components/Header/aside_menu';

const Producto = (props) => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const urlIDProd = window.location.pathname.split('/')[3];
      const idprod = servusos.convertUrl(urlIDProd, 'revert');
      const dataprod = await APIConsultas.producto.GET_XID(idprod, true);
      if (dataprod) {
        setProducto(dataprod);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>
          {producto?.modelo} | {props.appName}
        </title>
        <meta name="description" content={producto?.descripcion} />
        <link rel="icon" href="/media/logoPatio.png" />
      </Head>
      {!loading && <ProductoNormal {...props} data_prod={producto} />}
    </>
  );
};

export default Producto;
