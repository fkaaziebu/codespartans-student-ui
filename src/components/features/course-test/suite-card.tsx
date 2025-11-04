"use client";
import { BookOpen, Clock, History, Play, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SuiteDifficultyType,
  TestSuite,
} from "@/common/graphql/generated/graphql";

interface SuiteCardProps {
  suite: TestSuite;
  onStartTest: (suiteId: string) => void;
  onViewHistory: (suite: TestSuite) => void;
}

export default function SuiteCard({
  suite,
  onStartTest,
  onViewHistory,
}: SuiteCardProps) {
  const getDifficultyBadge = (difficulty: SuiteDifficultyType) => {
    const colors: { [key: string]: string } = {
      [`${SuiteDifficultyType.Beginner}`]: "bg-green-100 text-green-800",
      [`${SuiteDifficultyType.Intermediate}`]: "bg-yellow-100 text-yellow-800",
      [`${SuiteDifficultyType.Advanced}`]: "bg-red-100 text-red-800",
      Expert: "bg-purple-100 text-purple-800",
    };
    return (
      <Badge className={`${colors[difficulty]} hover:${colors[difficulty]}`}>
        {difficulty}
      </Badge>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const hasAttempts = suite.attempts && suite.attempts.length > 0;
  const formattedLastAttempt = suite.last_attempt_date
    ? new Date(suite.last_attempt_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-gray-950 flex-1">
            {suite.title}
          </h3>
          {getDifficultyBadge(suite.difficulty)}
        </div>
        <p className="text-sm text-gray-600 mb-4">{suite.description}</p>

        {/* Topics */}
        <div className="flex items-center gap-2 flex-wrap">
          {suite.topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
          {suite.topics.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{suite.topics.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 flex flex-col space-y-4 flex-1">
        {/* Basic Info */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{suite.question_count} Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{suite.estimated_time} mins</span>
          </div>
        </div>

        {/* Performance Stats */}
        {hasAttempts ? (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">
                Best Score
              </span>
              <span
                className={`text-lg font-bold ${getScoreColor(suite.best_score || 0)}`}
              >
                {suite.best_score}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">
                Average Score
              </span>
              <span
                className={`text-base font-bold ${getScoreColor(suite.average_score || 0)}`}
              >
                {suite.average_score}%
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                {suite.attempts.length} attempt
                {suite.attempts.length !== 1 ? "s" : ""}
              </span>
              <span className="text-xs text-gray-500">
                Last: {formattedLastAttempt}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">
                Not attempted yet
              </p>
              <p className="text-xs text-blue-700">
                Start your first test to see your progress
              </p>
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={() => onStartTest(suite.id)}
            className="flex-1 bg-gray-800 hover:bg-gray-950 flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Start Test
          </Button>
          {hasAttempts && (
            <Button
              onClick={() => onViewHistory(suite)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              History
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
