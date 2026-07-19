"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function OAuthConsentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  useEffect(() => {
    const rawToken = searchParams.get("token");
    if (!rawToken) {
      router.push("/oauth/failed");
      return;
    }

    setToken(rawToken);
    setIsInitialLoading(true);
    setErrorMessage(null);

    fetch(
      `/api/v1/students/auth/consent/info?token=${encodeURIComponent(rawToken)}`,
    )
      .then(async (res) => {
        if (res.status === 401 || res.status === 400) {
          router.push("/oauth/failed");
          return;
        }
        if (res.status === 429) {
          setErrorMessage(
            "Too many attempts. Please wait a moment and try again.",
          );
          setIsInitialLoading(false);
          return;
        }
        if (!res.ok) {
          setErrorMessage("Something went wrong. Please try again.");
          setIsInitialLoading(false);
          return;
        }
        const data = await res.json();
        setEmail(data.email ?? "");
        setFirstName(data.firstName ?? "");
        setLastName(data.lastName ?? "");
        setIsInitialLoading(false);
      })
      .catch(() => {
        setErrorMessage("Something went wrong. Please try again.");
        setIsInitialLoading(false);
      });
  }, [searchParams, router, retryCount]);

  const handleConsent = async (consent: "yes" | "no") => {
    if (consent === "no") {
      router.push("/oauth/failed");
      return;
    }

    if (!termsChecked) {
      setTermsError("You must accept the terms to continue");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSessionExpired(false);

    try {
      const response = await fetch("/api/auth/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent, token }),
      });

      if (response.status === 401) {
        setSessionExpired(true);
        setIsLoading(false);
        return;
      }

      if (response.status === 429) {
        setErrorMessage(
          "Too many attempts. Please wait a moment and try again.",
        );
        setIsLoading(false);
        return;
      }

      if (response.status === 400) {
        router.push("/oauth/failed");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to process consent. Please try again.");
      }

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error("No redirect URL received.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="signup-right" style={{ width: "100%" }}>
        <div className="signup-form-card" style={{ textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              margin: "0 auto 16px",
              borderRadius: "50%",
              border: "3px solid var(--border)",
              borderTopColor: "var(--blue)",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div className="su-form-sub">Loading…</div>
        </div>
      </div>
    );
  }

  if (sessionExpired) {
    return (
      <div className="signup-right" style={{ width: "100%" }}>
        <div className="signup-form-card" style={{ textAlign: "center" }}>
          <div className="su-form-title">Session expired</div>
          <div className="su-form-sub">
            Your session has expired. Please sign in again to continue.
          </div>
          <Link
            href="/signin"
            className="btn btn-primary"
            style={{ display: "block", marginTop: 16, textAlign: "center" }}
          >
            Sign in again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-right" style={{ width: "100%" }}>
      <div className="signup-form-card">
        <div className="su-form-title">Create your account</div>
        <div className="su-form-sub">
          No account was found for your Google email. Would you like to create a
          new account?
        </div>

        {errorMessage && (
          <div className="ferr" style={{ display: "block", marginBottom: 12 }}>
            {errorMessage}
            {errorMessage.startsWith("Something went wrong") && (
              <button
                className="btn"
                style={{ marginTop: 8, width: "100%" }}
                onClick={() => setRetryCount((c) => c + 1)}
                type="button"
              >
                Retry
              </button>
            )}
          </div>
        )}

        <div
          style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            padding: "12px 16px",
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
            }}
          >
            <span style={{ color: "var(--t3)" }}>Name</span>
            <span style={{ color: "var(--t1)", fontWeight: 600 }}>
              {firstName} {lastName}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
            }}
          >
            <span style={{ color: "var(--t3)" }}>Email</span>
            <span style={{ color: "var(--t1)", fontWeight: 600 }}>{email}</span>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div className="terms-row">
            <div
              className={`custom-check${termsChecked ? " checked" : ""}`}
              onClick={() => {
                setTermsChecked((v) => !v);
                setTermsError(null);
              }}
            />
            <div
              className="terms-text"
              onClick={() => {
                setTermsChecked((v) => !v);
                setTermsError(null);
              }}
            >
              I agree to CodeSpartans&apos;{" "}
              <a
                href={`${process.env.NEXT_PUBLIC_LANDING_URL}/terms`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href={`${process.env.NEXT_PUBLIC_LANDING_URL}/terms`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </a>
              .
            </div>
          </div>
          {termsError && (
            <div className="ferr" style={{ display: "block", marginTop: 6 }}>
              {termsError}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn"
            style={{ flex: 1 }}
            onClick={() => handleConsent("no")}
            disabled={isLoading}
            type="button"
          >
            No, go back
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={() => handleConsent("yes")}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? "Creating…" : "Yes, create account"}
          </button>
        </div>

        <div
          className="text-xs text-muted mt12"
          style={{ textAlign: "center" }}
        >
          Already have an account?{" "}
          <Link
            href="/signin"
            style={{ color: "var(--blue)", fontWeight: 600 }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OAuthConsentPage() {
  return (
    <Suspense>
      <OAuthConsentInner />
    </Suspense>
  );
}
