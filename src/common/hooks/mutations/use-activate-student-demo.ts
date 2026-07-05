import { useMutation } from "@apollo/client";
import type {
  ActivateStudentDemoMutation,
  ActivateStudentDemoMutationVariables,
} from "@/graphql/generated/graphql";

import { ActivateStudentDemo } from "@/graphql/mutations/activate-student-demo.graphql";

const useActivateStudentDemo = () => {
  const [activateStudentDemo, { loading, error }] = useMutation<
    ActivateStudentDemoMutation,
    ActivateStudentDemoMutationVariables
  >(ActivateStudentDemo);

  return { activateStudentDemo, loading, error };
};

export default useActivateStudentDemo;
