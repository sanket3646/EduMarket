"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Pages where Navbar/Footer should NOT show
  const hideLayout = pathname.startsWith("/auth"); // any /auth page

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
