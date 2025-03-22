import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50">
      <div className="w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold">Register</h2>
        <Input placeholder="Full Name" />
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Create Account</Button>
        <p className="text-sm text-muted-foreground">
          Already have an account? <a href="/login" className="underline">Login</a>
        </p>
      </div>
    </main>
  );
}
