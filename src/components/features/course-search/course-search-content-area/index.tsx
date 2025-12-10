import { CourseGrid } from "../course-grid";
import { FilterBar } from "../filter-bar";
import { Pagination } from "../pagination";
import { RecommendedTopics } from "../recommended-topics";
import { RelatedSearches } from "../related-searches";

// Main Component
export const CourseSearchContentArea = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-8">
        <RecommendedTopics />
        <FilterBar />
        <CourseGrid />
        <RelatedSearches />
        <Pagination />
      </div>
    </div>
  );
};
