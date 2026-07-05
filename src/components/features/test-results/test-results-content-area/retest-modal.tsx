import { useEffect, useRef, useState } from "react";
import { Test } from "@/common/graphql/generated/graphql";
import { Button } from "@/components/ui/button";

export const RetestModal = ({
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
  const [retestAnswers, setRetestAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const prevOpen = useRef(false);

  useEffect(() => {
    if (isOpen && !prevOpen.current) {
      setCurrentQuestion(0);
      setRetestAnswers({});
      setShowResults(false);
    }
    prevOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen || !testStats) return null;

  const answers = testStats.submitted_answers || [];
  const currentAnswer = answers[currentQuestion];

  const handleAnswerSelect = (option: string) => {
    setRetestAnswers((prev) => ({ ...prev, [currentQuestion]: option }));
  };

  const handleSubmitRetest = () => {
    const score = answers.filter(
      (answer, index) =>
        retestAnswers[index] === answer.question?.correct_answer,
    ).length;
    onRetestComplete(score);
    setShowResults(true);
  };

  if (showResults) {
    const score = answers.filter(
      (answer, index) =>
        retestAnswers[index] === answer.question?.correct_answer,
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
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Retest — Question {currentQuestion + 1}/{answers.length}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {currentAnswer.question?.description}
          </h3>

          <div className="space-y-3 mb-6">
            {currentAnswer.question?.options?.map((option) => (
              <label
                key={option}
                className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-300"
                style={{
                  borderColor:
                    retestAnswers[currentQuestion] === option
                      ? "#9333ea"
                      : "#e5e7eb",
                  backgroundColor:
                    retestAnswers[currentQuestion] === option
                      ? "#faf5ff"
                      : "transparent",
                }}
              >
                <input
                  type="radio"
                  name="retest-answer"
                  value={option}
                  checked={retestAnswers[currentQuestion] === option}
                  onChange={() => handleAnswerSelect(option)}
                  className="w-5 h-5 text-purple-600"
                />
                <span className="ml-4 text-gray-900 font-medium">{option}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3 mb-6">
            <Button
              onClick={() => setCurrentQuestion((q) => q - 1)}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex-1"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentQuestion((q) => q + 1)}
              disabled={currentQuestion === answers.length - 1}
              variant="outline"
              className="flex-1"
            >
              Next
            </Button>
          </div>

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
