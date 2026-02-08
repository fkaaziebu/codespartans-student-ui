"use client";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MeiliSearch } from "meilisearch";

type MeilisearchCourse = {
  id: string;
  title: string;
  description?: string;
  avatar_url?: string;
  price?: number;
  level?: string;
  domains?: string[];
  instructor?: {
    name?: string;
  };
};

const meiliClient = new MeiliSearch({
  host: process.env.MEILI_URL || "http://localhost:7700",
  apiKey: process.env.MEILI_MASTER_KEY || "password",
});

const MEILI_INDEX = process.env.MEILI_INDEX || "";

const SectionCourseCard = ({ course }: { course: MeilisearchCourse }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer min-w-[260px] max-w-[300px] flex-shrink-0"
      onClick={() => router.push(`/courses/${course.id}`)}
    >
      {course.avatar_url && (
        <Image
          src={course.avatar_url}
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

export const MeilisearchCourseSection = ({
  title,
  subtitle,
  query,
  sort,
  limit = 8,
  showAllLink,
}: {
  title: string;
  subtitle?: string;
  query?: string;
  sort?: string[];
  limit?: number;
  showAllLink?: string;
}) => {
  const [courses, setCourses] = useState<MeilisearchCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const index = meiliClient.index(MEILI_INDEX);
        const results = await index.search<MeilisearchCourse>(query || "", {
          limit,
          ...(sort && sort.length > 0 ? { sort } : {}),
        });

        setCourses(results.hits);
      } catch (error) {
        console.error("Meilisearch fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [query, limit, sort]);

  if (!isLoading && courses.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse h-72 rounded" />
          ))}
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {courses.map((course) => (
            <SectionCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {showAllLink && (
        <button
          type="button"
          onClick={() => router.push(showAllLink)}
          className="mt-4 text-purple-600 font-semibold flex items-center gap-2 hover:text-purple-700"
        >
          Show all courses
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
};
