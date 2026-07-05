// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetStudentStatsQuery,
  GetStudentStatsQueryVariables,
} from "@/graphql/generated/graphql";
import { GetStudentStats } from "@/graphql/queries/get-student-stats.graphql";

// hook
function useGetStudentStats() {
  const [getStudentStats, { data, loading, error }] = useLazyQuery<
    GetStudentStatsQuery,
    GetStudentStatsQueryVariables
  >(GetStudentStats, { fetchPolicy: "no-cache" });

  return {
    getStudentStats,
    data: data?.getStudentStats,
    loading,
    error,
  };
}

export default useGetStudentStats;
