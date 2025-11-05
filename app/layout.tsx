import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Notes Marketplace",
  description: "Buy and sell study notes easily.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Razorpay SDK */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main content grows to push footer down */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
