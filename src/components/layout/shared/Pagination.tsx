import React from "react";

interface BackendPagination {
  total: number;
  limit: number;
  page: number;
}

interface PaginationProps {
  pagination: BackendPagination | undefined;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  if (!pagination) return null; // No pagination data

  const { total, limit, page } = pagination;
  const totalPages = Math.max(1, Math.ceil(total / limit)); // Always at least 1 page

  const goToPrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const goToNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={goToPrevious}
        disabled={page <= 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={goToNext}
        disabled={page >= totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
