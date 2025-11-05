"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ADMIN_EMAIL } from "../lib/constants";

// Reusable HTML components
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-gray-700 mb-1 font-medium">{children}</label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full border rounded p-2" />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className="w-full border rounded p-2" />
);

const StatsCard = ({ title, value }: { title: string; value: number | string }) => (
  <div className="bg-white shadow rounded-lg p-6 text-center">
    <p className="text-gray-500">{title}</p>
    <h3 className="text-2xl font-bold mt-2">{value}</h3>
  </div>
);

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [type, setType] = useState("pdf");

  // Data states
  const [notes, setNotes] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Tabs state
  const [activeTab, setActiveTab] = useState<"materials" | "purchases" | "messages">("materials");

  // Admin check
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      const loggedUser = data?.user;
      if (!loggedUser) {
        router.push("/auth");
        return;
      }
      setUser(loggedUser);

      if (loggedUser.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        alert("Access denied. Admins only.");
        router.push("/");
      }
    };
    checkUser();
  }, [router]);

  // Fetch notes, purchases, messages
  useEffect(() => {
    const fetchData = async () => {
      const { data: notesData } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });
      if (notesData) setNotes(notesData);

      const { data: purchasesData } = await supabase.from("purchases").select("*");
      if (purchasesData) setPurchases(purchasesData);

      const { data: messagesData } = await supabase.from("messages").select("*");
      if (messagesData) setMessages(messagesData);
    };
    fetchData();
  }, []);

  // Add note
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price || !fileUrl) {
      alert("Please fill all fields");
      return;
    }

    const { error, data } = await supabase
      .from("notes")
      .insert([{ title, description, price: Number(price), file_url: fileUrl, type }])
      .select();

    if (error) alert(error.message);
    else {
      alert("Note added successfully!");
      setNotes((prev) => [data[0], ...prev]);
      setTitle("");
      setDescription("");
      setPrice("");
      setFileUrl("");
    }
  };

  // Delete note
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) alert(error.message);
    else setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  if (!isAdmin) return null;

  // Analytics calculations
  const purchasedNoteIds = purchases.map((p) => p.note_id);
  const totalRevenue = notes
    .filter((n) => purchasedNoteIds.includes(n.id))
    .reduce((sum, n) => sum + (n.price || 0), 0);
  const totalPurchases = purchasedNoteIds.length;
  const totalNotes = notes.length;
  const unreadMessages = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatsCard title="Total Notes" value={totalNotes} />
        <StatsCard title="Total Revenue" value={`₹${totalRevenue.toFixed(0)}`} />
        <StatsCard title="Total Purchases" value={totalPurchases} />
        <StatsCard title="Unread Messages" value={unreadMessages} />
      </div>

      {/* Add Note Form */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Add New Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
          </div>
          <div>
            <Label>Description *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price (₹) *</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" />
            </div>
            <div>
              <Label>Type</Label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="pdf">PDF</option>
                <option value="youtube">YouTube</option>
                <option value="gdrive">Google Drive</option>
              </select>
            </div>
          </div>
          <div>
            <Label>File URL *</Label>
            <Input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="File URL" />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Add Note
          </button>
        </form>
      </div>

      {/* Notes List */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {notes.map((note) => (
          <div key={note.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="font-bold text-xl">{note.title}</h3>
            <p className="text-gray-600 mt-1">{note.description}</p>
            <p className="font-semibold mt-2">₹{note.price}</p>
            <p className="text-sm text-gray-500">Type: {note.type}</p>
            <a href={note.file_url} target="_blank" className="text-indigo-600 hover:underline mt-2 block">
              View File
            </a>
            <button
              onClick={() => handleDelete(note.id)}
              className="mt-3 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "materials" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("materials")}
          >
            Materials
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "purchases" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("purchases")}
          >
            Purchases
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "messages" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            Messages
          </button>
        </div>

        {/* Materials Tab */}
        {activeTab === "materials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="bg-gray-50 border rounded-lg p-4">
                <h3 className="font-bold">{note.title}</h3>
                <p className="text-gray-600">{note.description}</p>
                <p className="font-semibold mt-1">₹{note.price}</p>
                <p className="text-sm text-gray-500">Type: {note.type}</p>
                <a href={note.file_url} target="_blank" className="text-indigo-600 hover:underline mt-1 block">
                  View File
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Purchases Tab */}
        {activeTab === "purchases" && (
          <div className="overflow-x-auto">
            <table className="min-w-full border divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">User</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Material</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount (₹)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {purchases.map((purchase) => {
                  const note = notes.find((n) => n.id === purchase.note_id);
                  return (
                    <tr key={purchase.id}>
                      <td className="px-4 py-2">{purchase.user_email}</td>
                      <td className="px-4 py-2">{note?.title || "Deleted Note"}</td>
                      <td className="px-4 py-2">{note?.price || 0}</td>
                      <td className="px-4 py-2">{new Date(purchase.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-2 capitalize">{purchase.status || "unknown"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="overflow-x-auto">
            <table className="min-w-full border divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Message</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {messages.map((msg) => (
                  <tr key={msg.id}>
                    <td className="px-4 py-2">{msg.name}</td>
                    <td className="px-4 py-2">{msg.email}</td>
                    <td className="px-4 py-2">{msg.message}</td>
                    <td className="px-4 py-2">{new Date(msg.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-2 capitalize">{msg.status || "unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
