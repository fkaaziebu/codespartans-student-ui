import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Course } from "@/common/graphql/generated/graphql";
import { useListCartCourses } from "@/common/hooks/queries";
import { useDataStore } from "@/common/hooks/use-data-store";

export const MyCart = () => {
  const [cartCourses, setCartCourses] = useState<Course[]>([]);
  const { listCartCourses } = useListCartCourses();
  const { data, setData } = useDataStore();

  const fetchCartCourses = async () => {
    try {
      const response = await listCartCourses({
        fetchPolicy: "no-cache",
      });
      // @ts-expect-error error
      setCartCourses(response.data?.listCartCourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartCourses();
  }, []);

  useEffect(() => {
    if (data.isCartUpdated) {
      fetchCartCourses();
      setData({
        isCartUpdated: false,
      });
    }
  }, [data?.isCartUpdated]);

  return (
    <Link
      href={"/cart"}
      className="text-gray-700 hover:text-gray-900 transition-colors relative mt-2"
      title="My Cart"
    >
      <ShoppingCart size={20} />
      {/* Cart badge */}
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cartCourses?.length || 0}
      </span>
    </Link>
  );
};
