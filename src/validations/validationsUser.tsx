import { IRegisterProps, TRegisterError } from "@/interface/users";

export function validateRegisterForm(values: IRegisterProps): TRegisterError {
  const errors: TRegisterError = {};

  if (!values.name) errors.name = "Name is required";
  if (!values.lastName) errors.lastName = "Last name is required";
  if (!values.birthDay) errors.birthDay = "Birth date is required";
  if (!values.email) errors.email = "Email is required";
  if (!values.password) errors.password = "Password is required";
  return errors;
}
