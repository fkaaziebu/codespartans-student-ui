import { useLazyQuery } from "@apollo/client";
import type {
  GetStudentAggregateQuery,
  GetStudentAggregateQueryVariables,
} from "@/graphql/generated/graphql";
import { GetStudentAggregate } from "@/graphql/queries/get-student-aggregate.graphql";

function useGetStudentAggregate(args?: GetStudentAggregateQueryVariables) {
  const [getStudentAggregate, { data, loading, error }] = useLazyQuery<
    GetStudentAggregateQuery,
    GetStudentAggregateQueryVariables
  >(GetStudentAggregate, {
    variables: args,
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  return {
    getStudentAggregate,
    data: data?.getStudentAggregate,
    loading,
    error,
  };
}

export default useGetStudentAggregate;
