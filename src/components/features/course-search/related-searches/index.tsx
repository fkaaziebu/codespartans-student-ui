"use client";
import { Info } from "lucide-react";

// Related Searches Component
export const RelatedSearches = () => {
  const searches = [
    "react typescript",
    "jonas schmiedtmann",
    "next.js",
    "typescript react",
    "typescript",
    "nextjs 15",
    "next js 15",
    "nextjs",
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-gray-900 font-semibold">Related searches</h3>
        <Info size={18} className="text-gray-400" />
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};
