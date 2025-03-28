"use client";

import { useState } from "react";
import { useAuth } from "@/lib/store/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isBusiness, setIsBusiness] = useState(false); // Toggle state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulated login - backend will handle real logic
    login({ email, isBusiness });
    router.push(isBusiness ? "/business-profile" : "/profile"); // Redirect based on role
  };

  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="text-sm text-muted-foreground">
          Not a customer?{" "}
          <button
            type="button"
            className="underline text-primary"
            onClick={() => setIsBusiness(!isBusiness)}
          >
            {isBusiness ? "Login as User" : "Login as Business"}
          </button>
        </div>

        <Button type="submit" className="w-full">
          {isBusiness ? "Login as Business" : "Login"}
        </Button>
      </form>
    </main>
  );
}
