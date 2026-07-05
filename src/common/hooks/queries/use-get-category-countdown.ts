import { useLazyQuery } from "@apollo/client";
import type {
  GetCategoryCountdownQuery,
  GetCategoryCountdownQueryVariables,
} from "@/graphql/generated/graphql";
import { GetCategoryCountdown } from "@/graphql/queries/get-category-countdown.graphql";

function useGetCategoryCountdown(args?: GetCategoryCountdownQueryVariables) {
  const [getCategoryCountdown, { data, loading, error }] = useLazyQuery<
    GetCategoryCountdownQuery,
    GetCategoryCountdownQueryVariables
  >(GetCategoryCountdown, {
    variables: args,
    fetchPolicy: "no-cache",
  });

  return {
    getCategoryCountdown,
    data: data?.getCategoryCountdown,
    loading,
    error,
  };
}

export default useGetCategoryCountdown;
