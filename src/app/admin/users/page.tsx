"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

type User = {
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Suspended";
};

const mockUsers: User[] = [
  { name: "Mikheil S.", email: "mikheil@example.com", role: "User", status: "Active" },
  { name: "Nino M.", email: "nino@example.com", role: "Business", status: "Pending" },
  { name: "Lasha K.", email: "lasha@example.com", role: "User", status: "Suspended" },
  { name: "Lela T.", email: "lela@example.com", role: "Business", status: "Active" },
  { name: "Sandro Z.", email: "sandro@example.com", role: "User", status: "Pending" },
  { name: "Natia A.", email: "natia@example.com", role: "User", status: "Suspended" },
  { name: "Irakli B.", email: "irakli@example.com", role: "User", status: "Active" },
  { name: "Dato G.", email: "dato@example.com", role: "Business", status: "Pending" },
  { name: "Ana K.", email: "ana@example.com", role: "User", status: "Suspended" },
  { name: "Lika M.", email: "lika@example.com", role: "User", status: "Active" },
];

const pageSize = 5;

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<"Suspend" | "Activate" | "Delete" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirmAction = () => {
    if (!selectedUser || !actionType) return;

    setUsers((prev) =>
      prev.map((u) =>
        u.email === selectedUser.email
          ? {
              ...u,
              status:
                actionType === "Suspend"
                  ? "Suspended"
                  : actionType === "Activate"
                  ? "Active"
                  : u.status,
            }
          : u
      )
    );

    setDialogOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };

  const statusColor = {
    Active: "text-green-600 font-medium",
    Pending: "text-yellow-600 font-medium",
    Suspended: "text-red-600 font-medium",
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>

      <Input placeholder="Search users by name or email..." className="max-w-md" />

      <Card>
        <CardContent className="overflow-x-auto p-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="border-b hover:bg-muted/50">
                  <td className="py-2">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user);
                            setActionType("Activate");
                            setDialogOpen(true);
                          }}
                        >
                          Activate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user);
                            setActionType("Suspend");
                            setDialogOpen(true);
                          }}
                        >
                          Suspend
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user);
                            setActionType("Delete");
                            setDialogOpen(true);
                          }}
                          className="text-red-500"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm {actionType}</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground mb-4">
            Are you sure you want to {actionType?.toLowerCase()}{" "}
            <strong>{selectedUser?.name}</strong>?
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant={actionType === "Delete" ? "destructive" : "default"} onClick={handleConfirmAction}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}