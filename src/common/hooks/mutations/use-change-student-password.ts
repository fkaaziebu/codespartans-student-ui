import { useMutation } from "@apollo/client";
import type {
  ChangeStudentPasswordMutation,
  ChangeStudentPasswordMutationVariables,
} from "@/graphql/generated/graphql";

import { ChangeStudentPassword } from "@/graphql/mutations/change-student-password.graphql";

const useChangeStudentPassword = () => {
  const [changeStudentPassword, { loading, error }] = useMutation<
    ChangeStudentPasswordMutation,
    ChangeStudentPasswordMutationVariables
  >(ChangeStudentPassword);

  return { changeStudentPassword, loading, error };
};

export default useChangeStudentPassword;
