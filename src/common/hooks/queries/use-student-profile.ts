// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  StudentProfileQuery,
  StudentProfileQueryVariables,
} from "@/graphql/generated/graphql";
import { StudentProfile } from "@/graphql/queries/student-profile.graphql";

// hook
function useStudentProfile(args?: StudentProfileQueryVariables) {
  const [studentProfile, { data, loading, error }] = useLazyQuery<
    StudentProfileQuery,
    StudentProfileQueryVariables
  >(StudentProfile, {
    variables: args,
  });

  return {
    studentProfile,
    data: data?.studentProfile,
    loading,
    error,
  };
}

export default useStudentProfile;
