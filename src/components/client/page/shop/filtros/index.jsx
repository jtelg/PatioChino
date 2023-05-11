import React, { useEffect, useState } from 'react';
import APIConsultas from '../../../../../services/consultas';
import CategFilters from './desktop';
import CategFilterMobile from './mobile';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Filtros = ({ setParams }) => {
  const state_cartprods = useSelector((s) => s.CART_DATA);

  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [href, setHref] = useState('');

  useEffect(() => {
    let categs = [];
    setHref(router.asPath.split('/')[2]);
    setParams(router.asPath.split('/')[2]);
    APIConsultas.categoria.TODO(true).then((repscateg) => {
      categs = repscateg.filter((c) => c.nombre !== 'No definido');
      categs.push({ idcateg: 0, nombre: 'Todo' });
      setCategorias({ arrCategs: categs });
    });
  }, [router]);

  return (
    <div className="border-b-2 border-[#DEDBD3] mb-4 w-full flex justify-between pb-4 ">
      <div className="md:block hidden h-full">
        <CategFilters categorias={categorias} href={href}></CategFilters>
      </div>
      <div className="md:hidden">
        <CategFilterMobile
          categorias={categorias}
          router={router}
          href={href}
        ></CategFilterMobile>
      </div>
      <div className="relative">
        <button
          onClick={() => router.push('/resumen')}
          className="bg-primary-500 text-white p-6 md:p-4 rounded-full w-10 h-10 flex items-center justify-center boxShadow"
        >
          <i className="bx bx-cart text-2xl font-thin"></i>
        </button>
        {state_cartprods?.length > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-[1.4rem] h-[1.4rem] flex items-center justify-center rounded-full  border-2 border-[#f7f4eb]">
            {state_cartprods.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filtros;
