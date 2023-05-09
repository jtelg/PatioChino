import React from 'react';

const CartButton = () => {
  return (
    <div className="relative">
      <button
        onClick={() => router.push('/resumen')}
        className="bg-primary-500 text-white p-1 rounded-full w-10 h-10 flex items-center justify-center boxShadow"
      >
        <i className="bx bx-cart text-2xl font-thin"></i>
      </button>
      {state_cartprods?.length > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-[1.4rem] h-[1.4rem] flex items-center justify-center rounded-full  border-2 border-[#f7f4eb]">
          {state_cartprods.length}
        </div>
      )}
    </div>
  );
};

export default CartButton;
