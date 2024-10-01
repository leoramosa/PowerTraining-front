import React from 'react';
import ButtonPrimary from '../buttons/ButtonPrimary/ButtonPrimary';

interface PaginationProps {
  totalPages: number; 
  currentPage: number;  
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; 
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  console.log("Total pages: ",totalPages)
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log(currentPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(currentPage);
    }
  };

  return <>
    {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <ButtonPrimary
          type="button"
          text="Previous"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        />
        <span className="font-semibold">Page {currentPage} of {totalPages}</span>
        <ButtonPrimary
          type="button"
          text="Next"
          onClick={handleNextPage}
          disabled={currentPage == totalPages}
        />
      </div>
  </>
};

export default Pagination;
