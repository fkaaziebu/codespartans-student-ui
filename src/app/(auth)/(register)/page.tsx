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
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950">
            Create an account
          </h1>
          <p className="text-gray-500">Enter your details to register</p>
        </div>

        <div className="flex flex-col space-y-6">
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Registration successful!
              </AlertDescription>
            </Alert>
          )}

          {/* First Name */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-bold text-gray-800"
            >
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              {...register("firstName")}
              className={cn(
                "py-6 text-gray-600",
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
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-bold text-gray-800"
            >
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              {...register("lastName")}
              className={cn(
                "py-6 text-gray-600",
                errors.lastName ? "border-red-500" : "",
              )}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-gray-800">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={cn(
                "py-6 text-gray-600",
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
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-800"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={cn(
                "py-6 text-gray-600",
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
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-bold text-gray-800"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={cn(
                "py-6 text-gray-600",
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
            className="w-full bg-gray-800 hover:bg-gray-950 cursor-pointer py-6 mt-6"
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
              className="font-medium text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
