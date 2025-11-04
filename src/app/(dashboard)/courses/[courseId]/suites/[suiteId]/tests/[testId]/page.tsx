"use client";
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Pause,
  Play,
  X,
} from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useEndTest,
  usePauseTest,
  useResumeTest,
  useSubmitAnswer,
} from "@/common/hooks/mutations";

import {
  QuestionDifficultyType,
  QuestionTagType,
  QuestionType,
} from "@/common/graphql/generated/graphql";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetQuestion } from "@/common/hooks/queries";
import { QuestionDisplay, TestTimer } from "@/components/features/test";
import { EndTestModal, PauseTestModal } from "@/components/modals";

type Question = {
  id: string;
  description: string;
  difficulty: QuestionDifficultyType;
  estimated_time_in_ms: number;
  hints: string[];
  options: string[];
  question_number: number;
  solution_steps: string[];
  tags: QuestionTagType[];
  type: QuestionType;
};

type AnswerResponse = {
  answer_provided: string;
  hints_used: number;
  id: string;
  is_flagged: boolean;
  question_id: string;
};

export default function TestTakingPage() {
  const router = useRouter();
  const { courseId, testId, suiteId } = useParams<{
    courseId: string;
    testId: string;
    suiteId: string;
  }>();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attempt");

  // State
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isFlagged, setIsFlagged] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  // Hooks
  const { getQuestion } = useGetQuestion();
  const { submitAnswer } = useSubmitAnswer();
  const { pauseTest } = usePauseTest();
  const { resumeTest } = useResumeTest();
  const { endTest } = useEndTest();

  // Initialize test
  useEffect(() => {
    const initializeTest = async () => {
      try {
        setIsLoading(true);

        // Fetch first question
        await fetchQuestion(testId);
      } catch (err) {
        console.error("Error initializing test:", err);
        setError("Failed to initialize test. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeTest();
  }, []);

  // Fetch question
  const fetchQuestion = async (currentTestId: string) => {
    try {
      const response = await getQuestion({
        variables: {
          testId: currentTestId,
        },
        fetchPolicy: "no-cache",
      });

      if (response.data?.getQuestion) {
        // @ts-expect-error error
        setQuestion(response.data.getQuestion);
        setSelectedAnswer("");
        setShowHints(false);
        setStartTime(Date.now());
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Failed to load question. Please try again.");
    }
  };

  // Submit answer
  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !testId || !question) {
      setError("Please select an answer before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const timeSpent = Date.now() - startTime;
      const timeRange = formatTimeRange(timeSpent);

      const response = await submitAnswer({
        variables: {
          testId,
          questionId: question.id,
          timeRange,
          answer: selectedAnswer,
        },
      });

      await fetchQuestion(testId);
    } catch (err: any) {
      console.error("Error submitting answer:", err);

      // Check if test is complete
      if (
        err.message?.includes("complete") ||
        err.message?.includes("no more questions")
      ) {
        handleTestComplete();
      } else {
        setError("Failed to submit answer. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format time range for submission
  const formatTimeRange = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    return `${seconds}s`;
  };

  // Pause test
  const handlePauseTest = async () => {
    if (!testId) return;

    try {
      const response = await pauseTest({
        variables: {
          testId,
        },
      });

      if (response.data?.pauseTest) {
        setIsPaused(true);
        setIsPauseModalOpen(true);
      }
    } catch (err) {
      console.error("Error pausing test:", err);
      setError("Failed to pause test.");
    }
  };

  // Resume test
  const handleResumeTest = async () => {
    if (!testId) return;

    try {
      const response = await resumeTest({
        variables: {
          testId,
        },
      });

      if (response.data?.resumeTest) {
        setIsPaused(false);
        setIsPauseModalOpen(false);
        setStartTime(Date.now()); // Reset start time for current question
      }
    } catch (err) {
      console.error("Error resuming test:", err);
      setError("Failed to resume test.");
    }
  };

  // End test
  const handleEndTest = async () => {
    if (!testId) return;

    try {
      const response = await endTest({
        variables: {
          testId,
        },
      });

      router.push(`/courses/${courseId}/suites`);
    } catch (err) {
      console.error("Error ending test:", err);
      setError("Failed to end test.");
    }
  };

  // Handle test complete
  const handleTestComplete = () => {
    router.push(`/student/courses/${courseId}/test/results?testId=${testId}`);
  };

  // Toggle hints
  const handleToggleHints = () => {
    if (!showHints) {
      setHintsUsed(hintsUsed + 1);
    }
    setShowHints(!showHints);
  };

  // Toggle flag
  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
  };

  // Difficulty badge
  const getDifficultyBadge = (difficulty: QuestionDifficultyType) => {
    const colors: { [key: string]: string } = {
      EASY: "bg-green-100 text-green-800",
      MEDIUM: "bg-yellow-100 text-yellow-800",
      HARD: "bg-red-100 text-red-800",
    };
    return (
      <Badge
        className={`${colors[difficulty] || colors.EASY} hover:${colors[difficulty] || colors.EASY}`}
      >
        {difficulty}
      </Badge>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  // No question state
  if (!question) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-bold text-gray-950">
            Unable to load question
          </h3>
          <p className="text-sm text-gray-600">
            {error || "There was an error loading the test."}
          </p>
          <Button
            onClick={() => router.push(`/student/courses/${courseId}/test`)}
          >
            Back to Test Suites
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setIsEndModalOpen(true)}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-gray-700">
                {question.question_number}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-950">
                  Question {question.question_number}
                </span>
                <div className="flex items-center gap-2">
                  {getDifficultyBadge(question.difficulty)}
                  {question.tags && question.tags.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {question.tags[0].replace("TAG_", "")}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TestTimer
              estimatedTime={question.estimated_time_in_ms}
              isPaused={isPaused}
            />
            <Button
              variant="outline"
              onClick={handleToggleFlag}
              className={cn(
                "flex items-center gap-2",
                isFlagged && "border-yellow-500 bg-yellow-50",
              )}
            >
              <Flag
                className={cn(
                  "w-4 h-4",
                  isFlagged ? "fill-yellow-500 text-yellow-500" : "",
                )}
              />
              {isFlagged ? "Flagged" : "Flag"}
            </Button>
            <Button
              variant="outline"
              onClick={isPaused ? handleResumeTest : handlePauseTest}
              className="flex items-center gap-2"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEndModalOpen(true)}
              className="text-red-600 hover:text-red-700"
            >
              End Test
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="px-8 py-4">
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <QuestionDisplay
              question={question}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={setSelectedAnswer}
              showHints={showHints}
              onToggleHints={handleToggleHints}
              hintsUsed={hintsUsed}
            />
          </div>
        </div>

        {/* Footer - Navigation */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-t">
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          </div>

          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer || isSubmitting}
            className="bg-gray-800 hover:bg-gray-950 px-8"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                Submit Answer
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Pause Modal */}
      <PauseTestModal
        open={isPauseModalOpen}
        onClose={() => setIsPauseModalOpen(false)}
        onResume={handleResumeTest}
        onEnd={() => {
          setIsPauseModalOpen(false);
          setIsEndModalOpen(true);
        }}
      />

      {/* End Test Modal */}
      <EndTestModal
        open={isEndModalOpen}
        onClose={() => setIsEndModalOpen(false)}
        onConfirm={handleEndTest}
      />
    </div>
  );
}
