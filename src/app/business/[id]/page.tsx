import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { WriteReview } from "@/components/WriteReview";
import { SubmitComplaint } from "@/components/SubmitComplaint";

interface BusinessPageProps {
  params: {
    id: string;
  };
}

export default function BusinessPage({ params }: BusinessPageProps) {
  const businessName = `Business #${params.id}`;

  return (
    <main className="min-h-screen px-6 py-8 bg-white">
      <h1 className="text-2xl font-bold mb-1">{businessName}</h1>
      <p className="text-muted-foreground mb-4">Category • Tbilisi</p>

      <div className="flex gap-3 mb-6">
        <WriteReview />
        <SubmitComplaint />
      </div>

      <h2 className="text-lg font-semibold mb-2">Reviews</h2>
      <div className="space-y-4">
        {[1, 2].map((id) => (
          <Card key={id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm">“Great customer service and cozy vibe.”</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
