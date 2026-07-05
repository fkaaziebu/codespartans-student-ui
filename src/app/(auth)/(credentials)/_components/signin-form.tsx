"use client";
import * as z from "zod";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginStudent } from "@/common/hooks/queries";
import {
  useCancelStudentAccountDeletion,
  useVerifyCancellationOtp,
} from "@/common/hooks/mutations";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { AccountStatus } from "@/graphql/generated/graphql";

const CODE_LENGTH = 6;

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

type PendingDeletion = {
  token: string;
  deletionScheduledFor: string;
  otpVerified: boolean;
};

export default function SigninForm() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );
  const [pendingDeletion, setPendingDeletion] =
    useState<PendingDeletion | null>(null);
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginStudent } = useLoginStudent();
  const { verifyCancellationOtp } = useVerifyCancellationOtp();
  const { cancelStudentAccountDeletion } = useCancelStudentAccountDeletion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) router.push("/courses");
  }, []);

  useEffect(() => {
    const pendingToken = searchParams.get("pendingToken");
    if (pendingToken) {
      setPendingDeletion({
        token: pendingToken,
        deletionScheduledFor: searchParams.get("deletionScheduledFor") ?? "",
        otpVerified: false,
      });
      return;
    }

    const reason = searchParams.get("reason");
    if (reason === "deactivated") {
      setInfoMessage("Your account has been deactivated.");
    } else if (reason === "password_changed") {
      setInfoMessage(
        "Your session expired due to a password change. Please log in again.",
      );
    } else if (searchParams.get("deleted") === "1") {
      setInfoMessage("Your account deletion has been scheduled.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (pendingDeletion) {
      inputRefs.current[0]?.focus();
    }
  }, [pendingDeletion]);

  const togglePw = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.location.href = "/api/auth/google/login";
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setErrorMessage(null);
      setInfoMessage(null);

      const response = await loginStudent({
        variables: { email: data.email, password: data.password },
      });

      if (response.error) throw new Error(response.error.message);

      const loginData = response.data?.loginStudent;

      if (loginData?.account_status === AccountStatus.PendingDeletion) {
        setPendingDeletion({
          token: loginData.token,
          deletionScheduledFor: loginData.deletion_scheduled_for ?? "",
          otpVerified: false,
        });
        reset();
        return;
      }

      sessionStorage.setItem("token", `${loginData?.token}`);
      sessionStorage.setItem("refreshToken", `${loginData?.refresh_token}`);
      sessionStorage.setItem(
        "organizationId",
        `${loginData?.organizations?.[0]?.id}`,
      );
      sessionStorage.setItem(
        "organizationEmail",
        `${loginData?.organizations?.[0]?.email ?? ""}`,
      );
      sessionStorage.setItem(
        "isSetupCompleted",
        `${loginData?.is_setup_completed}`,
      );

      reset();

      if (!loginData?.is_setup_completed) {
        router.push("/setup");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";

      const isUnvalidated =
        /not.validated|not.verified|unverified|account.validation|validate.your.account|verification.required/i.test(
          message,
        );
      if (isUnvalidated) {
        router.push(
          `/validate-account?email=${encodeURIComponent(data.email)}`,
        );
        return;
      }

      setErrorMessage(message);
    }
  };

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      const digit = value.replace(/\D/g, "").slice(-1);
      const next = [...digits];
      next[index] = digit;
      setDigits(next);
      setOtpError(null);
      if (digit && index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [digits],
  );

  const handleOtpKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  const handleOtpPaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, CODE_LENGTH);
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

  const handleVerifyOtp = async () => {
    if (!pendingDeletion) return;
    const otp = digits.join("");
    if (otp.length < CODE_LENGTH) {
      setOtpError("Please enter all 6 digits.");
      return;
    }
    setOtpLoading(true);
    setOtpError(null);
    try {
      await verifyCancellationOtp({
        variables: { otp },
        context: {
          headers: { authorization: `Bearer ${pendingDeletion.token}` },
        },
      });
      setPendingDeletion((p) => (p ? { ...p, otpVerified: true } : p));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (/401|unauthenticated|expired.*token|token.*expired/i.test(msg)) {
        setPendingDeletion(null);
        setDigits(Array(CODE_LENGTH).fill(""));
        setErrorMessage(
          "Session expired. Please sign in again to receive a new code.",
        );
      } else {
        setOtpError("The code is incorrect or has expired. Please try again.");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleCancelDeletion = async () => {
    if (!pendingDeletion) return;
    setCancelLoading(true);
    try {
      const response = await cancelStudentAccountDeletion({
        context: {
          headers: { authorization: `Bearer ${pendingDeletion.token}` },
        },
      });
      const data = response.data?.cancelStudentAccountDeletion;
      if (data?.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("refreshToken", data.refresh_token ?? "");
        sessionStorage.setItem(
          "organizationId",
          `${data?.organizations?.[0]?.id}`,
        );
        sessionStorage.setItem(
          "organizationEmail",
          `${data?.organizations?.[0]?.email ?? ""}`,
        );
        sessionStorage.setItem(
          "isSetupCompleted",
          `${data?.is_setup_completed}`,
        );
        setPendingDeletion(null);
        setDigits(Array(CODE_LENGTH).fill(""));
        setInfoMessage("Your account has been restored.");
        router.push("/dashboard");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (/verify.*otp|otp.*first/i.test(msg)) {
        setOtpError("Please verify the OTP first.");
        setPendingDeletion((p) => (p ? { ...p, otpVerified: false } : p));
      } else {
        setOtpError(msg || "Something went wrong. Please try again.");
      }
    } finally {
      setCancelLoading(false);
    }
  };

  const handleDismissPendingDeletion = () => {
    setPendingDeletion(null);
    setDigits(Array(CODE_LENGTH).fill(""));
    setOtpError(null);
  };

  const formatDeletionDate = (iso: string) => {
    if (!iso) return "soon";
    try {
      return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  if (pendingDeletion) {
    return (
      <div className="signup-right">
        <div className="signup-form-card">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#fef2f2",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                marginBottom: 12,
              }}
            >
              ⚠️
            </div>
            <div className="su-form-title">Account Pending Deletion</div>
            <div className="su-form-sub">
              Your account is scheduled for permanent deletion on{" "}
              <strong style={{ color: "var(--t1)" }}>
                {formatDeletionDate(pendingDeletion.deletionScheduledFor)}
              </strong>
              . Enter the 6-digit code we emailed you to cancel.
            </div>
          </div>

          {otpError && (
            <div
              className="ferr"
              style={{ display: "block", marginBottom: 12 }}
            >
              {otpError}
            </div>
          )}

          {pendingDeletion.otpVerified ? (
            <div>
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "var(--r)",
                  background: "var(--green-lt)",
                  border: "1px solid var(--green-bd)",
                  color: "#065f46",
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                ✓ Code verified. Your account deletion will be cancelled.
                Confirm?
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={handleCancelDeletion}
                  disabled={cancelLoading}
                  type="button"
                >
                  {cancelLoading ? "Restoring…" : "Confirm & Restore Account"}
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() =>
                    setPendingDeletion((p) =>
                      p ? { ...p, otpVerified: false } : p,
                    )
                  }
                  disabled={cancelLoading}
                  type="button"
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "center",
                  margin: "20px 0",
                }}
                onPaste={handleOtpPaste}
              >
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
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
                      e.target.style.boxShadow =
                        "0 0 0 3px color-mix(in srgb, var(--blue) 15%, transparent)";
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
                onClick={handleVerifyOtp}
                disabled={otpLoading || digits.join("").length < CODE_LENGTH}
                type="button"
              >
                {otpLoading ? "Verifying…" : "Verify & Cancel Deletion →"}
              </button>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              type="button"
              onClick={handleDismissPendingDeletion}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--t3)",
                fontSize: 13,
                padding: 0,
              }}
            >
              Log out / Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-right">
      <div className="signup-form-card">
        <div className="su-form-title">Welcome back</div>
        <div className="su-form-sub">Sign in to continue your progress.</div>

        {infoMessage && (
          <div
            style={{
              display: "block",
              padding: "10px 14px",
              background: "var(--blue-lt)",
              border: "1px solid var(--blue-bd, var(--blue))",
              borderRadius: "var(--r)",
              color: "var(--blue)",
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 12,
            }}
          >
            {infoMessage}
          </div>
        )}

        {errorMessage && (
          <div className="ferr" style={{ display: "block", marginBottom: 12 }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="fg">
            <label className="fl">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={cn("fi", errors.email && "err")}
            />
            {errors.email && (
              <div className="ferr" style={{ display: "block" }}>
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="fg">
            <label className="fl">Password</label>
            <div className="pw-wrap">
              <input
                type={passwordType}
                placeholder="Enter your password"
                {...register("password")}
                className={cn("fi", errors.password && "err")}
              />
              <button className="pw-eye" onClick={togglePw} type="button">
                👁
              </button>
            </div>
            {errors.password && (
              <div className="ferr" style={{ display: "block" }}>
                {errors.password.message}
              </div>
            )}
            <div style={{ textAlign: "right", marginTop: 6 }}>
              <Link
                href="/request-password-reset"
                style={{ fontSize: 12, color: "var(--blue)", fontWeight: 500 }}
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: 4 }}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <div className="or-divider">or</div>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          type="button"
        >
          <svg width={18} height={18} viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          {isGoogleLoading ? "Connecting…" : "Continue with Google"}
        </button>

        <div
          className="text-xs mt12"
          style={{ textAlign: "center", color: "var(--t3)" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            style={{ color: "var(--blue)", fontWeight: 600 }}
          >
            Sign up
          </Link>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            marginTop: 20,
            paddingTop: 16,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 13, color: "var(--t3)", marginBottom: 8 }}>
            Logging in as a child?
          </p>
          <Link
            href="/child-login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--blue)",
              textDecoration: "none",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Log in with your PIN →
          </Link>
        </div>
      </div>
    </div>
  );
}
