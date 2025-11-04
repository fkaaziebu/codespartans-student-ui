"use client";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface SyllabusSection {
  id: string;
  title: string;
  description: string;
  question_count: number;
}

interface CourseSyllabusProps {
  syllabus: SyllabusSection[];
}

export default function CourseSyllabus({ syllabus }: CourseSyllabusProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const totalQuestions = syllabus.reduce(
    (sum, section) => sum + section.question_count,
    0,
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-950 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Course Syllabus
        </h3>
        <Badge variant="outline">
          {syllabus.length} Section{syllabus.length !== 1 ? "s" : ""} •{" "}
          {totalQuestions} Questions
        </Badge>
      </div>

      <div className="space-y-2">
        {syllabus.map((section, index) => {
          const isExpanded = expandedSections.has(section.id);

          return (
            <div
              key={section.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-700">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-950">
                      {section.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {section.question_count} question
                      {section.question_count !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-700 mt-3">
                    {section.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
