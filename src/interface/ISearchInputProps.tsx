export default interface ISearchInputProps {
  value: string;
  // onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  // onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>, value: string) => void;
  placeholder?: string;
  onClick: () => void;
  options: { label: string; value: string }[];
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
