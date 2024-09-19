import React from "react";
import { ContainerProps } from "@/interface/container";

const ContainerWeb: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full bg-gray-100">
      <div className="container mx-auto bg-white px-5 py-10">{children}</div>
    </div>
  );
};

export default ContainerWeb;
