"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useListOrganizationCourses,
  useStudentProfile,
} from "@/common/hooks/queries";
import { useStartTest } from "@/common/hooks/mutations";
import { TestModeType } from "@/common/graphql/generated/graphql";
import { useSidebar } from "@/common/context/sidebar-context";
import CourseAccordionItem from "@/components/features/exams/course-accordion-item";

export default function ExamsIndexPage() {
  const router = useRouter();
  const { toggle: toggleSidebar } = useSidebar();
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { studentProfile } = useStudentProfile();
  const { startTest, loading: startingTest } = useStartTest();
  const { listOrganizationCourses, data, loading } = useListOrganizationCourses(
    {
      filter: { is_subscribed: true },
      pagination: { first: 50 },
    },
  );

  useEffect(() => {
    studentProfile();
    listOrganizationCourses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const pending = sessionStorage.getItem("pendingExpandCourseId");
    if (pending) {
      setExpandedCourseId(pending);
      sessionStorage.removeItem("pendingExpandCourseId");
    }
  }, []);

  const courses = data?.edges ?? [];
  const filtered = searchTerm.trim()
    ? courses.filter(({ node }) =>
        node.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : courses;

  const handleToggleCourse = (courseId: string) => {
    setExpandedCourseId((current) => (current === courseId ? null : courseId));
  };

  const handleStartTest = async (
    suiteId: string,
    courseId: string,
    mode: TestModeType,
  ) => {
    try {
      const response = await startTest({ variables: { suiteId, mode } });
      const testId = response.data?.startTest.id;
      if (testId) {
        sessionStorage.setItem("activeCourseId", courseId);
        router.push(`/exams/${courseId}/${testId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          Start Test
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
            <span className="bc-current">Start Test</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
        {/* Page header + search */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "var(--t1)",
                marginBottom: 2,
              }}
            >
              Your Courses
            </div>
            <div className="text-sm" style={{ color: "var(--t2)" }}>
              Select a course, pick a category, and start practicing
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "0 16px",
              height: 42,
              minWidth: 0,
              flex: "1 1 240px",
              maxWidth: 320,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: "var(--t3)", flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 13,
                color: "var(--t1)",
                flex: 1,
                minWidth: 0,
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* Count */}
        {data?.edges && (
          <div
            className="text-xs"
            style={{
              color: "var(--t3)",
              marginBottom: 16,
              fontFamily: "var(--mono, monospace)",
              letterSpacing: "0.04em",
            }}
          >
            Showing{" "}
            <strong style={{ color: "var(--t1)" }}>{filtered.length}</strong> of{" "}
            {data.edges.length} courses
          </div>
        )}

        {loading && <div className="text-sm text-muted">Loading courses…</div>}

        {!loading && filtered.length === 0 && (
          <div
            className="card card-p"
            style={{ textAlign: "center", padding: 40 }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>📚</div>
            <div
              style={{ fontWeight: 700, color: "var(--t1)", marginBottom: 6 }}
            >
              {searchTerm
                ? "No courses match your search"
                : "No subscribed courses"}
            </div>
            <div className="text-sm text-muted">
              {searchTerm
                ? "Try a different keyword."
                : "Subscribe to courses from the marketplace to get started."}
            </div>
          </div>
        )}

        {/* Course accordion list */}
        <div>
          {filtered.map(({ node }) => (
            <CourseAccordionItem
              key={node.id}
              node={node}
              isExpanded={expandedCourseId === node.id}
              onToggle={() => handleToggleCourse(node.id)}
              onStartTest={handleStartTest}
              startingTest={startingTest}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
