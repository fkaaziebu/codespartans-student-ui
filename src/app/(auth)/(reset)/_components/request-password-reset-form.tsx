"use client";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRequestStudentPasswordReset } from "@/common/hooks/mutations";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type FormInputs = z.infer<typeof schema>;

export default function RequestPasswordResetForm() {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { requestStudentPasswordReset } = useRequestStudentPasswordReset();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setSuccess(false);
      setErrorMessage(null);

      const response = await requestStudentPasswordReset({
        variables: { email: data.email },
      });

      if (response.errors?.length) throw new Error(response.errors[0].message);

      setSuccess(true);
      reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    }
  };

  return (
    <div className="signup-right" style={{ width: "100%" }}>
      <div className="signup-form-card">
        <div className="su-form-title">Forgot Password</div>
        <div className="su-form-sub">
          Enter your email address to receive a reset link and regain access to
          your account.
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
            If an account exists with that email, you will receive a reset link
            shortly.
          </div>
        )}

        {errorMessage && (
          <div className="ferr" style={{ display: "block", marginBottom: 12 }}>
            {errorMessage}
          </div>
        )}

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

        <button
          className="btn btn-primary"
          style={{ width: "100%", marginTop: 4 }}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          type="button"
        >
          {isSubmitting ? "Sending…" : "Continue →"}
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
