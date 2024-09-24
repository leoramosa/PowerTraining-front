"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ILoginProps } from "@/interface/ILogin";
import { validateLoginForm } from "@/helpers/login-validate";
import { login } from "@/helpers/auth-helper";
import { toast } from "sonner";
import InputForm from "../inputs/InputForm/InputForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const router = useRouter();
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateLoginForm(dataUser);

    if (Object.values(errors).some((err) => err !== "")) {
      Object.values(errors).forEach((err) => {
        if (err) toast.error(err);
      });
      return;
    }

    try {
      const response = await login(dataUser);
      console.log(response);
      if (response) {
        localStorage.setItem("token", response.token);

        toast.success("Login successful! Redirecting...");

        router.push("/dashboard");
        setTimeout(() => (window.location.pathname = "/dashboard"), 2000);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleChange = (name: string, value: string) => {
    setDataUser({ ...dataUser, [name]: value });
  };

  return (
    <div className="bg-[url('/images/bg.jpg')] bg-fixed bg-cover h-full flex items-center py-[120px] justify-center ">
      <div className="bg-[#00000085]  backdrop-blur-md  w-full mx-10 md:w-3/5 sm:w-full lg:w-2/5 xl:w-4/12 2xl:w-3/12 rounded-[25px] shadow-[19px_17px_20px_3px_#00000012] p-10">
        <div className="flex justify-center mb-6">
          <Image src="/images/solo.png" alt="Logo" width={80} height={200} />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-white mb-1">
              Email
            </label>
            <InputForm
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
            <InputForm
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
          <Link href="http://localhost:3002/login">
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-md hover:bg-primarLight transition duration-300"
            >
              Login google
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
