"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { ApolloError } from "@apollo/client";
import {
  useVerifyChildUsername,
  useLoginChild,
  useRequestChildPinReset,
} from "@/common/hooks/mutations";

type Screen = "username" | "pin" | "success" | "forgot";

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 300_000; // 5 minutes — matches server lockout
const LOCKOUT_MSG = "Account locked for 5 minutes";

function ChildLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [screen, setScreen] = useState<Screen>("username");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [childName, setChildName] = useState("");
  const [childInitials, setChildInitials] = useState("");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [lockSecsLeft, setLockSecsLeft] = useState(0);
  const [pinShake, setPinShake] = useState(false);
  const [resetRequestSent, setResetRequestSent] = useState(false);
  const [resetRequestConfirmed, setResetRequestConfirmed] = useState(false);
  const [resetRequestError, setResetRequestError] = useState("");
  const [showSupportNote, setShowSupportNote] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const pinRealRef = useRef<HTMLInputElement>(null);

  const { verifyChildUsername, loading: verifyLoading } =
    useVerifyChildUsername();
  const { loginChild, loading: loginLoading } = useLoginChild();
  const { requestChildPinReset } = useRequestChildPinReset();

  const goTo = useCallback((next: Screen) => setScreen(next), []);

  // Handle callback mode: if token is in URL params, store and redirect
  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const organizationId = searchParams.get("organizationId");
    const isSetupCompleted = searchParams.get("isSetupCompleted");

    if (token && organizationId) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", refreshToken ?? "");
      sessionStorage.setItem("organizationId", organizationId);
      sessionStorage.setItem("isSetupCompleted", isSetupCompleted ?? "");
      router.replace(isSetupCompleted === "false" ? "/setup" : "/dashboard");
    }
  }, [searchParams, router]);

  // Restore persisted lockout on mount (survives page refresh)
  useEffect(() => {
    const storedLock = sessionStorage.getItem("childLockUntil");
    const storedUser = sessionStorage.getItem("childLockUsername");
    if (storedLock && storedUser && Number(storedLock) > Date.now()) {
      const lockUntil = Number(storedLock);
      setLockedUntil(lockUntil);
      setUsername(storedUser);
      const parts = storedUser.split(/[._\-\s]/);
      const display = parts
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
      setChildName(display);
      setChildInitials(
        parts
          .map((p) => p[0]?.toUpperCase() ?? "")
          .join("")
          .slice(0, 2),
      );
      goTo("pin");
      // Silently re-verify to get a fresh temp_token for the reset flow
      verifyChildUsername({ variables: { input: { username: storedUser } } })
        .then((res) => {
          const t = res.data?.verifyChildUsername.temp_token;
          if (t) setTempToken(t);
        })
        .catch(() => {/* ignore — reset button will retry on demand */});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock countdown
  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const secs = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (secs <= 0) {
        // Lockout expired — clear everything and go back to username entry
        setLockedUntil(null);
        setLockSecsLeft(0);
        setPin("");
        setPinError("");
        setFailedAttempts(0);
        setResetRequestSent(false);
        setResetRequestConfirmed(false);
        setResetRequestError("");
        setShowSupportNote(false);
        sessionStorage.removeItem("childLockUntil");
        sessionStorage.removeItem("childLockUsername");
        setTempToken("");
        setChildName("");
        setChildInitials("");
        setUsername("");
        goTo("username");
        setTimeout(() => usernameInputRef.current?.focus(), 300);
      } else {
        setLockSecsLeft(secs);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil, goTo]);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (screen === "pin") setTimeout(() => pinRealRef.current?.focus(), 300);
  }, [screen]);

  function triggerShake() {
    setPinShake(true);
    setTimeout(() => setPinShake(false), 450);
  }

  const isDeactivatedCode = (extensions?: Record<string, unknown>) => {
    const code = extensions?.code as string | undefined;
    return code === "UNAUTHENTICATED" || code === "401";
  };
  const isDeactivatedMsg = (msg: string) =>
    msg.toLowerCase().includes("unauthorized");
  const isDeactivatedError = (err: unknown): boolean => {
    if (!(err instanceof Error)) return false;
    if (isDeactivatedMsg(err.message)) return true;
    return (
      err instanceof ApolloError &&
      err.graphQLErrors.some((e) => isDeactivatedCode(e.extensions))
    );
  };

  async function handleSubmitUsername() {
    const val = username.trim();
    if (!val) {
      setUsernameError("Please enter your username.");
      return;
    }
    setUsernameError("");
    try {
      const res = await verifyChildUsername({
        variables: { input: { username: val } },
      });
      if (res.errors?.length) {
        const e = res.errors[0];
        const msg = e?.message ?? "";
        setUsernameError(
          isDeactivatedMsg(msg) || isDeactivatedCode(e?.extensions)
            ? msg
            : msg || "Username not found.",
        );
        return;
      }
      const token = res.data?.verifyChildUsername.temp_token;
      if (!token) {
        setUsernameError(
          "Username not found. Check the spelling or ask your parent.",
        );
        return;
      }
      setTempToken(token);
      const parts = val.split(/[._\-\s]/);
      const display = parts
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
      setChildName(display);
      setChildInitials(
        parts
          .map((p) => p[0]?.toUpperCase() ?? "")
          .join("")
          .slice(0, 2),
      );
      setPin("");
      setPinError("");
      setFailedAttempts(0);
      setLockedUntil(null);
      goTo("pin");
    } catch (err) {
      setUsernameError(
        isDeactivatedError(err)
          ? // @ts-expect-error err
            err?.message
          : // @ts-expect-error err
            err?.message || "Something went wrong. Please try again.",
      );
    }
  }

  function pressKey(k: string) {
    if (lockedUntil && Date.now() < lockedUntil) return;
    if (loginLoading) return;
    if (k === "del") {
      setPin((p) => p.slice(0, -1));
      setPinError("");
      return;
    }
    setPin((prev) => {
      if (prev.length >= 6) return prev;
      const next = prev + k;
      if (next.length === 6) setTimeout(() => handleSubmitPin(next), 120);
      return next;
    });
  }

  async function handleSubmitPin(currentPin?: string) {
    const pinToUse = currentPin ?? pin;
    if (pinToUse.length < 6) return;
    if (lockedUntil && Date.now() < lockedUntil) return;
    try {
      const res = await loginChild({
        variables: { input: { temp_token: tempToken, pin: pinToUse } },
      });
      if (res.errors?.length) {
        const e = res.errors[0];
        const msg = e?.message ?? "";

        if (isDeactivatedMsg(msg) || isDeactivatedCode(e?.extensions)) {
          setPin("");
          setPinError(
            "Your account has been deactivated. Please ask your parent for help.",
          );
          return;
        }

        setPin("");

        if (msg.includes("Account locked")) {
          // 5th attempt or already-locked subsequent call → show lockout screen
          const lockUntil = Date.now() + LOCK_DURATION_MS;
          setLockedUntil(lockUntil);
          sessionStorage.setItem("childLockUntil", String(lockUntil));
          sessionStorage.setItem("childLockUsername", username);
          setPinError(LOCKOUT_MSG);
          triggerShake();
        } else {
          setFailedAttempts((n) => n + 1);
          setPinError(msg);
          triggerShake();
        }
        return;
      }
      const data = res.data?.loginChild;
      if (!data) {
        setPinError("Login failed. Please try again.");
        return;
      }

      const orgId = data.student?.organizations?.[0]?.id ?? "";
      const isSetup = data.student?.is_setup_completed ?? false;

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("refreshToken", data.refresh_token);
      sessionStorage.setItem("organizationId", orgId);
      sessionStorage.setItem("isSetupCompleted", String(isSetup));
      sessionStorage.setItem("isChild", "true");
      // Clear any stale lockout data on successful login
      sessionStorage.removeItem("childLockUntil");
      sessionStorage.removeItem("childLockUsername");

      setChildName(data.full_name);
      setChildInitials(
        data.full_name
          .split(" ")
          .map((p: string) => p[0]?.toUpperCase() ?? "")
          .join("")
          .slice(0, 2),
      );
      setFailedAttempts(0);
      goTo("success");

      setTimeout(() => router.replace(isSetup ? "/dashboard" : "/setup"), 1800);
    } catch (err) {
      const msg =
        (err instanceof ApolloError
          ? err.graphQLErrors[0]?.message
          : (err as Error)?.message) ?? "";

      setPin("");

      if (msg.includes("Account locked")) {
        const lockUntil = Date.now() + LOCK_DURATION_MS;
        setLockedUntil(lockUntil);
        sessionStorage.setItem("childLockUntil", String(lockUntil));
        sessionStorage.setItem("childLockUsername", username);
        setPinError(LOCKOUT_MSG);
        triggerShake();
      } else if (isDeactivatedError(err)) {
        setPinError(
          "Your account has been deactivated. Please ask your parent for help.",
        );
      } else {
        setPinError(msg || "Something went wrong. Please try again.");
        triggerShake();
      }
    }
  }

  async function handleRequestPinReset() {
    setResetRequestError("");
    let token = tempToken;

    // Ensure we have a valid temp_token before calling the mutation
    if (!token) {
      try {
        const res = await verifyChildUsername({
          variables: { input: { username } },
        });
        token = res.data?.verifyChildUsername.temp_token ?? "";
        if (token) setTempToken(token);
      } catch {
        setResetRequestError("Something went wrong. Please try again.");
        return;
      }
    }

    try {
      await requestChildPinReset({ variables: { input: { temp_token: token } } });
      setResetRequestSent(true);
      setResetRequestConfirmed(true);
    } catch (err) {
      const msg =
        (err instanceof ApolloError
          ? err.graphQLErrors[0]?.message
          : (err as Error)?.message) ?? "";

      if (msg.includes("not currently locked")) {
        // Lock expired before they pressed the button — hide it silently
        setResetRequestSent(true);
      } else if (msg.includes("Invalid") || msg.includes("expired")) {
        // temp_token expired — refresh then retry once
        try {
          const res2 = await verifyChildUsername({
            variables: { input: { username } },
          });
          const t2 = res2.data?.verifyChildUsername.temp_token ?? "";
          if (t2) {
            setTempToken(t2);
            await requestChildPinReset({
              variables: { input: { temp_token: t2 } },
            });
            setResetRequestSent(true);
            setResetRequestConfirmed(true);
          } else {
            setResetRequestError("Something went wrong. Please try again.");
          }
        } catch {
          setResetRequestError("Something went wrong. Please try again.");
        }
      } else {
        setResetRequestError("Something went wrong. Please try again.");
      }
    }
  }

  function handleGoBack() {
    setPin("");
    setPinError("");
    setChildName("");
    setChildInitials("");
    setTempToken("");
    setFailedAttempts(0);
    setLockedUntil(null);
    setUsername("");
    setResetRequestSent(false);
    setResetRequestConfirmed(false);
    setResetRequestError("");
    setShowSupportNote(false);
    sessionStorage.removeItem("childLockUntil");
    sessionStorage.removeItem("childLockUsername");
    goTo("username");
    setTimeout(() => usernameInputRef.current?.focus(), 300);
  }

  const headerName = childName ? `, ${childName.split(" ")[0]}!` : "";
  const headerSub =
    screen === "pin"
      ? "Enter your 6-digit PIN"
      : screen === "success"
        ? "Logged in successfully"
        : "Enter your username to start";

  const isLocked = !!lockedUntil && Date.now() < lockedUntil;
  const isUrgentError = pinError.includes("1 more attempt");

  return (
    <div className="cl-page">
      {/* Background */}
      <div className="cl-bg-orb cl-bg-orb-1" />
      <div className="cl-bg-orb cl-bg-orb-2" />
      <div className="cl-bg-orb cl-bg-orb-3" />
      <div className="cl-bg-grid" />

      {/* Card */}
      <div className="cl-login-card">
        {/* Header */}
        <div className="cl-card-header">
          <div className="cl-logo-row">
            <div className="cl-logo-text">
              <Image
                src="/icon.svg"
                alt="ExamForge"
                width={24}
                height={24}
                style={{ borderRadius: 6 }}
              />
              ExamForge
            </div>
            <span className="cl-student-badge">STUDENT LOGIN</span>
          </div>
          <div className="cl-avatar-zone">
            <div
              className="cl-avatar-ring"
              style={
                childInitials
                  ? {
                      background: "rgba(255,255,255,0.15)",
                      borderColor: "rgba(255,255,255,0.4)",
                    }
                  : {}
              }
            >
              {childInitials ? (
                <span className="cl-avatar-initials">{childInitials}</span>
              ) : (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>
            <div>
              <div className="cl-header-welcome">
                Welcome back<span>{headerName}</span>
              </div>
              <div className="cl-header-sub">{headerSub}</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="cl-card-body">
          {/* Screen 1: Username */}
          <div className={`cl-screen${screen === "username" ? " active" : ""}`}>
            {usernameError && (
              <div className="cl-error-banner show">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{usernameError}</span>
              </div>
            )}
            <div className="cl-field-group">
              <label className="cl-field-label">Your username</label>
              <input
                ref={usernameInputRef}
                className={`cl-field-input${usernameError ? " error" : ""}`}
                type="text"
                placeholder="e.g. kofi.mensah42"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitUsername()}
              />
              <div className="cl-field-hint">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Your username was given to you by your parent
              </div>
            </div>
            <button
              className={`cl-submit-btn${verifyLoading ? " loading" : ""}`}
              onClick={handleSubmitUsername}
              disabled={verifyLoading}
            >
              <span className="cl-btn-text">Continue →</span>
              <div className="cl-btn-spinner" />
            </button>
            <div className="cl-divider">
              <div className="cl-divider-line" />
              <div className="cl-divider-text">or</div>
              <div className="cl-divider-line" />
            </div>
            <div className="cl-parent-link">
              <p>
                Student? <a href="/signin">Sign in with email →</a>
              </p>
            </div>
          </div>

          {/* Screen 2: PIN */}
          <div className={`cl-screen${screen === "pin" ? " active" : ""}`}>
            {pinError && !isLocked && (
              <div className={`cl-error-banner show${isUrgentError ? " urgent" : ""}`}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{pinError}</span>
              </div>
            )}
            <div className="cl-pin-section">
              {!isLocked && (
                <label className="cl-field-label">
                  Enter your 6-digit PIN
                  <button
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#3B6D11",
                      fontSize: 12,
                      fontWeight: 500,
                      padding: 0,
                    }}
                    onClick={() => goTo("forgot")}
                  >
                    Forgot PIN?
                  </button>
                </label>
              )}
              <div className="cl-pin-dots-row">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`cl-pin-dot${pin.length > i ? " filled" : ""}${pinShake ? " error" : ""}`}
                  />
                ))}
              </div>
              <input
                ref={pinRealRef}
                type="tel"
                className="cl-pin-real-input"
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                value={pin}
                disabled={isLocked}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setPin(val);
                  setPinError("");
                  if (val.length === 6)
                    setTimeout(() => handleSubmitPin(val), 120);
                }}
              />
            </div>

            {isLocked ? (
              /* Lockout screen replaces keypad */
              <div className="cl-lockout-screen">
                <div className="cl-lockout-icon">🔒</div>
                <p className="cl-lockout-title">Too many wrong attempts</p>
                <p className="cl-lockout-desc">
                  Your account has been locked. Try again in:
                </p>
                <div className="cl-lockout-timer">
                  {Math.floor(lockSecsLeft / 60)}:{String(lockSecsLeft % 60).padStart(2, "0")}
                </div>
                <p className="cl-lockout-hint">
                  You can wait for the timer to expire, or ask your parent to reset your PIN.
                </p>
                {resetRequestConfirmed ? (
                  <p className="cl-lockout-confirmed">
                    We&apos;ve notified your parent. They&apos;ll receive an email with instructions to reset your PIN.
                  </p>
                ) : (
                  <>
                    {resetRequestError && (
                      <p className="cl-lockout-reset-error">{resetRequestError}</p>
                    )}
                    <button
                      className="cl-lockout-reset-btn"
                      onClick={handleRequestPinReset}
                      disabled={resetRequestSent}
                    >
                      Request PIN reset from parent
                    </button>
                  </>
                )}
                <div className="cl-lockout-support">
                  <button
                    className="cl-lockout-support-link"
                    onClick={() => setShowSupportNote((v) => !v)}
                  >
                    Contact support
                  </button>
                  {showSupportNote && (
                    <p className="cl-lockout-support-note">
                      Direct support contact is coming soon. In the meantime, ask your parent to reset your PIN from their ExamForge account.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* Normal keypad */
              <>
                <div className="cl-keypad">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((k) => (
                    <button
                      key={k}
                      className="cl-key"
                      onClick={() => pressKey(k)}
                      disabled={loginLoading}
                    >
                      <span>{k}</span>
                    </button>
                  ))}
                  <div />
                  <button
                    className="cl-key cl-key-zero"
                    onClick={() => pressKey("0")}
                    disabled={loginLoading}
                  >
                    <span>0</span>
                  </button>
                  <button
                    className="cl-key cl-key-del"
                    onClick={() => pressKey("del")}
                    disabled={loginLoading}
                    aria-label="Delete"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                      <line x1="18" y1="9" x2="12" y2="15" />
                      <line x1="12" y1="9" x2="18" y2="15" />
                    </svg>
                  </button>
                </div>
                <div className="cl-attempts-row">
                  {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                    <div
                      key={i}
                      className={`cl-attempt-pip ${i < failedAttempts ? "used" : "ok"}`}
                    />
                  ))}
                </div>
                <div style={{ marginTop: 16 }}>
                  <button
                    className={`cl-submit-btn${loginLoading ? " loading" : ""}`}
                    onClick={() => handleSubmitPin()}
                    disabled={pin.length < 6 || loginLoading}
                  >
                    <span className="cl-btn-text">Sign in →</span>
                    <div className="cl-btn-spinner" />
                  </button>
                </div>
              </>
            )}

            <div style={{ textAlign: "center", marginTop: 14 }}>
              <button className="cl-back-link" onClick={handleGoBack}>
                ← Use a different username
              </button>
            </div>
          </div>

          {/* Screen 3: Success */}
          <div className={`cl-screen${screen === "success" ? " active" : ""}`}>
            <div className="cl-success-inner">
              <div className="cl-success-check">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="cl-success-title">
                Welcome back{childName ? `, ${childName.split(" ")[0]}` : ""}!
              </div>
              <div className="cl-success-sub">
                Taking you to your dashboard…
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 24,
                }}
              >
                <div
                  className="cl-btn-spinner"
                  style={{
                    display: "block",
                    borderTopColor: "#3B6D11",
                    borderColor: "#D8EDBA",
                    width: 32,
                    height: 32,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Screen 4: Forgot PIN */}
          <div className={`cl-screen${screen === "forgot" ? " active" : ""}`}>
            <div className="cl-forgot-screen">
              <div className="cl-forgot-icon">🔑</div>
              <div className="cl-forgot-title">Forgot your PIN?</div>
              <div className="cl-forgot-desc">
                No worries — only your parent can reset your PIN from their
                ExamForge account.
              </div>
              <div className="cl-info-box">
                <strong>Ask your parent or guardian to:</strong>
                <br />
                <br />
                1. Log into their ExamForge account
                <br />
                2. Go to your profile
                <br />
                3. Tap <strong>&ldquo;Reset PIN&rdquo;</strong>
                <br />
                4. Share the new PIN with you
              </div>
              <button className="cl-back-link" onClick={() => goTo("pin")}>
                ← Back to PIN entry
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="cl-page-footer">
        <a href="#">Privacy Policy</a>
        &nbsp;·&nbsp;
        <a href="#">Terms</a>
        &nbsp;·&nbsp; ExamForge © 2025
      </div>
    </div>
  );
}

export default function ChildLoginPage() {
  return (
    <Suspense>
      <ChildLoginInner />
    </Suspense>
  );
}
