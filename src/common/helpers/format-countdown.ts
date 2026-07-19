export type FormattedCountdown = {
  hours: number;
  minutes: number;
  seconds: number;
  display: string;
};

export const formatCountdown = (ms: number): FormattedCountdown => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  const display = hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
  return { hours, minutes, seconds, display };
};
