import { useLazyQuery } from "@apollo/client";
import type {
  ListCourseSuitesQuery,
  ListCourseSuitesQueryVariables,
} from "@/graphql/generated/graphql";
import { ListCourseSuites } from "@/graphql/queries/list-course-suites.graphql";

function useListCourseSuites(args?: ListCourseSuitesQueryVariables) {
  const [listCourseSuites, { data, loading, error }] = useLazyQuery<
    ListCourseSuitesQuery,
    ListCourseSuitesQueryVariables
  >(ListCourseSuites, {
    variables: args,
  });

  return {
    listCourseSuites,
    data: data?.listCourseSuites,
    loading,
    error,
  };
}

export default useListCourseSuites;
