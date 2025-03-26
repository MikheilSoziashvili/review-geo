"use client";

import { useEffect, useState } from "react";
import { businesses } from "@/lib/data/businesses";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [businessLabels, setBusinessLabels] = useState<Record<string, string[]>>({});
  const [allLabels, setAllLabels] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("reviews");
    if (!stored) return;

    const parsed = JSON.parse(stored);
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
  }, []);

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

  const clearFilters = () => {
    setSelectedLabel(null);
    setSearchTerm("");
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">ReviewGeo</h1>

        <input
          type="text"
          placeholder="Search businesses or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3 w-full max-w-md px-4 py-2 border rounded-md shadow-sm"
        />

        {allLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
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

            {searchTerm || selectedLabel ? (
              <button
                onClick={clearFilters}
                className="ml-auto text-sm px-3 py-1 border border-red-500 text-red-500 hover:bg-red-100 rounded-full"
              >
                Clear All
              </button>
            ) : null}
          </div>
        )}
      </div>

      {/* Business Grid */}
      <div className="px-6 py-6">
        {filteredBusinesses.length === 0 ? (
          <p className="text-muted-foreground">No businesses found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <Link key={business.id} href={`/business/${business.id}`}>
                <Card className="hover:shadow-md transition">
                  <CardContent className="p-4 space-y-1">
                    <h2 className="text-lg font-semibold">{business.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {business.category} • {business.city}
                    </p>
                    <p className="text-sm text-yellow-600">
                      ★ {business.rating} ({business.reviewCount} reviews)
                    </p>

                    {/* Show tag highlights */}
                    {businessLabels[business.id]?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {businessLabels[business.id]
                          .slice(0, 3)
                          .map((label, idx) => (
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
