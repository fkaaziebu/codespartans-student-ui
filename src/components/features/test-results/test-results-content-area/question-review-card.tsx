import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { Question, QuestionType, SubmittedAnswer } from "@/common/graphql/generated/graphql";

export const QuestionReviewCard = ({
  question,
  answer,
}: {
  question: Question | undefined;
  answer: SubmittedAnswer | undefined;
}) => {
  const isShortAnswer =
    question?.type === QuestionType.ShortAnswer ||
    question?.type === QuestionType.FillIn;
  const isPending = isShortAnswer && answer?.is_marked === false;

  // For deterministic questions use backend is_correct; for short-answer use is_correct once marked
  const isCorrect = isPending ? null : (answer?.is_correct ?? (answer?.answer_provided === question?.correct_answer));

  const borderColor = isPending
    ? "border-yellow-400 bg-yellow-50"
    : isCorrect
      ? "border-green-500 bg-green-50"
      : "border-red-500 bg-red-50";

  return (
    <div className={`border-l-4 rounded-lg overflow-hidden shadow-md mb-6 ${borderColor}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            {isPending ? (
              <Clock size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
            ) : isCorrect ? (
              <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
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
              isPending
                ? "bg-yellow-200 text-yellow-800"
                : isCorrect
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
            }`}
          >
            {isPending ? "Marking…" : isCorrect ? "Correct" : "Incorrect"}
          </span>
        </div>

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

        {/* Short-answer: show the student's written response */}
        {isShortAnswer ? (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-2">Your answer:</p>
            <div className="p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-800 text-sm whitespace-pre-wrap">
              {answer?.answer_provided || <span className="text-gray-400 italic">No answer provided</span>}
            </div>
            {isPending && (
              <p className="text-xs text-yellow-700 mt-2">
                AI is reviewing your answer — check back shortly for the result.
              </p>
            )}
            {!isPending && !isCorrect && question?.correct_answer && (
              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-900 mb-1">Expected answer:</p>
                <div className="p-3 rounded-lg border-2 border-green-300 bg-green-50 text-gray-800 text-sm">
                  {question.correct_answer}
                </div>
              </div>
            )}
          </div>
        ) : (
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
        )}

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
