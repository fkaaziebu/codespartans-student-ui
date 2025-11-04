import { useMutation } from "@apollo/client";
import type {
  CreateCheckoutMutation,
  CreateCheckoutMutationVariables,
} from "@/graphql/generated/graphql";

import { CreateCheckout } from "@/graphql/mutations/create-checkout.graphql";

const useCreateCheckout = () => {
  const [createCheckout, { loading, error }] = useMutation<
    CreateCheckoutMutation,
    CreateCheckoutMutationVariables
  >(CreateCheckout);

  return { createCheckout, loading, error };
};

export default useCreateCheckout;
