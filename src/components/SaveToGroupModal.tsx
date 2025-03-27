"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/store/useAuth";
import { toast } from "sonner";

interface SaveToGroupModalProps {
  businessId: string;
  businessCategory: string;
  onSave?: () => void;
}

export function SaveToGroupModal({
  businessId,
  businessCategory,
  onSave,
}: SaveToGroupModalProps) {
  const { user } = useAuth();
  const [groups, setGroups] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [newGroup, setNewGroup] = useState("");
  const [open, setOpen] = useState(false); // 🔥 control modal visibility

  const emailKey = user?.email || "guest";

  const suggested =
    businessCategory.toLowerCase().includes("cafe") ||
    businessCategory.toLowerCase().includes("restaurant")
      ? [
          "Cozy Places",
          "Great Date Spots",
          "Value for Money",
          "Best for Working",
        ]
      : [];

  useEffect(() => {
    const stored = localStorage.getItem("favoritesByGroup");
    const parsed = stored ? JSON.parse(stored) : {};
    const existingGroups = Object.keys(parsed[emailKey] || {});
    setGroups(existingGroups);
  }, [emailKey]);

  const toggleGroup = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    );
  };

  const addNewGroup = () => {
    const cleaned = newGroup.trim();
    if (cleaned && !groups.includes(cleaned)) {
      setGroups((prev) => [...prev, cleaned]);
      setSelected((prev) => [...prev, cleaned]);
    }
    setNewGroup("");
  };

  const handleSave = () => {
    const stored = localStorage.getItem("favoritesByGroup");
    const data = stored ? JSON.parse(stored) : {};

    if (!data[emailKey]) data[emailKey] = {};

    selected.forEach((group) => {
      if (!data[emailKey][group]) {
        data[emailKey][group] = [];
      }
      if (!data[emailKey][group].includes(businessId)) {
        data[emailKey][group].push(businessId);
      }
    });

    localStorage.setItem("favoritesByGroup", JSON.stringify(data));
    toast.success("Added to list");
    setSelected([]);
    setNewGroup("");

    if (onSave) onSave();
    setOpen(false); // 🔥 close the modal
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          ➕ Save to List
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save to List</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {suggested.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Suggestions</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {suggested.map((label) => (
                  <button
                    key={label}
                    onClick={() => toggleGroup(label)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      selected.includes(label)
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {groups.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Your Lists</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {groups.map((label) => (
                  <button
                    key={label}
                    onClick={() => toggleGroup(label)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      selected.includes(label)
                        ? "bg-black text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Input
              placeholder="New list name"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
            />
            <Button onClick={addNewGroup}>Add</Button>
          </div>

          <Button onClick={handleSave} className="w-full mt-4">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
