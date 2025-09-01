import React from "react";

const Pagination = ({
  total,
  currentPage,
  onPageChange,
}: //   limit,
{
  total: number;
  //   limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  if (total <= 1) {
    return null;
  }
  return (
    <div aria-label="Page navigation ">
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
        )}
        {Array.from({ length: total }, (_, index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
          >
            <button
              onClick={() => onPageChange(index + 1)}
              className="page-link"
            >
              {index + 1}
            </button>
          </li>
        ))}
        {currentPage < total && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
