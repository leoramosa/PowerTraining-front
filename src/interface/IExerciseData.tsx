import { IExercise } from "./IExercise";

export interface IExerciseData {
    data: IExercise[];
    count: number;
}

export interface IExerciseDataSend {
    name?: string,
    description?: string,
    benefits?: string,
    tags?: string,
    urlVideoExample?: string,
    status?: string,
}