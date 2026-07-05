// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListOrganizationCategoriesQuery,
  ListOrganizationCategoriesQueryVariables,
} from "@/common/graphql/generated/graphql";
import { ListOrganizationCategories } from "@/common/graphql/queries/list-organization-categories.graphql";

// hook
function useListOrganizationCategories(
  args?: ListOrganizationCategoriesQueryVariables,
) {
  const [listOrganizationCategories, { data, loading, error }] = useLazyQuery<
    ListOrganizationCategoriesQuery,
    ListOrganizationCategoriesQueryVariables
  >(ListOrganizationCategories, {
    variables: args,
  });

  return {
    listOrganizationCategories,
    data: data?.listOrganizationCategories,
    loading,
    error,
  };
}

export default useListOrganizationCategories;
