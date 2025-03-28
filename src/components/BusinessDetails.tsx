"use client";

import { MapPin, Phone, Globe } from "lucide-react";

interface BusinessDetailsProps {
  phone?: string;
  website?: string;
  address?: string;
  googleMapEmbedUrl?: string;
}

export function BusinessDetails({
  phone,
  website,
  address,
  googleMapEmbedUrl,
}: BusinessDetailsProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Contact & Location</h2>

      <div className="space-y-2 text-sm text-gray-700">
        {address && (
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{address}</span>
          </p>
        )}
        {phone && (
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <a href={`tel:${phone}`} className="hover:underline">
              {phone}
            </a>
          </p>
        )}
        {website && (
          <p className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {website}
            </a>
          </p>
        )}
      </div>

      {googleMapEmbedUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-lg border">
          <iframe
            src={googleMapEmbedUrl}
            width="100%"
            height="100%"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </section>
  );
}
