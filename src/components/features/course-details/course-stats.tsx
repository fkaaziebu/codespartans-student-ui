"use client";
import { BookOpen, Clock, TrendingUp } from "lucide-react";

interface CourseStatsProps {
  totalQuestions?: number;
  estimatedDuration?: number;
  level?: string;
}

export default function CourseStats({
  totalQuestions,
  estimatedDuration,
  level,
}: CourseStatsProps) {
  return (
    <div className="flex items-center gap-6 py-4 border-t border-gray-200">
      {totalQuestions && (
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Questions</span>
            <span className="text-sm font-bold text-gray-950">
              {totalQuestions}
            </span>
          </div>
        </div>
      )}

      {estimatedDuration && (
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-lg">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Duration</span>
            <span className="text-sm font-bold text-gray-950">
              {estimatedDuration} mins
            </span>
          </div>
        </div>
      )}

      {level && (
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Level</span>
            <span className="text-sm font-bold text-gray-950">{level}</span>
          </div>
        </div>
      )}
    </div>
  );
}
