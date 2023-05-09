import { CARRITO_ADD, CARRITO_DELETE } from '../../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import APIConsultas from '../../../../../services/consultas';
import Link from 'next/link';
import Carousel from '../../../../utils/carousel';
import Boton from '../../../../utils/button';
import { useRouter } from 'next/router';

const ProdNormalUse = (props) => {
  const dispatch = useDispatch();
  const [producto, setProducto] = useState(props.data_prod);
  const [arr_imgs, setArr_imgs] = useState([]);
  const router = useRouter();
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
    const cantidadForm = prod ? prod.cantidadForm : 1;
    const comentario = prod ? prod.comentario : '';
    setProducto({
      ...props.data_prod,
      cantidadForm,
      comentario
    });
    props.data_prod.cantidadForm = cantidadForm;
  }, [arr_cartprods, props.data_prod]);

  const CountChange = (index) => {
    let count = producto.cantidadForm;
    if (index === 'resta') {
      count = count === 1 ? 1 : count - 1;
    } else {
      count = count + 1;
    }
    setProducto({
      ...producto,
      cantidadForm: count,
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
    dispatch(CARRITO_ADD(producto));
  };

  return {
    producto,
    arr_cartprods,
    arr_imgs,
    CountChange,
    agregarCarrito,
    onChange,
    router
  };
};

const ProductoNormal = (props) => {
  const {
    producto,
    arr_cartprods,
    arr_imgs,
    CountChange,
    agregarCarrito,
    onChange,
    router
  } = ProdNormalUse(props);
  return (
    <>
      <div className="flex justify-between items-center pb-2 pt-3 px-4 gap-3">
        <div className=" w-full flex  justify-between  py-4 items-start  border-b-2 border-[#DEDBD3]">
          <div className="flex items-center gap-1  relative top-4 sm:top-0">
            <Link href="/shop">
              <i className="bx bx-chevron-left text-3xl font-bold text-primary-500"></i>
            </Link>
            <span className=" tracking-wide text-lg Outfit text-secondary font-bold">
              Volver a la carta
            </span>
          </div>
          {arr_cartprods?.length > 0 && (
            <div className="relative top-1 right-1 hidden lg:flex items-center justify-center">
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-[1.4rem] h-[1.4rem] flex items-center justify-center rounded-full  border-2 border-[#f7f4eb]">
                {arr_cartprods.length}
              </span>
              <button
                onClick={() => router.push('/resumen')}
                className="bg-primary-500 text-white p-1 rounded-full w-10 h-10 flex items-center justify-center boxShadow"
              >
                <i className="bx bx-cart text-2xl font-thin"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 ">
        <div className="bg-white flex rounded-[20px] overflow-hidden shadow">
          <div className="cardLeft">
            <div className="w-full overflow-hidden flex justify-center">
              <Carousel
                perView={1}
                images={arr_imgs}
                info={false}
                buttons={true}
                height=" h-[70vh]"
              />
            </div>
          </div>
          <div className="w-[50%] flex flex-col p-4 h-full justify-between gap-4 Outfit">
            <div>
              <h1 className="text-3xl font-bold text-secondary ">
                {producto.modelo}
              </h1>
              <div className="descripcion h-[200px] mt-3">
                <p className="text-sm">{producto.descripcion}</p>
              </div>
            </div>
            <div className="descripcion">
              <b>Comentario extra:</b>
              <textarea
                name="comentario"
                id="comentario"
                cols="10"
                rows="3"
                className="border-[1px] text-base rounded-xl outline-none border-black px-4 py-2 mt-2"
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
                  <p>{producto.cantidadForm}</p>
                  <button onClick={() => CountChange('suma')}>
                    <span>+</span>
                  </button>
                </div>
                <div className=" border border-secondary text-secondary w-1/2 rounded-[20px] flex items-center justify-center font-bold">
                  <span>${producto.precioventa * producto.cantidadForm}</span>
                </div>
              </div>
              <div className="w-[50%] rounded-[20px]">
                <Boton
                  color={'primary'}
                  onClick={() => agregarCarrito()}
                  paddingX={'1rem'}
                  bRadius={'20px'}
                >
                  <span className="material-icons"> shopping_cart </span>
                  Añadir al carrito
                </Boton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cardLeft {
          height: 100%;
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 5px solid var(--primary);
          border-bottom: 5px solid var(--primary);
          padding: 0;
          overflow: hidden;
        }

        /* .cardLeft img {
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
