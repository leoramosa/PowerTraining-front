import React from 'react';

interface PaginationProps {
  totalItems: number;  
  itemsPerPage: number; 
  currentPage: number;  
  onPageChange: (page: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-400 text-white rounded-l-md hover:bg-primaryLight"
      >
        Prev
      </button>
      <div className="flex items-center mx-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 mx-2 rounded-md ${currentPage === index + 1 ? 'bg-gray-400 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-400 text-white rounded-r-md hover:bg-primaryLight"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
