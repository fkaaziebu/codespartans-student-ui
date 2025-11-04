"use client";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TestTimerProps {
  estimatedTime: number; // in milliseconds
  isPaused: boolean;
}

export default function TestTimer({ estimatedTime, isPaused }: TestTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const estimatedSeconds = estimatedTime / 1000;
  const elapsedSeconds = elapsedTime / 1000;
  const isOverTime = elapsedSeconds > estimatedSeconds;
  const percentageUsed = Math.min(
    (elapsedSeconds / estimatedSeconds) * 100,
    100,
  );

  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
      <Clock
        className={cn("w-5 h-5", isOverTime ? "text-red-600" : "text-gray-600")}
      />
      <div className="flex flex-col">
        <span
          className={cn(
            "text-lg font-bold",
            isOverTime ? "text-red-600" : "text-gray-950",
          )}
        >
          {formatTime(elapsedTime)}
        </span>
        <span className="text-xs text-gray-500">
          Est: {formatTime(estimatedTime)}
        </span>
      </div>
      {isPaused && (
        <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
          PAUSED
        </div>
      )}
    </div>
  );
}
