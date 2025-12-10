"use client";
import { ChevronRight } from "lucide-react";

// Recommended Topics Component
export const RecommendedTopics = () => {
  const topics = [
    "React with Next.js and Redux",
    "React Native for Mobile Apps",
    "Full-Stack Development with React",
    "React and TypeScript Projects",
    "Advanced React Patterns",
  ];

  return (
    <div className="mb-8 mt-12">
      <p className="text-gray-700 font-medium mb-4">Recommended in react js</p>
      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
        {topics.map((topic, index) => (
          <button
            key={index}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 whitespace-nowrap hover:border-gray-400 transition-colors"
          >
            <ChevronRight size={16} />
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};
