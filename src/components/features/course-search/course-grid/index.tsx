"use client";
import { useHits } from "react-instantsearch";
import { CourseCard } from "../course-card";

export const CourseGrid = () => {
  const { hits } = useHits();

  if (hits.length === 0) {
    return (
      <div className="text-center py-16 mb-8">
        <p className="text-gray-500 text-lg">
          No courses found. Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {hits.map((hit) => (
        <CourseCard key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
};
