// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  TestStatsQuery,
  TestStatsQueryVariables,
} from "@/graphql/generated/graphql";
import { TestStats } from "@/graphql/queries/test-stats.graphql";

// hook
function useTestStats(args?: TestStatsQueryVariables) {
  const [testStats, { data, loading, error }] = useLazyQuery<
    TestStatsQuery,
    TestStatsQueryVariables
  >(TestStats, {
    variables: args,
  });

  return {
    testStats,
    data: data?.testStats,
    loading,
    error,
  };
}

export default useTestStats;
