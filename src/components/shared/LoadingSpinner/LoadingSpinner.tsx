import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="text-white text-lg">Estoy en carga...</div>
    </div>
  );
};

export default LoadingSpinner;
