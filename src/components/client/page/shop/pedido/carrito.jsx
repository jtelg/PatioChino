import Carousel from '../../../../utils/carousel';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CARRITO_ADD, CARRITO_DELETE } from '../../../../../redux/actions';
import ServUsos from '../../../../../utils/usos.utils';
import ContadorProd from '../../../../utils/contadorProd';
import ModalEnvio from './modalEnvio';
const Carrito = (props) => {
  const data_cart = useSelector((s) => s.CART_DATA);
  const session = useSelector((s) => s.session);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [arr_cartprods, setarr_cartprods] = useState(data_cart);
  useEffect(() => {
    setarr_cartprods(data_cart);
    setUser(session?.user || session);
  }, [data_cart, session]);

  const handleOpen = (ev) => {
    ev.preventDefault();
    setOpen(true);
  };

  const changeData = (data) => {
    const indexProd = arr_cartprods.findIndex(
      (prod) => prod.idart === data.idart
    );
    const newarr = arr_cartprods;
    newarr[indexProd] = data;
    setarr_cartprods([...newarr]);
    dispatch(CARRITO_ADD(data));
  };

  const eliminarCarrito = (prod) => {
    dispatch(CARRITO_DELETE(prod));
    setarr_cartprods(props.CART_DATA);
  };

  const totalCarro = () => {
    return arr_cartprods?.reduce(
      (a, b) => a + b.precioFinal * b.cantidadForm,
      0
    );
  };

  const redirectProductoPage = (ev, nombre) => {
    ev.preventDefault();
    router.push(`/shop/producto/${ServUsos.convertUrl(nombre, 'convert')}`);
  };

  return (
    <>
      <section className="flex justify-center   min-h-[200px] overflow-y-auto p-4   Outfit ">
        <div className="w-full  flex flex-col justify-between bg-white p-4 shadow-md rounded-[20px]">
          <h1 className=" text-secondary font-black">MI PEDIDO</h1>
          <ul className="grid md:grid-cols-2 grid-cols-1 gap-4 rounded mb-4">
            {arr_cartprods?.map((prod, index) => (
              <li
                key={index}
                className="flex rounded-[10px] gap-4 items-center w-full pr-2  shadow-[0px_1px_10px_rgba(0,0,0,0.14)] bg-white Outfit"
              >
                <div className="h-24 w-24 min-w-[6rem] relative overflow-hidden flex justify-center">
                  <Carousel
                    perView={1}
                    images={prod.images}
                    info={false}
                    buttons={false}
                    height="h-full"
                  />
                </div>
                <div className="w-full md:p-1 p-2 flex flex-col gap-2 ">
                  <div className="flex justify-between items-center">
                    <span
                      className="uppercase text-secondary  md:text-sm text-base  cursor-pointer w-full"
                      onClick={(ev) => redirectProductoPage(ev, prod.modelo)}
                      aria-hidden
                    >
                      <b>{prod.modelo}</b>
                    </span>
                    <span
                      className="material-icons-outlined text-lg cursor-pointer text-red-400"
                      onClick={() => eliminarCarrito(prod)}
                      aria-hidden
                    >
                      close
                    </span>
                  </div>
                  <div
                    className="overflow-y-auto leading-3 h-[32px] cursor-pointer"
                    onClick={(ev) => redirectProductoPage(ev, prod.modelo)}
                    aria-hidden
                  >
                    <span className="text-xs overflow-hidden sm:max-w-[15rem] relative">
                      {prod.descripBreve}
                    </span>
                  </div>
                  {prod.comentario && (
                    <div className="overflow-y-auto leading-3 h-[32px] mt-2">
                      <span className="text-xs text-red-400 overflow-hidden sm:max-w-[15rem] relative">
                        {prod.comentario}
                      </span>
                    </div>
                  )}
                  <div className="flex w-full justify-between items-center">
                    <ContadorProd
                      prod={prod}
                      actualizaProd={(data) => changeData(data)}
                    />

                    <span
                      className=" px-8 rounded-[20px] justify-end  cursor-pointer border flex text-secondary"
                      onClick={(ev) => redirectProductoPage(ev, prod.modelo)}
                      aria-hidden
                    >
                      $ {prod.precioFinal * prod.cantidadForm}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="overflow-hidden">
            <div className="flex justify-between items-center py-1 gap-2 relative">
              <span className="uppercase font-bold  text-sm lineFloat ">
                Total pedido:
              </span>
              {/* <hr className="w-[83%]"></hr> */}
              <span className="uppercase font-bold text-primary-600 bg-white overflow-hidden z-[20] pl-1   ">
                $ {totalCarro()}
              </span>
            </div>
            <button
              className="border-primary-500 border-2 rounded-[20px] bg-white float-right py-2 font-bold text-sm px-2 text-primary-500 Outfit flex items-center justify-center"
              onClick={handleOpen}
            >
              <div className="flex items-center ">
                <span>Confirmar pedido</span>
              </div>
            </button>
          </div>
        </div>
      </section>
      <ModalEnvio
        arr_cartprods={arr_cartprods}
        open={open}
        setOpen={setOpen}
        user={user}
      />
    </>
  );
};

export default Carrito;
