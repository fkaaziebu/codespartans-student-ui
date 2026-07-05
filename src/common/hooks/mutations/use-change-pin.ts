import { useMutation } from "@apollo/client";
import type {
  ChangePinMutation,
  ChangePinMutationVariables,
} from "@/graphql/generated/graphql";

import { ChangePin } from "@/graphql/mutations/change-pin.graphql";

const useChangePin = () => {
  const [changePin, { loading, error }] = useMutation<
    ChangePinMutation,
    ChangePinMutationVariables
  >(ChangePin);

  return { changePin, loading, error };
};

export default useChangePin;
