import { useLazyQuery } from "@apollo/client";
import type {
  ListMyAssignmentsQuery,
  ListMyAssignmentsQueryVariables,
} from "@/graphql/generated/graphql";
import { ListMyAssignments } from "@/graphql/queries/list-my-assignments.graphql";

function useListMyAssignments() {
  const [listMyAssignments, { data, loading, error }] = useLazyQuery<
    ListMyAssignmentsQuery,
    ListMyAssignmentsQueryVariables
  >(ListMyAssignments, { fetchPolicy: "network-only" });

  return {
    listMyAssignments,
    data: data?.listMyAssignments,
    loading,
    error,
  };
}

export default useListMyAssignments;
