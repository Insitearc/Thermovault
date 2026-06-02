"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Terminal,
  ChevronDown,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  q: string;
  a: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bizType: "Farmer / FPO",
    size: "Small (Below 10 MT)",
    notes: "",
  });
  const [formSent, setFormSent] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "What is the minimum cold room size you install?",
      a: "Our standard modular enclosures start from 8' x 8' x 8' (approx. 3 MT storage capacity). We can customize panel dimensions for smaller laboratory clean spaces as well.",
    },
    {
      q: "How long does the installation process take?",
      a: "Standard walk-in chambers are assembled in 7 to 10 working days once the civil level floor is ready. Large multi-chamber cold storage warehouses take 3 to 5 weeks.",
    },
    {
      q: "Do you provide AMC services outside Maharashtra?",
      a: "Yes, we support active installations across adjacent states with dedicated service engineers. We also provide remote telemetry diagnostics for real-time monitoring.",
    },
    {
      q: "Can I apply for government subsidies on my project?",
      a: "Yes. ThermoVault structures are engineered to meet NHB (National Horticulture Mission) and NABARD criteria, qualifying for back-ended capital subsidies up to 35%.",
    },
    {
      q: "What refrigerant gases do your condensing plants use?",
      a: "We design plants using eco-compliant, non-ozone depleting refrigerants such as R404A, R134a, and R448A to ensure optimal cooling performance and compliance.",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setFormSent(true);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Navbar />

      {/* Hero Header with image background */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 text-white overflow-hidden"
        style={{ backgroundImage: "url('/images/hero_background.png')" }}
      >
        {/* Dark Navy Tint Overlay */}
        <div className="absolute inset-0 bg-[#0C2340]/80" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 z-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider text-teal-light font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-slate-300">Contact Us</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            Contact <span className="text-blue-400">Sizing Engineers</span>
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-200/90 leading-relaxed">
            Get in touch for custom heat load calculations, panel drawings, or
            subsidy eligibility audits.
          </p>
        </div>
      </section>

      {/* Contact Form & Office Coordinates split grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact details & Map card */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
                OFFICE INFORMATION
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#0c2340] font-display">
                Headquarters (Pune)
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                      At post Kadadhe Colony Rajgurunagar, Pune
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600 shrink-0" />
                  <a
                    href="tel:+918055010620"
                    className="hover:text-blue-600 transition-colors"
                  >
                    +91 80550 10620
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                  <a
                    href="mailto:info@thermovaultsystems.com"
                    className="hover:text-blue-600 transition-colors"
                  >
                    info@thermovaultsystems.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600 shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 7:00 PM | Sun: Closed</span>
                </div>
              </div>

              {/* Mock active coordinates Pune MIDC map grid visualizer */}
              <div className="rounded-2xl border border-slate-100 bg-[#0C2340] p-6 relative overflow-hidden h-56 sm:h-64 lg:h-48 flex items-center justify-center text-white shadow-md">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:12px_12px] opacity-45 pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,158,117,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

                <div className="relative z-10 h-full w-full">
                  <iframe
                    title="ThermoVault Rajgurunagar Location"
                    src="https://www.google.com/maps?q=At%20post%20Kadadhe%20Colony%20Rajgurunagar%2C%20Pune&output=embed"
                    className="absolute inset-0 w-full h-full rounded-2xl border-0 pointer-events-auto z-10"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <div className="absolute top-3 left-3 z-20 pointer-events-none bg-black/30 text-white rounded-md px-3 py-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider font-mono">
                      <Terminal className="h-4 w-4 text-white" />
                      <span>Pune Rajgurunagar Map</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Sizing Form */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-md">
              <h3 className="text-sm font-bold text-[#0c2340] mb-2 font-display">
                Schedule Sizing Call
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Fill out the technical parameters below and our designer will
                callback.
              </p>

              {formSent ? (
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-8 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-blue-600 mx-auto" />
                  <h4 className="text-xs font-bold text-[#0c2340]">
                    Consultation Form Submitted
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Thank you. Sizing engineers will contact you at your
                    convenience.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] text-slate-500 font-mono block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Kuldeep"
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-500 font-mono block mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. +91 80550 10620"
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] text-slate-500 font-mono block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. info@thermovaultsystems.com"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] text-slate-500 font-mono block mb-1">
                        Application Sector
                      </label>
                      <select
                        value={formData.bizType}
                        onChange={(e) =>
                          setFormData({ ...formData, bizType: e.target.value })
                        }
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      >
                        <option value="Farmer / FPO">Farmer / FPO</option>
                        <option value="Dairy Processing">
                          Dairy Processing
                        </option>
                        <option value="Pharma Vaccine Storage">
                          Pharma Vaccine Storage
                        </option>
                        <option value="Cold Warehouse">Cold Warehouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-500 font-mono block mb-1">
                        Room Capacity
                      </label>
                      <select
                        value={formData.size}
                        onChange={(e) =>
                          setFormData({ ...formData, size: e.target.value })
                        }
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      >
                        <option value="Small (Below 10 MT)">
                          Small (Below 10 MT)
                        </option>
                        <option value="Medium (10 - 50 MT)">
                          Medium (10 - 50 MT)
                        </option>
                        <option value="Large (Above 50 MT)">
                          Large (Above 50 MT)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] text-slate-500 font-mono block mb-1">
                      Chamber Sizing Requirements
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Target temperatures, structural bounds, or subsidy assistance notes..."
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all h-16 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-3.5 text-xs font-semibold text-white hover:bg-blue-500 transition-all active:scale-[0.98] shadow-sm hover:shadow"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Sizing Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              FAQ
            </span>
            <h2 className="text-2xl font-bold text-[#0c2340] font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500">
              Read quick engineering solutions to common cold room installation
              queries.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className={`w-full flex items-center justify-between p-5 text-left text-xs font-bold transition-colors font-display ${
                      isOpen
                        ? "text-blue-600 bg-slate-50/50"
                        : "text-[#0c2340] hover:bg-slate-50/30"
                    }`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 border-t border-slate-100 text-xs text-slate-500 leading-relaxed bg-white">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
