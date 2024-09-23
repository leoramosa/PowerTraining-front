export interface InputFormProps {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;

  label?: string;
  error?: string;
  readOnly?: boolean;
  className?: string;
}
