"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Search,
  BookOpen,
  Clock,
  Tag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import initialBlogs from "@/data/blogs.json";

interface Article {
  title: string;
  keyword: string;
  type: string;
  category: string;
  readTime: string;
  summary: string;
  slug: string;
  image?: string;
  contentImage?: string;
}

export default function BlogIndexPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [articles, setArticles] = useState<Article[]>(initialBlogs as Article[]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/admin");
        const json = await res.json();
        if (json.success && json.data.blogs) {
          setArticles(json.data.blogs);
        }
      } catch (err) {
        console.error("Error fetching blogs from API, falling back to static files:", err);
      }
    }
    fetchBlogs();
  }, []);

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
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-slate-300">Knowledge Center</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            ThermoVault <span className="text-blue-400">Blog & Insights</span>
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-200/90 leading-relaxed">
            Read engineering guides, subsidy checklists, and thermal calculation
            resources curated by design draftsman teams.
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
                onClick={() => setFilter(btn.id)}
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
                  className="group rounded-2xl border border-slate-100 bg-white overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                >
                  <div className="space-y-4">
                    {/* Banner Image */}
                    {art.image && (
                      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={art.image} 
                          alt={art.title} 
                          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute top-3 left-3 bg-[#0c2340]/90 text-white text-[8px] font-bold font-mono px-2 py-0.5 rounded border border-white/10 uppercase">
                          {art.type}
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3 text-[9px] font-mono text-slate-400 border-b border-slate-100 pb-2">
                        <span className="flex items-center gap-1 capitalize">
                          <Tag className="h-3 w-3 text-blue-600" />
                          {art.category}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {art.readTime}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-[#0c2340] group-hover:text-blue-600 transition-colors font-display leading-snug line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                      <div className="text-[10px] text-blue-600 font-mono bg-blue-50/50 p-2 rounded-lg border border-blue-100/50 select-all">
                        SEO Keyword: {art.keyword}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-slate-100">
                      <Link
                        href={`/blog/${art.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        <span>Read Full Insight</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <div className="text-xs font-semibold">
                No insights match your filter criteria.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
