import { useLazyQuery } from "@apollo/client";
import type {
  StudentSubjectProgressQuery,
  StudentSubjectProgressQueryVariables,
} from "@/graphql/generated/graphql";
import { StudentSubjectProgress } from "@/graphql/queries/student-subject-progress.graphql";

function useStudentSubjectProgress() {
  const [getStudentSubjectProgress, { data, loading, error }] = useLazyQuery<
    StudentSubjectProgressQuery,
    StudentSubjectProgressQueryVariables
  >(StudentSubjectProgress, {
    fetchPolicy: "no-cache",
  });

  return {
    getStudentSubjectProgress,
    data: data?.studentSubjectProgress,
    loading,
    error,
  };
}

export default useStudentSubjectProgress;
