"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useResetStudentPassword } from "@/common/hooks/mutations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ResetPasswordFormInputs = {
  password: string;
  confirmPassword: string;
};

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function ResetPasswordForm() {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const { resetStudentPassword } = useResetStudentPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    try {
      setSuccess(false);
      setErrorMessage(null);

      if (!token || !email) {
        throw new Error("Invalid or missing reset token or email");
      }

      const response = await resetStudentPassword({
        variables: {
          email,
          token,
          password: data.password,
        },
      });

      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }

      setSuccess(true);
      reset();

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        return;
      }
    }
  };

  if (!token || !email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-purple-50 px-4 py-12">
        <div className="w-full max-w-md border px-5 py-16 rounded-2xl bg-purple-100">
          <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-purple-900 rounded-full bg-purple-200 h-16 w-16 mx-auto flex justify-center items-center">
              CS
            </h1>
            <p className="text-xl font-semibold text-purple-900">
              Codespartans
            </p>
          </div>

          <Alert className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">
              Invalid or missing reset link. Please request a new password reset
              link.
            </AlertDescription>
          </Alert>

          <div className="mt-6 text-center">
            <Link
              href="/request-password-reset"
              className="font-medium text-purple-600 hover:underline"
            >
              Request new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-50 px-4 py-12">
      <div className="w-full max-w-md border px-5 py-16 rounded-2xl bg-purple-100">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-purple-900 rounded-full bg-purple-200 h-16 w-16 mx-auto flex justify-center items-center">
            CS
          </h1>
          <p className="text-xl font-semibold text-purple-900">Codespartans</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-purple-900">
              Create new password
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your new password for {email}
            </p>
          </div>

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Password reset successful! Redirecting to login...
              </AlertDescription>
            </Alert>
          )}

          {errorMessage && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xs text-gray-500">
              New Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Min. 6 characters"
              {...register("password")}
              className={cn(
                "py-1 text-purple-950 focus-visible:ring-0 focus-visible:border-purple-300 border-purple-300 bg-purple-50",
                errors.password ? "border-red-500" : "",
              )}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-xs text-gray-500">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              {...register("confirmPassword")}
              className={cn(
                "py-1 text-purple-950 focus-visible:ring-0 focus-visible:border-purple-300 border-purple-300 bg-purple-50",
                errors.confirmPassword ? "border-red-500" : "",
              )}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-purple-900 hover:bg-purple-950 cursor-pointer py-6 mt-6"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset password"
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-purple-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-purple-50">
          <Loader2 className="h-8 w-8 animate-spin text-purple-900" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
