"use client";
import React, { useState } from "react";
import Image from 'next/image';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    console.log("Email:", email, "Password:", password);
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
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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