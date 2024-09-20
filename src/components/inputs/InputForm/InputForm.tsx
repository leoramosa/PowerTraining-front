import { InputFormProps } from "@/interface/inputs";

const InputForm: React.FC<InputFormProps> = ({
  type,
  name,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  label,
  error,
  readOnly = false,
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label
          className="block text-gray-500 text-semibold text-xs 
         mb-1"
        >
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
          error ? "border-alert" : "border-gray-300"
        } focus:border-primary focus:outline-none transition duration-300`}
      />
      {error && <p className="text-alert text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputForm;
