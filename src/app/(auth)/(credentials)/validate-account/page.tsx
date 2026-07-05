"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCompleteStudentAccountValidation,
  useResendAccountValidationCode,
} from "@/common/hooks/mutations";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function ValidateAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { completeStudentAccountValidation, loading: validating } =
    useCompleteStudentAccountValidation();
  const { resendAccountValidationCode, loading: resending } =
    useResendAccountValidationCode();

  useEffect(() => {
    if (!email) router.replace("/signin");
  }, [email, router]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      const digit = value.replace(/\D/g, "").slice(-1);
      const next = [...digits];
      next[index] = digit;
      setDigits(next);
      setErrorMessage(null);

      if (digit && index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [digits],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
      if (!pasted) return;
      const next = [...digits];
      pasted.split("").forEach((char, i) => {
        next[i] = char;
      });
      setDigits(next);
      const focusIdx = Math.min(pasted.length, CODE_LENGTH - 1);
      inputRefs.current[focusIdx]?.focus();
    },
    [digits],
  );

  const handleSubmit = async () => {
    const code = digits.join("");
    if (code.length < CODE_LENGTH) {
      setErrorMessage("Please enter all 6 digits.");
      return;
    }

    try {
      setErrorMessage(null);
      const response = await completeStudentAccountValidation({
        variables: { email, validationCode: code },
      });

      if (response.errors?.length) throw new Error(response.errors[0].message);

      setSuccessMessage("Account verified! Redirecting to sign in…");
      setTimeout(() => router.push("/signin"), 1800);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.",
      );
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;

    try {
      setErrorMessage(null);
      setSuccessMessage(null);
      const response = await resendAccountValidationCode({
        variables: { email },
      });

      if (response.errors?.length) throw new Error(response.errors[0].message);

      setSuccessMessage("A new code has been sent to your email.");
      setCooldown(RESEND_COOLDOWN);
      setDigits(Array(CODE_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Could not resend code. Please try again.",
      );
    }
  };

  const isComplete = digits.every((d) => d !== "");

  return (
    <div className="signup-right">
      <div className="signup-form-card">
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "var(--blue-lt)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              marginBottom: 12,
            }}
          >
            ✉️
          </div>
          <div className="su-form-title">Check your email</div>
          <div className="su-form-sub">
            We sent a 6-digit code to{" "}
            <span style={{ fontWeight: 600, color: "var(--t1)" }}>
              {email || "your email"}
            </span>
            . Enter it below to verify your account.
          </div>
        </div>

        {successMessage && (
          <div
            style={{
              display: "block",
              padding: "10px 14px",
              background: "var(--green-lt)",
              border: "1px solid var(--green-bd)",
              borderRadius: "var(--r)",
              color: "#065f46",
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 12,
            }}
          >
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="ferr" style={{ display: "block", marginBottom: 12 }}>
            {errorMessage}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            margin: "20px 0",
          }}
          onPaste={handlePaste}
        >
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: 44,
                height: 52,
                textAlign: "center",
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "var(--mono, monospace)",
                borderRadius: "var(--r)",
                border: `1.5px solid ${digit ? "var(--blue)" : "var(--border)"}`,
                background: digit ? "var(--blue-lt)" : "var(--bg)",
                color: "var(--t1)",
                outline: "none",
                transition: "border-color 0.15s, background 0.15s",
                caretColor: "transparent",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--blue)";
                e.target.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--blue) 15%, transparent)";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
                if (!digit) e.target.style.borderColor = "var(--border)";
              }}
            />
          ))}
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%", marginTop: 4 }}
          onClick={handleSubmit}
          disabled={validating || !isComplete}
          type="button"
        >
          {validating ? "Verifying…" : "Verify Account →"}
        </button>

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "var(--t3)",
          }}
        >
          Didn&apos;t receive a code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || resending}
            style={{
              background: "none",
              border: "none",
              cursor: cooldown > 0 || resending ? "default" : "pointer",
              color: cooldown > 0 || resending ? "var(--t4)" : "var(--blue)",
              fontWeight: 600,
              fontSize: 13,
              padding: 0,
            }}
          >
            {resending
              ? "Sending…"
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend code"}
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 12, fontSize: 13 }}>
          <button
            type="button"
            onClick={() => router.push("/signin")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--t3)",
              fontSize: 13,
              padding: 0,
            }}
          >
            ← Back to sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ValidateAccountPage() {
  return (
    <Suspense>
      <ValidateAccountForm />
    </Suspense>
  );
}
