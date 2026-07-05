import { useLazyQuery } from "@apollo/client";
import type {
  GetTestScoreHistoryQuery,
  GetTestScoreHistoryQueryVariables,
} from "@/graphql/generated/graphql";
import { GetTestScoreHistory } from "@/graphql/queries/get-test-score-history.graphql";

function useGetTestScoreHistory() {
  const [getTestScoreHistory, { data, loading, error }] = useLazyQuery<
    GetTestScoreHistoryQuery,
    GetTestScoreHistoryQueryVariables
  >(GetTestScoreHistory, {
    fetchPolicy: "no-cache",
  });

  return {
    getTestScoreHistory,
    data: data?.getTestScoreHistory,
    loading,
    error,
  };
}

export default useGetTestScoreHistory;
