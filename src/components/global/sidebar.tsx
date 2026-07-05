"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStudentProfile } from "@/common/hooks/queries";
import { useSidebar } from "@/common/context/sidebar-context";
import { GENPOP_EMAIL } from "@/common/configs/constants";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { open, close } = useSidebar();
  const isDashboard = pathname === "/dashboard";
  const isExams = pathname.startsWith("/exams");
  const isMyTests = pathname.startsWith("/my-tests");
  const isWeakAreas = pathname.startsWith("/weak-areas");
  const isSettings = pathname.startsWith("/settings");
  const isAssignedTests = pathname.startsWith("/assigned-tests");
  const isBilling = pathname.startsWith("/billing");
  const isChild =
    typeof window !== "undefined" &&
    sessionStorage.getItem("isChild") === "true";
  const orgEmail =
    typeof window !== "undefined"
      ? (sessionStorage.getItem("organizationEmail") ?? "")
      : "";
  const isGenpopStudent = !isChild && orgEmail === GENPOP_EMAIL;
  const { studentProfile, data: profileData } = useStudentProfile();

  useEffect(() => {
    studentProfile();
  }, [studentProfile]);

  const avatarInitials = profileData?.name
    ? profileData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  function handleLogout() {
    sessionStorage.clear();
    window.location.href = "/signin";
    // router.push("/signin");
  }

  function navigate(path: string) {
    close();
    router.push(path);
  }

  return (
    <>
      <div
        className={`sidebar-overlay${open ? " open" : ""}`}
        onClick={close}
      />

      <aside className={`sidebar${open ? " open" : ""}`} id="sidebar">
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-mark">EF</div>
          <div>
            <div className="brand-text">ExamForge</div>
            <div className="brand-sub">WAEC · FREE PLAN</div>
          </div>
        </div>

        {/* Study section */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Study</div>
          <div
            className={`nav-item${isDashboard ? " active" : ""}`}
            onClick={() => navigate("/dashboard")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Dashboard
          </div>
          <div
            className={`nav-item${isExams ? " active" : ""}`}
            onClick={() => navigate("/exams")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start Test
          </div>
          <div
            className={`nav-item${isMyTests ? " active" : ""}`}
            onClick={() => navigate("/my-tests")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
            </svg>
            My Tests
          </div>
          {isChild && (
            <div
              className={`nav-item${isAssignedTests ? " active" : ""}`}
              onClick={() => navigate("/assigned-tests")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Assigned Tests
            </div>
          )}
        </div>

        {/* Analysis section */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Analysis</div>
          <div
            className={`nav-item${isWeakAreas ? " active" : ""}`}
            onClick={() => navigate("/weak-areas")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Weak Areas
          </div>
          <div className="nav-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Adaptive Tests
          </div>
        </div>

        {/* Account section */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Account</div>
          <div className="nav-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            Profile
          </div>
          {isGenpopStudent && (
            <div
              className={`nav-item${isBilling ? " active" : ""}`}
              onClick={() => navigate("/billing")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Billing
            </div>
          )}
          <div
            className={`nav-item${isSettings ? " active" : ""}`}
            onClick={() => navigate("/settings")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
            </svg>
            Settings
          </div>
        </div>

        {/* Bottom — user card + logout */}
        <div className="sidebar-bottom" style={{ position: "relative" }}>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 6px)",
                left: 0,
                right: 0,
                background: "#1a2f5e",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                zIndex: 100,
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "11px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#fca5a5",
                  fontWeight: 500,
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Log out
              </button>
            </div>
          )}

          <div
            className="user-card"
            onClick={() => setDropdownOpen((o) => !o)}
            style={{ userSelect: "none" }}
          >
            <div className="avatar">{avatarInitials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name">{profileData?.name ?? ""}</div>
              <div className="user-sub">
                {profileData?.subscribed_categories?.at(0)?.name ||
                  "WASSCE 2026"}
              </div>
            </div>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                color: "rgba(255,255,255,0.3)",
                flexShrink: 0,
                transition: "transform 0.2s",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
}
