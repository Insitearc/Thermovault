"use client";

import React from "react";
import { Zap, Cpu, Clock, ShieldCheck, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export default function PerformanceFeatureBar() {
  const features = [
    {
      title: "Energy Efficient",
      desc: "Up to 30% power savings",
      icon: Zap,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      glow: "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.25)] hover:border-emerald-400/30",
    },
    {
      title: "IoT Monitoring Ready",
      desc: "24/7 remote telemetry logs",
      icon: Cpu,
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      glow: "group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:border-cyan-400/30",
    },
    {
      title: "Fast Installation",
      desc: "Precision cam-lock panels",
      icon: Clock,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      glow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.25)] hover:border-amber-400/30",
    },
    {
      title: "Hygienic Design",
      desc: "Food-grade SS-304 sheets",
      icon: ShieldCheck,
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:border-blue-400/30",
    },
    {
      title: "After-Sales Support",
      desc: "Priority SLA AMC contracts",
      icon: HeartHandshake,
      iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      glow: "group-hover:shadow-[0_0_20px_rgba(251,113,133,0.25)] hover:border-rose-400/30",
    },
  ];

  return (
    <section className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-3xl border border-white/10 bg-[#0C2340]/75 p-6 md:p-8 shadow-2xl backdrop-blur-md overflow-hidden select-none"
      >
        {/* Neon linear scan border accent at the top */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        {/* Soft grid micro-dots background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center justify-center text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group flex flex-col items-center gap-3.5 pt-6 md:pt-0 first:pt-0 ${
                  idx > 0 ? "md:pl-8" : ""
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105 ${
                    item.iconColor
                  } ${item.glow}`}
                >
                  <Icon className="h-5.5 w-5.5 text-inherit animate-pulse" />
                </div>
                
                <div className="space-y-0.5">
                  <h4 className="text-xs font-extrabold text-white font-display tracking-wider uppercase group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-300 font-mono tracking-normal leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
