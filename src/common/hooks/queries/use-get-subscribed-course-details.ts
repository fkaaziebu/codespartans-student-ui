// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetSubscribedCourseDetailsQuery,
  GetSubscribedCourseDetailsQueryVariables,
} from "@/graphql/generated/graphql";
import { GetSubscribedCourseDetails } from "@/graphql/queries/get-subscribed-course-details.graphql";

// hook
function useGetSubscribedCourseDetails(
  args?: GetSubscribedCourseDetailsQueryVariables,
) {
  const [getSubscribedCourseDetails, { data, loading, error }] = useLazyQuery<
    GetSubscribedCourseDetailsQuery,
    GetSubscribedCourseDetailsQueryVariables
  >(GetSubscribedCourseDetails, {
    variables: args,
  });

  return {
    getSubscribedCourseDetails,
    data: data?.getSubscribedCourseDetails,
    loading,
    error,
  };
}

export default useGetSubscribedCourseDetails;
