import { useMutation } from "@apollo/client";
import type {
  RequestStudentAccountDeletionMutation,
  RequestStudentAccountDeletionMutationVariables,
} from "@/graphql/generated/graphql";

import { RequestStudentAccountDeletion } from "@/graphql/mutations/request-student-account-deletion.graphql";

const useRequestStudentAccountDeletion = () => {
  const [requestStudentAccountDeletion, { loading, error }] = useMutation<
    RequestStudentAccountDeletionMutation,
    RequestStudentAccountDeletionMutationVariables
  >(RequestStudentAccountDeletion);

  return { requestStudentAccountDeletion, loading, error };
};

export default useRequestStudentAccountDeletion;
