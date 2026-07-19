import { useMutation } from "@apollo/client";
import { RequestChildPinReset } from "@/graphql/mutations/request-child-pin-reset.graphql";

type RequestChildPinResetData = {
  requestChildPinReset: boolean;
};
type RequestChildPinResetVars = {
  input: { username: string };
};

const useRequestChildPinReset = () => {
  const [requestChildPinReset, { loading, error }] = useMutation<
    RequestChildPinResetData,
    RequestChildPinResetVars
  >(RequestChildPinReset);

  return { requestChildPinReset, loading, error };
};

export default useRequestChildPinReset;
