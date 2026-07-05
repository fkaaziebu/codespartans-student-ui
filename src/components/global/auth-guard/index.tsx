"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const isSetupCompleted = Boolean(
      sessionStorage.getItem("isSetupCompleted"),
    );

    if (!token) {
      router.replace("/signin");
    } else if (!isSetupCompleted) {
      router.replace("/setup");
    }
    {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return <>{children}</>;
}
