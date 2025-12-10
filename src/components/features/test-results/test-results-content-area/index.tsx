"use client";
import { AlertCircle, CheckCircle, RotateCcw, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Question,
  SubmittedAnswer,
  Test,
} from "@/common/graphql/generated/graphql";
import { useTestStats } from "@/common/hooks/queries";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Score Card Component
const ScoreCard = ({ score, total }: { score: number; total: number }) => {
  const percentage = (score / total) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-2">Your Score</p>
          <h1 className="text-5xl font-bold mb-2">
            {score}/{total}
          </h1>
          <p className="text-lg opacity-90">{percentage.toFixed(1)}%</p>
        </div>

        {/* Score Circle */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * 351.8} 351.8`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{percentage.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Performance Label */}
      <div className="mt-8 pt-6 border-t border-white border-opacity-20">
        <p className="text-sm opacity-90 mb-2">Performance</p>
        <p className="text-2xl font-bold">
          {percentage >= 80
            ? "Excellent"
            : percentage >= 60
              ? "Good"
              : percentage >= 40
                ? "Average"
                : "Needs Improvement"}
        </p>
      </div>
    </div>
  );
};

// Question Review Card Component
const QuestionReviewCard = ({
  question,
  answer,
}: {
  question: Question | undefined;
  answer: SubmittedAnswer | undefined;
}) => {
  const isCorrect = answer?.answer_provided === question?.correct_answer;

  return (
    <div
      className={`border-l-4 rounded-lg overflow-hidden shadow-md mb-6 ${
        isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            {isCorrect ? (
              <CheckCircle
                size={24}
                className="text-green-600 flex-shrink-0 mt-1"
              />
            ) : (
              <XCircle size={24} className="text-red-600 flex-shrink-0 mt-1" />
            )}
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Question {question?.question_number}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {question?.description}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
              isCorrect
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {isCorrect ? "Correct" : "Incorrect"}
          </span>
        </div>

        {/* Question Metadata */}
        <div className="flex gap-4 mb-6 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <AlertCircle size={16} />
            Difficulty:{" "}
            <span className="font-medium capitalize">
              {question?.difficulty}
            </span>
          </span>
          {answer?.is_flagged && (
            <span className="flex items-center gap-1 text-amber-600">
              ⚠️ Flagged for review
            </span>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2 mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">Options:</p>
          {question?.options?.map((option) => {
            const isSelected = option === answer?.answer_provided;
            const isCorrectOption = option === question?.correct_answer;

            return (
              <div
                key={option}
                className={`p-3 rounded-lg border-2 ${
                  isCorrectOption && !isSelected
                    ? "border-green-400 bg-green-100"
                    : isSelected && isCorrect
                      ? "border-green-400 bg-green-100"
                      : isSelected && !isCorrect
                        ? "border-red-400 bg-red-100"
                        : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{option}</span>
                  <div className="flex gap-2">
                    {isCorrectOption && (
                      <span className="text-xs font-semibold text-green-700">
                        ✓ Correct
                      </span>
                    )}
                    {isSelected && !isCorrect && (
                      <span className="text-xs font-semibold text-red-700">
                        ✗ Your answer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solution Steps */}
        {question?.solution_steps && question.solution_steps.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Solution Steps:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              {question.solution_steps.map((step) => (
                <li key={step} className="text-sm text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

// Retest Modal Component
const RetestModal = ({
  isOpen,
  testStats,
  onClose,
  onRetestComplete,
}: {
  isOpen: boolean;
  testStats: Test | null | undefined;
  onClose: () => void;
  onRetestComplete: (score: number) => void;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [retestAnswers, setRetestAnswers] = useState<Record<number, string>>(
    {},
  );
  const [showResults, setShowResults] = useState(false);

  if (!isOpen || !testStats) return null;

  const answers = testStats.submitted_answers || [];
  const currentAnswer = answers?.[currentQuestion];

  const handleAnswerSelect = (selectedAnswer: string) => {
    setRetestAnswers({
      ...retestAnswers,
      [currentQuestion]: selectedAnswer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < answers?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitRetest = () => {
    // Calculate score
    let score = 0;
    answers.forEach((answer, index) => {
      if (retestAnswers[index] === answer.question?.correct_answer) {
        score++;
      }
    });
    onRetestComplete(score);
    setShowResults(true);
  };

  if (showResults) {
    const score = Object.entries(retestAnswers).filter(
      ([index, answer]) =>
        answer === answers[parseInt(index)].question?.correct_answer,
    ).length;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Retest Complete!
          </h2>
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-purple-600 mb-2">
              {score}/{answers.length}
            </p>
            <p className="text-gray-600">
              {((score / answers.length) * 100).toFixed(1)}% Correct
            </p>
          </div>
          <Button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg"
          >
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Retest - Question {currentQuestion + 1}/{answers.length}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {currentAnswer.question?.description}
            </h3>

            <div className="space-y-3">
              {currentAnswer.question?.options?.map((option, index) => (
                <label
                  key={option}
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-300"
                  style={{
                    borderColor:
                      retestAnswers[currentQuestion] === index.toString()
                        ? "#9333ea"
                        : "#e5e7eb",
                    backgroundColor:
                      retestAnswers[currentQuestion] === index.toString()
                        ? "#faf5ff"
                        : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="retest-answer"
                    value={index}
                    checked={
                      retestAnswers[currentQuestion] === index.toString()
                    }
                    onChange={() => handleAnswerSelect(index.toString())}
                    className="w-5 h-5 text-purple-600"
                  />
                  <span className="ml-4 text-gray-900 font-medium">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 mb-6">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex-1"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentQuestion === answers.length - 1}
              variant="outline"
              className="flex-1"
            >
              Next
            </Button>
          </div>

          {/* Submit Button */}
          {currentQuestion === answers.length - 1 && (
            <Button
              onClick={handleSubmitRetest}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg"
            >
              Submit Retest
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Test Results Component
export const TestResultsContentArea = () => {
  const [retestOpen, setRetestOpen] = useState(false);
  const [retestScore, setRetestScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { testId } = useParams<{ testId: string }>();
  const { data: testData, testStats } = useTestStats();

  const fetchStats = async () => {
    try {
      setLoading(true);
      await testStats({
        variables: {
          testId,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate fetching test stats - Replace with actual useTestStats hook
  useEffect(() => {
    // Simulate data fetching
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load test results.</p>
        </div>
      </div>
    );
  }

  const correctAnswers =
    testData?.submitted_answers?.filter(
      (answer) => answer.answer_provided === answer.question?.correct_answer,
    ).length || 0;

  const totalQuestions = testData?.test_suite.questions?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-12">
        {/* Score Card */}
        <ScoreCard score={correctAnswers} total={totalQuestions} />

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setRetestOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Retest
          </Button>
          {retestScore !== null && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex-1 flex items-center justify-between">
              <span className="text-green-800 font-medium">
                Retest Score: {retestScore}/{totalQuestions}
              </span>
              <span className="text-sm text-green-700">
                {((retestScore / totalQuestions) * 100).toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="border-b">
            <TabsTrigger value="all">
              All Questions ({totalQuestions})
            </TabsTrigger>
            <TabsTrigger value="correct">
              Correct ({correctAnswers})
            </TabsTrigger>
            <TabsTrigger value="incorrect">
              Incorrect ({totalQuestions - correctAnswers})
            </TabsTrigger>
            <TabsTrigger value="flagged">
              Flagged (
              {testData?.submitted_answers?.filter((a) => a.is_flagged).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {testData?.test_suite.questions?.map((question) => (
              <QuestionReviewCard
                key={question.id}
                question={question}
                answer={testData?.submitted_answers?.find(
                  (ans) => ans.question_id === question.id,
                )}
              />
            ))}
          </TabsContent>

          <TabsContent value="correct" className="mt-6">
            {[...(testData?.submitted_answers || [])]
              ?.sort(
                (a, b) =>
                  (a.question?.question_number || 0) -
                  (b.question?.question_number || 0),
              )
              ?.filter(
                (answer) =>
                  answer.answer_provided === answer.question?.correct_answer,
              )
              .map((answer) => (
                <QuestionReviewCard
                  key={answer.id}
                  question={answer?.question || undefined}
                  answer={answer}
                />
              ))}
          </TabsContent>

          <TabsContent value="incorrect" className="mt-6">
            {testData?.test_suite.questions
              ?.filter(
                (question) =>
                  question.correct_answer !==
                  testData.submitted_answers?.find(
                    (sa) => sa?.question_id === question.id,
                  )?.answer_provided,
              )
              .map((question) => (
                <QuestionReviewCard
                  key={question.id}
                  question={question}
                  answer={testData?.submitted_answers?.find(
                    (ans) => ans.question_id === question.id,
                  )}
                />
              ))}
          </TabsContent>

          <TabsContent value="flagged" className="mt-6">
            {[...(testData?.submitted_answers || [])]
              ?.sort(
                (a, b) =>
                  (a.question?.question_number || 0) -
                  (b.question?.question_number || 0),
              )
              ?.filter((answer) => answer.is_flagged)
              .map((answer) => (
                <QuestionReviewCard
                  key={answer.id}
                  question={answer?.question || undefined}
                  answer={answer}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Retest Modal */}
      <RetestModal
        isOpen={retestOpen}
        // @ts-expect-error error
        testStats={testData}
        onClose={() => {
          setRetestOpen(false);
        }}
        onRetestComplete={(score) => {
          setRetestScore(score);
        }}
      />
    </div>
  );
};
