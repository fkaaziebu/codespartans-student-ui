"use client";
import Link from "next/link";

export default function OAuthFailedPage() {
  return (
    <div className="signup-right" style={{ width: "100%" }}>
      <div className="signup-form-card" style={{ textAlign: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--red-lt)",
            border: "1px solid var(--red-bd)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="su-form-title">Sign in failed</div>
        <div className="su-form-sub">
          Google sign-in was not completed. You can try again or sign in with
          your email and password.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
          <Link href="/signin" className="btn btn-primary" style={{ textAlign: "center" }}>
            Back to sign in
          </Link>
          <Link href="/signup" className="btn" style={{ textAlign: "center" }}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
