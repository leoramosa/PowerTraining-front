"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { ILoginProps } from "@/interface/ILogin";
import { validateLoginForm } from "@/helpers/login-validate";
import { Login } from "@/helpers/auth-helper";
import { toast } from 'sonner'; // Importa solo 'toast'

const LoginForm: React.FC = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateLoginForm(dataUser);

    if (Object.values(errors).some((err) => err !== "")) {
      // Mostrar alertas de error
      Object.values(errors).forEach((err) => {
        if (err) toast.error(err); // Muestra cada error como un toast
      });
      return;
    }

    try {
      const response = await Login(dataUser);
      if (response) {

        /*
        const { token, user } = response;
        const cleanUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          orders: user.orders,
        };
        localStorage.setItem("userSession", JSON.stringify({ userData: cleanUser, token }));
        */
        // Mostrar un mensaje de éxito al iniciar sesión correctamente
        toast.success("Login successful! Redirecting...");
        
        // Aquí puedes redirigir al usuario después del login
        // Por ejemplo: router.push('/dashboard');
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  return (
    <div className="bg-black shadow-md rounded-lg p-8 max-w-sm mx-auto mt-10">
      <div className="flex justify-center mb-6">
        <Image
          src="/images/LogoLogin.jpg"
          alt="Logo"
          width={200}
          height={200}
        />
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm text-white mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={dataUser.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm text-white mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={dataUser.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-primarLight transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
