"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListCourseSuites } from "@/common/hooks/queries";
import { SuiteType, TestModeType } from "@/common/graphql/generated/graphql";

const PAGE_SIZE = 6;

const SUITE_TYPE_LABELS: Record<string, string> = {
  ALL: "All",
  [SuiteType.YearOne]:       "Year 1",
  [SuiteType.YearTwo]:       "Year 2",
  [SuiteType.YearThree]:     "Year 3",
  [SuiteType.Mixed]:         "Mixed",
  [SuiteType.PastQuestions]: "Past Questions",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  BEGINNER: "bg-green-100 text-green-700",
  INTERMEDIATE: "bg-yellow-100 text-yellow-700",
  ADVANCED: "bg-red-100 text-red-700",
};

interface CourseSuitesModalProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  onStartTest: (suiteId: string, courseId: string, mode: TestModeType) => void;
  startingTest?: boolean;
}

export default function CourseSuitesModal({
  open,
  onClose,
  courseId,
  courseTitle,
  onStartTest,
  startingTest,
}: CourseSuitesModalProps) {
  const [activeTab, setActiveTab] = useState<"ALL" | SuiteType>("ALL");
  const [displayedTab, setDisplayedTab] = useState<"ALL" | SuiteType>("ALL");
  const [page, setPage] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  // null = uninitialized (use "auto"), number = measured (enables transition)
  const [listHeight, setListHeight] = useState<number | null>(null);

  const innerRef = useRef<HTMLDivElement>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { listCourseSuites, data, loading } = useListCourseSuites();

  useEffect(() => {
    if (open && courseId) {
      listCourseSuites({
        variables: { courseId, pagination: { first: 100 } },
      });
    }
  }, [open, courseId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset when course changes
  useEffect(() => {
    setActiveTab("ALL");
    setDisplayedTab("ALL");
    setPage(1);
    setListHeight(null);
  }, [courseId]);

  // Measure content height after two animation frames so DOM is fully painted
  const measureHeight = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (innerRef.current) {
          setListHeight(innerRef.current.scrollHeight);
        }
      });
    });
  }, []);

  // First measure once content loads
  useEffect(() => {
    if (!loading && listHeight === null) {
      measureHeight();
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const animateTransition = useCallback(
    (fn: () => void) => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      // Freeze current height before content changes
      if (innerRef.current) {
        setListHeight(innerRef.current.scrollHeight);
      }
      setIsExiting(true);
      exitTimerRef.current = setTimeout(() => {
        fn();
        setIsExiting(false);
        // Measure new height after content renders → CSS transition runs
        measureHeight();
      }, 160);
    },
    [measureHeight],
  );

  const handleTabChange = useCallback(
    (value: string) => {
      const next = value as "ALL" | SuiteType;
      if (next === activeTab) return;
      setActiveTab(next);
      animateTransition(() => {
        setDisplayedTab(next);
        setPage(1);
      });
    },
    [activeTab, animateTransition],
  );

  const handlePageChange = useCallback(
    (next: number) => {
      animateTransition(() => setPage(next));
    },
    [animateTransition],
  );

  useEffect(
    () => () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    },
    [],
  );

  const allSuites = data?.edges?.map((e) => e.node) ?? [];
  const filtered =
    displayedTab === "ALL"
      ? allSuites
      : allSuites.filter((s) => s.suite_type === displayedTab);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const availableTabs = [
    "ALL",
    ...new Set(allSuites.map((s) => s.suite_type).filter(Boolean)),
  ] as ("ALL" | SuiteType)[];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="max-w-2xl flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle
            style={{
              fontFamily: "var(--serif)",
              fontSize: 18,
              fontWeight: 700,
              color: "var(--t1)",
            }}
          >
            {courseTitle}
          </DialogTitle>
          <p className="text-sm" style={{ color: "var(--t3)", marginTop: 2 }}>
            {data?.count ?? 0} suite{(data?.count ?? 0) !== 1 ? "s" : ""} available
          </p>
        </DialogHeader>

        {/* Tabs */}
        <div className="px-6 pt-4 pb-2">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              {availableTabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {SUITE_TYPE_LABELS[tab] ?? tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/*
          Outer div: holds the measured height and drives the height transition.
          Inner div: holds opacity/translate for the fade+slide animation.
          Height transitions from old → new value; opacity/translate handle entry/exit.
        */}
        <div
          style={{
            height: listHeight === null ? "auto" : listHeight,
            overflow: "hidden",
            transition: listHeight === null
              ? "none"
              : "height 280ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            ref={innerRef}
            className="px-6 py-4 flex flex-col gap-3"
            style={{
              opacity: isExiting ? 0 : 1,
              transform: isExiting ? "translateY(6px)" : "translateY(0)",
              transition: "opacity 160ms ease-in-out, transform 160ms ease-in-out",
            }}
          >
            {loading && (
              <div className="text-sm text-center py-10" style={{ color: "var(--t3)" }}>
                Loading suites…
              </div>
            )}

            {!loading && paginated.length === 0 && (
              <div className="text-sm text-center py-10" style={{ color: "var(--t3)" }}>
                No suites found for this filter.
              </div>
            )}

            {paginated.map((suite) => (
              <div
                key={suite.id}
                className="flex items-start justify-between gap-4 rounded-xl border p-4"
                style={{ background: "var(--bg)", borderColor: "var(--border)" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-sm" style={{ color: "var(--t1)" }}>
                      {suite.title}
                    </span>
                    {suite.suite_type && (
                      <Badge variant="outline" className="text-xs">
                        {SUITE_TYPE_LABELS[suite.suite_type] ?? suite.suite_type}
                      </Badge>
                    )}
                    {suite.difficulty && (
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          DIFFICULTY_COLORS[suite.difficulty] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {suite.difficulty.charAt(0) + suite.difficulty.slice(1).toLowerCase()}
                      </span>
                    )}
                  </div>

                  {suite.description && (
                    <p className="text-xs mb-2" style={{ color: "var(--t3)" }}>
                      {suite.description}
                    </p>
                  )}

                  {suite.keywords && suite.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {suite.keywords.slice(0, 5).map((kw, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: "var(--bg2)", color: "var(--t2)" }}
                        >
                          {kw}
                        </span>
                      ))}
                      {suite.keywords.length > 5 && (
                        <span className="text-xs" style={{ color: "var(--t3)" }}>
                          +{suite.keywords.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={startingTest}
                    className="text-xs"
                    onClick={() => onStartTest(suite.id, courseId, TestModeType.UnProctured)}
                  >
                    📖 Learning
                  </Button>
                  <Button
                    size="sm"
                    disabled={startingTest}
                    className="text-xs"
                    onClick={() => onStartTest(suite.id, courseId, TestModeType.Proctured)}
                  >
                    🎯 Proctored
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 px-6 py-4 border-t">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1 || isExiting}
              onClick={() => handlePageChange(page - 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft size={14} />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                disabled={isExiting}
                onClick={() => handlePageChange(p)}
                className="h-8 w-8 p-0 text-xs"
              >
                {p}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages || isExiting}
              onClick={() => handlePageChange(page + 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
