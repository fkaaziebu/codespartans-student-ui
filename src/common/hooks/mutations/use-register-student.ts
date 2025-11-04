import { useMutation } from "@apollo/client";
import type {
  RegisterStudentMutation,
  RegisterStudentMutationVariables,
} from "@/graphql/generated/graphql";

import { RegisterStudent } from "@/graphql/mutations/register-student.graphql";

const useRegisterStudent = () => {
  const [registerStudent, { loading, error }] = useMutation<
    RegisterStudentMutation,
    RegisterStudentMutationVariables
  >(RegisterStudent);

  return { registerStudent, loading, error };
};

export default useRegisterStudent;
