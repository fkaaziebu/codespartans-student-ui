"use client";
import {
  BookMarked,
  Check,
  Code,
  Heart,
  MessageSquare,
  Play,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Course,
  StudentCourseResponse,
} from "@/common/graphql/generated/graphql";
import {
  useAddCourseToCart,
  useCreateCheckout,
  useRemoveCourseFromCart,
} from "@/common/hooks/mutations";
import { useGetOrganizationCourse } from "@/common/hooks/queries";
import { useDataStore } from "@/common/hooks/use-data-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Breadcrumb Component
const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 text-gray-300 text-sm mb-6">
      <button className="hover:text-white transition-colors">
        Development
      </button>
      <span>&gt;</span>
      <button className="hover:text-white transition-colors">
        Programming Languages
      </button>
      <span>&gt;</span>
      <button className="text-white">React JS</button>
    </div>
  );
};

// Course Header Component
const CourseHeader = ({ course }: { course: StudentCourseResponse | null }) => {
  return (
    <div className="mb-8">
      <Breadcrumb />
      <h1 className="text-5xl font-bold text-white mb-4">{course?.title}</h1>
      <p className="text-gray-300 text-lg mb-6">{course?.description}</p>

      <div className="flex items-center gap-4 mb-4">
        <span className="inline-block bg-teal-600 text-white px-3 py-1 rounded text-sm font-semibold">
          Bestseller
        </span>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-semibold">4.6</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                ★
              </span>
            ))}
          </div>
          <span className="text-gray-300 text-sm">(236,249 ratings)</span>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4">
        Created by{" "}
        <a href="#" className="text-blue-400 hover:underline">
          {course?.instructor?.name}
        </a>
      </p>

      <p className="text-gray-300 text-sm">
        Last updated 11/2025 • English • English [CC], Arabic [Auto],{" "}
        <a href="#" className="text-blue-400 hover:underline">
          27 more
        </a>
      </p>
    </div>
  );
};

// Premium Info Card Component
const PremiumInfoCard = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden mb-6">
      <div className="flex gap-4 p-4">
        <div className="bg-purple-600 text-white rounded-lg px-4 py-6 flex flex-col items-center justify-center min-w-[80px]">
          <span className="text-sm font-semibold">Premium</span>
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900 mb-1">
            Access 26,000+ top-rated courses with a Udemy plan.{" "}
            <a href="#" className="text-purple-600 hover:underline">
              See Plans & Pricing
            </a>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x text-center py-4 px-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">4.6</div>
          <div className="flex justify-center gap-0.5 my-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">
                ★
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">236,249</div>
          <p className="text-gray-600 text-sm">ratings</p>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">996,348</div>
          <p className="text-gray-600 text-sm">learners</p>
        </div>
      </div>
    </div>
  );
};

// Learning Outcomes Component
const LearningOutcomes = () => {
  const outcomes = [
    "Learn React from the ground up and finish the course as an advanced React developer",
    "Join more than 900,000 students in this course & more than 3,000,000 students I taught across all my courses",
    "Follow along locally or in a cloud development environment",
    "Manage complex state efficiently with React's Context API & React Redux",
    "Build multiple high-quality demo apps, including a fullstack app built with Next.JS",
    "Build fullstack React apps with NextJS 14+",
    "Learn all about React Hooks and React Components",
    "Build standalone React apps & applications connected to a backend via HTTP",
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        What you'll learn
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex gap-3">
            <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700">{outcome}</p>
          </div>
        ))}
      </div>
      <button className="text-purple-600 font-medium mt-4 hover:underline">
        Show more
      </button>
    </div>
  );
};

// Course Includes Component
const CourseIncludes = () => {
  const includes = [
    { icon: Play, text: "71 hours on-demand video" },
    { icon: Code, text: "37 coding exercises" },
    { icon: BookMarked, text: "Assignments" },
    { icon: MessageSquare, text: "48 articles" },
    { icon: Code, text: "63 downloadable resources" },
    { icon: BookMarked, text: "Access on mobile and TV" },
    { icon: MessageSquare, text: "Closed captions" },
    { icon: Check, text: "Certificate of completion" },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        This course includes:
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {includes.map((item, index) => (
          <div key={index} className="flex gap-3">
            <item.icon size={20} className="text-gray-600 flex-shrink-0" />
            <p className="text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Explore Related Topics Component
const ExploreRelatedTopics = () => {
  const topics = ["React JS", "Programming Languages", "Development"];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Explore related topics
      </h2>
      <div className="flex gap-3">
        {topics.map((topic, index) => (
          <button
            key={index}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

// Course Content Component
const CourseContent = () => {
  const sections = [
    { title: "Getting Started", lectures: 11, duration: "42min" },
    { title: "JavaScript Refresher", lectures: 23, duration: "1hr 42min" },
    {
      title: "React Essentials - Components, JSX, Props, State & More",
      lectures: 25,
      duration: "2hr 27min",
    },
    {
      title: "React Essentials - Deep Dive",
      lectures: 37,
      duration: "3hr 16min",
    },
    {
      title: "React Essentials - Practice Project",
      lectures: 8,
      duration: "54min",
    },
    { title: "Styling React Components", lectures: 20, duration: "1hr 55min" },
    { title: "Debugging React Apps", lectures: 6, duration: "29min" },
    {
      title: "Working with Refs & Portals",
      lectures: 17,
      duration: "1hr 26min",
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Course content</h2>
        <button className="text-purple-600 font-medium text-sm hover:underline">
          Expand all sections
        </button>
      </div>
      <p className="text-gray-600 text-sm mb-4">
        40 sections • 726 lectures • 7h 22m total length
      </p>

      <Accordion
        type="single"
        collapsible
        className="border border-gray-200 rounded-lg overflow-hidden"
      >
        {sections.map((section, index) => (
          <AccordionItem
            key={index}
            value={`section-${index}`}
            className="border-b last:border-b-0"
          >
            <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-gray-900">
                  {section.title}
                </span>
                <span className="text-gray-600 text-sm">
                  {section.lectures} lectures • {section.duration}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2 bg-gray-50">
              <p className="text-gray-600 text-sm">Lesson content here...</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <button className="w-full mt-4 border-2 border-purple-600 text-purple-600 font-semibold py-3 rounded-lg hover:bg-purple-50 transition-colors">
        30 more sections
      </button>
    </div>
  );
};

// Requirements Component
const Requirements = () => {
  const requirements = [
    "JavaScript + HTML + CSS fundamentals are absolutely required",
    "You DON'T need to be a JavaScript expert to succeed in this course!",
    "ES6+ JavaScript knowledge is beneficial but not a must-have",
    "NO prior React or any other JS framework experience is required!",
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
      <ul className="space-y-2">
        {requirements.map((req, index) => (
          <li key={index} className="flex gap-3 text-gray-700">
            <span className="text-gray-400">•</span>
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Description Component
const Description = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
      <p className="text-gray-700 mb-4">
        This bestselling course by the author of "React Key Concepts" has turned
        more students into React.JS developers than any other courses - more
        than 900,000 and counting!
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Updated December 2024:</strong>
      </p>
      <ul className="space-y-2 text-gray-700 mb-4">
        <li>• Fully updated for React 19!</li>
        <li>
          • Added brand-new section on "Form Actions" (introduced by React 19)
        </li>
        <li>
          • Added brand-new section on React Server Components (stable with
          React 19)
        </li>
        <li>
          • Updated multiple lectures to adjust for smaller changes due to React
          19
        </li>
      </ul>
      <button className="text-purple-600 font-medium hover:underline">
        Show more
      </button>
    </div>
  );
};

// Pricing Sidebar Component
const PricingSidebar = ({
  course,
  handleAddToCart,
  handleRemoveFromCart,
  handleSubscribeToCourse,
}: {
  course: StudentCourseResponse | null;
  handleAddToCart?: () => void;
  handleRemoveFromCart?: () => void;
  handleSubscribeToCourse?: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <Tabs defaultValue="personal" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="bg-purple-50 rounded-lg p-3 mb-4 flex items-start gap-2">
        <span className="text-purple-600 text-lg">⊕</span>
        <p className="text-sm text-gray-700">
          This Premium course is included in plans
        </p>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900">${course?.price}</div>
        <div className="text-sm text-gray-600 line-through">
          ${course?.price}
        </div>
        <div className="text-sm font-semibold text-gray-900">0% off</div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
        <p className="text-red-600 text-sm font-semibold">
          🕐 1 day left at this price!
        </p>
      </div>

      {!course?.is_subscribed &&
        (course?.is_course_in_cart ? (
          <Button
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 mb-3 rounded-lg"
            onClick={() => handleRemoveFromCart?.()}
          >
            Remove from cart
          </Button>
        ) : (
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 mb-3 rounded-lg"
            onClick={() => handleAddToCart?.()}
          >
            Add to cart
          </Button>
        ))}

      {!course?.is_subscribed ? (
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={handleSubscribeToCourse}
        >
          {/*<Heart size={20} className="mr-2" />*/}
          Subscribe to course
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={() => router.push(`/courses/${course.id}/suites`)}
        >
          {/*<Heart size={20} className="mr-2" />*/}
          Go To Learning
        </Button>
      )}

      <div className="border-t pt-4 mt-4 mb-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-semibold">
          <span>Proceed with</span>
          <span>💳 **** 9533</span>
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mb-4">or</p>

      <div className="space-y-2 mb-6 text-center text-sm">
        <p className="text-gray-600">🛡️ 30-Day Money-Back Guarantee</p>
        <p className="text-gray-600">♾️ Full Lifetime Access</p>
      </div>

      <div className="flex gap-4 text-center text-sm mb-6">
        <button className="flex-1 hover:text-purple-600 font-medium">
          Share
        </button>
        <button className="flex-1 hover:text-purple-600 font-medium">
          Gift this course
        </button>
        <button className="flex-1 hover:text-purple-600 font-medium">
          Apply Coupon
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-6 text-sm">
        <p className="text-gray-600 mb-2">CP251129CMG2 is applied</p>
        <p className="text-gray-500 text-xs">Udemy coupon</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
          Subscribe to Udemy's top courses
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Get this course, plus 26,000+ of our top-rated courses, with Personal
          Plan.{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Learn more
          </a>
        </p>
        <Button className="w-full border-2 border-purple-600 text-purple-600 bg-white hover:bg-purple-50 font-semibold py-3 rounded-lg">
          Start subscription
        </Button>
        <p className="text-gray-600 text-xs text-center mt-2">
          Starting at $10.00 per month
        </p>
        <p className="text-gray-600 text-xs text-center">Cancel anytime</p>
      </div>
    </div>
  );
};

// Main Component
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
        variables: {
          courseId,
        },
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

  const handleEnrollNow = async () => {
    // Navigate to checkout or enrollment flow
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
    await addCourseToCart({
      variables: {
        courseId,
      },
    });
    setData({
      isCartUpdated: true,
    });
  };

  const handleRemoveFromCart = async () => {
    await removeCourseFromCart({
      variables: {
        courseId,
      },
    });
    setData({
      isCartUpdated: true,
    });
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    if (data.isCartUpdated) {
      fetchCourseDetails();
    }
  }, [data.isCartUpdated]);

  return (
    <div className="bg-gray-900 min-h-screen pt-24">
      {/* Dark Header Section */}
      <div className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <CourseHeader course={course} />

          {/* Video Preview Placeholder */}
          <div className="bg-gray-800 rounded-lg h-96 mb-8 flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play size={48} className="text-white fill-white" />
              </div>
              <p className="text-white text-lg font-semibold">
                Preview this course
              </p>
            </div>
          </div>

          <PremiumInfoCard />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <LearningOutcomes />
              <ExploreRelatedTopics />
              <CourseIncludes />
              <CourseContent />
              <Requirements />
              <Description />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PricingSidebar
                course={course}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleSubscribeToCourse={handleEnrollNow}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
