"use client";

import { useEffect, useState } from "react";
import { businesses } from "@/lib/data/businesses";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useHydration } from "@/lib/hooks/useHydration";
import { useAuth } from "@/lib/store/useAuth";
import { SaveToGroupModal } from "@/components/SaveToGroupModal";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const hydrated = useHydration();
  const { user, isLoggedIn } = useAuth();

  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [businessLabels, setBusinessLabels] = useState<Record<string, string[]>>({});
  const [allLabels, setAllLabels] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const emailKey = user?.email || "guest";

  useEffect(() => {
    if (!hydrated) return;

    const stored = localStorage.getItem("reviews");
    const parsed = stored ? JSON.parse(stored) : {};
    const labelMap: Record<string, string[]> = {};
    const labelSet = new Set<string>();

    Object.entries(parsed).forEach(([businessId, reviews]: [string, any]) => {
      const labels: string[] = [];

      reviews.forEach((r: any) => {
        if (r.labels && Array.isArray(r.labels)) {
          r.labels.forEach((label: string) => {
            const tag = label.toLowerCase().trim();
            labels.push(tag);
            labelSet.add(tag);
          });
        }
      });

      if (labels.length > 0) {
        labelMap[businessId] = labels;
      }
    });

    setBusinessLabels(labelMap);
    setAllLabels(Array.from(labelSet));
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    const stored = localStorage.getItem("favoritesByGroup");
    const parsed = stored ? JSON.parse(stored) : {};
    const userData = parsed[emailKey] || {};
    const ids = Object.values(userData).flat();
    setSavedIds(ids);
  }, [hydrated, emailKey]);

  const updateSavedState = () => {
    const stored = localStorage.getItem("favoritesByGroup");
    const parsed = stored ? JSON.parse(stored) : {};
    const userData = parsed[emailKey] || {};
    const ids = Object.values(userData).flat();
    setSavedIds(ids);
  };

  if (!hydrated) return null;

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLabel = selectedLabel
      ? businessLabels[b.id]?.includes(selectedLabel.toLowerCase())
      : true;

    return matchesSearch && matchesLabel;
  });

  return (
    <main className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">ReviewGeo</h1>

      <input
        type="text"
        placeholder="Search businesses or categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md px-4 py-2 border rounded-md shadow-sm"
      />

      {allLabels.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedLabel(null)}
            className={`text-sm px-3 py-1 rounded-full border ${
              selectedLabel === null
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {allLabels.map((label) => (
            <button
              key={label}
              onClick={() => setSelectedLabel(label)}
              className={`text-sm px-3 py-1 rounded-full border ${
                selectedLabel === label
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              #{label}
            </button>
          ))}
        </div>
      )}

      {filteredBusinesses.length === 0 ? (
        <p className="text-muted-foreground">No businesses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="hover:shadow-md transition">
              <CardContent className="p-4">
                <Link href={`/business/${business.id}`}>
                  <h2 className="text-lg font-semibold">{business.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {business.category} • {business.city}
                  </p>
                  <p className="text-sm mt-2 text-yellow-600">
                    ★ {business.rating} ({business.reviewCount} reviews)
                  </p>
                </Link>

                {isLoggedIn && (
                  <div className="mt-3">
                    {savedIds.includes(business.id) ? (
                      <Button disabled variant="secondary" size="sm">
                        ✔ Added
                      </Button>
                    ) : (
                      <SaveToGroupModal
                        businessId={business.id}
                        businessCategory={business.category}
                        onSave={updateSavedState}
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
