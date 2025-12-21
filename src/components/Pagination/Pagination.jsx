import React from "react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center gap-5 items-center mt-4">
      <button
        className="btn btn-sm rounded-full btn-primary text-white lg:tooltip tooltip-primary lg:tooltip-left"
        data-tip="Previous Page"
        onClick={handlePrev}
        disabled={currentPage === 1 || totalItems === 0}
      >
        <GrLinkPrevious />
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="btn btn-sm rounded-full btn-primary text-white lg:tooltip tooltip-primary lg:tooltip-right"
        data-tip="Next Page"
        onClick={handleNext}
        disabled={currentPage === totalPages || totalItems === 0}
      >
        <GrLinkNext />
      </button>
    </div>
  );
};

export default Pagination;
