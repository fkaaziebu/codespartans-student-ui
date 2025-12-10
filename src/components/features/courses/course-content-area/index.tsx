import { CategoryCards } from "../category-cards";
import { HeroBanner } from "../hero-banner";
import { SkillsSection } from "../skills-section";
import { TrustedSection } from "../trusted-comanies-section";

// Main CourseContentArea
export const CourseContentArea = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-2 sm:px-10 lg:px-20 xl:px-35 py-8">
        <HeroBanner />
        <CategoryCards />
        <SkillsSection />
        <TrustedSection />
      </div>
    </div>
  );
};
