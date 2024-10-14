export interface ITrainingDay {
  id: number;
  date: string;
  description: string;
  exercises: ITrainingExercise[];
}

export interface IRoutine {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  trainingDays: ITrainingDay[];
}

export interface IExercise {
  id: string;
  name: string;
  description: string;
  urlVideoExample: string;
  status: string;
  benefits: string;
  tags: string;
}

export interface ITrainingExercise {
  id: number;
  series: number;
  repetitions: number;
  weight: string;
  completed: boolean;
  rpe: number | null;
  exercise: IExercise;
}
