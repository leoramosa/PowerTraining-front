import { IExercise } from "@/interface/IExercise";
import { IExerciseFormError } from "@/interface/IExerciseFormError";

/*
    name?: string,
    description?: string,
    urlVideoExample?: string,
    benefits?: string,
    tags?: string
*/
export function validateExerciseForm(values: IExercise): IExerciseFormError {
    const errors: IExerciseFormError = {};
    const nameRegex = /^[a-zA-Z\s]{1,50}$/;
    const descriptionRegex = /^[a-zA-Z0-9\s.,!?;:()'-]{1,200}$/;
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    const benefitsRegex = /^[a-zA-Z0-9\s.,!?;:()'-]{1,100}$/;
    const tagsRegex = /^([a-zA-Z0-9]+(,\s*[a-zA-Z0-9]+)*){1,100}$/;


    if (values.name && !nameRegex.test(values.name)) {
        errors.name = "Invalid name. It must be 1 to 50 characters long and contain only letters and spaces.";
    }

    if (values.description && !descriptionRegex.test(values.description)) {
        errors.description = "Invalid description. It must be 1 to 200 characters long and can include letters, numbers, and basic punctuation.";
    }
    
    if (values.urlVideoExample && !urlRegex.test(values.urlVideoExample)) {
        errors.urlVideoExample = "Invalid URL. Please provide a valid web address starting with 'http://' or 'https://'.";
    }

    if (values.benefits && !benefitsRegex.test(values.benefits)) {
        errors.benefits = "Invalid benefits. It must be 1 to 100 characters long and can include letters, numbers, and basic punctuation.";
    }

    if (values.tags && !tagsRegex.test(values.tags)) {
        errors.tags = "Invalid tags. Please separate tags with commas and ensure they contain only letters and numbers.";
    }

    return errors
}