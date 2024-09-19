import React from "react";
import { ItemInfoProps } from "@/interface/ItemInfo";

const ItemInfo: React.FC<ItemInfoProps> = ({ children }) => {
  return (
    <div className="container mx-auto bg-white px-5 py-5 border-2 border-gray-200 shadow-md mb-3 rounded-lg flex items-center justify-between">
      {children}
    </div>
  );
};

export default ItemInfo;
