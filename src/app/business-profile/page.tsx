"use client";

import { useAuth } from "@/lib/store/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BusinessProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  if (!user) return null;

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto text-foreground">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{user.name}'s Business Profile</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="destructive" onClick={logout}>Logout</Button>
      </div>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <div className="bg-card p-4 rounded shadow-sm border">
          <p className="text-sm text-muted-foreground">Add logo, update category, etc.</p>
        </div>
      </section>

      {/* Reviews */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <div className="bg-card p-4 rounded shadow-sm border">
          <p className="text-sm text-muted-foreground">Reviews submitted by users will appear here.</p>
        </div>
      </section>

      {/* Complaints */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Complaints</h2>
        <div className="bg-card p-4 rounded shadow-sm border">
          <p className="text-sm text-muted-foreground">Private complaints sent by users will be shown here.</p>
        </div>
      </section>

      {/* Business Info */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Business Information</h2>
        <div className="bg-card p-4 rounded shadow-sm border">
          <p className="text-sm text-muted-foreground">Editable fields (address, website, hours, etc.)</p>
        </div>
      </section>

      {/* Media */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Media</h2>
        <div className="bg-card p-4 rounded shadow-sm border">
          <p className="text-sm text-muted-foreground">Coming soon: upload photos, update brand visuals.</p>
        </div>
      </section>
    </main>
  );
}
