"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Question,
  QuestionType,
  TestModeType,
} from "@/common/graphql/generated/graphql";
import { formatTimeRange } from "@/common/helpers";
import {
  useEndTest,
  usePauseTest,
  useResumeTest,
  useSubmitAnswer,
} from "@/common/hooks/mutations";
import {
  useGetAllAttemptedQuestions,
  useGetSubscribedCourseDetails,
  useStudentProfile,
} from "@/common/hooks/queries";
import { Button } from "@/components/ui/button";
import TestNavbar from "../test-navbar";
import { QuestionDisplay } from "./question-display";
import { QuestionList } from "./question-list";
import { TestControls } from "./test-controls";

type AnswerResult = {
  isCorrect: boolean;
  correctAnswer: string;
  solutionSteps: string[];
  isPending?: boolean;
};

export const TestTakingContentArea = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [isPaused, setIsPaused] = useState(false);
  const [testEnded, setTestEnded] = useState(false);

  // Mode-aware state
  const [testMode, setTestMode] = useState<TestModeType | null>(null);
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);

  const { data, studentProfile } = useStudentProfile();
  const { data: course, getSubscribedCourseDetails } =
    useGetSubscribedCourseDetails();
  const { data: attemptedQuestions, getAllAttemptedQuestions } =
    useGetAllAttemptedQuestions();
  const { submitAnswer } = useSubmitAnswer();
  const { pauseTest } = usePauseTest();
  const { resumeTest } = useResumeTest();
  const { endTest } = useEndTest();
  const { testId, courseId } = useParams<{
    testId: string;
    courseId: string;
  }>();
  const router = useRouter();

  const isLearningMode = testMode === TestModeType.UnProctured;
  const totalQuestions = course?.approved_version?.questions?.length || 0;

  // Detect test mode by matching testId against attempts in fetched course data
  useEffect(() => {
    if (course?.approved_version?.test_suites && testId) {
      for (const suite of course.approved_version.test_suites) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const attempt = (suite as any).attempts?.find((a: any) => a.id === testId);
        if (attempt) {
          setTestMode(attempt.mode);
          break;
        }
      }
    }
  }, [course, testId]);

  const handleAnswerSelect = (answer: string) => {
    if (answerResult) return; // lock options once feedback is shown
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = async (isFlagged = false) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (!selectedAnswer && !isFlagged) {
        setError("Please select an answer before submitting.");
        return;
      }

      // @ts-expect-error error
      setAnsweredQuestions((prev) => new Set([...prev, currentQuestion?.id]));
      if (isFlagged) {
        // @ts-expect-error error
        setFlaggedQuestions((prev) => new Set([...prev, currentQuestion.id]));
      } else {
        setFlaggedQuestions(
          (prev) =>
            new Set([...prev].filter((id) => id !== currentQuestion?.id)),
        );
      }

      const timeSpent = Date.now() - startTime;
      const timeRange = formatTimeRange(timeSpent);

      const response = await submitAnswer({
        variables: {
          testId,
          questionId: currentQuestion?.id || "",
          timeRange,
          answer: selectedAnswer || "",
          isFlagged,
        },
      });

      if (response.errors) {
        // @ts-expect-error error
        throw new Error(response.errors[0]);
      }

      const isShortAnswer =
        currentQuestion?.type === QuestionType.ShortAnswer ||
        currentQuestion?.type === QuestionType.FillIn;

      if (isLearningMode && !isFlagged && selectedAnswer) {
        if (isShortAnswer) {
          // Non-deterministic: show pending state, AI will mark asynchronously
          setAnswerResult({
            isCorrect: false,
            correctAnswer: "",
            solutionSteps: [],
            isPending: true,
          });
        } else {
          // Deterministic: show immediate feedback
          setAnswerResult({
            isCorrect: selectedAnswer === currentQuestion?.correct_answer,
            correctAnswer: currentQuestion?.correct_answer || "",
            solutionSteps: currentQuestion?.solution_steps || [],
          });
        }
      } else {
        // Proctored mode (or flagged): auto-advance
        handleNext();
      }
    } catch (err: unknown) {
      console.error("Error submitting answer:", err);
      setError(`${(err as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    setAnswerResult(null);
    if (
      (currentQuestion?.question_number || 0) <
      (course?.approved_version?.questions?.length || 0)
    ) {
      setCurrentQuestion(
        course?.approved_version?.questions?.find(
          (qs) => qs.question_number === (currentQuestion?.question_number ?? 0) + 1,
        ),
      );
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    setAnswerResult(null);
    if ((currentQuestion?.question_number || 0) > 1) {
      setCurrentQuestion(
        course?.approved_version?.questions?.find(
          (qs) => qs.question_number === (currentQuestion?.question_number ?? 0) - 1,
        ),
      );
      setSelectedAnswer(null);
    }
  };

  const handlePauseTest = async () => {
    if (!testId) return;
    try {
      const response = await pauseTest({ variables: { testId } });
      if (response.data?.pauseTest) setIsPaused(true);
    } catch (err) {
      console.error("Error pausing test:", err);
      setError("Failed to pause test.");
    }
  };

  const handleResumeTest = async () => {
    if (!testId) return;
    try {
      const response = await resumeTest({ variables: { testId } });
      if (response.data?.resumeTest) {
        setIsPaused(false);
        setStartTime(Date.now());
      }
    } catch (err) {
      console.error("Error resuming test:", err);
      setError("Failed to resume test.");
    }
  };

  const handleEndTest = async () => {
    if (!testId) return;
    try {
      await endTest({ variables: { testId } });
      router.push(`/courses/${courseId}/tests/${testId}/results`);
    } catch (err) {
      console.error("Error ending test:", err);
      setError("Failed to end test.");
    }
  };

  useEffect(() => {
    studentProfile();
    getSubscribedCourseDetails({ variables: { courseId } });
    getAllAttemptedQuestions({
      variables: { testId },
      fetchPolicy: "no-cache",
    });
  }, []);

  useEffect(() => {
    if (course?.approved_version?.questions) {
      setCurrentQuestion(course?.approved_version?.questions[0]);
    }
  }, [course]);

  useEffect(() => {
    if (currentQuestion) {
      setStartTime(Date.now());
      getAllAttemptedQuestions({
        variables: { testId },
        fetchPolicy: "no-cache",
      });
    }
  }, [currentQuestion]);

  useEffect(() => {
    // @ts-expect-error error
    setAnsweredQuestions((prev) => new Set([...prev, currentQuestion?.id]));
    setAnsweredQuestions(
      (prev) =>
        new Set([
          ...prev,
          ...(attemptedQuestions?.map((q) => q.question_id) || []),
        ]),
    );
    setFlaggedQuestions(
      (prev) =>
        new Set([
          ...prev,
          ...(attemptedQuestions
            ?.filter((q) => q.is_flagged === true)
            ?.map((q) => q.question_id) || []),
        ]),
    );
    setSelectedAnswer(
      attemptedQuestions?.find((aq) => aq.question_id === currentQuestion?.id)
        ?.answer_provided || "",
    );
  }, [attemptedQuestions]);

  if (testEnded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Test Submitted
          </h2>
          <p className="text-gray-600 mb-6">
            You answered {answeredQuestions.size} of {totalQuestions} questions.
          </p>
          <Button
            className="w-full"
            onClick={() =>
              router.push(`/courses/${courseId}/tests/${testId}/results`)
            }
          >
            View Results
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-12">
      <TestNavbar
        testName={course?.title || ""}
        studentId={data?.id || ""}
        testId={testId}
        mode={testMode}
        handlePauseTest={(paused: boolean) => setIsPaused(paused)}
      />

      <div className="px-2 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question navigator */}
          <div className="lg:col-span-1">
            <QuestionList
              questions={course?.approved_version?.questions}
              currentQuestion={currentQuestion}
              answeredQuestions={answeredQuestions}
              flaggedQuestions={flaggedQuestions}
              onSelectQuestion={(question) => {
                setAnswerResult(null);
                setCurrentQuestion(question);
                setSelectedAnswer(null);
              }}
            />
          </div>

          {/* Question display */}
          <div className="lg:col-span-2">
            {currentQuestion && (
              <QuestionDisplay
                question={currentQuestion}
                totalQuestions={totalQuestions}
                error={error}
                mode={testMode}
                answerResult={answerResult}
                // @ts-expect-error error
                selectedAnswer={
                  selectedAnswer ||
                  attemptedQuestions?.find(
                    (aq) => aq.question_id === currentQuestion?.id,
                  )?.answer_provided
                }
                onAnswerSelect={handleAnswerSelect}
                onSubmitAnswer={handleSubmitAnswer}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isFirst={currentQuestion?.question_number === 1}
                isLast={
                  currentQuestion?.question_number ===
                  (course?.approved_version?.questions?.length || 1)
                }
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* Test controls */}
          <div className="lg:col-span-1">
            <TestControls
              mode={testMode}
              isPaused={isPaused}
              totalQuestions={totalQuestions}
              answeredCount={answeredQuestions.size}
              onPause={handlePauseTest}
              onResume={handleResumeTest}
              onEnd={handleEndTest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
