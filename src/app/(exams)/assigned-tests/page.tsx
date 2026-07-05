"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/common/context/sidebar-context";
import { useListMyAssignments } from "@/common/hooks/queries";
import { useStartAssignedTest } from "@/common/hooks/mutations";
import {
  Gender,
  SuiteDifficultyType,
  TestAssignmentStatus,
  TestModeType,
} from "@/common/graphql/generated/graphql";

const DIFFICULTY_META: Record<
  SuiteDifficultyType,
  { dot: string; label: string; badgeCls: string; icoBg: string }
> = {
  [SuiteDifficultyType.Beginner]: {
    dot: "🟢",
    label: "Easy",
    badgeCls: "badge badge-green",
    icoBg: "var(--green-lt)",
  },
  [SuiteDifficultyType.Intermediate]: {
    dot: "🟡",
    label: "Medium",
    badgeCls: "badge badge-amber",
    icoBg: "var(--blue-lt)",
  },
  [SuiteDifficultyType.Advanced]: {
    dot: "🔴",
    label: "Hard",
    badgeCls: "badge badge-red",
    icoBg: "var(--indigo-lt)",
  },
};

type Tab = "pending" | "completed";

export default function AssignedTestsPage() {
  const router = useRouter();
  const { toggle: toggleSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState<Tab>("pending");
  const {
    listMyAssignments,
    data: assignments,
    loading,
  } = useListMyAssignments();
  const { startAssignedTest, loading: starting } = useStartAssignedTest();

  useEffect(() => {
    listMyAssignments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = async (assignmentId: string) => {
    try {
      const response = await startAssignedTest({
        variables: { assignmentId, mode: TestModeType.Proctured },
      });

      const testId = response.data?.startAssignedTest.id;
      const courseId = response.data?.startAssignedTest.course_id || "";
      if (testId) {
        sessionStorage.setItem("activeCourseId", courseId);
        router.push(`/exams/${courseId}/${testId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const pending =
    assignments?.filter((a) => a.status === TestAssignmentStatus.Pending) ?? [];
  const completed =
    assignments?.filter((a) => a.status === TestAssignmentStatus.Completed) ??
    [];

  return (
    <div className="main-wrap">
      <div className="mobile-topbar">
        <button className="hamburger" onClick={toggleSidebar}>
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
          Homework
        </span>
        <span />
      </div>

      <div className="top-bar">
        <div className="top-bar-left">
          <div className="breadcrumb">
            <span
              className="bc-link"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </span>
            <span className="bc-sep">›</span>
            <span className="bc-current">Homework</span>
          </div>
        </div>
      </div>

      <div className="hw-screen-wrap">
        {/* Page heading */}
        <div className="flex-between mb20">
          <div>
            <div className="page-title">📋 Homework</div>
            <div className="text-sm text-muted mt8">
              Assignments set by your parent · Complete them before the due
              date.
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="hw-tabs">
          <button
            className={`hw-tab${activeTab === "pending" ? " act" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
            <span className="hw-tab-count">{pending.length}</span>
          </button>
          <button
            className={`hw-tab${activeTab === "completed" ? " act" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
            <span className="hw-tab-count">{completed.length}</span>
          </button>
        </div>

        {loading && (
          <div className="text-sm text-muted">Loading assignments…</div>
        )}

        {/* Pending panel */}
        {activeTab === "pending" && !loading && (
          <>
            {pending.length === 0 ? (
              <div className="hw-empty">
                <div className="hw-empty-icon">✅</div>
                <div className="hw-empty-title">No pending assignments</div>
                <div className="hw-empty-sub">
                  Your parent hasn&apos;t assigned any tests yet.
                </div>
              </div>
            ) : (
              pending.map((assignment) => {
                const difficulty =
                  assignment.test_suite?.difficulty ??
                  SuiteDifficultyType.Beginner;
                const meta = DIFFICULTY_META[difficulty];
                const parentName = assignment.parent?.first_name ?? "Parent";
                const parentGender = assignment.parent?.gender ?? "Guardian";
                const assignedDate = new Date(
                  assignment.assigned_at,
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div key={assignment.id} className="hw-card">
                    <div className="hw-card-top">
                      <div
                        className="hw-card-ico"
                        style={{ background: meta.icoBg }}
                      >
                        📝
                      </div>
                      <div className="hw-card-main">
                        {assignment.test_suite?.description && (
                          <div className="hw-card-eyebrow">
                            {assignment.test_suite.description}
                          </div>
                        )}
                        <div className="hw-card-title">
                          {assignment.test_suite?.title ?? "Untitled Suite"}
                        </div>
                        <div className="hw-card-badges">
                          <span className={meta.badgeCls}>
                            {meta.dot} {meta.label}
                          </span>
                        </div>
                        <div className="hw-card-from">
                          👤 Assigned by <strong>{parentName}</strong>
                        </div>
                      </div>
                      <div className="hw-card-right">
                        <span
                          className="badge badge-blue"
                          style={{ fontSize: 11 }}
                        >
                          📅 {assignedDate}
                        </span>
                      </div>
                    </div>

                    {assignment.note && (
                      <div className="hw-card-note">
                        <span>💬</span>
                        <span>
                          <strong>
                            {parentGender === Gender.Male ? "Father" : "Mum"}{" "}
                            said:
                          </strong>{" "}
                          &ldquo;{assignment.note}&rdquo;
                        </span>
                      </div>
                    )}

                    <div className="hw-card-bottom">
                      <div className="hw-card-stats">
                        <div className="hw-card-stat">
                          <span className={meta.badgeCls}>
                            {meta.dot} {meta.label}
                          </span>
                        </div>
                      </div>
                      <button
                        className="hw-start-btn"
                        disabled={starting}
                        onClick={() => handleStart(assignment.id)}
                      >
                        <svg
                          width="13"
                          height="13"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Start Assignment
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {/* Completed panel */}
        {activeTab === "completed" && !loading && (
          <>
            {completed.length === 0 ? (
              <div className="hw-empty">
                <div className="hw-empty-icon">📭</div>
                <div className="hw-empty-title">No completed assignments</div>
                <div className="hw-empty-sub">
                  Completed assignments will appear here once you finish them.
                </div>
              </div>
            ) : (
              completed.map((assignment) => {
                const difficulty =
                  assignment.test_suite?.difficulty ??
                  SuiteDifficultyType.Beginner;
                const meta = DIFFICULTY_META[difficulty];
                const parentName = assignment.parent?.first_name ?? "Parent";
                const completedDate = assignment.completed_at
                  ? new Date(assignment.completed_at).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" },
                    )
                  : "";

                return (
                  <div key={assignment.id} className="hw-done-card">
                    <div
                      className="hw-done-ico"
                      style={{ background: meta.icoBg }}
                    >
                      ✅
                    </div>
                    <div className="hw-done-body">
                      <div className="hw-done-title">
                        {assignment.test_suite?.title ?? "Untitled Suite"}
                      </div>
                      <div className="hw-done-meta">
                        Assigned by {parentName}
                        {completedDate && ` · Completed ${completedDate}`}
                      </div>
                    </div>
                    {assignment.test?.id && (
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ flexShrink: 0 }}
                        onClick={() =>
                          router.push(
                            `/exams/${assignment.test?.course_id}/${assignment.test!.id}/result`,
                          )
                        }
                      >
                        Review →
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
