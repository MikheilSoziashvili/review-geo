"use client";

import { useAuth } from "@/lib/store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { businesses } from "@/lib/data/businesses";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, logout, isLoggedIn } = useAuth();
  const router = useRouter();

  const [reviews, setReviews] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [groupedFavorites, setGroupedFavorites] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!user?.email) return;

    const storedReviews = localStorage.getItem("reviews");
    const storedComplaints = localStorage.getItem("complaints");
    const storedFavorites = localStorage.getItem("favoritesByGroup");

    const parsedReviews = storedReviews ? JSON.parse(storedReviews) : {};
    const parsedComplaints = storedComplaints ? JSON.parse(storedComplaints) : {};
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : {};

    const userReviews = Object.entries(parsedReviews)
      .flatMap(([businessId, revs]: [string, any]) =>
        (revs as any[]).filter((r) => r.email === user.email).map((r) => ({
          ...r,
          businessId,
        }))
      );

    const userComplaints = parsedComplaints[user.email] || [];

    setReviews(userReviews);
    setComplaints(userComplaints);
    setGroupedFavorites(parsedFavorites[user.email] || {});
  }, [user?.email]);

  if (!user) return null;

  return (
    <main className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.name} 👋</h1>
      <p className="text-muted-foreground mb-4">{user.email}</p>

      <Tabs defaultValue="reviews" className="mb-6">
        <TabsList>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="complaints">My Complaints</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>

        {/* Reviews */}
        <TabsContent value="reviews">
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="p-4 text-sm text-muted-foreground">
                You haven’t submitted any reviews yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((r, i) => {
                const b = businesses.find((b) => b.id === r.businessId);
                return (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{b?.name}</h3>
                      <p className="text-sm mt-1">{r.text}</p>
                      {r.labels?.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {r.labels.map((label: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                            >
                              #{label}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Complaints */}
        <TabsContent value="complaints">
          {complaints.length === 0 ? (
            <Card>
              <CardContent className="p-4 text-sm text-muted-foreground">
                You haven’t submitted any complaints yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {complaints.map((c, i) => {
                const b = businesses.find((b) => b.id === c.businessId);
                return (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{b?.name}</h3>
                      <p className="text-sm mt-1">{c.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Submitted: {new Date(c.date).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Bookmarks */}
        <TabsContent value="bookmarks">
          {Object.keys(groupedFavorites).length === 0 ? (
            <Card>
              <CardContent className="p-4 text-sm text-muted-foreground">
                You haven’t saved any businesses to lists yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedFavorites).map(([groupName, ids]) => {
                const groupBusinesses = businesses.filter((b) =>
                  ids.includes(b.id)
                );
                return (
                  <div key={groupName}>
                    <h2 className="text-lg font-semibold mb-2">{groupName}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {groupBusinesses.map((b) => (
                        <Card key={b.id} className="hover:shadow-md transition">
                          <CardContent className="p-4 space-y-1">
                            <a href={`/business/${b.id}`}>
                              <h3 className="font-semibold">{b.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {b.category} • {b.city}
                              </p>
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </main>
  );
}
