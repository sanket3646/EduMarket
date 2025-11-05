"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

interface Note {
  id: string;
  title: string;
  description: string;
  price?: number;
  file_url: string;
}

interface Purchase {
  id: string;
  created_at: string;
  notes?: Note;
}

export default function PurchasesPage() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Auth error:", userError.message);
        return;
      }

      const currentUser = userData?.user;
      if (!currentUser) {
        router.push("/auth");
        return;
      }
      setUser(currentUser);

      const { data, error } = await supabase
        .from("purchases")
        .select(`
          id,
          created_at,
          notes (
            id,
            title,
            description,
            price,
            file_url
          )
        `)
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching purchases:", error.message);
      } else {
        // Map the data safely to Purchase[]
        const formatted: Purchase[] = Array.isArray(data)
          ? data.map((p: any) => ({
              id: p.id,
              created_at: p.created_at,
              notes: p.notes
                ? {
                    id: p.notes.id,
                    title: p.notes.title,
                    description: p.notes.description,
                    price: p.notes.price,
                    file_url: p.notes.file_url,
                  }
                : undefined,
            }))
          : [];
        setPurchases(formatted);
      }

      setLoading(false);
    };

    fetchPurchases();
  }, [router]);

  if (loading)
    return (
      <p className="text-center mt-12 text-gray-600">
        Loading your purchases...
      </p>
    );

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">My Purchases</h1>

      {purchases.length === 0 ? (
        <p className="text-gray-700">You haven’t purchased anything yet.</p>
      ) : (
        <ul className="space-y-4 w-full max-w-2xl">
          {purchases.map((purchase) => (
            <li
              key={purchase.id}
              className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">
                {purchase.notes?.title || "Untitled Note"}
              </h2>
              <p className="text-gray-700 mt-1">
                {purchase.notes?.description || "No description"}
              </p>
              {purchase.notes?.price && (
                <p className="text-gray-500 mt-2">
                  Price: ₹{purchase.notes.price}
                </p>
              )}
              {purchase.notes?.file_url && (
                <a
                  href={purchase.notes.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  View File
                </a>
              )}
              <p className="text-sm text-gray-400 mt-1">
                Purchased on{" "}
                {new Date(purchase.created_at).toLocaleDateString("en-IN")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
