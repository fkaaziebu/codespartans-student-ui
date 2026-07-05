"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useRegisterStudent } from "@/common/hooks/mutations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").trim(),
    lastName: z.string().min(1, "Last name is required").trim(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);

  const { registerStudent } = useRegisterStudent();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data, event) => {
    event?.preventDefault();

    try {
      setSuccess(false);

      const response = await registerStudent({
        variables: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
        },
      });

      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }

      setSuccess(true);
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return;
      }
    } finally {
      reset();
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/courses");
    }
  }, []);

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
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Registration successful!
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between">
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="text-xs text-gray-500">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("firstName")}
                className={cn(
                  "py-1 text-purple-950 focus-visible:ring-0 focus-visible:border-purple-300 border-purple-300 bg-purple-50",
                  errors.firstName ? "border-red-500" : "",
                )}
              />
              {errors.firstName && (
                <span className="text-sm text-red-500">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="text-xs text-gray-500">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                className={cn(
                  "py-1 text-purple-950 focus-visible:ring-0 focus-visible:border-purple-300 border-purple-300 bg-purple-50",
                  errors.lastName ? "border-red-500" : "",
                )}
              />
              {errors.lastName && (
                <span className="text-sm text-red-500">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

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

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xs text-gray-500">
              Password
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
              Confirm Password
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
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
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
