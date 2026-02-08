"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "react-instantsearch";

export const Pagination = () => {
  const { currentRefinement, nbPages, refine } = usePagination();

  if (nbPages <= 1) return null;

  const currentPage = currentRefinement;

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    pages.push(0);

    if (currentPage > 2) {
      pages.push("ellipsis");
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(nbPages - 2, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < nbPages - 3) {
      pages.push("ellipsis");
    }

    if (nbPages > 1 && !pages.includes(nbPages - 1)) {
      pages.push(nbPages - 1);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        type="button"
        onClick={() => refine(currentPage - 1)}
        disabled={currentPage === 0}
        className="p-2 border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 rounded"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, idx) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-600">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => refine(page)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                page === currentPage
                  ? "border-b-2 border-purple-600 text-purple-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {page + 1}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => refine(currentPage + 1)}
        disabled={currentPage >= nbPages - 1}
        className="p-2 border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 rounded"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
