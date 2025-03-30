"use client";

import GrowthChart from "@/components/GrowthChart";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, Star, MessageCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <main className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-card border border-border">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm text-muted-foreground">Total Users</h2>
              <p className="text-2xl font-semibold text-foreground">1,204</p>
            </div>
            <Users className="w-6 h-6 text-primary" />
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm text-muted-foreground">Businesses</h2>
              <p className="text-2xl font-semibold text-foreground">342</p>
            </div>
            <Building2 className="w-6 h-6 text-primary" />
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm text-muted-foreground">Reviews</h2>
              <p className="text-2xl font-semibold text-foreground">5,876</p>
            </div>
            <Star className="w-6 h-6 text-primary" />
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm text-muted-foreground">Complaints</h2>
              <p className="text-2xl font-semibold text-foreground">78</p>
            </div>
            <MessageCircle className="w-6 h-6 text-primary" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity (placeholder) */}
      <Card className="border border-border">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold mb-3 text-foreground">Recent Activity</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>📥 New business "Green Market" submitted for approval</li>
            <li>⭐ "Cafe Mocha" received 5-star review from Nino</li>
            <li>🚫 Complaint filed against "Urban Bites" for delay</li>
            <li>👤 New user registered: lasha.k@example.com</li>
          </ul>
        </CardContent>
      </Card>

      <GrowthChart />
    </main>
  );
}
