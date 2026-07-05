import { ChevronDown, ChevronUp, Flag, Lightbulb } from "lucide-react";
import { useState } from "react";
import {
  Question,
  QuestionType,
  TestModeType,
} from "@/common/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type AnswerResult = {
  isCorrect: boolean;
  correctAnswer: string;
  solutionSteps: string[];
  isPending?: boolean;
};

const getOptionStyle = (
  option: string,
  selectedAnswer: string | null,
  mode: TestModeType | null,
  answerResult: AnswerResult | null,
) => {
  // Learning mode after submission: color options by correct/wrong
  if (answerResult && mode === TestModeType.UnProctured) {
    if (option === answerResult.correctAnswer) {
      return { borderColor: "#16a34a", backgroundColor: "#f0fdf4" };
    }
    if (option === selectedAnswer && !answerResult.isCorrect) {
      return { borderColor: "#dc2626", backgroundColor: "#fef2f2" };
    }
    return { borderColor: "#e5e7eb", backgroundColor: "transparent" };
  }
  // Standard selection style
  return {
    borderColor: selectedAnswer === option ? "#9333ea" : "#e5e7eb",
    backgroundColor: selectedAnswer === option ? "#faf5ff" : "transparent",
  };
};

export const QuestionDisplay = ({
  question,
  totalQuestions,
  error,
  mode,
  answerResult,
  selectedAnswer,
  onAnswerSelect,
  onSubmitAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  isSubmitting = false,
}: {
  question: Question;
  totalQuestions: number;
  error: string | null;
  mode: TestModeType | null;
  answerResult: AnswerResult | null;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onSubmitAnswer: (isFlagged: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
}) => {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const isLearningMode = mode === TestModeType.UnProctured;
  const hasAnswered = !!answerResult;
  const hints: string[] = question.hints || [];
  const solutionSteps: string[] = question.solution_steps || [];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md pb-8">
      {error ? (
        <div className="bg-red-200 text-red-700 w-full py-2 px-8">{error}</div>
      ) : (
        <div className="pt-8" />
      )}

      {/* Progress */}
      <div className="mb-8 px-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">
            Question {question.question_number}
          </span>
          <span className="text-sm text-gray-600">
            {question.question_number} / {totalQuestions}
          </span>
        </div>
        <Progress
          value={(question.question_number / totalQuestions) * 100}
          className="h-2"
        />
      </div>

      {/* Learning mode: hints above question */}
      {isLearningMode && hints.length > 0 && (
        <div className="mx-8 mb-6 rounded-lg border border-yellow-200 bg-yellow-50 overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-yellow-800 hover:bg-yellow-100 transition-colors"
            onClick={() => setShowHints((v) => !v)}
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Hints ({hints.length})
            </span>
            {showHints ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showHints && (
            <ol className="px-4 pb-4 space-y-2">
              {hints.map((hint, i) => (
                <li key={i} className="flex gap-2 text-sm text-yellow-900">
                  <span className="font-semibold flex-shrink-0">{i + 1}.</span>
                  <span>{hint}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* Question text */}
      <div className="mb-8 px-8">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {question.description}
        </p>

        {/* Options, fill-in input, or short-answer textarea */}
        {question.type === QuestionType.FillIn ? (
          <div className="mb-8">
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-4 text-gray-900 text-base focus:outline-none focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Type your answer here..."
              value={selectedAnswer || ""}
              onChange={(e) => onAnswerSelect(e.target.value)}
              disabled={hasAnswered}
            />
            {!hasAnswered && (
              <p className="text-xs text-gray-400 mt-1">
                Your answer will be reviewed by AI — results may take a moment
                to appear.
              </p>
            )}
          </div>
        ) : question.type === QuestionType.ShortAnswer ? (
          <div className="mb-8">
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-4 text-gray-900 text-base focus:outline-none focus:border-purple-500 resize-none disabled:bg-gray-50 disabled:text-gray-500"
              rows={6}
              placeholder="Write your answer here..."
              value={selectedAnswer || ""}
              onChange={(e) => onAnswerSelect(e.target.value)}
              disabled={hasAnswered}
            />
            {!hasAnswered && (
              <p className="text-xs text-gray-400 mt-1">
                Your answer will be reviewed by AI — results may take a moment
                to appear.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {question?.options?.map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 border-2 rounded-lg transition-all ${
                  hasAnswered
                    ? "cursor-default"
                    : "cursor-pointer hover:border-purple-300"
                }`}
                style={getOptionStyle(
                  option,
                  selectedAnswer,
                  mode,
                  answerResult,
                )}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => onAnswerSelect(option)}
                  disabled={hasAnswered}
                  className="w-5 h-5 text-purple-600 cursor-pointer disabled:cursor-default"
                />
                <span className="ml-4 text-gray-900 font-medium">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Learning mode: answer feedback panel */}
      {isLearningMode &&
        answerResult &&
        (answerResult.isPending ? (
          <div className="mx-8 mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="font-semibold text-base mb-1 text-yellow-800">
              ⏳ Answer submitted — AI marking in progress
            </p>
            <p className="text-sm text-yellow-700">
              This is a short-answer question. Your result will be available
              once marking is complete.
            </p>
          </div>
        ) : (
          <div
            className={`mx-8 mb-6 rounded-lg border p-4 ${
              answerResult.isCorrect
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }`}
          >
            <p
              className={`font-semibold text-base mb-1 ${
                answerResult.isCorrect ? "text-green-800" : "text-red-800"
              }`}
            >
              {answerResult.isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            {!answerResult.isCorrect && (
              <p className="text-sm text-red-700 mb-3">
                Correct answer:{" "}
                <span className="font-semibold">
                  {answerResult.correctAnswer}
                </span>
              </p>
            )}

            {/* Solution steps */}
            {solutionSteps.length > 0 && (
              <div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 mb-2"
                  onClick={() => setShowSolution((v) => !v)}
                >
                  {showSolution ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                  {showSolution ? "Hide" : "Show"} solution
                </button>
                {showSolution && (
                  <ol className="space-y-1">
                    {solutionSteps.map((step, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="font-semibold flex-shrink-0">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}
          </div>
        ))}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 px-8">
        {/* Submit — hidden in learning mode once feedback is shown */}
        {!hasAnswered && (
          <Button
            onClick={() => onSubmitAnswer(false)}
            disabled={!selectedAnswer || isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Submitting…" : "Submit Answer"}
          </Button>
        )}

        <Button
          onClick={onNext}
          disabled={isLast}
          variant={hasAnswered ? "default" : "outline"}
          className={
            hasAnswered
              ? "font-semibold py-3 px-6 rounded-lg"
              : "border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-lg disabled:opacity-50"
          }
        >
          {hasAnswered ? "Next Question →" : "Next Question"}
        </Button>

        <Button
          onClick={onPrevious}
          disabled={isFirst}
          variant="outline"
          className="border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg disabled:opacity-50"
        >
          Previous
        </Button>

        {/* Flag button — proctored mode only */}
        {!isLearningMode && (
          <Button
            size="icon"
            onClick={() => onSubmitAnswer(true)}
            className="ml-auto bg-red-700 hover:bg-red-800 text-red-100"
            title="Flag for review"
          >
            <Flag className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
