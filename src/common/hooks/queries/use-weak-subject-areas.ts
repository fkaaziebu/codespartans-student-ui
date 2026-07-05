import { useLazyQuery } from "@apollo/client";
import type {
  WeakSubjectAreasQuery,
  WeakSubjectAreasQueryVariables,
} from "@/graphql/generated/graphql";
import { WeakSubjectAreas } from "@/graphql/queries/weak-subject-areas.graphql";

function useWeakSubjectAreas() {
  const [getWeakSubjectAreas, { data, loading, error }] = useLazyQuery<
    WeakSubjectAreasQuery,
    WeakSubjectAreasQueryVariables
  >(WeakSubjectAreas, { fetchPolicy: "no-cache" });

  return {
    getWeakSubjectAreas,
    data: data?.weakSubjectAreas,
    loading,
    error,
  };
}

export default useWeakSubjectAreas;
