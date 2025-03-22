"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function SubmitComplaint() {
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Submit Complaint</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit a Complaint</DialogTitle>
        </DialogHeader>

        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your complaint..."
        />

        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="public"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <label htmlFor="public" className="text-sm">
            Make this complaint public
          </label>
        </div>

        <Button
          className="mt-4"
          disabled={description.trim().length < 10}
          onClick={() => {
            alert(`Complaint submitted: ${description} | Public: ${isPublic}`);
            setDescription("");
          }}
        >
          Submit Complaint
        </Button>
      </DialogContent>
    </Dialog>
  );
}
