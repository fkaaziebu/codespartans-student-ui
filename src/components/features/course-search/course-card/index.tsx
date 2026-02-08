"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type BaseHit } from "instantsearch.js";

type CourseHit = BaseHit & {
  objectID: string;
  title?: string;
  description?: string;
  avatar_url?: string;
  price?: number;
  level?: string;
  domains?: string[];
  estimated_duration?: number;
  is_subscribed?: boolean;
  instructor?: {
    name?: string;
  };
};

export const CourseCard = ({ hit }: { hit: CourseHit }) => {
  const router = useRouter();

  const title = hit.title || "";
  const description = hit.description || "";
  const avatarUrl = hit.avatar_url || "";
  const price = hit.price ?? 0;
  const level = hit.level || "";
  const instructorName = hit.instructor?.name || "";
  const estimatedDuration = hit.estimated_duration || 0;
  const isSubscribed = hit.is_subscribed || false;

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 rounded">
      {avatarUrl && (
        <Image
          src={avatarUrl}
          alt={title}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">
          {title}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-2 mb-3">{description}</p>

        {instructorName && (
          <p className="text-xs text-gray-700 font-medium mb-3">
            {instructorName}
          </p>
        )}

        <div className="mb-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm">5</span>
            </div>
          </div>

          <div className="text-xs text-gray-600 space-x-3">
            <span>
              {(estimatedDuration / (1000 * 60 * 60)).toFixed(1)} total hours
            </span>
            <span>-</span>
            <span className="capitalize">{level.toLowerCase()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <span className="font-bold text-lg text-gray-900">${price}</span>
          </div>
          {!isSubscribed ? (
            <button
              type="button"
              className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded font-semibold text-sm transition-colors cursor-pointer"
              onClick={() => router.push(`/courses/${hit.id}`)}
            >
              View course
            </button>
          ) : (
            <button
              type="button"
              className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded font-semibold text-sm transition-colors cursor-pointer"
              onClick={() => router.push(`/courses/${hit.id}/suites`)}
            >
              Go to learning
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
