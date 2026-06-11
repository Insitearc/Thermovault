"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  BookOpen,
  Clock,
  Tag,
  ChevronLeft,
  Send,
  CheckCircle2,
} from "lucide-react";
import initialBlogs from "@/data/blogs.json";

interface PostData {
  slug: string;
  title: string;
  keyword: string;
  type: string;
  readTime: string;
  intro: string;
  section1Title: string;
  section1Body: string;
  section2Title: string;
  section2Body: string;
  image?: string;
  contentImage?: string;
}

export default function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [blogs, setBlogs] = useState<PostData[]>(initialBlogs as PostData[]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/admin");
        const json = await res.json();
        if (json.success && json.data.blogs) {
          setBlogs(json.data.blogs);
        }
      } catch (err) {
        console.error("Error fetching blogs from API, falling back to static files:", err);
      }
    }
    fetchBlogs();
  }, []);

  const post = blogs.find((b) => b.slug === slug) || blogs[0] || {
    title: "Not Found",
    keyword: "",
    type: "Guide",
    readTime: "N/A",
    intro: "Post not found.",
    section1Title: "",
    section1Body: "",
    section2Title: "",
    section2Body: "",
  };

  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Navbar />

      {/* Main Page Area */}
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Knowledge Center</span>
        </Link>

        {/* Dynamic Post Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Post Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[9px] font-mono text-slate-400 border-b border-slate-100 pb-3">
                <span className="flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5 text-blue-600" />
                  {post.type}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-[#0c2340]">
                {post.title}
              </h1>

              <div className="text-[10px] text-blue-600 font-mono bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/50 select-all inline-block">
                SEO Keyword: {post.keyword}
              </div>
            </div>

            {/* Banner Image */}
            {post.image && (
              <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} className="object-cover h-full w-full" />
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
              <p className="text-slate-800 font-medium leading-relaxed">
                {post.intro}
              </p>

              <h2 className="text-sm font-bold text-[#0c2340] font-display uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-2 pt-4">
                {post.section1Title}
              </h2>
              <p>{post.section1Body}</p>

              {/* Content Inline Image */}
              {post.contentImage && (
                <div className="relative h-48 sm:h-80 w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-900 my-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.contentImage} alt={post.section2Title || "Content Image"} className="object-cover h-full w-full" />
                </div>
              )}

              <h2 className="text-sm font-bold text-[#0c2340] font-display uppercase tracking-wider text-blue-600 border-b border-slate-100 pb-2 pt-4">
                {post.section2Title}
              </h2>
              <p>{post.section2Body}</p>
            </div>
          </div>

          {/* Quick Intake card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md h-fit">
            <h3 className="text-sm font-bold text-[#0c2340] mb-2 font-display">
              Ask an Engineer
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Have questions regarding thermal sizing or subsidy document
              compliance? Request call.
            </p>

            {formSent ? (
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-blue-600 mx-auto" />
                <h4 className="text-xs font-bold text-[#0c2340]">
                  Callback Request Logged
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Our project engineer will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAskSubmit} className="space-y-3">
                <div>
                  <label className="text-[9px] text-slate-500 font-mono block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kuldeep"
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 font-mono block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 80550 10620"
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white hover:bg-blue-500 transition-all shadow-sm"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Request Callback</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
