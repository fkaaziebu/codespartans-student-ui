import { ArrowRight, Users } from "lucide-react";

// Category Cards Component
export const CategoryCards = () => {
  const categories = [
    {
      id: 1,
      title: "Generative AI",
      learners: "1.7M+",
      color: "from-orange-300 to-orange-500",
    },
    {
      id: 2,
      title: "IT Certifications",
      learners: "14M+",
      color: "from-blue-500 to-teal-600",
    },
    {
      id: 3,
      title: "Data Science",
      learners: "8.1M+",
      color: "from-red-300 to-purple-500",
    },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-2">
        Learn essential career and life skills
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Udemy helps you build in-demand skills fast and advance your career in a
        changing job market.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`bg-gradient-to-br ${category.color} overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group`}
          >
            <div className="h-40 bg-gradient-to-br opacity-50"></div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {category.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} />
                  <span className="text-sm font-medium">
                    {category.learners}
                  </span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-gray-400 group-hover:text-purple-600 transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
