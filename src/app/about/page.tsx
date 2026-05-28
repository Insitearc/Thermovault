"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  Compass,
  UserCheck,
  Heart,
  Award,
  ArrowRight,
  Phone,
  MessageSquare,
  Users,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const stats = [
    { label: "Projects Completed", value: "200+", icon: ShieldCheck },
    { label: "Happy Clients", value: "100+", icon: Users },
    { label: "States Served", value: "15+", icon: MapPin },
    { label: "Years Experience", value: "10+", icon: Award },
    { label: "Support Available", value: "24/7", icon: Clock },
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
          <div className="flex items-center justify-center md:justify-start gap-1 text-[10px] font-bold uppercase tracking-wider text-teal-light font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Home &gt; About Us</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            About <span className="text-blue-400">ThermoVault Systems</span>
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-200/90 leading-relaxed">
            Engineering reliable cold chain and refrigeration solutions that
            power businesses, preserve quality, and build a stronger tomorrow.
          </p>
        </div>
      </section>

      {/* Navy Stats Ribbon */}
      <section className="bg-[#0C2340] text-white py-6 border-b border-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 p-2">
                <Icon className="h-5 w-5 text-blue-400" />
                <div className="text-2xl font-extrabold font-mono leading-none">
                  {stat.value}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story text */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
                OUR STORY
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#0c2340] font-display">
                Securing the Cold Chain{" "}
                <span className="text-blue-600">Ecosystem</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                ThermoVault Systems was founded with a simple mission - to
                deliver advanced, energy-efficient, and reliable cold chain and
                refrigeration solutions that help businesses grow without
                compromising on quality.
              </p>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                From modular cold rooms to complete industrial refrigeration
                systems, we design, build, and maintain solutions tailored to
                your unique requirements.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    const event = new CustomEvent("open-quote-modal");
                    window.dispatchEvent(event);
                  }}
                  className="rounded-md bg-[#0c2340] px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Sizable Image */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.99 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative h-[340px] rounded-2xl overflow-hidden border border-slate-100 shadow-md"
            >
              <Image
                src="/images/cold_room_modular.png"
                alt="Walk-in Cold Storage Room Installation"
                fill
                className="object-cover transition-transform will-change-transform"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Cards Section (Mission, Vision, Values, Why We Exist) */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm hover:shadow-lg transition-shadow cursor-default"
            >
              <h3 className="text-xs font-bold text-[#0c2340] font-display border-b border-slate-100 pb-2 uppercase tracking-wider">
                OUR MISSION
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  <span>
                    Design and deliver energy-efficient, reliable cold chain
                    solutions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  <span>
                    Minimize food and product wastage through precise
                    temperature control.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  <span>
                    Provide long-term support to maximize uptime and ROI for
                    clients.
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm hover:shadow-lg transition-shadow cursor-default"
            >
              <h3 className="text-xs font-bold text-[#0c2340] font-display border-b border-slate-100 pb-2 uppercase tracking-wider">
                OUR VISION
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  <span>
                    Be India's most trusted cold chain partner for businesses of
                    all sizes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  <span>
                    Champion sustainable refrigeration practices across
                    industries.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  <span>
                    Continuously innovate for higher efficiency and better
                    outcomes.
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm hover:shadow-lg transition-shadow cursor-default"
            >
              <h3 className="text-xs font-bold text-[#0c2340] font-display border-b border-slate-100 pb-2 uppercase tracking-wider">
                OUR VALUES
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />{" "}
                  Integrity & Transparency
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />{" "}
                  Quality & Excellence
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />{" "}
                  Customer First
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />{" "}
                  Innovation & Improvement
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />{" "}
                  Teamwork & Accountability
                </li>
              </ul>
            </motion.div>

            {/* Why We Exist */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm hover:shadow-lg transition-shadow cursor-default"
            >
              <h3 className="text-xs font-bold text-[#0c2340] font-display border-b border-slate-100 pb-2 uppercase tracking-wider">
                WHY WE EXIST
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  <span>
                    To solve real cold chain challenges with engineering
                    excellence.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  <span>
                    To help businesses preserve product quality and reduce
                    waste.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  <span>
                    To deliver scalable, maintainable solutions backed by
                    long-term support.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engineering Excellence Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo on the left */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.99 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative h-[360px] rounded-2xl overflow-hidden border border-slate-100 shadow-md"
            >
              <Image
                src="/images/amc_maintenance.png"
                alt="Engineers working on refrigeration control panel"
                fill
                className="object-cover transition-transform will-change-transform"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Text on the right */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
                ENGINEERING EXCELLENCE
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#0c2340] font-display">
                Built with <span className="text-blue-600">Precision.</span>
                <br />
                Delivered with <span className="text-blue-600">Pride.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Our skilled team, advanced technology, and strict quality
                control processes ensure every project is built to perform,
                built to last.
              </p>

              <div className="flex flex-wrap gap-6 pt-4 text-xs font-bold text-[#0c2340]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-blue-600" />{" "}
                  Experienced Engineers
                </span>
                <span className="flex items-center gap-1.5">
                  <Compass className="h-4.5 w-4.5 text-blue-600" /> Advanced
                  Technology
                </span>
                <span className="flex items-center gap-1.5">
                  <UserCheck className="h-4.5 w-4.5 text-blue-600" /> Quality
                  Assured
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Call-To-Action Ribbon */}
      <section className="py-12 bg-[#0C2340] text-white border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold font-display">
              Let's Build a Stronger Cold Chain Together.
            </h3>
            <p className="text-xs text-slate-300">
              Have a project in mind? Our experts are ready to help.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+918055010620"
              className="rounded-md bg-blue-600 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-blue-500 shadow-md active:scale-95"
            >
              Call Now: 80550 10620
            </a>

            <a
              href="https://wa.me/918055010620?text=Hi%20ThermoVault,%20I%20have%20a%20project%20inquiry."
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
