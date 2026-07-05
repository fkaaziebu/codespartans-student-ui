"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useStudentProfile } from "@/common/hooks/queries";

function OAuthRedirectInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { studentProfile } = useStudentProfile();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const email = searchParams.get("email");
    const requiresValidation = searchParams.get("requiresValidation");
    const accountStatus = searchParams.get("accountStatus");
    const deletionScheduledFor = searchParams.get("deletionScheduledFor");

    if (requiresValidation === "true" && email) {
      router.push(`/validate-account?email=${encodeURIComponent(email)}`);
      return;
    }

    if (!token) {
      router.push("/signin");
      return;
    }

    if (accountStatus === "PENDING_DELETION") {
      const params = new URLSearchParams({
        pendingToken: token,
        deletionScheduledFor: deletionScheduledFor ?? "",
      });
      router.replace(`/signin?${params.toString()}`);
      return;
    }

    sessionStorage.setItem("token", token);
    if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);

    studentProfile().then((result) => {
      if (result.error || !result.data?.studentProfile) {
        router.push("/signin");
        return;
      }

      const profile = result.data.studentProfile;
      const org = profile.organizations?.[0];

      sessionStorage.setItem("organizationId", org?.id ?? "");
      sessionStorage.setItem("organizationEmail", org?.email ?? "");
      sessionStorage.setItem(
        "isSetupCompleted",
        `${profile.is_setup_completed}`,
      );

      if (!profile.is_setup_completed) {
        router.push("/setup");
      } else {
        router.push("/dashboard");
      }
    });
  }, [searchParams, router]);

  return (
    <div className="signup-right" style={{ width: "100%" }}>
      <div className="signup-form-card" style={{ textAlign: "center" }}>
        <div
          style={{
            width: 48,
            height: 48,
            margin: "0 auto 16px",
            borderRadius: "50%",
            border: "3px solid var(--border)",
            borderTopColor: "var(--blue)",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        <div className="su-form-title" style={{ fontSize: 18 }}>
          Signing you in…
        </div>
        <div className="su-form-sub">
          Please wait while we complete your sign in.
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
