import { useMutation } from "@apollo/client";
import { VerifyChildUsername } from "@/graphql/mutations/verify-child-username.graphql";

type VerifyChildUsernameData = {
  verifyChildUsername: { temp_token: string };
};
type VerifyChildUsernameVars = {
  input: { username: string };
};

const useVerifyChildUsername = () => {
  const [verifyChildUsername, { loading, error }] = useMutation<
    VerifyChildUsernameData,
    VerifyChildUsernameVars
  >(VerifyChildUsername);

  return { verifyChildUsername, loading, error };
};

export default useVerifyChildUsername;
