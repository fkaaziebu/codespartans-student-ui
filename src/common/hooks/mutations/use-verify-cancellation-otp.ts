import { useMutation } from "@apollo/client";
import type {
  VerifyStudentCancellationOtpMutation,
  VerifyStudentCancellationOtpMutationVariables,
} from "@/graphql/generated/graphql";

import { VerifyStudentCancellationOtp } from "@/graphql/mutations/verify-cancellation-otp.graphql";

const useVerifyCancellationOtp = () => {
  const [verifyCancellationOtp, { loading, error }] = useMutation<
    VerifyStudentCancellationOtpMutation,
    VerifyStudentCancellationOtpMutationVariables
  >(VerifyStudentCancellationOtp);

  return { verifyCancellationOtp, loading, error };
};

export default useVerifyCancellationOtp;
