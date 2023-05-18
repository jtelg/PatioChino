import React, { useState, useEffect } from 'react';

const CategFilterMobile = ({ categorias }) => {
  const [href, setHref] = useState('Hamburguesas');

  return (
    <div className="text-secondary  Outfit w-full ">
      <ul className="flex gap-4 w-screen">
        {categorias?.map((name) =>
          name.nombre === 'Todo' ? (
            <button
              key={name.nombre}
              className="flex items-center justify-center"
            >
              <i className="bx bx-chevrons-up text-2xl"></i>
            </button>
          ) : (
            <a
              key={name.nombre}
              onClick={() => setHref(name.nombre)}
              href={`#${name.nombre}`}
            >
              <li
                className={`flex items-center justify-center  ${
                  href === name.nombre &&
                  'border-b-2 border-b-secondary font-semibold'
                } `}
              >
                {name.nombre}
              </li>
            </a>
          )
        )}
      </ul>
      {/* <FormControl
        sx={{
          width: 300,
          background: '#1B72BF',
          color: 'white',
          borderRadius: '20px'
        }}
      >
        <InputLabel id="demo-multiple-name-label">Categorías</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={personName}
          onChange={handleChange}
          // input={<OutlinedInput label="Categorías" />}
        >
          {categorias.arrCategs?.map((name) => (
            <MenuItem key={name.nombre} value={name.nombre}>
              {name.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </div>
  );
};

export default CategFilterMobile;
