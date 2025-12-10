import { Flag } from "lucide-react";
import { Question } from "@/common/graphql/generated/graphql";

export const QuestionList = ({
  questions,
  currentQuestion,
  answeredQuestions,
  flaggedQuestions,
  onSelectQuestion,
}: {
  questions: Question[] | undefined | null;
  currentQuestion: Question;
  answeredQuestions: Set<string>;
  flaggedQuestions: Set<string>;
  onSelectQuestion: (question: Question) => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit max-h-[calc(100vh-200px)] overflow-y-auto sticky top-24">
      <h3 className="font-bold text-gray-900 mb-4">Questions</h3>

      <div className="grid grid-cols-4 gap-2">
        {questions?.map((question) => (
          <button
            type="button"
            key={question.id}
            onClick={() => onSelectQuestion(question)}
            className={`relative w-full aspect-square rounded-lg font-semibold text-sm transition-all ${
              currentQuestion?.id === question.id
                ? "bg-purple-600 text-white ring-2 ring-purple-400"
                : answeredQuestions.has(question.id)
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            {question.question_number}{" "}
            {flaggedQuestions.has(question.id) && (
              <Flag className="h-4 w-4 absolute top-2 right-2 text-red-800" />
            )}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-600"></div>
          <span className="text-xs text-gray-600">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-800"></div>
          <span className="text-xs text-gray-600">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></div>
          <span className="text-xs text-gray-600">Not answered</span>
        </div>
      </div>
    </div>
  );
};
