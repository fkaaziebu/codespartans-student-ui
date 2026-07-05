// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetCurrentStreakCountQuery,
  GetCurrentStreakCountQueryVariables,
} from "@/graphql/generated/graphql";
import { GetCurrentStreakCount } from "@/graphql/queries/get-current-streak-count.graphql";

// hook
function useGetCurrentStreakCount() {
  const [getCurrentStreakCount, { data, loading, error }] = useLazyQuery<
    GetCurrentStreakCountQuery,
    GetCurrentStreakCountQueryVariables
  >(GetCurrentStreakCount, { fetchPolicy: "no-cache" });

  return {
    getCurrentStreakCount,
    data: data?.getCurrentStreakCount,
    loading,
    error,
  };
}

export default useGetCurrentStreakCount;
