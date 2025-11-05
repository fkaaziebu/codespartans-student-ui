"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useListOrganizationCourses } from "@/common/hooks/queries";
import {
  CourseCard,
  CourseFilters,
  CoursesGrid,
  EmptyState,
} from "@/components/features/courses";

type CourseNode = {
  id: string;
  title: string;
  instructor?: {
    id: string;
    name: string;
    email: string;
  };
  avatar_url?: string;
  currency?: string;
  description?: string;
  domains?: string[];
  level?: string;
  price?: number;
  is_subscribed?: boolean;
  total_questions?: number;
  estimated_duration?: number;
};

export default function StudentCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseNode[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseNode[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  const { listOrganizationCourses } = useListOrganizationCourses();

  const fetchCourses = async () => {
    try {
      // Get organization ID from session or context
      const organizationId = sessionStorage.getItem("organizationId") || "";

      const response = await listOrganizationCourses({
        variables: {
          organizationId,
        },
      });

      const coursesData =
        response.data?.listOrganizationCourses?.edges?.map(
          (edge) => edge.node,
        ) || [];

      // @ts-expect-error error
      setCourses(coursesData);

      // @ts-expect-error error
      setFilteredCourses(coursesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    fetchCourses();
  }, []);

  // Filter courses based on search, level, and domain
  useEffect(() => {
    let filtered = courses;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.instructor?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Domain filter
    if (selectedDomain !== "all") {
      filtered = filtered.filter((course) =>
        course.domains?.includes(selectedDomain),
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedLevel, selectedDomain, courses]);

  const handleCourseClick = (course: CourseNode) => {
    // Check if user is subscribed to the course
    if (course.is_subscribed) {
      router.push(`/courses/${course.id}/suites`);
    } else {
      router.push(`/courses/${course.id}`);
    }
  };

  // Get unique domains from all courses for filter
  const availableDomains = Array.from(
    new Set(courses.flatMap((course) => course.domains || [])),
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-950">
              Available Courses
            </h1>
            <p className="text-sm text-gray-600">
              Explore and enroll in courses to enhance your skills
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="px-8 py-6 bg-white border-b">
          <CourseFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            availableDomains={availableDomains}
            coursesCount={filteredCourses.length}
            totalCount={courses.length}
          />
        </div>

        {/* Courses Grid */}
        <div className="flex-1 px-8 py-6">
          {filteredCourses.length === 0 ? (
            <EmptyState
              searchQuery={searchQuery}
              selectedLevel={selectedLevel}
              selectedDomain={selectedDomain}
              onReset={() => {
                setSearchQuery("");
                setSelectedLevel("all");
                setSelectedDomain("all");
              }}
            />
          ) : (
            <CoursesGrid>
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onCourseClick={handleCourseClick}
                />
              ))}
            </CoursesGrid>
          )}
        </div>
      </div>
    </div>
  );
}
