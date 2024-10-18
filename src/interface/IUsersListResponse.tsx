interface IRoutine {
    id: string;
    date: string;
    description: string;
    exercises: IExercise[];
  }
  
  interface IExercise {
    id: string;
    name: string;
    series: number;
    repetitions: number;
    weight: number;
    completed: boolean;
    rpe: number;
  }
  
  interface IUser {
    id: string;
    googleId: string | null;
    providerId: string | null;
    provider: string | null;
    name: string;
    lastName: string;
    birthDay: string; // ISO date string
    role: "User" | "Admin"; // Assuming roles are limited to User or Admin
    email: string;
    password: string;
    isSubscribed: boolean;
    subscriptionEndDate: string; // ISO date string
    resetOtp: string | null;
    otpExpiresAt: string | null; // ISO date string
    lastMessageTimestamp: string | null; // ISO date string
    routines: IRoutine[]; // Assuming routines is an array of routines
  }
  
  export interface IUserDataResponse {
    data: IUser[];
    count: number;
  }
  