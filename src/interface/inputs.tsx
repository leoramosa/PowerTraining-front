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
  onChangeText2?: (name: string, value: string) => void;
  onChangeTextArea2?: (name: string, value: string) => void;
  onBlur?: (name: ExerciseFieldKeys, value: string) => void;
  onBlurTextArea2?: (name: string, value: string) => void;
  onBlurText2?: (name: string, value: string) => void;
  onChangeDate?: (name: string, value: string) => void;
  label?: string;
  error?: string;
  readOnly?: boolean;
  className?: string;
}

export interface InputFormLoginProps {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  file?: File;
  defaultValue?: string;
  onBlur?: (name: ExerciseFieldKeys, value: string) => void;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  label?: string;
  error?: string;
  readOnly?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  required?: boolean;
}
