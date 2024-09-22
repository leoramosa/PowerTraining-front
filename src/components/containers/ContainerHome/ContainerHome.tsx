import React from "react";
import { ContainerProps } from "@/interface/container";

const ContainerHome: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full bg-gray-100">
      <div className="container mx-auto px-5 py-10">{children}</div>
    </div>
  );
};

export default ContainerHome;
