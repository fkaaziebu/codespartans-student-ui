"use client";
import { ChevronLeft, ChevronRight, Star, Users } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Course Card Component for Carousel
interface CarouselCourse {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  image: string;
  isBestseller: boolean;
  isPremium: boolean;
}

const CarouselCourseCard = ({ course }: { course: CarouselCourse }) => {
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400"></div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">
          {course.title}
        </h4>
        <p className="text-xs text-gray-600 mb-3">{course.instructor}</p>

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
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-gray-900">${course.price}</span>
          <span className="text-gray-500 line-through text-xs">
            ${course.originalPrice}
          </span>
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          {course.isBestseller && (
            <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded">
              Bestseller
            </span>
          )}
          {course.isPremium && (
            <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              ⊕ Premium
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Carousel Section Component
const CoursesCarouselSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const courses: CarouselCourse[] = [
    {
      id: 1,
      title: "Full stack generative and Agentic AI with python",
      instructor: "Hitesh Choudhary, Piyush Garg",
      rating: 4.6,
      reviews: 2319,
      price: 9.99,
      originalPrice: 44.99,
      image: "",
      isBestseller: true,
      isPremium: false,
    },
    {
      id: 2,
      title: "Succeed in the Age of AI",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      rating: 4.6,
      reviews: 626,
      price: 9.99,
      originalPrice: 29.99,
      image: "",
      isBestseller: true,
      isPremium: false,
    },
    {
      id: 3,
      title: "Generative AI for Beginners",
      instructor: "Aakriti E-Learning Academy",
      rating: 4.5,
      reviews: 72144,
      price: 9.99,
      originalPrice: 49.99,
      image: "",
      isBestseller: true,
      isPremium: true,
    },
    {
      id: 4,
      title: "Learn Agentic AI – Build Multi-Agent Automation Workflows",
      instructor: "Rahul Shetty Academy",
      rating: 4.6,
      reviews: 987,
      price: 9.99,
      originalPrice: 49.99,
      image: "",
      isBestseller: true,
      isPremium: false,
    },
  ];

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 300));
  };

  const scrollRight = () => {
    setScrollPosition(scrollPosition + 300);
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Courses to get you started
      </h2>
      <p className="text-gray-600 mb-6">
        Explore courses from experienced, real-world experts.
      </p>

      {/* Tabs */}
      <Tabs defaultValue="popular" className="mb-6">
        <TabsList className="border-b border-gray-200 rounded-none bg-transparent w-full justify-start">
          <TabsTrigger
            value="popular"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
          >
            Most popular
          </TabsTrigger>
          <TabsTrigger
            value="new"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
          >
            New
          </TabsTrigger>
          <TabsTrigger
            value="beginner"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent"
          >
            Beginner Favorites
          </TabsTrigger>
        </TabsList>

        {/* Carousel */}
        <div className="relative mt-6">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            disabled={scrollPosition === 0}
          >
            <ChevronLeft size={24} className="text-gray-900" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronRight size={24} className="text-gray-900" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-300"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              <TabsContent value="popular" asChild className="mt-0">
                <div className="flex gap-4">
                  {courses.map((course) => (
                    <CarouselCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="new" asChild className="mt-0">
                <div className="flex gap-4">
                  {courses
                    .slice()
                    .reverse()
                    .map((course) => (
                      <CarouselCourseCard key={course.id} course={course} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="beginner" asChild className="mt-0">
                <div className="flex gap-4">
                  {courses
                    .filter((c) => c.rating >= 4.5)
                    .map((course) => (
                      <CarouselCourseCard key={course.id} course={course} />
                    ))}
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

// Related Topics Grid Component
const RelatedTopicsSection = () => {
  const topics = [
    "ChatGPT",
    "AI Content Generation",
    "AI Agents & Agentic AI",
    "Python",
    "LangChain",
    "Artificial Intelligence (AI)",
    "Prompt Engineering",
    "Large Language Models (LLM)",
    "Machine Learning",
    "Midjourney",
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Generative AI (GenAI) students also learn
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {topics.map((topic, index) => (
          <button
            key={index}
            className="border border-gray-300 rounded-lg p-4 text-center text-gray-900 font-medium hover:border-gray-400 hover:shadow-md transition-all"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

// Header Component
const CategoryHeader = () => {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Generative AI (GenAI) Courses
      </h1>

      {/* Related Categories */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm mb-2">
          Generative AI (GenAI) relates to{" "}
          <a href="#" className="text-purple-600 hover:underline font-semibold">
            IT & Software
          </a>
          ,{" "}
          <a href="#" className="text-purple-600 hover:underline font-semibold">
            Business
          </a>
        </p>
      </div>

      {/* Learner Count */}
      <div className="flex items-center gap-2 text-gray-600">
        <Users size={18} />
        <span className="text-sm font-medium">2,004,566 learners</span>
      </div>
    </div>
  );
};

// Main Component
export const CategoryDetailsContentArea = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-12">
        <CategoryHeader />
        <CoursesCarouselSection />
        <RelatedTopicsSection />
      </div>
    </div>
  );
};
