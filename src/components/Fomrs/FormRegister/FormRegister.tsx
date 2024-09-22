"use client";

import React, { useState } from "react";
import InputForm from "@/components/inputs/InputForm/InputForm";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import ButtonApp from "@/components/buttons/ButttonApp/ButtonApp";
import { IRegisterProps, TRegisterError } from "@/interface/users";
import { createUser } from "@/Services/userService";
import { validateRegisterForm } from "@/validations/validationsUser";

const FormRegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<IRegisterProps>({
    name: "",
    lastName: "",
    birthDay: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<TRegisterError>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    setSuccess(null);

    try {
      const newUser = await createUser(formData);
      console.log("Usuario creado:", newUser);
      setSuccess("Usuario registrado exitosamente");
    } catch (err) {
      setErrors({ email: "Error al registrar el usuario" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerWeb>
      <form onSubmit={handleSubmit}>
        <InputForm
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your Name"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <InputForm
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter your Last Name"
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

        <InputForm
          name="birthDay"
          type="date"
          label="Birthdate"
          value={formData.birthDay}
          onChange={handleInputChange}
        />
        {errors.birthDay && <p className="text-red-500">{errors.birthDay}</p>}

        <InputForm
          type="email"
          name="email"
          label="Email"
          value={formData.email} // Falta asignar el value
          onChange={handleInputChange} // Falta asignar el onChange
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <InputForm
          type="password"
          name="password"
          label="Password"
          value={formData.password} // Falta asignar el value
          onChange={handleInputChange} // Falta asignar el onChange
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        {success && <p className="text-green-500">{success}</p>}

        <ButtonApp type="submit" variant="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar Usuario"}
          Submit
        </ButtonApp>
      </form>
    </ContainerWeb>
  );
};

export default FormRegisterForm;
