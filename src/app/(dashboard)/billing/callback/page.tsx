"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BillingCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) {
          clearInterval(interval);
          router.replace("/exams");
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 16,
        textAlign: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ fontSize: 48 }}>✅</div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: 22,
          fontWeight: 700,
          color: "var(--t1)",
        }}
      >
        Payment received
      </div>
      <div style={{ fontSize: 14, color: "var(--t3)", maxWidth: 360 }}>
        Your subscription is being activated. This usually takes a few seconds.
        {reference && (
          <>
            {" "}
            Reference: <strong>{reference}</strong>
          </>
        )}
      </div>
      <div style={{ fontSize: 13, color: "var(--t4)" }}>
        Redirecting to Billing in {countdown}s…
      </div>
      <button
        className="billing-cta-btn"
        onClick={() => router.replace("/billing")}
        style={{ marginTop: 8 }}
      >
        Go to Billing now
      </button>
    </div>
  );
}

export default function BillingCallbackPage() {
  return (
    <div className="main-wrap">
      <Suspense>
        <BillingCallbackContent />
      </Suspense>
    </div>
  );
}
