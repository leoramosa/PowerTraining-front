import { IExercise } from "@/interface/IExercise";
import { ExerciseFieldKeys, IExerciseFormError } from "@/interface/IExerciseFormError";

/*
    name?: string,
    description?: string,
    urlVideoExample?: string,
    benefits?: string,
    tags?: string
*/


export function validateExerciseForm(errors: IExerciseFormError, values: IExercise): IExerciseFormError {
    const newErrors = { ...errors };
    const nameRegex = /^[a-zA-Z0-9\s\-\/]{1,20}$/;
    const descriptionRegex = /^[a-zA-Z0-9\s.,!?;:()'-áéíóúÁÉÍÓÚüÜñÑ]{10,200}$/;
    const urlRegex = /^[a-zA-Z0-9_.-]+\.mp4$/i;
    const benefitsRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,!?'"()-]{1,100}$/;
    const tagsRegex = /^([a-zA-Z0-9]+(\s*[a-zA-Z0-9]+)*)(,\s*[a-zA-Z0-9]+(\s*[a-zA-Z0-9]+)*)*$/;

    if (values.name && !nameRegex.test(values.name)) {
        newErrors.name = "Must be 1-20 characters; letters, numbers, spaces, hyphens, and slashes allowed.";
    }

    if (values.description && !descriptionRegex.test(values.description)) {
        newErrors.description = "Must be 10-200 characters, letters, numbers, and basic punctuation allowed.";
    }
    
    if (values.urlVideoExample && !urlRegex.test(values.urlVideoExample)) {
        newErrors.urlVideoExample = "Please upload a valid MP4 file (e.g., video.mp4)";
    }

    if (values.benefits && !benefitsRegex.test(values.benefits)) {
        newErrors.benefits = "Must be 1-100 characters, letters, numbers, and basic punctuation allowed.";
    }

    if (values.tags && !tagsRegex.test(values.tags)) {
        newErrors.tags = "Use commas to separate tags; letters and numbers allowed.";
    }
    
    return newErrors
}

export const validateFieldOnBlur = (errors: IExerciseFormError, name: ExerciseFieldKeys, value: string | File) => {
  
    const newErrors = { ...errors };

    if (!value) {
        newErrors[name] = `${name} is required`; 
    } else {
        delete newErrors[name];
    }
  
    return newErrors;
  };