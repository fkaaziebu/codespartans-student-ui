import { useEffect, useRef, useState } from "react";
import { TimeEventType } from "@/graphql/generated/graphql";

export type CountdownTimeEvent = {
  type: TimeEventType;
  recorded_at: string;
};

export type TestCountdown = {
  remainingMs: number;
  endTime: number;
  isPaused: boolean;
  isActive: boolean;
};

export function computeTestCountdown(
  timeEvents: CountdownTimeEvent[],
  totalEstimatedMs: number,
  now: number = Date.now(),
): TestCountdown {
  const sortedEvents = [...timeEvents].sort(
    (a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime(),
  );
  const startedEvent = sortedEvents.find(
    (e) => e.type === TimeEventType.Started,
  );

  if (!startedEvent) {
    return {
      remainingMs: totalEstimatedMs,
      endTime: now + totalEstimatedMs,
      isPaused: false,
      isActive: false,
    };
  }

  let lastActiveTime: number | null = new Date(startedEvent.recorded_at).getTime();
  let timeUsedMs = 0;

  for (const event of sortedEvents.slice(sortedEvents.indexOf(startedEvent) + 1)) {
    const eventTime = new Date(event.recorded_at).getTime();
    if (event.type === TimeEventType.Paused) {
      if (lastActiveTime !== null) timeUsedMs += eventTime - lastActiveTime;
      lastActiveTime = null;
    } else if (event.type === TimeEventType.Resumed) {
      lastActiveTime = eventTime;
    }
  }

  if (lastActiveTime !== null) {
    timeUsedMs += now - lastActiveTime;
  }

  const remainingMs = Math.max(0, totalEstimatedMs - timeUsedMs);

  return {
    remainingMs,
    endTime: now + remainingMs,
    isPaused: lastActiveTime === null,
    isActive: true,
  };
}

export function useTestCountdown(
  timeEvents: CountdownTimeEvent[],
  totalEstimatedMs: number,
  options?: { onExpire?: () => void },
): { remainingMs: number; isPaused: boolean } {
  const { onExpire } = options ?? {};
  const [countdown, setCountdown] = useState<TestCountdown>(() =>
    computeTestCountdown(timeEvents, totalEstimatedMs),
  );
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    hasExpiredRef.current = false;
    const initial = computeTestCountdown(timeEvents, totalEstimatedMs);
    setCountdown(initial);

    if (initial.isPaused || !initial.isActive) return;

    const interval = setInterval(() => {
      setCountdown(computeTestCountdown(timeEvents, totalEstimatedMs));
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeEvents, totalEstimatedMs]);

  useEffect(() => {
    if (
      countdown.isActive &&
      countdown.remainingMs <= 0 &&
      !countdown.isPaused &&
      !hasExpiredRef.current
    ) {
      hasExpiredRef.current = true;
      onExpire?.();
    }
  }, [countdown, onExpire]);

  return { remainingMs: countdown.remainingMs, isPaused: countdown.isPaused };
}
