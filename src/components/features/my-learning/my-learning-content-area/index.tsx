"use client";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreVertical,
  PlayCircle,
  Search,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CourseResponse } from "@/common/graphql/generated/graphql";
import { useListOrganizationCourses } from "@/common/hooks/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Header Component
const LearningHeader = () => {
  return (
    <div className="bg-gray-900 text-white py-12 mb-8">
      <div className="px-2 sm:px-10 lg:px-20 xl:px-35">
        <h1 className="text-5xl font-bold mb-8">My learning</h1>

        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-gray-700 overflow-x-auto">
          <button className="pb-4 text-white font-semibold border-b-2 border-white whitespace-nowrap">
            All courses
          </button>
          <button className="pb-4 text-gray-300 hover:text-white font-semibold whitespace-nowrap">
            My Lists
          </button>
          <button className="pb-4 text-gray-300 hover:text-white font-semibold whitespace-nowrap">
            Wishlist
          </button>
          <button className="pb-4 text-gray-300 hover:text-white font-semibold whitespace-nowrap">
            Certifications
          </button>
          <button className="pb-4 text-gray-300 hover:text-white font-semibold whitespace-nowrap">
            Archived
          </button>
          <button className="pb-4 text-gray-300 hover:text-white font-semibold whitespace-nowrap">
            Learning tools
          </button>
        </div>
      </div>
    </div>
  );
};

// Streak Card Component
const StreakCard = ({ onDismiss }: { onDismiss: () => void }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Start a weekly streak
          </h2>
          <p className="text-gray-600">
            Let's chip away at your learning goals.
          </p>
        </div>

        <div className="text-right ml-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">0</div>
              <p className="text-sm text-gray-600">weeks</p>
              <p className="text-xs text-gray-500">Current streak</p>
            </div>

            {/* Progress Circle */}
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="55 220"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sm">
                <span className="text-xs text-orange-500">
                  ● 0/30 course min
                </span>
                <span className="text-xs text-green-600">● 1/1 visit</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Nov 24 - 30</p>
        </div>
      </div>
    </div>
  );
};

// Schedule Learning Card Component
const ScheduleLearningCard = ({ onDismiss }: { onDismiss: () => void }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-start gap-4">
        <Clock size={24} className="text-gray-400 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Schedule learning time
          </h2>
          <p className="text-gray-600 mb-4">
            Learning a little each day adds up. Research shows that students who
            make learning a habit are more likely to reach their goals. Set time
            aside to learn and get reminders using your learning scheduler.
          </p>
          <div className="flex gap-2">
            <Button className="border-2 border-purple-600 text-purple-600 bg-white hover:bg-purple-50">
              Get started
            </Button>
            <button
              onClick={onDismiss}
              className="text-purple-600 font-semibold hover:underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Bar Component
const FilterBar = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex gap-3">
        <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-full font-semibold text-sm hover:bg-purple-50">
          Recently Accessed ▼
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full font-semibold text-sm hover:border-gray-400">
          Categories ▼
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full font-semibold text-sm hover:border-gray-400">
          Progress ▼
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full font-semibold text-sm hover:border-gray-400">
          Instructor ▼
        </button>
        <button className="text-gray-600 font-medium text-sm hover:text-gray-900">
          Reset
        </button>
      </div>

      {/* Search Bar */}
      <div className="ml-auto flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search my courses"
          className="border border-gray-300 rounded-lg px-4 py-2 w-48"
        />
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg">
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};

const CourseCard = ({ course }: { course: CourseResponse | null }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <Image
        src={course?.avatar_url || ""}
        alt="Course avatar url"
        width={192}
        height={192}
        className="w-full h-40"
      />

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link
            href={`/courses/${course?.id}/suites`}
            className="font-bold text-gray-900 text-sm line-clamp-2 flex-1 hover:underline"
          >
            {course?.title}
          </Link>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <MoreVertical size={16} />
          </button>
        </div>

        <p className="text-xs text-gray-600 mb-3">{course?.instructor?.name}</p>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600"
                style={{ width: `${90}%` }}
              ></div>
            </div>
            <span className="text-xs font-semibold text-gray-900">{90}%</span>
          </div>
          <span className="text-xs text-gray-600">complete</span>
        </div>

        {/* Rating or Action */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-gray-300" />
              ))}
            </div>
            <button
              type="button"
              className="text-purple-600 font-medium text-xs hover:underline"
            >
              Leave a rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-2">
        <button className="px-3 py-2 border-b-2 border-purple-600 text-purple-600 font-semibold">
          1
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
          2
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
          3
        </button>
        <span className="px-3 py-2 text-gray-600">...</span>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-900">
          {totalPages}
        </button>
      </div>

      <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
        <ChevronRight size={20} />
      </button>

      <p className="text-sm text-gray-600 ml-4">1–12 of 85 courses</p>
    </div>
  );
};

// Main Component
export const MyLearningContentArea = () => {
  const [showScheduleCard, setShowScheduleCard] = useState(true);
  const { listOrganizationCourses } = useListOrganizationCourses();
  const [courses, setCourses] = useState<CourseResponse[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await listOrganizationCourses({
        variables: {
          filter: {
            is_subscribed: true,
          },
          pagination: {
            first: 10,
          },
        },
        fetchPolicy: "no-cache",
      });

      const coursesData =
        response.data?.listOrganizationCourses?.edges?.map(
          (edge) => edge.node,
        ) || [];

      // @ts-expect-error error
      setCourses(coursesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <LearningHeader />

      <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-8">
        {/* Streak Card */}
        <StreakCard onDismiss={() => {}} />

        {/* Schedule Learning Card */}
        {showScheduleCard && (
          <ScheduleLearningCard onDismiss={() => setShowScheduleCard(false)} />
        )}

        {/* Filter Bar */}
        <FilterBar />

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={1} totalPages={8} />
      </div>
    </div>
  );
};
