export interface ILoginProps {
    email: string;
    password: string;
  }
  
  export interface IError {
    email?: string;
    password?: string;
  }
  

  export interface ILoginResponse {
    success: string;
    token: string;
  }

