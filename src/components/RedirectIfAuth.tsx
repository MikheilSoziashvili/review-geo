"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { useHydration } from "@/lib/hooks/useHydration";

export function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const hydrated = useHydration();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && isLoggedIn) {
      router.push("/profile");
    }
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated) return null;

  return <>{!isLoggedIn && children}</>;
}
