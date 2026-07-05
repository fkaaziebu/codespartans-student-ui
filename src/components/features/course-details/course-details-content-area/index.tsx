"use client";
import { Mail, User, BookOpen, Tag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StudentCourseResponse } from "@/common/graphql/generated/graphql";
import {
  useAddCourseToCart,
  useCreateCheckout,
  useRemoveCourseFromCart,
} from "@/common/hooks/mutations";
import { useGetOrganizationCourse } from "@/common/hooks/queries";
import { useDataStore } from "@/common/hooks/use-data-store";
import { Button } from "@/components/ui/button";
import { proxyImageUrl } from "@/lib/utils";

const levelConfig: Record<string, { label: string; className: string }> = {
  BEGINNER: {
    label: "Beginner",
    className: "bg-green-100 text-green-800",
  },
  INTERMEDIATE: {
    label: "Intermediate",
    className: "bg-yellow-100 text-yellow-800",
  },
  ADVANCED: {
    label: "Advanced",
    className: "bg-red-100 text-red-800",
  },
};

const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    price
  );
};

// Skeleton loader
const CourseDetailsSkeleton = () => (
  <div className="min-h-screen pt-24 bg-gray-50">
    <div className="bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto animate-pulse space-y-5">
        <div className="h-4 bg-gray-700 rounded w-24" />
        <div className="h-10 bg-gray-700 rounded w-2/3" />
        <div className="h-5 bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-700 rounded w-36" />
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
      <div className="lg:col-span-2 space-y-6">
        <div className="h-40 bg-gray-200 rounded-xl" />
        <div className="h-32 bg-gray-200 rounded-xl" />
      </div>
      <div className="h-72 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

// Sidebar action card
const CourseActionCard = ({
  course,
  onAddToCart,
  onRemoveFromCart,
  onSubscribe,
}: {
  course: StudentCourseResponse;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onSubscribe: () => void;
}) => {
  const router = useRouter();
  const level =
    levelConfig[course.level] ?? {
      label: course.level,
      className: "bg-gray-100 text-gray-800",
    };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden sticky top-24">
      {/* Course thumbnail */}
      {course.avatar_url && (
        <div className="relative h-48 w-full bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={proxyImageUrl(course.avatar_url)}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Price */}
        <div className="mb-6">
          {course.price === 0 ? (
            <span className="text-3xl font-bold text-gray-900">Free</span>
          ) : (
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(course.price, course.currency)}
            </span>
          )}
        </div>

        {/* CTA buttons */}
        {course.is_subscribed ? (
          <Button
            className="w-full"
            size="lg"
            onClick={() => router.push(`/courses/${course.id}/suites`)}
          >
            Go to Learning
          </Button>
        ) : (
          <div className="space-y-3">
            {course.is_course_in_cart ? (
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={onRemoveFromCart}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button className="w-full" size="lg" onClick={onAddToCart}>
                Add to Cart
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={onSubscribe}
            >
              Subscribe Now
            </Button>
          </div>
        )}

        <div className="border-t my-6" />

        {/* Course metadata */}
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-gray-400 flex-shrink-0" />
            <span>Level:</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${level.className}`}
            >
              {level.label}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <Tag size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <span className="flex-shrink-0">Domains:</span>
            <div className="flex flex-wrap gap-1">
              {course.domains.map((domain) => (
                <span
                  key={domain}
                  className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
export const CourseDetailsContentArea = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<StudentCourseResponse | null>(null);
  const { courseId } = useParams<{ courseId: string }>();
  const { getOrganizationCourse } = useGetOrganizationCourse();
  const { createCheckout } = useCreateCheckout();
  const { addCourseToCart } = useAddCourseToCart();
  const { removeCourseFromCart } = useRemoveCourseFromCart();
  const { setData, data } = useDataStore();

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getOrganizationCourse({
        variables: { courseId },
        fetchPolicy: "no-cache",
      });
      // @ts-expect-error error
      setCourse(response.data?.getOrganizationCourse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribeToCourse = async () => {
    await createCheckout({
      variables: {
        courseId,
        checkoutFromCart: false,
        autoApproveSubscription: true,
      },
    });
    router.push(`/courses`);
  };

  const handleAddToCart = async () => {
    await addCourseToCart({ variables: { courseId } });
    setData({ isCartUpdated: true });
  };

  const handleRemoveFromCart = async () => {
    await removeCourseFromCart({ variables: { courseId } });
    setData({ isCartUpdated: true });
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    if (data.isCartUpdated) {
      fetchCourseDetails();
    }
  }, [data.isCartUpdated]);

  if (isLoading) return <CourseDetailsSkeleton />;

  if (!course) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-gray-500">Course not found.</p>
      </div>
    );
  }

  const level =
    levelConfig[course.level] ?? {
      label: course.level,
      className: "bg-gray-100 text-gray-800",
    };

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      {/* Hero */}
      <div className="bg-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              {/* Domain tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {course.domains.map((domain) => (
                  <span
                    key={domain}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium uppercase tracking-wide"
                  >
                    {domain}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Level + Instructor */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${level.className}`}
                >
                  {level.label}
                </span>
                {course.instructor && (
                  <span>
                    By{" "}
                    <span className="text-white font-medium">
                      {course.instructor.name}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* Hero image (desktop only) */}
            {course.avatar_url && (
              <div className="hidden lg:block flex-shrink-0 w-80 xl:w-96">
                <div className="relative h-56 w-full rounded-xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proxyImageUrl(course.avatar_url)}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                About this course
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Instructor */}
            {course.instructor && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Instructor
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {course.instructor.name}
                    </p>
                    <a
                      href={`mailto:${course.instructor.email}`}
                      className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 mt-1"
                    >
                      <Mail size={14} />
                      {course.instructor.email}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column: action card */}
          <div className="lg:col-span-1">
            <CourseActionCard
              course={course}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onSubscribe={handleSubscribeToCourse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
