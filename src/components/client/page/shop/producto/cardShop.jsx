import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { CARRITO_ADD, CARRITO_DELETE } from '../../../../../redux/actions';
import APIConsultas from '../../../../../services/consultas';
import Carousel from '../../../../utils/carousel';
import ContadorProd from '../../../../utils/contadorProd';
import servUsos from '../../../../../utils/usos.utils';
const CardShop = ({ props, loading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [producto, setProducto] = useState(props);
  const [arr_imgs, setArr_imgs] = useState([]);
  const [prodinCart, setProdinCart] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (props.typeCatalog === 0) {
        const imgs = await APIConsultas.Images.SET_IMAGE(props);
        setArr_imgs(imgs);
        props.images = imgs;
      } else {
        const prod = await APIConsultas.Images.SET_ARRCOLOR(props);
        const images = prod.arrcolor?.reduce((a, b) => a + b.arrimages, '');
        setArr_imgs(images);
        props.images = images;
      }
      setProducto({
        ...props
      });
    };
    if (!loading) fetchData();
  }, [props, loading]);

  const arr_cartprods = useSelector((s) => s.CART_DATA);
  useEffect(() => {
    if (!loading) {
      const prod = arr_cartprods?.find((prod) => prod.idart === props.idart);
      setProdinCart(!!prod);
      const cantidadForm = prod ? prod.cantidadForm : 1;
      setProducto({
        ...props,
        cantidadForm
      });
      props.cantidadForm = cantidadForm;
    }
  }, [arr_cartprods, props, loading]);

  const agregarCarrito = () => {
    dispatch(CARRITO_ADD(producto));
  };

  const changeData = (data) => {
    if (prodinCart) {
      const indexProd = arr_cartprods.findIndex(
        (prod) => prod.idart === data.idart
      );
      const newarr = arr_cartprods;
      newarr[indexProd] = data;
      dispatch(CARRITO_ADD(data));
    }
    setProducto({
      ...data
    });
  };

  const eliminarCarrito = (prod) => {
    dispatch(CARRITO_DELETE(prod));
  };

  return (
    <>
      <div className={`contCard relative overflow-hidden boxShadow`}>
        {!loading ? (
          <>
            <button
              onClick={() =>
                router.push(
                  `/shop/producto/${servUsos.convertUrl(
                    producto.modelo,
                    'convert'
                  )}`
                )
              }
              className="absolute top-3 left-5 text-3xl text-white z-10 hover:text-primary-500 transition-all"
            >
              <span className="material-icons-outlined">visibility</span>
            </button>
            <div className="contfoto">
              <div className="w-full h-full overflow-hidden flex justify-center">
                <Carousel
                  perView={1}
                  images={arr_imgs}
                  info={false}
                  buttons={true}
                  height="h-full"
                />
              </div>
            </div>
            <div className="contInfo Outfit">
              <h1
                aria-hidden
                className=" font-bold text-secondary "
                onClick={() =>
                  router.push(
                    `/shop/producto/${servUsos.convertUrl(
                      producto.modelo,
                      'convert'
                    )}`
                  )
                }
              >
                {producto.modelo}
              </h1>
              <p>{producto.descripBreve}</p>
              <div className="info">
                {producto.cantidadForm && (
                  <ContadorProd
                    prod={producto}
                    actualizaProd={(data) => changeData(data)}
                  />
                )}

                <div className="precio">
                  <span>${producto.precioventa * producto.cantidadForm}</span>
                </div>
                <div className="cartButton">
                  {!prodinCart ? (
                    <button onClick={agregarCarrito} className="bg-gray-900">
                      <span className="material-icons">add_shopping_cart</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => eliminarCarrito(producto)}
                      className="bg-white shadow-md"
                    >
                      <span className="material-icons ">
                        remove_shopping_cart
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="transitionload h-full w-full rounded-lg"></div>
          </>
        )}
      </div>

      <style jsx>{`
        .contCard {
          /* border: 1px solid black; */
          background: #ffffff;
          border-radius: 12px;
          width: 330px;
          height: 430px;
        }
        .contCard:hover {
          box-shadow: 0px 2px 15px rgba(0, 0, 0, 30%);
        }
        .contfoto {
          overflow: hidden;
          height: 65%;
          object-fit: cover;
        }

        .contfoto img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px 12px 0 0;
        }
        .contInfo {
          padding: 0.3rem 1rem;
          display: flex;
          flex-direction: column;
        }

        .contInfo h1 {
          margin: 0;
          font-size: 20px;
          cursor: pointer;
          text-transform: capitalize !important;
        }
        .contInfo p {
          margin: 0;
          font-size: 14px;
        }

        .info {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          font-size: 20px;
        }

        .precio {
          color: #1b72bf;
          border: solid 1px rgb(128, 128, 128, 0.5);
          padding: 0rem 2rem;
          border-radius: 15px;
          font-weight: 500;
        }
        .cartButton {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.2rem;
        }

        .cartButton button {
          border-radius: 50%;
          width: 45px;
          height: 45px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #092640;
        }

        .cartButton p {
          color: gray;
          font-size: 12px;
        }

        @media only screen and (max-width: 1024px) {
          .contInfo h1 {
            font-size: 18px;
          }
          @media only screen and (max-width: 1352px) {
            .contCard  {
              width:100%;

            }
        }
      `}</style>
    </>
  );
};

export default CardShop;
