import { useMutation } from "@apollo/client";
import type {
  StartTestMutation,
  StartTestMutationVariables,
} from "@/graphql/generated/graphql";

import { StartTest } from "@/graphql/mutations/start-test.graphql";

const useStartTest = () => {
  const [startTest, { loading, error }] = useMutation<
    StartTestMutation,
    StartTestMutationVariables
  >(StartTest);

  return { startTest, loading, error };
};

export default useStartTest;
