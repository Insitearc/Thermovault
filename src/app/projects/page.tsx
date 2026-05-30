"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectItem {
  title: string;
  location: string;
  category: "room" | "system" | "ripening" | "chiller" | "amc";
  size: string;
  image: string;
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "room" | "system" | "ripening" | "chiller" | "amc">("all");

  const projects: ProjectItem[] = [
    { title: "Dairy Cold Room - 50 MT", location: "Pune, Maharashtra", category: "room", size: "Cold Room Installation", image: "/images/industry_dairy.png" },
    { title: "Centralized Refrigeration System", location: "Nashik, Maharashtra", category: "system", size: "Refrigeration System", image: "/images/refrigeration_system.png" },
    { title: "Banana Ripening Chamber - 40 MT", location: "Solapur, Maharashtra", category: "ripening", size: "Ripening Chamber", image: "/images/ripening_chamber.png" },
    { title: "Fruits & Vegetables Cold Storage", location: "Kolhapur, Maharashtra", category: "room", size: "Multi-Temperature Cold Room", image: "/images/industry_fruits.png" },
    { title: "Blast Chiller Unit - 10 Tray", location: "Mumbai, Maharashtra", category: "chiller", size: "Blast Chiller", image: "/images/blast_chiller.png" },
    { title: "Annual Maintenance - AMC Contract", location: "Aurangabad, Maharashtra", category: "amc", size: "AMC & Maintenance", image: "/images/amc_maintenance.png" },
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const testimonials = [
    {
      name: "Rahul Deshmukh",
      role: "Dairy Farm Owner, Pune",
      quote: "ThermoVault Systems delivered our cold room exactly as promised. Excellent build quality and professional team.",
    },
    {
      name: "Vikram Patil",
      role: "Food Processing Unit, Sangli",
      quote: "Their refrigeration system is working perfectly and has significantly improved our storage efficiency.",
    },
    {
      name: "Ankita Sharma",
      role: "Agro Business Owner, Nashik",
      quote: "Great support in subsidy documentation and project guidance. Highly recommended!",
    },
  ];

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
            Our <span className="text-blue-400">Projects</span>
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-200/90 leading-relaxed">
            Every project we deliver is built with precision, engineering excellence, and a commitment to long-term performance.
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { label: "Projects Completed", value: "200+", icon: ShieldCheck },
            { label: "Industries Served", value: "15+", icon: Users },
            { label: "States Covered", value: "15+", icon: MapPin },
            { label: "On-Time Delivery", value: "100%", icon: Clock },
            { label: "Client Satisfaction", value: "100%", icon: Award },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 p-2">
                <Icon className="h-5 w-5 text-blue-400" />
                <div className="text-2xl font-extrabold font-mono leading-none">{stat.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              PROJECT GALLERY
            </span>
            <h2 className="text-2xl font-bold text-[#0c2340] font-display">
              Built for <span className="text-blue-600">Performance.</span> Delivered with <span className="text-blue-600">Pride.</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-6 max-w-2xl mx-auto">
            {[
              { id: "all", label: "All Projects" },
              { id: "room", label: "Cold Rooms" },
              { id: "system", label: "Refrigeration Systems" },
              { id: "ripening", label: "Ripening Chambers" },
              { id: "chiller", label: "Blast Chillers" },
              { id: "amc", label: "AMC & Maintenance" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  filter === btn.id
                    ? "bg-[#0c2340] text-white"
                    : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    rotateY: -2,
                    boxShadow: "0 20px 25px -5px rgba(24, 95, 165, 0.08), 0 10px 10px -5px rgba(24, 95, 165, 0.03)"
                  }}
                  key={p.title}
                  className="group rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm flex flex-col justify-between transition-all duration-300 preserve-3d cursor-pointer"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-106"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Size tag */}
                    <div className="absolute bottom-3 left-3 rounded bg-[#0c2340]/90 px-2 py-0.5 text-[9px] font-semibold text-white font-mono uppercase z-10">
                      {p.size}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-sm font-bold text-[#0c2340] font-display">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {p.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
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
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 space-y-2">
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
            <p className="text-xs text-slate-300">Let's build a reliable and efficient cold chain solution for your business.</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+918055010620"
              className="rounded-md bg-blue-600 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-blue-500 shadow-md active:scale-95 animate-pulse"
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
