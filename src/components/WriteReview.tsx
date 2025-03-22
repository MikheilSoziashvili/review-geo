"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Star } from "lucide-react";

export function WriteReview() {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Write a Review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-1 my-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 cursor-pointer ${
                rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your experience here..."
          className="min-h-[100px]"
        />

        <Button
          className="mt-4"
          disabled={rating === 0 || text.trim().length < 10}
          onClick={() => {
            // TODO: Handle submit (API call or local storage)
            alert(`Submitted: ${rating}★ - ${text}`);
            setRating(0);
            setText("");
          }}
        >
          Submit Review
        </Button>
      </DialogContent>
    </Dialog>
  );
}
