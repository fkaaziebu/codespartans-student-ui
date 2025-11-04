// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetQuestionQuery,
  GetQuestionQueryVariables,
} from "@/graphql/generated/graphql";
import { GetQuestion } from "@/graphql/queries/get-question.graphql";

// hook
function useGetQuestion(args?: GetQuestionQueryVariables) {
  const [getQuestion, { data, loading, error }] = useLazyQuery<
    GetQuestionQuery,
    GetQuestionQueryVariables
  >(GetQuestion, {
    variables: args,
  });

  return {
    getQuestion,
    data: data?.getQuestion,
    loading,
    error,
  };
}

export default useGetQuestion;
