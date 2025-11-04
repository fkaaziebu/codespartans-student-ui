"use client";
import { Check, HelpCircle, Lightbulb } from "lucide-react";
import {
  QuestionDifficultyType,
  QuestionTagType,
  QuestionType,
} from "@/common/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

interface QuestionDisplayProps {
  question: Question;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
  showHints: boolean;
  onToggleHints: () => void;
  hintsUsed: number;
}

export default function QuestionDisplay({
  question,
  selectedAnswer,
  onAnswerSelect,
  showHints,
  onToggleHints,
  hintsUsed,
}: QuestionDisplayProps) {
  return (
    <div className="flex flex-col space-y-6">
      {/* Question Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-950 mb-2">
              {question.description}
            </h2>
            <p className="text-sm text-gray-600">
              Select the best answer from the options below.
            </p>
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-950 mb-4">Answer Options</h3>
        <div className="flex flex-col space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const letter = String.fromCharCode(65 + index);

            return (
              <button
                key={`${option}-${index}`}
                onClick={() => onAnswerSelect(option)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left",
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm flex-shrink-0",
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700",
                  )}
                >
                  {letter}
                </div>
                <span
                  className={cn(
                    "flex-1 text-base",
                    isSelected ? "text-gray-950 font-medium" : "text-gray-700",
                  )}
                >
                  {option}
                </span>
                {isSelected && (
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hints Section */}
      {question.hints && question.hints.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-bold text-gray-950">
                Hints Available
              </h3>
              <span className="text-sm text-gray-600">
                ({question.hints.length})
              </span>
            </div>
            <Button
              variant="outline"
              onClick={onToggleHints}
              className="flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              {showHints ? "Hide Hints" : "Show Hints"}
            </Button>
          </div>

          {showHints && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
              {question.hints.map((hint, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-sm text-yellow-900"
                >
                  <span className="font-bold flex-shrink-0">{index + 1}.</span>
                  <span>{hint}</span>
                </div>
              ))}
            </div>
          )}

          {!showHints && (
            <p className="text-sm text-gray-600">
              Click "Show Hints" to reveal helpful tips for answering this
              question. Note: Using hints may affect your score.
            </p>
          )}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-bold">Tip:</span> Take your time to read the
          question carefully. You can flag this question to review it later
          before submitting your test.
        </p>
      </div>
    </div>
  );
}
