// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetOrganizationCourseQuery,
  GetOrganizationCourseQueryVariables,
} from "@/graphql/generated/graphql";
import { GetOrganizationCourse } from "@/graphql/queries/get-organization-course.graphql";

// hook
function useGetOrganizationCourse(args?: GetOrganizationCourseQueryVariables) {
  const [getOrganizationCourse, { data, loading, error }] = useLazyQuery<
    GetOrganizationCourseQuery,
    GetOrganizationCourseQueryVariables
  >(GetOrganizationCourse, {
    variables: args,
  });

  return {
    getOrganizationCourse,
    data: data?.getOrganizationCourse,
    loading,
    error,
  };
}

export default useGetOrganizationCourse;
