import { ButtonPrimaryProps } from "@/interface/button";
import React from "react";

const ButtonOk: React.FC<ButtonPrimaryProps> = ({ text, onClick, type, disabled, icon }) => {
  const styleEnabled = "bg-green-600 hover:bg-green-700 text-white py-2 px-5 mx-3 rounded-lg shadow-sm hover:shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1";
  const styleDisabled = "bg-gray-400 cursor-not-allowed text-white py-2 px-5 mx-3 rounded-lg shadow-sm hover:shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1";
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={ !disabled ? styleEnabled : styleDisabled}
    >
      <span className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>} 
        {text}
      </span>
    </button>
  );
};

export default ButtonOk;
