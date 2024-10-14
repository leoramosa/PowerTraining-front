import { ExerciseFieldKeys } from "@/interface/IExerciseFormError";
import { InputFormProps } from "@/interface/inputs";

const InputForm: React.FC<InputFormProps> = ({
  type,
  name,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  onBlur,
  onChangeDate,
  onChangeText2,
  onBlurText2,
  onChangeTextArea2,
  onBlurTextArea2,
  label,
  error,
  readOnly = false,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && e.target.files) {
      const file = e.target.files[0];
      const name = e.target.name;
      onChange(name as ExerciseFieldKeys, file);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeDate) {
      const selectedDate = e.target.value; 
      const name = e.target.name;
      onChangeDate(name, selectedDate);
    }
  };
  

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
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange) {
              const newValue = e.target.value;
              const name = e.target.name;
              onChange(name as ExerciseFieldKeys, newValue);
            }
          }}
          onBlur={(e) => {
            if (onBlur) {
              const newValue = e.target.value;
              const name = e.target.name;
              onBlur(name as ExerciseFieldKeys, newValue);
            }
          }}
          readOnly={readOnly}
          name={name}
          className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300 overflow-hidden resize-none`}
          rows={4}
        />
      ) :  type === "textarea2" ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            if (onChangeTextArea2) {
              const newValue = e.target.value;
              const name = e.target.name;
              onChangeTextArea2(name, newValue);
            }
          }}
          onBlur={(e) => {
            if (onBlurTextArea2) {
              const newValue = e.target.value;
              const name = e.target.name;
              onBlurTextArea2(name, newValue);
            }
          }}
          readOnly={readOnly}
          name={name}
          className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300 overflow-hidden resize-none`}
          rows={4}
        />
      ) : type === "file" ? (
        <input
          type="file"
          accept=".mp4"
          onChange={handleFileChange}
          onBlur={(e) => {
            if (onBlur) {
              const name = e.target.name;
              const value = e.target.value;
              onBlur(name as ExerciseFieldKeys, value);
            }
          }}
          name={name}
          defaultValue={defaultValue}
          className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300`}
        />
      ) : type === "date" ? (
        <input
          type="date"
          onChange={handleDateChange}
          name={name}
          value={value}
          defaultValue={defaultValue}
          className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300`}
        />
      ) : type === "text2" ? (
        <input
          type={type}
          value={value}
          onChange={(e) => {
            if (onChangeText2) {
              const newValue = e.target.value;
              const name = e.target.name;
              onChangeText2(name, newValue);
            }
          }}
          onBlur={(e) => {
            if (onBlurText2) {
              const newValue = e.target.value;
              const name = e.target.name;
              onBlurText2(name, newValue);
            }
          }}
          placeholder={placeholder}
          readOnly={readOnly}
          name={name}
          className={`w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300`}
        />
      ) :(
        <input
          type={type}
          value={value}
          onChange={(e) => {
            if (onChange) {
              const newValue = e.target.value;
              const name = e.target.name;
              onChange(name as ExerciseFieldKeys, newValue);
            }
          }}
          onBlur={(e) => {
            if (onBlur) {
              const newValue = e.target.value;
              const name = e.target.name;
              onBlur(name as ExerciseFieldKeys, newValue);
            }
          }}
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
