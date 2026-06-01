"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerformanceFeatureBar from "@/components/layout/PerformanceFeatureBar";
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

  // 3D WebGL Sandbox control states
  const [doorOpen, setDoorOpen] = useState(false);
  const [compressorActive, setCompressorActive] = useState(true);
  const [temp, setTemp] = useState(-18.5);

  const services = [
    {
      title: "Modular Cold Rooms",
      image: "/images/hero.png",
      slug: "modular-cold-rooms",
    },
    {
      title: "Refrigeration Systems",
      image: "/images/refrigeration_system.png",
      slug: "refrigeration-systems",
    },
    {
      title: "Mushroom & Saffron Cultivation",
      image: "/images/mushroom_saffron_cultivation.png",
      slug: "mushroom-saffron-cultivation",
    },
    {
      title: "Fruits Ripening Chambers",
      image: "/images/ripening_chamber.png",
      slug: "ripening-chambers",
    },
    {
      title: "Blast Chillers",
      image: "/images/blast_chiller.png",
      slug: "blast-chillers",
    },
    {
      title: "AMC & Maintenance",
      image: "/images/amc_maintenance.png",
      slug: "amc",
    },
  ];

  const usps = [
    {
      title: "Advanced Technology",
      desc: "Modern equipment for maximum performance.",
    },
    {
      title: "Custom Engineering",
      desc: "Solutions designed as per your business needs.",
    },
    {
      title: "Quality Assured",
      desc: "Premium materials and strict quality standards.",
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setContactFormSent(true);
    setFormData({
      name: "",
      phone: "",
      email: "",
      bizType: "Farmer / FPO",
      roomSize: "Small (Below 10 MT)",
      msg: "",
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white text-slate-800 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Header */}
      <Navbar />

      {/* Hero Banner with image background */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-28 md:py-36 text-white overflow-hidden perspective-2000"
        style={{ backgroundImage: "url('/images/hero_background.png')" }}
      >
        {/* Dark Navy Tint Overlay and Futuristic Glowing Mesh Blobs */}
        <div className="absolute inset-0 bg-[#0C2340]/85 z-0" />
<<<<<<< HEAD
        
=======
        <div className="absolute inset-0 cyber-grid opacity-[0.15] z-0" />

>>>>>>> 6e746d55ee85362f0b98eea1d5708dcb56fcc2bc
        {/* Interactive Glowing Mesh Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[130px] pointer-events-none z-0 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/15 blur-[120px] pointer-events-none z-0" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-blue-400 font-mono uppercase bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full"
          >
            <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
            <span>ENGINEERED FOR PERFORMANCE. BUILT FOR RELIABILITY.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display leading-[1.1] max-w-3xl"
          >
            Advanced Cold Chain &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 font-extrabold">
              Refrigeration Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-xs sm:text-sm text-slate-200/90 leading-relaxed font-body"
          >
            We design, build and maintain reliable cold storage systems that
            preserve quality, reduce loss and power your growth. Discover
            precision telemetry systems built for tomorrow.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-xs font-bold text-white transition-all hover:scale-103 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 active:scale-95"
            >
              Get Free Consultation
            </Link>

            <Link
              href="/dashboard"
              className="rounded-md bg-white/5 border border-white/10 px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 hover:scale-103"
            >
              3D IoT Dashboard Demo
            </Link>
          </motion.div>

          {/* Trusted ribbon */}
          <div className="pt-8 border-t border-white/10 mt-12 max-w-4xl relative">
            {/* Tech line indicator */}
            <div className="absolute top-0 left-0 w-20 h-[2px] bg-blue-500" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 font-mono mb-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
              <span>TRUSTED BY LEADING ENTERPRISES ACROSS INDIA</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Food
                Processing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Dairy
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Pharma
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Fruits &
                Veg
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Seafood
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Retail
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Performance / Feature Bar */}
      <div className="py-10 bg-white relative z-20">
        <PerformanceFeatureBar />
      </div>

      {/* About ThermoVault Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle decorative background telemetry grid */}
        <div className="absolute right-0 top-10 w-96 h-96 cyber-grid opacity-[0.1] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center perspective-2000">
            {/* Story text */}
            <motion.div
              initial={{ opacity: 0, x: -60, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 preserve-3d"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                <span className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
                <span>ABOUT THERMOVAULT SYSTEMS</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-[#0c2340] font-display">
                Securing the Cold Chain{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Ecosystem
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-body">
                ThermoVault Systems delivers end-to-end cold chain and
                refrigeration solutions tailored for businesses of every size.
                From modular cold rooms to complete industrial refrigeration
                systems – we ensure quality, efficiency and long-term
                reliability.
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  "Engineering Excellence with Premium Materials",
                  "Custom-Built Solutions for Specialized Sectors",
                  "Reliable Pan-India Support & Telemetry Monitoring",
                ].map((text, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-xs text-slate-700 font-medium"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="rounded-md bg-[#0C2340] text-white px-5 py-3 text-xs font-bold hover:bg-[#15345a] hover:scale-103 hover:shadow-lg transition-all inline-flex items-center gap-2 active:scale-95"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Interactive Real-Time Telemetry Image on the right */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4 preserve-3d"
            >
              {/* Tech corner accents */}
              <div className="relative p-2 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-xl border border-slate-200/50">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500 rounded-tl-xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500 rounded-br-xl pointer-events-none" />

                <div className="relative h-[340px] rounded-xl overflow-hidden bg-slate-950 shadow-inner group">
                  {/* Real-time installation image */}
                  <Image
                    src="/images/hero.png"
                    alt="Modular Cold Room Telemetry Panel"
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Alarm Red tint overlay when door is open */}
                  {doorOpen && (
                    <div className="absolute inset-0 bg-red-600/10 border-2 border-red-500/40 pointer-events-none animate-pulse" />
                  )}

                  {/* Overlays removed per design request */}
                </div>
              </div>

              {/* Telemetry controls removed per design request */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comprehensive Cold Chain Solutions (Our Services) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 relative">
        <div className="absolute inset-0 cyber-grid opacity-[0.05] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              OUR SOLUTIONS
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0c2340] font-display">
              Comprehensive Cold Chain{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Solutions
              </span>
            </h2>
          </div>

          {/* Grid of 6 Services with photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  rotateY: -2,
                  boxShadow:
                    "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
                }}
                className="preserve-3d"
              >
                <Link
                  href={`/services/${svc.slug}`}
                  className="group relative h-64 rounded-2xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-end p-6 hover:border-blue-500/30 transition-all duration-300 block bg-slate-900 preserve-3d"
                >
                  {/* Background photo */}
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-108 opacity-85 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Dark bottom gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content Overlay */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600 shadow-md shadow-blue-500/20">
                        <Snowflake className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-xs font-bold text-white font-display uppercase tracking-wider">
                        {svc.title}
                      </span>
                    </div>
                    <span className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                      <ArrowRight className="h-4.5 w-4.5 text-white" />
                    </span>
                  </div>
                </Link>
              </motion.div>
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
      <section className="py-24 bg-[#0C2340] text-white relative overflow-hidden">
        {/* Futuristic background patterns */}
        <div className="absolute inset-0 cyber-grid-dark opacity-[0.12] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center perspective-2000">
            {/* Left lists */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 preserve-3d"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono block">
                WHY CHOOSE US?
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white font-display">
                Built For Performance.
                <br />
                Designed For{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Trust.
                </span>
              </h2>

              <div className="space-y-4 pt-4">
                {usps.map((usp, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-display group-hover:text-blue-400 transition-colors">
                        {usp.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {usp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right outline stats counters */}
            <div className="grid grid-cols-5 lg:grid-cols-2 gap-1.5 sm:gap-4 preserve-3d">
              {[
                { val: "40 kg/m³", label: "PUF Core Density" },
                { val: "0.022 W/mK", label: "Thermal Conductivity" },
                { val: "35% - 50%", label: "Govt Subsidy Audited" },
                { val: "24/7", label: "Micro-Climate Tracking" },
                { val: "100%", label: "Food-Grade Materials" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{
                    opacity: 0,
                    scale: 0.85,
                    rotateX: -15,
                    rotateY: 10,
                  }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.04,
                    borderColor: "rgba(59, 130, 246, 0.4)",
                    boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.2)",
                  }}
                  className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-1 sm:p-6 text-center space-y-1.5 sm:space-y-2 transition-all duration-300 cursor-default"
                >
                  <div className="text-[10px] sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-mono leading-none">
                    {stat.val}
                  </div>
                  <div className="text-[6px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-300 font-mono text-center">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
