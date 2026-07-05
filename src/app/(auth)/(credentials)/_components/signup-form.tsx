"use client";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegisterStudent } from "@/common/hooks/mutations";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required").trim(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

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

const getStrengthLabel = (score: number): { label: string; color: string } => {
  if (score === 0) return { label: "Enter a password", color: "var(--t4)" };
  if (score <= 25) return { label: "Weak", color: "var(--red)" };
  if (score <= 50) return { label: "Fair", color: "var(--amber)" };
  if (score <= 75) return { label: "Good", color: "var(--blue)" };
  return { label: "Strong", color: "var(--green)" };
};

const getStrengthBarColor = (score: number): string => {
  if (score <= 25) return "var(--red)";
  if (score <= 50) return "var(--amber)";
  if (score <= 75) return "var(--blue)";
  return "var(--green)";
};

export default function SignupForm() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "password" | "text"
  >("password");
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  const router = useRouter();
  const { registerStudent } = useRegisterStudent();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password");
  const strength = checkPasswordStrength(passwordValue);
  const { label: strengthLabel, color: strengthColor } =
    getStrengthLabel(strength);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) router.push("/courses");
  }, []);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.location.href = "/api/auth/google/login";
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (!termsChecked) {
      setTermsError("You must accept the terms to continue");
      return;
    }
    try {
      setErrorMessage(null);

      const response = await registerStudent({
        variables: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      if (response.errors?.length) throw new Error(response.errors[0].message);

      reset();
      router.push(`/validate-account?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    }
  };

  return (
    <div className="signup-right">
      <div className="signup-form-card">
        <div className="su-form-title">Create your account</div>
        <div className="su-form-sub">
          Start for free — no credit card required.
        </div>

        {errorMessage && (
          <div className="ferr" style={{ display: "block", marginBottom: 12 }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="fg">
            <label className="fl">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className={cn("fi", errors.name && "err")}
            />
            {errors.name && (
              <div className="ferr" style={{ display: "block" }}>
                {errors.name.message}
              </div>
            )}
          </div>

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
                placeholder="Create a strong password"
                {...register("password")}
                className={cn("fi", errors.password && "err")}
              />
              <button
                className="pw-eye"
                onClick={() =>
                  setPasswordType((p) =>
                    p === "password" ? "text" : "password",
                  )
                }
                type="button"
              >
                👁
              </button>
            </div>
            <div className="pw-bar">
              <div
                className="pw-fill"
                style={{
                  width: `${strength}%`,
                  background: getStrengthBarColor(strength),
                }}
              />
            </div>
            <div
              className="pw-lbl"
              style={{ color: strengthColor, fontSize: 11, marginTop: 3 }}
            >
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
                onClick={() =>
                  setConfirmPasswordType((p) =>
                    p === "password" ? "text" : "password",
                  )
                }
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

          <div className="fg" style={{ marginBottom: 8 }}>
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
                  href={`${process.env.LANDING_URL}/terms`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href={`${process.env.LANDING_URL}/terms`}
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
              <div className="ferr" style={{ display: "block" }}>
                {termsError}
              </div>
            )}
          </div>

          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: 4 }}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Creating account…" : "Create Account →"}
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
