"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SuiteType, TestModeType } from "@/common/graphql/generated/graphql";

const TAB_CONFIG = [
  { key: SuiteType.YearOne,       label: "Year 1",         pillLabel: "Y1",  pillClass: "pill-y1"   },
  { key: SuiteType.YearTwo,       label: "Year 2",         pillLabel: "Y2",  pillClass: "pill-y2"   },
  { key: SuiteType.YearThree,     label: "Year 3",         pillLabel: "Y3",  pillClass: "pill-y3"   },
  { key: SuiteType.Mixed,         label: "Mixed",          pillLabel: "MIX", pillClass: "pill-mix"  },
  { key: SuiteType.PastQuestions, label: "Past Questions", pillLabel: "PQ",  pillClass: "pill-past" },
] satisfies { key: SuiteType; label: string; pillLabel: string; pillClass: string }[];

type CourseNode = {
  id: string;
  title: string;
  avatar_url: string;
  total_questions: number;
  estimated_duration: number;
  approved_version?: {
    test_suites?: {
      id: string;
      title?: string | null;
      keywords?: string[] | null;
      suite_type?: SuiteType | null;
    }[] | null;
  } | null;
};

interface CourseAccordionItemProps {
  node: CourseNode;
  isExpanded: boolean;
  onToggle: () => void;
  onStartTest: (suiteId: string, courseId: string, mode: TestModeType) => void;
  startingTest: boolean;
}

export default function CourseAccordionItem({
  node,
  isExpanded,
  onToggle,
  onStartTest,
  startingTest,
}: CourseAccordionItemProps) {
  const [activeTab, setActiveTab] = useState<SuiteType>(SuiteType.YearOne);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const allSuites = node.approved_version?.test_suites ?? [];

  useEffect(() => {
    if (isExpanded) {
      const first = TAB_CONFIG.find((t) => allSuites.some((s) => s.suite_type === t.key));
      setActiveTab(first?.key ?? SuiteType.YearOne);
    }
  }, [isExpanded]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = allSuites.filter((s) => s.suite_type === activeTab);
  const suiteCount = node.approved_version?.test_suites?.length ?? 0;
  const totalMins = (node.estimated_duration / 60000).toFixed(0);

  const countFor = (tab: SuiteType) => allSuites.filter((s) => s.suite_type === tab).length;
  const visibleTabs = TAB_CONFIG.filter((t) => countFor(t.key) > 0);
  const cols = filtered.length <= 1 ? 1 : 2;

  return (
    <div ref={containerRef} className="course-block" style={{ marginBottom: 10 }}>
      {/* Course row */}
      <div
        onClick={onToggle}
        className={`exam-course-row${isExpanded ? " exam-course-row--open" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "var(--card)",
          padding: "14px 18px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 8,
            background: "var(--blue-lt)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {node.avatar_url ? (
            <img src={node.avatar_url} alt={node.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            "📚"
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--t1)", marginBottom: 3 }}>
            {node.title}
          </div>
          <div className="text-xs" style={{ color: "var(--t3)", fontFamily: "var(--mono, monospace)" }}>
            {node.total_questions} questions · {totalMins} mins · {suiteCount} suite{suiteCount !== 1 ? "s" : ""}
          </div>
        </div>

        <ChevronDown
          size={18}
          style={{
            color: isExpanded ? "var(--blue)" : "var(--t3)",
            transition: "transform 0.2s, color 0.15s",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Suite panel — grid-template-rows animation */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
          transition: "grid-template-rows 260ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="suite-panel">
            {/* Tab bar */}
            <div className="tab-bar">
              {visibleTabs.map((t) => (
                <button
                  key={t.key}
                  className={`tab-btn${activeTab === t.key ? " active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); setActiveTab(t.key as SuiteType); }}
                >
                  {t.label}
                  <span className="tab-badge">{countFor(t.key)}</span>
                </button>
              ))}
            </div>

            {/* Suite body */}
            <div className="suite-body">
              {filtered.length === 0 && (
                <div className="text-sm" style={{ color: "var(--t3)", padding: "20px 0", textAlign: "center" }}>
                  No suites available for this category.
                </div>
              )}

              {filtered.length > 0 && (
                <div className={`suite-grid cols-${cols}`}>
                  {filtered.map((suite) => {
                    const tabInfo = TAB_CONFIG.find((t) => t.key === suite.suite_type)
                      ?? { pillLabel: "—", pillClass: "pill-all" };
                    return (
                      <div key={suite.id} className="suite-card">
                        <div className="suite-card-top">
                          <span className={`suite-type-pill ${tabInfo.pillClass}`}>
                            {tabInfo.pillLabel}
                          </span>
                          <div className="suite-card-title">{suite.title}</div>
                        </div>

                        {suite.keywords && suite.keywords.length > 0 && (
                          <div className="suite-card-tags">
                            {suite.keywords.slice(0, 5).map((kw, i) => (
                              <span key={i} className="stag">{kw}</span>
                            ))}
                          </div>
                        )}

                        <div className="suite-card-actions">
                          <button
                            className="btn-learn"
                            disabled={startingTest}
                            onClick={() => onStartTest(suite.id, node.id, TestModeType.UnProctured)}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                            </svg>
                            Learning
                          </button>
                          <button
                            className="btn-proctor"
                            disabled={startingTest}
                            onClick={() => onStartTest(suite.id, node.id, TestModeType.Proctured)}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="3"/>
                              <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
                            </svg>
                            Proctored
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
