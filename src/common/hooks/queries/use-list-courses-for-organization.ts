// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListCoursesForOrganizationQuery,
  ListCoursesForOrganizationQueryVariables,
} from "@/graphql/generated/graphql";
import { ListCoursesForOrganization } from "@/graphql/queries/list-courses-for-organization.graphql";

// hook
function useListCoursesForOrganization(
  args?: ListCoursesForOrganizationQueryVariables,
) {
  const [listCoursesForOrganization, { data, loading, error }] = useLazyQuery<
    ListCoursesForOrganizationQuery,
    ListCoursesForOrganizationQueryVariables
  >(ListCoursesForOrganization, {
    variables: args,
  });

  return {
    listCoursesForOrganization,
    data: data?.listCoursesForOrganization,
    loading,
    error,
  };
}

export default useListCoursesForOrganization;
