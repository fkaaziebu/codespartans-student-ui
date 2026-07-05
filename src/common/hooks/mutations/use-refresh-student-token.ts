// imports
import { useMutation } from "@apollo/client";
// entities
import type {
  RefreshStudentTokenMutation,
  RefreshStudentTokenMutationVariables,
} from "@/common/graphql/generated/graphql";
import { RefreshStudentTokenDocument } from "@/common/graphql/generated/graphql";

// hook
function useRefreshStudentToken() {
  const [refreshStudentToken, { data, loading, error }] = useMutation<
    RefreshStudentTokenMutation,
    RefreshStudentTokenMutationVariables
  >(RefreshStudentTokenDocument);

  return {
    refreshStudentToken,
    data: data?.refreshStudentToken,
    loading,
    error,
  };
}

export default useRefreshStudentToken;
