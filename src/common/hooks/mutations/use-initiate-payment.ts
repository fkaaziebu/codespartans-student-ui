import { useMutation } from "@apollo/client";
import type {
  InitiatePaymentMutation,
  InitiatePaymentMutationVariables,
} from "@/graphql/generated/graphql";
import { InitiatePayment } from "@/graphql/mutations/initiate-payment.graphql";

const useInitiatePayment = () => {
  const [initiatePayment, { loading, error }] = useMutation<
    InitiatePaymentMutation,
    InitiatePaymentMutationVariables
  >(InitiatePayment);

  return { initiatePayment, loading, error };
};

export default useInitiatePayment;
