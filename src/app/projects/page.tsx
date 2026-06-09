"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import initialProjects from "@/data/projects.json";
import {
  Milestone,
  CheckCircle2,
  Compass,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  Users,
  MapPin,
  Clock,
  Sparkles,
  Star,
  Quote,
  MessageSquare,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ChevronDown,
  Thermometer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectItem {
  title: string;
  location: string;
  category: "interiors" | "machinery" | "execution";
  size: string;
  image: string;
  desc: string;
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "interiors" | "machinery" | "execution">("all");
  const [activeLightboxProject, setActiveLightboxProject] = useState<ProjectItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter);
    setVisibleCount(6);
  };

  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects as ProjectItem[]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/admin");
        const json = await res.json();
        if (json.success && json.data.projects) {
          setProjects(json.data.projects);
        }
      } catch (err) {
        console.error("Error fetching projects from API:", err);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Lightbox index calculations for carousel
  const activeIdx = activeLightboxProject 
    ? filteredProjects.findIndex((p) => p.title === activeLightboxProject.title) 
    : -1;

  const handlePrevProject = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIdx > 0) {
      setActiveLightboxProject(filteredProjects[activeIdx - 1]);
    } else {
      setActiveLightboxProject(filteredProjects[filteredProjects.length - 1]);
    }
  };

  const handleNextProject = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIdx < filteredProjects.length - 1) {
      setActiveLightboxProject(filteredProjects[activeIdx + 1]);
    } else {
      setActiveLightboxProject(filteredProjects[0]);
    }
  };

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightboxProject) return;
      if (e.key === "Escape") setActiveLightboxProject(null);
      if (e.key === "ArrowLeft") handlePrevProject();
      if (e.key === "ArrowRight") handleNextProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxProject, filteredProjects]);

  const testimonials = [
    {
      name: "Rahul Deshmukh",
      role: "Dairy Farm Owner, Pune",
      quote: "ThermoVault's engineering team provided extremely thorough consultation and detailed 3D designs for our planned dairy expansion.",
    },
    {
      name: "Vikram Patil",
      role: "Food Processing Unit, Sangli",
      quote: "Highly impressive technical knowledge in refrigeration systems. Their thermal simulation report gave us complete confidence.",
    },
    {
      name: "Ankita Sharma",
      role: "Agro Business Owner, Nashik",
      quote: "Great support in subsidy documentation and project guidance. Highly recommended!",
    },
  ];

  // Dynamic filter counters
  const allCount = projects.length;
  const interiorsCount = projects.filter((p) => p.category === "interiors").length;
  const machineryCount = projects.filter((p) => p.category === "machinery").length;
  const executionCount = projects.filter((p) => p.category === "execution").length;

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
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-slate-300">Projects</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            Proposed Engineering &amp; <span className="text-blue-400">3D Concept Gallery</span>
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-200/90 leading-relaxed font-body">
            Explore 3D blueprints, custom engineering layouts, and concept designs illustrating how our upcoming cold chain systems and refrigeration projects will look.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-2 text-[10px] font-bold text-slate-300">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-blue-400" /> Custom Solutions</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-blue-400" /> Quality Assured</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-blue-400" /> On-Time Delivery</span>
            <span className="flex items-center gap-1.5"><Compass className="h-4 w-4 text-blue-400" /> Pan India Service</span>
          </div>
        </div>
      </section>

      {/* Navy Stats Ribbon */}
      <section className="bg-[#0C2340] text-white py-6 border-b border-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-5 gap-1.5 sm:gap-6 text-center">
          {[
            { label: "PUF Core Density", value: "40 kg/m³", icon: ShieldCheck },
            { label: "Thermal Conductivity", value: "0.022 W/mK", icon: Thermometer },
            { label: "Govt Subsidy Audited", value: "35% - 50%", icon: Award },
            { label: "Micro-Climate Tracking", value: "24/7", icon: Clock },
            { label: "Food-Grade Materials", value: "100%", icon: CheckCircle2 },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center gap-1 p-0.5 sm:p-2">
                <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-blue-400" />
                <div className="text-[10px] sm:text-2xl font-extrabold font-mono leading-none">{stat.value}</div>
                <div className="text-[6px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-300 font-mono text-center leading-tight">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
              PROPOSED DESIGNS &amp; 3D CONCEPTS
            </span>
            <h2 className="text-3xl font-extrabold text-[#0c2340] font-display">
              Proposed Cold Storage Concepts. <span className="text-blue-600">Uncompromised Engineering.</span>
            </h2>
            <p className="text-xs text-slate-500 font-body leading-relaxed">
              Browse through our 3D CAD blueprints and conceptual models showing the design precision of our planned structural panels, clean rooms, heavy-duty condensing machinery, and real-time electronic panel setups. Click any project card to open full-screen lightbox details.
            </p>
          </div>

          {/* Dynamic Tabs Filters with Counters */}
          <div className="flex flex-wrap justify-center gap-2 pb-8 max-w-3xl mx-auto border-b border-slate-200">
            {[
              { id: "all", label: "All Concepts", count: allCount },
              { id: "interiors", label: "Interior Concepts", count: interiorsCount },
              { id: "machinery", label: "Machinery Systems", count: machineryCount },
              { id: "execution", label: "Proposed Deployments", count: executionCount },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleFilterChange(btn.id as typeof filter)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 active:scale-95 flex items-center gap-2 border ${
                  filter === btn.id
                    ? "bg-[#0c2340] text-white border-[#0c2340] shadow-md shadow-slate-900/10"
                    : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span>{btn.label}</span>
                <span className={`text-[9px] font-extrabold font-mono px-1.5 py-0.5 rounded-full ${
                  filter === btn.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {btn.count}
                </span>
              </button>
            ))}
          </div>

          {/* Staggered Masonry Layout Column Container */}
          <motion.div 
            layout 
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.slice(0, visibleCount).map((p, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ 
                    y: -5,
                    scale: 1.015,
                    boxShadow: "0 20px 25px -5px rgba(24, 95, 165, 0.08), 0 10px 10px -5px rgba(24, 95, 165, 0.03)"
                  }}
                  key={p.title}
                  onClick={() => setActiveLightboxProject(p)}
                  className="break-inside-avoid inline-block w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col justify-between transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: idx % 3 === 0 ? "4/3" : idx % 3 === 1 ? "16/10" : "16/11" }}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Dark/Neon Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                      <div className="bg-[#0C2340]/90 text-white p-3 rounded-full shadow-lg border border-white/10 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="h-4.5 w-4.5 text-teal-light" />
                      </div>
                    </div>

                    {/* Size Badge */}
                    <div className="absolute bottom-3 left-3 rounded-lg bg-[#0c2340]/90 border border-white/5 backdrop-blur-sm px-2.5 py-0.5 text-[9px] font-bold text-white font-mono uppercase z-10 shadow-sm">
                      {p.size}
                    </div>
                  </div>

                  <div className="p-5 space-y-2 text-left">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-600 font-mono block">
                      {p.category === "interiors" ? "Cold Room Interior" : p.category === "machinery" ? "Machinery & Systems" : "Installation & Execution"}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0c2340] font-display tracking-tight group-hover:text-blue-600 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-body">
                      {p.desc}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono pt-1.5 border-t border-slate-100 mt-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                      <span>{p.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Premium Glassmorphic "View More" Button */}
          {filteredProjects.length > visibleCount && (
            <div className="flex justify-center pt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#0C2340] hover:bg-blue-600 border border-white/10 px-8 py-4 text-xs font-bold text-white shadow-lg active:scale-[0.98] transition-all duration-300 font-display select-none cursor-pointer"
              >
                <span>View More Projects</span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-4 w-4 text-blue-400 group-hover:text-white" />
                </motion.div>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Immersive Frameless Lightbox Overlay */}
      <AnimatePresence>
        {activeLightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxProject(null)}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 select-none"
          >
            {/* Close button top right */}
            <button
              onClick={() => setActiveLightboxProject(null)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95 shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrevProject}
              className="absolute left-4 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNextProject}
              className="absolute right-4 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95 shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Lightbox Content Container */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-5xl bg-[#0C2340]/90 border border-white/5 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Image Frame Column */}
              <div className="md:col-span-8 relative aspect-[4/3] md:aspect-auto md:h-[500px] bg-[#071628] flex items-center justify-center">
                <Image
                  src={activeLightboxProject.image}
                  alt={activeLightboxProject.title}
                  fill
                  className="object-contain p-2 md:p-4"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>

              {/* Sidebar Description Column */}
              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 space-y-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-teal-light font-mono bg-teal-accent/10 px-2.5 py-0.5 rounded border border-teal-accent/20">
                      {activeLightboxProject.category === "interiors" ? "Cold Room Interior" : activeLightboxProject.category === "machinery" ? "Machinery & Systems" : "Installation & Execution"}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                      {activeLightboxProject.size}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
                    {activeLightboxProject.title}
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed font-body">
                    {activeLightboxProject.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <MapPin className="h-4 w-4 text-teal-light shrink-0" />
                    <span>Location: <strong>{activeLightboxProject.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <Clock className="h-4 w-4 text-teal-light shrink-0" />
                    <span>Status: <strong className="text-blue-400">Proposed Concept Design / Under Engineering</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-2xl font-bold text-[#0c2340] font-display">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6 relative"
              >
                <div className="space-y-4">
                  <Quote className="h-7 w-7 text-blue-600/10 shrink-0" />
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    &quot;{t.quote}&quot;
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 space-y-2 text-left">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-transparent" />
                    ))}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0c2340]">{t.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Ribbon */}
      <section className="py-12 bg-[#0C2340] text-white border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold font-display">Have a Project in Mind?</h3>
            <p className="text-xs text-slate-300">Let&apos;s build a reliable and efficient cold chain solution for your business.</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+918055010620"
              className="rounded-md bg-blue-600 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-blue-500 shadow-md active:scale-95"
            >
              Call Now Support
            </a>

            <a
              href="https://wa.me/918055010620"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-white/40 bg-white/5 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
