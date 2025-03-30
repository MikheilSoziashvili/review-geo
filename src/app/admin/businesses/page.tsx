"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { MoreVertical, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Business = {
  name: string;
  category: string;
  city: string;
  status: "Approved" | "Pending" | "Rejected";
};

const businesses: Business[] = [
  { name: "Cafe Mocha", category: "Café", city: "Tbilisi", status: "Approved" },
  { name: "TechFix", category: "Electronics Repair", city: "Tbilisi", status: "Approved" },
  { name: "Urban Bites", category: "Restaurant", city: "Tbilisi", status: "Rejected" },
  { name: "Green Market", category: "Grocery Store", city: "Tbilisi", status: "Approved" },
  { name: "FitLife Gym", category: "Fitness Center", city: "Tbilisi", status: "Rejected" },
  { name: "Tbilisi Diner", category: "Restaurant", city: "Tbilisi", status: "Pending" },
  { name: "EasyTech", category: "Electronics Repair", city: "Tbilisi", status: "Pending" },
];

export default function AdminBusinesses() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"name" | "category" | "city" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const [openModal, setOpenModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<{
    name: string;
    action: string;
  } | null>(null);

  const handleSort = (field: "name" | "category" | "city") => {
    setSortField((prev) => (prev === field ? null : field));
  };

  const confirmAction = () => {
    if (!selectedAction) return;
    console.log(`${selectedAction.action} confirmed for ${selectedAction.name}`);
    setOpenModal(false);
  };

  const filtered = businesses
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
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
      <h1 className="text-2xl font-bold mb-4">Businesses</h1>
      <Input
        placeholder="Search businesses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-md"
      />

      <Card className="overflow-x-auto border">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              {["name", "category", "city"].map((field) => (
                <th
                  key={field}
                  className="p-3 cursor-pointer"
                  onClick={() => handleSort(field as any)}
                >
                  <div className="flex items-center gap-1 capitalize">
                    {field}
                    <ArrowUpDown size={14} className="text-muted-foreground" />
                  </div>
                </th>
              ))}
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((b, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{b.name}</td>
                <td className="p-3">{b.category}</td>
                <td className="p-3">{b.city}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      b.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : b.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
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
                            setSelectedAction({ name: b.name, action });
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
              ? `This will ${selectedAction.action.toLowerCase()} "${selectedAction.name}".`
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
