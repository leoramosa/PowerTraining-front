import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const ModalCardRoutine: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
}) => {
  return createPortal(
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-12/12 md:w-1/2 lg:w-1/3 p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold mb-4">{title}</h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              &times;
            </button>
          </div>
          <div className="overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-scrollbar scrollbar-track-scrollbar rounded-lg p-2">
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ModalCardRoutine;
