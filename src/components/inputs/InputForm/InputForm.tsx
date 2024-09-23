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
      {type === "textarea" ? (
        <textarea
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={readOnly}
          name={name}
          className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300`}
          rows={4}
        />
      ) : (
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          name={name}
          className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300`}
        />
      )}
      {error && (
        <p className="text-red-400 text-sm mt-1 bg-red-100 border border-red-400 rounded-md px-2 py-1 mb-4">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputForm;
