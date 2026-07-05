import { useMutation } from "@apollo/client";
import type { CancelStudentAccountDeletionMutation } from "@/graphql/generated/graphql";

import { CancelStudentAccountDeletion } from "@/graphql/mutations/cancel-student-account-deletion.graphql";

const useCancelStudentAccountDeletion = () => {
  const [cancelStudentAccountDeletion, { loading, error }] =
    useMutation<CancelStudentAccountDeletionMutation>(CancelStudentAccountDeletion);

  return { cancelStudentAccountDeletion, loading, error };
};

export default useCancelStudentAccountDeletion;
