"use client";

import { validateRegisterForm } from "@/helpers/validate";
import PasswordRequirements from "./PasswordRequirements";
import { IRegisterProps, TRegisterError } from "@/interfaces/Types";
import { register } from "@/helpers/auth.helper";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const initialState: IRegisterProps = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  };
  const searchParams = useSearchParams();
  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<TRegisterError>(initialState);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  useEffect(() => {
    const validationErrors = validateRegisterForm(dataUser);
    setErrors(validationErrors);
    setIsFormValid(
      Object.values(validationErrors).every((error) => error === "")
    );
  }, [dataUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched({ ...touched, [name]: true });
  };

  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true);
  };

  const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
    setShowPasswordRequirements(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        await register(dataUser);
        toast.success("Successfully registered user!", {
          position: "top-center",
        });
        const returnUrl = searchParams.get("returnUrl") || "";
        router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
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

  return (
    <div className="bg-gray-100 py-10 m-auto flex justify-center">
      <div className="container w-full sm:w-full md:w-3/5  lg:w-2/5 xl:w-4/12 2xl:w-3/12 bg-white rounded-[30px] shadow-[19px_17px_20px_3px_#00000012] p-10">
        <h1 className="text-2xl font-bold text-center pb-2">
          Create an account
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col pb-3">
            <label className="text-sm font-medium text-gray-400" htmlFor="name">
              Name
            </label>
            <input
              className={`text-sm mt-1 bg-gray-100 block w-full rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                touched.name && errors.name
                  ? "border-red-500"
                  : touched.name && !errors.name
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
              type="text"
              name="name"
              value={dataUser.name}
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
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`text-sm mt-1 bg-gray-100 block w-full rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                touched.email && errors.email
                  ? "border-red-500"
                  : touched.email && !errors.email
                  ? "border-green-500"
                  : "border-gray-300"
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

          <div className="flex flex-col pb-3">
            <label
              className="text-sm font-medium text-gray-400"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className={`text-sm mt-1 bg-gray-100 block w-full rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                touched.address && errors.address
                  ? "border-red-500"
                  : touched.address && !errors.address
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
              type="text"
              name="address"
              value={dataUser.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Type your address"
            />
            {touched.address && errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="flex flex-col pb-3">
            <label
              className="text-sm font-medium text-gray-400"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className={`text-sm mt-1 bg-gray-100 block w-full rounded-md border-2 py-3 px-2 shadow-sm  focus:outline-none ${
                touched.phone && errors.phone
                  ? "border-red-500"
                  : touched.phone && !errors.phone
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
              type="text"
              name="phone"
              value={dataUser.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Type your phone"
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="flex flex-col pb-3">
            <label
              className="text-sm font-medium text-gray-400"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`text-sm mt-1 bg-gray-100 block w-full rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                touched.password && errors.password
                  ? "border-red-500"
                  : touched.password && !errors.password
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
              type="password"
              name="password"
              value={dataUser.password}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              placeholder="Enter your password"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            {showPasswordRequirements && (
              <PasswordRequirements password={dataUser.password} />
            )}
          </div>

          <div className="flex flex-col pb-3">
            <label
              className="text-sm font-medium text-gray-400"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className={`text-sm mt-1 bg-gray-100 block w-full rounded-md border-2 py-3 px-2 shadow-sm focus:outline-none ${
                touched.confirmPassword && errors.confirmPassword
                  ? "border-red-500"
                  : touched.confirmPassword && !errors.confirmPassword
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
              type="password"
              name="confirmPassword"
              value={dataUser.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm your password"
            />
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
                    : "bg-blue-500 text-white hover:bg-blue-600"
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
  );
};

export default Register;
