"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/signin");
      return;
    }

    const isSetupCompleted = sessionStorage.getItem("isSetupCompleted");

    if (isSetupCompleted === "true") {
      router.replace("/dashboard");
    } else {
      router.replace("/setup");
    }
  }, [router]);

  return null;
}
