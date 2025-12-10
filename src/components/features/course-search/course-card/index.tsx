import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CourseResponse } from "@/common/graphql/generated/graphql";

export const CourseCard = (course: CourseResponse | null) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
      {/* Course Image */}

      <Image
        src={course?.avatar_url || ""}
        alt="Course avatar url"
        width={192}
        height={192}
        className="w-full h-40"
      />

      {/* Course Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">
          {course?.title}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
          {course?.description}
        </p>

        <p className="text-xs text-gray-700 font-medium mb-3">
          {course?.instructor?.name}
        </p>

        {/* Rating and Stats */}
        <div className="mb-3 space-y-2">
          <div className="flex items-center gap-2">
            {true && (
              <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-0.5 rounded">
                Bestseller
              </span>
            )}
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm">{5}</span>
            </div>
            <span className="text-xs text-gray-500">
              {"reviews".toLocaleString()} ratings
            </span>
          </div>

          <div className="text-xs text-gray-600 space-x-3">
            <span>
              {(course?.estimated_duration || 0) / (1000 * 60 * 60)} total hours
            </span>
            <span>•</span>
            <span>{2} lectures</span>
            <span>•</span>
            <span>{course?.level}</span>
          </div>
        </div>

        {/* Price and Cart */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <span className="font-bold text-lg text-gray-900">
              ${course?.price}
            </span>
            <span className="text-sm text-gray-500 line-through ml-2">
              ${course?.price}
            </span>
          </div>
          {!course?.is_subscribed ? (
            <button
              type="button"
              className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded font-semibold text-sm transition-colors"
            >
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded font-semibold text-sm transition-colors cursor-pointer"
              onClick={() => router.push(`/courses/${course.id}/suites`)}
            >
              Go to learning
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
