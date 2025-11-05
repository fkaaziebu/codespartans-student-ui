// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListOrganizationsQuery,
  ListOrganizationsQueryVariables,
} from "@/graphql/generated/graphql";
import { ListOrganizations } from "@/graphql/queries/list-organizations.graphql";

// hook
function useListOrganizations(args?: ListOrganizationsQueryVariables) {
  const [listOrganizations, { data, loading, error }] = useLazyQuery<
    ListOrganizationsQuery,
    ListOrganizationsQueryVariables
  >(ListOrganizations, {
    variables: args,
  });

  return {
    listOrganizations,
    data: data?.listOrganizations,
    loading,
    error,
  };
}

export default useListOrganizations;
