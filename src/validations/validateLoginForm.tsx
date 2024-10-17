import { ILoginError, ILoginProps } from "@/interface/IUsers";

export function validateLoginForm(values: ILoginProps): ILoginError {
  const errors: ILoginError = { email: "", password: "" };

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
}
