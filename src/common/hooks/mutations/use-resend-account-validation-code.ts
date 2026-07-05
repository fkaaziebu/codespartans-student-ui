import { useMutation } from "@apollo/client";
import type {
  ResendAccountValidationCodeMutation,
  ResendAccountValidationCodeMutationVariables,
} from "@/common/graphql/generated/graphql";
import { ResendAccountValidationCodeDocument } from "@/common/graphql/generated/graphql";

function useResendAccountValidationCode() {
  const [resendAccountValidationCode, { data, loading, error }] = useMutation<
    ResendAccountValidationCodeMutation,
    ResendAccountValidationCodeMutationVariables
  >(ResendAccountValidationCodeDocument);

  return {
    resendAccountValidationCode,
    data: data?.resendAccountValidationCode,
    loading,
    error,
  };
}

export default useResendAccountValidationCode;
