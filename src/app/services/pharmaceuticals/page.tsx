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
  ChevronRight,
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

  // Interactive Challenges Diagnostics state
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState(0);
  const [hoveredChallengeIdx, setHoveredChallengeIdx] = useState<number | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleChallengeMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredChallengeIdx(idx);
  };

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
      severity: "95% (Critical)",
      code: "ERR-TEMP-DEV",
      guideline: "WHO GDP Annex 9 - Strict thermal validation and continuous logging required.",
      mitigation: "Dual-redundant cooling loops with auto-changeover PLC controls and real-time IoT alerts."
    },
    {
      title: "High Compliance Standards",
      desc: "Strict regulatory requirements need validated and reliable storage systems.",
      icon: ShieldCheck,
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-500",
      borderColor: "hover:border-blue-500/30",
      severity: "90% (High)",
      code: "REG-FDA-GDP",
      guideline: "US FDA 21 CFR Part 11 - Electronic records and audit trail compliance.",
      mitigation: "Calibrated multi-point temperature mapping (IQ/OQ/PQ) and tamper-proof storage backups."
    },
    {
      title: "Product Sensitivity",
      desc: "Vaccines, biologics and APIs require precise temperature control.",
      icon: Pill,
      color: "from-orange-500/20 to-orange-600/5",
      iconColor: "text-orange-500",
      borderColor: "hover:border-orange-500/30",
      severity: "88% (High)",
      code: "MED-SENS-ACT",
      guideline: "WHO TRS 961 Annex 9 - Active biological products must maintain narrow band storage.",
      mitigation: "Continuous high-resolution temperature logger probe calibration down to ±0.1°C precision."
    },
    {
      title: "Power Interruptions",
      desc: "Power cuts can lead to temperature rise and product losses.",
      icon: Battery,
      color: "from-purple-500/20 to-purple-600/5",
      iconColor: "text-purple-500",
      borderColor: "hover:border-purple-500/30",
      severity: "95% (Critical)",
      code: "PWR-LOSS-ERR",
      guideline: "Good Distribution Practices - Back-up power source must protect full cold store load.",
      mitigation: "Integrated diesel generator relay triggers and automated phase failure warning alerts."
    },
    {
      title: "Traceability & Monitoring",
      desc: "Lack of real-time monitoring leads to compliance and quality issues.",
      icon: Network,
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-500",
      borderColor: "hover:border-blue-500/30",
      severity: "80% (Medium-High)",
      code: "SYS-DATA-TRK",
      guideline: "EU GMP Annex 11 - Software logging and system verification required.",
      mitigation: "Cloud-connected IoT gateway providing continuous telemetry streaming and alert notifications."
    },
    {
      title: "Cross Contamination",
      desc: "Improper storage can cause contamination and product recalls.",
      icon: ShieldAlert,
      color: "from-yellow-500/20 to-yellow-600/5",
      iconColor: "text-yellow-500",
      borderColor: "hover:border-yellow-500/30",
      severity: "82% (Medium-High)",
      code: "AIR-CONTAM-EX",
      guideline: "ISO Class Clean Room standards - Particle and humidity control gradients.",
      mitigation: "Positive pressure cascade airlocks, SS 304 anti-microbial panels, and magnetic door seals."
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
      <section className="relative bg-[#0C2340] text-white pt-16 pb-24 overflow-hidden min-h-[620px] flex items-center">
        {/* Engineering Blueprint Grid Background Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none z-0" 
          style={{
            backgroundImage: `
              radial-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px, 40px 40px, 40px 40px"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0C2340] via-[#0E2F56]/90 to-[#0A1A30]/95 z-0" />
        
        {/* Soft glowing ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>&gt;</span>
            <span className="text-blue-400">Pharmaceuticals</span>
          </div>

          {/* Immersive 3-Column Split-Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Text Sheet (col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Category tag */}
              <div className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/25 px-4 py-2 text-xs font-bold text-blue-400 font-mono w-fit">
                <Pill className="h-4 w-4 text-blue-400 shrink-0 animate-pulse" />
                <span>PHARMACEUTICAL COLD STORAGE</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.12]">
                Reliable Cold Storage for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 font-display">
                  Pharmaceutical Products
                </span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
                We provide GDP compliant temperature controlled storage solutions to preserve efficacy, 
                safety and quality of vaccines, biologics and active pharmaceutical ingredients.
              </p>

              {/* Temp Pills (Premium Capsule Design) */}
              <div className="flex flex-wrap gap-4 pt-1">
                <div className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-950/50 via-[#0A1A30]/50 to-blue-900/30 border border-blue-500/30 px-4 py-2 text-xs font-bold font-mono text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-md hover:border-blue-400/50 transition-all select-none">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[10px] shadow-[0_0_8px_rgba(59,130,246,0.4)] animate-pulse shrink-0">❄</span>
                  <span>Cold Chain: <strong className="text-white font-extrabold tracking-wide">+2°C to +8°C</strong></span>
                </div>
                <div className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-950/50 via-[#0A1A30]/50 to-cyan-900/30 border border-cyan-500/30 px-4 py-2 text-xs font-bold font-mono text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-md hover:border-cyan-400/50 transition-all select-none">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] shadow-[0_0_8px_rgba(34,211,238,0.4)] animate-pulse shrink-0">❄</span>
                  <span>Frozen: <strong className="text-white font-extrabold tracking-wide">-15°C to -25°C</strong></span>
                </div>
              </div>

              {/* Better CTA Positioning: Scroll to Consultation */}
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById("sizing-form-card");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-xs font-bold text-white shadow-lg active:scale-[0.98] transition-all font-display"
                >
                  <span>Request Sizing Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Mini Features row */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-4 border-t border-white/5 text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>GDP Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-500" />
                  <span>IoT Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-500" />
                  <span>Redundant Cooling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>sterile design</span>
                </div>
              </div>
            </div>

            {/* Center Column: Premium CAD Blueprint & Product Visualizer (col-span-3) */}
            <div className="lg:col-span-3 hidden lg:flex justify-center relative">
              <div className="absolute inset-0 bg-blue-500/5 blur-[80px] pointer-events-none z-0" />
              
              {/* Technical Drawing Framer */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-[240px] aspect-[4/5] rounded-2xl border border-blue-500/20 bg-white/2 p-2 shadow-2xl backdrop-blur-sm overflow-hidden group select-none"
              >
                {/* Laser scan line anim */}
                <div 
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.5)] z-20 pointer-events-none"
                  style={{
                    animation: "scan 3.5s linear infinite",
                  }}
                />
                
                {/* CAD Border Elements */}
                <div className="absolute top-2 left-2 text-[8px] font-mono text-blue-400/40 font-bold">SCALE: 1:25</div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-blue-400/40 font-bold">TV-PH-2026</div>

                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A1A30]">
                  <Image
                    src="/images/pharma_hero_bg.png"
                    alt="HD Pharmaceuticals Cold Room Visualization"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="25vw"
                    priority
                  />
                  {/* Subtle bluish radial shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30]/60 via-transparent to-transparent z-10" />
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sizing Consultation Form (col-span-4) */}
            <div id="sizing-form-card" className="lg:col-span-4 relative scroll-mt-24">
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
                    className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 text-center space-y-4 py-10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/15 text-blue-400 mx-auto">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white font-display">Callback Request Received</h4>
                      <p className="text-xs text-slate-300 leading-relaxed px-2">
                        Thanks <strong className="text-white">{name}</strong>. Our cold chain draftsman will contact you within 12–24 hours.
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
                        className="w-full rounded-xl bg-slate-950/50 border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body"
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
                        className="w-full rounded-xl bg-slate-950/50 border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold font-mono uppercase tracking-wider block mb-1">Business / Organization</label>
                      <input
                        type="text"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder="e.g. ABC Pharma Pvt. Ltd."
                        className="w-full rounded-xl bg-slate-950/50 border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-blue-400 font-semibold font-mono py-1">
                      <Clock className="h-3.5 w-3.5 animate-pulse" />
                      <span>Response within 12–24 Hours</span>
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
                        <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
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

          {/* Interactive Failure Matrix Dashboard Redesign */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden text-slate-800">
            <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />
            
            {/* Left Column: Challenge Selector Tabs (col-span-5) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider mb-2 pl-3">
                Detected Spoilage Risks
              </div>
              
              <div className="space-y-2.5">
                {challenges.map((chal, idx) => {
                  const Icon = chal.icon;
                  const isSelected = selectedChallengeIdx === idx;
                  const isHovered = hoveredChallengeIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedChallengeIdx(idx)}
                      onMouseMove={(e) => handleChallengeMouseMove(e, idx)}
                      onMouseLeave={() => setHoveredChallengeIdx(null)}
                      className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex items-center justify-between group overflow-hidden ${
                        isSelected 
                          ? "bg-[#0C2340] border-[#0c2340] text-white shadow-lg"
                          : "bg-white border-slate-200/60 text-slate-700 hover:border-blue-300/60 shadow-sm"
                      }`}
                    >
                      {/* Spotlight Glow Effect */}
                      {isHovered && !isSelected && (
                        <div 
                          className="absolute inset-0 pointer-events-none opacity-45 transition-opacity duration-300 bg-[radial-gradient(200px_circle_at_var(--x)_var(--y),rgba(59,130,246,0.12),transparent_80%)]"
                          style={{
                            // @ts-ignore
                            "--x": `${mouseCoords.x}px`,
                            "--y": `${mouseCoords.y}px`
                          }}
                        />
                      )}

                      <div className="flex items-center gap-3.5 z-10">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                          isSelected 
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                            : "bg-blue-50 text-blue-600"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xs font-extrabold font-display tracking-wide">
                            {chal.title}
                          </h3>
                          <span className={`text-[8px] font-bold font-mono uppercase tracking-wider block mt-0.5 ${
                            isSelected ? "text-blue-300" : "text-slate-400"
                          }`}>
                            {chal.code}
                          </span>
                        </div>
                      </div>

                      {/* Blinking Warning Node */}
                      <div className="flex items-center gap-2 z-10">
                        <span className={`h-2 w-2 rounded-full ${
                          isSelected ? "bg-red-400 animate-pulse" : "bg-red-500"
                        }`} />
                        <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${
                          isSelected ? "translate-x-1 text-white" : "text-slate-400 group-hover:text-blue-600"
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive Diagnostic Terminal (col-span-7) */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200/60 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-inner min-h-[410px] relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6">
                {/* Diagnostic title */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-500 text-[10px] font-extrabold animate-pulse">!</span>
                    <h3 className="text-sm font-extrabold text-[#0c2340] font-display">Risk Analysis: {challenges[selectedChallengeIdx].title}</h3>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded uppercase tracking-wider">
                    Severity: {challenges[selectedChallengeIdx].severity}
                  </span>
                </div>

                <div className="space-y-4 text-left">
                  {/* Issue description */}
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider block">Bio-Hazard / Risk</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-body">
                      {challenges[selectedChallengeIdx].desc} In extreme cases, thermal deviations trigger complete batch write-offs, compliance auditable violations, and safety compromise.
                    </p>
                  </div>

                  {/* WHO FDA Guideline */}
                  <div className="rounded-xl bg-slate-50 border border-slate-200/50 p-4 space-y-1.5 font-mono text-[9px] text-slate-500 leading-relaxed shadow-sm">
                    <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block">Regulatory Protocol</span>
                    <div>{challenges[selectedChallengeIdx].guideline}</div>
                  </div>
                </div>
              </div>

              {/* Mitigation block */}
              <div className="pt-6 border-t border-slate-100 mt-6 space-y-3.5 text-left">
                <span className="text-[8px] font-bold text-blue-600 font-mono uppercase tracking-wider block">ThermoVault Mitigation Solution</span>
                
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  <div className="flex-1 rounded-xl bg-blue-500/5 border border-blue-500/10 p-4 flex gap-3 items-center">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0c2340] font-display">Active Engineering Safeguard</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{challenges[selectedChallengeIdx].mitigation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">WHO-GDP</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Compliance Standard</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">100%</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">IQ/OQ Validation</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">24/7</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Real-time Telemetry</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">Zero</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Temp Excursions</div>
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
