'use client';

import { useAuth } from "@/lib/store/useAuth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn, router]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50">
      <div className="w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold">Login</h2>
        <p className="text-sm text-muted-foreground">Click below to simulate login:</p>
        <Button
          className="w-full"
          onClick={() => {
            login({ name: "Mikheil", email: "mikheil@example.com" });
            router.push("/profile");
          }}
        >
          Log in as Mikheil
        </Button>
      </div>
    </main>
  );
}
