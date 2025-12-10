"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CourseResponse } from "@/common/graphql/generated/graphql";
import { useListOrganizationCourses } from "@/common/hooks/queries";
import { CourseCard } from "../course-card";

export const CourseGrid = () => {
  return (
    <Suspense>
      <CourseGridWithSearchParams />
    </Suspense>
  );
};

// Course Grid Component
const CourseGridWithSearchParams = () => {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const { listOrganizationCourses } = useListOrganizationCourses();

  const fetchCourses = async () => {
    try {
      const response = await listOrganizationCourses({
        variables: {
          searchTerm: searchParams.get("q") ?? "",
        },
        fetchPolicy: "no-cache",
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
    fetchCourses();
  }, [searchParams.get("q")]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </div>
  );
};
