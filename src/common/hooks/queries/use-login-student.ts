// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  LoginStudentQuery,
  LoginStudentQueryVariables,
} from "@/graphql/generated/graphql";
import { LoginStudent } from "@/graphql/queries/login-student.graphql";

// hook
function useLoginStudent(args?: LoginStudentQueryVariables) {
  const [loginStudent, { data, loading, error }] = useLazyQuery<
    LoginStudentQuery,
    LoginStudentQueryVariables
  >(LoginStudent, {
    variables: args,
  });

  return {
    loginStudent,
    data: data?.loginStudent,
    loading,
    error,
  };
}

export default useLoginStudent;
