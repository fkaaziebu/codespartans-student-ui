"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useListAttempts } from "@/common/hooks/queries";
import { TestModeType } from "@/common/graphql/generated/graphql";

function scoreColor(score: number) {
  if (score >= 70) return "var(--green)";
  if (score >= 50) return "var(--amber)";
  return "var(--red)";
}

function formatTime(ms: number) {
  if (!ms) return "—";
  const totalMinutes = ms / 60000;
  if (totalMinutes < 60) return `${Math.round(totalMinutes)}m`;
  return `${Math.floor(totalMinutes / 60)}h ${Math.round(totalMinutes % 60)}m`;
}

function subjectIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("math") || t.includes("algebra") || t.includes("calculus"))
    return "➗";
  if (t.includes("chem")) return "⚗️";
  if (t.includes("phys")) return "🌊";
  if (t.includes("english") || t.includes("comprehension")) return "📖";
  if (t.includes("biology") || t.includes("bio")) return "🧬";
  return "📚";
}

function iconBg(title: string) {
  const t = title.toLowerCase();
  if (t.includes("math") || t.includes("algebra") || t.includes("calculus"))
    return "var(--blue-lt)";
  if (t.includes("chem")) return "var(--green-lt)";
  if (t.includes("phys")) return "var(--amber-lt)";
  if (t.includes("english") || t.includes("comprehension"))
    return "var(--indigo-lt)";
  return "var(--bg2)";
}

function subjectLabel(title: string) {
  const t = title.toLowerCase();
  if (t.includes("math") || t.includes("algebra") || t.includes("calculus"))
    return "Mathematics";
  if (t.includes("chem")) return "Chemistry";
  if (t.includes("phys")) return "Physics";
  if (t.includes("english") || t.includes("comprehension")) return "English";
  if (t.includes("biology") || t.includes("bio")) return "Biology";
  return "General";
}

function isWithinRange(dateTaken: string, range: string) {
  if (range === "all") return true;
  const d = new Date(dateTaken).getTime();
  const now = Date.now();
  const ms30 = 30 * 24 * 60 * 60 * 1000;
  if (range === "month") return now - d <= ms30;
  if (range === "3months") return now - d <= 3 * ms30;
  return true;
}

export default function MyTestsPage() {
  const router = useRouter();
  const { listAttempts, data, loading } = useListAttempts();
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    listAttempts({ variables: { pagination: { first: 100 } } });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const attempts = data?.edges ?? [];

  const uniqueSubjects = useMemo(() => {
    const seen = new Set<string>();
    attempts.forEach(({ node }) => seen.add(subjectLabel(node.course_title)));
    return Array.from(seen).sort();
  }, [attempts]);

  const filtered = useMemo(() => {
    return attempts.filter(({ node }) => {
      const matchSubject =
        subjectFilter === "all" ||
        subjectLabel(node.course_title) === subjectFilter;
      const matchTime = isWithinRange(node.date_taken, timeFilter);
      return matchSubject && matchTime;
    });
  }, [attempts, subjectFilter, timeFilter]);

  const handleExportCSV = () => {
    const rows = [
      [
        "Test",
        "Subject",
        "Date",
        "Score",
        "Correct",
        "Wrong",
        "Time",
        "Trend",
        "Mode",
      ],
      ...filtered.map(({ node }) => [
        node.course_title,
        subjectLabel(node.course_title),
        new Date(node.date_taken).toLocaleDateString(),
        `${Math.round(node.score)}%`,
        node.correct,
        node.wrong,
        formatTime(node.time_taken),
        node.trend != null
          ? `${node.trend > 0 ? "+" : ""}${Math.round(node.trend)}%`
          : "New",
        node.mode === TestModeType.UnProctured ? "Learning" : "Proctored",
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "test-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

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
          History
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
          <span className="bc-current">Past Attempts</span>
        </div>
        <div className="top-bar-right">
          <button
            className="btn btn-ghost btn-sm"
            onClick={handleExportCSV}
            type="button"
          >
            ↓ Export CSV
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "28px 28px", overflowY: "auto" }}>
        <div className="my-tests-header">
          <div className="page-title">📋 Past Attempts</div>
          <div className="my-tests-filters">
            <select
              className="fs"
              style={{ fontSize: 13, padding: "7px 10px" }}
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="all">All Subjects</option>
              {uniqueSubjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              className="fs"
              style={{ fontSize: 13, padding: "7px 10px" }}
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="3months">Last 3 Months</option>
            </select>
          </div>
        </div>

        {loading && <div className="text-sm text-muted">Loading…</div>}

        {!loading && filtered.length === 0 && (
          <div
            className="card card-p"
            style={{ textAlign: "center", padding: 40 }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
            <div
              style={{ fontWeight: 700, color: "var(--t1)", marginBottom: 6 }}
            >
              No tests found
            </div>
            <div className="text-sm text-muted" style={{ marginBottom: 20 }}>
              Start a test from the dashboard to see your history here.
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => router.push("/exams")}
              type="button"
            >
              + Start Test
            </button>
          </div>
        )}

        {filtered.length > 0 && (
          <>
            {/* ── Desktop table ── */}
            <div className="hist-table-wrap card" style={{ overflowX: "auto" }}>
              <table className="hist-table">
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Mode</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Correct / Wrong</th>
                    <th>Time</th>
                    <th>Trend</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(({ node }) => {
                    const trend = node.trend;
                    const isProctored = node.mode === TestModeType.Proctured;
                    return (
                      <tr key={node.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: "var(--r)",
                                background: iconBg(node.course_title),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 16,
                                flexShrink: 0,
                              }}
                            >
                              {subjectIcon(node.course_title)}
                            </div>
                            <div>
                              <div className="hist-test-name">{node.course_title}</div>
                              <div className="hist-meta">{subjectLabel(node.course_title)}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 12,
                              fontWeight: 600,
                              padding: "3px 8px",
                              borderRadius: 20,
                              background: isProctored ? "var(--indigo-lt, #eef2ff)" : "var(--green-lt, #f0fdf4)",
                              color: isProctored ? "var(--indigo, #4f46e5)" : "var(--green, #16a34a)",
                            }}
                          >
                            {isProctored ? "🎯 Proctored" : "📖 Learning"}
                          </span>
                        </td>
                        <td style={{ color: "var(--t3)", fontSize: 13 }}>
                          {new Date(node.date_taken).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td>
                          <span style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 800, color: scoreColor(node.score) }}>
                            {Math.round(node.score)}%
                          </span>
                        </td>
                        <td style={{ fontSize: 13, color: "var(--t2)" }}>
                          {node.correct} ✓ &nbsp; {node.wrong} ✗
                        </td>
                        <td style={{ fontSize: 13, color: "var(--t3)" }}>
                          {formatTime(node.time_taken)}
                        </td>
                        <td>
                          {trend == null ? (
                            <span className="trend-up">↑ New</span>
                          ) : trend > 0 ? (
                            <span className="trend-up">↑ +{Math.round(trend)}%</span>
                          ) : trend < 0 ? (
                            <span className="trend-down">↓ {Math.round(trend)}%</span>
                          ) : (
                            <span style={{ color: "var(--t3)" }}>→ 0%</span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => router.push(`/exams/${node.course_id}/${node.id}/result`)}
                          >
                            View →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ── Mobile cards ── */}
            <div className="hist-cards">
              {filtered.map(({ node }) => {
                const trend = node.trend;
                const isProctored = node.mode === TestModeType.Proctured;
                return (
                  <div key={node.id} className="hist-card">
                    <div className="hist-card-top">
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "var(--r)",
                          background: iconBg(node.course_title),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        {subjectIcon(node.course_title)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="hist-test-name" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {node.course_title}
                        </div>
                        <div className="hist-meta">{subjectLabel(node.course_title)}</div>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: 20,
                          fontWeight: 800,
                          color: scoreColor(node.score),
                          flexShrink: 0,
                        }}
                      >
                        {Math.round(node.score)}%
                      </span>
                    </div>

                    <div className="hist-card-meta">
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 20,
                          background: isProctored ? "var(--indigo-lt, #eef2ff)" : "var(--green-lt, #f0fdf4)",
                          color: isProctored ? "var(--indigo, #4f46e5)" : "var(--green, #16a34a)",
                        }}
                      >
                        {isProctored ? "🎯 Proctored" : "📖 Learning"}
                      </span>
                      {trend == null ? (
                        <span className="trend-up" style={{ fontSize: 12 }}>↑ New</span>
                      ) : trend > 0 ? (
                        <span className="trend-up" style={{ fontSize: 12 }}>↑ +{Math.round(trend)}%</span>
                      ) : trend < 0 ? (
                        <span className="trend-down" style={{ fontSize: 12 }}>↓ {Math.round(trend)}%</span>
                      ) : (
                        <span style={{ color: "var(--t3)", fontSize: 12 }}>→ 0%</span>
                      )}
                    </div>

                    <div className="hist-card-detail">
                      <span>📅 {new Date(node.date_taken).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>✓ {node.correct} &nbsp; ✗ {node.wrong}</span>
                      <span>⏱ {formatTime(node.time_taken)}</span>
                    </div>

                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{ alignSelf: "flex-end" }}
                      onClick={() => router.push(`/exams/${node.course_id}/${node.id}/result`)}
                    >
                      View Result →
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="bottom-nav" style={{ display: "none" }}>
        <div className="bnav-item" onClick={() => router.push("/dashboard")}>
          <span className="bnav-icon">🏠</span>
          <span className="bnav-label">Home</span>
        </div>
        <div className="bnav-item" onClick={() => router.push("/exams")}>
          <span className="bnav-icon">✦</span>
          <span className="bnav-label">Test</span>
        </div>
        <div className="bnav-item">
          <span className="bnav-icon">🧠</span>
          <span className="bnav-label">Weak</span>
        </div>
        <div className="bnav-item act">
          <span className="bnav-icon">📋</span>
          <span className="bnav-label">History</span>
        </div>
      </div>
    </div>
  );
}
