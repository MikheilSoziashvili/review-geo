"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/store/useAuth";
import { toast } from "sonner";

interface Props {
  businessId: string;
}

export function SubmitComplaint({ businessId }: Props) {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return toast.error("Please write your complaint");

    const stored = localStorage.getItem("complaints");
    const data = stored ? JSON.parse(stored) : {};

    if (!user?.email) return;

    if (!data[user.email]) data[user.email] = [];
    data[user.email].push({
      businessId,
      text: text.trim(),
      date: new Date().toISOString(),
    });

    localStorage.setItem("complaints", JSON.stringify(data));
    toast.success("Complaint submitted!");
    setText("");
  };

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Submit Complaint</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Complaint</DialogTitle>
        </DialogHeader>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your complaint..."
          rows={4}
        />
        <Button onClick={handleSubmit} className="w-full mt-4">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}
