import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-8 bg-gray-50">
      <div className="mb-8 flex gap-2 max-w-xl">
        <Input placeholder="Search businesses or categories..." />
        <Button>Search</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((id) => (
          <Link href={`/business/${id}`}>
            <Card key={id} className="hover:shadow-md transition">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">Business #{id}</h2>
                <p className="text-sm text-muted-foreground">Category • Tbilisi</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm ml-2">(42 reviews)</span>
                </div>
              </CardContent>
            </Card>
          </Link>  
        ))}
      </div>

      <footer className="mt-12 text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} ReviewGeo. All rights reserved.
      </footer>
    </main>
  );
}
