"use client";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetSubscribedCourseDetails } from "@/common/hooks/queries";
import { CourseTestHeader, SuiteCard } from "@/components/features/course-test";
import { SuiteHistoryModal } from "@/components/modals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStartTest } from "@/common/hooks/mutations";

// Types based on GraphQL schema
type Instructor = {
  id: string;
  email: string;
  name: string;
};

type Question = {
  id: string;
};

type TestSuite = {
  id: string;
  description: string;
  keywords: string[];
  title: string;
  questions: Question[];
};

type ApprovedVersion = {
  id: string;
  questions: Question[];
  test_suites: TestSuite[];
};

type CourseDetails = {
  id: string;
  avatar_url?: string;
  currency?: string;
  description?: string;
  domains?: string[];
  level?: string;
  price?: number;
  title: string;
  instructor?: Instructor;
  approved_version?: ApprovedVersion;
};

// Test attempt type (this would come from a separate query/mutation)
type TestAttempt = {
  id: string;
  score: number;
  total_questions: number;
  time_taken: number; // in seconds
  completed_at: string;
  status: "completed" | "in_progress" | "abandoned";
};

// Extended suite type with attempt data
type SuiteWithAttempts = TestSuite & {
  question_count: number;
  estimated_time: number; // in minutes
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  topics: string[];
  attempts: TestAttempt[];
  best_score?: number;
  average_score?: number;
  last_attempt_date?: string;
};

export default function CourseTestPage() {
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();
  const [selectedSuite, setSelectedSuite] = useState<SuiteWithAttempts | null>(
    null,
  );
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [suites, setSuites] = useState<SuiteWithAttempts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getSubscribedCourseDetails } = useGetSubscribedCourseDetails();
  const { startTest } = useStartTest();

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getSubscribedCourseDetails({
        variables: {
          courseId,
        },
      });

      const courseData = response.data?.getSubscribedCourseDetails;
      if (courseData) {
        // @ts-expect-error error
        setCourse(courseData);

        // Transform test suites to include additional data
        if (courseData.approved_version?.test_suites) {
          const transformedSuites: SuiteWithAttempts[] =
            courseData.approved_version.test_suites.map((suite) => ({
              ...suite,
              question_count: suite.questions?.length || 0,
              estimated_time: calculateEstimatedTime(
                suite.questions?.length || 0,
              ),
              difficulty: determineDifficulty(suite.keywords),
              topics: suite.keywords || [],
              attempts: [], // This would be fetched from a separate query
            }));

          setSuites(transformedSuites);
        }
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchCourseDetails();
  }, [courseId]);

  // Helper function to calculate estimated time (2 minutes per question average)
  const calculateEstimatedTime = (questionCount: number): number => {
    return questionCount * 2; // 2 minutes per question
  };

  // Helper function to determine difficulty based on keywords
  const determineDifficulty = (
    keywords: string[],
  ): "Beginner" | "Intermediate" | "Advanced" | "Expert" => {
    const lowerKeywords = keywords.map((k) => k.toLowerCase());

    if (
      lowerKeywords.some((k) =>
        [
          "advanced",
          "expert",
          "complex",
          "optimization",
          "architecture",
        ].includes(k),
      )
    ) {
      return "Expert";
    }
    if (
      lowerKeywords.some((k) =>
        ["intermediate", "patterns", "performance"].includes(k),
      )
    ) {
      return "Advanced";
    }
    if (lowerKeywords.some((k) => ["hooks", "state", "context"].includes(k))) {
      return "Intermediate";
    }
    return "Beginner";
  };

  const handleStartTest = async (suiteId: string) => {
    try {
      const response = await startTest({
        variables: {
          suiteId: suiteId,
        },
      });

      if (response.errors?.length) {
        throw new Error("Error starting test");
      }

      // Navigate to test taking page
      router.push(
        `/courses/${courseId}/suites/${suiteId}/tests/${response.data?.startTest.id}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewHistory = (suite: SuiteWithAttempts) => {
    setSelectedSuite(suite);
    setIsHistoryModalOpen(true);
  };

  const handleResumeTest = (suiteId: string, attemptId: string) => {
    // Navigate to resume test
    router.push(
      `/courses/${courseId}/test/${suiteId}/take?attempt=${attemptId}`,
    );
  };

  // Calculate overall progress
  const completedSuites = suites.filter(
    (suite) => suite.attempts && suite.attempts.length > 0,
  ).length;
  const totalAttempts = suites.reduce(
    (sum, suite) => sum + (suite.attempts?.length || 0),
    0,
  );
  const overallAverageScore =
    suites
      .filter((s) => s.average_score)
      .reduce((sum, s) => sum + (s.average_score || 0), 0) /
      suites.filter((s) => s.average_score).length || 0;

  const totalQuestions =
    course?.approved_version?.questions?.length ||
    suites.reduce((sum, suite) => sum + suite.question_count, 0);

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
          <h3 className="text-xl font-bold text-gray-950">Course not found</h3>
          <p className="text-sm text-gray-600">Unable to load course details</p>
          <Button onClick={() => router.push("/courses")}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  if (suites.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push(`/courses/${courseId}`)}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-950">
                  {course.title}
                </h1>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex items-center justify-center px-8 py-6">
            <div className="flex flex-col items-center gap-4 max-w-md text-center">
              <div className="bg-blue-100 rounded-full p-6">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-950">
                No test suites available
              </h3>
              <p className="text-sm text-gray-600">
                This course doesn't have any test suites yet. Check back later
                or contact your instructor.
              </p>
              <Button
                onClick={() => router.push(`/student/courses/${courseId}`)}
                variant="outline"
              >
                Back to Course
              </Button>
            </div>
          </div>
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
              onClick={() => router.push(`/courses`)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-950">
                {course.title}
              </h1>
              <p className="text-sm text-gray-600">{course.description}</p>
            </div>
          </div>
        </div>

        {/* Course Overview Stats */}
        <div className="px-8 py-6 bg-white border-b">
          <CourseTestHeader
            totalSuites={suites.length}
            totalQuestions={totalQuestions}
            completedSuites={completedSuites}
            totalAttempts={totalAttempts}
            averageScore={overallAverageScore}
          />
        </div>

        {/* Main Content - Test Suites */}
        <div className="flex-1 px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-950">Test Suites</h2>
                <p className="text-sm text-gray-600">
                  Select a suite to start a new test or view your test history
                </p>
              </div>
              <Badge variant="outline" className="text-sm">
                {completedSuites} of {suites.length} Completed
              </Badge>
            </div>

            {/* Suites Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {suites.map((suite) => (
                <SuiteCard
                  key={suite.id}
                  // @ts-expect-error error
                  suite={suite}
                  onStartTest={handleStartTest}
                  // @ts-expect-error error
                  onViewHistory={handleViewHistory}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {selectedSuite && (
        <SuiteHistoryModal
          open={isHistoryModalOpen}
          onClose={() => {
            setIsHistoryModalOpen(false);
            setSelectedSuite(null);
          }}
          suite={selectedSuite}
          onResumeTest={handleResumeTest}
          onStartNewTest={handleStartTest}
        />
      )}
    </div>
  );
}
