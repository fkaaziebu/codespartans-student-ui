export const formatTimeRange = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  return `${seconds}s`;
};
