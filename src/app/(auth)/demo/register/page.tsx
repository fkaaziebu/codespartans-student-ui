"use client";

import * as z from "zod";
import { useState, Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useActivateStudentDemo } from "@/common/hooks/mutations";
import { cn } from "@/lib/utils";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormInputs = z.infer<typeof schema>;

function DemoRegisterInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const demoCode = searchParams.get("demoCode") ?? "";

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  const { activateStudentDemo } = useActivateStudentDemo();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { password: "" },
  });

  const togglePw = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!termsChecked) {
      setTermsError("You must accept the terms to continue");
      return;
    }
    try {
      setErrorMessage(null);

      const response = await activateStudentDemo({
        variables: {
          input: {
            demo_code: demoCode,
            password: data.password,
          },
        },
      });

      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }

      const result = response.data?.activateStudentDemo;
      if (!result) throw new Error("Activation failed. Please try again.");

      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("refreshToken", result.refresh_token ?? "");
      sessionStorage.setItem(
        "isSetupCompleted",
        String(result.is_setup_completed),
      );

      if (!result.is_setup_completed) {
        router.push("/setup");
      } else {
        router.push("/dashboard");
      }
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
        <div className="su-form-title">Activate your trial</div>
        <div className="su-form-sub">
          Set a password to get started with your trial account.
        </div>

        {errorMessage && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              background: "var(--red-lt)",
              border: "1px solid var(--red-bd)",
              borderRadius: 8,
              padding: "10px 14px",
              marginBottom: 16,
            }}
          >
            <span style={{ color: "var(--red)", fontSize: 15, flexShrink: 0 }}>
              ⚠
            </span>
            <div style={{ fontSize: 13, color: "#991b1b", lineHeight: 1.5 }}>
              {errorMessage}{" "}
              <a
                href="/signin"
                style={{
                  color: "var(--blue)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                Log in instead
              </a>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="fg">
            <label className="fl">Password</label>
            <div className="pw-wrap">
              <input
                type={passwordType}
                placeholder="Create a password"
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
            disabled={isSubmitting || !demoCode}
            type="submit"
          >
            {isSubmitting ? "Activating…" : "Activate Account →"}
          </button>
        </form>

        {!demoCode && (
          <div className="ferr" style={{ display: "block", marginTop: 12 }}>
            No trial code found. Please use the link provided to you.
          </div>
        )}

        <div
          className="text-xs text-muted mt12"
          style={{ textAlign: "center", marginTop: 16 }}
        >
          Already have an account?{" "}
          <a href="/signin" style={{ color: "var(--blue)", fontWeight: 600 }}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DemoRegisterPage() {
  return (
    <Suspense>
      <DemoRegisterInner />
    </Suspense>
  );
}
