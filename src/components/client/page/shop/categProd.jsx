import React, { useState, useEffect } from 'react';
import APIConsultas from '../../../../services/consultas';
import CardShop from './producto/cardShop';

const CategxProd = (props) => {
  const [arrProductos, setArrProductos] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let categ = props.categ;
    if (categ === 'Todo') categ = 0;
    APIConsultas.producto.GET_SHOP(categ, 0).then((resprod) => {
      setArrProductos(resprod);
      setLoading(false);
    });
  }, [props.categ]);

  return (
    <>
      <section className="flex justify-between ">
        <article className=" w-full rounded flex flex-col justify-between">
          <div className="contCard flex flex-wrap justify-between gap-y-4">
            {arrProductos.map((e, i) => (
              <CardShop props={e} key={i} loading={loading} />
            ))}
          </div>
        </article>
      </section>
    </>
  );
};

export default CategxProd;
