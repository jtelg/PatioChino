import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import APIConsultas from '../../../../../services/consultas';
import servUsos from '../../../../../utils/usos.utils';

const CardShop = ({ props, loading }) => {
  const arr_cartprods = useSelector((s) => s.CART_DATA);

  const router = useRouter();

  const [producto, setProducto] = useState(props);
  const [arr_imgs, setArr_imgs] = useState([]);

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

  useEffect(() => {
    if (!loading) {
      const prod = arr_cartprods?.find((prod) => prod.idart === props.idart);
      const cantidadForm = prod ? prod.cantidadForm : 1;
      setProducto({
        ...props,
        cantidadForm
      });
      props.cantidadForm = cantidadForm;
    }
  }, [arr_cartprods, props, loading]);

  return (
    <>
      <div className={`contCard relative overflow-hidden boxShadow`}>
        {!loading ? (
          <>
            <div className="contfoto">
              <div className="w-full h-full overflow-hidden flex justify-center">
                <img
                  src={arr_imgs[0]}
                  alt="foto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="contInfo Outfit ">
              <h1
                aria-hidden
                className=" font-bold text-secondary Recoleta text-[50px]"
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
              <div className="flex gap-2 h-[75px]">
                <p className="flex-1 leading-4">{producto.descripcion}</p>
                <button
                  onClick={() =>
                    router.push(
                      `/shop/producto/${servUsos.convertUrl(
                        producto.modelo,
                        'convert'
                      )}`
                    )
                  }
                  className="self-end text-white z-10 w-[40px] h-[40px] flex justify-center items-center rounded-full duration-300 hover:bg-primary-500 bg-[#092640]"
                >
                  <i className="bx bxs-cart-add text-2xl"></i>
                </button>
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
          border-radius: 18px;
          width: 330px;
          height: 400px;
        }
        .contCard:hover {
          box-shadow: 0px 2px 15px rgba(0, 0, 0, 30%);
        }
        .contfoto {
          overflow: hidden;
          height: auto;
          max-height:70%;
          object-fit: cover;
        }

        .contfoto img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px 12px 0 0;
        }
        .contInfo {
          padding: 0.3rem 1rem 1rem 1rem;
          display: flex;
          flex-direction: column;
        }

        .contInfo h1 {
          margin: 0;
          font-size: 30px;
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
          
          @media only screen and (max-width: 1352px) {
            .contCard {
              height: auto;
              width: 100%;
            }
            

            
        }
      `}</style>
    </>
  );
};

export default CardShop;
