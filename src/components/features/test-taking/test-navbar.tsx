import { Clock, Eye, ShieldCheck } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { TestModeType } from "@/common/graphql/generated/graphql";
import { SSEStreamEvent, useSSEStream } from "@/common/hooks/use-sse-stream";

interface TestNavbarProps {
  testName: string;
  testId: string;
  studentId: string;
  mode?: TestModeType | null;
  onTestEnd?: () => void;
  onTestPaused?: () => void;
  onTestResumed?: () => void;
  handlePauseTest?: (isPaused: boolean) => void;
}

const TestNavbar: React.FC<TestNavbarProps> = ({
  testName,
  testId,
  studentId,
  mode,
  onTestEnd,
  onTestPaused,
  onTestResumed,
  handlePauseTest,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const isLearningMode = mode === TestModeType.UnProctured;

  const streamUrl = `/api/stream/${testId}/${studentId}`;

  const handleSSEEvent = useCallback((event: SSEStreamEvent) => {
    switch (event.type) {
      case "time_update":
        setTimeRemaining(event.remainingSeconds || 0);
        setIsPaused(false);
        handlePauseTest?.(false);
        setIsEnded(false);
        break;
      case "test_paused":
        setTimeRemaining(event.remainingSeconds || 0);
        setIsPaused(true);
        handlePauseTest?.(true);
        onTestPaused?.();
        break;
      case "test_resumed":
        setTimeRemaining(event.remainingSeconds || 0);
        setIsPaused(false);
        handlePauseTest?.(false);
        onTestResumed?.();
        break;
      case "test_ended":
        setTimeRemaining(0);
        setIsEnded(true);
        setIsPaused(false);
        handlePauseTest?.(false);
        onTestEnd?.();
        break;
    }
  }, []);

  const handleSSEConnect = useCallback(() => {
    setIsConnected(true);
    setReconnectAttempts(0);
  }, []);

  const handleSSEDisconnect = useCallback(() => {
    setIsConnected(false);
  }, []);

  const { error, reconnectAttempts: attempts } = useSSEStream(streamUrl, {
    onEvent: handleSSEEvent,
    onConnect: handleSSEConnect,
    onDisconnect: handleSSEDisconnect,
    reconnectDelay: 3000,
  });

  useEffect(() => {
    setReconnectAttempts(attempts);
  }, [attempts]);

  const formatTime = (value: number): string =>
    String(value).padStart(2, "0");

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const getTimerColor = (): string => {
    if (isEnded) return "bg-blue-50 border border-blue-200";
    if (isPaused) return "bg-yellow-50 border border-yellow-200";
    // Learning mode: always calm green
    if (isLearningMode) return "bg-gray-50 border border-gray-200";
    if (timeRemaining < 300) return "bg-red-50 border border-red-200";
    return "bg-green-50 border border-green-200";
  };

  const getIconColor = (): string => {
    if (isEnded) return "text-blue-600";
    if (isPaused) return "text-yellow-600";
    if (isLearningMode) return "text-gray-500";
    if (timeRemaining < 300) return "text-red-600";
    return "text-green-600";
  };

  const getTextColor = (): string => {
    if (isEnded) return "text-blue-600";
    if (isPaused) return "text-yellow-600";
    if (isLearningMode) return "text-gray-600";
    if (timeRemaining < 300) return "text-red-600";
    return "text-green-600";
  };

  const getTimerText = (): string => {
    if (isEnded) return "ENDED";
    if (isPaused) return "PAUSED";
    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  };

  const getStatusText = (): string => {
    if (error) return "Error";
    if (!isConnected) return "Connecting...";
    if (reconnectAttempts > 0) return `Reconnecting (${reconnectAttempts})`;
    return "Connected";
  };

  const getStatusColor = (): string => {
    if (error) return "bg-red-400";
    if (!isConnected) return "bg-gray-400 animate-pulse";
    if (reconnectAttempts > 0) return "bg-orange-400 animate-pulse";
    return "bg-green-400";
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

        {/* Connection status */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
          <span className="text-xs font-medium text-gray-600 whitespace-nowrap hidden sm:block">
            {getStatusText()}
          </span>
        </div>

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

      {/* Error banner */}
      {error && (
        <div className="px-6 py-2 bg-red-50 border-t border-red-200 text-red-700 text-sm">
          Connection error: {error.message}
        </div>
      )}

      {/* Low-time warning — proctored only */}
      {!isLearningMode &&
        !isPaused &&
        !isEnded &&
        timeRemaining < 300 &&
        timeRemaining > 0 && (
          <div className="px-6 py-2 bg-red-50 border-t border-red-200 text-red-700 text-sm font-semibold animate-pulse">
            ⚠️ Less than 5 minutes remaining. Complete your test soon.
          </div>
        )}
    </div>
  );
};

export default TestNavbar;
