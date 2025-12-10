import { Clock } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { SSEStreamEvent, useSSEStream } from "@/common/hooks/use-sse-stream";

interface TestNavbarProps {
  testName: string;
  testId: string;
  studentId: string;
  onTestEnd?: () => void;
  onTestPaused?: () => void;
  onTestResumed?: () => void;
  handlePauseTest?: (isPaused: boolean) => void;
}

/**
 * TestNavbar component with integrated SSE timer
 * Displays real-time countdown with automatic updates from server
 * Handles pause/resume/end events
 */
const TestNavbar: React.FC<TestNavbarProps> = ({
  testName,
  testId,
  studentId,
  onTestEnd,
  onTestPaused,
  onTestResumed,
  handlePauseTest,
}) => {
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const streamUrl = `${process.env.SSE_URL}/tests/${testId}/${studentId}/stream`;

  /**
   * Handle incoming SSE events
   */
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

  /**
   * Handle SSE connection events
   */
  const handleSSEConnect = useCallback(() => {
    setIsConnected(true);
    setReconnectAttempts(0);
  }, []);

  const handleSSEDisconnect = useCallback(() => {
    setIsConnected(false);
  }, []);

  /**
   * Use SSE stream hook
   */
  const { error, reconnectAttempts: attempts } = useSSEStream(streamUrl, {
    onEvent: handleSSEEvent,
    onConnect: handleSSEConnect,
    onDisconnect: handleSSEDisconnect,
    reconnectDelay: 3000,
  });

  useEffect(() => {
    setReconnectAttempts(attempts);
  }, [attempts]);

  /**
   * Format time values with leading zeros
   */
  const formatTime = (value: number): string => {
    return String(value).padStart(2, "0");
  };

  /**
   * Calculate hours, minutes, seconds from remaining time
   */
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  /**
   * Determine timer color based on state
   */
  const getTimerColor = (): string => {
    if (isEnded) return "bg-blue-50 border border-blue-200";
    if (isPaused) return "bg-yellow-50 border border-yellow-200";
    if (timeRemaining < 300) return "bg-red-50 border border-red-200";
    return "bg-green-50 border border-green-200";
  };

  /**
   * Determine icon color based on state
   */
  const getIconColor = (): string => {
    if (isEnded) return "text-blue-600";
    if (isPaused) return "text-yellow-600";
    if (timeRemaining < 300) return "text-red-600";
    return "text-green-600";
  };

  /**
   * Determine text color based on state
   */
  const getTextColor = (): string => {
    if (isEnded) return "text-blue-600";
    if (isPaused) return "text-yellow-600";
    if (timeRemaining < 300) return "text-red-600";
    return "text-green-600";
  };

  /**
   * Get timer display text
   */
  const getTimerText = (): string => {
    if (isEnded) return "ENDED";
    if (isPaused) return "PAUSED";
    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  };

  /**
   * Get status indicator text
   */
  const getStatusText = (): string => {
    if (error) return "Error";
    if (!isConnected) return "Connecting...";
    if (reconnectAttempts > 0) return `Reconnecting (${reconnectAttempts})`;
    return "Connected";
  };

  /**
   * Get status indicator color
   */
  const getStatusColor = (): string => {
    if (error) return "bg-red-400";
    if (!isConnected) return "bg-gray-400 animate-pulse";
    if (reconnectAttempts > 0) return "bg-orange-400 animate-pulse";
    return "bg-green-400";
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-40">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Test Name */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{testName}</h1>
        </div>

        {/* Middle Spacer */}
        <div className="flex-1" />

        {/* Connection Status Indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
          <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
            {getStatusText()}
          </span>
        </div>

        {/* Timer Display */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${getTimerColor()}`}
        >
          <Clock size={20} className={`${getIconColor()} transition-colors`} />
          <span
            className={`font-bold text-lg font-mono transition-colors ${getTextColor()}`}
          >
            {getTimerText()}
          </span>
        </div>
      </div>

      {/* Error Message (if any) */}
      {error && (
        <div className="px-6 py-2 bg-red-50 border-t border-red-200 text-red-700 text-sm">
          Connection error: {error.message}
        </div>
      )}

      {/* Warning Message (if time < 5 minutes) */}
      {!isPaused && !isEnded && timeRemaining < 300 && timeRemaining > 0 && (
        <div className="px-6 py-2 bg-red-50 border-t border-red-200 text-red-700 text-sm font-semibold animate-pulse">
          ⚠️ Time is running out! Complete your test soon.
        </div>
      )}
    </div>
  );
};

export default TestNavbar;
