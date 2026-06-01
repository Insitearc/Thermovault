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
  Fish,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SeafoodServicesPage() {
  const router = useRouter();

  // Consultation form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [formSent, setFormSent] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Interactive Diagnostic states
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState(0);
  const [hoveredChallengeIdx, setHoveredChallengeIdx] = useState<number | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleChallengeMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>, idx: number) => {
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
      title: "Cellular Rupture",
      desc: "Standard slow freezing forms needle-like ice crystals, puncturing delicate cellular walls of marine tissues.",
      icon: Snowflake,
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-500",
      borderColor: "hover:border-blue-500/30",
      code: "ERR-CELL-RUPT",
      normalPerformance: "Needle crystals. 45% moisture loss upon defrosting. Spongy, degraded texture.",
      thermovaultMitigation: "Microscopic spherical crystals. 98% cellular moisture retention. Pristine fresh-frozen texture.",
      retentionRate: "98% Retention",
      criticality: "Critical Risk"
    },
    {
      title: "Saline Corrosion",
      desc: "High moisture and salt-water exposure corrode mechanical frames and coil fins in standard storage rooms.",
      icon: ShieldAlert,
      color: "from-red-500/20 to-red-600/5",
      iconColor: "text-red-500",
      borderColor: "hover:border-red-500/30",
      code: "WARN-SALINE-INGR",
      normalPerformance: "Aluminum coils corrode rapidly. Rust marks on sheet borders. Bacterial traps in crevices.",
      thermovaultMitigation: "Marine-grade SS-304 interior sheet cladding. Polyurethane (PUF) insulation. Epoxy coated coils.",
      retentionRate: "100% Protection",
      criticality: "High Warning"
    },
    {
      title: "Rapid Fat Oxidation",
      desc: "Exposure to heat during transfers triggers lipid oxidation in fatty fish (tuna, salmon), causing rancidity.",
      icon: AlertTriangle,
      color: "from-yellow-500/20 to-yellow-600/5",
      iconColor: "text-yellow-500",
      borderColor: "hover:border-yellow-500/30",
      code: "WARN-OXYD-RAPID",
      normalPerformance: "Frequent air infiltration. Discoloration. Loss of premium grade pricing.",
      thermovaultMitigation: "Dual hermetic entry airlocks. Rapid-acting air curtains. Fast temperature recovery below -25°C.",
      retentionRate: "95% Color Retention",
      criticality: "Medium Warning"
    },
    {
      title: "Bacterial Degradation",
      desc: "Highly active enzymes in marine organisms lead to quick decay and severe odor leakage at positive temps.",
      icon: Thermometer,
      color: "from-orange-500/20 to-orange-600/5",
      iconColor: "text-orange-500",
      borderColor: "hover:border-orange-500/30",
      code: "CRIT-BACT-DEGR",
      normalPerformance: "Slow temperature pull-down. High biological load. Short shelf-life (2-3 days).",
      thermovaultMitigation: "Ultra-fast blast chilling from +15°C to 0°C under 60 minutes. Locks enzymatic activity.",
      retentionRate: "99% Bio-Security",
      criticality: "Critical Risk"
    },
  ];

  const valueProps = [
    {
      title: "Customized Engineering",
      desc: "Tailored solutions for seafood businesses of every scale.",
      icon: Ruler,
    },
    {
      title: "Scalable Infrastructure",
      desc: "From small storage rooms to large processing units.",
      icon: Network,
    },
    {
      title: "Precision Temperature",
      desc: "Maintains ideal temperature for maximum shelf life.",
      icon: Thermometer,
    },
    {
      title: "Reliable After Sales Support",
      desc: "AMC & 24/7 support for uninterrupted operations.",
      icon: HeartHandshake,
    },
    {
      title: "Subsidy Guidance",
      desc: "End-to-end support for government subsidy schemes.",
      icon: Award,
    },
  ];

  const tempGuide = [
    { product: "Fresh Fish (Chilled)", temp: "0°C to 2°C" },
    { product: "Prawns (Chilled)", temp: "0°C to 2°C" },
    { product: "Crab / Lobster", temp: "0°C to 2°C" },
    { product: "Frozen Fish", temp: "-18°C" },
    { product: "Frozen Prawns", temp: "-18°C" },
    { product: "Squid / Octopus", temp: "-18°C" },
    { product: "Shellfish / Mussels", temp: "0°C to 2°C" },
  ];

  const installations = [
    {
      title: "Fish Processing Cold Room",
      image: "/images/fish_processing.png",
    },
    {
      title: "Prawn Storage Room",
      image: "/images/prawn_storage.png",
    },
    {
      title: "Blast Freezer Room",
      image: "/images/meat_blast_freezer.png",
    },
    {
      title: "Ice Flake Machine Room",
      image: "/images/ice_flake_machine.png",
    },
  ];

  const faqs = [
    {
      q: "What is the ideal temperature for storing seafood and fish?",
      a: "Fresh seafood should be packed in flake ice and stored between 0°C and 2°C. Frozen seafood must be kept at a steady -18°C to -25°C to preserve cellular texture, flavor, and prevent enzymatic decay.",
    },
    {
      q: "Which insulation is best for seafood cold rooms?",
      a: "Due to the extremely high humidity and corrosive salt-water environment, we recommend 120mm to 150mm high-density PUF panels with SS 304 stainless steel sheets to prevent rust, mold, and maximize structural durability.",
    },
    {
      q: "Do you provide blast freezing solutions?",
      a: "Yes, our high-velocity blast freezing tunnels rapidly lower temperatures to -35°C, ensuring rapid freezing that locks in seafood moisture, preventing structural damage and weight loss.",
    },
    {
      q: "Is remote temperature monitoring available?",
      a: "Absolutely. We integrate cloud-based IoT telemetry with real-time temperature, humidity, and door status sensors. You get instant alerts via SMS, email, and dashboard notifications the moment any parameters drift.",
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
            <span className="text-blue-400">Seafood & Fish</span>
          </div>

          {/* Immersive 3-Column Split-Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Text Sheet (col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Category tag */}
              <div className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/25 px-4 py-2 text-xs font-bold text-blue-400 font-mono w-fit">
                <Fish className="h-4 w-4 text-blue-400 shrink-0 animate-pulse" />
                <span>SEAFOOD & FISH COLD STORAGE</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.12]">
                Reliable Cold Storage for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 font-display">
                  Seafood & Fish Products
                </span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
                We provide high performance temperature controlled storage solutions to preserve freshness, 
                taste and quality of seafood and marine products from catch to processing.
              </p>

              {/* Temp Pills (Premium Capsule Design) */}
              <div className="flex flex-wrap gap-4 pt-1">
                <div className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-950/50 via-[#0A1A30]/50 to-blue-900/30 border border-blue-500/30 px-4 py-2 text-xs font-bold font-mono text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-md hover:border-blue-400/50 transition-all select-none">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[10px] shadow-[0_0_8px_rgba(59,130,246,0.4)] animate-pulse shrink-0">❄</span>
                  <span>Chilled: <strong className="text-white font-extrabold tracking-wide">0°C to 2°C</strong></span>
                </div>
                <div className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-950/50 via-[#0A1A30]/50 to-cyan-900/30 border border-cyan-500/30 px-4 py-2 text-xs font-bold font-mono text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-md hover:border-cyan-400/50 transition-all select-none">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] shadow-[0_0_8px_rgba(34,211,238,0.4)] animate-pulse shrink-0">❄</span>
                  <span>Frozen: <strong className="text-white font-extrabold tracking-wide">-18°C to -25°C</strong></span>
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
                  <span>Energy Efficient</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-500" />
                  <span>IoT Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-500" />
                  <span>Fast Installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Hygienic Design</span>
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
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-blue-400/40 font-bold">TV-SF-2026</div>

                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A1A30]">
                  <Image
                    src="/images/seafood_hero_bg.png"
                    alt="HD Seafood Cold Room Visualization"
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
                        placeholder="e.g. ABC Seafood Pvt. Ltd."
                        className="w-full rounded-xl bg-[#0c2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-blue-400 font-semibold font-mono py-1">
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
                        href="https://wa.me/918055010620?text=Hi,%20I'm%20interested%20in%20Seafood%20and%20Fish%20Cold%20Storage%20Solutions.%20Please%20connect%20me%20with%20an%20expert."
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
              DIFFICULTIES IN SEAFOOD STORAGE
            </span>
            <h2 className="text-3xl font-extrabold text-[#0c2340] font-display leading-tight">
              Common <span className="text-blue-600">Challenges</span> in Seafood & Fish Storage
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-body">
              Seafood products require meticulous humidity management and severe sub-zero environments to avoid freezer burns, bacterial accumulation, or weight degradation.
            </p>
          </div>

          {/* Interactive Diagnostic Tab Panel */}
          <div className="space-y-8 text-slate-800">
            {/* Horizontal Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {challenges.map((chal, idx) => {
                const Icon = chal.icon;
                const isSelected = selectedChallengeIdx === idx;
                const isHovered = hoveredChallengeIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedChallengeIdx(idx)}
                    onMouseMove={(e) => handleChallengeMouseMove(e, idx)}
                    onMouseLeave={() => setHoveredChallengeIdx(null)}
                    className={`relative px-5 py-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 group overflow-hidden ${
                      isSelected 
                        ? "bg-[#0C2340] border-[#0c2340] text-white shadow-lg shadow-blue-900/10"
                        : "bg-slate-50 border-slate-200/60 text-slate-700 hover:border-blue-300 hover:bg-slate-100/50"
                    }`}
                  >
                    {/* Spotlight hover effect */}
                    {isHovered && !isSelected && (
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-45 transition-opacity duration-300 bg-[radial-gradient(150px_circle_at_var(--x)_var(--y),rgba(59,130,246,0.15),transparent_80%)]"
                        style={{
                          // @ts-ignore
                          "--x": `${mouseCoords.x}px`,
                          "--y": `${mouseCoords.y}px`
                        }}
                      />
                    )}
                    
                    <Icon className={`h-4.5 w-4.5 shrink-0 ${isSelected ? "text-blue-400" : "text-slate-500"}`} />
                    <span className="text-xs font-bold font-display tracking-wide">{chal.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic comparison board */}
            <div className="relative rounded-3xl border border-slate-200/60 bg-slate-50 p-6 sm:p-8 overflow-hidden shadow-sm">
              <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Side: Diagnostic Details (col-span-5) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Code & Criticality tag */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] font-bold text-slate-400 bg-white border border-slate-200/80 px-2 py-0.5 rounded uppercase tracking-wider">
                        {challenges[selectedChallengeIdx].code}
                      </span>
                      <span className="font-mono text-[9px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                        {challenges[selectedChallengeIdx].criticality}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#0c2340] font-display text-left">
                      {challenges[selectedChallengeIdx].title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-body text-left">
                      {challenges[selectedChallengeIdx].desc}
                    </p>
                  </div>

                  {/* Retention Rate Stat Badge */}
                  <div className="rounded-2xl bg-white border border-slate-200/60 p-4 flex items-center justify-between shadow-sm">
                    <div className="space-y-0.5 text-left">
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Thermodynamic Quality Lock</span>
                      <span className="text-xs font-extrabold text-[#0c2340] font-display">Freshness Retention</span>
                    </div>
                    <span className="text-xs font-extrabold text-blue-600 font-mono tracking-tight bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl">
                      {challenges[selectedChallengeIdx].retentionRate}
                    </span>
                  </div>
                </div>

                {/* Right Side: Comparative Columns (col-span-7) */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* Standard Column */}
                  <div className="rounded-2xl border border-slate-200/60 bg-white p-5 flex flex-col justify-between shadow-sm text-left">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <div className="h-2 w-2 rounded-full bg-slate-400" />
                        <h4 className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider">Standard Cold Room</h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-body">
                        {challenges[selectedChallengeIdx].normalPerformance}
                      </p>
                    </div>
                    <div className="pt-4 text-[9px] font-mono font-bold text-red-500 bg-red-50/50 border border-red-100/50 rounded-lg p-2.5 mt-6 text-center">
                      High Quality Spoilage Rate
                    </div>
                  </div>

                  {/* ThermoVault Column */}
                  <div className="rounded-2xl border border-blue-500/30 bg-white p-5 flex flex-col justify-between shadow-md relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                        <h4 className="text-xs font-bold text-blue-600 font-display uppercase tracking-wider">ThermoVault Solution</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-body font-medium">
                        {challenges[selectedChallengeIdx].thermovaultMitigation}
                      </p>
                    </div>
                    <div className="pt-4 text-[9px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-lg p-2.5 mt-6 text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                      <span>Certified Quality Preservation</span>
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
              Our Cold Storage <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Solutions</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-body">
              How ThermoVault delivers elite technical stability and extreme performance for critical marine processing and storage hubs.
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
                  Custom-built rooms for fish, prawns, crabs and other seafood products.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Snowflake className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Blast Freezing Systems</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Quickly freeze seafood to lock freshness, texture and nutrition.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">SS Hygienic Interiors</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  SS 304 food-grade interiors for easy cleaning and zero rust.
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
                  Real-time temperature, humidity & system alerts on any device.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Zap className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Energy Efficient Systems</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  High-performance equipment reduces power usage and operational expenses.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Battery className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Backup Power & Safety</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Redundant systems and safety features ensure 24/7 protection for valuable seafood.
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
                      <th className="p-4 pl-6 font-bold">Seafood / Fish</th>
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
                    Our Seafood & Fish Installations
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
                      <span className="text-xs font-bold text-[#0c2340] font-display group-hover:text-blue-600 transition-colors">
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
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">IQF Ready</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Freezing System</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">Anti-Corrosive</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Saline Protection</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">-35°C</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Deep Freeze Performance</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">Pristine</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cellular Integrity</div>
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
                Build a Strong Cold Chain for <br className="hidden sm:inline" />
                Seafood Business
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-body leading-relaxed">
                Talk to our experts for custom cold storage solutions designed for seafood & fish.
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
                href="https://wa.me/918055010620?text=Hi,%20I'm%20interested%20in%20Seafood%20and%20Fish%20Cold%20Storage%20Solutions.%20Please%20connect%20me%20with%20an%20expert."
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
              <span>Hygienic & Food Safe</span>
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
