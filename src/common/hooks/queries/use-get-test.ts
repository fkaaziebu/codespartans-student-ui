import { useLazyQuery } from "@apollo/client";
import type {
  GetTestQuery,
  GetTestQueryVariables,
} from "@/graphql/generated/graphql";
import { GetTest } from "@/graphql/queries/get-test.graphql";

function useGetTest() {
  const [getTest, { data, loading, error }] = useLazyQuery<
    GetTestQuery,
    GetTestQueryVariables
  >(GetTest, { fetchPolicy: "no-cache" });

  return {
    getTest,
    data: data?.getTest,
    loading,
    error,
  };
}

export default useGetTest;
