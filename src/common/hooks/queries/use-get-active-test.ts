// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetActiveTestQuery,
  GetActiveTestQueryVariables,
} from "@/graphql/generated/graphql";
import { GetActiveTest } from "@/graphql/queries/get-active-test.graphql";

// hook
function useGetActiveTest() {
  const [getActiveTest, { data, loading, error }] = useLazyQuery<
    GetActiveTestQuery,
    GetActiveTestQueryVariables
  >(GetActiveTest, { fetchPolicy: "no-cache" });

  return {
    getActiveTest,
    data: data?.getActiveTest,
    loading,
    error,
  };
}

export default useGetActiveTest;
