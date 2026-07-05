"use client";
import {
  BookOpen,
  ChevronDown,
  Clock,
  Eye,
  History,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SuiteDifficultyType,
  SuiteType,
  Test,
  TestModeType,
} from "@/common/graphql/generated/graphql";

interface SuiteForCard {
  id: string;
  title?: string | null;
  description?: string | null;
  difficulty: SuiteDifficultyType;
  suite_type?: SuiteType | null;
  keywords?: string[] | null;
  questions?: { id: string }[] | null;
  attempts?: Test[] | null;
  estimated_time?: number | null;
  topics?: string[] | null;
}

interface SuiteCardProps {
  suite: SuiteForCard;
  onStartTest: (suiteId: string, mode: TestModeType) => void;
  onViewHistory: (suite: SuiteForCard) => void;
}

export default function SuiteCard({
  suite,
  onStartTest,
  onViewHistory,
}: SuiteCardProps) {
  const getSuiteTypeBadge = (type: SuiteType | null | undefined) => {
    if (!type) return null;
    const styles: Record<SuiteType, string> = {
      [SuiteType.Year]:          "bg-blue-100 text-blue-800",
      [SuiteType.YearOne]:       "bg-blue-100 text-blue-800",
      [SuiteType.YearTwo]:       "bg-indigo-100 text-indigo-800",
      [SuiteType.YearThree]:     "bg-purple-100 text-purple-800",
      [SuiteType.Mixed]:         "bg-amber-100 text-amber-800",
      [SuiteType.PastQuestions]: "bg-red-100 text-red-800",
      [SuiteType.Class]:         "bg-purple-100 text-purple-800",
      [SuiteType.Topic]:         "bg-amber-100 text-amber-800",
    };
    const labels: Record<SuiteType, string> = {
      [SuiteType.Year]:          "Year",
      [SuiteType.YearOne]:       "Year 1",
      [SuiteType.YearTwo]:       "Year 2",
      [SuiteType.YearThree]:     "Year 3",
      [SuiteType.Mixed]:         "Mixed",
      [SuiteType.PastQuestions]: "Past Questions",
      [SuiteType.Class]:         "Class",
      [SuiteType.Topic]:         "Topic",
    };
    return (
      <Badge
        className={`${styles[type]} hover:${styles[type]} text-xs font-medium`}
      >
        {labels[type]}
      </Badge>
    );
  };

  const getDifficultyBadge = (difficulty: SuiteDifficultyType) => {
    const colors: Record<string, string> = {
      [SuiteDifficultyType.Beginner]: "bg-green-100 text-green-800",
      [SuiteDifficultyType.Intermediate]: "bg-yellow-100 text-yellow-800",
      [SuiteDifficultyType.Advanced]: "bg-red-100 text-red-800",
    };
    return (
      <Badge
        className={`${colors[difficulty] ?? "bg-purple-100 text-purple-800"} hover:${colors[difficulty] ?? "bg-purple-100 text-purple-800"}`}
      >
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

  // Compute scores from submitted_answers
  const computeScore = (attempt: Test): number => {
    const answers = attempt.submitted_answers;
    if (!answers || answers.length === 0) return 0;
    const correct = answers.filter(
      (sa) => sa.answer_provided === sa.question?.correct_answer,
    ).length;
    return Math.round((correct / answers.length) * 100);
  };

  const scores = hasAttempts ? (suite.attempts ?? []).map((a) => computeScore(a)) : [];
  const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
      : 0;

  const questionCount: number = suite.questions?.length ?? 0;
  const estimatedTime: number = suite.estimated_time ?? questionCount * 2;
  const topics: string[] = suite.topics ?? suite.keywords ?? [];

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-gray-950 flex-1">
            {suite.title}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {getSuiteTypeBadge(suite.suite_type)}
            {getDifficultyBadge(suite.difficulty)}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{suite.description}</p>

        {/* Topics */}
        {topics.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
            {topics.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{topics.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="p-6 flex flex-col space-y-4 flex-1">
        {/* Basic Info */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{questionCount} Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>~{estimatedTime} mins</span>
          </div>
        </div>

        {/* Performance Stats */}
        {hasAttempts ? (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">
                Best Score
              </span>
              <span className={`text-lg font-bold ${getScoreColor(bestScore)}`}>
                {bestScore}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">
                Average Score
              </span>
              <span
                className={`text-base font-bold ${getScoreColor(averageScore)}`}
              >
                {averageScore}%
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                {(suite.attempts ?? []).length} attempt
                {(suite.attempts ?? []).length !== 1 ? "s" : ""}
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

        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          {/* Mode dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex-1 bg-gray-800 hover:bg-gray-950 flex items-center gap-2">
                Start Test
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuLabel className="text-xs text-gray-500 uppercase tracking-wide">
                Choose mode
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-start gap-3 py-3 cursor-pointer"
                onClick={() => onStartTest(suite.id, TestModeType.Proctured)}
              >
                <ShieldCheck className="w-4 h-4 mt-0.5 text-gray-700 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-gray-900">Proctored</p>
                  <p className="text-xs text-gray-500">
                    Timed &amp; strictly monitored
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-start gap-3 py-3 cursor-pointer"
                onClick={() => onStartTest(suite.id, TestModeType.UnProctured)}
              >
                <Eye className="w-4 h-4 mt-0.5 text-gray-700 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-gray-900">Learning</p>
                  <p className="text-xs text-gray-500">Self-paced with hints</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
