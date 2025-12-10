"use client";
import { BookOpen, CheckCircle, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CourseNode = {
  id: string;
  title: string;
  instructor?: {
    id: string;
    name: string;
    email: string;
  };
  avatar_url?: string;
  currency?: string;
  description?: string;
  domains?: string[];
  level?: string;
  price?: number;
  is_subscribed?: boolean;
  total_questions?: number;
  estimated_duration?: number;
};

interface CourseCardProps {
  course: CourseNode;
  onCourseClick: (course: CourseNode) => void;
}

export default function CourseCard({ course, onCourseClick }: CourseCardProps) {
  const getLevelBadge = (level?: string) => {
    if (!level) return null;

    const colors: { [key: string]: string } = {
      Beginner: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-red-100 text-red-800",
      Expert: "bg-purple-100 text-purple-800",
    };
    return (
      <Badge className={`${colors[level]} hover:${colors[level]}`}>
        {level}
      </Badge>
    );
  };

  return (
    <div
      onClick={() => onCourseClick(course)}
      className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md cursor-pointer flex flex-col"
    >
      {/* Course Image/Thumbnail */}
      <div className="relative w-full h-48 bg-gradient-to-br from-gray-800 to-gray-600 rounded-t-lg flex items-center justify-center">
        {course.avatar_url ? (
          <img
            src={course.avatar_url}
            alt={course.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <BookOpen className="w-16 h-16 text-white opacity-80" />
        )}
        {course.is_subscribed && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-blue-600 text-white hover:bg-blue-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              Enrolled
            </Badge>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-bold text-gray-950 line-clamp-2 flex-1">
            {course.title}
          </h3>
        </div>

        {/* Instructor */}
        {course.instructor && (
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-600">
              {course.instructor.name}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {course.level && getLevelBadge(course.level)}
          {course.domains && course.domains.length > 0 && (
            <>
              {course.domains.slice(0, 2).map((domain) => (
                <Badge key={domain} variant="outline" className="text-xs">
                  {domain}
                </Badge>
              ))}
              {course.domains.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{course.domains.length - 2}
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 flex-wrap">
          {course.total_questions && (
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.total_questions} Questions</span>
            </div>
          )}
          {course.estimated_duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{(course.estimated_duration / 1000).toFixed(0)} mins</span>
            </div>
          )}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-1"></div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          {course.is_subscribed ? (
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Continue Learning
            </Button>
          ) : (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onCourseClick(course);
                }}
                className="flex-1 bg-gray-800 hover:bg-gray-950"
              >
                Go To Test
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
