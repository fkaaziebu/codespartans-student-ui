"use client";
import { Loader2, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Course } from "@/common/graphql/generated/graphql";
import { useListOrganizationCourses } from "@/common/hooks/queries";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  return (
    <Suspense>
      <SearchInputWithSearchParams />
    </Suspense>
  );
};

const SearchInputWithSearchParams = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { listOrganizationCourses } = useListOrganizationCourses();

  const handleClear = () => {
    setValue("");
    setCourses([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const fetchCourses = async () => {
    try {
      const response = await listOrganizationCourses({
        variables: {
          searchTerm: value,
          pagination: {
            first: 10,
          },
        },
      });

      const coursesData =
        response.data?.listOrganizationCourses?.edges?.map(
          (edge) => edge.node,
        ) || [];

      // @ts-expect-error error
      setCourses(coursesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!value.trim()) {
      setCourses([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    setShowDropdown(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchCourses();
      setIsLoading(false);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  const handleCourseSelect = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center gap-2 px-3 border transition-all duration-200 ${
          isFocused
            ? "border-purple-700 bg-purple-50 shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <Search
          size={18}
          className={`transition-colors flex-shrink-0 ${
            isFocused ? "text-purple-600" : "text-gray-400"
          }`}
        />
        <Input
          ref={inputRef}
          type="text"
          value={value || searchParams.get("q") || ""}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (value.trim()) {
              setShowDropdown(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowDropdown(false), 200);
          }}
          placeholder="Search courses..."
          className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:outline-none px-0 text-sm"
        />
        {isLoading && (
          <Loader2
            size={16}
            className="text-purple-600 animate-spin flex-shrink-0"
          />
        )}
        {value && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors flex-shrink-0"
            aria-label="Clear search"
          >
            <X
              size={16}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border-[0.5px] border-purple-200 shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={20} className="text-purple-600 animate-spin" />
            </div>
          ) : courses.length > 0 ? (
            <ul className="py-2">
              <li key="search-term">
                <button
                  type="button"
                  onClick={() => router.push(`/courses/search?q=${value}`)}
                  onMouseDown={(e) => e.preventDefault()}
                  className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex justify-between items-center w-full">
                      <p className="font-medium text-gray-900 text-sm">
                        {value}
                      </p>
                      <Search
                        size={14}
                        className={`transition-colors flex-shrink-0 ${
                          isFocused ? "text-purple-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                </button>
              </li>
              {courses.map((course) => (
                <li key={course.id}>
                  <button
                    type="button"
                    onClick={() => handleCourseSelect(course.id || "")}
                    onMouseDown={(e) => e.preventDefault()}
                    className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {course.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {course.domains[0]}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500 text-sm">No courses found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
