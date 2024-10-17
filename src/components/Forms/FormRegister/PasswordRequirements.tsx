import { useState, useEffect } from "react";

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
}) => {
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
    lowercase: false,
  });

  useEffect(() => {
    setRequirements({
      length: password.length >= 8 && password.length <= 20,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      lowercase: /[a-z]/.test(password),
    });
  }, [password]);

  return (
    <div className="mt-2">
      <ul className="list-disc list-inside text-sm">
        <li className={requirements.length ? "text-green-500" : "text-red-500"}>
          Suitable length (8-20 caracteres)
        </li>
        <li
          className={requirements.uppercase ? "text-green-500" : "text-red-500"}
        >
          Contains capital letter
        </li>
        <li className={requirements.number ? "text-green-500" : "text-red-500"}>
          Contains number
        </li>
        <li
          className={requirements.special ? "text-green-500" : "text-red-500"}
        >
          Contains special character
        </li>
        <li
          className={requirements.lowercase ? "text-green-500" : "text-red-500"}
        >
          Contains lowercase
        </li>
      </ul>
    </div>
  );
};

export default PasswordRequirements;
