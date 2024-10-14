import React from "react";
import { Title } from "@/interface/title";

const TitleH2: React.FC<Title> = ({ children }) => {
  return (
    <h2 className="text-xl font-normal text-primary border-b pb-2 mb-2">
      {children}
    </h2>
  );
};

export default TitleH2;
