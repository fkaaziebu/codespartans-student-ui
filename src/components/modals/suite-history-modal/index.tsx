"use client";
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Play,
  TrendingUp,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TestAttempt = {
  id: string;
  score: number;
  total_questions: number;
  time_taken: number;
  completed_at: string;
  status: "completed" | "in_progress" | "abandoned";
};

type Suite = {
  id: string;
  title: string;
  description: string;
  question_count: number;
  estimated_time: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  topics: string[];
  attempts: TestAttempt[];
  best_score?: number;
  average_score?: number;
  last_attempt_date?: string;
};

interface SuiteHistoryModalProps {
  open: boolean;
  onClose: () => void;
  suite: Suite;
  onResumeTest: (suiteId: string, attemptId: string) => void;
  onStartNewTest: (suiteId: string) => void;
}

export default function SuiteHistoryModal({
  open,
  onClose,
  suite,
  onResumeTest,
  onStartNewTest,
}: SuiteHistoryModalProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { color: string; label: string } } = {
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      in_progress: { color: "bg-blue-100 text-blue-800", label: "In Progress" },
      abandoned: { color: "bg-gray-100 text-gray-800", label: "Abandoned" },
    };
    const config = statusConfig[status] || statusConfig.completed;
    return (
      <Badge className={`${config.color} hover:${config.color}`}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Calculate statistics
  const totalAttempts = suite.attempts.length;
  const completedAttempts = suite.attempts.filter(
    (a) => a.status === "completed",
  ).length;
  const averageScore = suite.average_score || 0;
  const bestScore = suite.best_score || 0;
  const averageTime =
    suite.attempts.reduce((sum, a) => sum + a.time_taken, 0) / totalAttempts;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-950">
            {suite.title} - Test History
          </DialogTitle>
        </DialogHeader>

        {/* Suite Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-900">
                Total Attempts
              </span>
            </div>
            <span className="text-2xl font-bold text-blue-600">
              {totalAttempts}
            </span>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-900">
                Best Score
              </span>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {bestScore}%
            </span>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-xs font-medium text-yellow-900">
                Avg Score
              </span>
            </div>
            <span className="text-2xl font-bold text-yellow-600">
              {averageScore}%
            </span>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-900">
                Avg Time
              </span>
            </div>
            <span className="text-lg font-bold text-purple-600">
              {formatTime(Math.round(averageTime))}
            </span>
          </div>
        </div>

        {/* Progress Chart Area - Placeholder */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
          <h4 className="text-sm font-bold text-gray-950 mb-4">
            Score Progress Over Time
          </h4>
          <div className="flex items-end justify-between h-40 gap-2">
            {suite.attempts
              .slice()
              .reverse()
              .map((attempt, index) => {
                const height = (attempt.score / 100) * 100;
                const isBest = attempt.score === bestScore;
                return (
                  <div
                    key={attempt.id}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        isBest
                          ? "bg-gradient-to-t from-green-600 to-green-400"
                          : "bg-gradient-to-t from-blue-600 to-blue-400"
                      }`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs font-medium text-gray-700">
                      {attempt.score}%
                    </span>
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Attempts List */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-950">All Attempts</h4>
            <Button
              onClick={() => onStartNewTest(suite.id)}
              className="bg-gray-800 hover:bg-gray-950 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start New Test
            </Button>
          </div>

          <div className="space-y-3">
            {suite.attempts
              .slice()
              .reverse()
              .map((attempt, index) => (
                <div
                  key={attempt.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Left - Attempt Number and Date */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-gray-700">
                        #{suite.attempts.length - index}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(attempt.status)}
                          {attempt.score === bestScore && (
                            <Badge className="bg-green-600 text-white hover:bg-green-600">
                              <Award className="w-3 h-3 mr-1" />
                              Best
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(attempt.completed_at)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle - Score */}
                    <div
                      className={`flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(attempt.score)}`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">
                          {attempt.score}
                        </span>
                        <span className="text-xs">%</span>
                      </div>
                    </div>

                    {/* Right - Details */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-gray-700">
                        <span className="font-bold">
                          {Math.round(
                            (attempt.score / 100) * attempt.total_questions,
                          )}
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          / {attempt.total_questions}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(attempt.time_taken)}</span>
                      </div>
                      {attempt.status === "in_progress" && (
                        <Button
                          onClick={() => onResumeTest(suite.id, attempt.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 mt-2"
                        >
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
