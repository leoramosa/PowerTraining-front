import { ButtonPrimaryProps } from "@/interface/button";
import React from "react";

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ text, onClick, type, disabled }) => {
  const styleEnabled = "bg-primary hover:bg-primarLight text-white py-2 px-5 rounded-lg shadow-sm hover:shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1";
  const styleDisabled = "bg-gray-400 cursor-not-allowed text-white py-2 px-5 rounded-lg shadow-sm hover:shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1";
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={ !disabled ? styleEnabled : styleDisabled}
    >
      {text}
    </button>
  );
};

export default ButtonPrimary;
