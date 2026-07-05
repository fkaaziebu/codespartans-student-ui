"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Question, QuestionType } from "@/common/graphql/generated/graphql";
import { useGetTest } from "@/common/hooks/queries";
import type { RetestSession } from "../../retest/page";

const OPTION_LABELS = ["A", "B", "C", "D", "E"];

type FilterType = "all" | "correct" | "wrong";

export default function ReviewAnswersPage() {
  const { courseId, testId } = useParams<{
    courseId: string;
    testId: string;
  }>();
  const router = useRouter();
  const { getTest, data: testData, loading } = useGetTest();
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    getTest({ variables: { testId } });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submittedAnswers = testData?.submitted_answers ?? [];
  const questions = (
    (testData?.test_suite?.questions ?? []) as Question[]
  ).sort((a, b) => a.question_number - b.question_number);

  const enriched = questions.map((q, i) => {
    const attempt = submittedAnswers.find((a) => a.question_id === q.id);
    const wasAnswered = !!attempt?.answer_provided;
    const isCorrect = attempt?.is_correct ?? false;
    return { q, attempt, isCorrect, wasAnswered, idx: i };
  });

  const filtered = enriched.filter((item) => {
    if (filter === "correct") return item.isCorrect;
    if (filter === "wrong") return !item.isCorrect;
    return true;
  });

  const selected = selectedIdx !== null ? enriched[selectedIdx] : null;

  function handleRetest() {
    const session: RetestSession = {
      questions: filtered.map(({ q }) => ({
        id: q.id,
        question_number: q.question_number,
        description: q.description,
        type: q.type,
        options: q.options,
        correct_answer: q.correct_answer,
        solution_steps: q.solution_steps,
        difficulty: q.difficulty,
        tags: q.tags,
      })),
      sourceLabel:
        filter === "all"
          ? "All Questions"
          : filter === "correct"
            ? "Correct Questions"
            : "Wrong Questions",
      returnUrl: `/exams/${courseId}/${testId}/review`,
    };
    sessionStorage.setItem("retest_session", JSON.stringify(session));
    router.push(`/exams/${courseId}/retest`);
  }

  if (loading) {
    return (
      <div
        className="main-wrap"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="text-sm text-muted">Loading review…</div>
      </div>
    );
  }

  return (
    <div className="main-wrap" style={{ overflow: "hidden", height: "100vh" }}>
      <div className="mobile-topbar">
        <span
          style={{ cursor: "pointer", color: "var(--t3)" }}
          onClick={() => router.push(`/exams/${courseId}/${testId}/result`)}
        >
          ←
        </span>
        <span
          style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700 }}
        >
          Review
        </span>
        <span />
      </div>

      <div className="top-bar">
        <div className="breadcrumb">
          <span
            className="bc-link"
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/exams/${courseId}/${testId}/result`)}
          >
            Results
          </span>
          <span className="bc-sep">›</span>
          <span className="bc-current">Answer Review</span>
        </div>
      </div>

      <div className="review-shell" style={{ flex: 1, overflow: "hidden" }}>
        {/* ── Left: question list ── */}
        <div className="review-list-panel">
          <div className="review-list-header">
            <span className="label-sm">Questions</span>
            <span className="text-xs text-muted">{questions.length} total</span>
          </div>

          <div className="review-filter-row">
            {(["all", "correct", "wrong"] as FilterType[]).map((f) => (
              <button
                key={f}
                className={`rev-filter${filter === f ? " act" : ""}`}
                onClick={() => {
                  setFilter(f);
                  setSelectedIdx(null);
                }}
              >
                {f === "all"
                  ? "All"
                  : f === "correct"
                    ? "✓ Correct"
                    : "✗ Wrong"}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{
                marginLeft: "auto",
                padding: "4px 12px",
                fontSize: 12,
                borderRadius: 20,
                flexShrink: 0,
              }}
              disabled={filtered.length === 0}
              onClick={handleRetest}
            >
              ⟳ Retest
            </button>
          </div>

          <div id="rev-list">
            {filtered.map(({ q, isCorrect, idx }) => (
              <div
                key={q.id}
                className={`rev-list-item${isCorrect ? " correct" : " wrong"}${selectedIdx === idx ? " sel" : ""}`}
                onClick={() => setSelectedIdx(idx)}
              >
                <span className="rev-item-num">{q.question_number}</span>
                <span className="rev-item-text">{q.description}</span>
                <span
                  className={`rev-status-dot ${isCorrect ? "dot-correct" : "dot-wrong"}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: detail panel ── */}
        <div className="review-detail-panel" id="rev-detail">
          {selected === null ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                color: "var(--t4)",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>←</div>
              <div
                style={{ fontSize: 14, fontWeight: 600, color: "var(--t3)" }}
              >
                Select a question to view details
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {/* Scrollable: header + question text + solution */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "24px 28px 16px",
                  minHeight: 0,
                }}
              >
                {/* Question header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <span className="label-sm">
                    Q{selected.q.question_number}
                  </span>
                  {selected.isCorrect ? (
                    <span
                      className="badge"
                      style={{
                        background: "var(--green-lt,#f0fff4)",
                        color: "var(--green)",
                      }}
                    >
                      ✓ Correct
                    </span>
                  ) : selected.wasAnswered ? (
                    <span
                      className="badge"
                      style={{ background: "#fff0f0", color: "var(--red)" }}
                    >
                      ✗ Wrong
                    </span>
                  ) : (
                    <span
                      className="badge"
                      style={{ background: "var(--bg2)", color: "var(--t3)" }}
                    >
                      Skipped
                    </span>
                  )}
                  {selected.attempt?.is_flagged && (
                    <span className="badge badge-amber">🚩 Flagged</span>
                  )}
                  <span
                    className="text-xs text-muted"
                    style={{ marginLeft: "auto" }}
                  >
                    {selected.q.difficulty}
                  </span>
                </div>

                {/* Question text */}
                <div
                  className="q-text"
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--t1)",
                    marginBottom: 20,
                    lineHeight: 1.6,
                  }}
                >
                  <ReactMarkdown>{selected.q.description}</ReactMarkdown>
                </div>

                {/* Solution steps */}
                {selected.q.solution_steps &&
                  selected.q.solution_steps.length > 0 && (
                    <div className="card card-p" style={{ marginTop: 4 }}>
                      <div
                        className="text-sm fw7"
                        style={{ color: "var(--blue)", marginBottom: 8 }}
                      >
                        📖 Solution
                      </div>
                      <ol style={{ paddingLeft: 20, margin: 0 }}>
                        {selected.q.solution_steps.map((step, i) => (
                          <li
                            key={i}
                            className="text-sm"
                            style={{
                              color: "var(--t2)",
                              marginBottom: 6,
                              lineHeight: 1.6,
                            }}
                          >
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
              </div>

              {/* Pinned: options + navigation */}
              <div
                style={{
                  flexShrink: 0,
                  overflowY: "auto",
                  maxHeight: "50%",
                  padding: "16px 28px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {selected.q.type === QuestionType.MultipleSelect && (
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
                {/* Options / Fill-in */}
                <div style={{ marginBottom: 12 }}>
                  {selected.q.type === QuestionType.FillIn ||
                  selected.q.type === QuestionType.ShortAnswer ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          padding: "10px 14px",
                          borderRadius: 8,
                          background: selected.isCorrect
                            ? "var(--green-lt,#f0fff4)"
                            : selected.wasAnswered
                              ? "#fff0f0"
                              : "var(--bg2)",
                          color: selected.isCorrect
                            ? "var(--green)"
                            : selected.wasAnswered
                              ? "var(--red)"
                              : "var(--t3)",
                          border: `1px solid ${selected.isCorrect ? "var(--green)" : selected.wasAnswered ? "var(--red)" : "var(--border)"}`,
                          fontSize: 14,
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>Your answer: </span>
                        {selected.attempt?.answer_provided || (
                          <em style={{ color: "var(--t3)" }}>No answer</em>
                        )}
                      </div>
                      {!selected.isCorrect && (
                        <div
                          style={{
                            padding: "10px 14px",
                            borderRadius: 8,
                            background: "var(--green-lt,#f0fff4)",
                            color: "var(--green)",
                            border: "1px solid var(--green)",
                            fontSize: 14,
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>
                            Correct answer:{" "}
                          </span>
                          {selected.q.correct_answer}
                        </div>
                      )}
                    </div>
                  ) : (
                    selected.q.options?.map((option, i) => {
                      const isSelected =
                        selected.q.type === QuestionType.MultipleSelect
                          ? (
                              selected.attempt?.answer_provided?.split(",") ??
                              []
                            ).includes(option)
                          : selected.attempt?.answer_provided === option;
                      const isAnswer =
                        selected.q.type === QuestionType.MultipleSelect
                          ? (
                              selected.q.correct_answer?.split(",") ?? []
                            ).includes(option)
                          : selected.q.correct_answer === option;
                      let bg = "transparent";
                      let color = "var(--t2)";
                      if (isAnswer) {
                        bg = "var(--green-lt,#f0fff4)";
                        color = "var(--green)";
                      } else if (isSelected) {
                        bg = "#fff0f0";
                        color = "var(--red)";
                      }

                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 12px",
                            borderRadius: 8,
                            marginBottom: 6,
                            background: bg,
                            color,
                            border: `1px solid ${isAnswer ? "var(--green)" : isSelected ? "var(--red)" : "var(--border)"}`,
                          }}
                        >
                          <div
                            className="opt-bubble"
                            style={{
                              background: isAnswer
                                ? "var(--green)"
                                : isSelected
                                  ? "var(--red)"
                                  : "var(--bg2)",
                              color:
                                isAnswer || isSelected ? "#fff" : "var(--t2)",
                            }}
                          >
                            {OPTION_LABELS[i]}
                          </div>
                          <div style={{ fontSize: 14, flex: 1 }}>{option}</div>
                          {isAnswer && (
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: "var(--green)",
                              }}
                            >
                              ✓ Answer
                            </span>
                          )}
                          {isSelected && !isAnswer && (
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: "var(--red)",
                              }}
                            >
                              Your pick
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    disabled={selectedIdx === 0}
                    onClick={() =>
                      setSelectedIdx((i) => (i !== null && i > 0 ? i - 1 : i))
                    }
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    disabled={selectedIdx === enriched.length - 1}
                    onClick={() =>
                      setSelectedIdx((i) =>
                        i !== null && i < enriched.length - 1 ? i + 1 : i,
                      )
                    }
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
