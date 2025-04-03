"use client";

import { useState, useEffect } from "react";
import { businesses } from "@/lib/data/businesses";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useHydration } from "@/lib/hooks/useHydration";
import { SaveToGroupModal } from "@/components/SaveToGroupModal";
import { useAuth } from "@/lib/store/useAuth";
import { HeroSection } from "@/components/HeroSection";
import { motion } from "framer-motion";

export default function HomePage() {
  const hydrated = useHydration();
  const { user } = useAuth();

  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [businessLabels, setBusinessLabels] = useState<Record<string, string[]>>({});
  const [allLabels, setAllLabels] = useState<string[]>([]);
  const [latestReviews, setLatestReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!hydrated) return;
    const stored = localStorage.getItem("reviews");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const labelMap: Record<string, string[]> = {};
    const labelSet = new Set<string>();
    const recent: any[] = [];

    Object.entries(parsed).forEach(([businessId, reviews]: [string, any]) => {
      const labels: string[] = [];
      reviews.forEach((r: any) => {
        if (r.labels && Array.isArray(r.labels)) {
          r.labels.forEach((label: string) => {
            const tag = label.replace(/\\n/g, "").trim().toLowerCase();
            labels.push(tag);
            labelSet.add(tag);
          });
        }
        recent.push({ businessId, ...r });
      });
      if (labels.length > 0) labelMap[businessId] = labels;
    });

    setBusinessLabels(labelMap);
    setAllLabels(Array.from(labelSet));
    setLatestReviews(recent.reverse().slice(0, 6));
  }, [hydrated]);

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

  const businessesByCategory = filteredBusinesses.reduce((acc, business) => {
    if (!acc[business.category]) acc[business.category] = [];
    acc[business.category].push(business);
    return acc;
  }, {} as Record<string, typeof businesses>);

  const featuredBusiness = businesses[0]; // For demo; pick real one later
  const trendingGroups = ["Cozy Places", "Best for Working", "Romantic Spots", "Value for Money"];

  return (
    <main className="bg-background min-h-screen">
      <HeroSection />

      <div className="px-6 pb-20 max-w-6xl mx-auto space-y-14">
        {/* Label Filters */}
        {allLabels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLabel(null)}
              className={`text-sm px-3 py-1 rounded-full border font-medium transition ${
                selectedLabel === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              All
            </button>
            {allLabels.map((label) => (
              <button
                key={label}
                onClick={() => setSelectedLabel(label)}
                className={`text-sm px-3 py-1 rounded-full border transition font-medium ${
                  selectedLabel === label
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                #{label}
              </button>
            ))}
          </div>
        )}

        {/* Featured Business */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">🌟 Featured Business</h2>
          <div className="max-w-xl">
            <Card className="rounded-xl overflow-hidden">
              <CardContent className="p-4 space-y-2">
                <Link href={`/business/${featuredBusiness.id}`} className="block">
                  <h3 className="text-lg font-semibold">{featuredBusiness.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {featuredBusiness.category} • {featuredBusiness.city}
                  </p>
                  <p className="text-yellow-600 text-sm">
                    ★ {featuredBusiness.rating} ({featuredBusiness.reviewCount} reviews)
                  </p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trending Lists */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">🔥 Trending Lists</h2>
          <div className="flex gap-3 flex-wrap">
            {trendingGroups.map((group) => (
              <button
                key={group}
                className="px-4 py-2 rounded-full text-sm bg-muted hover:bg-primary hover:text-white transition"
              >
                {group}
              </button>
            ))}
          </div>
        </section>

        {/* Latest Reviews */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">📝 Latest Reviews</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {latestReviews.map((review, i) => {
              const business = businesses.find((b) => b.id === review.businessId);
              if (!business) return null;
              return (
                <Card key={i}>
                  <CardContent className="p-4 space-y-1">
                    <Link href={`/business/${business.id}`}>
                      <h3 className="text-sm font-semibold">{business.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">"{review.text}"</p>
                    <p className="text-xs text-muted-foreground">— {review.name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Category Carousels */}
        {Object.entries(businessesByCategory).map(([category, list]) => (
          <section key={category}>
            <h2 className="text-xl font-semibold mb-3 text-foreground">{category}</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-2 px-2 snap-x snap-mandatory">
              {list.map((business, idx) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * idx }}
                  className="min-w-[280px] max-w-[300px] snap-start"
                >
                  <Link href={`/business/${business.id}`} className="block space-y-1">
                    <Card className="overflow-hidden border border-border hover:shadow-md transition rounded-xl bg-card">
                      {business.logoUrl && (
                        <div className="h-32 w-full bg-muted flex items-center justify-center border-b">
                          <img
                            src={business.logoUrl}
                            alt={`${business.name} logo`}
                            className="object-contain h-full w-full"
                          />
                        </div>
                      )}
                      <CardContent className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">{business.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {business.category} • {business.city}
                        </p>
                        <p className="text-sm text-yellow-600 font-medium">
                          ★ {business.rating} ({business.reviewCount} reviews)
                        </p>
                        {businessLabels[business.id]?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {businessLabels[business.id].slice(0, 3).map((label, i) => (
                              <span
                                key={i}
                                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full hover:bg-primary hover:text-white transition"
                              >
                                #{label}
                              </span>
                            ))}
                          </div>
                        )}
                        {user && (
                          <div className="pt-2">
                            <SaveToGroupModal
                              businessId={business.id}
                              businessCategory={business.category}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
