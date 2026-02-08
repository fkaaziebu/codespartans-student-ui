import { CategoryCards } from "../category-cards";
import { HeroBanner } from "../hero-banner";
import { MeilisearchCourseSection } from "../meilisearch-course-section";
import { SkillsSection } from "../skills-section";
import { TrustedSection } from "../trusted-comanies-section";

export const CourseContentArea = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-8">
        <HeroBanner />
        <CategoryCards />
        <SkillsSection />
        <MeilisearchCourseSection
          title="Popular Courses"
          subtitle="Courses loved by learners on Codespartans."
          showAllLink="/courses/search?q="
        />
        <MeilisearchCourseSection
          title="Recently Added"
          subtitle="Fresh courses just added to the platform."
          sort={["inserted_at:desc"]}
          showAllLink="/courses/search?q="
        />
        <TrustedSection />
      </div>
    </div>
  );
};
