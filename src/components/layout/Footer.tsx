"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Phone, Mail, MapPin, MessageSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#111318] border-t border-white/5 pt-12 pb-6 text-silver">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <p className="text-xs leading-relaxed text-silver/80">
              Securing the cold chain ecosystem across India with high-efficiency walk-in cold storage rooms, engineering-grade PUF panels, and advanced IoT telemetry alerts.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918055010620"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-[#0C2340] border border-white/5 flex items-center justify-center text-teal-light hover:bg-teal-accent hover:text-white transition-all"
              >
                <MessageSquare className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services Hub
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products & Components
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects Gallery
                </Link>
              </li>
              <li>
                <Link href="/subsidy" className="hover:text-white transition-colors">
                  Subsidy Assistance
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-teal-light hover:text-white transition-colors flex items-center gap-1 font-semibold">
                  3D IoT Demo Dashboard →
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Quick Directory */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/modular-cold-rooms" className="hover:text-white transition-colors">
                  Modular Cold Rooms
                </Link>
              </li>
              <li>
                <Link href="/services/refrigeration-systems" className="hover:text-white transition-colors">
                  Refrigeration Systems
                </Link>
              </li>
              <li>
                <Link href="/services/display-cold-rooms" className="hover:text-white transition-colors">
                  Display Cold Rooms
                </Link>
              </li>
              <li>
                <Link href="/services/clean-rooms" className="hover:text-white transition-colors">
                  Clean Rooms
                </Link>
              </li>
              <li>
                <Link href="/services/ripening-chambers" className="hover:text-white transition-colors">
                  Fruits Ripening Chambers
                </Link>
              </li>
              <li>
                <Link href="/services/blast-chillers" className="hover:text-white transition-colors">
                  Blast Chillers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">
              Office Details
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-teal-light mt-0.5" />
              <span>
                Sector 4, Bhosari Industrial Area, MIDC, Pune, Maharashtra, India - 411026
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-teal-light" />
              <a href="tel:+918055010620" className="hover:text-white transition-colors">
                +91 80550 10620
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-teal-light" />
              <a href="mailto:info@thermovaultsystems.com" className="hover:text-white transition-colors">
                info@thermovaultsystems.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-silver/60 gap-4">
          <div>
            © {currentYear} ThermoVault Systems Private Limited. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <span className="font-mono">Version 1.0 — Pune</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
