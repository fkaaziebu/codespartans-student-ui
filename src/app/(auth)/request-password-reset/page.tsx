"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useRequestStudentPasswordReset } from "@/common/hooks/mutations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type RequestResetFormInputs = {
  email: string;
};

const requestResetSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export default function RequestPasswordResetPage() {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { requestStudentPasswordReset } = useRequestStudentPasswordReset();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RequestResetFormInputs>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<RequestResetFormInputs> = async (data) => {
    try {
      setSuccess(false);
      setErrorMessage(null);

      const response = await requestStudentPasswordReset({
        variables: {
          email: data.email,
        },
      });

      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }

      setSuccess(true);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        return;
      }
    }
  };

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
              Reset your password
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                If an account exists with that email, you will receive a
                password reset link shortly.
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

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs text-gray-500">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...register("email")}
              className={cn(
                "py-1 text-purple-950 focus-visible:ring-0 focus-visible:border-purple-300 border-purple-300 bg-purple-50",
                errors.email ? "border-red-500" : "",
              )}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
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
                Sending...
              </>
            ) : (
              "Send reset link"
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
