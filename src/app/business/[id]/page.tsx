"use client";

import { businesses } from "@/lib/data/businesses";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { WriteReview } from "@/components/WriteReview";
import { SubmitComplaint } from "@/components/SubmitComplaint";
import BusinessInfo from "@/components/BusinessInfo";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/store/useAuth";
import { toast } from "sonner";

interface BusinessPageProps {
  params: {
    id: string;
  };
}

export default function BusinessPage({ params }: BusinessPageProps) {
  const business = businesses.find((b) => b.id === params.id);
  const { user } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("reviews");
    const parsed = stored ? JSON.parse(stored) : {};
    setReviews(parsed[business?.id] || []);
  }, [business?.id]);

  if (!business) {
    return notFound();
  }

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
    <main className="min-h-screen px-6 py-8 bg-white">
      <h1 className="text-2xl font-bold mb-1">{business.name}</h1>
      <p className="text-muted-foreground mb-4">
        {business.category} • {business.city}
      </p>

      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4"
            fill={i < Math.round(business.rating) ? "#facc15" : "none"}
            stroke="#facc15"
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">
          {business.rating} ({business.reviewCount} reviews)
        </span>
      </div>

      <div className="flex gap-3 mb-6">
        <WriteReview businessId={business.id} />
        <SubmitComplaint />
      </div>

      <h2 className="text-lg font-semibold mb-2">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r: any, i: number) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= r.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : ""
                        }`}
                      />
                    ))}
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

                <p className="text-sm">{r.text}</p>

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

                <p className="text-xs text-muted-foreground">— {r.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <BusinessInfo
        about={business.about}
        faqs={business.faqs}
        hours={business.hours}
        contactInfo={business.contactInfo}
      />
    </main>
  );
}
