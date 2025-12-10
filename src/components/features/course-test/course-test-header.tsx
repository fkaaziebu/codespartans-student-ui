"use client";
import { Award, BookOpen, CheckCircle, TrendingUp } from "lucide-react";

interface CourseTestHeaderProps {
  totalSuites: number;
  completedSuites: number;
  totalAttempts: number;
  averageScore: number;
}

export default function CourseTestHeader({
  totalSuites,
  completedSuites,
  totalAttempts,
  averageScore,
}: CourseTestHeaderProps) {
  const progressPercentage = (completedSuites / totalSuites) * 100;

  return (
    <div className="flex flex-col space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Suites */}
        <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
          <div className="bg-blue-600 p-3 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-950">
              {totalSuites}
            </span>
            <span className="text-xs text-gray-600">Total Suites</span>
          </div>
        </div>

        {/* Completed Suites */}
        <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
          <div className="bg-green-600 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-950">
              {completedSuites}
            </span>
            <span className="text-xs text-gray-600">Completed</span>
          </div>
        </div>

        {/* Total Attempts */}
        <div className="flex items-center gap-3 bg-purple-50 rounded-lg p-4">
          <div className="bg-purple-600 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-950">
              {totalAttempts}
            </span>
            <span className="text-xs text-gray-600">Total Attempts</span>
          </div>
        </div>

        {/* Average Score */}
        <div className="flex items-center gap-3 bg-yellow-50 rounded-lg p-4">
          <div className="bg-yellow-600 p-3 rounded-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-950">
              {averageScore > 0 ? `${averageScore.toFixed(0)}%` : "N/A"}
            </span>
            <span className="text-xs text-gray-600">Avg Score</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Overall Progress</span>
          <span className="text-gray-600">
            {completedSuites} / {totalSuites} suites completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-end">
          <span className="text-xs font-bold text-blue-600">
            {progressPercentage.toFixed(0)}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}
