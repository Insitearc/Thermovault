"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerformanceFeatureBar from "@/components/layout/PerformanceFeatureBar";
import {
  Snowflake,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageSquare,
  Sparkles,
  Droplet,
  Flame,
  Apple,
  Fish,
  Pill,
  ShoppingCart,
  Phone,
  Settings,
  Monitor,
  Calendar,
  Wind,
  Wrench,
  Users,
  Ruler,
  Factory,
  Hammer,
  CheckSquare,
  HeartHandshake,
} from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCard {
  title: string;
  desc: string;
  image: string;
  slug: string;
  icon: React.ComponentType<any>;
}

interface IndustryCard {
  title: string;
  image: string;
  icon: React.ComponentType<any>;
  slug?: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
}

export default function ServicesPage() {
  const router = useRouter();

  // Carousel state for recent projects
  const [projectIndex, setProjectIndex] = useState(0);
  const projectImages = [
    "/images/cold_room_modular.png",
    "/images/refrigeration_system.png",
    "/images/display_cold_room.png",
    "/images/amc_maintenance.png",
  ];

  const handleNextProject = () => {
    setProjectIndex((prev) => (prev + 1) % projectImages.length);
  };

  const handlePrevProject = () => {
    setProjectIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length,
    );
  };

  const services: ServiceCard[] = [
    {
      title: "Modular Cold Rooms",
      desc: "Custom-built cold rooms for any temperature ranges with PUF panels and precision engineering.",
      image: "/images/cold_room_modular.png",
      slug: "modular-cold-rooms",
      icon: Snowflake,
    },
    {
      title: "Refrigeration Systems",
      desc: "High-performance refrigeration systems for industrial and commercial applications.",
      image: "/images/refrigeration_system.png",
      slug: "refrigeration-systems",
      icon: Settings,
    },
    {
      title: "Display Cold Rooms",
      desc: "Perfect storage and display solutions for supermarkets, retailers & food businesses.",
      image: "/images/display_cold_room.png",
      slug: "display-cold-rooms",
      icon: Monitor,
    },
    {
      title: "Clean Rooms",
      desc: "ISO-compliant sterile chambers engineered with HEPA filtration, differential pressure controls, and magnetic airlocks.",
      image: "/images/industry_pharma.png",
      slug: "clean-rooms",
      icon: ShieldCheck,
    },
    {
      title: "Fruits Ripening Chambers",
      desc: "Controlled atmosphere ripening chambers for bananas, mangoes & more.",
      image: "/images/ripening_chamber.png",
      slug: "ripening-chambers",
      icon: Calendar,
    },
    {
      title: "Blast Chillers",
      desc: "Rapid cooling & freezing solutions to lock freshness and extend shelf life.",
      image: "/images/blast_chiller.png",
      slug: "blast-chillers",
      icon: Wind,
    },
    {
      title: "Consultation & Sizing",
      desc: "Precision thermal load calculations, custom airflow design, and bankable DPR subsidy planning.",
      image: "/images/technician.png",
      slug: "consultation",
      icon: Ruler,
    },
    {
      title: "AMC & Maintenance",
      desc: "Annual maintenance contracts for optimal performance and longer equipment life.",
      image: "/images/amc_maintenance.png",
      slug: "amc",
      icon: Wrench,
    },
  ];

  const industries: IndustryCard[] = [
    {
      title: "Dairy & Milk Products",
      image: "/images/industry_dairy.png",
      icon: Droplet,
      slug: "dairy-milk-products",
    },
    {
      title: "Meat & Poultry",
      image: "/images/industry_meat.png",
      icon: Flame,
      slug: "meat-poultry",
    },
    {
      title: "Fruits & Vegetables",
      image: "/images/industry_fruits.png",
      icon: Apple,
      slug: "fruits-vegetables",
    },
    {
      title: "Seafood & Fish",
      image: "/images/industry_seafood.png",
      icon: Fish,
      slug: "seafood-fish",
    },
    {
      title: "Pharmaceuticals",
      image: "/images/industry_pharma.png",
      icon: Pill,
      slug: "pharmaceuticals",
    },
    {
      title: "Last Mile & Dark Store",
      image: "/images/industry_retail.png",
      icon: ShoppingCart,
      slug: "last-mile-dark-store",
    },
  ];

  const processSteps: ProcessStep[] = [
    {
      step: "01",
      title: "Consultation",
      desc: "We understand your requirements and site conditions.",
      icon: Users,
    },
    {
      step: "02",
      title: "Planning & Design",
      desc: "Our experts create the best solution plan for your needs.",
      icon: Ruler,
    },
    {
      step: "03",
      title: "Manufacturing",
      desc: "Precision manufacturing using premium quality materials.",
      icon: Factory,
    },
    {
      step: "04",
      title: "Installation",
      desc: "Professional installation by skilled technical team.",
      icon: Hammer,
    },
    {
      step: "05",
      title: "Testing & Handover",
      desc: "Rigorous testing and quality check before project handover.",
      icon: CheckSquare,
    },
    {
      step: "06",
      title: "After Sales Support",
      desc: "We ensure long-term support and maintenance when you need us.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white text-slate-800 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Header Navbar */}
      <Navbar />

      {/* Split Hero Banner */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 bg-[#0C2340] text-white overflow-hidden min-h-[460px] items-center perspective-2000">
        {/* Diagonal styling accent & cyber-grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] opacity-40 z-0" />
        <div className="absolute inset-0 cyber-grid opacity-[0.1] z-0" />

        {/* Left Side Content */}
        <div className="relative px-6 py-16 sm:px-12 lg:px-20 z-10 space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
            <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-blue-300">Services</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display leading-[1.1]">
            Our Cold Chain
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Solutions
            </span>
          </h1>

          <p className="max-w-md text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
            End-to-end cold storage and refrigeration solutions engineered for
            high performance, thermal integrity, and seamless IoT telemetry.
          </p>

          {/* 4 Feature Items */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-[10px] font-bold text-slate-200">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <span>Custom Built Solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <span>Energy Efficient</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <span>Hygienic & Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <Wrench className="h-3.5 w-3.5" />
              </div>
              <span>Reliable Performance</span>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-64 lg:h-full min-h-[300px] w-full self-stretch lg:border-l lg:border-white/5 preserve-3d"
        >
          <Image
            src="/images/cold_room_modular.png"
            alt="Cold storage room installation"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {/* Neon grid scan line */}
          <div className="absolute inset-y-0 left-0 w-[2px] bg-blue-500/30 shadow-neon-blue pointer-events-none" />
        </motion.div>
      </section>

      {/* Complete Range of Cold Chain Solutions */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-1/4 left-0 w-80 h-80 cyber-grid opacity-[0.04] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
              WHAT WE BUILD
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c2340] font-display">
              Complete Range of Cold Chain Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 perspective-1000">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              const to = `/services/${svc.slug}`;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow:
                      "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
                  }}
                  onClick={() => router.push(to)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") router.push(to);
                  }}
                  role="link"
                  tabIndex={0}
                  className="group rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm transition-all duration-300 flex flex-col justify-between preserve-3d cursor-pointer"
                >
                  <div>
                    {/* Top Image */}
                    <div className="relative h-44 w-full bg-slate-50 overflow-hidden">
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {/* Content Section */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="text-sm font-bold text-[#0c2340] font-display">
                          {svc.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-body min-h-[64px]">
                        {svc.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions for Every Industry */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 relative">
        <div className="absolute inset-0 cyber-grid opacity-[0.05] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c2340] font-display">
              Solutions for Every Industry
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-body">
              We deliver customized cold chain solutions for businesses of every
              size and industry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 perspective-1000">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              const hasLink = !!ind.slug;
              const to = ind.slug ? `/services/${ind.slug}` : "";
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={hasLink ? { y: -6, scale: 1.04, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)" } : { y: -6, scale: 1.04 }}
                  onClick={() => hasLink && router.push(to)}
                  onKeyDown={(e) => {
                    if (hasLink && e.key === "Enter") router.push(to);
                  }}
                  role={hasLink ? "link" : undefined}
                  tabIndex={hasLink ? 0 : undefined}
                  className={`rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col items-center text-center space-y-4 hover:shadow-md transition-all duration-300 preserve-3d group ${
                    hasLink ? "cursor-pointer hover:border-blue-200" : "cursor-default"
                  }`}
                >
                  {/* Rounded image container */}
                  <div className="relative h-24 w-full rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={ind.image}
                      alt={ind.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                  </div>

                  {/* Circular Icon */}
                  <div className="-mt-9 relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md border-2 border-white transition-colors group-hover:bg-blue-700">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="text-[11px] font-bold text-[#0c2340] leading-snug font-display transition-colors group-hover:text-blue-600">
                    {ind.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process: How We Work */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="absolute bottom-10 right-0 w-80 h-80 cyber-grid opacity-[0.04] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
              OUR PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0c2340] font-display">
              How We Work
            </h2>
          </div>

          {/* Timeline Row */}
          <div className="relative perspective-1000">
            {/* Connecting dashed line for desktop */}
            <div className="absolute top-8 left-12 right-12 h-0.5 border-t-2 border-dashed border-slate-200 hidden lg:block z-0" />

            {/* Animated gradient progress overlay (subtle) */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-8 left-12 h-1 z-0 rounded-full overflow-hidden hidden lg:block"
            >
              <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 opacity-90" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, rotateY: 15 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    whileHover={{ scale: 1.04, y: -6 }}
                    whileTap={{ scale: 0.995 }}
                    className="relative group flex flex-col items-center text-center space-y-4 preserve-3d focus:outline-none cursor-default"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        (e.currentTarget as any).click && (e.currentTarget as any).click();
                      }
                    }}
                  >
                    {/* small connector to main dashed line (desktop only) */}
                    <div className="hidden lg:block absolute -top-4 left-1/2 transform -translate-x-1/2 h-4 w-0.5 bg-slate-200 transition-colors group-hover:bg-blue-600" />

                    {/* Circle Icon Wrapper with pulsing halo on first render */}
                    <div className="relative">
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0.45 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.1, delay: idx * 0.12, ease: "easeOut" }}
                        className="absolute -inset-2 rounded-full bg-blue-400/30 blur-md pointer-events-none"
                      />

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-slate-200 text-slate-600 transition-all duration-300 shadow-sm transform group-hover:scale-105 group-hover:border-blue-600 group-hover:text-blue-600">
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold font-mono text-blue-600 uppercase tracking-wide">
                        Step {step.step}
                      </div>
                      <h4 className="text-sm font-bold text-[#0c2340] font-display transition-all duration-200 group-hover:scale-105">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed px-2 font-body max-w-[16rem]">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects & Testimonials (Side by side) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Projects Slider */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
                OUR RECENT PROJECTS
              </span>
              <h2 className="text-2xl font-bold text-[#0c2340] font-display">
                Built with Precision.
                <br />
                Delivered with Pride.
              </h2>
            </div>

            {/* Image display with navigation buttons */}
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm mt-4">
              <Image
                src={projectImages[projectIndex]}
                alt="Recent Project Showcase"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Slider controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={handlePrevProject}
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-[#0c2340] shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNextProject}
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-[#0c2340] shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Testimonial Box */}
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm flex flex-col justify-between space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
                WHAT OUR CLIENTS SAY
              </span>
              <h3 className="text-xl font-bold text-[#0c2340] font-display">
                Trusted by Businesses Across India
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-500 text-transparent"
                  />
                ))}
              </div>

              <blockquote className="text-sm text-slate-600 leading-relaxed italic">
                "ThermoVault Systems delivered a top-quality cold room for our
                dairy unit. Excellent build quality, on-time delivery and great
                after-sales support."
              </blockquote>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="text-xs font-bold text-[#0c2340]">
                Rahul Deshmukh
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Dairy Farm Owner, Pune
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Sizing CTA Intake */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0c2340] text-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-lg font-extrabold">
                Ready to build your cold chain?
              </h3>
              <p className="text-xs text-slate-200 max-w-xl">
                Get a free consultation and tailored quote from our engineering
                team.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/contact"
                className="rounded-md bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:scale-103 transition-transform"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-white/20 px-6 py-3 text-sm font-bold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern & Premium Performance / Feature Bar */}
      <div className="py-12 border-t border-slate-100 bg-slate-50">
        <PerformanceFeatureBar />
      </div>

      <Footer />
    </div>
  );
}
