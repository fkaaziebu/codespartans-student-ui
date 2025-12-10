"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Question } from "@/common/graphql/generated/graphql";
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

// Main Test Taking Component
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
  const [timeRemaining, setTimeRemaining] = useState(5400); // 90 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
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

  // Timer effect
  useEffect(() => {
    if (!isPaused && timeRemaining > 0 && !testEnded) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isPaused, testEnded]);

  // Auto end test when time runs out
  useEffect(() => {
    if (timeRemaining === 0 && !testEnded) {
      setTestEnded(true);
      setIsPaused(true);
    }
  }, [timeRemaining, testEnded]);

  const handleAnswerSelect = (answer: string) => {
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

      // Move to next question if available
      handleNext();
    } catch (err: any) {
      console.error("Error submitting answer:", err);
      setError(`${err.message}`.toString());
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (
      (currentQuestion?.question_number || 0) <
      (course?.approved_version?.questions?.length || 0)
    ) {
      setCurrentQuestion(
        // @ts-expect-error error
        course?.approved_version?.questions?.find(
          // @ts-expect-error error
          (qs) => qs.question_number === currentQuestion?.question_number + 1,
        ),
      );
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    if ((currentQuestion?.question_number || 0) > 1) {
      setCurrentQuestion(
        // @ts-expect-error error
        course?.approved_version?.questions.find(
          // @ts-expect-error error
          (qs) => qs.question_number === currentQuestion?.question_number - 1,
        ),
      );
      setSelectedAnswer(null);
    }
  };

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
      await endTest({
        variables: {
          testId,
        },
      });

      router.push(`/courses/${courseId}/tests/${testId}/results`);
    } catch (err) {
      console.error("Error ending test:", err);
      setError("Failed to end test.");
    }
  };

  if (testEnded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Test Submitted
          </h2>
          <p className="text-gray-600 mb-6">
            You have answered {answeredQuestions.size} out of 30 questions.
          </p>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg">
            View Results
          </Button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    studentProfile();
    getSubscribedCourseDetails({
      variables: {
        courseId,
      },
    });
    getAllAttemptedQuestions({
      variables: {
        testId,
      },
      fetchPolicy: "no-cache",
    });
  }, []);

  useEffect(() => {
    if (course?.approved_version?.questions) {
      // @ts-expect-error error
      setCurrentQuestion(course?.approved_version?.questions[0]);
    }
  }, [course]);

  useEffect(() => {
    if (currentQuestion) {
      setStartTime(Date.now());
      getAllAttemptedQuestions({
        variables: {
          testId,
        },
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

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-12">
      <TestNavbar
        testName={course?.title || ""}
        studentId={data?.id || ""}
        testId={testId}
        handlePauseTest={(isPaused: boolean) => setIsPaused(isPaused)}
      />

      <div className="px-2 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Side - Question List */}
          <div className="lg:col-span-1">
            <QuestionList
              // @ts-expect-error err
              questions={course?.approved_version?.questions}
              // @ts-expect-error error
              currentQuestion={currentQuestion}
              answeredQuestions={answeredQuestions}
              flaggedQuestions={flaggedQuestions}
              onSelectQuestion={(question) => {
                setCurrentQuestion(question);
                setSelectedAnswer(null);
              }}
            />
          </div>

          {/* Middle Side - Question Display */}
          <div className="lg:col-span-2">
            {currentQuestion && (
              <QuestionDisplay
                question={currentQuestion}
                totalQuestions={
                  course?.approved_version?.questions?.length || 0
                }
                error={error}
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

          {/* Right Side - Test Controls */}
          <div className="lg:col-span-1">
            <TestControls
              isPaused={isPaused}
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
