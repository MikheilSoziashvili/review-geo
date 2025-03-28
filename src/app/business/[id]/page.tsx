"use client";

import { businesses } from "@/lib/data/businesses";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/store/useAuth";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { BusinessHero } from "@/app/business/BusinessHero";
import { BusinessDetails } from "@/components/BusinessDetails";
import BusinessInfo from "@/components/BusinessInfo";
import { Button } from "@/components/ui/button";
import { SaveToGroupModal } from "@/components/SaveToGroupModal";
import { WriteReview } from "@/components/WriteReview";
import { SubmitComplaint } from "@/components/SubmitComplaint";

interface BusinessPageProps {
  params: {
    id: string;
  };
}

export default function BusinessPage({ params }: BusinessPageProps) {
  const business = businesses.find((b) => b.id === params.id);
  const { user } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem("reviews");
    const parsed = stored ? JSON.parse(stored) : {};
    setReviews(parsed[business?.id] || []);
  }, [business?.id]);

  if (!business) return notFound();

  const handleHelpful = (index: number) => {
    setHelpfulVotes((prev) => ({ ...prev, [index]: true }));
  };

  const handleDeleteReview = (index: number) => {
    const stored = localStorage.getItem("reviews");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const current = parsed[business.id] || [];
    current.splice(index, 1);
    parsed[business.id] = current;

    localStorage.setItem("reviews", JSON.stringify(parsed));
    setReviews(current);
    toast.success("Review deleted.");
  };

  const handleEditReview = (index: number) => {
    const review = reviews[index];
    const editText = prompt("Edit your review:", review.text);
    if (!editText || editText === review.text) return;

    const updated = [...reviews];
    updated[index] = { ...review, text: editText };

    const stored = JSON.parse(localStorage.getItem("reviews") || "{}");
    stored[business.id] = updated;

    localStorage.setItem("reviews", JSON.stringify(stored));
    setReviews(updated);
    toast.success("Review updated.");
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <BusinessHero
        name={business.name}
        category={business.category}
        city={business.city}
        rating={business.rating}
        reviewCount={business.reviewCount}
        logoUrl={business.logoUrl || "/fallback-logo.png"}
      />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {user && (
          <div className="flex gap-3 mb-6">
            <WriteReview businessId={business.id} />
            <SubmitComplaint />
            <SaveToGroupModal
              businessId={business.id}
              businessCategory={business.category}
            />
          </div>
        )}

        <h2 className="text-xl font-semibold mb-3">User Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= r.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm">{r.text}</p>
                      </div>

                      {r.email === user?.email && (
                        <div className="text-xs flex gap-2">
                          <button
                            onClick={() => handleEditReview(i)}
                            className="text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReview(i)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    {r.labels?.length > 0 && (
                      <div className="flex gap-2 flex-wrap mt-1">
                        {r.labels.map((label: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                          >
                            #{label}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">— {r.name}</p>
                      <button
                        onClick={() => handleHelpful(i)}
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          helpfulVotes[i]
                            ? "bg-green-100 text-green-700"
                            : "hover:bg-gray-100"
                        }`}
                        disabled={helpfulVotes[i]}
                      >
                        {helpfulVotes[i] ? "Thanks!" : "Was this review helpful?"}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <BusinessDetails
          address={business.address || "123 Rustaveli Ave, Tbilisi, Georgia"}
          phone={business.contactInfo.phone || "+995 599 123 456"}
          website={business.contactInfo.website || "https://example.ge"}
          googleMapEmbedUrl={
            business.mapUrl ||
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5975.142556228949!2d44.799591085637496!3d41.71513767923547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cdaf26f7373%3A0x622d4b7330d9cc20!2sRustaveli%20Ave%2C%20Tbilisi!5e0!3m2!1sen!2sge!4v1709919913377!5m2!1sen!2sge"
          }
          mapHeight="250"
        />

        <BusinessInfo
          about={business.about}
          faqs={business.faqs}
          hours={business.hours}
          contactInfo={business.contactInfo}
        />
      </div>
    </main>
  );
}
