"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetTest,
  useGetTestScoreHistory,
  useStudentTestTopicProgress,
} from "@/common/hooks/queries";
import { useStartTest } from "@/common/hooks/mutations";
import { Question } from "@/common/graphql/generated/graphql";

function formatTime(ms: number) {
  if (!ms) return "—";
  const totalMinutes = ms / 60000;
  if (totalMinutes < 60) return `${Math.round(totalMinutes)}m`;
  return `${Math.floor(totalMinutes / 60)}h ${Math.round(totalMinutes % 60)}m`;
}

function calculateTimeUsed(
  events: Array<{ type: string; recorded_at: string }>,
): number {
  let totalMs = 0;
  let segmentStart: number | null = null;
  for (const ev of events) {
    const ts = new Date(ev.recorded_at).getTime();
    if (ev.type === "STARTED" || ev.type === "RESUMED") {
      segmentStart = ts;
    } else if (
      (ev.type === "PAUSED" || ev.type === "ENDED") &&
      segmentStart !== null
    ) {
      totalMs += ts - segmentStart;
      segmentStart = null;
    }
  }
  return totalMs;
}

function formatSubject(raw: string): string {
  return raw
    .replace(/^[A-Z]+_/, "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getWassceGrade(score: number): string {
  if (score >= 75) return "A1";
  if (score >= 70) return "B2";
  if (score >= 65) return "B3";
  if (score >= 60) return "C4";
  if (score >= 55) return "C5";
  if (score >= 50) return "C6";
  if (score >= 45) return "D7";
  if (score >= 40) return "E8";
  return "F9";
}

function getBeceGrade(score: number): string {
  if (score >= 80) return "1";
  if (score >= 70) return "2";
  if (score >= 60) return "3";
  if (score >= 50) return "4";
  if (score >= 40) return "5";
  if (score >= 30) return "6";
  if (score >= 20) return "7";
  if (score >= 10) return "8";
  return "9";
}

function getGrade(score: number, category: string | null | undefined): { grade: string; label: string } {
  if (category?.includes("BECE")) {
    return { grade: getBeceGrade(score), label: "BECE Grade" };
  }
  return { grade: getWassceGrade(score), label: "WAEC Grade" };
}

export default function ExamResultPage() {
  const { courseId, testId } = useParams<{
    courseId: string;
    testId: string;
  }>();
  const router = useRouter();
  const { getTest, data: testData, loading } = useGetTest();
  const { getTestScoreHistory, data: scoreHistory } = useGetTestScoreHistory();
  const { getStudentTestTopicProgress, data: topicProgress } =
    useStudentTestTopicProgress();
  const { startTest, loading: startingTest } = useStartTest();

  useEffect(() => {
    getTest({ variables: { testId } });
    getTestScoreHistory({ variables: { testId } });
    getStudentTestTopicProgress({ variables: { testId } });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submittedAnswers = testData?.submitted_answers ?? [];
  const questions = (
    (testData?.test_suite?.questions ?? []) as Question[]
  ).sort((a, b) => a.question_number - b.question_number);
  const totalQuestions = questions.length;
  const correctCount = submittedAnswers.filter((a) => a.is_correct).length;
  const wrongCount = totalQuestions - correctCount;
  const scorePct =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = scorePct >= 50;
  const { grade: examGrade, label: gradeLabel } = getGrade(scorePct, testData?.course_category);

  const timeUsedMs = calculateTimeUsed(testData?.time_events ?? []);

  const circumference = 414.7;
  const ringOffset = circumference - (scorePct / 100) * circumference;

  const [animatedOffset, setAnimatedOffset] = useState(circumference);
  useEffect(() => {
    const id = setTimeout(() => setAnimatedOffset(ringOffset), 50);
    return () => clearTimeout(id);
  }, [ringOffset]);

  const sortedHistory = scoreHistory
    ? [...scoreHistory].sort(
        (a, b) =>
          new Date(a.date_taken).getTime() - new Date(b.date_taken).getTime(),
      )
    : [];
  const currentHistoryIdx = sortedHistory.findIndex((h) => h.test_id === testId);
  const prevEntry =
    currentHistoryIdx > 0 ? sortedHistory[currentHistoryIdx - 1] : null;
  const trendDiff =
    prevEntry !== null ? Math.round(scorePct - prevEntry.score) : null;
  const trendUp = trendDiff !== null && trendDiff >= 0;

  const sortedTopics = topicProgress
    ? [...topicProgress].sort((a, b) => b.score - a.score)
    : [];
  const topSubjects = sortedTopics.slice(0, 3);
  const weakSubjects = sortedTopics.filter((s) => s.score < 60).slice(0, 3);

  const maxHistoryScore =
    sortedHistory.length > 0
      ? Math.max(...sortedHistory.map((h) => h.score))
      : 100;

  const handleRetake = async () => {
    const suiteId = testData?.test_suite?.id;
    const mode = testData?.mode;
    if (!suiteId) return;
    try {
      const response = await startTest({ variables: { suiteId, mode } });
      const newTestId = response.data?.startTest.id;
      if (newTestId) {
        sessionStorage.setItem("activeCourseId", courseId);
        router.push(`/exams/${courseId}/${newTestId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div
        className="main-wrap"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="text-sm text-muted">Loading results…</div>
      </div>
    );
  }

  return (
    <div className="main-wrap">
      <div className="mobile-topbar">
        <span
          style={{ cursor: "pointer", color: "var(--t3)" }}
          onClick={() => router.push("/dashboard")}
        >
          ←
        </span>
        <span
          style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700 }}
        >
          Results
        </span>
        <span />
      </div>

      <div className="top-bar">
        <div className="breadcrumb">
          <span
            className="bc-link"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </span>
          <span className="bc-sep">›</span>
          <span className="bc-current">Results</span>
        </div>
        <div className="top-bar-right">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => router.push(`/exams/${courseId}/${testId}/review`)}
          >
            📋 Review Answers
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => router.push(`/weak-areas?testId=${testId}`)}
          >
            🧠 Weak Areas
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        <div className="results-3col">
          {/* ── Left: Score card ── */}
          <div className="results-left">
            <div className="score-card">
              <div
                className="score-eyebrow"
                title={testData?.test_suite?.title ?? "Exam Results"}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {testData?.test_suite?.title ?? "Exam Results"}
              </div>
              <div
                className="score-ring-wrap"
                style={{ display: "block", width: 160, margin: "0 auto" }}
              >
                <svg width={160} height={160} viewBox="0 0 160 160">
                  <circle
                    cx={80}
                    cy={80}
                    r={66}
                    fill="none"
                    stroke="rgba(255,255,255,.15)"
                    strokeWidth={12}
                  />
                  <circle
                    cx={80}
                    cy={80}
                    r={66}
                    fill="none"
                    stroke="white"
                    strokeWidth={12}
                    strokeLinecap="round"
                    transform="rotate(-90 80 80)"
                    strokeDasharray={circumference}
                    strokeDashoffset={animatedOffset}
                    style={{
                      strokeDashoffset: animatedOffset,
                      transition:
                        "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </svg>
                <div className="score-label-abs">
                  <div className="score-big">{scorePct}</div>
                  <div className="score-unit">/ 100</div>
                </div>
              </div>
              <div className={`score-tag ${passed ? "pass" : "fail"}`}>
                {passed ? "✅ Pass" : "❌ Fail"}
              </div>
              {trendDiff !== null ? (
                <div className="score-trend mt8">
                  <span style={trendUp ? undefined : { color: "#fca5a5" }}>
                    {trendUp ? "↑" : "↓"} {trendDiff > 0 ? "+" : ""}{Math.round(trendDiff)}%
                  </span>{" "}
                  from your last attempt
                </div>
              ) : (
                <div className="score-trend mt8">First attempt</div>
              )}
            </div>

            <div className="results-meta-grid">
              <div className="res-meta-card">
                <div className="res-meta-val" style={{ color: "var(--green)" }}>
                  {correctCount}
                </div>
                <div className="res-meta-lbl">Correct</div>
              </div>
              <div className="res-meta-card">
                <div className="res-meta-val" style={{ color: "var(--red)" }}>
                  {wrongCount}
                </div>
                <div className="res-meta-lbl">Wrong</div>
              </div>
              <div className="res-meta-card">
                <div className="res-meta-val">{formatTime(timeUsedMs)}</div>
                <div className="res-meta-lbl">Time Used</div>
              </div>
              <div className="res-meta-card">
                <div
                  className="res-meta-val"
                  style={{ color: passed ? "var(--green)" : "var(--red)" }}
                >
                  {examGrade}
                </div>
                <div className="res-meta-lbl">{gradeLabel}</div>
              </div>
            </div>

            <div
              className="btn-row"
              style={{ flexDirection: "column", gap: 8 }}
            >
              <button
                type="button"
                className="btn btn-secondary btn-full"
                onClick={() =>
                  router.push(`/exams/${courseId}/${testId}/review`)
                }
              >
                📋 Review Answers
              </button>
              <button
                type="button"
                className="btn btn-indigo btn-full"
                onClick={() => router.push(`/weak-areas?testId=${testId}`)}
              >
                🧠 Focus on Weak Areas →
              </button>
              {courseId !== "_" && (
                <button
                  type="button"
                  className="btn btn-ghost btn-full"
                  onClick={handleRetake}
                  disabled={startingTest || !testData?.test_suite?.id}
                >
                  {startingTest ? "Starting…" : "🔁 Retake Test"}
                </button>
              )}
            </div>
          </div>

          {/* ── Center: Performance + AI + History ── */}
          <div className="results-center">
            <div className="section-title">📊 Performance Breakdown</div>
            <div className="card card-p" style={{ marginBottom: 16 }}>
              {(!topicProgress || topicProgress.length === 0) && (
                <div className="text-sm text-muted">No topic data yet.</div>
              )}
              {topicProgress?.map((item) => {
                const pct = Math.round(item.score);
                const colorVar =
                  pct >= 70
                    ? "var(--green)"
                    : pct >= 50
                      ? "var(--amber)"
                      : "var(--red)";
                return (
                  <div className="prog-row" key={item.topic}>
                    <div className="prog-top">
                      <span className="prog-label">
                        {formatSubject(item.topic)}
                      </span>
                      <span className="prog-pct" style={{ color: colorVar }}>
                        {pct}%
                      </span>
                    </div>
                    <div className="prog-track">
                      <div
                        className="prog-fill"
                        style={{
                          width: `${pct}%`,
                          background:
                            pct >= 70
                              ? "#10b981"
                              : pct >= 50
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="ai-card"
              style={{
                marginBottom: 16,
                background: "#eef2ff",
                border: "1px solid #c7d2fe",
              }}
            >
              <div className="badge badge-indigo mb8">🧠 AI Analysis</div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#4338ca",
                  marginBottom: 5,
                }}
              >
                {passed ? "Great performance!" : "Room to improve"}
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 500,
                  color: "#4338ca",
                  lineHeight: 1.6,
                }}
              >
                {passed
                  ? `You scored ${scorePct}% (${examGrade}). Your strongest subjects led the way. Keep practising your weak areas to push higher.`
                  : `You scored ${scorePct}% (${examGrade}). Focus on the subjects in your Needs Work list. A targeted revision session will make a big difference.`}
              </div>
            </div>

            {sortedHistory.length > 0 && (
              <>
                <div className="section-title">📈 Score History</div>
                <div className="card card-p" style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {sortedHistory.map((item) => {
                      const barHeight =
                        maxHistoryScore > 0
                          ? (item.score / maxHistoryScore) * 72
                          : 4;
                      const isCurrent = item.test_id === testId;
                      return (
                        <div
                          key={item.test_id}
                          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
                          title={`${item.course_title} — ${Math.round(item.score)}% on ${new Date(item.date_taken).toLocaleDateString()}`}
                        >
                          {/* fixed-height bar zone — bars grow from the bottom */}
                          <div style={{ height: 72, display: "flex", alignItems: "flex-end", width: "100%" }}>
                            <div
                              style={{
                                width: "100%",
                                height: barHeight,
                                borderRadius: 4,
                                background: isCurrent ? "#1e3a8a" : "#bfdbfe",
                                transition: "height 0.6s ease",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: isCurrent ? "#1e3a8a" : "var(--t3)",
                              fontWeight: isCurrent ? 700 : 400,
                              textAlign: "center",
                            }}
                          >
                            {Math.round(item.score)}%
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              color: isCurrent ? "#1e3a8a" : "var(--t3)",
                              textAlign: "center",
                              fontWeight: isCurrent ? 600 : 400,
                            }}
                          >
                            {new Date(item.date_taken).toLocaleDateString(
                              undefined,
                              { month: "short", day: "numeric" },
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Right: Topics + Next Steps ── */}
          <div className="results-right">
            {topSubjects.length > 0 && (
              <>
                <div className="section-title">🏆 Top Correct Topics</div>
                <div className="card card-sm mb16">
                  {topSubjects.map((item, idx) => (
                    <div
                      key={formatSubject(item.topic)}
                      className="flex-between"
                      style={{
                        padding: "8px 0",
                        borderBottom:
                          idx < topSubjects.length - 1
                            ? "1px solid var(--border)"
                            : undefined,
                        fontSize: 13,
                      }}
                    >
                      <span>{formatSubject(item.topic)}</span>
                      <span className="badge badge-green">
                        {Math.round(item.score)}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {weakSubjects.length > 0 && (
              <>
                <div className="section-title">⚠️ Needs Work</div>
                <div className="card card-sm mb16">
                  {weakSubjects.map((item, idx) => (
                    <div
                      key={formatSubject(item.topic)}
                      className="flex-between"
                      style={{
                        padding: "8px 0",
                        borderBottom:
                          idx < weakSubjects.length - 1
                            ? "1px solid var(--border)"
                            : undefined,
                        fontSize: 13,
                      }}
                    >
                      <span>{formatSubject(item.topic)}</span>
                      <span
                        className={`badge ${item.score < 50 ? "badge-red" : "badge-amber"}`}
                      >
                        {Math.round(item.score)}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="section-title">⚡ Next Steps</div>
            <div
              className="ai-card"
              style={{ background: "#eef2ff", border: "1px solid #c7d2fe" }}
            >
              <div className="badge badge-indigo mb8">Recommended</div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#4338ca",
                  marginBottom: 5,
                }}
              >
                {passed ? "Keep the momentum" : "Focused revision needed"}
              </div>
              <div
                className="text-sm"
                style={{
                  color: "#4338ca",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                {passed
                  ? "You passed! Take another suite to keep improving your score."
                  : "Review the wrong answers and retake to strengthen weak areas."}
              </div>
              <button
                type="button"
                className="btn btn-indigo btn-sm btn-full"
                onClick={() => router.push("/dashboard")}
              >
                {passed ? "Take Next Suite →" : "Go to Dashboard →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
