"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  TrendingUp,
  Snowflake,
  ShieldAlert,
  CheckCircle2,
  Users,
  Compass,
  ArrowUpRight,
  Settings,
  PhoneCall,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  Thermometer,
  Zap,
  Activity,
  FlameKindling,
  Cpu,
  FileSpreadsheet,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [contactFormSent, setContactFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bizType: "Farmer / FPO",
    roomSize: "Small (Below 10 MT)",
    msg: "",
  });

  const services = [
    { title: "Modular Cold Rooms", image: "/images/cold_room_unit.png", slug: "modular-cold-rooms" },
    { title: "Refrigeration Systems", image: "/images/compressors.png", slug: "refrigeration-systems" },
    { title: "Display Cold Rooms", image: "/images/hero_background.png", slug: "display-cold-rooms" },
    { title: "Fruits Ripening Chambers", image: "/images/cold_room_unit.png", slug: "ripening-chambers" },
    { title: "Blast Chillers", image: "/images/compressors.png", slug: "blast-chillers" },
    { title: "AMC & Maintenance", image: "/images/technician.png", slug: "amc" },
  ];

  const usps = [
    { title: "Advanced Technology", desc: "Modern equipment for maximum performance." },
    { title: "Custom Engineering", desc: "Solutions designed as per your business needs." },
    { title: "Quality Assured", desc: "Premium materials and strict quality standards." },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setContactFormSent(true);
    setFormData({ name: "", phone: "", email: "", bizType: "Farmer / FPO", roomSize: "Small (Below 10 MT)", msg: "" });
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Navbar />

      {/* Hero Banner with image background */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-28 md:py-36 text-white overflow-hidden"
        style={{ backgroundImage: "url('/images/hero_background.png')" }}
      >
        {/* Dark Navy Tint Overlay */}
        <div className="absolute inset-0 bg-[#0C2340]/75" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold tracking-widest text-slate-300 font-mono uppercase"
          >
            ENGINEERED FOR PERFORMANCE. BUILT FOR RELIABILITY.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display leading-[1.1] max-w-3xl"
          >
            Advanced Cold Chain &<br />
            <span className="text-blue-400">Refrigeration Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-xs sm:text-sm text-slate-200/90 leading-relaxed"
          >
            We design, build and maintain reliable cold storage systems that preserve quality, reduce loss and power your growth.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              onClick={() => {
                const event = new CustomEvent("open-quote-modal");
                window.dispatchEvent(event);
              }}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-blue-500 shadow-md hover:shadow-lg active:scale-95"
            >
              Get Free Consultation
            </button>

            <Link
              href="/dashboard"
              className="rounded-md bg-[#0c2340] border border-white/10 px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-[#15345a] hover:border-white/20"
            >
              3D IoT Dashboard Demo
            </Link>
          </motion.div>

          {/* Trusted ribbon */}
          <div className="pt-8 border-t border-white/10 mt-12 max-w-4xl">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-3">
              TRUSTED BY BUSINESSES ACROSS INDIA
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Food Processing</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Dairy</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Pharma</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Fruits & Veg</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Seafood</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Retail</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating White Features Box Ribbon overlapping the Hero */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-10">
        <div className="rounded-xl bg-white border border-slate-100 p-6 md:p-8 shadow-xl grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { icon: Thermometer, label: "PRECISE TEMPERATURE CONTROL" },
            { icon: Zap, label: "ENERGY EFFICIENT SYSTEMS" },
            { icon: ShieldAlert, label: "DURABLE & HYGIENIC DESIGN" },
            { icon: FileSpreadsheet, label: "GOVERNMENT SUBSIDY SUPPORT" },
            { icon: Activity, label: "RELIABLE AFTER SALES SERVICE" },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center gap-3 p-2 border-r border-slate-100 last:border-0 md:border-r"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[9px] font-bold text-[#0c2340] tracking-wider leading-relaxed uppercase">
                  {feat.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* About ThermoVault Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story text */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                ABOUT THERMOVAULT SYSTEMS
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#0c2340] font-display">
                Securing the Cold Chain <span className="text-blue-600">Ecosystem</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                ThermoVault Systems delivers end-to-end cold chain and refrigeration solutions tailored for businesses of every size. From modular cold rooms to complete industrial refrigeration systems – we ensure quality, efficiency and long-term reliability.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                  <span>Engineering Excellence</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                  <span>Custom-Built Solutions</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                  <span>Pan India Service</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="rounded-md border border-[#0c2340] px-5 py-2.5 text-xs font-bold text-[#0c2340] hover:bg-[#0c2340] hover:text-white transition-all inline-flex items-center gap-2"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Photo on the right */}
            <div className="relative h-[320px] rounded-2xl overflow-hidden border border-slate-100 shadow-lg">
              <Image
                src="/images/cold_room_unit.png"
                alt="Modular Cold Room Enclosure"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Cold Chain Solutions (Our Services) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              OUR SOLUTIONS
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0c2340] font-display">
              Comprehensive Cold Chain <span className="text-blue-600">Solutions</span>
            </h2>
          </div>

          {/* Grid of 6 Services with photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <Link
                href={`/services/${svc.slug}`}
                key={idx}
                className="group relative h-64 rounded-2xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-end p-6 hover:shadow-xl hover:border-blue-600/20 transition-all duration-300"
              >
                {/* Background photo */}
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Dark bottom gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600 shadow-md">
                      <Snowflake className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-xs font-bold text-white font-display">
                      {svc.title}
                    </span>
                  </div>
                  <span className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                    <ArrowRight className="h-4.5 w-4.5 text-white" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-10">
            <Link
              href="/services"
              className="rounded-md bg-[#0c2340] px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Dark Navy background) */}
      <section className="py-24 bg-[#0C2340] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left lists */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                WHY CHOOSE US?
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white font-display">
                Built For Performance.<br />
                Designed For <span className="text-blue-400">Trust.</span>
              </h2>

              <div className="space-y-4 pt-4">
                {usps.map((usp, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-display">{usp.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{usp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right outline stats counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/2 p-6 text-center space-y-2">
                <div className="text-3xl font-extrabold text-blue-400 font-mono">200+</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Projects Completed
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/2 p-6 text-center space-y-2">
                <div className="text-3xl font-extrabold text-blue-400 font-mono">100+</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Happy Clients
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/2 p-6 text-center space-y-2">
                <div className="text-3xl font-extrabold text-blue-400 font-mono">15+</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                  States Served
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/2 p-6 text-center space-y-2">
                <div className="text-3xl font-extrabold text-blue-400 font-mono">10+</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Years of Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
