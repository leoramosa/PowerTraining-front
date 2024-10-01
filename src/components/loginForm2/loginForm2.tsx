/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ILoginProps } from "@/interface/ILogin";
import { toast } from "sonner";
import InputFormLogin from "../inputs/InputFormLogin/InputFormLogin";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/userAuthStore";
import { LoginUser } from "@/Services/userService";
//import { setCookie } from "@/helpers/auth-utils";

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
  const login = useAuthStore((state) => state.login);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user && session.authTokenProvider) {
      const user = {
        id: session.user.id,
        name: session.user.name || "",
        lastName: session.user.lastName || "",
        email: session.user.email || "",
      };
      const token = session.authTokenProvider;
      //document.cookie = `authToken=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
      //setCookie("authToken", token, 7);
      // Guarda los datos en el store
      login(user, token);
    }
  }, [session, login]);
  // const [userName, setUserName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await LoginUser(dataUser);
      const { token, userData: user } = response;
      //document.cookie = `authToken=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
      //setCookie("authToken", token, 7);
      login(user, token);
      toast.success("Successful login", {
        position: "top-center",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Error logging in.", {
        position: "top-center",
      });
    }
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
