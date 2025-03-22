'use client';

import { useAuth } from "@/lib/store/useAuth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function ProfilePage() {
  const { isLoggedIn, logout, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) return null;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
        <Link href="/">
          <Button variant="outline">Home</Button>
        </Link>
      </div>

      <p className="text-muted-foreground mb-6">{user.email} (mock)</p>

      <div className="space-x-2 mb-6">
        <Button variant="secondary">My Reviews</Button>
        <Button variant="outline">My Complaints</Button>
        <Button variant="outline">Bookmarks</Button>
      </div>

      <div className="border rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Your Activity</h2>
        <p className="text-sm text-muted-foreground">
          This section will show your submitted reviews and complaints once backend is connected.
        </p>
      </div>

      <Button className="mt-6" onClick={logout}>Logout</Button>
    </main>
  );
}
