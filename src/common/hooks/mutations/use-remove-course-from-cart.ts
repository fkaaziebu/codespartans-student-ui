import { useMutation } from "@apollo/client";
import type {
  RemoveCourseFromCartMutation,
  RemoveCourseFromCartMutationVariables,
} from "@/graphql/generated/graphql";

import { RemoveCourseFromCart } from "@/graphql/mutations/remove-course-from-cart.graphql";

const useRemoveCourseFromCart = () => {
  const [removeCourseFromCart, { loading, error }] = useMutation<
    RemoveCourseFromCartMutation,
    RemoveCourseFromCartMutationVariables
  >(RemoveCourseFromCart);

  return { removeCourseFromCart, loading, error };
};

export default useRemoveCourseFromCart;
