// components/BusinessHero.tsx

"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface BusinessHeroProps {
  name: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  heroImageUrl?: string;
  logoUrl?: string;
}

export function BusinessHero({
  name,
  category,
  city,
  rating,
  reviewCount,
  heroImageUrl,
  logoUrl,
}: BusinessHeroProps) {
  return (
    <div className="relative w-full h-64 md:h-72 lg:h-80">
      {heroImageUrl ? (
        <Image
          src={heroImageUrl}
          alt={`${name} banner`}
          fill
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xl">
          No Hero Image
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md flex gap-4 items-center">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            width={60}
            height={60}
            className="rounded-md object-cover border"
          />
        )}

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-600">
            {category} • {city}
          </p>
          <div className="flex items-center gap-1 mt-1 text-yellow-600 text-sm">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(rating) ? "fill-yellow-400" : ""}
              />
            ))}
            <span className="ml-1">
              {rating} ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
