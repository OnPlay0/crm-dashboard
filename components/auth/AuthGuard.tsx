"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/"); // redirige al login si no hay token
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) return null;

  return <>{children}</>;
}
