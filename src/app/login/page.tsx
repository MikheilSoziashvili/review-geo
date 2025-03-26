'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getStoredUsers } from "@/lib/utils/userStorage";
import { RedirectIfAuth } from "@/components/RedirectIfAuth";

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) router.push("/profile");
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    const users = getStoredUsers();
    const match = users.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (!match) {
      toast.error("Invalid email or password");
      return;
    }

    login({ name: match.name, email: match.email });
    toast.success(`Welcome back, ${match.name}!`);
    router.push("/profile");
  };

  return (
    <RedirectIfAuth>
      <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-bold">Login</h2>
  
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          <Button className="w-full" type="submit">
            Log in
          </Button>
  
          <p className="text-sm text-muted-foreground text-center">
            Don’t have an account? <a href="/register" className="underline">Register</a>
          </p>
        </form>
      </main>
    </RedirectIfAuth>
  );
}
