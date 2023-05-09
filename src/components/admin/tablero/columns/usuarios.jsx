const UsuarioColumnsConfig = () => {
  const columns_user = [
    { field: 'iduser', headerName: 'Code', width: 100 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'telefono', headerName: 'Telefono', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'image', headerName: 'Image', flex: 1 },
    { field: 'numdoc', headerName: 'DNI', type: 'number', flex: 1 },
    { field: 'fecregistro', headerName: 'Fecha Alta', type: 'number', flex: 1 }
  ];

  return { columns_user };
};
export default UsuarioColumnsConfig;
