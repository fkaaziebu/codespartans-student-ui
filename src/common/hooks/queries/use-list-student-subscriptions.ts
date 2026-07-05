import { useLazyQuery } from "@apollo/client";
import type { ListStudentSubscriptionsQuery } from "@/graphql/generated/graphql";
import { ListStudentSubscriptions } from "@/graphql/queries/list-student-subscriptions.graphql";

function useListStudentSubscriptions() {
  const [listStudentSubscriptions, { data, loading, error }] =
    useLazyQuery<ListStudentSubscriptionsQuery>(ListStudentSubscriptions, {
      fetchPolicy: "no-cache",
    });

  return {
    listStudentSubscriptions,
    data: data?.listMyStudentSubscriptions ?? [],
    loading,
    error,
  };
}

export default useListStudentSubscriptions;
