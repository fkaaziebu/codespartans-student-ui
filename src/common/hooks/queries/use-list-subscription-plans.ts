import { useLazyQuery } from "@apollo/client";
import type { ListSubscriptionPlansQuery } from "@/graphql/generated/graphql";
import { ListSubscriptionPlans } from "@/graphql/queries/list-subscription-plans.graphql";

export type SubscriptionPlan = NonNullable<
  ListSubscriptionPlansQuery["listSubscriptionPlans"]
>[number];

function useListSubscriptionPlans() {
  const [listSubscriptionPlans, { data, loading, error }] =
    useLazyQuery<ListSubscriptionPlansQuery>(ListSubscriptionPlans, {
      fetchPolicy: "no-cache",
    });

  return {
    listSubscriptionPlans,
    data: data?.listSubscriptionPlans ?? [],
    loading,
    error,
  };
}

export default useListSubscriptionPlans;
