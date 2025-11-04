"use client";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCreateCheckout } from "@/common/hooks/mutations";
import { useGetOrganizationCourse } from "@/common/hooks/queries";
import {
  CourseInstructor,
  CourseOverview,
  CoursePricing,
  CourseStats,
  CourseSyllabus,
} from "@/components/features/course-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CourseDetails = {
  id: string;
  title: string;
  instructor?: {
    id: string;
    name: string;
    email: string;
    bio?: string;
    avatar_url?: string;
  };
  avatar_url?: string;
  currency?: string;
  description?: string;
  domains?: string[];
  level?: string;
  price?: number;
  is_subscribed?: boolean;
  total_questions?: number;
  estimated_duration?: number;
  learning_objectives?: string[];
  prerequisites?: string[];
  syllabus?: {
    id: string;
    title: string;
    description: string;
    question_count: number;
  }[];
  rating?: number;
  total_enrollments?: number;
  created_at?: string;
  updated_at?: string;
};

export default function CourseDetailsPage() {
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { getOrganizationCourse } = useGetOrganizationCourse();
  const { createCheckout } = useCreateCheckout();

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getOrganizationCourse({
        variables: {
          courseId,
        },
      });

      setCourse(response.data?.getOrganizationCourse);

      // Check if course is in cart (from localStorage or state)
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setIsInCart(cart.some((item: any) => item.id === courseId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    fetchCourseDetails();
  }, [courseId]);

  const handleAddToCart = () => {
    if (!course) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.find((item: any) => item.id === course.id)) {
      cart.push(course);
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsInCart(true);
    }
  };

  const handleRemoveFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((item: any) => item.id !== courseId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsInCart(false);
  };

  const handleEnrollNow = async () => {
    // Navigate to checkout or enrollment flow
    await createCheckout({
      variables: {
        courseId: courseId,
        checkoutFromCart: false,
        autoApproveSubscription: true,
      },
    });

    router.push(`/courses/${courseId}`);
  };

  const handleStartLearning = () => {
    router.push(`/courses/${courseId}/test`);
  };

  const getLevelBadge = (level?: string) => {
    if (!level) return null;

    const colors: { [key: string]: string } = {
      Beginner: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-red-100 text-red-800",
      Expert: "bg-purple-100 text-purple-800",
    };

    return (
      <Badge className={`${colors[level]} hover:${colors[level]}`}>
        {level}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <BookOpen className="w-16 h-16 text-gray-400" />
          <h3 className="text-xl font-bold text-gray-950">Course not found</h3>
          <Button onClick={() => router.push("/student/courses")}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/courses")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-950">
                Course Details
              </h1>
              <p className="text-sm text-gray-600">
                Review course information before enrolling
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Left Column - Course Info */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Hero Section */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Course Image */}
                <div className="relative w-full h-80 bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                  {course.avatar_url ? (
                    <img
                      src={course.avatar_url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="w-24 h-24 text-white opacity-80" />
                  )}
                </div>

                {/* Course Header Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-950 mb-3">
                        {course.title}
                      </h2>
                      <div className="flex items-center gap-3 flex-wrap mb-4">
                        {getLevelBadge(course.level)}
                        {course.domains?.map((domain) => (
                          <Badge key={domain} variant="outline">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    {course.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-950">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                    {course.total_enrollments && (
                      <span>
                        {course.total_enrollments.toLocaleString()} students
                        enrolled
                      </span>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <CourseStats
                    totalQuestions={course.total_questions}
                    estimatedDuration={course.estimated_duration}
                    level={course.level}
                  />
                </div>
              </div>

              {/* Course Overview */}
              <CourseOverview
                description={course.description}
                learningObjectives={course.learning_objectives}
                prerequisites={course.prerequisites}
              />

              {/* Syllabus */}
              {course.syllabus && course.syllabus.length > 0 && (
                <CourseSyllabus syllabus={course.syllabus} />
              )}

              {/* Instructor Info */}
              {course.instructor && (
                <CourseInstructor instructor={course.instructor} />
              )}
            </div>

            {/* Right Column - Pricing & Actions */}
            <div className="lg:w-96 flex flex-col gap-6">
              <div className="sticky top-6">
                <CoursePricing
                  price={course.price}
                  currency={course.currency}
                  isSubscribed={course.is_subscribed}
                  isInCart={isInCart}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onEnrollNow={handleEnrollNow}
                  onStartLearning={handleStartLearning}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
