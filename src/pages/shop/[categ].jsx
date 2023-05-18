import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CategxProd from '../../components/client/page/shop/categProd';
import Filtros from '../../components/client/page/shop/filtros';
import APIConsultas from '../../services/consultas';

const ShopID = (props) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    let categs = [];
    APIConsultas.categoria.TODO(true).then((repscateg) => {
      categs = repscateg.filter((c) => c.nombre !== 'No definido');
      categs.unshift({ idcateg: 0, nombre: 'Todo' });
      setCategorias(categs);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Patio Chino | Tienda online</title>
        <meta name="description" content="Tienda online de comida rapida" />
        <link rel="icon" href="/media/logoPatio.png" />
      </Head>
      <div className="md:pt-0 pt-[120px] ">
        <div className="md:sticky fixed md:top-0  top-[85px] z-20 w-full ">
          <Filtros categorias={categorias}></Filtros>
        </div>
        <CategxProd categorias={categorias} />
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  return {
    props: {
      ShopID: {
        categ: context.query.categ,
        reload: Date.now()
      }
    }
  };
}

export default ShopID;
