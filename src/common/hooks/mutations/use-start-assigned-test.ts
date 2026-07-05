import { useMutation } from "@apollo/client";
import type {
  StartAssignedTestMutation,
  StartAssignedTestMutationVariables,
} from "@/graphql/generated/graphql";
import { StartAssignedTest } from "@/graphql/mutations/start-assigned-test.graphql";

const useStartAssignedTest = () => {
  const [startAssignedTest, { loading, error }] = useMutation<
    StartAssignedTestMutation,
    StartAssignedTestMutationVariables
  >(StartAssignedTest);

  return { startAssignedTest, loading, error };
};

export default useStartAssignedTest;
