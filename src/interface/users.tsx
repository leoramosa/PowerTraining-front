export interface IRegisterProps {
  name: string;
  lastName: string;
  birthDay: string;
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  name: string;
  lastName: string;
  birthDay: string;
  email: string;
  password: string;
}

export type TRegisterError = Partial<IRegisterProps>;

export interface userSession {
  token: string;
  userData: {
    id: number;
    name: string;
    email: string;
    address: string;
    birthDay: string;
    routines: [];
    progress: [];
  };
}
