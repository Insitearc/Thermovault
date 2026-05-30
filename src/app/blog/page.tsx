"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, BookOpen, Clock, Tag, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  title: string;
  keyword: string;
  type: string;
  category: "technical" | "how-to" | "government" | "beginner";
  readTime: string;
  summary: string;
  slug: string;
}

export default function BlogIndexPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "technical" | "how-to" | "government" | "beginner">("all");

  const articles: Article[] = [
    {
      title: "What is a Cold Room & How Does It Work?",
      keyword: "cold room how it works India",
      type: "Beginner Guide",
      category: "beginner",
      readTime: "5 min read",
      summary: "Understand the fundamental thermodynamics and mechanical cycle of walk-in refrigeration units in India.",
      slug: "what-is-a-cold-room",
    },
    {
      title: "Cold Room Capacity Guide: How to Calculate Storage Needs",
      keyword: "cold room capacity calculator",
      type: "Intermediate Sizing",
      category: "how-to",
      readTime: "8 min read",
      summary: "Learn formulas to translate metric tons (MT) or pallet count into physical internal room sizing dimensions.",
      slug: "cold-room-capacity-guide",
    },
    {
      title: "PUF Panel Thickness Guide for Temperature Requirements",
      keyword: "PUF panel specifications cold room",
      type: "Technical Sizing",
      category: "technical",
      readTime: "6 min read",
      summary: "Explore thermal conductivity variables of 60mm, 80mm, 100mm, and 120mm cam-locked panels.",
      slug: "puf-panel-thickness-guide",
    },
    {
      title: "Government Subsidy for Cold Storage in India 2025",
      keyword: "cold storage subsidy India 2025",
      type: "Informational Guidelines",
      category: "government",
      readTime: "10 min read",
      summary: "Step-by-step documentation walkthrough to apply for 35% to 50% capital grants under NHM and MIDH.",
      slug: "government-subsidy-guide-2025",
    },
    {
      title: "Blast Chiller vs. Cold Room: Which Do You Need?",
      keyword: "blast chiller vs cold room",
      type: "Comparison Sizing",
      category: "technical",
      readTime: "7 min read",
      summary: "Differentiate between shock-freezing cooked items in 90 minutes and long-term bulk freezing chambers.",
      slug: "blast-chiller-vs-cold-room",
    },
    {
      title: "How to Maintain Your Cold Room: AMC Checklist",
      keyword: "cold room maintenance checklist",
      type: "How-to Maintenance",
      category: "how-to",
      readTime: "6 min read",
      summary: "Preventative checkups for compressor load current, fin spacing, evaporator fan coils, and door heaters.",
      slug: "cold-room-maintenance-amc-checklist",
    },
    {
      title: "Fruits Ripening Chamber: Complete Technical Sizing",
      keyword: "fruits ripening chamber India",
      type: "Technical Sizing",
      category: "technical",
      readTime: "9 min read",
      summary: "Designing automated ethylene gas chambers and forced-air flow designs for banana and mango ripening.",
      slug: "fruits-ripening-chamber-guide",
    },
    {
      title: "Cold Room for Dairy: Temperature Requirements Explained",
      keyword: "cold room dairy temperature",
      type: "Industry Sizing",
      category: "technical",
      readTime: "5 min read",
      summary: "Thermal thresholds for raw milk chilling depots and processed butter deep-freezing parameters.",
      slug: "cold-room-dairy-temperature-guide",
    },
    {
      title: "Refrigeration Compressor Types: Semi-hermetic vs Scroll",
      keyword: "refrigeration compressor types India",
      type: "Technical Sizing",
      category: "technical",
      readTime: "8 min read",
      summary: "Detailed efficiency comparisons of Copeland scroll and Bitzer semi-hermetic plants under high ambient temps.",
      slug: "compressor-scroll-vs-semi-hermetic",
    },
    {
      title: "Cold Room Installation Process: Step-by-Step",
      keyword: "cold room installation process",
      type: "How-to Construction",
      category: "how-to",
      readTime: "7 min read",
      summary: "Witness how our engineers assemble cam-locks, run vacuum piping checks, and run pull-down test calibrations.",
      slug: "cold-room-installation-process-step-by-step",
    },
  ];

  // Search and filter logic
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.keyword.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === "all" || art.category === filter;
    return matchesSearch && matchesCategory;
  });

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
            <span className="text-slate-300">Knowledge Center</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            ThermoVault <span className="text-blue-400">Blog & Insights</span>
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-200/90 leading-relaxed">
            Read engineering guides, subsidy checklists, and thermal calculation resources curated by design draftsman teams.
          </p>
        </div>
      </section>

      {/* Search Bar & Category Filters */}
      <section className="py-6 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search keyword (e.g. subsidy)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-white border border-slate-200 pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: "all", label: "All Posts" },
              { id: "technical", label: "Technical" },
              { id: "how-to", label: "How-to" },
              { id: "government", label: "Government" },
              { id: "beginner", label: "Beginner" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  filter === btn.id
                    ? "bg-[#0c2340] text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-20 bg-white flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((art) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={art.slug}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[9px] font-mono text-slate-400 border-b border-slate-100 pb-2">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-blue-600" />
                        {art.type}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#0c2340] group-hover:text-blue-600 transition-colors font-display leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{art.summary}</p>
                    <div className="text-[10px] text-blue-600 font-mono bg-blue-50/50 p-2 rounded-lg border border-blue-100/50 select-all">
                      SEO Keyword: {art.keyword}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href={`/blog/${art.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      <span>Read Full Insight</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <div className="text-xs font-semibold">No insights match your filter criteria.</div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
