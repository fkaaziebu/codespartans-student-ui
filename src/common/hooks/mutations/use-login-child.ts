import { useMutation } from "@apollo/client";
import { LoginChild } from "@/graphql/mutations/login-child.graphql";

type LoginChildData = {
  loginChild: {
    id: string;
    full_name: string;
    class_level: string;
    target_exam: string;
    school_name: string | null;
    username: string;
    token: string;
    refresh_token: string;
    student: {
      id: string;
      name: string;
      email: string;
      is_setup_completed: boolean;
      organizations: { id: string }[];
    } | null;
  };
};

type LoginChildVars = {
  input: { username: string; pin: string };
};

const useLoginChild = () => {
  const [loginChild, { loading, error }] = useMutation<
    LoginChildData,
    LoginChildVars
  >(LoginChild);

  return { loginChild, loading, error };
};

export default useLoginChild;
