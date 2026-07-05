import { useLazyQuery } from "@apollo/client";
import type {
  GetWeeklyInsightQuery,
  GetWeeklyInsightQueryVariables,
} from "@/graphql/generated/graphql";
import { GetWeeklyInsight } from "@/graphql/queries/get-weekly-insight.graphql";

function useGetWeeklyInsight() {
  const [getWeeklyInsight, { data, loading, error }] = useLazyQuery<
    GetWeeklyInsightQuery,
    GetWeeklyInsightQueryVariables
  >(GetWeeklyInsight, {});

  return {
    getWeeklyInsight,
    data: data?.getWeeklyInsight,
    loading,
    error,
  };
}

export default useGetWeeklyInsight;
