"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Course } from "@/common/graphql/generated/graphql";

export const CourseCard = ({
  id,
  title,
  instructor,
  avatar_url,
  price,
  domains,
}: Course) => {
  const router = useRouter();
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
      onClick={() => router.push(`/courses/${id}`)}
    >
      {/*<div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400"></div>*/}
      <Image
        src={avatar_url}
        height={"192"}
        width={"192"}
        className="w-full h-48"
        alt="Course avatar url"
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-sm flex-1 line-clamp-2">
            {title}
          </h3>
        </div>
        <p className="text-xs text-gray-600 mb-3">{instructor?.name}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm text-gray-900">{4}</span>
          </div>
          <span className="text-xs text-gray-500">
            ({"reviews".toLocaleString()} ratings)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-900">${price}</span>
          <span className="text-sm text-gray-500 line-through">${price}</span>
        </div>

        <div className="mt-3 space-x-2">
          {domains.map((domain) => (
            <span
              key={domain}
              className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded capitalize"
            >
              {domain.toLowerCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
