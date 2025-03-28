"use client";

import { useAuth } from "@/lib/store/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { businesses } from "@/lib/data/businesses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";

export default function ProfilePage() {
  const { user, logout, isLoggedIn } = useAuth();
  const router = useRouter();
  const [groupedFavorites, setGroupedFavorites] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!user?.email) return;

    const stored = localStorage.getItem("favoritesByGroup");
    const parsed = stored ? JSON.parse(stored) : {};
    setGroupedFavorites(parsed[user.email] || {});
  }, [user?.email]);

  const removeFromGroup = (group: string, businessId: string) => {
    const stored = localStorage.getItem("favoritesByGroup");
    if (!stored || !user?.email) return;

    const data = JSON.parse(stored);
    const groupItems = data[user.email]?.[group] || [];

    data[user.email][group] = groupItems.filter((id: string) => id !== businessId);
    localStorage.setItem("favoritesByGroup", JSON.stringify(data));
    setGroupedFavorites(data[user.email]);
  };

  if (!user) return null;

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1 text-foreground">Welcome, {user.name} 👋</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <Tabs defaultValue="bookmarks" className="mb-10">
        <TabsList className="mb-4">
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="complaints">My Complaints</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-4 text-sm text-muted-foreground">
              Your reviews will appear here soon.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints">
          <Card>
            <CardContent className="p-4 text-sm text-muted-foreground">
              Your complaints will appear here soon.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarks">
          {Object.keys(groupedFavorites).length === 0 ? (
            <Card>
              <CardContent className="p-4 text-sm text-muted-foreground">
                You haven’t saved any businesses to lists yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedFavorites).map(([groupName, ids]) => {
                const groupBusinesses = businesses.filter((b) => ids.includes(b.id));
                return (
                  <div key={groupName}>
                    <h2 className="text-lg font-semibold mb-2 text-foreground">
                      {groupName}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {groupBusinesses.map((b) => (
                        <Card key={b.id} className="hover:shadow-md transition border border-gray-200 relative">
                          <CardContent className="p-4 space-y-1">
                            <a href={`/business/${b.id}`}>
                              <h3 className="font-semibold text-foreground">{b.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {b.category} • {b.city}
                              </p>
                            </a>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                              onClick={() => removeFromGroup(groupName, b.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
