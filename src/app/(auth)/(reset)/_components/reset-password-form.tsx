"use client";
import * as z from "zod";
import Link from "next/link";
import { Suspense, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetStudentPassword } from "@/common/hooks/mutations";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormInputs = z.infer<typeof schema>;

const checkPasswordStrength = (password: string): number => {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  if (password.length >= 20) score += 10;
  if (/[a-z]/.test(password)) score += 15;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;
  return Math.min(score, 100);
};

const getStrengthMeta = (score: number): { label: string; color: string } => {
  if (score === 0) return { label: "Enter a password", color: "var(--t4)" };
  if (score <= 25) return { label: "Weak", color: "var(--red)" };
  if (score <= 50) return { label: "Fair", color: "var(--amber)" };
  if (score <= 75) return { label: "Good", color: "var(--blue)" };
  return { label: "Strong", color: "var(--green)" };
};

function ResetPasswordFormInner() {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState<"password" | "text">("password");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const { resetStudentPassword } = useResetStudentPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password");
  const strength = checkPasswordStrength(passwordValue);
  const { label: strengthLabel, color: strengthColor } = getStrengthMeta(strength);

  const getBarColor = (s: number) => {
    if (s <= 25) return "var(--red)";
    if (s <= 50) return "var(--amber)";
    if (s <= 75) return "var(--blue)";
    return "var(--green)";
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setSuccess(false);
      setErrorMessage(null);

      if (!token || !email) throw new Error("Invalid or missing reset token.");

      const response = await resetStudentPassword({
        variables: { email, token, password: data.password },
      });

      if (response.errors?.length) throw new Error(response.errors[0].message);

      setSuccess(true);
      reset();
      setTimeout(() => router.push("/signin"), 2000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    }
  };

  if (!token || !email) {
    return (
      <div className="signup-right" style={{ width: "100%" }}>
        <div className="signup-form-card">
          <div className="su-form-title">Invalid Link</div>
          <div
            className="ferr"
            style={{ display: "block", marginBottom: 16 }}
          >
            Invalid or missing reset link. Please request a new password reset
            link.
          </div>
          <Link
            href="/request-password-reset"
            className="btn btn-primary"
            style={{ display: "block", textAlign: "center" }}
          >
            Request new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-right" style={{ width: "100%" }}>
      <div className="signup-form-card">
        <div className="su-form-title">Create New Password</div>
        <div className="su-form-sub">
          Set a strong new password for <strong>{email}</strong>
        </div>

        {success && (
          <div
            style={{
              background: "var(--green-lt)",
              border: "1px solid var(--green-bd)",
              borderRadius: "var(--r)",
              padding: "10px 14px",
              fontSize: 13,
              color: "#065f46",
              marginBottom: 16,
            }}
          >
            Password reset successful! Redirecting to sign in…
          </div>
        )}

        {errorMessage && (
          <div className="ferr" style={{ display: "block", marginBottom: 12 }}>
            {errorMessage}
          </div>
        )}

        <div className="fg">
          <label className="fl">New Password</label>
          <div className="pw-wrap">
            <input
              type={passwordType}
              placeholder="Create a strong password"
              {...register("password")}
              className={cn("fi", errors.password && "err")}
            />
            <button
              className="pw-eye"
              onClick={() => setPasswordType((p) => (p === "password" ? "text" : "password"))}
              type="button"
            >
              👁
            </button>
          </div>
          <div className="pw-bar">
            <div
              className="pw-fill"
              style={{ width: `${strength}%`, background: getBarColor(strength) }}
            />
          </div>
          <div className="pw-lbl" style={{ color: strengthColor, fontSize: 11, marginTop: 3 }}>
            {strengthLabel}
          </div>
          {errors.password && (
            <div className="ferr" style={{ display: "block" }}>
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="fg">
          <label className="fl">Confirm Password</label>
          <div className="pw-wrap">
            <input
              type={confirmPasswordType}
              placeholder="Re-enter password"
              {...register("confirmPassword")}
              className={cn("fi", errors.confirmPassword && "err")}
            />
            <button
              className="pw-eye"
              onClick={() => setConfirmPasswordType((p) => (p === "password" ? "text" : "password"))}
              type="button"
            >
              👁
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="ferr" style={{ display: "block" }}>
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%", marginTop: 4 }}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || success}
          type="button"
        >
          {isSubmitting ? "Resetting…" : "Continue →"}
        </button>

        <div className="text-xs text-muted mt12" style={{ textAlign: "center" }}>
          Remember your password?{" "}
          <Link href="/signin" style={{ color: "var(--blue)", fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense>
      <ResetPasswordFormInner />
    </Suspense>
  );
}
