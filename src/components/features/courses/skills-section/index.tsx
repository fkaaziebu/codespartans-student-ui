"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Course } from "@/common/graphql/generated/graphql";
import { useListOrganizationCourses } from "@/common/hooks/queries";
import { CourseCard } from "../course-card";

// Skills Section with Tabs Component
export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { listOrganizationCourses } = useListOrganizationCourses();
  const [courses, setCourses] = useState<Course[]>([]);

  const tabs = [
    "Artificial Intelligence (AI)",
    "Python",
    "Microsoft Excel",
    "AI Agents & Agentic AI",
    "Digital Marketing",
    "Amazon AWS",
  ];

  // const courses: CourseCardProps[] = [
  //   {
  //     id: 1,
  //     title: "The AI Engineer Course 2025: Complete AI Engineer Bootcamp",
  //     instructor: "365 Careers",
  //     image: "",
  //     rating: 4.6,
  //     reviews: 12244,
  //     price: 9.99,
  //     originalPrice: 59.99,
  //     badge: "Bestseller",
  //   },
  //   {
  //     id: 2,
  //     title: "Complete AI Automation And Agentic AI Bootcamp With n8n",
  //     instructor: "KRISHAI Technologies Private Limited, Mayank...",
  //     image: "",
  //     rating: 4.7,
  //     reviews: 101,
  //     price: 9.99,
  //     originalPrice: 39.99,
  //     badge: "Bestseller",
  //   },
  //   {
  //     id: 3,
  //     title: "The Complete Guide To AI Powered Salesforce Development",
  //     instructor: "Matt Gerry",
  //     image: "",
  //     rating: 4.8,
  //     reviews: 94,
  //     price: 9.99,
  //     originalPrice: 34.99,
  //     badge: "Bestseller",
  //   },
  //   {
  //     id: 4,
  //     title: "Business AI: ChatGPT, Microsoft Copilot, Claude & Perplexity",
  //     instructor: "LearnersCare LLC",
  //     image: "",
  //     rating: 4.6,
  //     reviews: 57,
  //     price: 9.99,
  //     originalPrice: 34.99,
  //     badge: "Bestseller",
  //   },
  // ];

  const fetchCourses = async () => {
    try {
      const response = await listOrganizationCourses({
        variables: {
          pagination: {
            first: 4,
          },
        },
        fetchPolicy: "no-cache",
      });

      const coursesData =
        response.data?.listOrganizationCourses?.edges?.map(
          (edge) => edge.node,
        ) || [];

      // @ts-expect-error error
      setCourses(coursesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Skills to transform your career and life
      </h2>
      <p className="text-gray-600 mb-8">
        From critical skills to technical topics, Udemy supports your
        professional development.
      </p>

      {/* Tabs */}
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
            {tab}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>

      {/* Show All Link */}
      <button className="text-purple-600 font-semibold flex items-center gap-2 hover:text-purple-700">
        Show all {tabs[activeTab]} courses
        <ArrowRight size={18} />
      </button>
    </div>
  );
};
