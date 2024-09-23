import { IExercise } from "@/interface/IExercise";
import { IExerciseFormError } from "@/interface/IExerciseFormError";

/*
    name?: string,
    description?: string,
    urlVideoExample?: string,
    benefits?: string,
    tags?: string
*/

type ExerciseFieldKeys = keyof IExerciseFormError;

export function validateExerciseForm(values: IExercise): IExerciseFormError {
    const errors: IExerciseFormError = {};
    const nameRegex = /^[a-zA-Z0-9\s\-\/]{1,20}$/;
    const descriptionRegex = /^[a-zA-Z0-9\s.,!?;:()'-]{10,200}$/;
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    const benefitsRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,!?'"()-]{1,100}$/;
    const tagsRegex = /^([a-zA-Z0-9]+(\s*[a-zA-Z0-9]+)*)(,\s*[a-zA-Z0-9]+(\s*[a-zA-Z0-9]+)*)*$/;

    if (values.name && !nameRegex.test(values.name)) {
        errors.name = "Must be 1-20 characters; letters, numbers, spaces, hyphens, and slashes allowed.";
    }

    if (values.description && !descriptionRegex.test(values.description)) {
        errors.description = "Must be 10-200 characters, letters, numbers, and basic punctuation allowed.";
    }
    
    if (values.urlVideoExample && !urlRegex.test(values.urlVideoExample)) {
        errors.urlVideoExample = "Enter a valid URL (e.g., http:// or https://)";
    }

    if (values.benefits && !benefitsRegex.test(values.benefits)) {
        errors.benefits = "Must be 1-100 characters, letters, numbers, and basic punctuation allowed.";
    }

    if (values.tags && !tagsRegex.test(values.tags)) {
        errors.tags = "Use commas to separate tags; letters and numbers allowed.";
    }
    
    return validateField(errors, values);
}

const validateField = (errors: IExerciseFormError, values: IExercise) => {
  
    const fields: ExerciseFieldKeys[] = ["name", "description", "urlVideoExample", "benefits", "tags"];
  
    for (const field of fields) {
      if (!values[field]) {
        errors[field] = `${field} is required.`;
      }
    }
  
    return errors;
  };