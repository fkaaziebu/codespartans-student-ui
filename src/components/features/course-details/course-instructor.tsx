"use client";
import { Mail, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Instructor {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
}

interface CourseInstructorProps {
  instructor: Instructor;
}

export default function CourseInstructor({
  instructor,
}: CourseInstructorProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-950 mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Instructor
      </h3>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {instructor.avatar_url ? (
            <img
              src={instructor.avatar_url}
              alt={instructor.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-950 mb-1">
            {instructor.name}
          </h4>

          {instructor.email && (
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <a
                href={`mailto:${instructor.email}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {instructor.email}
              </a>
            </div>
          )}

          {instructor.bio && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {instructor.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
