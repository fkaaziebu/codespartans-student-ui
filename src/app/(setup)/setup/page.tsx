"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useListOrganizationCategories } from "@/common/hooks/queries";
import { useCompleteSetup } from "@/common/hooks/mutations";
import LeftProgress from "../_components/left-progress";

const GOALS = [
  { title: "Pass my exams", desc: "Focus on core topics and exam technique" },
  { title: "Improve my score", desc: "I'm passing — I want A's and B's" },
  { title: "Master a subject", desc: "Deep understanding, not just exam prep" },
];

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: "var(--t4)",
  textTransform: "uppercase",
  letterSpacing: "0.7px",
  marginBottom: 12,
};

export default function SetupPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { listOrganizationCategories, data: categories, loading } =
    useListOrganizationCategories();
  const { completeSetup, loading: completing } = useCompleteSetup();

  useEffect(() => {
    listOrganizationCategories();
  }, []);

  const selectedCategory = categories?.find((c) => c.id === selectedCategoryId);
  const coursesForCategory = selectedCategory?.courses ?? [];
  const mandatoryCourses = coursesForCategory.filter((c) => c.is_mandatory);
  const optionalCourses = coursesForCategory.filter((c) => !c.is_mandatory);
  const mandatoryIds = mandatoryCourses.map((c) => c.id);
  const selectedOptionalIds = selectedCourseIds.filter((id) => !mandatoryIds.includes(id));

  const toggleCourse = (id: string, isMandatory: boolean) => {
    if (isMandatory) return;
    setSelectedCourseIds((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : selectedOptionalIds.length < 4
          ? [...prev, id]
          : prev,
    );
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }

    try {
      setSubmitError(null);
      const response = await completeSetup({
        variables: {
          categoryId: selectedCategoryId!,
          courseIds: selectedCourseIds,
        },
      });

      if (response.errors?.length) throw new Error(response.errors[0].message);

      sessionStorage.setItem("isSetupCompleted", "true");
      router.push("/dashboard");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const STEP_META = [
    {
      eyebrow: "Step 1 of 3",
      title: "What are you preparing for?",
      sub: "This shapes your test recommendations, question banks and study plan.",
    },
    {
      eyebrow: "Step 2 of 3",
      title: "Select your courses",
      sub: `Courses under "${selectedCategory?.name ?? "…"}". Mandatory courses are pre-selected. Add up to 4 optional courses.`,
    },
    {
      eyebrow: "Step 3 of 3",
      title: "What is your main goal?",
      sub: "This shapes your personalised learning path.",
    },
  ];

  const meta = STEP_META[step - 1];

  return (
    <>
      <LeftProgress step={step} />

      <div className="pers-right">
        <div className="pers-panel">
          <div className="pers-eyebrow">{meta.eyebrow}</div>
          <div className="pers-title">{meta.title}</div>
          <div className="pers-sub">{meta.sub}</div>

          {/* Step 1 — Categories */}
          {step === 1 && (
            <div>
              <div className="pers-section-label" style={SECTION_LABEL_STYLE}>
                Select a category
              </div>
              {loading ? (
                <div className="text-sm text-muted">Loading categories…</div>
              ) : (
                <div className="chip-wrap">
                  {categories?.map((category) => (
                    <div
                      key={category.id}
                      className={`chip${selectedCategoryId === category.id ? " sel" : ""}`}
                      onClick={() => {
                        setSelectedCategoryId(category.id);
                        const mandatory = category.courses
                          ?.filter((c) => c.is_mandatory)
                          .map((c) => c.id) ?? [];
                        setSelectedCourseIds(mandatory);
                      }}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2 — Courses under selected category */}
          {step === 2 && (
            <div>
              {coursesForCategory.length === 0 ? (
                <div className="text-sm text-muted">
                  No courses found for this category.
                </div>
              ) : (
                <>
                  {mandatoryCourses.length > 0 && (
                    <div style={{ marginBottom: 20 }}>
                      <div className="pers-section-label" style={SECTION_LABEL_STYLE}>
                        Mandatory courses
                      </div>
                      <div className="chip-wrap">
                        {mandatoryCourses.map((course) => (
                          <div
                            key={course.id}
                            className="chip sel"
                            style={{ cursor: "default" }}
                            title="Mandatory — cannot be deselected"
                          >
                            {course.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {optionalCourses.length > 0 && (
                    <div>
                      <div className="pers-section-label" style={SECTION_LABEL_STYLE}>
                        Optional courses (up to 4)
                      </div>
                      <div className="chip-wrap">
                        {optionalCourses.map((course) => {
                          const isSelected = selectedCourseIds.includes(course.id);
                          const atLimit = selectedOptionalIds.length >= 4 && !isSelected;
                          return (
                            <div
                              key={course.id}
                              className={`chip${isSelected ? " sel" : ""}`}
                              style={{ opacity: atLimit ? 0.45 : 1, cursor: atLimit ? "not-allowed" : "pointer" }}
                              onClick={() => toggleCourse(course.id, false)}
                            >
                              {course.title}
                            </div>
                          );
                        })}
                      </div>
                      {selectedOptionalIds.length === 4 && (
                        <div className="text-xs text-muted" style={{ marginTop: 8 }}>
                          Maximum of 4 optional courses selected.
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Step 3 — Goal */}
          {step === 3 && (
            <div>
              <div className="pers-section-label" style={SECTION_LABEL_STYLE}>
                What is your main goal?
              </div>
              {GOALS.map((goal) => (
                <div
                  key={goal.title}
                  className={`goal-opt${selectedGoal === goal.title ? " sel" : ""}`}
                  onClick={() => setSelectedGoal(goal.title)}
                >
                  <div className="goal-radio" />
                  <div>
                    <div className="goal-title">{goal.title}</div>
                    <div className="goal-desc">{goal.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {submitError && (
            <div className="ferr" style={{ display: "block", marginBottom: 12 }}>
              {submitError}
            </div>
          )}

          <div className="pers-footer">
            <button
              className="btn btn-ghost"
              onClick={handleBack}
              style={{ visibility: step === 1 ? "hidden" : "visible" }}
              disabled={completing}
              type="button"
            >
              ← Back
            </button>
            <div className="text-sm text-muted">
              Your preferences are saved automatically
            </div>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={
                completing ||
                (step === 1 && !selectedCategoryId) ||
                (step === 2 && mandatoryIds.length === 0 && selectedCourseIds.length === 0) ||
                (step === 3 && !selectedGoal)
              }
              type="button"
            >
              {step === 3
                ? completing
                  ? "Saving…"
                  : "Start Learning →"
                : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
