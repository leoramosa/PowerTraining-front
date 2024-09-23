export interface InputFormProps {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => void;
  label?: string;
  error?: string;
  readOnly?: boolean;
  name?: string
  className?: string;
}


