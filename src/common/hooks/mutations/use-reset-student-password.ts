import { useMutation } from "@apollo/client";
import type {
  ResetStudentPasswordMutation,
  ResetStudentPasswordMutationVariables,
} from "@/graphql/generated/graphql";

import { ResetStudentPassword } from "@/graphql/mutations/reset-student-password.graphql";

const useResetStudentPassword = () => {
  const [resetStudentPassword, { loading, error }] = useMutation<
    ResetStudentPasswordMutation,
    ResetStudentPasswordMutationVariables
  >(ResetStudentPassword);

  return { resetStudentPassword, loading, error };
};

export default useResetStudentPassword;
