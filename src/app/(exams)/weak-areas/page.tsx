"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWeakSubjectAreas } from "@/common/hooks/queries";
import type { RetestSession } from "../exams/[courseId]/retest/page";
import { QuestionType } from "@/common/graphql/generated/graphql";

function formatSubject(raw: string): string {
  return raw
    .replace(/^[A-Z]+_/, "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function subjectIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("calculus") || n.includes("derivative") || n.includes("integration")) return "📉";
  if (n.includes("trigon") || n.includes("angle") || n.includes("sine")) return "📐";
  if (n.includes("algebra") || n.includes("equation") || n.includes("math")) return "➗";
  if (n.includes("chem") || n.includes("equilibrium") || n.includes("bonding")) return "⚗️";
  if (n.includes("phys") || n.includes("wave") || n.includes("optic")) return "🌊";
  if (n.includes("english") || n.includes("comprehension")) return "📖";
  if (n.includes("biology") || n.includes("bio")) return "🧬";
  return "📚";
}

function iconBg(accuracy: number) {
  if (accuracy < 50) return "var(--red-lt)";
  return "var(--amber-lt)";
}

function accuracyColor(accuracy: number) {
  if (accuracy < 50) return "var(--red)";
  return "var(--amber)";
}

function fillClass(accuracy: number) {
  if (accuracy < 50) return "pf-red";
  return "pf-amber";
}

function badgeStyle(accuracy: number) {
  if (accuracy < 50) return { background: "#fff0f0", color: "var(--red)", borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 600 };
  return { background: "var(--amber-lt)", color: "var(--amber)", borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 600 };
}

export default function WeakAreasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId") ?? undefined;
  const { getWeakSubjectAreas, data: weakAreas, loading } = useWeakSubjectAreas();

  useEffect(() => {
    getWeakSubjectAreas({ variables: { testId } });
  }, [testId]); // eslint-disable-line react-hooks/exhaustive-deps

  const areas = weakAreas ?? [];

  return (
    <div className="main-wrap">
      <div className="mobile-topbar">
        <span style={{ cursor: "pointer", color: "var(--t3)" }} onClick={() => router.push("/dashboard")}>←</span>
        <span style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700 }}>Weak Areas</span>
        <span />
      </div>

      <div className="top-bar">
        <div className="breadcrumb">
          <span className="bc-link" style={{ cursor: "pointer" }} onClick={() => router.push("/dashboard")}>Dashboard</span>
          <span className="bc-sep">›</span>
          <span className="bc-current">Weak Areas</span>
        </div>
        <div className="top-bar-right">
          <button type="button" className="btn btn-indigo btn-sm" onClick={() => router.push("/dashboard")}>
            ⚡ Start Learning Session
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        <div className="flex-between mb20">
          <div>
            <div className="page-title">🧠 Weak Areas</div>
            <div className="text-sm text-muted mt8">
              AI-identified weak spots with targeted study prescriptions
            </div>
          </div>
          {areas.length > 0 && (
            <div className="ai-card" style={{ maxWidth: 280, padding: "12px 14px" }}>
              <div className="text-xs" style={{ color: "var(--indigo)", fontWeight: 700, marginBottom: 3 }}>
                🧠 AI Learning Path
              </div>
              <div className="text-sm" style={{ color: "var(--indigo)", opacity: 0.85 }}>
                {areas
                  .slice()
                  .sort((a, b) => a.accuracy - b.accuracy)
                  .slice(0, 3)
                  .map((a) => formatSubject(a.subject))
                  .join(" → ")}. Master in this order for max gain.
              </div>
            </div>
          )}
        </div>

        {loading && <div className="text-sm text-muted">Loading…</div>}

        {!loading && areas.length === 0 && (
          <div className="card card-p" style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🎉</div>
            <div style={{ fontWeight: 700, color: "var(--t1)", marginBottom: 6 }}>No weak areas found</div>
            <div className="text-sm text-muted">
              Take more tests and your weak areas will appear here.
            </div>
          </div>
        )}

        {areas.length > 0 && (
          <div className="weak-3col">
            {areas.map((area) => {
              const name = formatSubject(area.subject);
              const pct = Math.round(area.accuracy);
              const errPct = area.total > 0 ? Math.round((area.error_count / area.total) * 100) : 0;
              const drillQuestions = area.questions ?? [];

              function handleDrill() {
                if (drillQuestions.length === 0) return;
                const session: RetestSession = {
                  questions: drillQuestions.map((q) => ({
                    id: q.id,
                    question_number: q.question_number,
                    description: q.description,
                    type: q.type as QuestionType,
                    options: q.options,
                    correct_answer: q.correct_answer,
                    solution_steps: q.solution_steps,
                    difficulty: String(q.difficulty),
                    tags: q.tags?.map(String),
                  })),
                  sourceLabel: `${name} · Weak Area Drill`,
                  returnUrl: "/weak-areas",
                };
                sessionStorage.setItem("retest_session", JSON.stringify(session));
                router.push("/exams/weak-areas/retest");
              }

              return (
                <div className="weak-card" key={area.subject}>
                  <div className="weak-card-top">
                    <div className="weak-head-row">
                      <div className="weak-ico" style={{ background: iconBg(pct) }}>
                        {subjectIcon(name)}
                      </div>
                      <div>
                        <div className="weak-name">{name}</div>
                        <div className="weak-sub">
                          {area.error_count} error{area.error_count !== 1 ? "s" : ""} · {area.total} question{area.total !== 1 ? "s" : ""} attempted
                        </div>
                      </div>
                    </div>

                    <div className="prog-row" style={{ marginBottom: 8 }}>
                      <div className="prog-top">
                        <span className="prog-label text-sm">Current accuracy</span>
                        <span className="prog-pct" style={{ color: accuracyColor(pct) }}>{pct}%</span>
                      </div>
                      <div className="prog-track">
                        <div className={`prog-fill ${fillClass(pct)}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    <div className="flex-row" style={{ gap: 6, flexWrap: "wrap" }}>
                      <span style={badgeStyle(pct)}>{pct < 50 ? "Low accuracy" : "Needs work"}</span>
                      {errPct > 0 && (
                        <span style={badgeStyle(pct)}>{errPct}% error rate</span>
                      )}
                    </div>
                  </div>

                  <div className="weak-card-body">
                    <div className="study-block mb12">
                      <div className="study-block-lbl">📚 Recommended Action</div>
                      <div className="book-row">
                        <div className="book-ico-wrap">📘</div>
                        <div>
                          <div className="book-title">Review {name} fundamentals</div>
                          <div className="book-chapter">
                            Focus on the {area.error_count} questions you got wrong
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="drill-btn"
                      disabled={drillQuestions.length === 0}
                      onClick={handleDrill}
                    >
                      <div className="drill-btn-icon">⚡</div>
                      <div>
                        <div className="drill-btn-title">
                          Start {drillQuestions.length}-Question Drill
                        </div>
                        <div className="drill-btn-meta">Targeted practice · no time limit</div>
                      </div>
                      <div className="drill-btn-arr">›</div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
