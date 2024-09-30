import { IExercise } from "@/interface/IExercise";
import { IExerciseFormError } from "@/interface/IExerciseFormError";
import { IFiltersExercises } from "@/interface/IPagDataFilters";

export const initialState: IExercise = {
  id: "",
  name: "",
  description: "",
  urlVideoExample: "",
  video: new File([], ""),
  status: "",
  benefits: "",
  tags: "",
};

export const initialStateError: IExerciseFormError = {
  name: "",
  description: "",
  urlVideoExample: "",
  video: "",
  benefits: "",
  tags: "",
};

export const filterInitialValues: IFiltersExercises = {
  name: "",
  benefits: "",
  tags: "",
  status: "active"
};

export const calculateTotalPages = (count: number, limit: number) => {
  const totalPages = Math.ceil(count / limit);
  return totalPages;
};
