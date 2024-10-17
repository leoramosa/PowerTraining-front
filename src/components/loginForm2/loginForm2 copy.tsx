"use client";

import { login } from "@/helpers/auth.helper";
import { validateLoginForm } from "@/helpers/validate";
import { ILoginError, ILoginProps } from "@/interfaces/Types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import GoogleLogo from "../shared/Icons/GoogleLogo/GoogleLogo";
import { toast } from "sonner";

const Login = () => {
  const { setUserData } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialState = {
    email: "",
    password: "",
  };
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setError] = useState<ILoginError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  useEffect(() => {
    const errors = validateLoginForm(dataUser);
    setError(errors);
    setIsFormValid(
      Object.values(errors).every((error) => error === "") &&
        dataUser.email !== "" &&
        dataUser.password !== ""
    );
  }, [dataUser]);

  const returnUrl = decodeURIComponent(searchParams.get("returnUrl") || "/");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (errors.email) {
      toast.error("Please enter a valid email", {
        position: "top-center",
      });
      return;
    }

    try {
      const response = await login(dataUser);
      const { token, user } = response;
      const clearUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        orders: user.orders,
      };

      setUserData({ token, userData: clearUser });
      toast.success("Successful login", {
        position: "top-center",
      });

      if (returnUrl && returnUrl !== "/") {
        router.push(returnUrl);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Error logging in.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="bg-gray-100 py-10 m-auto flex justify-center">
      <div className="bg-white w-full mx-10 md:w-3/5 sm:w-full lg:w-2/5 xl:w-4/12 2xl:w-3/12 rounded-[25px] shadow-[19px_17px_20px_3px_#00000012] p-10">
        <h1 className="text-2xl 2xl:text-lg font-bold text-center pb-2">
          Nice to see you again
        </h1>
        <form className=" py-5" onSubmit={handleSubmit} action="">
          <div className="flex flex-col pb-3">
            <label
              className="block text-md font-medium text-gray-400"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border-2 bg-gray-100 rounded-md py-3 px-2 focus:outline-none focus:border-blue-500"
              type="email"
              name="email"
              value={dataUser.email}
              onChange={handleChange}
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="mt-1 bg-gray-100 block w-full rounded-md border-2 py-3 px-2  border-gray-300  shadow-sm focus:outline-none focus:border-blue-500"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Intro your password"
                name="password"
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

            {errors.password && (
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
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <Link href="/forgot-password pointer">
              <div className="text-sm text-blue-500">forget password?</div>
            </Link>
          </div>

          <div className="pb-5">
            <button
              className={`w-full rounded-md py-3 mt-5 ${
                !isFormValid
                  ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={!isFormValid}
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
        <hr className="pt-2" />
        <button className="flex justify-center w-full rounded-md bg-gray-600 text-white py-3 mt-5">
          <GoogleLogo />
          Or sign in with Google
        </button>
        <div className="pt-5">
          <p className="text-center text-sm">
            Don`t have an account?
            <span className="text-blue-500">
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
  );
};

export default Login;
