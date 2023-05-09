import Link from 'next/link';
const NavCatalogo = (props) => {
  return (
    <div className="uppercase text-xs flex gap-1">
      <Link href="/">
        <a
          title="Regresa al inicio"
          href="."
          tabIndex="0"
          className={`hover:text-primary-600 text-gray-600 transition-all uppercase text-xs`}
        >
          Inicio
        </a>
      </Link>
      <span className="select-none">{'>'}</span>
      <Link href="/">
        <a
          title="Regresa al catalogo"
          href="."
          tabIndex="0"
          className={`hover:text-primary-600 text-gray-600 transition-all uppercase text-xs`}
        >
          {props.data_prod.categoria}
        </a>
      </Link>
      <span className="select-none">{'>'}</span>
      <Link href="/">
        <a
          title="Regresa al catalogo"
          href="."
          tabIndex="0"
          className={`hover:text-primary-600 text-gray-600 transition-all uppercase text-xs`}
        >
          {props.data_prod.subcateg}
        </a>
      </Link>
      <span className="select-none">{'>'}</span>
      <span
        className={`text-gray-600 select-none transition-all uppercase text-xs`}
      >
        {props.data_prod.modelo}
      </span>
    </div>
  );
};
export default NavCatalogo;
