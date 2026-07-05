"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useListOrganizationCourses,
  useGetStudentStats,
  useGetActiveTest,
  useStudentProfile,
  useStudentSubjectProgress,
  useWeakSubjectAreas,
  useGetWeeklyInsight,
  useGetCurrentStreakCount,
  useGetStudentAggregate,
} from "@/common/hooks/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SubjectProgressSection from "@/components/features/dashboard/subject-progress-section";
import { useSidebar } from "@/common/context/sidebar-context";

export default function DashboardPage() {
  const router = useRouter();
  const { toggle } = useSidebar();
  const { studentProfile, data: profileData } = useStudentProfile();
  const { getStudentStats, data: statsData } = useGetStudentStats();
  const { getActiveTest, data: activeTest } = useGetActiveTest();
  const { getStudentSubjectProgress, data: subjectProgress } =
    useStudentSubjectProgress();
  const { getWeakSubjectAreas, data: weakAreas } = useWeakSubjectAreas();
  const {
    getWeeklyInsight,
    data: weeklyInsight,
    loading: insightLoading,
  } = useGetWeeklyInsight();
  const { getCurrentStreakCount, data: streakData } =
    useGetCurrentStreakCount();
  const { getStudentAggregate, data: aggregateData } = useGetStudentAggregate();

  const avatarInitials = profileData?.name
    ? profileData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  const { listOrganizationCourses, data, loading } = useListOrganizationCourses(
    {
      organizationId: sessionStorage.getItem("organizationId"),
      pagination: { first: 4 },
      filter: { is_subscribed: true },
    },
  );

  useEffect(() => {
    studentProfile();
    getStudentStats();
    getActiveTest({ fetchPolicy: "network-only" });
    listOrganizationCourses();
    getWeakSubjectAreas();
    getStudentSubjectProgress();
    getWeeklyInsight();
    getCurrentStreakCount();
    getStudentAggregate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function formatSubject(raw: string): string {
    return raw
      .replace(/^[A-Z]+_/, "")
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";
    return "Good night";
  }

  function getFormattedDate(): string {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function getStreakIcon(streak: number): string {
    if (streak === 0) return "💤";
    if (streak < 3) return "🌱";
    if (streak < 7) return "🔥";
    if (streak < 14) return "⚡";
    if (streak < 30) return "🌟";
    return "🏆";
  }

  const courses = data?.edges ?? [];

  const goToExams = (courseId: string) => {
    sessionStorage.setItem("pendingExpandCourseId", courseId);
    router.push("/exams");
  };

  return (
    <div className="main-wrap">
      <div className="mobile-topbar">
        <button className="hamburger" onClick={toggle}>
          ☰
        </button>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--blue)",
          }}
        >
          ExamForge
        </span>
        <div className="user-avatar" style={{ width: 32, height: 32 }}>
          {avatarInitials}
        </div>
      </div>

      <div className="top-bar">
        <div className="top-bar-left">
          <div className="breadcrumb">
            <span className="bc-current">Dashboard</span>
          </div>
        </div>
        <div className="top-bar-right">
          <div className="streak-pill">
            {getStreakIcon(streakData?.current_streak ?? 0)}{" "}
            {streakData?.current_streak ?? 0}-day streak
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => router.push("/exams")}
          >
            + Start Test
          </button>
        </div>
      </div>

      <div className="dash-main-right">
        <div className="dash-main-area">
          {/* Header */}
          <div className="dash-header-grad">
            <div>
              <div className="dash-greeting">
                👋 {getGreeting()}, {profileData?.name ?? ""}!
              </div>
              <div className="dash-sub-text">
                {getFormattedDate()} · Ready to study today?
              </div>
            </div>
            <div className="dash-right-info">
              <div className="dash-streak">
                {getStreakIcon(streakData?.current_streak ?? 0)}{" "}
                {streakData?.current_streak ?? 0}-day streak
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-lbl">Tests Taken</div>
              <div className="stat-val">
                {statsData?.total_test_taken ?? "—"}
              </div>
              <div
                className={`stat-sub ${(statsData?.total_test_taken_percentage_change ?? 0) >= 0 ? "up" : "down"}`}
              >
                {statsData
                  ? `${statsData.total_test_taken_percentage_change >= 0 ? "↑" : "↓"} ${Math.abs(statsData.total_test_taken_percentage_change).toFixed(2)}% this week`
                  : ""}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-lbl">Avg Score</div>
              <div className="stat-val">
                {statsData ? `${statsData.average_score.toFixed(2)}%` : "—"}
              </div>
              <div
                className={`stat-sub ${(statsData?.average_score_percentage_change ?? 0) >= 0 ? "up" : "down"}`}
              >
                {statsData
                  ? `${statsData.average_score_percentage_change >= 0 ? "↑" : "↓"} ${Math.abs(statsData.average_score_percentage_change).toFixed(2)}pts`
                  : ""}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-lbl">Study Hours</div>
              <div className="stat-val">
                {statsData ? `${statsData.study_hours.toFixed(2)}h` : "—"}
              </div>
              <div className="stat-sub">This month</div>
            </div>
            <div className="stat-card">
              <div className="stat-lbl">Weak Areas</div>
              <div className="stat-val">
                {statsData?.weak_areas_count ?? "—"}
              </div>
              <div className="stat-sub warn">Needs attention</div>
            </div>
          </div>

          {/* Active Test */}
          {activeTest && (
            <div className="resume-banner">
              <div className="resume-info">
                <div className="resume-title">
                  {activeTest.status === "PAUSED"
                    ? "Resume your paused test"
                    : "Continue your active test"}
                </div>
                <div className="resume-meta">
                  Mode: {activeTest.mode} · Status: {activeTest.status}
                </div>
                <div className="resume-prog-outer">
                  <div className="resume-prog-fill" style={{ width: "50%" }} />
                </div>
              </div>
              <button
                className="resume-cta-btn"
                onClick={() =>
                  router.push(`/exams/${activeTest.course_id}/${activeTest.id}`)
                }
              >
                ▶ {activeTest.status === "PAUSED" ? "Resume" : "Continue"}
              </button>
            </div>
          )}

          {/* AI Recommendation */}
          <div className="ai-card mb20">
            <div className="flex-row mb12">
              <span className="badge badge-indigo">🧠 AI Insight</span>
              <span className="text-xs text-muted">
                Based on your last 3 test sessions
              </span>
            </div>
            {insightLoading ? (
              <div style={{ opacity: 0.5 }}>
                <div
                  className="skeleton"
                  style={{ height: 16, width: "60%", marginBottom: 8 }}
                />
                <div
                  className="skeleton"
                  style={{ height: 12, width: "90%", marginBottom: 4 }}
                />
                <div
                  className="skeleton"
                  style={{ height: 12, width: "75%" }}
                />
              </div>
            ) : weeklyInsight ? (
              <div className="flex-between">
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--indigo)",
                      marginBottom: 5,
                    }}
                  >
                    {weeklyInsight.title}
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color: "var(--indigo)",
                      opacity: "0.8",
                      lineHeight: "1.6",
                    }}
                  >
                    {weeklyInsight.description}
                  </div>
                </div>
                {weeklyInsight.suites.length > 0 && (
                  <div style={{ flexShrink: 0, marginLeft: 20 }}>
                    <button
                      className="btn btn-indigo btn-sm"
                      onClick={() => router.push("/weak-areas")}
                    >
                      ⚡ Start Drill
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  color: "var(--indigo)",
                  opacity: 0.6,
                }}
              >
                <span style={{ fontSize: 28 }}>✨</span>
                <div>
                  <div
                    className="text-sm"
                    style={{ fontWeight: 600, marginBottom: 2 }}
                  >
                    No insight available yet
                  </div>
                  <div className="text-xs" style={{ lineHeight: "1.5" }}>
                    Complete a few tests and your personalised weekly insight
                    will appear here.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Available Tests — full-width course grid */}
          <div style={{ marginBottom: 24 }}>
            <div
              className="section-title"
              style={{
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>📝 Available Tests</span>
              <Link
                href="/exams"
                className="text-xs font-medium"
                style={{ color: "var(--blue)" }}
              >
                More →
              </Link>
            </div>

            {loading && (
              <div className="text-sm text-muted">Loading courses...</div>
            )}

            {!loading && courses.length === 0 && (
              <div className="card card-p" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📚</div>
                <div
                  className="text-sm"
                  style={{ fontWeight: 600, marginBottom: 4 }}
                >
                  No courses available
                </div>
                <div className="text-xs text-muted">
                  Subscribe to a course to start practicing here.
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {courses.map(({ node }) => {
                const suites = node.approved_version?.test_suites ?? [];
                return (
                  <Card
                    key={node.id}
                    className="cursor-pointer transition-shadow hover:shadow-md"
                    onClick={() => goToExams(node.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          className="shrink-0 rounded-lg overflow-hidden"
                          style={{
                            width: 44,
                            height: 44,
                            background: "var(--blue-lt)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 22,
                          }}
                        >
                          {node.avatar_url ? (
                            <img
                              src={node.avatar_url}
                              alt={node.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            "📚"
                          )}
                        </div>
                        <CardTitle className="text-sm leading-snug line-clamp-2">
                          {node.title}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div
                        className="flex flex-wrap gap-x-3 gap-y-1 text-xs"
                        style={{ color: "var(--t3)" }}
                      >
                        <span>{node.total_questions} questions</span>
                        <span>·</span>
                        <span>
                          {(node.estimated_duration / 60000).toFixed(0)} mins
                        </span>
                        <span>·</span>
                        <span>
                          {suites.length} suite{suites.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Subject Progress — full-width below the course grid */}
          <SubjectProgressSection items={subjectProgress} />
        </div>

        {/* Right Insights Panel */}
        <div className="dash-right-panel">
          <div className="insight-header">🎯 Insights</div>
          <div className="insight-ai-card mb16">
            {insightLoading ? (
              <div style={{ opacity: 0.5 }}>
                <div
                  className="skeleton"
                  style={{ height: 12, width: "50%", marginBottom: 10 }}
                />
                <div
                  className="skeleton"
                  style={{ height: 14, width: "80%", marginBottom: 8 }}
                />
                <div
                  className="skeleton"
                  style={{ height: 11, width: "100%", marginBottom: 4 }}
                />
                <div
                  className="skeleton"
                  style={{ height: 11, width: "70%" }}
                />
              </div>
            ) : weeklyInsight ? (
              <>
                <div className="flex-row mb8">
                  <span className="badge badge-indigo">AI</span>
                  <span className="text-xs text-muted">
                    {weeklyInsight.suites[0]?.title ?? "Weekly Focus"}
                  </span>
                </div>
                <div
                  title={weeklyInsight.title}
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 700,
                    color: "var(--indigo)",
                    marginBottom: 5,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    cursor: "default",
                  }}
                >
                  {weeklyInsight.title}
                </div>
                <div
                  className="text-sm"
                  title={weeklyInsight.description}
                  style={{
                    color: "var(--indigo)",
                    opacity: "0.8",
                    lineHeight: "1.5",
                    marginBottom: 12,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    cursor: "default",
                  }}
                >
                  {weeklyInsight.description}
                </div>
                {weeklyInsight.suites.length > 0 && (
                  <button
                    className="btn btn-indigo btn-sm"
                    style={{ width: "100%" }}
                    onClick={() => router.push("/weak-areas")}
                  >
                    ⚡ Start Drill →
                  </button>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>✨</div>
                <div
                  className="text-sm"
                  style={{
                    fontWeight: 600,
                    color: "var(--indigo)",
                    marginBottom: 4,
                  }}
                >
                  No insight yet
                </div>
                <div
                  className="text-xs"
                  style={{
                    color: "var(--indigo)",
                    opacity: 0.7,
                    lineHeight: "1.5",
                  }}
                >
                  Take a few tests to unlock your weekly AI insight.
                </div>
              </div>
            )}
          </div>

          <div className="section-title">🧠 Weak Areas</div>
          {weakAreas && weakAreas.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {weakAreas.slice(0, 3).map((area) => (
                <div
                  key={area.subject}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "6px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span className="text-sm" style={{ fontWeight: 500 }}>
                    {formatSubject(area.subject)}
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      color:
                        area.accuracy < 50
                          ? "var(--red, #ef4444)"
                          : "var(--amber, #f59e0b)",
                      fontWeight: 600,
                    }}
                  >
                    {Math.round(area.accuracy)}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>✅</div>
              <div
                className="text-sm"
                style={{ fontWeight: 600, marginBottom: 4 }}
              >
                No weak areas
              </div>
              <div className="text-xs text-muted">
                Keep taking tests to identify areas that need improvement.
              </div>
            </div>
          )}
          <Link
            href={"/weak-areas"}
            className="btn btn-ghost btn-sm mt12"
            style={{ width: "100%" }}
          >
            View All Weak Areas →
          </Link>

          {aggregateData && (
            <>
              <div className="divider" />
              <div className="section-title">🎯 Predicted Aggregate</div>

              {aggregateData.state === "ZERO_DATA" ||
              !aggregateData.aggregate_range ? (
                <>
                  <div
                    className="text-sm text-muted"
                    style={{ lineHeight: 1.5, marginBottom: 12 }}
                  >
                    {aggregateData.message}
                  </div>
                  {aggregateData.state === "ZERO_DATA" && (
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: "100%" }}
                      onClick={() => router.push("/exams")}
                    >
                      Start a test
                    </button>
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 36,
                      fontWeight: 800,
                      color: "var(--t1)",
                    }}
                  >
                    {aggregateData.aggregate_range}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      color: "var(--t2)",
                      marginTop: 4,
                      marginBottom: 12,
                    }}
                  >
                    Estimated range, based on{" "}
                    {aggregateData.tested_required_subjects_count} of{" "}
                    {aggregateData.required_subjects_count} subjects
                  </div>
                  <div className="prog-track">
                    <div
                      className={`prog-fill ${
                        aggregateData.state === "COMPLETE_DATA"
                          ? "pf-green"
                          : "pf-amber"
                      }`}
                      style={{
                        width: `${Math.round(
                          (aggregateData.tested_required_subjects_count /
                            Math.max(
                              1,
                              aggregateData.required_subjects_count,
                            )) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs mt8" style={{ color: "var(--t2)" }}>
                    {aggregateData.tested_required_subjects_count} of{" "}
                    {aggregateData.required_subjects_count} subjects have enough
                    data
                  </div>

                  {aggregateData.state === "PARTIAL_DATA" && (
                    <div
                      className="mt12"
                      style={{
                        background: "var(--amber-lt)",
                        border: "1px solid var(--amber-bd)",
                        borderRadius: 8,
                        padding: "10px 12px",
                        fontSize: 12.5,
                        color: "#92400e",
                        lineHeight: 1.5,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                      }}
                    >
                      <span>⚠️</span>
                      <span>{aggregateData.message}</span>
                    </div>
                  )}

                  {aggregateData.state === "COMPLETE_DATA" && (
                    <div
                      className="mt12"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {aggregateData.courses_with_test_taken.map((course) => (
                        <div
                          key={course.course_id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "6px 0",
                            borderBottom: "1px solid var(--border)",
                          }}
                        >
                          <span className="text-sm">{course.course_title}</span>
                          <span className="text-sm" style={{ fontWeight: 700 }}>
                            {course.grade ?? "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="bottom-nav" style={{ display: "none" }}>
        <div className="bnav-item act">
          <span className="bnav-icon">🏠</span>
          <span className="bnav-label">Home</span>
        </div>
        <div className="bnav-item">
          <span className="bnav-icon">✦</span>
          <span className="bnav-label">Test</span>
        </div>
        <div className="bnav-item">
          <span className="bnav-icon">🧠</span>
          <span className="bnav-label">Weak Areas</span>
        </div>
        <div className="bnav-item">
          <span className="bnav-icon">📋</span>
          <span className="bnav-label">History</span>
        </div>
      </div>
    </div>
  );
}
