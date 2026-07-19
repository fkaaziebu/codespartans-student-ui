import { Clock, Eye, ShieldCheck } from "lucide-react";
import React from "react";
import { TestModeType } from "@/common/graphql/generated/graphql";
import { formatCountdown } from "@/common/helpers";

interface TestNavbarProps {
  testName: string;
  remainingMs: number;
  isPaused: boolean;
  mode?: TestModeType | null;
}

const LOW_TIME_THRESHOLD_MS = 300_000;

const TestNavbar: React.FC<TestNavbarProps> = ({
  testName,
  remainingMs,
  isPaused,
  mode,
}) => {
  const isLearningMode = mode === TestModeType.UnProctured;
  const { display } = formatCountdown(remainingMs);

  const getTimerColor = (): string => {
    if (isPaused) return "bg-yellow-50 border border-yellow-200";
    // Learning mode: always calm green
    if (isLearningMode) return "bg-gray-50 border border-gray-200";
    if (remainingMs < LOW_TIME_THRESHOLD_MS) return "bg-red-50 border border-red-200";
    return "bg-green-50 border border-green-200";
  };

  const getIconColor = (): string => {
    if (isPaused) return "text-yellow-600";
    if (isLearningMode) return "text-gray-500";
    if (remainingMs < LOW_TIME_THRESHOLD_MS) return "text-red-600";
    return "text-green-600";
  };

  const getTextColor = (): string => {
    if (isPaused) return "text-yellow-600";
    if (isLearningMode) return "text-gray-600";
    if (remainingMs < LOW_TIME_THRESHOLD_MS) return "text-red-600";
    return "text-green-600";
  };

  const getTimerText = (): string => {
    if (isPaused) return "PAUSED";
    return display;
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-40">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Test name + mode badge */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {testName}
          </h1>
          {mode && (
            <span
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                isLearningMode
                  ? "bg-blue-100 text-blue-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {isLearningMode ? (
                <Eye className="w-3 h-3" />
              ) : (
                <ShieldCheck className="w-3 h-3" />
              )}
              {isLearningMode ? "Learning" : "Proctored"}
            </span>
          )}
        </div>

        <div className="flex-1" />

        {/* Timer */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${getTimerColor()}`}
        >
          <Clock size={20} className={`${getIconColor()} transition-colors`} />
          <div className="flex flex-col leading-none">
            {isLearningMode && (
              <span className="text-xs text-gray-400">Time</span>
            )}
            <span
              className={`font-bold text-lg font-mono transition-colors ${getTextColor()}`}
            >
              {getTimerText()}
            </span>
          </div>
        </div>
      </div>

      {/* Low-time warning — proctored only */}
      {!isLearningMode &&
        !isPaused &&
        remainingMs > 0 &&
        remainingMs < LOW_TIME_THRESHOLD_MS && (
          <div className="px-6 py-2 bg-red-50 border-t border-red-200 text-red-700 text-sm font-semibold animate-pulse">
            ⚠️ Less than 5 minutes remaining. Complete your test soon.
          </div>
        )}
    </div>
  );
};

export default TestNavbar;
