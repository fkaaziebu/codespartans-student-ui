// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetAllAttemptedQuestionsQuery,
  GetAllAttemptedQuestionsQueryVariables,
} from "@/graphql/generated/graphql";
import { GetAllAttemptedQuestions } from "@/graphql/queries/get-all-attempted-questions.graphql";

// hook
function useGetAllAttemptedQuestions(
  args?: GetAllAttemptedQuestionsQueryVariables,
) {
  const [getAllAttemptedQuestions, { data, loading, error }] = useLazyQuery<
    GetAllAttemptedQuestionsQuery,
    GetAllAttemptedQuestionsQueryVariables
  >(GetAllAttemptedQuestions, {
    variables: args,
  });

  return {
    getAllAttemptedQuestions,
    data: data?.getAllAttemptedQuestions,
    loading,
    error,
  };
}

export default useGetAllAttemptedQuestions;
