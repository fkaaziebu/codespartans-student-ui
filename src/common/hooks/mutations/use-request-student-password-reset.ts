import { useMutation } from "@apollo/client";
import type {
  RequestStudentPasswordResetMutation,
  RequestStudentPasswordResetMutationVariables,
} from "@/graphql/generated/graphql";

import { RequestStudentPasswordReset } from "@/graphql/mutations/request-student-password-reset.graphql";

const useRequestStudentPasswordReset = () => {
  const [requestStudentPasswordReset, { loading, error }] = useMutation<
    RequestStudentPasswordResetMutation,
    RequestStudentPasswordResetMutationVariables
  >(RequestStudentPasswordReset);

  return { requestStudentPasswordReset, loading, error };
};

export default useRequestStudentPasswordReset;
