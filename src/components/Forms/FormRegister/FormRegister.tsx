"use client";

import React, { useEffect, useState } from "react";
import InputFormLogin from "@/components/inputs/InputFormLogin/InputFormLogin";
import ButtonApp from "@/components/buttons/ButtonApp/ButtonApp";
import { IRegisterProps, TRegisterError } from "@/interface/IUsers";
import { createUser } from "@/Services/userService";
import { validateRegisterForm } from "@/validations/validationsUser";
import { toast } from "sonner";
import PasswordRequirements from "./PasswordRequirements";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleLogo from "@/components/shared/Icons/GoogleLogo/GoogleLogo";
import { signIn, useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/userAuthStore";

const FormRegisterForm: React.FC = () => {
  const initialFormData: IRegisterProps = {
    name: "",
    lastName: "",
    birthDay: "",
    email: "",
    confirmPassword: "",
    password: "",
  };
  const { data: session } = useSession();
  const login = useAuthStore((state) => state.login);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState<IRegisterProps>(initialFormData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState<TRegisterError>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched({ ...touched, [name]: true });
  };

  useEffect(() => {
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);
    setIsFormValid(
      Object.values(validationErrors).every((error) => error === "")
    );
  }, [formData]);

  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setShowPasswordRequirements(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        await createUser(formData);
        toast.success("Successfully registered user!", {
          position: "top-center",
        });
        const returnUrl = searchParams.get("returnUrl") || "";
        router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.message === "Email already registered.") {
          toast.error("This email is already registered. Please use another.");
        } else {
          toast.warning(
            "This email is already registered. Please use another",
            {
              position: "top-center",
            }
          );
        }
      }
    } else {
      toast.error("Please correct the errors in the form");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <div className="bg-[url('/images/bg.jpg')] bg-fixed bg-cover h-full flex items-center justify-center">
      <div className="w-full bg-[#000000a1] h-full py-20 m-0-auto flex items-center justify-center">
        <div className="container bg-[#00000085] backdrop-blur-md border-2 border-primary w-full sm:w-full md:w-3/5  lg:w-2/5 xl:w-4/12 2xl:w-3/12  rounded-[30px] shadow-[19px_17px_20px_3px_#00000012] p-10">
          <h1 className="text-2xl text-primary font-bold text-center pb-2">
            Create an account
          </h1>

          <button
            onClick={handleGoogleSignIn}
            className="flex justify-center w-full rounded-md border border-gray-900  hover:bg-black hover:border-gray-600 hover:border text-white py-3 mt-5"
          >
            <GoogleLogo />
            Register with Google
          </button>
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col pb-3">
              <label
                className="text-sm font-medium text-gray-400"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`text-sm mt-1 bg-gray-800 block w-full text-white rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : touched.name && !errors.name
                    ? "border-green-500"
                    : "border-gray-600"
                }`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Type your name"
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col pb-3">
              <label
                className="text-sm font-medium text-gray-400"
                htmlFor="name"
              >
                Last Name
              </label>
              <input
                className={`text-sm mt-1 bg-gray-800 text-white block w-full rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                  touched.lastName && errors.lastName
                    ? "border-red-500"
                    : touched.lastName && !errors.lastName
                    ? "border-green-500"
                    : "border-gray-600"
                }`}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Last Name"
              />
              {touched.lastName && errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
            <div className="flex flex-col pb-3">
              <label
                className="text-sm font-medium text-gray-400"
                htmlFor="birthDay"
              >
                Birthday
              </label>
              <input
                className={`text-sm mt-1 bg-gray-800 text-white block w-full rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                  touched.birthDay && errors.birthDay
                    ? "border-red-500"
                    : touched.birthDay && !errors.birthDay
                    ? "border-green-500"
                    : "border-gray-600"
                }`}
                type="date"
                name="birthDay"
                value={formData.birthDay}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Type your name"
              />
              {touched.birthDay && errors.birthDay && (
                <p className="text-red-500 text-sm">{errors.birthDay}</p>
              )}
            </div>

            <div className="flex flex-col pb-3">
              <label
                className="text-sm font-medium text-gray-400"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`text-sm mt-1 bg-gray-800 text-white block w-full rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : touched.email && !errors.email
                    ? "border-green-500"
                    : "border-gray-600"
                }`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email address"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col pb-3 relative">
              <label
                className="text-sm font-medium text-gray-400"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className={`text-sm mt-1 bg-gray-800 block w-full text-white rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : touched.password && !errors.password
                      ? "border-green-500"
                      : "border-gray-600"
                  }`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  placeholder="Enter your password"
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

              {touched.password && errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              {showPasswordRequirements && (
                <PasswordRequirements password={formData.password} />
              )}
            </div>

            <div className="flex flex-col pb-3">
              <label
                className="text-sm font-medium text-gray-400"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className={`text-sm mt-1 bg-gray-800  text-white block w-full rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500"
                      : touched.confirmPassword && !errors.confirmPassword
                      ? "border-green-500"
                      : "border-gray-600"
                  }`}
                  type={showPasswordConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                />
                <span
                  onClick={togglePasswordVisibilityConfirm}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showPasswordConfirm ? (
                    <FaEye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FaEyeSlash className="w-5 h-5 text-gray-500" />
                  )}
                </span>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                className={`w-full rounded-md py-3 mt-5 
              ${
                !isFormValid
                  ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                  : "bg-primary text-black hover:bg-[#ffad4f]"
              }`}
                disabled={!isFormValid}
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegisterForm;
