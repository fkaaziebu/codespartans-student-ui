"use client";
import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/common/graphql/generated/graphql";
import {
  useCreateCheckout,
  useRemoveCourseFromCart,
} from "@/common/hooks/mutations";
import { useListCartCourses } from "@/common/hooks/queries";
import { useDataStore } from "@/common/hooks/use-data-store";
import { Button } from "@/components/ui/button";

const CartItemCard = ({
  item,
  onRemove,
}: {
  item: Course;
  onRemove: () => void;
}) => {
  return (
    <div className="flex gap-4 pb-6 border-b">
      {/* Course Image */}
      <Image
        src={item.avatar_url}
        alt="Course avatar"
        width={128}
        height={96}
        className="h-24 w-32 rounded-lg flex-shrink-0"
      />

      {/* Course Details */}
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {item.instructor?.name}</p>

        {/* Badges and Rating */}
        <div className="flex items-center gap-3 mb-2">
          {true && (
            <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded">
              Bestseller
            </span>
          )}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">{5}</span>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(5)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({"reviews".toLocaleString()} ratings)
          </span>
        </div>

        {/* Course Details */}
        <p className="text-xs text-gray-600 mb-3">
          {122} total hours • {2} lectures • {item.level}
        </p>

        {/* Premium Badge */}
        {true && (
          <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded text-xs font-semibold mb-3">
            ⊕ Premium
          </div>
        )}
      </div>

      {/* Actions and Price */}
      <div className="text-right">
        <div className="mb-4">
          <div className="text-purple-600 font-bold text-lg">${item.price}</div>
          <div className="text-gray-500 line-through text-sm">
            ${item.price}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <button
            type="button"
            onClick={onRemove}
            className="block text-purple-600 text-sm font-medium hover:underline w-full text-right"
          >
            Remove
          </button>
          <button
            type="button"
            className="block text-purple-600 text-sm font-medium hover:underline w-full text-right"
          >
            Save for Later
          </button>
          <button
            type="button"
            className="block text-purple-600 text-sm font-medium hover:underline w-full text-right"
          >
            Move to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

// Cart Summary Sidebar Component
const CartSummary = ({
  total,
  originalTotal,
  handleCheckout,
}: {
  total: number;
  originalTotal: number;
  handleCheckout: () => void;
}) => {
  const discount = ((1 - total / originalTotal) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
      <h3 className="text-sm text-gray-600 mb-4">Total:</h3>
      <div className="text-4xl font-bold text-gray-900 mb-2">${total}</div>
      <div className="text-gray-500 line-through text-sm mb-1">
        ${originalTotal}
      </div>
      <div className="text-gray-900 font-semibold mb-6">{discount}% off</div>

      <Button
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 mb-2 rounded-lg"
        onClick={handleCheckout}
      >
        Proceed to Checkout <ChevronRight size={20} className="ml-2" />
      </Button>

      <p className="text-xs text-gray-500 text-center mb-6">
        You won't be charged yet
      </p>

      <Button
        variant="outline"
        className="w-full border-2 border-purple-600 text-purple-600 font-bold py-3 rounded-lg"
      >
        Apply Coupon
      </Button>
    </div>
  );
};

// Recommended Course Card Component
interface RecommendedCourse {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  image: string;
  isBestseller: boolean;
  isPremium: boolean;
}

const RecommendedCourseCard = ({ course }: { course: RecommendedCourse }) => {
  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600"></div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">
          {course.title}
        </h4>
        <p className="text-xs text-gray-600 mb-3">{course.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="font-semibold text-sm">{course.rating}</span>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < Math.floor(course.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500">
            ({course.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="font-bold text-gray-900">${course.price}</div>
          <div className="text-gray-500 line-through text-xs">
            ${course.originalPrice}
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          {course.isPremium && (
            <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              ⊕ Premium
            </span>
          )}
          {course.isBestseller && (
            <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded">
              Bestseller
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Recommended Courses Section Component
const RecommendedCoursesSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const recommendedCourses: RecommendedCourse[] = [
    {
      id: 1,
      title: "The Ultimate React Course 2025: React, Next.js, Redux & More",
      author: "Jonas Schmiedtmann",
      rating: 4.7,
      reviews: 24128,
      price: 9.99,
      originalPrice: 59.99,
      image: "",
      isBestseller: true,
      isPremium: true,
    },
    {
      id: 2,
      title: "Complete React, Next.js & TypeScript Projects Course",
      author: "Jänis Smilga",
      rating: 4.7,
      reviews: 12436,
      price: 9.99,
      originalPrice: 69.99,
      image: "",
      isBestseller: true,
      isPremium: true,
    },
    {
      id: 3,
      title: "Modern React From The Beginning",
      author: "Brad Traversy, Will Adams",
      rating: 4.7,
      reviews: 691,
      price: 9.99,
      originalPrice: 44.99,
      image: "",
      isBestseller: false,
      isPremium: false,
    },
    {
      id: 4,
      title: "100 Hours Web Development Bootcamp - Build 23 React Projects",
      author: "Burak Orkmez",
      rating: 4.6,
      reviews: 977,
      price: 9.99,
      originalPrice: 49.99,
      image: "",
      isBestseller: false,
      isPremium: true,
    },
    {
      id: 5,
      title: "Modern React with Redux",
      author: "Stephen Grider",
      rating: 4.7,
      reviews: 88768,
      price: 9.99,
      originalPrice: 64.99,
      image: "",
      isBestseller: false,
      isPremium: true,
    },
  ];

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 280));
  };

  const scrollRight = () => {
    setScrollPosition(scrollPosition + 280);
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        You might also like
      </h2>

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          type="button"
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
          disabled={scrollPosition === 0}
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>

        <button
          type="button"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronRight size={24} className="text-gray-900" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-300"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {recommendedCourses.map((course) => (
              <RecommendedCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Shopping Cart Content Area
export const ShoppingCartContentArea = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const { listCartCourses } = useListCartCourses();
  const { removeCourseFromCart } = useRemoveCourseFromCart();
  const { createCheckout } = useCreateCheckout();
  const { setData, data } = useDataStore();
  const router = useRouter();

  const fetchCartCourses = async () => {
    try {
      const response = await listCartCourses({
        fetchPolicy: "no-cache",
      });
      // @ts-expect-error error
      setCartItems(response.data?.listCartCourses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnrollNow = async () => {
    // Navigate to checkout or enrollment flow
    await createCheckout({
      variables: {
        checkoutFromCart: true,
        autoApproveSubscription: true,
      },
    });

    setData({
      isCartUpdated: true,
    });

    router.push(`/my-learning`);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    fetchCartCourses();
  }, []);

  useEffect(() => {
    if (data.isCartUpdated) {
      fetchCartCourses();
    }
  }, [data?.isCartUpdated]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600 mb-8">{cartItems.length} Course in Cart</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6">
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onRemove={() =>
                        removeCourseFromCart({
                          variables: { courseId: item.id },
                        })
                      }
                    />
                  ))}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Your cart is empty</p>
                </div>
              )}
            </div>

            {/* Recommended Courses */}
            {cartItems.length > 0 && <RecommendedCoursesSection />}
          </div>

          {/* Cart Summary Sidebar */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <CartSummary
                total={total}
                originalTotal={originalTotal}
                handleCheckout={handleEnrollNow}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
