"use client";
import { CheckCircle, FileText, Target } from "lucide-react";

interface CourseOverviewProps {
  description?: string;
  learningObjectives?: string[];
  prerequisites?: string[];
}

export default function CourseOverview({
  description,
  learningObjectives,
  prerequisites,
}: CourseOverviewProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-950 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Course Overview
      </h3>

      {/* Description */}
      {description && (
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-800 mb-2">Description</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
        </div>
      )}

      {/* Learning Objectives */}
      {learningObjectives && learningObjectives.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            What You'll Learn
          </h4>
          <ul className="space-y-2">
            {learningObjectives.map((objective, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-bold text-yellow-900 mb-2">
            Prerequisites
          </h4>
          <ul className="space-y-1">
            {prerequisites.map((prerequisite, index) => (
              <li key={index} className="text-sm text-yellow-800">
                • {prerequisite}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
