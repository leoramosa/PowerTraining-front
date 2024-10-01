import { ButtonSecondaryProps } from "@/interface/button";
import React from "react";

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({ text, onClick, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className="bg-white border-primary border hover:bg-gray-100 hover:text-gray-500 text-gray-500  py-2 px-3 rounded-lg shadow-sm hover:shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
      {text}
    </button>
  );
};

export default ButtonSecondary;
