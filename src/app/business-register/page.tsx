"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BusinessRegisterPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (businessName && email && password) {
      router.push("/business/profile");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-border bg-card rounded-xl shadow-md p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Registration</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Register your business to start managing reviews and complaints.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
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
            onClick={handleRegister}
            className="w-full bg-saperavi text-white hover:bg-saperavi/90"
          >
            Register Business
          </Button>
        </div>

        <div className="text-sm text-center mt-2 text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/business-login"
            className="text-saperavi hover:underline font-medium"
          >
            Login here
          </Link>
        </div>
      </div>
    </main>
  );
}
