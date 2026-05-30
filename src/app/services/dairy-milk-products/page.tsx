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
} from "lucide-react";
import { motion } from "framer-motion";

export default function DairyServicesPage() {
  const router = useRouter();

  // Consultation form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [formSent, setFormSent] = useState(false);

  // Bottom form / consultation CTA states
  const [bottomFormSent, setBottomFormSent] = useState(false);

  // Interactive Flowchart states
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);
  const [hoveredStepIdx, setHoveredStepIdx] = useState<number | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleStepMouseMove = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredStepIdx(idx);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
  };

  const challenges = [
    {
      title: "01. Raw Milk Extraction",
      desc: "Milk leaves the cow at 37°C, providing an ideal breeding ground for rapid bacterial growth if not chilled immediately.",
      temp: "~37°C",
      stage: "Extraction",
      lossRisk: "Bacterial Explosion",
      thermovaultPatch: "Instant inline plate heat exchangers (PHE) dropping raw temperature to 4°C during transfer.",
      icon: Flame,
      color: "from-red-500/20 to-red-600/5",
      iconColor: "text-red-500",
      borderColor: "hover:border-red-500/30",
    },
    {
      title: "02. Bulk Storage Tanks",
      desc: "Bulk Milk Chiller (BMC) tanks suffer from temperature stratified layers and insulation leaks if not agitated.",
      temp: "~4°C",
      stage: "Storage Chilling",
      lossRisk: "Stratification & Leakage",
      thermovaultPatch: "Continuous automated agitator logic and high-density polyurethane tank shell insulation.",
      icon: Droplet,
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-500",
      borderColor: "hover:border-blue-500/30",
    },
    {
      title: "03. Pipeline Transfer",
      desc: "Piping connections and valves suffer thermal heat gain, creating micro-zones where pasteurized milk starts warming up.",
      temp: "~4°C to ~8°C",
      stage: "Fluid Transport",
      lossRisk: "Heat Ingress / Warm Zones",
      thermovaultPatch: "Cladded SS-304 vacuum insulated pipe systems preventing thermal infiltration at joints.",
      icon: Network,
      color: "from-orange-500/20 to-orange-600/5",
      iconColor: "text-orange-500",
      borderColor: "hover:border-orange-500/30",
    },
    {
      title: "04. Loading & Dispatch",
      desc: "Opening of dispatch cold room gates to standard truck loaders leads to severe ambient warm air infiltration.",
      temp: "~4°C",
      stage: "Dispatch Logistics",
      lossRisk: "Ambient Air Infiltration",
      thermovaultPatch: "Inflatable dock shelters, high-velocity air barriers, and magnetic perimeter gate seals.",
      icon: ShieldAlert,
      color: "from-yellow-500/20 to-yellow-600/5",
      iconColor: "text-yellow-500",
      borderColor: "hover:border-yellow-500/30",
    },
  ];

  const valueProps = [
    {
      title: "Customized Engineering",
      desc: "Tailored cold rooms for dairy products of all sizes.",
      icon: Ruler,
    },
    {
      title: "Scalable Infrastructure",
      desc: "From small dairies to large cooperatives.",
      icon: Network,
    },
    {
      title: "Precision Temperature",
      desc: "Consistent cooling for maximum shelf life.",
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
    { product: "Milk (Raw / Chilled)", temp: "2°C to 4°C" },
    { product: "Paneer", temp: "0°C to 4°C" },
    { product: "Butter", temp: "-18°C" },
    { product: "Cheese", temp: "1°C to 6°C" },
    { product: "Curd / Yogurt", temp: "2°C to 6°C" },
    { product: "Ice Cream", temp: "-20°C to -25°C" },
    { product: "Whey", temp: "2°C to 4°C" },
  ];

  const installations = [
    {
      title: "Milk Chilling & Storage Room",
      image: "/images/milk_chilling_room.png",
    },
    {
      title: "Dairy Product Cold Room",
      image: "/images/dairy_product_cold_room.png",
    },
    {
      title: "Deep Freezer Room",
      image: "/images/deep_freezer_room.png",
    },
    {
      title: "Dairy Warehouse Storage",
      image: "/images/dairy_warehouse_storage.png",
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
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>&gt;</span>
            <span className="text-blue-400">Dairy & Milk Products</span>
          </div>

          {/* Immersive 3-Column Split-Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Text Sheet (col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Category tag */}
              <div className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/25 px-4 py-2 text-xs font-bold text-blue-400 font-mono w-fit">
                <Snowflake className="h-4 w-4 text-blue-400 shrink-0 animate-pulse" />
                <span>DAIRY & MILK PRODUCTS</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.12]">
                Reliable Cold Storage for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 font-display">
                  Dairy & Milk Products
                </span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
                We provide temperature controlled storage solutions to preserve freshness, 
                nutrition and quality of milk and its products from farm to distribution.
              </p>

              {/* Temp Pills (Premium Capsule Design) */}
              <div className="flex flex-wrap gap-4 pt-1">
                <div className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-950/50 via-[#0A1A30]/50 to-blue-900/30 border border-blue-500/30 px-4 py-2 text-xs font-bold font-mono text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-md hover:border-blue-400/50 transition-all select-none">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[10px] shadow-[0_0_8px_rgba(59,130,246,0.4)] animate-pulse shrink-0">❄</span>
                  <span>Chilled: <strong className="text-white font-extrabold tracking-wide">2°C to 4°C</strong></span>
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
                  <div className="h-2 w-2 rounded-full bg-teal-500" />
                  <span>Fast Installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
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
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-blue-400/40 font-bold">TV-DS-2026</div>

                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A1A30]">
                  <Image
                    src="/images/dairy_hero_bg.png"
                    alt="HD Cold Room Visualization"
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
              
              <div 
                className="relative rounded-2xl border border-white/10 bg-[#0C2340]/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md overflow-hidden"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "16px 16px"
                }}
              >
                {/* Ambient glowing radial blur behind illustration */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Technical Vector Drawing Blueprint Schematic */}
                <div className="relative h-20 w-full rounded-xl bg-slate-950/40 border border-white/5 overflow-hidden mb-6 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 opacity-20" 
                    style={{
                      backgroundImage: "radial-gradient(rgba(59, 130, 246, 0.3) 1.2px, transparent 1.2px)",
                      backgroundSize: "12px 12px"
                    }}
                  />
                  <svg className="absolute inset-0 h-full w-full stroke-blue-500/25 fill-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="50" cy="50" r="32" strokeWidth="0.5" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="16" strokeWidth="0.5" />
                    <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" strokeDasharray="4 4" />
                    <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" strokeDasharray="4 4" />
                    <path d="M 20 20 L 80 80 M 20 80 L 80 20" strokeWidth="0.25" strokeDasharray="1 3" />
                  </svg>
                  
                  <div className="relative z-10 flex items-center gap-3 px-4 py-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/35 text-blue-400">
                      <Settings className="h-5 w-5 animate-spin-slow text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-blue-400">CAD Blueprint Sizing</div>
                      <div className="text-[8px] font-bold text-slate-300 font-mono flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>DRAFTSMAN STATUS: ONLINE</span>
                      </div>
                    </div>
                  </div>
                </div>

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
                        placeholder="e.g. ABC Dairy Pvt. Ltd."
                        className="w-full rounded-xl bg-[#0c2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold font-mono py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl justify-center w-full shadow-inner select-none">
                      <Clock className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
                      <span>Response within 30 mins</span>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white shadow-lg active:scale-[0.98] transition-all font-display group/btn"
                      >
                        <Send className="h-3.5 w-3.5 text-inherit transition-transform group-hover/btn:translate-x-0.5" />
                        <span>Talk to Cold Chain Expert</span>
                      </button>

                      <a
                        href="https://wa.me/918055010620?text=Hi,%20I'm%20interested%20in%20Dairy%20Cold%20Storage%20Solutions.%20Please%20connect%20me%20with%20an%20expert."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 py-3.5 text-xs font-bold text-white transition-all active:scale-[0.98] font-display group/btn"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-emerald-400 transition-transform group-hover/btn:scale-110" />
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
              DIFFICULTIES IN COLD CHAIN
            </span>
            <h2 className="text-3xl font-extrabold text-[#0c2340] font-display leading-tight">
              Common <span className="text-blue-600">Challenges</span> in Dairy & Milk Storage
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-body">
              Milk and dairy products are highly perishable. Overcoming these key biological and physical challenges requires optimized refrigeration and absolute thermal security.
            </p>
          </div>

          {/* Thermodynamic Process Flowchart */}
          <div className="space-y-12 text-slate-800">
            {/* Flowchart Schematic Pipeline */}
            <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 p-8 bg-slate-50 rounded-3xl border border-slate-100/80 shadow-sm overflow-hidden">
              {/* Desktop Pipe Line Connector */}
              <div className="absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/30 to-blue-500/20 -translate-y-1/2 hidden md:block z-0" />
              
              {challenges.map((chal, idx) => {
                const Icon = chal.icon;
                const isSelected = selectedStepIdx === idx;
                const isHovered = hoveredStepIdx === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedStepIdx(idx)}
                    onMouseMove={(e) => handleStepMouseMove(e, idx)}
                    onMouseLeave={() => setHoveredStepIdx(null)}
                    className={`relative z-10 flex flex-col items-center p-5 rounded-2xl border transition-all duration-300 w-full md:w-56 overflow-hidden ${
                      isSelected 
                        ? "bg-[#0C2340] border-[#0c2340] text-white shadow-lg shadow-blue-950/15"
                        : "bg-white border-slate-200/60 text-slate-700 hover:border-blue-300 hover:bg-slate-55"
                    }`}
                  >
                    {/* Spotlight Glow Effect */}
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

                    {/* Step Icon */}
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${
                      isSelected ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                    } border border-white/10 shadow-sm mb-3`}>
                      <Icon className="h-5 w-5 animate-pulse" />
                    </div>

                    {/* Stage Title */}
                    <div className="text-center">
                      <span className={`text-[8px] font-bold font-mono uppercase tracking-wider block ${
                        isSelected ? "text-blue-300" : "text-slate-400"
                      }`}>
                        {chal.stage}
                      </span>
                      <h4 className="text-xs font-extrabold font-display mt-0.5">{chal.title.substring(4)}</h4>
                    </div>

                    {/* Temperature Pill */}
                    <div className={`mt-3 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold ${
                      isSelected 
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                        : "bg-slate-100 text-slate-500 border border-slate-200/50"
                    }`}>
                      {chal.temp}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Node Details Card */}
            <div className="relative rounded-3xl border border-slate-200/60 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[280px]">
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                {/* Header: Stage and Loss Risk warning */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50 text-red-500 text-[10px] font-extrabold">!</span>
                    <h3 className="text-sm font-extrabold text-[#0c2340] font-display text-left">
                      Thermal Loss Node: {challenges[selectedStepIdx].title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-bold font-mono text-red-500 uppercase tracking-wider block">Critical Loss Risk</span>
                    <span className="text-[9px] font-mono font-bold text-red-600 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                      {challenges[selectedStepIdx].lossRisk}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 text-left">
                  <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider block">Thermodynamic Analysis</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-body">
                    {challenges[selectedStepIdx].desc} Temperature drift at this junction causes accelerated bacterial replication, altering acidity and texture, leading to product rejection and batch dump costs.
                  </p>
                </div>
              </div>

              {/* ThermoVault Patch solution */}
              <div className="pt-6 border-t border-slate-100 mt-6 space-y-3.5 text-left">
                <span className="text-[8px] font-bold text-emerald-600 font-mono uppercase tracking-wider block">ThermoVault System Patch</span>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 w-full rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4 flex gap-3 items-center">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0c2340] font-display">Active Engineering Safeguard</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{challenges[selectedStepIdx].thermovaultPatch}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Blue Solutions Layout */}
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
              How ThermoVault delivers elite technical stability and extreme performance for critical dairy cooperatives and distributors.
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
                  Custom-built rooms to store milk, paneer, butter, cheese, curd and other dairy products.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Thermometer className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Precise Temperature Control</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Advanced systems maintain stable temperature and humidity for maximum freshness.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Hygienic & SS Interiors</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  SS interiors and food-grade materials ensure hygiene and easy maintenance.
                </p>
              </div>
            </div>

            {/* Center Image (Visual Showcase) */}
            <div className="lg:col-span-4 flex justify-center relative py-6">
              {/* Outer soft neon ring */}
              <div className="absolute inset-0 m-auto w-64 sm:w-80 h-64 sm:h-80 rounded-full border border-blue-500/10 shadow-neon-blue animate-pulse" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-64 sm:w-80 h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A1A30]"
              >
                <Image
                  src="/images/dairy_cold_room_unit.png"
                  alt="Elite Modular Cold Room Unit"
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
                  Real-time monitoring with alerts for temperature, humidity and system performance.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Zap className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Energy Efficient Systems</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  High-efficiency equipment reduces power consumption and operational costs.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group space-y-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Battery className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Backup Power & Safety</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Redundant systems and safety features ensure uninterrupted cold storage.
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

              {/* Table card */}
              <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                      <th className="p-4 pl-6 font-bold">Dairy Product Type</th>
                      <th className="p-4 pr-6 font-bold text-right">Ideal Storage Temp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-body text-slate-700">
                    {tempGuide.map((item, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-slate-50/50 transition-colors font-medium"
                      >
                        <td className="p-4 pl-6 flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-[10px]">
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
                    Our Dairy Storage Installations
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
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">Bulk Chill</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bacterial Control</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">Continuous</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Chilling Stability</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">100%</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Thermal Retention</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-extrabold text-[#0c2340] font-display">Zero</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Thermal Leakage</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Bottom Sizing CTA Intake */}
      <section className="py-20 bg-[#0C2340] text-white border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:24px_24px] opacity-40 z-0" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          
          <div className="rounded-2xl border border-white/10 bg-[#0A1A30]/60 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-2xl font-extrabold font-display">
                Build a Reliable Cold Chain for <br className="hidden sm:inline" />
                Your Dairy Business
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-body leading-relaxed">
                Talk to our experts for custom cold storage solutions designed for your products.
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
                href="https://wa.me/918055010620?text=Hi,%20I'm%20interested%20in%20Dairy%20Cold%20Storage%20Solutions.%20Please%20connect%20me%20with%20an%20expert."
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
