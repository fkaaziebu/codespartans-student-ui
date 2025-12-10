import { useMutation } from "@apollo/client";
import type {
  AddCourseToCartMutation,
  AddCourseToCartMutationVariables,
} from "@/graphql/generated/graphql";

import { AddCourseToCart } from "@/graphql/mutations/add-course-to-cart.graphql";

const useAddCourseToCart = () => {
  const [addCourseToCart, { loading, error }] = useMutation<
    AddCourseToCartMutation,
    AddCourseToCartMutationVariables
  >(AddCourseToCart);

  return { addCourseToCart, loading, error };
};

export default useAddCourseToCart;
