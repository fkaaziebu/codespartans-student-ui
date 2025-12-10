"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

// Filter Bar Component
export const FilterBar = () => {
  const [sortBy, setSortBy] = useState("most-relevant");

  const filters = [
    { icon: "≡", label: "All filters" },
    { icon: "?", label: "Quizzes" },
    { icon: "<>", label: "Coding Exercises" },
    { icon: "✓", label: "Practice Tests" },
    { icon: "👤", label: "Role Plays" },
  ];

  return (
    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
      <div className="flex gap-3 flex-wrap">
        {filters.map((filter, index) => (
          <button
            key={index}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium hover:border-gray-400 transition-colors"
          >
            {filter.label}
          </button>
        ))}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium hover:border-gray-400 transition-colors">
          Language
          <ChevronRight size={16} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium hover:border-gray-400 transition-colors">
          Ratings
          <ChevronRight size={16} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium hover:border-gray-400 transition-colors">
          Level
          <ChevronRight size={16} />
        </button>
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border border-gray-300 text-sm font-medium bg-white hover:border-gray-400 transition-colors cursor-pointer"
      >
        <option value="most-relevant">Most Relevant</option>
        <option value="highest-rated">Highest Rated</option>
        <option value="newest">Newest</option>
        <option value="most-popular">Most Popular</option>
      </select>
    </div>
  );
};
