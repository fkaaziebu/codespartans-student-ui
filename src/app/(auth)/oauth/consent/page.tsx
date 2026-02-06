"use client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function OAuthConsentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const email = searchParams.get("email") || "";
  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";

  const handleConsent = async (consent: "yes" | "no") => {
    if (consent === "no") {
      router.push("/oauth/failed");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${process.env.REST_BASE_URL}/v1/students/auth/consent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, consent }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to process consent. Please try again.");
      }

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error("No redirect URL received.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
      setIsLoading(false);
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
          <h2 className="text-lg font-semibold text-purple-900 text-center">
            Create your account
          </h2>
          <p className="text-sm text-gray-600 text-center">
            No account was found for your Google email. Would you like to create
            a new Codespartans account?
          </p>

          <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Name</span>
              <span className="text-purple-900 font-medium">
                {firstName} {lastName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Email</span>
              <span className="text-purple-900 font-medium">{email}</span>
            </div>
          </div>

          {errorMessage && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-purple-300 text-purple-900 hover:bg-purple-200 py-6 cursor-pointer"
              onClick={() => handleConsent("no")}
              disabled={isLoading}
            >
              No, go back
            </Button>
            <Button
              type="button"
              className="flex-1 bg-purple-900 hover:bg-purple-950 py-6 cursor-pointer"
              onClick={() => handleConsent("yes")}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Yes, create account"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
