"use client";

import { useState, useEffect } from "react";
import { businesses } from "@/lib/data/businesses";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useHydration } from "@/lib/hooks/useHydration";
import { SaveToGroupModal } from "@/components/SaveToGroupModal";
import { useAuth } from "@/lib/store/useAuth";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";

export default function HomePage() {
  const hydrated = useHydration();
  const { user } = useAuth();

  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [businessLabels, setBusinessLabels] = useState<Record<string, string[]>>({});
  const [allLabels, setAllLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!hydrated) return;
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
            const tag = label.replace(/\\n/g, "").trim().toLowerCase();
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

  if (!hydrated) return null;

  const filtered = businesses.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchLabel = selectedLabel
      ? businessLabels[b.id]?.includes(selectedLabel.toLowerCase())
      : true;

    return matchSearch && matchLabel;
  });

  const grouped = filtered.reduce((acc, biz) => {
    if (!acc[biz.category]) acc[biz.category] = [];
    acc[biz.category].push(biz);
    return acc;
  }, {} as Record<string, typeof businesses>);

  return (
    <main className="bg-background min-h-screen">
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      <div className="px-6 pb-20 max-w-6xl mx-auto">
        {allLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
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

        {Object.keys(grouped).length === 0 ? (
          <p className="text-muted-foreground text-sm">No businesses found.</p>
        ) : (
          Object.entries(grouped).map(([category, list]) => (
            <div key={category} className="mb-10">
              <h2 className="text-xl font-semibold text-foreground mb-3">{category}</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {list.map((business, idx) => (
                  <motion.div
                    key={business.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.03 * idx }}
                    className="min-w-[280px] max-w-sm"
                  >
                    <Card className="hover:shadow-md transition border border-border bg-card">
                      <CardContent className="p-4 space-y-2">
                        <Link href={`/business/${business.id}`} className="block space-y-1">
                          <h3 className="text-lg font-semibold text-foreground">{business.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {business.category} • {business.city}
                          </p>
                          <p className="text-sm mt-1 text-yellow-600">
                            ★ {business.rating} ({business.reviewCount} reviews)
                          </p>
                          {businessLabels[business.id]?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {businessLabels[business.id].slice(0, 3).map((label, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full hover:bg-primary hover:text-white"
                                >
                                  #{label}
                                </span>
                              ))}
                            </div>
                          )}
                        </Link>
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
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
