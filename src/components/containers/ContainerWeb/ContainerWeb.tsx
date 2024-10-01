import React from "react";
import { ContainerProps } from "@/interface/container";

const ContainerWeb: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={`w-full " ${className}`}>{children}</div>;
};

export default ContainerWeb;
