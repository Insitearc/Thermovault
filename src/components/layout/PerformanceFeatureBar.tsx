import React, { useEffect, useState } from "react";
import {
  Zap,
  Cpu,
  Clock,
  ShieldCheck,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const startAutoScroll = () => {
      if (!mobileQuery.matches) {
        return undefined;
      }

      return window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 2000);
    };

    let intervalId = startAutoScroll();

    const handleChange = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }

      intervalId = startAutoScroll();
    };

    mobileQuery.addEventListener("change", handleChange);

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }

      mobileQuery.removeEventListener("change", handleChange);
    };
  }, [features.length]);

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

        {/* Desktop View (md and up) */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 md:gap-8 items-center justify-center text-center divide-x divide-white/10">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group flex flex-col items-center gap-3.5 pt-0 ${
                  idx > 0 ? "pl-8" : ""
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

        {/* Mobile View (Below md) */}
        <div className="md:hidden flex flex-col items-center justify-center space-y-5">
          <div className="relative w-full flex items-center justify-between px-2 sm:px-6">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors active:scale-90"
              title="Previous Feature"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>

            {/* Slider Content */}
            <div className="flex-1 flex flex-col items-center text-center min-h-[120px] justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                      features[activeIndex].iconColor
                    } ${features[activeIndex].glow}`}
                  >
                    {React.createElement(features[activeIndex].icon, {
                      className: "h-5.5 w-5.5 text-inherit animate-pulse",
                    })}
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold text-white font-display tracking-wider uppercase">
                      {features[activeIndex].title}
                    </h4>
                    <p className="text-[10px] text-slate-300 font-mono tracking-normal leading-relaxed font-medium">
                      {features[activeIndex].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors active:scale-90"
              title="Next Feature"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-5 bg-blue-500" : "w-1.5 bg-white/20"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
