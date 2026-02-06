"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OAuthFailedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-50 px-4 py-12">
      <div className="w-full max-w-md border px-5 py-16 rounded-2xl bg-purple-100">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-purple-900 rounded-full bg-purple-200 h-16 w-16 mx-auto flex justify-center items-center">
            CS
          </h1>
          <p className="text-xl font-semibold text-purple-900">Codespartans</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-red-100 h-16 w-16 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-purple-900">
            Sign in failed
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Google sign-in was not completed. You can try again or sign in with
            your email and password.
          </p>

          <div className="flex flex-col gap-3 w-full mt-4">
            <Button
              asChild
              className="w-full bg-purple-900 hover:bg-purple-950 py-6 cursor-pointer"
            >
              <Link href="/login">Back to login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
