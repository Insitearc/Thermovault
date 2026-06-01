"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  Compass,
  UserCheck,
  Users,
  MapPin,
  Clock,
  Award,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  Check,
  Snowflake,
  Cpu,
  Activity,
  Wrench,
  FileSpreadsheet,
  Settings,
  Phone,
  FileText,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Brand Logos for Marquee
const KingspanLogo = () => (
  <div className="flex items-center gap-2">
    <svg className="h-6 w-6 text-[#1a5f7a]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L9 8h6l-3-6zm-6 8l-2 5h16l-2-5H6zm-4 7h20v2H2v-2z" />
    </svg>
    <span className="font-extrabold text-[#0c2340] tracking-tight text-base">Kingspan</span>
  </div>
);

const JSWLogo = () => (
  <div className="flex items-center font-black text-xl tracking-tighter">
    <span className="text-[#1565c0]">J</span>
    <span className="text-[#d32f2f]">S</span>
    <span className="text-[#1565c0]">W</span>
  </div>
);

const MountLogo = () => (
  <div className="flex items-center gap-1.5">
    <svg className="h-5 w-5 text-[#0d47a1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 20h18L12 4z" />
      <path d="M12 4l-4 9h8z" />
    </svg>
    <span className="font-black text-[#1a237e] text-sm tracking-wider">MOUNT</span>
  </div>
);

const VoltasLogo = () => (
  <div className="flex items-center font-extrabold text-lg text-[#0d47a1] tracking-tight">
    <span>VOLTAS</span>
  </div>
);

const DaikinLogo = () => (
  <div className="flex items-center gap-1">
    <svg className="h-4.5 w-4.5 text-[#03a9f4]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 3h8l8 14H10z" />
    </svg>
    <span className="font-black text-[#01579b] text-base tracking-tighter italic">DAIKIN</span>
  </div>
);

const CopelandLogo = () => (
  <div className="flex items-center gap-1.5">
    <svg className="h-4.5 w-4.5 text-[#0d47a1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12a4 4 0 018 0" />
    </svg>
    <span className="font-black text-[#0d47a1] text-sm tracking-tight">COPELAND</span>
  </div>
);

const EmersonLogo = () => (
  <div className="flex items-center gap-1">
    <svg className="h-4.5 w-4.5 text-[#0b5c9c]" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8h8v2H10v2h5v2H10v2h6v2H8z" />
    </svg>
    <span className="font-extrabold text-[#0b5c9c] text-sm tracking-wide">EMERSON</span>
  </div>
);

const DanfossLogo = () => (
  <div className="flex items-center">
    <span className="font-black text-[#e53935] text-lg tracking-tighter italic">Danfoss</span>
  </div>
);

const BitzerLogo = () => (
  <div className="flex items-center gap-1.5">
    <svg className="h-5 w-5 text-[#2e7d32]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h12l3 8-3 8H6l-3-8z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 7h6l2 5-2 5H9l-2-5z" />
    </svg>
    <span className="font-black text-[#2e7d32] text-sm tracking-normal">BITZER</span>
  </div>
);

const CarelLogo = () => (
  <div className="flex items-center font-bold text-base tracking-widest text-slate-900">
    <span>CA</span>
    <span className="text-[#d32f2f]">R</span>
    <span>EL</span>
  </div>
);

const DixellLogo = () => (
  <div className="flex items-center font-extrabold text-base text-[#0277bd] tracking-tight">
    <span>Dixell</span>
    <span className="text-[#f57c00] ml-0.5">X</span>
  </div>
);

const SchneiderLogo = () => (
  <div className="flex items-center gap-1.5">
    <svg className="h-4.5 w-4.5 text-[#388e3c]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 7h10v3H7zm0 5h10v5H7z" />
    </svg>
    <span className="font-extrabold text-[#2e7d32] text-[10px] tracking-tight leading-none text-left">
      Schneider<br /><span className="text-[8px] font-normal">Electric</span>
    </span>
  </div>
);

const CarrierLogo = () => (
  <div className="flex items-center justify-center px-3 py-0.5 rounded-full border border-[#0d47a1] bg-[#0d47a1]/5">
    <span className="font-black text-[#0d47a1] text-xs italic tracking-tight font-serif">Carrier</span>
  </div>
);

const BlueStarLogo = () => (
  <div className="flex items-center gap-1">
    <svg className="h-4.5 w-4.5 text-[#0d47a1]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6 4.8 2.3 7.4-6-4.8-6 4.8 2.3-7.4-6-4.8h7.6z" />
    </svg>
    <span className="font-extrabold text-[#0d47a1] text-xs tracking-wide uppercase">Blue Star</span>
  </div>
);

// Banana SVG for Ripening Chambers
const BananaIcon = () => (
  <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M4 22c7.5-3 12.5-9 14.5-16.5.5-2 .5-3 .5-3.5a1 1 0 00-1-1c-.5 0-1.5 0-3.5.5C7 4 1 9-2 16.5" />
    <path d="M19.5 2c.5 1 1 2.5 1.5 4" />
  </svg>
);

export default function AboutPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const openModal = () => {
    const event = new CustomEvent("open-quote-modal");
    window.dispatchEvent(event);
  };

  const row1Brands = [
    { name: "Kingspan", logo: <KingspanLogo /> },
    { name: "JSW", logo: <JSWLogo /> },
    { name: "MOUNT", logo: <MountLogo /> },
    { name: "VOLTAS", logo: <VoltasLogo /> },
    { name: "DAIKIN", logo: <DaikinLogo /> },
    { name: "COPELAND", logo: <CopelandLogo /> },
    { name: "EMERSON", logo: <EmersonLogo /> },
  ];

  const row2Brands = [
    { name: "Danfoss", logo: <DanfossLogo /> },
    { name: "Bitzer", logo: <BitzerLogo /> },
    { name: "CAREL", logo: <CarelLogo /> },
    { name: "Dixell", logo: <DixellLogo /> },
    { name: "Schneider Electric", logo: <SchneiderLogo /> },
    { name: "Carrier", logo: <CarrierLogo /> },
    { name: "BLUE STAR", logo: <BlueStarLogo /> },
  ];

  const services = [
    {
      title: "Modular Cold Rooms",
      desc: "Custom-built cold storage solutions for various temperature requirements.",
      icon: Snowflake,
    },
    {
      title: "Refrigeration Systems",
      desc: "Efficient refrigeration infrastructure for industrial and commercial applications.",
      icon: Cpu,
    },
    {
      title: "Blast Chillers & Freezers",
      desc: "Rapid cooling and freezing systems to preserve quality and increase shelf life.",
      icon: Activity,
    },
    {
      title: "Fruits Ripening Chambers",
      desc: "Controlled atmosphere chambers for uniform fruit ripening.",
      icon: BananaIcon,
    },
    {
      title: "AMC & Maintenance",
      desc: "Preventive maintenance and breakdown support to ensure maximum uptime.",
      icon: Wrench,
    },
    {
      title: "Subsidy Assistance",
      desc: "End-to-end support for applicable government subsidy schemes.",
      icon: FileSpreadsheet,
    },
  ];

  const industries = [
    { name: "Dairy & Milk Products", img: "/images/industry_dairy.png" },
    { name: "Meat & Poultry", img: "/images/industry_meat.png" },
    { name: "Fruits & Vegetables", img: "/images/industry_fruits.png" },
    { name: "Seafood & Fish", img: "/images/industry_seafood.png" },
    { name: "Pharmaceuticals", img: "/images/industry_pharma.png" },
    { name: "Dark Stores & Last-Mile Delivery", img: "/images/industry_retail.png" },
    { name: "Mushroom Cultivation", img: "/images/mushroom_cultivation.png" },
    { name: "Saffron Cultivation", img: "/images/saffron_cultivation.png" },
  ];

  const timelines = [
    { step: 1, title: "Consultation", desc: "Understanding requirements", icon: Users },
    { step: 2, title: "Site Survey", desc: "On-site evaluation and feasibility", icon: MapPin },
    { step: 3, title: "Engineering Design", desc: "Customized design and planning", icon: Settings },
    { step: 4, title: "Manufacturing", desc: "Precision manufacturing with quality control", icon: Cpu },
    { step: 5, title: "Installation", desc: "Professional installation by expert team", icon: Wrench },
    { step: 6, title: "Commissioning", desc: "Testing and successful commissioning", icon: ShieldCheck },
    { step: 7, title: "Support", desc: "AMC & long-term technical support", icon: Clock },
  ];

  const credentials = [
    { label: "Company Name", value: "ThermoVault Systems" },
    { label: "Founder", value: "Omkar Naikade" },
    { label: "Established", value: "2026" },
    { label: "Business Type", value: "Proprietorship Firm" },
    { label: "GST Registered", check: true },
    { label: "MSME Registered", check: true },
    { label: "Turnkey Project Execution", check: true },
    { label: "AMC Support Available", check: true },
    { label: "Subsidy Assistance", check: true },
    { label: "IoT Monitoring Ready", check: true },
  ];

  const faqs = [
    {
      q: "Do you provide turnkey cold storage projects?",
      a: "Yes, we handle the entire project cycle from engineering design, supply of panels and refrigeration units, installation, to testing and commissioning.",
    },
    {
      q: "Can ThermoVault assist with subsidy applications?",
      a: "Absolutely. We guide you through the documentation and technical details required to apply for Central and State government subsidies.",
    },
    {
      q: "Do you provide AMC services?",
      a: "Yes, we offer both preventive and comprehensive Annual Maintenance Contracts (AMC) to ensure maximum uptime of your cold chain systems.",
    },
    {
      q: "Can cold rooms be customized?",
      a: "Yes, all our cold rooms are custom designed to fit your available space, product volume, and specific temperature range.",
    },
    {
      q: "Do you work outside Maharashtra?",
      a: "Yes, while our headquarters is in Maharashtra, we execute turnkey cold storage and commercial projects all across India.",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-24 text-white overflow-hidden"
        style={{ backgroundImage: "url('/images/dairy_warehouse_storage.png')" }}
      >
        <div className="absolute inset-0 bg-[#0C2340]/85 z-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 z-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-slate-300">About Us</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            About <span className="text-blue-400">ThermoVault Systems</span>
          </h1>
          <p className="max-w-3xl text-sm font-semibold text-slate-200/90 leading-relaxed font-display">
            Engineering Reliable Cold Chain Infrastructure
          </p>
          <p className="max-w-3xl text-xs sm:text-sm text-slate-300/95 leading-relaxed font-body">
            ThermoVault Systems is a leading cold chain engineering company specializing in the design, supply,
            installation and maintenance of advanced cold storage and refrigeration solutions.
            <br />
            <br />
            Founded in 2026, we help businesses across India preserve product quality, reduce wastage and operate
            more efficiently with reliable and energy-efficient cold chain infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <Link
              href="/contact"
              className="rounded-md bg-blue-600 px-6 py-3 text-xs font-bold text-white hover:bg-blue-500 transition-colors inline-flex items-center gap-2"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-white/30 bg-white/5 px-6 py-3 text-xs font-bold text-white hover:bg-white/10 transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Message from Founder Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Photo & Caption */}
            <div className="lg:col-span-5 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 bg-white">
                <Image
                  src="/images/founder_portrait.png"
                  alt="Omkar Naikade, Founder of ThermoVault Systems"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-[#0c2340] font-display">Omkar Naikade</h3>
                <p className="text-xs font-semibold text-blue-600 font-mono">Founder, ThermoVault Systems</p>
              </div>
            </div>

            {/* Right Message text */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                  Message from Founder
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0c2340] font-display tracking-tight mt-1">
                  Omkar Naikade
                </h2>
                <p className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wide">
                  Founder, ThermoVault Systems
                </p>
              </div>

              <div className="relative pl-6 border-l-4 border-blue-600/80 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic">
                  "ThermoVault Systems was built on a simple belief — every business deserves reliable cold chain
                  solutions backed by engineering excellence and honest service."
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                  We started this journey in 2026 with a vision to deliver customized, energy-efficient and
                  future-ready cold storage solutions that help businesses grow without compromising on quality.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                  Our commitment is to build long-term partnerships by delivering projects that are dependable,
                  efficient and designed for performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2340] font-display uppercase">
              WHAT WE DO
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => {
              const IconComp = svc.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-500/20 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0c2340] font-display">{svc.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-body">{svc.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2340] font-display uppercase">
              INDUSTRIES WE SERVE
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-body">
              We utilize globally recognized refrigeration components and insulated panel systems to deliver reliable and
              energy-efficient cold chain infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8">
            {industries.map((ind, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3 group">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={ind.img}
                    alt={ind.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h4 className="text-xs font-bold text-slate-700 font-display group-hover:text-blue-600 transition-colors max-w-[140px]">
                  {ind.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED COMPONENTS & PARTNERS Marquee Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2340] font-display uppercase">
              TRUSTED COMPONENTS & ENGINEERING PARTNERS
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-body">
              We partner with industry-leading global brands to source components that ensure long life, safety, and high performance.
            </p>
          </div>
        </div>

        {/* Scrolling Marquees */}
        <div className="space-y-4 max-w-7xl mx-auto px-4 relative">
          {/* Row 1 - Left */}
          <div className="overflow-hidden flex w-full relative py-1">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="flex shrink-0 w-max animate-marquee-left gap-4 pr-4">
              {row1Brands.map((b, idx) => (
                <div
                  key={`${b.name}-1-${idx}`}
                  className="bg-white border border-slate-150/70 shadow-sm rounded-xl py-3 px-8 min-w-[170px] h-16 flex items-center justify-center shrink-0"
                >
                  {b.logo}
                </div>
              ))}
            </div>
            <div className="flex shrink-0 w-max animate-marquee-left gap-4 pr-4" aria-hidden="true">
              {row1Brands.map((b, idx) => (
                <div
                  key={`${b.name}-1-dup-${idx}`}
                  className="bg-white border border-slate-150/70 shadow-sm rounded-xl py-3 px-8 min-w-[170px] h-16 flex items-center justify-center shrink-0"
                >
                  {b.logo}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right */}
          <div className="overflow-hidden flex w-full relative py-1">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="flex shrink-0 w-max animate-marquee-right gap-4 pr-4">
              {row2Brands.map((b, idx) => (
                <div
                  key={`${b.name}-2-${idx}`}
                  className="bg-white border border-slate-150/70 shadow-sm rounded-xl py-3 px-8 min-w-[170px] h-16 flex items-center justify-center shrink-0"
                >
                  {b.logo}
                </div>
              ))}
            </div>
            <div className="flex shrink-0 w-max animate-marquee-right gap-4 pr-4" aria-hidden="true">
              {row2Brands.map((b, idx) => (
                <div
                  key={`${b.name}-2-dup-${idx}`}
                  className="bg-white border border-slate-150/70 shadow-sm rounded-xl py-3 px-8 min-w-[170px] h-16 flex items-center justify-center shrink-0"
                >
                  {b.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY BUSINESSES CHOOSE THERMOVAULT Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2340] font-display uppercase">
              WHY BUSINESSES CHOOSE THERMOVAULT
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Engineering First Approach",
                desc: "We focus on smart engineering and right-sizing to deliver high performance.",
                icon: Compass,
              },
              {
                title: "Customized Solutions",
                desc: "Every project is customized to match your products, process and business goals.",
                icon: Settings,
              },
              {
                title: "Reliable Support",
                desc: "Dedicated team for installation, training and long-term after-sales support.",
                icon: Users,
              },
              {
                title: "Energy Efficient Systems",
                desc: "Designed to reduce operational costs and deliver sustainable performance.",
                icon: Zap,
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0c2340] font-display">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-body">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE EXECUTE PROJECTS Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0c2340] font-display uppercase">
              HOW WE EXECUTE PROJECTS
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Timeline Nodes */}
          <div className="relative">
            {/* Desktop Connective Line */}
            <div className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 border-t-2 border-dashed border-slate-200 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-8 relative z-10">
              {timelines.map((t, idx) => {
                const IconComp = t.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center space-y-3 group">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 border-2 border-white shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComp className="h-5 w-5" />
                      {/* Step Number Badge */}
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0c2340] text-[9px] font-bold text-white font-mono">
                        {t.step}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-[#0c2340] font-display uppercase tracking-wider">
                        {t.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed max-w-[130px] mx-auto font-body">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY CREDENTIALS & FAQ Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Credentials */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0c2340] font-display uppercase">
                COMPANY CREDENTIALS
              </h2>

              <div className="bg-white border border-slate-150/70 rounded-2xl p-6 shadow-sm space-y-4">
                {credentials.map((cred, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-2 text-xs font-semibold ${
                      idx !== credentials.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <span className="text-slate-500">{cred.label}</span>
                    {cred.check ? (
                      <span className="flex items-center gap-1.5 text-[#2e7d32] font-bold font-mono">
                        <Check className="h-4.5 w-4.5" />
                        <span>Registered</span>
                      </span>
                    ) : (
                      <span className="text-[#0c2340] font-bold font-mono text-right">{cred.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: FAQ */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0c2340] font-display uppercase">
                FREQUENTLY ASKED QUESTIONS
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white border border-slate-150/70 rounded-xl overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition-colors"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-180 text-blue-600" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="p-4 pt-0 text-[11px] sm:text-xs text-slate-500 leading-relaxed border-t border-slate-50 bg-slate-50/50 font-body">
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
          </div>
        </div>
      </section>

      {/* Bottom CTA Ribbon */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-16 text-white overflow-hidden"
        style={{ backgroundImage: "url('/images/amc_maintenance.png')" }}
      >
        <div className="absolute inset-0 bg-[#0C2340]/92 z-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-0 leading-tight">
              Let's Build Your Cold Chain Infrastructure
            </h2>
            <p className="text-xs text-slate-300 font-body">
              Partner with ThermoVault Systems for dependable, energy-efficient and future-ready cold chain solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-blue-500 shadow-md active:scale-95"
            >
              <Users className="h-4 w-4" />
              <span>Get Free Consultation</span>
            </Link>

            <a
              href="https://wa.me/918055010620?text=Hi%20ThermoVault,%20I%20have%20a%20project%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-[#25d366] px-5 py-3 text-xs font-bold text-white transition-all hover:bg-[#20ba5a] active:scale-95 shadow-md"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-md border border-white/40 bg-white/5 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <FileText className="h-4 w-4" />
              <span>Request Quotation</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
