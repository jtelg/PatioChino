import React, { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CategFilterMobile = ({ categorias, router, href }) => {
  const [personName, setPersonName] = useState(href);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(value);
    router.push(`/shop/${value}`);
  };

  return (
    <div className="text-white rounded-[20px] Outfit">
      <FormControl
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
      </FormControl>
    </div>
  );
};

export default CategFilterMobile;
