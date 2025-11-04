// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListOrganizationCoursesQuery,
  ListOrganizationCoursesQueryVariables,
} from "@/graphql/generated/graphql";
import { ListOrganizationCourses } from "@/graphql/queries/list-organization-courses.graphql";

// hook
function useListOrganizationCourses(
  args?: ListOrganizationCoursesQueryVariables,
) {
  const [listOrganizationCourses, { data, loading, error }] = useLazyQuery<
    ListOrganizationCoursesQuery,
    ListOrganizationCoursesQueryVariables
  >(ListOrganizationCourses, {
    variables: args,
  });

  return {
    listOrganizationCourses,
    data: data?.listOrganizationCourses,
    loading,
    error,
  };
}

export default useListOrganizationCourses;
