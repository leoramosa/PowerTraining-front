import { IRegisterProps, TRegisterError } from "@/interface/IUsers";

export function validateRegisterForm(values: IRegisterProps): TRegisterError {
  const errors: TRegisterError = {};

  if (!values.name) errors.name = "Name is required";
  if (!values.lastName) errors.lastName = "Last name is required";
  if (!values.birthDay) errors.birthDay = "Birth date is required";
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }
  // Password validation
  const passwordErrors: string[] = [];
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (passwordErrors.length > 0) {
    errors.password = passwordErrors.join(" | ");
  }

  // Confirm password validation
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
