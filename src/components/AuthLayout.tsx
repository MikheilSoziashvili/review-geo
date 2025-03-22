"use client";

import { useAuth } from "@/lib/store/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 shadow bg-white">
        <Link href="/">
          <h1 className="text-xl font-bold">ReviewGeo</h1>
        </Link>
        <nav className="space-x-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" onClick={logout}>Logout</Button>
              <Link href="/profile"><Button>Profile</Button></Link>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={login}>Login</Button>
              <Button onClick={login}>Register</Button>
            </>
          )}
        </nav>
      </header>

      <main className="flex-grow p-6 bg-gray-50">{children}</main>

      <footer className="text-center text-sm text-muted-foreground p-4">
        © {new Date().getFullYear()} ReviewGeo. All rights reserved.
      </footer>
    </div>
  );
}
