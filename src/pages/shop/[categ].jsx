import React, { useState } from 'react';
import Head from 'next/head';
import CategxProd from '../../components/client/page/shop/categProd';
import Filtros from '../../components/client/page/shop/filtros';

const ShopID = (props) => {
  const [params, setParams] = useState(props.ShopID.categ);

  return (
    <>
      <Head>
        <title>Patio Chino | Tienda online</title>
        <meta name="description" content="Tienda online de comida rapida" />
        <link rel="icon" href="/media/logoPatio.png" />
      </Head>
      <div className="p-4 md:pt-4 pt-[120px] ">
        <div>
          <Filtros setParams={setParams}></Filtros>
        </div>
        <CategxProd categ={params} />
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
