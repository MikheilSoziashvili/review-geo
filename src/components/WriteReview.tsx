"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/lib/store/useAuth";
import { toast } from "sonner";

const maxLabels = 3;

export function WriteReview({ businessId }: { businessId: string }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [customLabel, setCustomLabel] = useState("");

  const toggleLabel = (label: string) => {
    setLabels((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : prev.length < maxLabels
        ? [...prev, label]
        : prev
    );
  };

  const addCustomLabel = () => {
    const trimmed = customLabel.trim();
    if (trimmed && !labels.includes(trimmed) && labels.length < maxLabels) {
      setLabels((prev) => [...prev, trimmed]);
      setCustomLabel("");
    }
  };

  const handleSubmit = () => {
    if (!rating || !text.trim()) {
      toast.error("Please provide both a rating and text.");
      return;
    }

    const stored = localStorage.getItem("reviews");
    const parsed = stored ? JSON.parse(stored) : {};

    const review = {
      rating,
      text,
      name: user?.name || "Anonymous",
      email: user?.email || "",
      labels,
    };

    if (!parsed[businessId]) parsed[businessId] = [];
    parsed[businessId].push(review);

    localStorage.setItem("reviews", JSON.stringify(parsed));
    toast.success("Review submitted");

    setRating(0);
    setText("");
    setLabels([]);
  };

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">✍️ Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer transition ${
                  star <= (hovered || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
              />
            ))}
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
          />

          <div>
            <p className="text-sm mb-1">Add up to {maxLabels} labels:</p>
            <div className="flex gap-2 flex-wrap">
              {labels.map((label, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                >
                  #{label}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Enter label"
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
              />
              <Button type="button" onClick={addCustomLabel}>Add</Button>
            </div>
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
