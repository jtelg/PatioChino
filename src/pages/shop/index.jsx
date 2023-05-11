import React from 'react';
import CategoryIndex from '../../components/client/page/shop/categoryIndex';

const ShopPage = () => {
  return (
    <div className="p-4 md:pt-4 pt-[120px]">
      <div className="bg-white md:p-4 p-2 md:rounded-[40px] rounded-[20px] w-full">
        <div className="md:border-4 border-[3px] border-primary-500 md:py-3 py-2 md:rounded-[40px] rounded-[20px] ">
          <h1 className="text-center Outfit text-secondary md:text-[40px]  text-[20px]  tracking-[0.15rem] uppercase font-bold">
            Categorías
          </h1>
        </div>
      </div>
      <div className="flex flex-col ">
        <CategoryIndex></CategoryIndex>
      </div>
    </div>
  );
};

export default ShopPage;
