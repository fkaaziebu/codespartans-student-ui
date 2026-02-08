"use client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function OAuthRedirectInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const organizationId = searchParams.get("organizationId");

    if (token && organizationId) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("organizationId", organizationId);
      router.push("/courses");
    } else {
      router.push("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-50 px-4 py-12">
      <div className="w-full max-w-md border px-5 py-16 rounded-2xl bg-purple-100 text-center">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-purple-900 rounded-full bg-purple-200 h-16 w-16 mx-auto flex justify-center items-center">
            CS
          </h1>
          <p className="text-xl font-semibold text-purple-900">Codespartans</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-900" />
          <p className="text-purple-900 font-medium">Signing you in...</p>
        </div>
      </div>
    </div>
  );
}

export default function OAuthRedirectPage() {
  return (
    <Suspense>
      <OAuthRedirectInner />
    </Suspense>
  );
}
