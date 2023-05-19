import { CARRITO_ADD } from '../../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import APIConsultas from '../../../../../services/consultas';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const ProdNormalUse = (props) => {
  const dispatch = useDispatch();

  const state_cartprods = useSelector((s) => s.CART_DATA);

  const [producto, setProducto] = useState(props.data_prod);
  const [arr_imgs, setArr_imgs] = useState([]);
  const [presentacion, setPresentacion] = useState({
    tipo: 'Doble',
    precio: props.data_prod.precioventa
  });
  const [precioFinal, setPrecioFinal] = useState(props.data_prod.precioventa);
  const [cantForm, setcantForm] = useState(1);

  useEffect(() => {
    if (props.data_prod.typeCatalog === 0) {
      APIConsultas.Images.SET_IMAGE(props.data_prod).then((imgs) => {
        setArr_imgs(imgs);
        setProducto({
          ...props.data_prod,
          images: imgs
        });
        props.data_prod.images = imgs;
      });
    } else {
      APIConsultas.Images.SET_ARRCOLOR(props.data_prod).then((prod) => {
        const images = prod.arrcolor.reduce((a, b) => a + b.arrimages, '');
        setArr_imgs(prod.arrcolor[0].arrimages);
        setProducto({
          ...props.data_prod,
          images
        });
        props.data_prod.images = images;
      });
    }
  }, [props]);

  const arr_cartprods = useSelector((s) => s.CART_DATA);
  useEffect(() => {
    const prod = arr_cartprods?.find(
      (prod) => prod.idart === props.data_prod.idart
    );
    props.data_prod.presentacion = presentacion.tipo;
    const comentario = prod ? prod.comentario : '';
    props.data_prod.precioFinal = precioFinal;
    setProducto({
      ...props.data_prod,
      comentario
    });
  }, [arr_cartprods, props.data_prod, precioFinal]);

  const CountChange = (index) => {
    let count = cantForm;
    if (index === 'resta') {
      count = count === 1 ? 1 : count - 1;
    } else {
      count = count + 1;
    }
    setcantForm(count);
    setProducto({
      ...producto,
      precioTotal: props.data_prod.precioventa * count
    });
  };
  const onChange = (ev) => {
    ev.preventDefault();
    setProducto({
      ...producto,
      [ev.target.name]: ev.target.value
    });
  };
  const agregarCarrito = () => {
    const pedido = producto;
    pedido.numPedido = uuidv4();
    pedido.cantidadForm = cantForm;
    setProducto(pedido);
    dispatch(CARRITO_ADD(producto));
    return toast.success(`Producto agregado al carrito`, {
      autoClose: 1000
    });
  };

  const changePresent = (e) => {
    let valor = { tipo: 'Doble', precio: producto.precioventa };
    if (e.target.value === 'Doble') {
      valor = { tipo: 'Doble', precio: producto.precioventa };
    } else {
      valor = { tipo: 'Triple', precio: producto.precioTriple };
    }
    setProducto({ ...producto, presentacion: valor.tipo });
    setPresentacion(valor);
    setPrecioFinal(valor.precio);
    setcantForm(1);
  };

  return {
    producto,
    arr_imgs,
    CountChange,
    agregarCarrito,
    onChange,
    presentacion,
    changePresent,
    precioFinal,
    cantForm,
    state_cartprods
  };
};

const ProductoNormal = (props) => {
  const {
    producto,
    arr_imgs,
    CountChange,
    agregarCarrito,
    onChange,
    presentacion,
    changePresent,
    precioFinal,
    cantForm,
    state_cartprods
  } = ProdNormalUse(props);
  return (
    <>
      <div className="flex  justify-between items-center pb-2 md:pt-3 pt-[80px]  px-4 gap-3">
        <div className=" w-full flex  justify-between  py-4 items-start  border-b-2 border-[#DEDBD3] relative">
          <div className="flex items-center gap-1  relative top-4 sm:top-0">
            <Link href={`/shop/${producto.categoria}`}>
              <i className="bx bx-chevron-left text-3xl font-bold text-primary-500"></i>
            </Link>
            <span className=" tracking-wide text-lg Outfit text-secondary font-bold">
              Volver a la carta
            </span>
          </div>
          <div className="relative md:block hidden">
            <Link
              href={'/resumen'}
              className="bg-primary-500 text-white p-6 md:p-4 rounded-full w-10 h-10 flex items-center justify-center boxShadow"
            >
              <i className="bx bx-cart text-2xl font-thin"></i>
            </Link>
            {state_cartprods?.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-[1.4rem] h-[1.4rem] flex items-center justify-center rounded-full  border-2 border-[#f7f4eb]">
                {state_cartprods.length}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 ">
        <div className="bg-white flex md:flex-row flex-col rounded-[20px] overflow-hidden shadow">
          <div className="cardLeft">
            <div className="w-full overflow-hidden flex justify-center">
              <img
                src={arr_imgs[0]}
                alt="foto"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-[50%] flex flex-col p-4 h-full justify-between md:gap-4 gap-1 Outfit">
            <div>
              <h1 className="md:text-3xl text-2xl font-bold text-secondary ">
                {producto.modelo}
              </h1>
              <div className="descripcion md:h-[80px] md:mt-3 mt-1 pb-2">
                <p className="text-sm">{producto.descripcion}</p>
              </div>
              {producto.categoria === 'Hamburguesas' && (
                <div className="border-y py-4">
                  <h1 className="text-base font-bold">Presentacion</h1>
                  <ul className="w-full text-sm space-y-1">
                    <li className="w-full flex items-center justify-between">
                      <span className="text-gray-400 font-semibold">
                        Seleccioná las opciones que quieras.
                      </span>
                    </li>
                    <li className="w-full">
                      <div className="flex gap-1 ">
                        <input
                          id="extras"
                          type="radio"
                          name="check"
                          value="Doble"
                          checked={presentacion.precio == producto.precioventa}
                          onChange={(e) => changePresent(e)}
                        />
                        <label
                          htmlFor="extras"
                          className="flex w-full items-center justify-between"
                        >
                          <span>Doble</span>
                          <span>${producto.precioventa}</span>
                        </label>
                      </div>
                    </li>
                    <li className=" w-full">
                      <div className="flex gap-1 ">
                        <input
                          id="extras"
                          type="radio"
                          name="check"
                          value="Triple"
                          checked={presentacion.precio == producto.precioTriple}
                          onChange={(e) => changePresent(e)}
                        />
                        <label
                          htmlFor="extras"
                          className="flex w-full items-center justify-between"
                        >
                          <span>Triple</span>
                          <span>${producto.precioTriple}</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="descripcion">
              <b>Comentario extra:</b>
              <textarea
                name="comentario"
                id="comentario"
                className="border-[1px] text-base rounded-xl outline-none border-black px-4 py-2 mt-2 md:h-[100px] h-[70px]"
                onChange={onChange}
                value={producto.comentario}
              ></textarea>
            </div>
            <div className="w-full flex gap-4">
              <div className="flex justify-between items-center w-[50%] ">
                <div className=" flex items-center gap-4 font-bold">
                  <button onClick={() => CountChange('resta')}>
                    <span>-</span>
                  </button>
                  <p>{cantForm}</p>
                  <button onClick={() => CountChange('suma')}>
                    <span>+</span>
                  </button>
                </div>
                <div className=" border border-secondary text-secondary md:text-base p-1 text-sm w-1/2 rounded-[20px] flex items-center justify-center font-bold">
                  <span>${precioFinal * cantForm}</span>
                </div>
              </div>
              <div className="w-[50%] rounded-[20px]">
                <button
                  onClick={() => agregarCarrito()}
                  className="bg-[#092640] text-white flex gap-1 items-center justify-center w-full py-1 rounded-[20px] shadow md:text-base text-sm"
                >
                  <span className="material-icons"> shopping_cart </span>
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cardLeft {
          height: 100%;
          width: 55%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          overflow: hidden;
        }

        /* .cardLeft img {
          height:100%
  width: auto;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 40%);
  object-fit: cover;
} */

        .cardRigth {
          border-top: 5px solid var(--primary);
          border-bottom: 5px solid var(--primary);
          height: 100%;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          width: 50%;
          justify-content: space-evenly;
        }

        .descripcion {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.2rem;
        }
        .descripcion b {
          color: var(--primary);
        }

        @media only screen and (max-width: 1024px) {
          .contenedor {
            height: auto;
            padding-left: 0px;
            flex-direction: column;
            padding-bottom: 0px;
          }
          .cardLeft {
            width: 100%;
          }

          .cardLeft img {
            height: auto;
          }

          .cardRigth {
            width: 100%;
            border-top: none;
            gap: 1rem;
            padding: 1rem 1rem;
            padding-bottom: 7rem;
          }
        }
      `}</style>
    </>
  );
};
export default ProductoNormal;
