"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

type HeroProps = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
};

export function HeroSection({ searchTerm, setSearchTerm }: HeroProps) {
  return (
    <section className="relative w-full py-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#FFF5F5] via-[#F3F9FF] to-[#FDFDFD]" />

      {/* Optional soft blob */}
      <div className="absolute top-[-80px] right-[-100px] w-[300px] h-[300px] bg-[#FFD460] opacity-20 rounded-full blur-3xl z-0" />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left */}
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
            Discover Smarter. <br />
            <span className="text-brand-primary">Review Openly.</span> <br />
            Connect Authentically.
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Join our community of real reviewers and empower each other with genuine insights.
            Your honest feedback helps everyone make better choices.
          </p>

          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search for businesses, brands, or categories..."
              className="pl-10 pr-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
