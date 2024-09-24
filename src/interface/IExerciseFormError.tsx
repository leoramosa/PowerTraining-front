export interface IExerciseFormError {
    name?: string,
    description?: string,
    urlVideoExample?: string,
    video?: string,
    benefits?: string,
    tags?: string
}

export type ExerciseFieldKeys = keyof IExerciseFormError;
