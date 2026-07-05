const PERFORMANCE_LABEL = (pct: number) => {
  if (pct >= 80) return "Excellent";
  if (pct >= 60) return "Good";
  if (pct >= 40) return "Average";
  return "Needs Improvement";
};

export const ScoreCard = ({
  score,
  total,
}: {
  score: number;
  total: number;
}) => {
  const percentage = total > 0 ? (score / total) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-2">Your Score</p>
          <h1 className="text-5xl font-bold mb-2">
            {score}/{total}
          </h1>
          <p className="text-lg opacity-90">{percentage.toFixed(1)}%</p>
        </div>

        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * 351.8} 351.8`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{percentage.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white border-opacity-20">
        <p className="text-sm opacity-90 mb-2">Performance</p>
        <p className="text-2xl font-bold">{PERFORMANCE_LABEL(percentage)}</p>
      </div>
    </div>
  );
};
