'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { toast } from "sonner";
import { saveUser } from "@/lib/utils/userStorage";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password } = form;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const success = saveUser({ name, email, password });

    if (!success) {
      toast.error("An account with this email already exists");
      return;
    }

    login({ name, email });
    toast.success("Account created! 🎉");
    router.push("/profile");
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-xl font-bold">Create Account</h2>

        <Input
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <Button type="submit" className="w-full">
          Register
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Already have an account? <a href="/login" className="underline">Login</a>
        </p>
      </form>
    </main>
  );
}
