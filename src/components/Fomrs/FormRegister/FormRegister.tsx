"use client";

import React, { useEffect, useState } from "react";
import InputFormLogin from "@/components/inputs/InputFormLogin/InputFormLogin";
import ButtonApp from "@/components/buttons/ButtonApp/ButtonApp";
import { IRegisterProps, TRegisterError } from "@/interface/IUsers";
import { createUser } from "@/Services/userService";
import { validateRegisterForm } from "@/validations/validationsUser";
import { toast } from "sonner";

const FormRegisterForm: React.FC = () => {
  const initialFormData: IRegisterProps = {
    name: "",
    lastName: "",
    birthDay: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState<IRegisterProps>(initialFormData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState<TRegisterError>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const validationErrors = validateRegisterForm(formData);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     isFormValid;
  //     return;
  //   }
  //   setLoading(true);
  //   setErrors({});

  //   try {
  //     const newUser = await createUser(formData);
  //     toast.success("Successfully registered user!", {
  //       position: "top-center",
  //     });

  //     setFormData(initialFormData);
  //   } catch (error: any) {
  //     if (error.message === "Email already registered.") {
  //       toast.error("This email is already registered. Please use another.");
  //     } else {
  //       toast.warning("This email is already registered. Please use another", {
  //         position: "top-center",
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);
    setIsFormValid(
      Object.values(validationErrors).every((error) => error === "")
    );
  }, [formData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        await createUser(formData);
        toast.success("Successfully registered user!", {
          position: "top-center",
        });
        // const returnUrl = searchParams.get("returnUrl") || "";
        // router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
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
    <div className="bg-[url('/images/bg.jpg')] bg-fixed bg-cover h-full flex items-center justify-center ">
      <div className="w-full bg-[#000000a1] h-full py-[120px] m-0-auto flex items-center justify-center">
        <form
          className=" w-full bg-[#00000085] backdrop-blur-md border-2 border-primary sm:w-full md:w-3/5  lg:w-2/5 xl:w-4/12 2xl:w-3/12  rounded-[25px] shadow-[19px_17px_20px_3px_#00000012] p-10"
          onSubmit={handleSubmit}
        >
          <InputFormLogin
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your Name"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <InputFormLogin
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your Last Name"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

          <InputFormLogin
            name="birthDay"
            type="date"
            label="Birthdate"
            value={formData.birthDay}
            onChange={handleInputChange}
          />
          {errors.birthDay && <p className="text-red-500">{errors.birthDay}</p>}

          <InputFormLogin
            type="email"
            name="email"
            label="Email"
            value={formData.email} // Falta asignar el value
            onChange={handleInputChange} // Falta asignar el onChange
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <InputFormLogin
            type="password"
            name="password"
            label="Password"
            value={formData.password} // Falta asignar el value
            onChange={handleInputChange} // Falta asignar el onChange
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <ButtonApp
            className={`w-full py-2 mt-4  ${
              !isFormValid
                ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                : "bg-primary text-white hover:bg-blue-600"
            }`}
            type="submit"
            variant="login"
            disabled={!isFormValid}
          >
            {loading ? "Registrando..." : "Registrar User"}
          </ButtonApp>
        </form>
      </div>
    </div>
  );
};

export default FormRegisterForm;
