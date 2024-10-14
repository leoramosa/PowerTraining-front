import { IExercise } from "./IExercise";

export interface Exercise {
  exerciseId: string;
  exerciseName: string;
  series: number;
  repetitions: number;
  weight: number;
}



export interface IRoutineWizard {
  routineData: IRoutineForm;
  trainingDays: TrainingDay[];
}

export interface RoutineWizardProps {
  closeModal: () => void;
  nameModal: string;
  onRoutineCreated: () => void;
}

export interface RoutineWizardProps2 {
    closeModal: () => void;
    nameModal: string;
    onRoutineModify: ()=> void;
    routineMod: IRoutineWizard;
  }
  

export interface IRoutineForm {
  id?: number,
  userId: string;
  userName: string;
  userLastName: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface IUserPartial {
  id: string;
  name: string;
  lastname: string;
}

export interface IRoutineFormProps {
  onSubmit: (dataRoutine: IRoutineForm) => void;
  routineData: IRoutineForm;
  disabledSearchUser: boolean;
}

export interface UserSearchInputProps {
    users: IUserPartial[];
    onUserSelect: (user: IUserPartial) => void;
    onChangeFilter: (value: string) => void;
    placeholder?: string;
    error?: boolean;
    loading?: boolean;
    label?: string;
    user?: IUserPartial;
    isDisabled?: boolean;
  }
  
  export interface Day {
    day: string;        
    workoutName: string; 
    exercises: Exercise[]; 
  }
  
 export  interface User {
    id: string;              
    name: string;            
    avatarUrl: string;        
  }
  
export interface Routine {
    id: string;                  
    name: string;               
    description: string;        
    days: Day[];           
    imageUrl: string;         
    startDate: string;       
    endDate: string;           
    completed: boolean;         
    user: User;             
  }

    
 export interface TrainingDayFormProps {
    onAddDay: (day: TrainingDay) => void;
    selectedDays: number[];
  }
  

 export interface ExerciseFormProps {
    onAddExercise: (dayIndex: number, exercise: Exercise) => void;
    onRemoveExercise: (dayNumber: number, removedExercise: Exercise) => void;
    trainingDays: TrainingDay[]; 
  } 

  export interface IExercisePartial {
    id: string;
    name: string;
  }

  export interface ExerciseSearchInputProps {
    exercises: IExercisePartial[];             
    onExerciseSelect: (exercise: IExercisePartial) => void; 
    onChangeFilter: (filter: string) => void; 
    placeholder?: string;                      
    label?: string;                           
    error?: boolean;                           
    loading?: boolean;                       
  }

 
 export interface IUserRoutine {
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
  }
  
 export interface IRoutineData {
    description: string;
    startDate: string; 
    endDate: string;
    completed: boolean;
    user: IUserRoutine;
    id: number;
  }

  interface IRoutineDataDay {
    id: number;
    description: string;
    startDate: string; 
    endDate: string;  
    completed: boolean;
  }
  
  export interface IRoutineDay {
    date: string;
    description: string;
    routine: IRoutineDataDay;
    id: number;
  }
  
  export interface IExerciseRoutine {
    trainingDayId: number;
    exerciseId: string;
    series: number;
    repetitions: number;
    weight: number;
    completed: boolean;
  }


 export interface IUserId {
    id: string; 
  }
  
 export interface ITrainingExercise {
    id: number; 
    series: number;
    repetitions: number; 
    weight: string; 
    completed: boolean; 
    rpe?: number | null; 
    exercise: IExercise; 
  }


  export interface TrainingDay {
    dayNumber: number;
    muscleGroup: string;
    exercises: Exercise[];
  }

  export interface ITrainingDay {
    id: number; // ID del día de entrenamiento
    date: string; // Fecha del día de entrenamiento
    description: string; // Descripción del día de entrenamiento
    exercises: ITrainingExercise[]; // Lista de ejercicios para este día
  }
  
  export interface IRoutineItem {
    id: number; // ID de la rutina
    name: string;
    description: string; // Descripción de la rutina
    startDate: string; // Fecha de inicio de la rutina
    endDate: string; // Fecha de fin de la rutina
    completed: boolean; // Si la rutina se completó
    user: IUserId; // Usuario asociado a la rutina
    trainingDays: ITrainingDay[]; // Días de entrenamiento asociados a la rutina
  }
  
 export interface IPaginatedRoutines {
    totalItems: number; // Total de rutinas
    totalPages: number; // Total de páginas
    currentPage: number; // Página actual
    items: IRoutineItem[]; // Lista de rutinas
  }
  
  export interface IRoutineItem2 {
    id: number; 
    name: string;
    description: string; 
    startDate: string; 
    endDate: string; 
    completed: boolean; 
    user: IUserPartial; 
    trainingDays: ITrainingDay[]; 
  }