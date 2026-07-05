"use client";
import {
  Award,
  CheckCircle,
  Eye,
  Play,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TestModeType, TestStatusType } from "@/common/graphql/generated/graphql";

type SubmittedAnswer = {
  id: string;
  answer_provided: string;
  is_flagged: boolean;
  question?: { id: string; correct_answer: string } | null;
};

type TestAttempt = {
  id: string;
  status: TestStatusType;
  mode: TestModeType;
  submitted_answers?: SubmittedAnswer[] | null;
  score: number;
  total_questions: number;
};

type Suite = {
  id: string;
  title: string;
  description: string;
  question_count: number;
  estimated_time: number;
  difficulty: string;
  topics: string[];
  attempts: TestAttempt[];
  best_score: number;
  average_score: number;
};

interface SuiteHistoryModalProps {
  open: boolean;
  onClose: () => void;
  suite: Suite;
  onResumeTest: (suiteId: string, attemptId: string) => void;
  onStartNewTest: (suiteId: string, mode: TestModeType) => void;
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

  const getStatusBadge = (status: TestStatusType) => {
    const config: Record<string, { color: string; label: string }> = {
      [TestStatusType.Ended]: { color: "bg-green-100 text-green-800", label: "Completed" },
      [TestStatusType.OnGoing]: { color: "bg-blue-100 text-blue-800", label: "In Progress" },
      [TestStatusType.Paused]: { color: "bg-yellow-100 text-yellow-800", label: "Paused" },
    };
    const c = config[status] ?? config[TestStatusType.Ended];
    return (
      <Badge className={`${c.color} hover:${c.color}`}>{c.label}</Badge>
    );
  };

  const getModeBadge = (mode: TestModeType) => {
    if (mode === TestModeType.Proctured) {
      return (
        <span className="flex items-center gap-1 text-xs text-gray-600">
          <ShieldCheck className="w-3 h-3" /> Proctored
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-xs text-gray-600">
        <Eye className="w-3 h-3" /> Learning
      </span>
    );
  };

  const totalAttempts = suite.attempts.length;
  const completedAttempts = suite.attempts.filter(
    (a) => a.status === TestStatusType.Ended,
  ).length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-950">
            {suite.title} — History
          </DialogTitle>
        </DialogHeader>

        {/* Summary stats */}
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
              {suite.best_score}%
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
              {suite.average_score}%
            </span>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-900">
                Completed
              </span>
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {completedAttempts}
            </span>
          </div>
        </div>

        {/* Score progress chart */}
        {totalAttempts > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
            <h4 className="text-sm font-bold text-gray-950 mb-4">
              Score Progress
            </h4>
            <div className="flex items-end justify-start h-40 gap-2">
              {[...suite.attempts].reverse().map((attempt, index) => {
                const height = Math.max((attempt.score / 100) * 100, 4);
                const isBest = attempt.score === suite.best_score && suite.best_score > 0;
                return (
                  <div
                    key={attempt.id}
                    className="flex flex-col items-center gap-2 h-full min-w-[36px]"
                  >
                    <div
                      className={`flex items-end justify-center pb-1 text-white text-xs font-bold w-full rounded-t-lg transition-all mt-auto ${
                        isBest
                          ? "bg-gradient-to-t from-green-600 to-green-400"
                          : "bg-gradient-to-t from-blue-600 to-blue-400"
                      }`}
                      style={{ height: `${height}%` }}
                    >
                      {attempt.score}%
                    </div>
                    <span className="text-xs text-gray-500">
                      #{index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Attempts list */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-950">All Attempts</h4>
            {/* Start new test dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gray-800 hover:bg-gray-950 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Start New Test
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="text-xs text-gray-500 uppercase tracking-wide">
                  Choose mode
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-start gap-3 py-3 cursor-pointer"
                  onClick={() => onStartNewTest(suite.id, TestModeType.Proctured)}
                >
                  <ShieldCheck className="w-4 h-4 mt-0.5 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">Proctored</p>
                    <p className="text-xs text-gray-500">Timed &amp; strictly monitored</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-start gap-3 py-3 cursor-pointer"
                  onClick={() => onStartNewTest(suite.id, TestModeType.UnProctured)}
                >
                  <Eye className="w-4 h-4 mt-0.5 text-gray-700 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">Learning</p>
                    <p className="text-xs text-gray-500">Self-paced with hints</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-3">
            {[...suite.attempts].reverse().map((attempt, index) => {
              const isBest =
                attempt.score === suite.best_score && suite.best_score > 0;
              const answeredCount = attempt.submitted_answers?.length ?? 0;
              const isOngoing = attempt.status === TestStatusType.OnGoing;
              const isPaused = attempt.status === TestStatusType.Paused;

              return (
                <div
                  key={attempt.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Number + status */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-gray-700 flex-shrink-0">
                        #{suite.attempts.length - index}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(attempt.status)}
                          {isBest && (
                            <Badge className="bg-green-600 text-white hover:bg-green-600">
                              <Award className="w-3 h-3 mr-1" />
                              Best
                            </Badge>
                          )}
                        </div>
                        {getModeBadge(attempt.mode)}
                      </div>
                    </div>

                    {/* Score circle */}
                    <div
                      className={`flex items-center justify-center w-20 h-20 rounded-full flex-shrink-0 ${getScoreColor(attempt.score)}`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">{attempt.score}</span>
                        <span className="text-xs">%</span>
                      </div>
                    </div>

                    {/* Details + resume */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-gray-700">
                        <span className="font-bold">{answeredCount}</span>
                        <span className="text-gray-500">
                          {" "}/ {attempt.total_questions} answered
                        </span>
                      </div>
                      {(isOngoing || isPaused) && (
                        <Button
                          onClick={() => onResumeTest(suite.id, attempt.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 mt-1"
                        >
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
