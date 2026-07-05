"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SuiteType,
  TestModeType,
  TestStatusType,
} from "@/common/graphql/generated/graphql";
import { useStartTest } from "@/common/hooks/mutations";
import { useGetSubscribedCourseDetails } from "@/common/hooks/queries";
import { CourseTestHeader, SuiteCard } from "@/components/features/course-test";
import { SuiteHistoryModal } from "@/components/modals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ── Types ──────────────────────────────────────────────────────────────────────

type SubmittedAnswer = {
  id: string;
  answer_provided: string;
  is_flagged: boolean;
  question?: { id: string; correct_answer: string } | null;
};

type TestAttempt = {
  id: string;
  status: TestStatusType;
  mode: TestModeType;
  submitted_answers?: SubmittedAnswer[] | null;
  score: number; // computed from submitted_answers
  total_questions: number;
};

type SuiteWithAttempts = {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  difficulty: string;
  suite_type: SuiteType | null;
  questions: { id: string }[];
  question_count: number;
  estimated_time: number;
  topics: string[];
  attempts: TestAttempt[];
  best_score: number;
  average_score: number;
};

// ── Helpers ────────────────────────────────────────────────────────────────────

const computeScore = (
  answers: SubmittedAnswer[] | null | undefined,
): number => {
  if (!answers || answers.length === 0) return 0;
  const correct = answers.filter(
    (sa) => sa.answer_provided === sa.question?.correct_answer,
  ).length;
  return Math.round((correct / answers.length) * 100);
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CourseTestPage() {
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<SuiteWithAttempts | null>(
    null,
  );
  const [suites, setSuites] = useState<SuiteWithAttempts[]>([]);
  const [activeFilter, setActiveFilter] = useState<SuiteType | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState("");

  const { getSubscribedCourseDetails } = useGetSubscribedCourseDetails();
  const { startTest } = useStartTest();

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getSubscribedCourseDetails({
        variables: { courseId },
        fetchPolicy: "no-cache",
      });

      const courseData = response.data?.getSubscribedCourseDetails;
      if (!courseData) return;

      setCourseTitle(courseData.title);

      const rawSuites = courseData.approved_version?.test_suites ?? [];
      const transformed: SuiteWithAttempts[] = rawSuites.map((suite) => {
        const questionCount = suite.questions?.length ?? 0;

        const attempts: TestAttempt[] = [];

        const scores = attempts.map((a) => a.score);
        const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
        const averageScore =
          scores.length > 0
            ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
            : 0;

        return {
          id: suite.id,
          title: suite.title ?? "",
          description: suite.description ?? "",
          keywords: suite.keywords ?? [],
          difficulty: suite.difficulty,
          suite_type: suite.suite_type ?? null,
          questions: (suite.questions ?? []).map((q) => ({ id: q.id })),
          question_count: questionCount,
          estimated_time: questionCount * 2,
          topics: suite.keywords ?? [],
          attempts,
          best_score: bestScore,
          average_score: averageScore,
        };
      });

      setSuites(transformed);
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

  const handleStartTest = async (suiteId: string, mode: TestModeType) => {
    try {
      const response = await startTest({
        variables: { suiteId, mode },
      });

      if (response.errors?.length) throw new Error("Error starting test");

      router.push(`/courses/${courseId}/tests/${response.data?.startTest.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewHistory = (suite: SuiteWithAttempts) => {
    setSelectedSuite(suite);
    setIsHistoryModalOpen(true);
  };

  const handleResumeTest = (_suiteId: string, attemptId: string) => {
    router.push(`/courses/${courseId}/tests/${attemptId}`);
  };

  // Filtered suites
  const filteredSuites =
    activeFilter === "ALL"
      ? suites
      : suites.filter((s) => s.suite_type === activeFilter);

  // Derive which filter tabs are meaningful (only show types that exist)
  const availableTypes = Array.from(
    new Set(suites.map((s) => s.suite_type).filter(Boolean)),
  ) as SuiteType[];

  const filterLabels: Record<SuiteType | "ALL", string> = {
    ALL: "All",
    [SuiteType.Year]:          "By Year",
    [SuiteType.YearOne]:       "Year 1",
    [SuiteType.YearTwo]:       "Year 2",
    [SuiteType.YearThree]:     "Year 3",
    [SuiteType.Mixed]:         "Mixed",
    [SuiteType.PastQuestions]: "Past Questions",
    [SuiteType.Class]:         "By Class",
    [SuiteType.Topic]:         "By Topic",
  };

  // Derived stats
  const completedSuites = suites.filter((s) => s.attempts.length > 0).length;
  const totalAttempts = suites.reduce((sum, s) => sum + s.attempts.length, 0);
  const scoredSuites = suites.filter((s) => s.average_score > 0);
  const overallAverageScore =
    scoredSuites.length > 0
      ? Math.round(
          scoredSuites.reduce((sum, s) => sum + s.average_score, 0) /
            scoredSuites.length,
        )
      : 0;

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
          <p className="text-sm text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!courseTitle) {
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
      <div className="flex min-h-screen bg-gray-50 items-center justify-center px-8">
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
            This course doesn&apos;t have any test suites yet. Check back later
            or contact your instructor.
          </p>
          <Button
            onClick={() => router.push(`/courses/${courseId}`)}
            variant="outline"
          >
            Back to Course
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen pt-24">
      <div className="flex-1 flex flex-col px-2 sm:px-10 lg:px-20 xl:px-35 py-8">
        {/* Stats header */}
        <div className="bg-white border-b">
          <CourseTestHeader
            totalSuites={suites.length}
            completedSuites={completedSuites}
            totalAttempts={totalAttempts}
            averageScore={overallAverageScore}
          />
        </div>

        {/* Suite list */}
        <div className="flex flex-col pt-8">
          <div className="flex items-center justify-between mb-4">
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

          {/* Filter tabs */}
          {availableTypes.length > 0 && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {(["ALL", ...availableTypes] as (SuiteType | "ALL")[]).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                      activeFilter === filter
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {filterLabels[filter]}
                    <span className="ml-1.5 text-xs opacity-70">
                      {filter === "ALL"
                        ? suites.length
                        : suites.filter((s) => s.suite_type === filter).length}
                    </span>
                  </button>
                ),
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSuites.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center gap-2 py-12 text-center">
                <p className="text-gray-500 font-medium">
                  No suites match this filter
                </p>
                <button
                  onClick={() => setActiveFilter("ALL")}
                  className="text-sm text-gray-700 underline"
                >
                  Show all suites
                </button>
              </div>
            ) : (
              filteredSuites.map((suite) => (
                <SuiteCard
                  key={suite.id}
                  // @ts-expect-error extended type
                  suite={suite}
                  onStartTest={handleStartTest}
                  // @ts-expect-error extended type
                  onViewHistory={handleViewHistory}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* History modal */}
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
