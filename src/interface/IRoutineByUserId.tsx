interface IUserResById {
    id: string;
    googleId: string | null;
    providerId: string | null;
    provider: string | null;
    name: string;
    lastName: string;
    birthDay: string;
    role: string;
    email: string;
    password: string;
    isSubscribed: boolean;
    subscriptionEndDate: string;
    resetOtp: string | null;
    otpExpiresAt: string | null;
  }
  
  interface IExerciseDetailsResById {
    id: string;
    name: string;
    description: string;
    urlVideoExample: string;
    benefits: string;
    tags: string;
    status: string;
  }
  
 export interface IExerciseResById {
    id: number;
    series: number;
    repetitions: number;
    weight: string;
    completed: boolean;
    rpe: number | null;
    exercise: IExerciseDetailsResById;
  }
  
  export interface ITrainingDayResById {
    id: number;
    date: string;
    description: string;
    exercises: IExerciseResById[];
  }
  
  export interface IRoutineResById {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    completed: boolean;
    user: IUserResById;
    trainingDays: ITrainingDayResById[];
  }
  