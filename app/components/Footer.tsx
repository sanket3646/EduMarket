// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

interface FooterProps {
  createPageUrl?: (page: string) => string;
}

const Footer: React.FC<FooterProps> = ({ createPageUrl = (page) => `/${page.toLowerCase()}` }) => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">EduPlatform</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Your trusted partner in quality education. Access premium learning materials and excel in your academic journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href={createPageUrl("Materials")} className="text-gray-300 hover:text-white transition-colors">
                  Browse Materials
                </Link>
              </li>
              <li>
                <Link href={createPageUrl("About")} className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={createPageUrl("Contact")} className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href={createPageUrl("PrivacyPolicy")} className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={createPageUrl("Terms")} className="text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href={createPageUrl("RefundPolicy")} className="text-gray-300 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 EduPlatform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
