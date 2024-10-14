import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressClientBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const isComplete = progress === 100;

  return (
    <div className="flex items-center space-x-4 mt-2">
      {/* Barra de progreso */}
      <div className="w-full bg-gray-300 rounded-full h-2 relative shadow-md">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${
            isComplete ? "bg-green-500" : "bg-gray-400"
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Indicador del progreso numérico */}
      <span
        className={`text-sm font-bold ${
          isComplete ? "text-green-500" : "text-gray-400"
        }`}
      >
        {progress}%
      </span>
    </div>
  );
};

export default ProgressClientBar;
