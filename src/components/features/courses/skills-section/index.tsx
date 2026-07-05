"use client";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MeiliSearch } from "meilisearch";
import { proxyImageUrl } from "@/lib/utils";

type MeilisearchCourse = {
  id: string;
  title: string;
  avatar_url?: string;
  price?: number;
  domains?: string[];
  instructor?: {
    name?: string;
  };
};

const MEILI_INDEX = process.env.MEILI_INDEX || "";

const tabs = [
  { label: "Science related courses", query: "Science" },
  { label: "Artificial Intelligence (AI)", query: "AI" },
  { label: "Python", query: "Python" },
  { label: "Microsoft Excel", query: "Excel" },
  { label: "AI Agents & Agentic AI", query: "AI Agents" },
  { label: "Digital Marketing", query: "Digital Marketing" },
  { label: "Amazon AWS", query: "AWS" },
];

const SkillCourseCard = ({ course }: { course: MeilisearchCourse }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
      onClick={() => router.push(`/courses/${course.id}`)}
    >
      {course.avatar_url && (
        <Image
          src={proxyImageUrl(course.avatar_url)}
          height={192}
          width={192}
          className="w-full h-48 object-cover"
          alt={course.title}
        />
      )}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">
          {course.title}
        </h3>
        {course.instructor?.name && (
          <p className="text-xs text-gray-600 mb-3">{course.instructor.name}</p>
        )}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm text-gray-900">4</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-900">
            ${course.price ?? 0}
          </span>
        </div>
        {course.domains && course.domains.length > 0 && (
          <div className="mt-3 space-x-2">
            {course.domains.slice(0, 2).map((domain) => (
              <span
                key={domain}
                className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded capitalize"
              >
                {domain.toLowerCase().replace(/_/g, " ")}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [courses, setCourses] = useState<MeilisearchCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const meiliClient = useRef(
    new MeiliSearch({
      host: `${typeof window !== "undefined" ? window.location.origin : ""}/api/meili`,
    }),
  );

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const index = meiliClient.current.index(MEILI_INDEX);
        const results = await index.search<MeilisearchCourse>(
          tabs[activeTab].query,
          { limit: 4 },
        );

        setCourses(results.hits);
      } catch (error) {
        console.error("Meilisearch fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [activeTab]);

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Skills to transform your career and life
      </h2>
      <p className="text-gray-600 mb-8">
        From critical skills to technical topics, Codespartans supports your
        professional development.
      </p>

      <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-4 whitespace-nowrap font-medium transition-colors ${
              activeTab === index
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse h-72 rounded" />
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {courses.map((course) => (
            <SkillCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 mb-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg font-medium">
            No courses found for &quot;{tabs[activeTab].label}&quot;
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Try selecting a different category above.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() =>
          router.push(
            `/courses/search?q=${encodeURIComponent(tabs[activeTab].query)}`,
          )
        }
        className="text-purple-600 font-semibold flex items-center gap-2 hover:text-purple-700"
      >
        Show all {tabs[activeTab].label} courses
        <ArrowRight size={18} />
      </button>
    </div>
  );
};
