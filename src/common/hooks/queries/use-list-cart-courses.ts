// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListCartCoursesQuery,
  ListCartCoursesQueryVariables,
} from "@/graphql/generated/graphql";
import { ListCartCourses } from "@/graphql/queries/list-cart-courses.graphql";

// hook
function useListCartCourses(args?: ListCartCoursesQueryVariables) {
  const [listCartCourses, { data, loading, error }] = useLazyQuery<
    ListCartCoursesQuery,
    ListCartCoursesQueryVariables
  >(ListCartCourses, {
    variables: args,
  });

  return {
    listCartCourses,
    data: data?.listCartCourses,
    loading,
    error,
  };
}

export default useListCartCourses;
