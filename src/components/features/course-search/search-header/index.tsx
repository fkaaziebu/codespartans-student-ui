"use client";
import { useStats } from "react-instantsearch";

export const SearchHeader = () => {
  const { nbHits, query } = useStats();

  return (
    <div className="mb-6 mt-8">
      <h1 className="text-2xl font-bold text-gray-900">
        {nbHits.toLocaleString()} results for &quot;{query}&quot;
      </h1>
    </div>
  );
};
