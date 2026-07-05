import { useMutation } from "@apollo/client";
import type {
  CompleteSetupMutation,
  CompleteSetupMutationVariables,
} from "@/common/graphql/generated/graphql";

import { CompleteSetup } from "@/common/graphql/mutations/complete-setup.graphql";

const useCompleteSetup = () => {
  const [completeSetup, { loading, error }] = useMutation<
    CompleteSetupMutation,
    CompleteSetupMutationVariables
  >(CompleteSetup);

  return { completeSetup, loading, error };
};

export default useCompleteSetup;
