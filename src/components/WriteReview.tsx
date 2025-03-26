"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/store/useAuth";
import { Star } from "lucide-react";

interface Props {
  businessId: string;
}

export function WriteReview({ businessId }: Props) {
  const { user, isLoggedIn } = useAuth();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [labelInput, setLabelInput] = useState("");

  const suggestedLabels = [
    "friendly staff",
    "fast service",
    "great pricing",
    "clean environment",
    "cozy",
    "professional",
    "good for families",
  ];

  if (!isLoggedIn || !user) return null;

  const handleSubmit = () => {
    if (!rating || !text.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const stored = localStorage.getItem("reviews");
    const parsed = stored ? JSON.parse(stored) : {};
    const reviews = parsed[businessId] || [];

    const alreadyReviewed = reviews.find((r: any) => r.email === user.email);
    if (alreadyReviewed) {
      toast.error("You’ve already reviewed this business.");
      return;
    }

    const newReview = {
      name: user.name,
      email: user.email,
      rating,
      text,
      labels: labelInput
        .split(",")
        .map((l) => l.trim())
        .filter((l) => l.length > 0),
      createdAt: new Date().toISOString(),
    };

    const updated = {
      ...parsed,
      [businessId]: [...reviews, newReview],
    };

    localStorage.setItem("reviews", JSON.stringify(updated));
    toast.success("Review submitted!");
    setRating(0);
    setText("");
    setLabelInput("");
    window.location.reload(); // refresh to show new review
  };

  const handleAddSuggested = (label: string) => {
    const current = labelInput
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l);
    if (!current.includes(label)) {
      setLabelInput([...current, label].join(", "));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Write a Review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input disabled value={user.name} />

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`w-6 h-6 cursor-pointer ${
                  rating >= star ? "fill-yellow-400 text-yellow-400" : ""
                }`}
              />
            ))}
          </div>

          <Textarea
            placeholder="Write your thoughts here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />

          <Input
            placeholder="Add labels (comma-separated)"
            value={labelInput}
            onChange={(e) => setLabelInput(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {suggestedLabels.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleAddSuggested(label)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
              >
                + {label}
              </button>
            ))}
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
