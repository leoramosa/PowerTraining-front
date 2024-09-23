import React from "react";
import { ContainerProps } from "@/interface/container";

const ContainerDash: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`w-full bg-gray-100 ${className} py-10 h-full`}>
      <div className="container mx-auto bg-white px-5 py-10 rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default ContainerDash;
