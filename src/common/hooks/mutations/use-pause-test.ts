import { useMutation } from "@apollo/client";
import type {
  PauseTestMutation,
  PauseTestMutationVariables,
} from "@/graphql/generated/graphql";

import { PauseTest } from "@/graphql/mutations/pause-test.graphql";

const usePauseTest = () => {
  const [pauseTest, { loading, error }] = useMutation<
    PauseTestMutation,
    PauseTestMutationVariables
  >(PauseTest);

  return { pauseTest, loading, error };
};

export default usePauseTest;
