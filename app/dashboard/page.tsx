"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  title: string;
  description: string;
  price: number;
  file_url: string;
  type: string;
}
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasedNotes, setPurchasedNotes] = useState<string[]>([]); // ✅ moved above

  useEffect(() => {
    const fetchUserAndNotes = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const loggedUser = userData?.user;

      if (!loggedUser) {
        router.push("/auth");
        return;
      }

      setUser(loggedUser);

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching notes:", error.message);
      else setNotes(data || []);

      setLoading(false);
    };

    fetchUserAndNotes();
  }, [router]);

  // ✅ fetch user's purchased notes after user is set
  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("purchases")
        .select("note_id")
        .eq("user_id", user.id);

      setPurchasedNotes(data?.map((d) => d.note_id) || []);
    };
    fetchPurchases();
  }, [user]);

  // ✅ Razorpay handler
  const handlePurchase = async (note: Note) => {
    if (purchasedNotes.includes(note.id)) {
      window.open(note.file_url, "_blank");
      return;
    }

      const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const res = await fetch("/api/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: note.price }),
  });
  const data = await res.json();
  const order = data.order;

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: "INR",
    name: "StudyHub",
    description: note.title,
    order_id: order.id,
    handler: async function (response: any) {
      await supabase.from("purchases").insert([
        { user_id: user.id, note_id: note.id },
      ]);
      setPurchasedNotes((prev) => [...prev, note.id]);
      alert("Payment successful!");
    },
    prefill: {
      email: user.email,
    },
    theme: {
      color: "#4f46e5",
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
  };

  // ✅ only conditionally return *after* all hooks
  if (loading) return <p className="text-center mt-10">Loading courses...</p>;

  return (
    <div className="min-h-screen px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Available Notes / Courses</h1>

      {notes.length === 0 ? (
        <p className="text-center text-gray-600">No notes have been uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{note.description}</p>
              <p className="text-indigo-600 font-bold mt-3">₹{note.price}</p>
              <p className="text-sm text-gray-500 capitalize mt-1">
                Type: {note.type}
              </p>

              <button
                onClick={() => handlePurchase(note)}
                className={`mt-4 w-full py-2 rounded-lg transition ${
                  purchasedNotes.includes(note.id)
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {purchasedNotes.includes(note.id) ? "View File" : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
