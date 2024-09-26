import React from "react";
import { Title } from "@/interface/title";

const TitleH1: React.FC<Title> = ({ children, className }) => {
  return (
    <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${className}`}>
      {children}
    </h1>
  );
};

export default TitleH1;
