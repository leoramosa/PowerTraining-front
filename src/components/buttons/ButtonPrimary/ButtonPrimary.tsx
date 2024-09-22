import { ButtonPrimaryProps } from "@/interface/button";
import React from "react";

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary hover:bg-primarLight text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
};

export default ButtonPrimary;
