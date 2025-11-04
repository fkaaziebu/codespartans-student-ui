import { useMutation } from "@apollo/client";
import type {
  SubmitAnswerMutation,
  SubmitAnswerMutationVariables,
} from "@/graphql/generated/graphql";

import { SubmitAnswer } from "@/graphql/mutations/submit-answer.graphql";

const useSubmitAnswer = () => {
  const [submitAnswer, { loading, error }] = useMutation<
    SubmitAnswerMutation,
    SubmitAnswerMutationVariables
  >(SubmitAnswer);

  return { submitAnswer, loading, error };
};

export default useSubmitAnswer;
