import { useMutation } from "@apollo/client";
import type {
  ResumeTestMutation,
  ResumeTestMutationVariables,
} from "@/graphql/generated/graphql";

import { ResumeTest } from "@/graphql/mutations/resume-test.graphql";

const useResumeTest = () => {
  const [resumeTest, { loading, error }] = useMutation<
    ResumeTestMutation,
    ResumeTestMutationVariables
  >(ResumeTest);

  return { resumeTest, loading, error };
};

export default useResumeTest;
