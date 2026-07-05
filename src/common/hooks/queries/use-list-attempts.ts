// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListAttemptsQuery,
  ListAttemptsQueryVariables,
} from "@/graphql/generated/graphql";
import { ListAttempts } from "@/graphql/queries/list-attempts.graphql";

// hook
function useListAttempts(args?: ListAttemptsQueryVariables) {
  const [listAttempts, { data, loading, error }] = useLazyQuery<
    ListAttemptsQuery,
    ListAttemptsQueryVariables
  >(ListAttempts, {
    variables: args,
    fetchPolicy: "no-cache",
  });

  return {
    listAttempts,
    data: data?.listAttempts,
    loading,
    error,
  };
}

export default useListAttempts;
