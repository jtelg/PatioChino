import { Component } from 'react';
import APIConsultas from '../../../../services/consultas';

class CategoryIndex extends Component {
  state = {
    arrCategs: []
  };

  async componentDidMount() {
    let categs = [];
    APIConsultas.categoria.TODO(true).then((repscateg) => {
      categs = repscateg.filter(
        (c) => c.nombre !== 'No definido' && c.visible !== 0
      );
      categs.push({ idcateg: 0, nombre: 'Todo' });
      this.setState({ arrCategs: categs });
    });
  }

  render() {
    return (
      <>
        <section className="flex w-full justify-center pt-4  heightCont  pb-8">
          <article className=" w-full rounded flex flex-col justify-between">
            <ul className="gap-4 rounded mb-4 gridResponsive">
              {this.state.arrCategs.map((c, i) => (
                <a
                  key={i}
                  href={`/shop/Todo#${c.nombre}`}
                  className="flex justify-center   "
                >
                  <div
                    style={{
                      boxShadow: 'inset 0 0 0 1000px rgb(0 0 0 / 30%)'
                    }}
                    className="relative h-[130px] w-[95%] md:w-96 flex justify-center items-center   gridColumn  overflow-hidden rounded-lg"
                  >
                    <div className=" w-full h-full   rounded-lg z-10 flex justify-center items-center blurCateg  ">
                      <div className="Outfit text-white uppercase font-bold text-xl  ">
                        {c.nombre}
                      </div>
                    </div>
                    <img
                      src={`https://api.custer.com.ar/patio-chino/categorias/${c.nombre}.jpg`}
                      alt="foto"
                      className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                  </div>
                </a>
              ))}
            </ul>
          </article>
        </section>
      </>
    );
  }
}

export default CategoryIndex;
