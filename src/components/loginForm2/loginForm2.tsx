/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ILoginProps } from "@/interface/ILogin";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/userAuthStore";
import { LoginUser } from "@/Services/userService";
//import { setCookie } from "@/helpers/auth-utils";
import Link from "next/link";
import { ILoginError } from "@/interface/IUsers";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleLogo from "../shared/Icons/GoogleLogo/GoogleLogo";
import { validateLoginForm } from "@/validations/validateLoginForm";

interface AuthFormProps {
  type: "login" | "register";
}

const LoginForm: React.FC<AuthFormProps> = ({}) => {
  const initialState = {
    email: "",
    password: "",
  };

  const router = useRouter();
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const login = useAuthStore((state) => state.login);
  const [errors, setError] = useState<ILoginError>(initialState);
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const searchParams = useSearchParams();
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const errors = validateLoginForm(dataUser);
    setError(errors);
    setIsFormValid(
      Object.values(errors).every((error) => error === "") &&
        dataUser.email !== "" &&
        dataUser.password !== ""
    );
  }, [dataUser]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (session && session.user && session.authTokenProvider) {
      const user = {
        id: session.user.id,
        name: session.user.name || "",
        lastName: session.user.lastName || "",
        birthDay: session.user.birthDay || "",
        password: session.user.password || "",
        email: session.user.email || "",
        role: session.user.role,
        isSubscribed: session.user.isSubscribed,
      };
      const token = session.authTokenProvider;
      //document.cookie = `authToken=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
      //setCookie("authToken", token, 7);
      // Guarda los datos en el store
      login(user, token);
      router.push("/dashboard");
    }
  }, [session, login]);
  // const [userName, setUserName] = useState("");

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched({ ...touched, [name]: true });
  };

  // const returnUrl = decodeURIComponent(searchParams.get("returnUrl") || "/");

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles the change of an input field in the form, updating the
   * `dataUser` state with the new value.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event of the input field change.
   * @returns {void}
   */
  /******  250e677a-62cf-49f9-acc2-0678a8eede4e  *******/
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
      toast.success("Login successful!", {
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
    <div className="bg-[url('/images/bg.jpg')] bg-fixed bg-cover h-full flex items-center justify-center ">
      <div className="w-full bg-[#000000a1] h-full  m-0-auto flex items-center justify-center py-20">
        <div className="w-full border-2 border-primary bg-[#000000a1] backdrop-blur-lg   mx-10 md:w-3/5 sm:w-full lg:w-2/5 xl:w-4/12 2xl:w-3/12 rounded-2xl  p-10">
          <div className="">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/solo.png"
                alt="Logo"
                width={60}
                height={200}
              />
            </div>
            <h1 className="text-xl text-primary 2xl:text-xl font-bold text-center pb-2">
              Nice to see you again
            </h1>
            <div className="">
              <form className=" py-5" onSubmit={handleSubmit} action="">
                <div className="flex flex-col pb-3">
                  <label
                    className="block text-sm pb-2 font-medium text-gray-300"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className={`text-sm mt-1 bg-gray-800 block w-full text-white rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                      touched.name && errors.email
                        ? "border-red-500"
                        : touched.email && !errors.email
                        ? "border-green-500"
                        : "border-gray-600"
                    }`}
                    type="email"
                    name="email"
                    value={dataUser.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email address"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm pb-2 font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="relative">
                      <input
                        className={`text-sm mt-1 bg-gray-800 block w-full text-white rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                          touched.name && errors.email
                            ? "border-red-500"
                            : touched.email && !errors.email
                            ? "border-green-500"
                            : "border-gray-600"
                        }`}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Intro your password"
                        name="password"
                        onBlur={handleBlur}
                        value={dataUser.password}
                        onChange={handleChange}
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      >
                        {showPassword ? (
                          <FaEye className="w-5 h-5 text-gray-500" />
                        ) : (
                          <FaEyeSlash className="w-5 h-5 text-gray-500" />
                        )}
                      </span>
                    </div>
                  </div>

                  {touched.password && errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="flex  justify-between">
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      onChange={handleChange}
                      className="h-4 w-4 text-primary  focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-400"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link href="/reset-password" className="text cursor-pointer">
                    <div className="text-sm text-primary">forget password?</div>
                  </Link>
                </div>

                <div className="pb-5">
                  <button
                    className={`w-full rounded-md py-3 mt-5 ${
                      !isFormValid
                        ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                        : "bg-primary text-black hover:bg-[#ffad4f] cursor-pointer"
                    }`}
                    disabled={!isFormValid}
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <hr className="pt-2 border-gray-600 " />
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex justify-center w-full rounded-md border border-gray-900  hover:bg-black hover:border-gray-600 hover:border text-white py-3 mt-5"
              >
                <GoogleLogo />
                Or sign in with Google
              </button>
              <div className="pt-5">
                <p className="text-center text-gray-300 text-sm">
                  Don`t have an account?
                  <span className="text-primary ">
                    <Link
                      href={`/register?returnUrl=${encodeURIComponent(
                        searchParams.get("returnUrl") || ""
                      )}`}
                    >
                      {" "}
                      Sign Up Now
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
