import { InputFormLoginProps } from "@/interface/inputs";

const InputFormLogin: React.FC<InputFormLoginProps> = ({
  type,
  name,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  label,
  error,
  readOnly = false,
  labelClassName = "",
  inputClassName = "",
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label
          className={`block text-gray-500 text-semibold  mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-primary"> *</span>}
          {/* Asterisco estilizado */}
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
          disabled={disabled}
          name={name}
          className={`w-full  text-dark   rounded-md border truncate ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300 ${inputClassName}`}
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

export default InputFormLogin;
