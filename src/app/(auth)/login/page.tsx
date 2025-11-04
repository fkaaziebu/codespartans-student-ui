"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useLoginStudent } from "@/common/hooks/queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LoginFormInputs = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const [success, setSuccess] = useState(false);
  const { loginStudent } = useLoginStudent();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setSuccess(false);

      const response = await loginStudent({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      sessionStorage.setItem("token", `${response.data?.loginStudent.token}`);
      sessionStorage.setItem(
        "organizationId",
        `${response.data?.loginStudent.organizations?.[0]?.id}`,
      );
      setSuccess(true);
      reset();
      router.push("/courses");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return;
      }
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
            Welcome back
          </h1>
          <p className="text-gray-500">Enter your credentials to sign in</p>
        </div>

        <div className="flex flex-col space-y-6">
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Login successful!
              </AlertDescription>
            </Alert>
          )}

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

          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-800"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
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

          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-950 cursor-pointer py-6 mt-6"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/"
              className="font-medium text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
