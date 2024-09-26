import { ExerciseFieldKeys } from "./IExerciseFormError";

export interface InputFormProps {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  file?: File;
  defaultValue?: string;
  onChange?: (name: ExerciseFieldKeys, value: string | File) => void;
  onBlur?: (name: ExerciseFieldKeys, value: string) => void;
  label?: string;
  error?: string;
  readOnly?: boolean;
  className?: string;
}
