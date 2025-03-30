"use client";

import { useAuth } from "@/lib/store/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

export default function BusinessProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !user?.isBusiness) {
      router.push("/login");
    }
  }, [isLoggedIn, user?.isBusiness, router]);

  if (!user || !user.isBusiness) return null;

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome, {user.name} 👋</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <Tabs defaultValue="overview" className="mb-10">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="info">Business Info</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        {/* Overview Section */}
        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6 text-muted-foreground">
              Here’s a quick snapshot of your business performance and updates.
              This will show analytics or summaries once backend is connected.
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Section */}
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6 text-muted-foreground">
              All customer reviews for your business will appear here.
            </CardContent>
          </Card>
        </TabsContent>

        {/* Complaints Section */}
        <TabsContent value="complaints">
          <Card>
            <CardContent className="p-6 text-muted-foreground">
              This is where complaints submitted by users will be displayed.
              You’ll be able to respond once backend is integrated.
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Info Section */}
        <TabsContent value="info">
          <Card>
            <CardContent className="p-6 text-muted-foreground space-y-2">
              Editable business details such as contact info, address, etc.
              will appear here.
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Section */}
        <TabsContent value="media">
          <Card>
            <CardContent className="p-6 text-muted-foreground">
              Upload and manage images or logos for your business.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </main>
  );
}
