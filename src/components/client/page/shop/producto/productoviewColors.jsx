import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Boton from '../utils/button';
import NavCatalogo from './navcatalogo';
import { CARRITO_ADD } from '../../redux/actions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import APIConsultas from '../../services/consultas';
const ProductoUse = (props) => {
  const dispatch = useDispatch();
  const [arr_color, setArr_color] = useState([]);
  const [arr_medidas, setArr_medidas] = useState([]);
  const [arr_imgs, setArr_imgs] = useState([]);
  const [producto, setProducto] = useState(props.data_prod);
  const [medidaSelected, setMedidaSelected] = useState(null);
  useEffect(() => {
    const jsoncolor = props.data_prod.arrcolor || [];
    let medidas = [];
    if (props.data_prod.typeCatalog === 0) {
      medidas = props.data_prod.arrmedidasIndiv;
      APIConsultas.Images.SET_IMAGE(props.data_prod).then((imgs) => {
        setArr_imgs(imgs);
        setProducto((prevData) => (prevData.images = imgs));
      });
    } else {
      medidas = props.data_prod.arrcolor[0].arrmedidas;
      if (medidas) setMedidaSelected(medidas[0]);
      APIConsultas.Images.SET_ARRCOLOR(props.data_prod).then((prod) => {
        const images = prod.arrcolor.reduce((a, b) => a + b.arrimages, '');
        setArr_imgs(prod.arrcolor[0].arrimages);
        setProducto((prevData) => (prevData.images = images));
      });
    }
    setArr_medidas(medidas);
    setArr_color(jsoncolor);
    setProducto({
      ...props.data_prod,
      color: jsoncolor[0]?.nomcolor,
      medida: '',
      cantidadForm: 1
    });
  }, [props.data_prod, props.data_prod.arrcolor, producto]);

  const handleInputChange = (event) => {
    setProducto({
      ...producto,
      [event.target.name]: event.target.value
    });

    if (event.target.name === 'color') {
      const color = arr_color.find((c) => c.nomcolor === event.target.value);
      if (!color) return;
      setArr_medidas(color.arrmedidas);
      setArr_imgs(color.arrimages);
      setMedidaSelected(color.arrmedidas[0]);
    } else if (event.target.name === 'medida') {
      const medida = arr_medidas.find((m) => m.valor === event.target.value);
      setMedidaSelected(medida);
    }
  };
  const CountChange = (index) => {
    let count = producto.cantidadForm;
    if (index === 'resta') {
      count = count === 1 ? 1 : count - 1;
    } else {
      count = count + 1;
    }
    setProducto({
      ...producto,
      cantidadForm: count
    });
  };

  const agregarCarrito = () => {
    dispatch(CARRITO_ADD(producto));
  };

  const openSelect = (ev, id) => {
    ev.preventDefault();
    document.getElementById(id).click();
  };

  return {
    arr_imgs,
    arr_color,
    arr_medidas,
    openSelect,
    handleInputChange,
    CountChange,
    producto,
    medidaSelected,
    agregarCarrito
  };
};

const Producto = (props) => {
  const {
    arr_imgs,
    arr_color,
    arr_medidas,
    openSelect,
    handleInputChange,
    CountChange,
    producto,
    medidaSelected,
    agregarCarrito
  } = ProductoUse(props);
  return (
    <>
      <article className="flex flex-col justify-center items-center border-b-8 border-b-primary-200">
        <div className={`card w-full`}>
          <div className="w-full overflow-hidden flex justify-center">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              slidesPerView={1}
              spaceBetween={0}
              navigation
              pagination={{ clickable: true }}
              className="w-full bg-primary-100 min-h-screen"
            >
              {arr_imgs?.map((img, index) => (
                <SwiperSlide className="w-full bg-white" key={index}>
                  <div className="min-h-screen relative">
                    <Image
                      src={img}
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={`cardRigth border-l-primary-200 border-l-2 gap-8 `}>
            <NavCatalogo data_prod={props.data_prod} />
            <h1>{props.data_prod.modelo}</h1>
            <div className="precio">
              <p>
                <span>
                  $ {props.data_prod.precioventa.toLocaleString('de')}
                </span>
              </p>
            </div>
            <div className="w-full flex flex-col gap-6 justify-between h-full">
              <div className="flex flex-col gap-6">
                <div className="flex w-full gap-4">
                  {props.data_prod.typeCatalog === 1 ? (
                    <>
                      <div className="group w-full flex flex-col gap-2">
                        <label
                          className="uppercase text-xs font-bold text-primary-700"
                          htmlFor="color"
                        >
                          Color
                          <abbr title="required">*</abbr>
                        </label>
                        <div className="relative w-full flex items-center">
                          <span
                            tabIndex="0"
                            role="button"
                            aria-hidden
                            className="material-icons-outlined group-hover:text-primary-600 absolute right-2 cursor-pointer transition-all"
                            onClick={(ev) => openSelect(ev, 'color')}
                          >
                            south
                          </span>
                          <select
                            name="color"
                            id="color"
                            className="h-10 px-2 w-full cursor-pointer outline-primary-600"
                            onChange={handleInputChange}
                          >
                            {arr_color.map((color, index) => (
                              <option value={color.nomcolor} key={index}>
                                {color.nomcolor}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="group  w-full flex flex-col gap-2">
                        <label
                          className="uppercase text-xs font-bold text-primary-700"
                          htmlFor="medida"
                        >
                          Medida
                          <abbr title="required">*</abbr>
                        </label>
                        <div className="relative w-full flex items-center">
                          <span
                            tabIndex="0"
                            role="button"
                            aria-hidden
                            className="material-icons-outlined group-hover:text-primary-600 absolute right-2 cursor-pointer transition-all"
                          >
                            south
                          </span>
                          <select
                            name="medida"
                            id="medida"
                            className="h-10 px-2 w-full cursor-pointer outline-primary-600"
                            onChange={handleInputChange}
                          >
                            {arr_medidas?.map((medida, index) => (
                              <option value={medida.valor} key={index}>
                                {medida.valor}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {arr_medidas?.length > 0 && (
                        <div className="group  w-full flex flex-col gap-2">
                          <label
                            className="uppercase text-xs font-bold text-primary-700"
                            htmlFor="medida"
                          >
                            Medida
                            <abbr title="required">*</abbr>
                          </label>
                          <div className="relative w-full flex items-center">
                            <span
                              tabIndex="0"
                              role="button"
                              aria-hidden
                              className="material-icons-outlined group-hover:text-primary-600 absolute right-2 cursor-pointer transition-all"
                            >
                              south
                            </span>
                            <select
                              name="medida"
                              id="medida"
                              className="h-10 px-2 w-full cursor-pointer outline-primary-600"
                              onChange={handleInputChange}
                            >
                              {arr_medidas?.map((medida, index) => (
                                <option value={medida.valor} key={index}>
                                  {medida.valor}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="flex w-full gap-4">
                  <div className="group w-full flex flex-col gap-2">
                    <label
                      className="uppercase text-xs font-bold text-primary-700"
                      htmlFor="cantidadForm"
                    >
                      Cantidad
                      <abbr title="required">*</abbr>
                    </label>
                    <div className="relative w-full flex items-center">
                      <span
                        tabIndex="0"
                        role="button"
                        aria-hidden
                        className="material-icons-outlined group-hover:text-primary-600 absolute left-2 cursor-pointer transition-all"
                        onClick={() => CountChange('resta')}
                      >
                        remove
                      </span>
                      <input
                        type="number"
                        min="1"
                        name="cantidadForm"
                        id="cantidadForm"
                        className="h-10 px-2 w-full text-center outline-primary-600"
                        value={producto.cantidadForm}
                        onChange={handleInputChange}
                      ></input>
                      <span
                        tabIndex="0"
                        role="button"
                        aria-hidden
                        className="material-icons-outlined group-hover:text-primary-600 absolute right-2 cursor-pointer transition-all"
                        onClick={() => CountChange('suma')}
                      >
                        add
                      </span>
                    </div>
                  </div>
                  {arr_medidas?.length > 0 && (
                    <div className="group w-full flex flex-col gap-2">
                      <label
                        className="uppercase text-xs font-bold text-primary-700"
                        htmlFor="medida"
                      >
                        -
                      </label>
                      <div className="relative w-full flex items-center">
                        <span className="material-icons-outlined group-hover:text-primary-600 absolute right-2 cursor-pointer transition-all">
                          square_foot
                        </span>
                        <input
                          name="medida"
                          id="medida"
                          className="h-10 px-2 w-full cursor-pointer outline-primary-600"
                          value="Guía de talles"
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <Boton
                    color={'primary'}
                    onClick={() => {
                      (medidaSelected?.visible === 0 || !arr_medidas) &&
                        agregarCarrito();
                    }}
                    paddingX={'1rem'}
                  >
                    <span className="material-icons text-xl pr-2">
                      shopping_cart
                    </span>

                    {medidaSelected?.visible === 0 || !arr_medidas ? (
                      <>Añadir al carrito</>
                    ) : (
                      <>
                        <p className="underline">SIN STOCK</p>
                      </>
                    )}
                  </Boton>
                </div>
              </div>
              <div className="flex flex-col gap-2 h-full">
                <p className="uppercase text-xs font-bold text-primary-700">
                  Descripcion
                </p>
                <h3>
                  Conjunto triangulo estilo bralette sin armado, tela encaje con
                  lycra. Con elastico de microfibra suave en cintura. Less de
                  breteles regulables encaje. Colores: Negro, Blanco, Sofia,
                  Salmon, Frutilla, Rojo. Talles: 85 al 100. EL ENCAJE PUEDE
                  VARIAR SEGUN EL COLOR
                </h3>
              </div>
            </div>
          </div>
        </div>
      </article>

      <style jsx>{`
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }

        .card {
          display: flex;
          max-height: 90vh;
          /* height: 400px; */
          border-radius: 10px;
        }

        .cardRigth {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          width: 50%;
        }

        .cardRigth h1 {
          font-weight: 700;
          font-size: 26px;
          color: var(--color-red);
          text-transform: uppercase;
          margin: 0px;
        }
        .precio p {
          font-size: 20px;
          font-weight: 100;
          margin: 0;
        }

        .precio span {
          color: var(--color-primary);
          font-weight: 550;
          font-size: 30px;
        }

        .precio p:nth-child(2) {
          font-size: 13px;
          letter-spacing: normal;
          font-weight: 400;
          margin: 0;
          position: relative;
          top: -5px;
        }
      `}</style>
    </>
  );
};
export default Producto;
