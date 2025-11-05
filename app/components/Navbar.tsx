"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ADMIN_EMAIL } from "../lib/constants";
import { Menu, X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user?.email === ADMIN_EMAIL) setIsAdmin(true);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setIsAdmin(session?.user?.email === ADMIN_EMAIL);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Materials", href: "/dashboard", auth: true },
    { name: "My Purchases", href: "/purchases", auth: true },
    { name: "About Us", href: "/about", auth: true },
    { name: "Contact", href: "/contact", auth: true },
    { name: "Admin", href: "/admin", auth: true, admin: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold"
          >
            {/* Gradient Icon */}
            <span className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 p-1 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </span>

            {/* Gradient Text */}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-xl">
              EduMarket
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => {
              if (link.auth && !user) return null;
              if (link.admin && !isAdmin) return null;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium hover:text-indigo-600 transition ${
                    pathname === link.href ? "text-indigo-600" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {!user ? (
              <button
                onClick={() => router.push("/auth")}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition"
              >
                Sign In / Sign Up
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center ">
            <button onClick={() => setMobileMenuOpen((prev) => !prev)} className="p-2 rounded-md hover:bg-white/20 transition">
              {mobileMenuOpen ? <X className="w-6 h-6 " /> : <Menu className="w-6 h-6 " />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/20 shadow-md"
          >
            <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
              {links.map((link) => {
                if (link.auth && !user) return null;
                if (link.admin && !isAdmin) return null;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-medium hover:text-indigo-600 transition ${
                      pathname === link.href ? "text-indigo-600" : "text-gray-700"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {!user ? (
                <button
                  onClick={() => {
                    router.push("/auth");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition"
                >
                  Sign In / Sign Up
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
