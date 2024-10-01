import { IExercise } from "./IExercise";
import { ExerciseFieldKeys, IExerciseFormError } from "./IExerciseFormError";

export interface IModalData {
    dataExercise: IExercise;
    typeModal: string;
    nameModal: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>; 
    handleChange?: (name: ExerciseFieldKeys, value: string | File) => void;
    handleBlur: (name: ExerciseFieldKeys, value: string) => void;
    validateDisabledSubmitButton: () => boolean;
    closeModal: (type: string) => void;
    errors: IExerciseFormError;
    isSubmitting: boolean
}