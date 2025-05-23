import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthLayout from "@/components/AuthLayout";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReviewGeo",
  description: "Centralized review and complaint platform for Georgia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Toaster/>
      <body className={inter.className}>
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  );
}
