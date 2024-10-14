import React from "react";
import { ExerciseFieldKeys } from "@/interface/IExerciseFormError";

interface SelectFormProps {
  name: string;
  label?: string;
  value: string | number;
  options: { label: string; value: string | number, disabled?: boolean }[];
  onChange: (name: string, value: string | number) => void;
  error?: string;
}

const SelectForm: React.FC<SelectFormProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  error,
}) => {
  return (
    <div className="">
      {label && (
        <label
          className="block text-gray-500 text-semibold text-xs mb-1"
        >
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
          error ? "border-red-600 border" : "border-gray-300"
        } focus:border-primary focus:outline-none transition duration-300`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value} disabled={option.disabled}> 
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-sm mt-1 bg-red-100 border border-red-400 rounded-md px-2 py-1 mb-4">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectForm;
