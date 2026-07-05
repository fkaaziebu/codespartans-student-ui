import { useMutation } from "@apollo/client";
import type {
  CompleteStudentAccountValidationMutation,
  CompleteStudentAccountValidationMutationVariables,
} from "@/common/graphql/generated/graphql";
import { CompleteStudentAccountValidationDocument } from "@/common/graphql/generated/graphql";

function useCompleteStudentAccountValidation() {
  const [completeStudentAccountValidation, { data, loading, error }] =
    useMutation<
      CompleteStudentAccountValidationMutation,
      CompleteStudentAccountValidationMutationVariables
    >(CompleteStudentAccountValidationDocument);

  return {
    completeStudentAccountValidation,
    data: data?.completeStudentAccountValidation,
    loading,
    error,
  };
}

export default useCompleteStudentAccountValidation;
