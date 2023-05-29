import React, { useState, useEffect } from 'react';
import APIConsultas from '../../../../services/consultas';
import CardShop from './producto/cardShop';

const CategxProd = (props) => {
  const [arrProductos, setArrProductos] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    APIConsultas.producto.GET_SHOP(0, 0).then((resprod) => {
      setArrProductos(resprod);
      setLoading(false);
    });
    setCategorias(props.categorias.filter((c) => c.nombre !== 'Todo'));
  }, [props]);

  return (
    <>
      <section className="flex justify-between Outfit md:pt-4 pt-14 p-4">
        <article className=" w-full rounded flex flex-col justify-between gap-4">
          {categorias?.map((categ, i) => (
            <div key={i} className=" border-b-2 pb-4" id={categ.nombre}>
              <h1 className="font-bold text-secondary text-xl uppercase mb-2 ">
                {categ.nombre}
              </h1>
              <div className="contCard flex flex-wrap lg:justify-between justify-center gap-y-4">
                {arrProductos.map(
                  (e, i) =>
                    categ.nombre === e.categ && (
                      <CardShop props={e} key={i} loading={loading} />
                    )
                )}
              </div>
            </div>
          ))}
        </article>
      </section>
    </>
  );
};

export default CategxProd;
