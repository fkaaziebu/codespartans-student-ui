import { Flag } from "lucide-react";
import { Question } from "@/common/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const QuestionDisplay = ({
  question,
  totalQuestions,
  error,
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
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onSubmitAnswer: (isFlagged: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md pb-8">
      {error ? (
        <div className="bg-red-200 text-red-700 w-full py-2 px-8">{error}</div>
      ) : (
        <div className="pt-8" />
      )}
      {/* Progress Bar */}
      <div className="mb-8 px-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">
            Question {question.question_number}
          </span>
          <span className="text-sm text-gray-600">Progress</span>
        </div>
        <Progress
          value={(question.question_number / totalQuestions) * 100}
          className="h-2"
        />
      </div>

      {/* Question Content */}
      <div className="mb-8 px-8">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {question.description}
        </p>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question?.options?.map((option) => (
            <label
              key={option}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-300"
              style={{
                borderColor: selectedAnswer === option ? "#9333ea" : "#e5e7eb",
                backgroundColor:
                  selectedAnswer === option ? "#faf5ff" : "transparent",
              }}
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onAnswerSelect(option)}
                className="w-5 h-5 text-purple-600 cursor-pointer"
              />
              <span className="ml-4 text-gray-900 font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pb-8 px-8">
        <Button
          onClick={() => onSubmitAnswer(false)}
          disabled={!selectedAnswer || isSubmitting}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50"
        >
          Submit Answer
        </Button>

        <Button
          onClick={onNext}
          disabled={isLast}
          variant="outline"
          className="border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-lg disabled:opacity-50"
        >
          Next Question
        </Button>

        <Button
          onClick={onPrevious}
          disabled={isFirst}
          variant="outline"
          className="border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg disabled:opacity-50"
        >
          Previous Question
        </Button>
        <Button
          size={"icon"}
          onClick={() => onSubmitAnswer(true)}
          className="ml-auto bg-red-700 hover:bg-red-800 text-red-100 font-semibold py-3 px-6 rounded-lg cursor-pointer"
        >
          <Flag />
        </Button>
      </div>
    </div>
  );
};
