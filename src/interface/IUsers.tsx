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

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}

export interface IUserState {
  users: IUser[];
  updateUser: (id: string, updatedUser: Partial<IUser>) => Promise<void>;
}

export interface IUserData {
  data: IUser[];
  count: number;
}

export interface IUserFilters {
  name?: string;
  lastname?: string;
  birthday?: string;
  email?: string;
}
