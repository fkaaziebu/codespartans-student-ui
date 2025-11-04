import { useMutation } from "@apollo/client";
import type {
  EndTestMutation,
  EndTestMutationVariables,
} from "@/graphql/generated/graphql";

import { EndTest } from "@/graphql/mutations/end-test.graphql";

const useEndTest = () => {
  const [endTest, { loading, error }] = useMutation<
    EndTestMutation,
    EndTestMutationVariables
  >(EndTest);

  return { endTest, loading, error };
};

export default useEndTest;
