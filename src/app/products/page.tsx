"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import {
  Snowflake,
  ShieldCheck,
  Thermometer,
  Zap,
  Award,
  ArrowRight,
  ChevronRight,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  Users,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardItem {
  name: string;
  desc: string;
  image: string;
  category: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeComingSoonProduct, setActiveComingSoonProduct] = useState<
    string | null
  >(null);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "panels", label: "PUF Panels" },
    { id: "compressors", label: "Compressors" },
    { id: "evaporators", label: "Evaporators" },
    { id: "condensers", label: "Condensing Units" },
    { id: "controllers", label: "Control Panels" },
    { id: "doors", label: "Cold Room Doors" },
    { id: "hardware", label: "Doors & Hardware" },
    { id: "piping", label: "Copper Piping" },
    { id: "electrical", label: "Electrical Systems" },
    { id: "accessories", label: "Refrigeration Accessories" },
    { id: "insulation", label: "Insulation Materials" },
    { id: "spares", label: "Spare Parts" },
  ];

  const products: ProductCardItem[] = [
    {
      name: "PUF Panels",
      desc: "High density PUF panels with excellent insulation and long-lasting performance.",
      image: "/images/puf_panels.png",
      category: "panels",
    },
    {
      name: "Compressors",
      desc: "High-efficiency compressors for reliable cooling and optimal performance.",
      image: "/images/compressors.png",
      category: "compressors",
    },
    {
      name: "Evaporators",
      desc: "Efficient evaporators for uniform cooling and superior temperature control.",
      image: "/images/evaporator.png",
      category: "evaporators",
    },
    {
      name: "Condensing Units",
      desc: "Robust condensing units designed for maximum efficiency and durability.",
      image: "/images/condensing_unit.png",
      category: "condensers",
    },
    {
      name: "Control Panels",
      desc: "Smart control panels for accurate monitoring and seamless operations.",
      image: "/images/control_panel_unit.png",
      category: "controllers",
    },
    {
      name: "Cold Room Doors",
      desc: "Strong, insulated doors for energy efficiency, safety, and durability.",
      image: "/images/cold_room_door.png",
      category: "doors",
    },
    {
      name: "Doors & Hardware",
      desc: "Premium quality hardware for smooth operation and long life.",
      image: "/images/doors_hardware.png",
      category: "hardware",
    },
    {
      name: "Copper Piping",
      desc: "High-grade copper pipes for efficient heat transfer and durability.",
      image: "/images/copper_piping.png",
      category: "piping",
    },
    {
      name: "Electrical Systems",
      desc: "Reliable electrical systems and wiring for safe and efficient operations.",
      image: "/images/electrical_systems.png",
      category: "electrical",
    },
    {
      name: "Refrigeration Accessories",
      desc: "Complete range of accessories for installation, control and maintenance.",
      image: "/images/refrigeration_accessories.png",
      category: "accessories",
    },
    {
      name: "Insulation Materials",
      desc: "High-quality insulation materials for maximum thermal efficiency.",
      image: "/images/insulation_materials.png",
      category: "insulation",
    },
    {
      name: "Spare Parts",
      desc: "Genuine spare parts to keep your systems functioning smoothly.",
      image: "/images/spare_parts.png",
      category: "spares",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

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
            <span className="text-slate-300">Products &amp; Components</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            Products & <span className="text-blue-400">Components</span>
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-200/90 leading-relaxed">
            High-quality components and materials that ensure efficiency,
            durability and unmatched performance in every cold chain solution.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-2 text-[10px] font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-400" /> Premium Quality
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-blue-400" /> High Performance
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-400" /> Long Life
            </span>
            <span className="flex items-center gap-1.5">
              <Snowflake className="h-4 w-4 text-blue-400" /> Energy Efficient
            </span>
          </div>
        </div>
      </section>

      {/* Categories Sidebar & Grid layout split */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              OUR PRODUCT RANGE
            </span>
            <h2 className="text-2xl font-bold text-[#0c2340] font-display">
              Premium Components for Reliable Cold Chain Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Sidebar menu on left */}
            {/* Sidebar menu on left (Desktop only) */}
            <div className="hidden lg:block rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden divide-y divide-slate-100 lg:sticky lg:top-24 z-20">
              <div className="p-4 bg-[#0C2340] text-white font-bold text-xs uppercase font-mono tracking-wider">
                Product Categories
              </div>
              <div className="flex flex-col text-xs font-semibold text-slate-600">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left py-3 px-4 flex items-center justify-between transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-bold border-l-4 border-blue-600"
                          : "hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Horizontal scrolling tabs (Mobile only) */}
            <div className="lg:hidden w-full overflow-x-auto flex gap-2 pb-4 -mx-4 px-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap border transition-all ${
                      isActive
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                        : "bg-slate-50 border-slate-100 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Products grid on right */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 perspective-1000">
                {filteredProducts.map((p, idx) => (
                  <motion.div
                    role="button"
                    tabIndex={0}
                    key={idx}
                    initial={{ opacity: 0, y: 40, rotateX: 12 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: (idx % 3) * 0.08,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: -6,
                      scale: 1.03,
                      rotateY: -2,
                      boxShadow:
                        "0 20px 25px -5px rgba(24, 95, 165, 0.08), 0 10px 10px -5px rgba(24, 95, 165, 0.03)",
                    }}
                    onClick={() => setActiveComingSoonProduct(p.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveComingSoonProduct(p.name);
                      }
                    }}
                    className="group rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm transition-all duration-300 flex flex-col justify-between preserve-3d cursor-pointer text-left"
                  >
                    <div>
                      {/* Thumbnail photo */}
                      <div className="relative h-44 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-106"
                        />
                      </div>
                      <div className="p-5 space-y-2.5">
                        <h3 className="text-sm font-bold text-[#0c2340] font-display">
                          {p.name}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-body">
                          {p.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 mt-auto">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveComingSoonProduct(p.name);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveComingSoonProduct(p.name);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-500 transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Ribbon */}
      <section className="bg-slate-50 border-t border-slate-100 py-8 relative z-10 text-[#0C2340]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between gap-6 text-center text-xs font-bold font-mono">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" /> Premium Quality
            Materials
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" /> Tested for
            Maximum Performance
          </span>
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" /> Energy Efficient Solutions
          </span>
          <span className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" /> Long Lasting Durability
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" /> Trusted by Industries
          </span>
        </div>
      </section>

      {/* Bottom CTA Ribbon */}
      <section className="py-12 bg-[#0C2340] text-white border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold font-display">
              Need Help Choosing the Right Product?
            </h3>
            <p className="text-xs text-slate-300">
              Our experts are here to help you build the perfect cold chain
              solution.
            </p>
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

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {activeComingSoonProduct !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 select-none"
            onClick={() => setActiveComingSoonProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-md w-full rounded-2xl border border-white/10 bg-[#0C2340]/95 p-6 sm:p-8 text-center shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button top right */}
              <button
                onClick={() => setActiveComingSoonProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Snowflake className="h-7 w-7 animate-spin-slow" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  EXQUISITE COMPONENT LAUNCH
                </span>
                <h3 className="text-xl font-extrabold text-white font-display tracking-tight uppercase">
                  {activeComingSoonProduct}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  Our state-of-the-art cold chain product range is currently
                  undergoing final quality benchmarks and will be available
                  soon.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveComingSoonProduct(null)}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-xs font-bold text-white transition-all active:scale-95 shadow-md"
                >
                  Acknowledge &amp; Return
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
