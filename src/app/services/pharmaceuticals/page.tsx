"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Snowflake,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronLeft,
  Thermometer,
  Send,
  CheckCircle2,
  Droplet,
  Flame,
  Settings,
  Grid,
  TrendingUp,
  Clock,
  MessageSquare,
  AlertTriangle,
  Battery,
  ShieldAlert,
  Award,
  Network,
  Wrench,
  HeartHandshake,
  CheckSquare,
  Sparkles,
  Phone,
  Ruler,
  Factory,
  ChevronDown,
  Pill,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PharmaServicesPage() {
  const router = useRouter();

  // Consultation form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [formSent, setFormSent] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const challenges = [
    {
      title: "Temperature Excursions",
      desc: "Even minor deviations can compromise drug efficacy and safety.",
      icon: Thermometer,
      color: "from-red-500/20 to-red-600/5",
      iconColor: "text-red-500",
      borderColor: "hover:border-red-500/30",
    },
    {
      title: "High Compliance Standards",
      desc: "Strict regulatory requirements need validated and reliable storage systems.",
      icon: ShieldCheck,
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-500",
      borderColor: "hover:border-blue-500/30",
    },
    {
      title: "Product Sensitivity",
      desc: "Vaccines, biologics and APIs require precise temperature control.",
      icon: Pill,
      color: "from-orange-500/20 to-orange-600/5",
      iconColor: "text-orange-500",
      borderColor: "hover:border-orange-500/30",
    },
    {
      title: "Power Interruptions",
      desc: "Power cuts can lead to temperature rise and product losses.",
      icon: Battery,
      color: "from-purple-500/20 to-purple-600/5",
      iconColor: "text-purple-500",
      borderColor: "hover:border-purple-500/30",
    },
    {
      title: "Traceability & Monitoring",
      desc: "Lack of real-time monitoring leads to compliance and quality issues.",
      icon: Network,
      color: "from-emerald-500/20 to-emerald-600/5",
      iconColor: "text-emerald-500",
      borderColor: "hover:border-emerald-500/30",
    },
    {
      title: "Cross Contamination",
      desc: "Improper storage can cause contamination and product recalls.",
      icon: AlertTriangle,
      color: "from-yellow-500/20 to-yellow-600/5",
      iconColor: "text-yellow-500",
      borderColor: "hover:border-yellow-500/30",
    },
  ];

  const valueProps = [
    {
      title: "GMP Compliant Design",
      desc: "Built to meet cGMP and regulatory standards.",
      icon: ShieldCheck,
    },
    {
      title: "Precision Temperature",
      desc: "Maintains strict temperature stability for sensitive pharmaceuticals.",
      icon: Thermometer,
    },
    {
      title: "Validation Ready",
      desc: "IQ/OQ ready systems for regulated environments.",
      icon: CheckSquare,
    },
    {
      title: "Reliable After Sales Support",
      desc: "AMC & 24/7 support for uninterrupted operations.",
      icon: HeartHandshake,
    },
    {
      title: "Subsidy Assistance",
      desc: "End-to-end support for government subsidy schemes.",
      icon: Award,
    },
  ];

  const tempGuide = [
    { product: "Vaccines", temp: "+2°C to +8°C" },
    { product: "Biologics", temp: "+2°C to +8°C" },
    { product: "Pharmaceuticals", temp: "+2°C to +8°C" },
    { product: "APIs (Active Ingredients)", temp: "+15°C to +25°C" },
    { product: "Blood & Plasma Products", temp: "-25°C to -15°C" },
    { product: "Reagents & Kits", temp: "+2°C to +8°C" },
  ];

  const installations = [
    {
      title: "Pharma Cold Room",
      image: "/images/industry_pharma.png",
    },
    {
      title: "Vaccine Storage Room",
      image: "/images/cold_room_modular.png",
    },
    {
      title: "Blood Plasma Storage",
      image: "/images/cold_room_unit.png",
    },
    {
      title: "API Storage Room",
      image: "/images/cold_room_door.png",
    },
  ];

  const faqs = [
    {
      q: "What is the ideal temperature for pharmaceutical storage?",
      a: "Most medical and vaccine storage requires a narrow band of +2°C to +8°C (Cold Chain). Specialized biological items and blood plasma are frozen at -15°C to -25°C, while controlled room temperature (CRT) APIs are held between +15°C and +25°C.",
    },
    {
      q: "Do you provide temperature validation for cold rooms?",
      a: "Yes. Every pharmaceutical cold storage unit is supplied with full Installation Qualification and Operational Qualification (IQ/OQ) protocols. We run multi-point temperature mapping to ensure absolute compliance with WHO and local FDA standards.",
    },
    {
      q: "Is remote monitoring available for pharma cold rooms?",
      a: "Yes, fully compliant with FDA 21 CFR Part 11 protocols. We integrate high-precision temperature logging, continuous data logging, and SMS/Email alarms linked to our IoT gateway for continuous audit trails.",
    },
    {
      q: "Can your cold rooms meet WHO / GDP guidelines?",
      a: "Yes, our designs strictly follow Good Distribution Practices (GDP) and World Health Organization (WHO) cold storage specifications, utilizing redundant cooling circuits and automated changeover grids.",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white text-slate-800 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#0C2340] text-white pt-10 pb-20 overflow-hidden min-h-[580px] flex items-center">
        {/* Cyber-grid background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] opacity-40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0C2340] via-[#0E2F56] to-[#0A1A30] opacity-90 z-0" />
        
        {/* Background Visual */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 opacity-25 lg:opacity-35 pointer-events-none z-0">
          <Image
            src="/images/pharma_hero_bg.png"
            alt="Pharmaceutical cold storage background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2340] via-[#0C2340]/60 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>&gt;</span>
            <span className="text-blue-400">Pharmaceuticals</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side info sheet */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category tag */}
              <div className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/25 px-4 py-2 text-xs font-bold text-blue-400 font-mono">
                <Pill className="h-4 w-4 text-blue-400 shrink-0" />
                <span>PHARMACEUTICAL COLD STORAGE</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.15]">
                Temperature Control. <br />
                Product Integrity. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 font-display">
                  Patient Safety.
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-body">
                Advanced cold storage solutions for pharmaceuticals and life sciences that 
                ensure compliance, quality and efficacy across the entire supply chain.
              </p>

              {/* Temp Pills */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2.5 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-xs sm:text-sm font-semibold font-mono text-blue-300">
                  <Thermometer className="h-4.5 w-4.5 text-blue-400" />
                  <span>Temperature Range: <strong className="text-white">+2°C to +8°C</strong></span>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-xs sm:text-sm font-semibold font-mono text-cyan-300">
                  <Snowflake className="h-4.5 w-4.5 text-cyan-400" />
                  <span>Frozen Storage: <strong className="text-white">-25°C to -15°C</strong></span>
                </div>
              </div>

              {/* Badges strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-[11px] font-bold text-slate-200 uppercase tracking-wider font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm">
                    <Zap className="h-3.5 w-3.5" />
                  </div>
                  <span>Energy Efficient</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm">
                    <Network className="h-3.5 w-3.5" />
                  </div>
                  <span>IoT Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm">
                    <Zap className="h-3.5 w-3.5" />
                  </div>
                  <span>Fast Installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <span>Hygienic Design</span>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-lg" />
              
              <div className="relative rounded-2xl border border-white/10 bg-[#0C2340]/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Phone className="h-4.5 w-4.5" />
                  <h3 className="text-base font-extrabold text-white font-display">Sizing Consultation</h3>
                </div>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  Need engineering calculations or CAD layout blueprints for this specific utility? Request a call.
                </p>

                {formSent ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center space-y-4 py-10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 mx-auto">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white font-display">Callback Request Received</h4>
                      <p className="text-xs text-slate-300 leading-relaxed px-2">
                        Thanks <strong className="text-white">{name}</strong>. Our cold chain draftsman will contact you within 30 minutes.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold font-mono uppercase tracking-wider block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kuldeep"
                        className="w-full rounded-xl bg-[#0c2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body"
                      />
                    </div>
                    
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold font-mono uppercase tracking-wider block mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 80550 10620"
                        className="w-full rounded-xl bg-[#0c2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold font-mono uppercase tracking-wider block mb-1">Business / Organization</label>
                      <input
                        type="text"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder="e.g. ABC Pharma Pvt. Ltd."
                        className="w-full rounded-xl bg-[#0c2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold font-mono py-1">
                      <Clock className="h-3.5 w-3.5 animate-pulse" />
                      <span>Response within 30 mins</span>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white shadow-lg active:scale-[0.98] transition-all font-display"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Talk to Cold Chain Expert</span>
                      </button>

                      <a
                        href="https://wa.me/918055010620?text=Hi,%20I'm%20interested%20in%20Pharmaceutical%20Cold%20Storage%20Solutions.%20Please%20connect%20me%20with%20an%20expert."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 py-3.5 text-xs font-bold text-white transition-all active:scale-[0.98] font-display"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Value Props Bar */}
      <section className="bg-slate-50 border-y border-slate-100 py-10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 divide-y md:divide-y-0 lg:divide-x lg:divide-slate-200">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-start space-y-2.5 ${idx > 0 ? "pt-6 md:pt-0 lg:pl-6" : ""}`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-[#0c2340] font-display">
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-body">
                      {prop.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-1/3 right-0 w-72 h-72 cyber-grid opacity-[0.03] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
              DIFFICULTIES IN PHARMA STORAGE
            </span>
            <h2 className="text-3xl font-extrabold text-[#0c2340] font-display leading-tight">
              Common <span className="text-blue-600">Challenges</span> in Pharmaceutical Cold Storage
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-body">
              Medicines and biological products require precise temperature controls. Even minor shifts can compromise active compounds, calling for absolute engineering security.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((chal, idx) => {
              const Icon = chal.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ 
                    y: -6,
                    boxShadow: "0 20px 25px -5px rgba(24, 95, 165, 0.08), 0 10px 10px -5px rgba(24, 95, 165, 0.03)"
                  }}
                  className={`group rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 flex flex-col justify-between ${chal.borderColor}`}
                >
                  <div className="space-y-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${chal.color} ${chal.iconColor} border border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-extrabold text-[#0c2340] font-display">
                        {chal.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-body">
                        {chal.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 mt-6 flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-wider font-mono">
                    <span>Mitigation ready</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Layout */}
      <section className="py-24 bg-[#0C2340] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:20px_20px] opacity-40 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[160px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono block">
              OUR ENGINEERING
            </span>
            <h2 className="text-3xl font-extrabold font-display leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-display">Pharmaceutical</span> Cold Storage Solutions
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-body">
              How ThermoVault delivers elite technical stability and extreme performance for critical biological and life science products.
            </p>
          </div>

          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (3 features) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Feature 1 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Grid className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Modular Cold Rooms</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Custom-built cold rooms for vaccines, medicines, APIs and biologicals.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Thermometer className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Precise Temperature Control</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Advanced systems ensure uniform temperature with minimal variation.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">SS Hygienic Interiors</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  SS 304 food & pharma grade interiors for sterile and corrosion-free storage.
                </p>
              </div>
            </div>

            {/* Center Image */}
            <div className="lg:col-span-4 flex justify-center relative py-6">
              <div className="absolute inset-0 m-auto w-64 sm:w-80 h-64 sm:h-80 rounded-full border border-blue-500/10 shadow-neon-blue animate-pulse" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-64 sm:w-80 h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A1A30]"
              >
                <Image
                  src="/images/cold_room_unit.png"
                  alt="Modular Cold Storage Unit"
                  fill
                  className="object-cover p-2 rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </motion.div>
            </div>

            {/* Right Column (3 features) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Feature 4 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Network className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">IoT Monitoring & Alerts</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Real-time monitoring with instant alerts for temperature & humidity deviations.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <CheckSquare className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Data Logging & Compliance</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Automated data logging for audit trails and regulatory compliance.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Battery className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Backup Power & Safety</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Redundant systems and alarms ensure continuous protection of your products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide & Installations Grid */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Storage Temp Guide Table */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
                  TECHNICAL METRICS
                </span>
                <h3 className="text-2xl font-extrabold text-[#0c2340] font-display">
                  Recommended Storage Temperature Guide
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                      <th className="p-4 pl-6 font-bold">Product Type</th>
                      <th className="p-4 pr-6 font-bold text-right">Ideal Temperature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-body text-slate-700">
                    {tempGuide.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors font-medium">
                        <td className="p-4 pl-6 flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Droplet className="h-3 w-3" />
                          </div>
                          <span>{item.product}</span>
                        </td>
                        <td className="p-4 pr-6 text-right font-mono text-blue-600 font-bold">
                          {item.temp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side: Showcase Installations */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
                    PROJECT PORTFOLIO
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0c2340] font-display">
                    Our Pharmaceutical Installations
                  </h3>
                </div>
                <Link 
                  href="/projects" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors uppercase tracking-wider font-mono shrink-0 mb-1"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* 4-Image Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {installations.map((inst, index) => (
                  <div 
                    key={index}
                    className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-slate-50">
                      <Image
                        src={inst.image}
                        alt={inst.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <div className="p-4 flex-1 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0c2340] font-display group-hover:text-blue-600 transition-colors text-ellipsis overflow-hidden whitespace-nowrap">
                        {inst.title}
                      </span>
                      <div className="h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Counter badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-center font-mono">
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">500+</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Projects Delivered</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">15+ Years</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Of Experience</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">24/7</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Service Support</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">Pan India</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Service Network</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
              HAVE QUESTIONS?
            </span>
            <h3 className="text-2xl font-extrabold text-[#0c2340] font-display">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#0c2340] font-display transition-colors hover:text-blue-600">
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-blue-600 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs text-slate-500 leading-relaxed font-body border-t border-slate-50 pt-4">
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

      {/* Bottom CTA Intake */}
      <section className="py-20 bg-[#0C2340] text-white border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:24px_24px] opacity-40 z-0" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          
          <div className="rounded-2xl border border-white/10 bg-[#0A1A30]/60 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-2xl font-extrabold font-display">
                Build a Compliant & Reliable Cold Chain <br className="hidden sm:inline" />
                for Pharmaceuticals
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-body leading-relaxed">
                Talk to our experts for custom cold storage solutions designed for pharma excellence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-xl bg-blue-600 hover:bg-blue-500 px-8 py-4 text-xs font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all text-center"
              >
                Talk to Expert
              </button>
              <a
                href="https://wa.me/918055010620?text=Hi,%20I'm%20interested%20in%20Pharmaceutical%20Cold%20Storage%20Solutions.%20Please%20connect%20me%20with%20an%20expert."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-8 py-4 text-xs font-bold text-center transition-all active:scale-[0.98]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Mini Badges Footer */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider border-t border-white/5 pt-8">
            <div className="flex items-center justify-center gap-1.5">
              <Network className="h-3.5 w-3.5 text-blue-400" />
              <span>IoT Monitoring Ready</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-blue-400" />
              <span>Energy Efficient Design</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-blue-400" />
              <span>Fast & Hassle-free</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>GMP Compliant</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 col-span-2 md:col-span-1">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>Built for Performance</span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
