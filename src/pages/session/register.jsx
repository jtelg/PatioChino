import React, { useState } from 'react';
import Button from '../../components/utils/button';
import axios from 'axios';

export default function Register({ children }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const confirmarRegistro = async (e) => {
    e.preventDefault();
    // await axios.post('/api/user', { user });
    const objUser = {
      role: 'Cliente',
      nombre: user.name,
      email: user.email,
      image: '',
      pass: '',
      tipodoc: 1,
      numdoc: '',
      telefono: '',
      fecregistro: '',
      recibe_oferta: 0
    };

    await axios.post(`${process.env.NEXTAUTH_URL}/api/user/login`, {
      objUser
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <div>
        <button name="openmodal" className="openModal">
          {children}
        </button>
        <div className="h-screen flex items-center justify-center">
          <div className="bg-slate-50 flex justify-center items-center w-full">
            <form onSubmit={confirmarRegistro}>
              <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-gray-600">
                    Registrando un usuario
                  </h1>
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder=""
                      onChange={handleChange}
                      className="bg-indigo-50 px-4 py-2 outline-none rounded w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Email
                    </label>
                    <input
                      className="bg-indigo-50 px-4 py-2 outline-none rounded w-full"
                      type="text"
                      name="email"
                      placeholder=""
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Password
                    </label>
                    <input
                      className="bg-indigo-50 px-4 py-2 outline-none rounded w-full"
                      type="text"
                      name="password"
                      placeholder=""
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <Button>Registrar</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
