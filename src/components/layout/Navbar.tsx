"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/about" },
    { label: "SERVICES", href: "/services" },
    { label: "PRODUCTS", href: "/products" },
    { label: "PROJECTS", href: "/projects" },
    { label: "SUBSIDY ASSISTANCE", href: "/subsidy" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - Left */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logo.png"
            alt="ThermoVault Systems Logo"
            width={240}
            height={60}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Centered Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] xl:text-[11px] font-bold tracking-wider transition-all duration-200 relative pb-1 border-b-2 hover:text-blue-600 ${
                  isActive
                    ? "text-blue-600 border-blue-600 font-extrabold"
                    : "text-[#0c2340] border-transparent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => {
              const event = new CustomEvent("open-quote-modal");
              window.dispatchEvent(event);
            }}
            className="rounded-md bg-[#0c2340] px-5 py-2 text-xs font-bold text-white transition-all hover:bg-[#183960] shadow-md hover:shadow-lg active:scale-95"
          >
            Get Free Consultation
          </button>

          <a
            href="tel:+918055010620"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#0c2340] hover:bg-slate-100 hover:text-blue-600 transition-colors"
            title="Call Support"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
