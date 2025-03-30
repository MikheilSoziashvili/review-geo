"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowUpDown, MoreVertical } from "lucide-react";

type Review = {
  id: number;
  user: string;
  business: string;
  content: string;
  status: "Approved" | "Rejected" | "Pending";
};

const mockReviews: Review[] = [
  {
    id: 1,
    user: "Mikheil S.",
    business: "Cafe Mocha",
    content: "Great coffee and vibe!",
    status: "Approved",
  },
  {
    id: 2,
    user: "Nino M.",
    business: "TechFix",
    content: "Repaired my phone super quick!",
    status: "Pending",
  },
  {
    id: 3,
    user: "Lasha K.",
    business: "Urban Bites",
    content: "Did not enjoy the service.",
    status: "Rejected",
  },
  {
    id: 4,
    user: "Saba G.",
    business: "FitLife Gym",
    content: "Best gym in Tbilisi.",
    status: "Pending",
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"user" | "business" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const [selectedAction, setSelectedAction] = useState<{
    id: number;
    action: string;
  } | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSort = (field: "user" | "business") => {
    setSortField((prev) => (prev === field ? null : field));
  };

  const confirmAction = () => {
    if (!selectedAction) return;

    // Update mock state
    const updated = reviews.map((r) =>
      r.id === selectedAction.id
        ? {
            ...r,
            status:
              selectedAction.action === "Delete"
                ? r.status
                : (selectedAction.action as Review["status"]),
          }
        : r
    );
    const final = selectedAction.action === "Delete"
      ? updated.filter((r) => r.id !== selectedAction.id)
      : updated;

    setReviews(final);
    setOpenModal(false);
  };

  const filtered = reviews
    .filter(
      (r) =>
        r.user.toLowerCase().includes(search.toLowerCase()) ||
        r.business.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortField ? a[sortField].localeCompare(b[sortField]) : 0
    );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const pageCount = Math.ceil(filtered.length / perPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>

      <Input
        placeholder="Search by user or business..."
        className="mb-4 max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Card className="overflow-x-auto border">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("user")}
              >
                <div className="flex items-center gap-1">
                  User <ArrowUpDown size={14} />
                </div>
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("business")}
              >
                <div className="flex items-center gap-1">
                  Business <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="p-3">Content</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.user}</td>
                <td className="p-3">{r.business}</td>
                <td className="p-3 max-w-xs truncate">{r.content}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : r.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {["Approve", "Reject", "Delete"].map((action) => (
                        <DropdownMenuItem
                          key={action}
                          onClick={() => {
                            setSelectedAction({ id: r.id, action });
                            setOpenModal(true);
                          }}
                          className={
                            action === "Delete" ? "text-destructive" : ""
                          }
                        >
                          {action}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border text-sm ${
              currentPage === i + 1
                ? "bg-primary text-white"
                : "bg-white hover:bg-muted"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Confirm Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {selectedAction
              ? `You are about to ${selectedAction.action.toLowerCase()} this review.`
              : ""}
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmAction}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
