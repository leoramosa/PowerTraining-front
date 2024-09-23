'use client'
import { InputFormProps } from "@/interface/inputs";
import { useEffect, useState } from "react";

const InputForm: React.FC<InputFormProps> = ({
  type,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  label,
  error,
  readOnly = false,
  name,
}) => {
  const [valueForm, setValueForm] = useState<string>(value ? value : "");

  console.log(value);
  console.log(error);
  useEffect(() => {
    if (value) {
      setValueForm(value);
    }
  }, [valueForm, error]);

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
          value={valueForm}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange) {
              const newValue = e.target.value;
              setValueForm(newValue);
              onChange(e, valueForm);
            }
          }}
          readOnly={readOnly}
          name={name}
          className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border resize-none ${
            error ? "border-alert" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300`}
          rows={4}
        />
      ) : (
        <input
          type={type}
          value={valueForm}
          defaultValue={defaultValue}
          onChange={(e) => {
            if (onChange) {
              const newValue = e.target.value;
              setValueForm(newValue);
              onChange(e, valueForm);
            }
          }}
          placeholder={placeholder}
          readOnly={readOnly}
          name={name}
          className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
            error ? "border-alert" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300`}
        />
      )}
      {error && <p className="text-alert text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputForm;
