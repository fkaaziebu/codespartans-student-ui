"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  QuestionType,
  TestModeType,
  TestStatusType,
} from "@/common/graphql/generated/graphql";
import { formatCountdown, formatTimeRange } from "@/common/helpers";
import {
  useEndTest,
  usePauseTest,
  useResumeTest,
  useSubmitAnswer,
} from "@/common/hooks/mutations";
import { useGetTest, useStudentProfile } from "@/common/hooks/queries";
import { useTestCountdown } from "@/common/hooks/use-test-countdown";

type Question = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<ReturnType<typeof useGetTest>["data"]>["test_suite"]
    >["questions"]
  >[number]
>;

const OPTION_LABELS = ["A", "B", "C", "D", "E"];

export default function ExamTakingPage() {
  const { courseId, testId } = useParams<{
    courseId: string;
    testId: string;
  }>();
  const router = useRouter();

  // ── Data hooks ──────────────────────────────────────────────────────────────
  const { studentProfile } = useStudentProfile();
  const { getTest, data: testData } = useGetTest();
  const { submitAnswer } = useSubmitAnswer();
  const { pauseTest } = usePauseTest();
  const { resumeTest } = useResumeTest();
  const { endTest } = useEndTest();

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [currentQuestion, setCurrentQuestion] = useState<
    Question | undefined
  >();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [localAnswersMap, setLocalAnswersMap] = useState<Map<string, string>>(
    new Map(),
  );
  const [submittedLearningAnswers, setSubmittedLearningAnswers] = useState<
    Map<string, boolean>
  >(new Map());
  const [testMode, setTestMode] = useState<TestModeType | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showTestEndedModal, setShowTestEndedModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const openSubmitModalAfterSubmit = useRef(false);
  const fillInInputRef = useRef<HTMLInputElement>(null);

  // ── Countdown ────────────────────────────────────────────────────────────────
  const timeEvents = useMemo(() => testData?.time_events ?? [], [testData]);
  const totalEstimatedMs = useMemo(
    () =>
      (testData?.test_suite?.questions ?? []).reduce(
        (sum, q) => sum + q.estimated_time_in_ms,
        0,
      ),
    [testData],
  );

  const handleAutoEnd = useCallback(async () => {
    if (testData?.mode === TestModeType.UnProctured) return; // learning mode has no deadline
    try {
      await endTest({ variables: { testId } });
    } catch (err) {
      console.error("Error auto-ending test:", err);
    } finally {
      router.push(`/exams/${courseId}/${testId}/result`);
    }
  }, [endTest, testId, courseId, router, testData?.mode]);

  const { remainingMs } = useTestCountdown(
    timeEvents,
    totalEstimatedMs,
    { onExpire: handleAutoEnd },
  );

  // ── Derived ──────────────────────────────────────────────────────────────────
  const questions = (
    (testData?.test_suite?.questions ?? []) as Question[]
  ).sort((a, b) => a.question_number - b.question_number);
  const totalQuestions = questions.length;
  const answeredCount = answeredQuestions.size;
  const flaggedCount = flaggedQuestions.size;
  const remainingCount = totalQuestions - answeredCount;
  const isFirst = currentQuestion?.question_number === 1;
  const isLast = currentQuestion?.question_number === totalQuestions;
  const progressPct =
    totalQuestions > 0
      ? ((currentQuestion?.question_number ?? 1) / totalQuestions) * 100
      : 0;
  const suiteTitle = testData?.test_suite?.title ?? "";
  const isLearningMode = testMode === TestModeType.UnProctured;
  const isCurrentAnswerLocked =
    isLearningMode &&
    !!currentQuestion &&
    submittedLearningAnswers.has(currentQuestion.id);
  const correctAnswer = currentQuestion?.correct_answer ?? null;
  const isAnswerCorrect =
    isLearningMode && currentQuestion
      ? (submittedLearningAnswers.get(currentQuestion.id) ?? false)
      : (() => {
          if (!selectedAnswer || !correctAnswer) return false;
          if (currentQuestion?.type === QuestionType.MultipleSelect) {
            const a = selectedAnswer.split(",").sort();
            const c = correctAnswer.split(",").sort();
            return a.length === c.length && a.every((v, i2) => v === c[i2]);
          }
          if (
            currentQuestion?.type === QuestionType.FillIn ||
            currentQuestion?.type === QuestionType.ShortAnswer
          ) {
            return (
              selectedAnswer.trim().toLowerCase() ===
              correctAnswer.trim().toLowerCase()
            );
          }
          return selectedAnswer === correctAnswer;
        })();

  // Lock the app shell to viewport height so only .exam-q-area scrolls
  useEffect(() => {
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
  }, []);

  // ── Load on mount ─────────────────────────────────────────────────────────────
  useEffect(() => {
    studentProfile();
    getTest({ variables: { testId } });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Populate state from getTest response
  useEffect(() => {
    if (!testData) return;

    const map = new Map<string, string>();
    const answered = new Set<string>();
    const flagged = new Set<string>();

    testData.submitted_answers?.forEach((a) => {
      answered.add(a.question_id);
      if (a.answer_provided) map.set(a.question_id, a.answer_provided);
      if (a.is_flagged) flagged.add(a.question_id);
    });

    setLocalAnswersMap(map);
    setAnsweredQuestions(answered);
    setFlaggedQuestions(flagged);
    setTestMode(testData.mode);
    if (testData.status === TestStatusType.Paused) {
      setIsPaused(true);
      setShowPauseModal(true);
    }
    if (testData.mode === TestModeType.UnProctured) {
      const learningMap = new Map<string, boolean>();
      testData.submitted_answers?.forEach((a) => {
        learningMap.set(a.question_id, a.is_correct ?? false);
      });
      setSubmittedLearningAnswers(learningMap);
    }

    if ((testData.test_suite?.questions?.length ?? 0) > 0 && !currentQuestion) {
      const first = testData.test_suite!.questions![0];
      setCurrentQuestion(first);
      setSelectedAnswer(map.get(first.id) ?? null);
    }
  }, [testData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset start time when question changes
  useEffect(() => {
    if (!currentQuestion) return;
    setQuestionStartTime(Date.now());
    if (
      currentQuestion?.type === QuestionType.FillIn ||
      currentQuestion?.type === QuestionType.ShortAnswer
    ) {
      setTimeout(() => fillInInputRef.current?.focus(), 0);
    }
  }, [currentQuestion]);

  // Open submit modal after the last answer finishes submitting
  useEffect(() => {
    if (!isSubmitting && openSubmitModalAfterSubmit.current) {
      openSubmitModalAfterSubmit.current = false;
      setShowSubmitModal(true);
    }
  }, [isSubmitting]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputFocused =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement;
      const isFillInArrow =
        isInputFocused &&
        (currentQuestion?.type === QuestionType.FillIn ||
          currentQuestion?.type === QuestionType.ShortAnswer) &&
        (e.key === "ArrowLeft" || e.key === "ArrowRight");
      if (isInputFocused && !isFillInArrow) return;
      if (isPaused || showPauseModal || showSubmitModal) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (isCurrentAnswerLocked) {
            if (isLast) setShowSubmitModal(true);
            else handleNext();
          } else if (isLast) {
            if (!isLearningMode) {
              openSubmitModalAfterSubmit.current = true;
            }
            handleSubmitAnswer();
          } else {
            handleSubmitAnswer();
          }
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5": {
          if (isCurrentAnswerLocked) break;
          if (
            currentQuestion?.type === QuestionType.FillIn ||
            currentQuestion?.type === QuestionType.ShortAnswer
          )
            break;
          const idx = parseInt(e.key) - 1;
          const option = currentQuestion?.options?.[idx];
          if (option !== undefined) {
            if (currentQuestion?.type === QuestionType.MultipleSelect) {
              const parts = selectedAnswer ? selectedAnswer.split(",") : [];
              const pos = parts.indexOf(option);
              if (pos >= 0) parts.splice(pos, 1);
              else parts.push(option);
              setSelectedAnswer(parts.length > 0 ? parts.join(",") : null);
            } else {
              setSelectedAnswer(option);
            }
          }
          break;
        }
        case "f":
        case "F":
          if (isCurrentAnswerLocked) break;
          e.preventDefault();
          handleSubmitAnswer(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isPaused,
    showPauseModal,
    showSubmitModal,
    currentQuestion,
    isLast,
    selectedAnswer,
    isCurrentAnswerLocked,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const jumpToQuestion = (question: Question) => {
    setCurrentQuestion(question);
    setSelectedAnswer(localAnswersMap.get(question.id) ?? null);
  };

  const handleNext = () => {
    const next = questions.find(
      (q) => q.question_number === (currentQuestion?.question_number ?? 0) + 1,
    );
    if (next) {
      setCurrentQuestion(next);
      setSelectedAnswer(localAnswersMap.get(next.id) ?? null);
    }
  };

  const handlePrev = () => {
    const prev = questions.find(
      (q) => q.question_number === (currentQuestion?.question_number ?? 0) - 1,
    );
    if (prev) {
      setCurrentQuestion(prev);
      setSelectedAnswer(localAnswersMap.get(prev.id) ?? null);
    }
  };

  const handleSubmitAnswer = async (isFlagged = false) => {
    if (!currentQuestion) return;
    if (!selectedAnswer && !isFlagged) return;
    setIsSubmitting(true);
    try {
      const timeSpent = Date.now() - questionStartTime;
      const result = await submitAnswer({
        variables: {
          testId,
          questionId: currentQuestion.id,
          timeRange: formatTimeRange(timeSpent),
          answer: selectedAnswer ?? "",
          isFlagged,
        },
      });
      const answerId = currentQuestion.id;
      setAnsweredQuestions((prev) => new Set([...prev, answerId]));
      if (selectedAnswer) {
        setLocalAnswersMap((prev) => {
          const next = new Map(prev);
          next.set(answerId, selectedAnswer);
          return next;
        });
      }
      if (isFlagged) {
        setFlaggedQuestions((prev) => new Set([...prev, answerId]));
      } else {
        setFlaggedQuestions(
          (prev) => new Set([...prev].filter((id) => id !== answerId)),
        );
      }
      if (isLearningMode) {
        const isCorrect = result.data?.submitAnswer?.is_correct ?? false;
        setSubmittedLearningAnswers((prev) => {
          const next = new Map(prev);
          next.set(answerId, isCorrect);
          return next;
        });
      } else if (!isLast && !isFlagged) {
        handleNext();
      }
    } catch (err) {
      const code = (
        err as { graphQLErrors?: { extensions?: { code?: string } }[] }
      )?.graphQLErrors?.[0]?.extensions?.code;
      if (code === "TEST_ENDED") {
        setShowTestEndedModal(true);
      } else {
        console.error("Error submitting answer:", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePause = async () => {
    try {
      await pauseTest({ variables: { testId } });
      setIsPaused(true);
      setShowPauseModal(true);
      getTest({ variables: { testId } });
    } catch (err) {
      console.error("Error pausing test:", err);
    }
  };

  const handleResume = async () => {
    try {
      await resumeTest({ variables: { testId } });
      setIsPaused(false);
      setShowPauseModal(false);
      setQuestionStartTime(Date.now());
      getTest({ variables: { testId } });
    } catch (err) {
      console.error("Error resuming test:", err);
    }
  };

  const handleEndTest = async () => {
    try {
      if (
        currentQuestion &&
        selectedAnswer &&
        !answeredQuestions.has(currentQuestion.id)
      ) {
        const timeSpent = Date.now() - questionStartTime;
        await submitAnswer({
          variables: {
            testId,
            questionId: currentQuestion.id,
            timeRange: formatTimeRange(timeSpent),
            answer: selectedAnswer,
            isFlagged: false,
          },
        });
      }
      await endTest({ variables: { testId } });
      router.push(`/exams/${courseId}/${testId}/result`);
    } catch (err) {
      console.error("Error ending test:", err);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="main-wrap" style={{ overflow: "hidden" }}>
      {/* Mobile topbar */}
      <div className="mobile-topbar">
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)" }}>
          {suiteTitle || "Loading…"}
        </div>
        {!isLearningMode && (
          <div className="mobile-timer">⏱ {formatCountdown(remainingMs).display}</div>
        )}
      </div>

      <div className="exam-shell" style={{ flex: 1, overflow: "hidden" }}>
        {/* ── Left Q Navigator ── */}
        <div className="exam-nav-panel">
          <div className="exam-nav-header">Questions</div>
          <div className="exam-nav-body">
            <div className="q-grid">
              {questions.map((q) => {
                const isAnswered = answeredQuestions.has(q.id);
                const isFlagged = flaggedQuestions.has(q.id);
                const isCurrent = q.id === currentQuestion?.id;
                let cellClass = "q-cell";
                if (isCurrent) cellClass += " current";
                if (isFlagged) cellClass += " flagged";
                else if (!isCurrent && isAnswered) cellClass += " answered";
                return (
                  <div
                    key={q.id}
                    className={cellClass}
                    title={`Q${q.question_number}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => jumpToQuestion(q)}
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
                style={{ background: "var(--amber)" }}
              />
              Flagged
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
                {suiteTitle}
              </div>
              {testMode && (
                <div
                  className="exam-section-badge"
                  style={{ marginTop: 4, marginBottom: 0 }}
                >
                  {testMode === TestModeType.UnProctured
                    ? "Learning Mode"
                    : "Proctored Mode"}
                </div>
              )}
            </div>
          </div>

          <div className="exam-prog-outer">
            <div
              className="exam-prog-inner"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="exam-q-area">
            {currentQuestion ? (
              <>
                {/* Scrollable description */}
                <div className="exam-q-desc">
                  <div className="q-num-label">
                    Question {currentQuestion.question_number} of{" "}
                    {totalQuestions}
                    {currentQuestion.tags &&
                      currentQuestion.tags.length > 0 && (
                        <>
                          &nbsp;·&nbsp;
                          {currentQuestion.tags[0]
                            .replace(/^[A-Z]+_/, "")
                            .replace(/_/g, " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </>
                      )}
                    {currentQuestion.class_level && (
                      <>&nbsp;·&nbsp;{currentQuestion.class_level}</>
                    )}
                    {currentQuestion.exam_year && (
                      <>&nbsp;·&nbsp;{currentQuestion.exam_year}</>
                    )}
                  </div>
                  <div className="q-text">
                    <ReactMarkdown
                      components={{
                        img: ({ ...props }) => (
                          <img
                            {...props}
                            style={{
                              maxWidth: "100%",
                              maxHeight: 400,
                              height: "auto",
                              display: "block",
                              margin: "8px 0",
                            }}
                          />
                        ),
                      }}
                    >
                      {currentQuestion.description}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Pinned options */}
                <div className="exam-q-options">
                  {/* Learning mode: result banner + solution steps */}
                  {isLearningMode && isCurrentAnswerLocked && (
                    <div style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "12px 16px",
                          borderRadius: "var(--r)",
                          marginBottom: 12,
                          background: isAnswerCorrect
                            ? "var(--green-lt, #f0fdf4)"
                            : "#fef2f2",
                          border: `1px solid ${isAnswerCorrect ? "var(--green)" : "var(--red)"}`,
                        }}
                      >
                        <span style={{ fontSize: 20 }}>
                          {selectedAnswer === correctAnswer ? "🎉" : "💡"}
                        </span>
                        <div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              color: isAnswerCorrect
                                ? "var(--green)"
                                : "var(--red)",
                            }}
                          >
                            {isAnswerCorrect ? "Correct!" : "Incorrect"}
                          </div>
                          {!isAnswerCorrect &&
                            currentQuestion.type !==
                              QuestionType.MultipleSelect && (
                              <div
                                style={{
                                  fontSize: 13,
                                  color: "var(--t2)",
                                  marginTop: 2,
                                }}
                              >
                                The correct answer is:{" "}
                                <strong style={{ color: "var(--green)" }}>
                                  {correctAnswer}
                                </strong>
                              </div>
                            )}
                        </div>
                      </div>

                      {currentQuestion.solution_steps &&
                        currentQuestion.solution_steps.length > 0 && (
                          <div className="card card-p" style={{ marginTop: 0 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: "var(--blue)",
                                marginBottom: 10,
                              }}
                            >
                              📖 Solution
                            </div>
                            <ol style={{ paddingLeft: 20, margin: 0 }}>
                              {currentQuestion.solution_steps.map(
                                (step, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm"
                                    style={{
                                      color: "var(--t2)",
                                      marginBottom: 6,
                                      lineHeight: 1.6,
                                    }}
                                  >
                                    {step}
                                  </li>
                                ),
                              )}
                            </ol>
                          </div>
                        )}
                    </div>
                  )}
                  {currentQuestion.type === QuestionType.MultipleSelect && (
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
                    {currentQuestion?.type === QuestionType.FillIn ||
                    currentQuestion?.type === QuestionType.ShortAnswer ? (
                      <input
                        ref={fillInInputRef}
                        type="text"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          fontSize: 15,
                          borderRadius: "var(--r)",
                          border: "1px solid var(--border)",
                          background: isCurrentAnswerLocked
                            ? "var(--bg2)"
                            : "var(--bg)",
                          color: "var(--t1)",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                        placeholder="Type your answer here…"
                        value={selectedAnswer ?? ""}
                        disabled={isCurrentAnswerLocked}
                        onChange={(e) =>
                          setSelectedAnswer(e.target.value || null)
                        }
                      />
                    ) : (
                      currentQuestion.options?.map((option, i) => {
                        const isSelected =
                          currentQuestion.type === QuestionType.MultipleSelect
                            ? (selectedAnswer?.split(",") ?? []).includes(
                                option,
                              )
                            : selectedAnswer === option;
                        const isCorrect =
                          currentQuestion.type === QuestionType.MultipleSelect
                            ? (correctAnswer?.split(",") ?? []).includes(option)
                            : option === correctAnswer;
                        const showFeedback =
                          isLearningMode && isCurrentAnswerLocked;

                        let optionClass = "option";
                        let bubbleStyle: React.CSSProperties = {};
                        let rowStyle: React.CSSProperties = {};

                        if (showFeedback) {
                          if (isCorrect) {
                            optionClass += " opt-correct";
                            bubbleStyle = {
                              background: "var(--green)",
                              color: "#fff",
                            };
                            rowStyle = {
                              borderColor: "var(--green)",
                              background: "var(--green-lt, #f0fdf4)",
                            };
                          } else if (isSelected) {
                            optionClass += " opt-wrong";
                            bubbleStyle = {
                              background: "var(--red)",
                              color: "#fff",
                            };
                            rowStyle = {
                              borderColor: "var(--red)",
                              background: "#fef2f2",
                            };
                          }
                        } else if (isSelected) {
                          optionClass += " sel";
                        }

                        const handleOptionClick = () => {
                          if (isCurrentAnswerLocked) return;
                          if (
                            currentQuestion.type === QuestionType.MultipleSelect
                          ) {
                            const parts = selectedAnswer
                              ? selectedAnswer.split(",")
                              : [];
                            const pos = parts.indexOf(option);
                            if (pos >= 0) parts.splice(pos, 1);
                            else parts.push(option);
                            setSelectedAnswer(
                              parts.length > 0 ? parts.join(",") : null,
                            );
                          } else {
                            setSelectedAnswer(option);
                          }
                        };

                        return (
                          <div
                            key={i}
                            className={optionClass}
                            tabIndex={isCurrentAnswerLocked ? -1 : 0}
                            style={rowStyle}
                            onClick={handleOptionClick}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleOptionClick()
                            }
                          >
                            <div className="opt-bubble" style={bubbleStyle}>
                              {currentQuestion.type ===
                                QuestionType.MultipleSelect && isSelected
                                ? "✓"
                                : OPTION_LABELS[i]}
                            </div>
                            <div className="opt-text" style={{ flex: 1 }}>
                              {option}
                            </div>
                            {showFeedback && isCorrect && (
                              <span
                                style={{
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: "var(--green)",
                                  flexShrink: 0,
                                }}
                              >
                                ✓ Correct
                              </span>
                            )}
                            {showFeedback && isSelected && !isCorrect && (
                              <span
                                style={{
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: "var(--red)",
                                  flexShrink: 0,
                                }}
                              >
                                ✗ Wrong
                              </span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                {/* end exam-q-options */}
              </>
            ) : (
              <div
                className="text-sm text-muted"
                style={{ padding: "28px 32px" }}
              >
                Loading question…
              </div>
            )}
          </div>

          <div className="exam-bottom-bar">
            <div className="kb-hint">
              Keyboard: <span className="kb-key">←</span>
              <span className="kb-key">→</span> navigate &nbsp;
              <span className="kb-key">1</span>–
              <span className="kb-key">4</span> select answer &nbsp;
              <span className="kb-key">F</span> flag
            </div>
            <div className="flex-row">
              <button
                disabled={isFirst || isSubmitting}
                className="btn btn-ghost btn-sm"
                onClick={handlePrev}
              >
                ← Prev
              </button>
              {isCurrentAnswerLocked ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={isLast ? () => setShowSubmitModal(true) : handleNext}
                >
                  {isLast ? "Finish Test →" : "Next Question →"}
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  disabled={isSubmitting}
                  onClick={
                    isLast
                      ? () => {
                          if (!isLearningMode) {
                            openSubmitModalAfterSubmit.current = true;
                          }
                          handleSubmitAnswer();
                        }
                      : () => handleSubmitAnswer()
                  }
                >
                  {isLast ? "Submit →" : "Next →"}
                </button>
              )}
            </div>
          </div>

          {/* Mobile exam controls */}
          <div className="mobile-exam-controls">
            <div className="flex-row">
              <button className="btn btn-ghost btn-sm" onClick={handlePrev}>
                ←
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSubmitAnswer()}
              >
                Next →
              </button>
            </div>
            <button
              className="flag-btn"
              style={{ width: "auto" }}
              onClick={() => handleSubmitAnswer(true)}
            >
              🚩
            </button>
            <button className="btn btn-danger btn-sm" onClick={handlePause}>
              ⏸ Pause
            </button>
          </div>
        </div>

        {/* ── Right Controls Panel ── */}
        <div className="exam-right-panel">
          {!isLearningMode && (
            <div className="timer-card">
              <div className="timer-label">Time Elapsed</div>
              <div className="timer-val">{formatCountdown(remainingMs).display}</div>
            </div>
          )}
          <div className="label-sm mb8">Progress</div>
          <div className="exam-stat-mini">
            <span className="text-muted">Answered</span>
            <span className="fw7 text-green">{answeredCount}</span>
          </div>
          <div className="exam-stat-mini">
            <span className="text-muted">Remaining</span>
            <span className="fw7">{remainingCount}</span>
          </div>
          <div className="exam-stat-mini">
            <span className="text-muted">Flagged</span>
            <span className="fw7 text-amber">{flaggedCount}</span>
          </div>
          <button className="flag-btn" onClick={() => handleSubmitAnswer(true)}>
            🚩 Flag Question
          </button>
          <button
            className="btn btn-ghost btn-sm btn-full mt8"
            onClick={handlePause}
          >
            ⏸ Pause
          </button>
          <button
            className="btn btn-danger btn-sm btn-full mt8"
            onClick={() => setShowSubmitModal(true)}
          >
            ⬛ Submit Exam
          </button>
          {!isLearningMode && (
            <div className="integrity-notice">
              🔒 Exam Mode — leaving this screen may end your test and log a
              violation.
            </div>
          )}
        </div>
      </div>

      {/* ── Pause Modal ── */}
      {showPauseModal && (
        <div className="modal-bg open">
          <div className="modal-box">
            <div className="modal-icon">⏸</div>
            <div className="modal-title">Test Paused</div>
            <div className="modal-sub">
              Your progress is saved. Resume within the exam window to continue
              without penalty.
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={handleResume}>
                ▶ Resume Test
              </button>
              <button className="btn btn-danger" onClick={handleEndTest}>
                Submit &amp; Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Submit Confirm Modal ── */}
      {showSubmitModal && (
        <div className="modal-bg open">
          <div className="modal-box">
            <div className="modal-icon">📤</div>
            <div className="modal-title">Submit your exam?</div>
            <div className="modal-sub">
              You&apos;ve answered <strong>{answeredCount}</strong> of{" "}
              <strong>{totalQuestions}</strong> questions. Once submitted you
              cannot make changes.
            </div>
            <div className="btn-row">
              <button
                className="btn btn-ghost"
                onClick={() => setShowSubmitModal(false)}
              >
                Keep Going
              </button>
              <button className="btn btn-primary" onClick={handleEndTest}>
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Test Ended Modal ── */}
      {showTestEndedModal && (
        <div className="modal-bg open">
          <div className="modal-box">
            <div className="modal-icon">⏹</div>
            <div className="modal-title">Test Ended</div>
            <div className="modal-sub">
              This test has already ended, so your answer couldn&apos;t be
              submitted. View your results below.
            </div>
            <div className="btn-row">
              <button
                className="btn btn-primary"
                onClick={() =>
                  router.push(`/exams/${courseId}/${testId}/result`)
                }
              >
                View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
