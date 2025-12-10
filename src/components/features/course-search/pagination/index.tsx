"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Pagination Component
export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 417;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button className="p-2 border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50">
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-2">
        <button className="px-3 py-2 border-b-2 border-purple-600 text-purple-600 font-semibold">
          1
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
          2
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
          3
        </button>
        <span className="px-3 py-2 text-gray-600">...</span>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
          {totalPages}
        </button>
      </div>

      <button className="p-2 border border-gray-300 hover:bg-gray-100 transition-colors">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
