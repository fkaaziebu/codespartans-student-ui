import { useLazyQuery } from "@apollo/client";
import type { GetStudentSubscriptionQuery } from "@/graphql/generated/graphql";
import { GetStudentSubscription } from "@/graphql/queries/get-student-subscription.graphql";

function useGetStudentSubscription() {
  const [getStudentSubscription, { data, loading, error }] =
    useLazyQuery<GetStudentSubscriptionQuery>(GetStudentSubscription, {
      fetchPolicy: "no-cache",
    });

  return {
    getStudentSubscription,
    data: data?.getMyStudentSubscription ?? null,
    loading,
    error,
  };
}

export default useGetStudentSubscription;
