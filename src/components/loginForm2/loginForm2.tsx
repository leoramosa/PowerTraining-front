"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ILoginProps } from "@/interface/ILogin";
import { validateLoginForm } from "@/helpers/login-validate";
import { Login } from "@/helpers/auth-helper";
import { toast } from "sonner";
import InputFormLogin from "../inputs/InputFormLogin/InputFormLogin";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/useAuthStore";

interface AuthFormProps {
  type: "login" | "register";
}

const LoginForm: React.FC<AuthFormProps> = ({ type }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const router = useRouter();
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const authStore = useAuthStore();
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState("");

  // Este useEffect redirige al dashboard y almacena el token en localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = window.localStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(`${user.name} ${user.lastName}`);
      }
    }
    console.log("Nombre del usuario:", userName);
  }, []);

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
      const response = await Login(dataUser);
      if (response && response.user && response.token) {
        authStore.login(response.user, response.token);
        // Almacena el token y los datos del usuario en el localStorage
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userData", JSON.stringify(response.user));
        toast.success("Inicio de sesión exitoso! Redirigiendo...");
        router.push("/dashboard");
      } else {
        throw new Error("Respuesta de inicio de sesión inválida");
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      toast.error(
        "Inicio de sesión fallido. Por favor, verifica tus credenciales."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <div className="bg-[url('/images/bg.jpg')] bg-fixed bg-cover h-full flex items-center py-[120px] justify-center ">
      <div className="bg-[#00000085] backdrop-blur-md w-full mx-10 md:w-3/5 sm:w-full lg:w-2/5 xl:w-4/12 2xl:w-3/12 rounded-[15px] shadow-[19px_17px_20px_3px_#00000012] p-10">
        <div className="flex justify-center mb-6">
          <Image src="/images/solo.png" alt="Logo" width={80} height={200} />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-white mb-1">
              Email
            </label>
            <InputFormLogin
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
            <InputFormLogin
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
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {type === "login" ? "Google" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
