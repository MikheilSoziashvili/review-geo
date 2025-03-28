"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BusinessLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      router.push("/business/profile/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-border bg-card rounded-xl shadow-md p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Login</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Access your business dashboard to manage reviews and complaints.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Business Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleLogin}
            className="w-full bg-primary text-white hover:bg-primary/90"
          >
            Login
          </Button>
        </div>

        <div className="text-sm text-center mt-2 text-muted-foreground">
          Not registered yet?{" "}
          <Link
            href="/business-register"
            className="text-primary hover:underline font-medium"
          >
            Create a Business Account
          </Link>
        </div>
      </div>
    </main>
  );
}
