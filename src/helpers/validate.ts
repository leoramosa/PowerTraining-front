import { IError, ILoginProps } from "@/interface/ILogin";

export function validateLoginForm(values: ILoginProps): IError {
  const errors: IError = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'At least 6 characters';
  }

  return errors;
};
