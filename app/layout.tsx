import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientLayout from "./ClientLayout";
export const metadata: Metadata = {
  title: "Notes Marketplace",
  description: "Buy and sell study notes easily.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>EduMarket</title>
      <meta name="description" content="Premium learning platform" />
      <link rel="icon" href="/favicon.ico" />
        {/* Razorpay SDK */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Navbar */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
