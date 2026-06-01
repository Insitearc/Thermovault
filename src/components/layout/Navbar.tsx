"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [forceOpaque, setForceOpaque] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const isServiceDetailPage = pathname.startsWith("/services/");

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/about" },
    { 
      label: "SERVICES", 
      href: "/services",
      dropdown: [
        { label: "SERVICES HUB", href: "/services" },
        { label: "MODULAR COLD ROOMS", href: "/services/modular-cold-rooms" },
        { label: "REFRIGERATION SYSTEMS", href: "/services/refrigeration-systems" },
        { label: "DISPLAY COLD ROOMS", href: "/services/display-cold-rooms" },
        { label: "RIPENING CHAMBERS", href: "/services/ripening-chambers" },
        { label: "BLAST CHILLERS", href: "/services/blast-chillers" },
        { label: "AMC & MAINTENANCE", href: "/services/amc" }
      ]
    },
    { label: "PRODUCTS", href: "/products" },
    { label: "PROJECTS", href: "/projects" },
    { label: "SUBSIDY ASSISTANCE", href: "/subsidy" },
    { label: "BLOG", href: "/blog" },
    { 
      label: "CONTACT", 
      href: "/contact",
      dropdown: [
        { label: "CONTACT US", href: "/contact" },
        { label: "CAREERS", href: "/careers" }
      ]
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On mount, detect the element just below the header; if it's dark, force opaque header
  useEffect(() => {
    if (typeof window === "undefined") return;
    const detectBackground = () => {
      const headerEl = headerRef.current;
      if (!headerEl) return;
      const rect = headerEl.getBoundingClientRect();
      const x = Math.round(window.innerWidth / 2);
      const y = Math.min(Math.round(rect.bottom + 6), window.innerHeight - 1);
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return;

      // walk up until we find a non-transparent background color
      let bgEl: Element | null = el;
      let bgColor = "";
      while (bgEl && bgEl !== document.documentElement) {
        const style = window.getComputedStyle(bgEl as Element);
        if (
          style.backgroundColor &&
          style.backgroundColor !== "rgba(0, 0, 0, 0)" &&
          style.backgroundColor !== "transparent"
        ) {
          bgColor = style.backgroundColor;
          break;
        }
        bgEl = bgEl.parentElement;
      }

      if (!bgColor) return;

      // parse rgb(a) and compute simple luminance
      const m = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (!m) return;
      const r = Number(m[1]),
        g = Number(m[2]),
        b = Number(m[3]);
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; // 0 (dark) - 1 (light)
      // if background is dark (lum < 0.55) then force opaque header so logo/text remains readable
      setForceOpaque(lum < 0.55);
    };

    // run after a short timeout to allow layout paints (images) to load
    const t = setTimeout(detectBackground, 80);
    window.addEventListener("resize", detectBackground);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", detectBackground);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-300 ease-in-out backdrop-blur-sm ${
          scrolled || forceOpaque || isServiceDetailPage
            ? "border-b border-slate-200 bg-white/95 shadow-md"
            : "border-b border-transparent bg-white/0 shadow-sm"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}
        >
          {/* Brand Logo + Breadcrumbs - Left */}
          <div className="flex flex-col items-start gap-1 shrink-0">
            <Link href="/" className="flex items-center shrink-0">
              <img
                src="/images/logo.png?v=20"
                alt="ThermoVault Systems Logo"
                width={240}
                height={60}
                className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-10" : "h-14"}`}
                loading="eager"
              />
            </Link>
          </div>

          {/* Centered Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.dropdown && link.dropdown.some((sub) => pathname === sub.href));
              
              if (link.dropdown) {
                return (
                  <div key={link.label} className="relative group py-2">
                    <button
                      className={`text-[10px] xl:text-[11px] font-bold tracking-wider transition-all duration-200 relative pb-1 border-b-2 flex items-center gap-1 hover:text-blue-600 cursor-pointer ${
                        isActive
                          ? "text-blue-600 border-blue-600 font-extrabold"
                          : "text-[#0c2340] border-transparent"
                      }`}
                    >
                      {link.label}
                      <span className="text-[7px] text-slate-400 group-hover:text-blue-600 transition-transform duration-200 group-hover:rotate-180">▼</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-2 w-52 rounded-lg bg-white border border-slate-100 shadow-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-1 group-hover:translate-y-0">
                      {link.dropdown.map((subLink) => {
                        const isSubActive = pathname === subLink.href;
                        return (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className={`block px-4 py-2 text-[10px] font-bold tracking-wider hover:bg-slate-50 hover:text-blue-600 transition-colors ${
                              isSubActive ? "text-blue-600 font-extrabold bg-blue-50/50" : "text-[#0c2340]"
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

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
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => {
                const event = new CustomEvent("open-quote-modal");
                window.dispatchEvent(event);
              }}
              className="hidden sm:inline-block rounded-md bg-[#0c2340] px-5 py-2 text-xs font-bold text-white transition-all hover:bg-[#183960] shadow-md hover:shadow-lg active:scale-95"
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

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#0c2340] hover:bg-slate-100 hover:text-blue-600 transition-colors lg:hidden"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel (Slide down dropdown) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-b border-slate-200 bg-white overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => {
                  if (link.dropdown) {
                    return (
                      <div key={link.label} className="space-y-1">
                        <div className="px-3 pt-2.5 pb-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                          {link.label}
                        </div>
                        {link.dropdown.map((subLink) => {
                          const isSubActive = pathname === subLink.href;
                          return (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block py-2 px-6 text-xs font-bold rounded-lg transition-colors ${
                                isSubActive
                                  ? "bg-blue-50 text-blue-600 font-extrabold"
                                  : "text-[#0c2340] hover:bg-slate-50"
                              }`}
                            >
                              {subLink.label}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  }

                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2.5 px-3 text-xs font-bold rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-extrabold"
                          : "text-[#0c2340] hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Consultation button in mobile menu */}
                <div className="pt-4 border-t border-slate-100 sm:hidden">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      const event = new CustomEvent("open-quote-modal");
                      window.dispatchEvent(event);
                    }}
                    className="w-full text-center rounded-lg bg-[#0c2340] py-3 text-xs font-bold text-white transition-all hover:bg-[#183960] active:scale-95"
                  >
                    Get Free Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to preserve flow for fixed header */}
      <div aria-hidden className={scrolled ? "h-16" : "h-20"} />
    </>
  );
}
