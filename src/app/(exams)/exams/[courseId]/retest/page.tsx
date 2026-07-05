"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { QuestionType } from "@/common/graphql/generated/graphql";

const OPTION_LABELS = ["A", "B", "C", "D", "E"];

interface RetestQuestion {
  id: string;
  question_number: number;
  description: string;
  type: QuestionType;
  options?: string[] | null;
  correct_answer?: string | null;
  solution_steps?: string[] | null;
  difficulty?: string | null;
  tags?: string[] | null;
  class_level?: string | null;
  exam_year?: string | null;
}

export interface RetestSession {
  questions: RetestQuestion[];
  sourceLabel: string;
  returnUrl: string;
}

function scoreQuestion(q: RetestQuestion, given: string | undefined): boolean {
  if (!given || !q.correct_answer) return false;
  if (q.type === QuestionType.MultipleSelect) {
    const a = given.split(",").sort();
    const c = q.correct_answer.split(",").sort();
    return a.length === c.length && a.every((v, i) => v === c[i]);
  }
  if (q.type === QuestionType.FillIn || q.type === QuestionType.ShortAnswer) {
    return given.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
  }
  return given === q.correct_answer;
}

export default function RetestPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();

  const [session, setSession] = useState<RetestSession | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const fillInRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("retest_session");
    if (!raw) {
      router.replace("/exams");
      return;
    }
    try {
      setSession(JSON.parse(raw) as RetestSession);
    } catch {
      router.replace("/exams");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock app shell to viewport during taking
  useEffect(() => {
    if (isFinished) return;
    const shell = document.querySelector(".app-shell") as HTMLElement | null;
    if (shell) {
      shell.style.height = "100vh";
      shell.style.overflow = "hidden";
    }
    return () => {
      if (shell) {
        shell.style.height = "";
        shell.style.overflow = "";
      }
    };
  }, [isFinished]);

  // Focus fill-in input when question changes
  useEffect(() => {
    if (!session || isFinished) return;
    if (
      session.questions[currentIdx]?.type === QuestionType.FillIn ||
      session.questions[currentIdx]?.type === QuestionType.ShortAnswer
    ) {
      setTimeout(() => fillInRef.current?.focus(), 0);
    }
  }, [currentIdx, session, isFinished]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!session || isFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement;
      const q = session.questions[currentIdx];
      // Allow arrow keys in fill-in inputs for navigation feel, block others
      if (
        isInput &&
        q?.type !== QuestionType.FillIn &&
        q?.type !== QuestionType.ShortAnswer
      )
        return;
      if (
        isInput &&
        q?.type !== QuestionType.FillIn &&
        q?.type !== QuestionType.ShortAnswer &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight"
      )
        return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (currentIdx > 0) {
            const saved =
              selectedAnswer !== null
                ? { ...answers, [q.id]: selectedAnswer }
                : answers;
            setAnswers(saved);
            const prevIdx = currentIdx - 1;
            setCurrentIdx(prevIdx);
            setSelectedAnswer(saved[session.questions[prevIdx].id] ?? null);
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          {
            const saved =
              selectedAnswer !== null
                ? { ...answers, [q.id]: selectedAnswer }
                : answers;
            setAnswers(saved);
            if (currentIdx >= session.questions.length - 1) {
              setIsFinished(true);
            } else {
              const nextIdx = currentIdx + 1;
              setCurrentIdx(nextIdx);
              setSelectedAnswer(saved[session.questions[nextIdx].id] ?? null);
            }
          }
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5": {
          if (
            q?.type === QuestionType.FillIn ||
            q?.type === QuestionType.ShortAnswer
          )
            break;
          const optIdx = parseInt(e.key) - 1;
          const opt = q?.options?.[optIdx];
          if (opt === undefined) break;
          if (q?.type === QuestionType.MultipleSelect) {
            const parts = selectedAnswer ? selectedAnswer.split(",") : [];
            const pos = parts.indexOf(opt);
            if (pos >= 0) parts.splice(pos, 1);
            else parts.push(opt);
            setSelectedAnswer(parts.length > 0 ? parts.join(",") : null);
          } else {
            setSelectedAnswer(opt);
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [session, currentIdx, answers, selectedAnswer, isFinished]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!session) {
    return (
      <div
        className="main-wrap"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="text-sm text-muted">Loading…</div>
      </div>
    );
  }

  const { questions, sourceLabel, returnUrl } = session;
  const total = questions.length;
  const currentQ = questions[currentIdx];
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === total - 1;
  const progressPct = ((currentIdx + 1) / total) * 100;

  // Effective answers includes unsaved current selection
  const effectiveAnswers =
    selectedAnswer !== null
      ? { ...answers, [currentQ.id]: selectedAnswer }
      : answers;
  const answeredCount = Object.keys(effectiveAnswers).length;

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleSelectOption = (option: string) => {
    if (currentQ.type === QuestionType.MultipleSelect) {
      const parts = selectedAnswer ? selectedAnswer.split(",") : [];
      const pos = parts.indexOf(option);
      if (pos >= 0) parts.splice(pos, 1);
      else parts.push(option);
      setSelectedAnswer(parts.length > 0 ? parts.join(",") : null);
    } else {
      setSelectedAnswer(option);
    }
  };

  const saveAndAdvance = (direction: "next" | "prev" | "finish" | number) => {
    const saved =
      selectedAnswer !== null
        ? { ...answers, [currentQ.id]: selectedAnswer }
        : answers;
    setAnswers(saved);

    if (direction === "finish") {
      setIsFinished(true);
      return;
    }
    const targetIdx =
      typeof direction === "number"
        ? direction
        : direction === "next"
          ? currentIdx + 1
          : currentIdx - 1;
    setCurrentIdx(targetIdx);
    setSelectedAnswer(saved[questions[targetIdx].id] ?? null);
  };

  // ── Results view ──────────────────────────────────────────────────────────────

  if (isFinished) {
    const results = questions.map((q) => {
      const given = effectiveAnswers[q.id];
      return { q, given, isCorrect: scoreQuestion(q, given) };
    });
    const correctCount = results.filter((r) => r.isCorrect).length;
    const scorePct = Math.round((correctCount / total) * 100);
    const passed = scorePct >= 50;

    return (
      <div className="main-wrap">
        <div className="mobile-topbar">
          <span
            style={{ cursor: "pointer", color: "var(--t3)" }}
            onClick={() => router.push(returnUrl)}
          >
            ←
          </span>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Retest Results
          </span>
          <span />
        </div>

        <div className="top-bar">
          <div className="breadcrumb">
            <span
              className="bc-link"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(returnUrl)}
            >
              {returnUrl.includes("weak-areas") ? "Weak Areas" : "Review"}
            </span>
            <span className="bc-sep">›</span>
            <span className="bc-current">Retest Results</span>
          </div>
        </div>

        <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 20px" }}>
          {/* Score card */}
          <div className="card card-p mb20" style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--t3)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 12,
              }}
            >
              {sourceLabel} · Practice Retest
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: passed ? "var(--green)" : "var(--red)",
                lineHeight: 1,
              }}
            >
              {scorePct}%
            </div>
            <div style={{ fontSize: 14, color: "var(--t3)", marginTop: 8 }}>
              {correctCount} of {total} correct
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                gap: 8,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => router.push(returnUrl)}
              >
                ←{" "}
                {returnUrl.includes("weak-areas")
                  ? "Back to Weak Areas"
                  : "Back to Review"}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setAnswers({});
                  setSelectedAnswer(null);
                  setCurrentIdx(0);
                  setIsFinished(false);
                }}
              >
                ⟳ Retry
              </button>
            </div>
          </div>

          {/* Per-question breakdown */}
          <div className="section-title">Question Breakdown</div>
          <div className="card card-sm">
            {results.map(({ q, given, isCorrect }, idx) => (
              <div
                key={q.id}
                style={{
                  padding: "10px 0",
                  borderBottom:
                    idx < results.length - 1
                      ? "1px solid var(--border)"
                      : undefined,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                }}
              >
                <span className="rev-item-num">{q.question_number}</span>
                <span
                  style={{
                    flex: 1,
                    color: "var(--t2)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {q.description}
                </span>
                <span
                  className={`badge ${isCorrect ? "badge-green" : given ? "badge-red" : "badge-amber"}`}
                >
                  {isCorrect ? "✓" : given ? "✗" : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Taking view ───────────────────────────────────────────────────────────────

  return (
    <div className="main-wrap" style={{ overflow: "hidden", height: "100vh" }}>
      {/* Mobile topbar */}
      <div className="mobile-topbar">
        <span
          style={{ cursor: "pointer", color: "var(--t3)" }}
          onClick={() => router.push(returnUrl)}
        >
          ←
        </span>
        <span
          style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700 }}
        >
          Retest
        </span>
        <span style={{ fontSize: 13, color: "var(--t3)" }}>
          {currentIdx + 1}/{total}
        </span>
      </div>

      <div className="exam-shell" style={{ flex: 1, overflow: "hidden" }}>
        {/* ── Left Q Navigator ── */}
        <div className="exam-nav-panel">
          <div className="exam-nav-header">Questions</div>
          <div className="exam-nav-body">
            <div className="q-grid">
              {questions.map((q, i) => {
                const isAnswered = !!effectiveAnswers[q.id];
                const isCurrent = i === currentIdx;
                let cellClass = "q-cell";
                if (isCurrent) cellClass += " current";
                else if (isAnswered) cellClass += " answered";
                return (
                  <div
                    key={q.id}
                    className={cellClass}
                    title={`Q${q.question_number}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => saveAndAdvance(i)}
                  >
                    {q.question_number}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="exam-legend">
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ background: "var(--blue)" }}
              />
              Answered
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ background: "var(--border)" }}
              />
              Unanswered
            </div>
          </div>
        </div>

        {/* ── Center Question ── */}
        <div className="exam-center">
          <div className="exam-topbar">
            <div>
              <div
                style={{ fontSize: 14, fontWeight: 700, color: "var(--t1)" }}
              >
                {sourceLabel} · Retest
              </div>
              <div
                className="exam-section-badge"
                style={{ marginTop: 4, marginBottom: 0 }}
              >
                Practice Mode
              </div>
            </div>
          </div>

          <div className="exam-prog-outer">
            <div
              className="exam-prog-inner"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="exam-q-area">
            {/* Scrollable description */}
            <div className="exam-q-desc">
              <div className="q-num-label">
                Question {currentIdx + 1} of {total}
                {currentQ.tags && currentQ.tags.length > 0 && (
                  <>
                    &nbsp;·&nbsp;
                    {currentQ.tags[0]
                      .replace(/^[A-Z]+_/, "")
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </>
                )}
                {currentQ.class_level && (
                  <>&nbsp;·&nbsp;{currentQ.class_level}</>
                )}
                {currentQ.exam_year && <>&nbsp;·&nbsp;{currentQ.exam_year}</>}
              </div>
              <div className="q-text">
                <ReactMarkdown>{currentQ.description}</ReactMarkdown>
              </div>
            </div>

            {/* Pinned options */}
            <div className="exam-q-options">
              {currentQ.type === QuestionType.MultipleSelect && (
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--t3)",
                    marginBottom: 8,
                    fontStyle: "italic",
                  }}
                >
                  Select all that apply
                </div>
              )}
              <div>
                {currentQ.type === QuestionType.FillIn ||
                currentQ.type === QuestionType.ShortAnswer ? (
                  <input
                    ref={fillInRef}
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: 15,
                      borderRadius: "var(--r)",
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      color: "var(--t1)",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    placeholder="Type your answer here…"
                    value={selectedAnswer ?? ""}
                    onChange={(e) => setSelectedAnswer(e.target.value || null)}
                  />
                ) : (
                  currentQ.options?.map((option, i) => {
                    const isSelected =
                      currentQ.type === QuestionType.MultipleSelect
                        ? (selectedAnswer?.split(",") ?? []).includes(option)
                        : selectedAnswer === option;
                    return (
                      <div
                        key={i}
                        className={`option${isSelected ? " sel" : ""}`}
                        tabIndex={0}
                        onClick={() => handleSelectOption(option)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSelectOption(option)
                        }
                      >
                        <div className="opt-bubble">
                          {currentQ.type === QuestionType.MultipleSelect &&
                          isSelected
                            ? "✓"
                            : OPTION_LABELS[i]}
                        </div>
                        <div className="opt-text" style={{ flex: 1 }}>
                          {option}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="exam-bottom-bar">
            <div className="kb-hint">
              Keyboard: <span className="kb-key">←</span>
              <span className="kb-key">→</span> navigate &nbsp;
              <span className="kb-key">1</span>–
              <span className="kb-key">4</span> select
            </div>
            <div className="flex-row">
              <button
                disabled={isFirst}
                className="btn btn-ghost btn-sm"
                onClick={() => saveAndAdvance("prev")}
              >
                ← Prev
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => saveAndAdvance(isLast ? "finish" : "next")}
              >
                {isLast ? "Finish →" : "Next →"}
              </button>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="mobile-exam-controls">
            <div className="flex-row">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => saveAndAdvance("prev")}
              >
                ←
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => saveAndAdvance(isLast ? "finish" : "next")}
              >
                {isLast ? "Finish →" : "Next →"}
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Controls Panel ── */}
        <div className="exam-right-panel">
          <div className="label-sm mb8">Progress</div>
          <div className="exam-stat-mini">
            <span className="text-muted">Answered</span>
            <span className="fw7 text-green">{answeredCount}</span>
          </div>
          <div className="exam-stat-mini">
            <span className="text-muted">Remaining</span>
            <span className="fw7">{total - answeredCount}</span>
          </div>
          <button
            className="btn btn-danger btn-sm btn-full mt8"
            onClick={() => saveAndAdvance("finish")}
          >
            ⬛ Finish Retest
          </button>
        </div>
      </div>
    </div>
  );
}
