"use client";
import { BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  searchQuery: string;
  selectedLevel: string;
  selectedDomain: string;
  onReset: () => void;
}

export default function EmptyState({
  searchQuery,
  selectedLevel,
  selectedDomain,
  onReset,
}: EmptyStateProps) {
  const hasActiveFilters =
    searchQuery || selectedLevel !== "all" || selectedDomain !== "all";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        {hasActiveFilters ? (
          <Search className="w-12 h-12 text-gray-400" />
        ) : (
          <BookOpen className="w-12 h-12 text-gray-400" />
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-950 mb-2">
        {hasActiveFilters ? "No courses found" : "No courses available"}
      </h3>

      <p className="text-sm text-gray-600 text-center max-w-md mb-6">
        {hasActiveFilters
          ? "We couldn't find any courses matching your search criteria. Try adjusting your filters or search terms."
          : "There are currently no courses available. Check back later for new courses."}
      </p>

      {hasActiveFilters && (
        <Button
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
