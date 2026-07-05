import { useLazyQuery } from "@apollo/client";
import type {
  StudentTestTopicProgressQuery,
  StudentTestTopicProgressQueryVariables,
} from "@/graphql/generated/graphql";
import { StudentTestTopicProgress } from "@/graphql/queries/student-test-topic-progress.graphql";

function useStudentTestTopicProgress() {
  const [getStudentTestTopicProgress, { data, loading, error }] = useLazyQuery<
    StudentTestTopicProgressQuery,
    StudentTestTopicProgressQueryVariables
  >(StudentTestTopicProgress, {
    fetchPolicy: "no-cache",
  });

  return {
    getStudentTestTopicProgress,
    data: data?.studentTestTopicProgress,
    loading,
    error,
  };
}

export default useStudentTestTopicProgress;
