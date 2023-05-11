import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const PedidoFloat = (props) => {
  const router = useRouter();
  const state_cartprods = useSelector((s) => s.CART_DATA);
  const state_reloadcart = useSelector((s) => s.CART_RELOAD);
  const [arr_cartprods, setArr_cartprods] = useState([]);
  // const bndcart = useSelector((s) => s.CARRITO_SHOW);
  const [widthFull, setwidthFull] = useState(null);
  useEffect(() => {
    setArr_cartprods(state_cartprods);
    setwidthFull(window.innerWidth >= 1024);
    // evento que sucede cuando la ventana cambia de tamaño
    window.addEventListener('resize', (ev) => {
      ev.preventDefault();
      return setwidthFull(window.innerWidth >= 1024);
    });
  }, [state_cartprods, state_reloadcart]);

  const modalCtrl = () => {
    router.push('/resumen');
  };
  const setWidth = () => {
    if (widthFull) return 'pedidoFloatWidth';
    return 'w-full ';
  };
  return (
    <>
      <div className={`${props.className} `}>
        <div
          className={`${setWidth()} flex justify-between h-14 px-4  duration-300 transform
         items-center bg-primary-500 fixed bottom-0 z-[90] cursor-pointer border-t-4 border-primary-500 Outfit ${
           arr_cartprods?.length > 0
             ? 'translate-y-0 ease-out'
             : 'translate-y-full ease-in'
         }`}
          onClick={() => modalCtrl()}
          aria-hidden
        >
          <button className="text-xl uppercase tracking-tighter  text-white font-bold">
            Ver mi pedido
          </button>
          <button className="text-xl font-bold text-white">
            $
            {arr_cartprods
              ?.reduce((a, b) => a + b.precioventa * b.cantidadForm, 0)
              .toLocaleString('de')}
          </button>
        </div>
      </div>
    </>
  );
};
export default PedidoFloat;
