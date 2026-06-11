"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import initialPages from "@/data/pages.json";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Sparkles,
  GraduationCap,
  Settings,
  HeartHandshake,
  ChevronDown,
  Building,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JobRole {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  experience: string;
  desc: string;
  responsibilities: string[];
  requirements: string[];
}

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Engineering" | "Sales" | "Operations"
  >("All");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "Thermal Sizing Engineer (HVAC/R)",
    resumeFile: null as File | null,
    coverNote: "",
  });

  const formRef = useRef<HTMLDivElement | null>(null);

  const [careersData, setCareersData] = useState(initialPages.careers);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const res = await fetch("/api/admin");
        const json = await res.json();
        if (json.success && json.data.pages?.careers) {
          setCareersData(json.data.pages.careers);
        }
      } catch (err) {
        console.error("Error fetching careers page data:", err);
      }
    }
    fetchPageData();
  }, []);

  const jobs: JobRole[] = careersData.jobs;

  const filteredJobs =
    activeTab === "All" ? jobs : jobs.filter((j) => j.dept === activeTab);

  const handleApplyClick = (jobTitle: string) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSent(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "Thermal Sizing Engineer (HVAC/R)",
          resumeFile: null,
        coverNote: "",
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Navbar />

      {/* Hero Header with image background */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-24 text-white overflow-hidden"
        style={{ backgroundImage: "url('/images/hero_background.png')" }}
      >
        {/* Dark Navy Tint Overlay & cyber grids */}
        <div className="absolute inset-0 bg-[#0C2340]/80 z-0" />
        <div className="absolute inset-0 cyber-grid opacity-[0.12] z-0" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 z-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider text-cyan-light font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-slate-300">Careers</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display leading-tight max-w-3xl">
            {careersData.hero_title.startsWith("Build the Future of") ? (
              <>
                Build the Future of <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 font-extrabold">
                  {careersData.hero_title.replace("Build the Future of", "").trim()}
                </span>
              </>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 font-extrabold">
                {careersData.hero_title}
              </span>
            )}
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-200/90 leading-relaxed font-body whitespace-pre-wrap">
            {careersData.hero_description}
          </p>
        </div>
      </section>

      {/* Cultural Value Cards Section */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
              WORK CULTURE AT THERMOVAULT
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0c2340] font-display">
              Why Engineers Thrive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                With Us
              </span>
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
              We blend structural physics, thermal sciences, and live telemetry
              databases to build robust thermal enclosures that protect critical
              inventories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Engineering Excellence */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 space-y-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Settings className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0c2340] font-display">
                Precision & Innovation
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We reject generic shortcuts. We size heat loads systematically,
                write customized system loops, and build IoT systems that
                safeguard operations.
              </p>
            </motion.div>

            {/* Post Harvest Waste Impact */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 space-y-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0c2340] font-display">
                Real-World Sustainability
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                By optimizing temperature holding zones, our projects directly
                help farmers reduce post-harvest waste and ensure vital vaccines
                remain active.
              </p>
            </motion.div>

            {/* Collaborative learning */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 space-y-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0c2340] font-display">
                Growth & Ownership
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Located at post Kadadhe Colony Rajgurunagar, Pune, we offer flat
                hierarchy networks where trainees and senior engineers align to
                design and deliver.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers listings and filtering */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100 relative">
        <div className="absolute inset-0 cyber-grid opacity-[0.05] pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">
                CURRENT OPPORTUNITIES
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#0c2340] font-display">
                Open Positions
              </h2>
            </div>

            {/* Department filters */}
            <div className="flex flex-wrap gap-2">
              {(["All", "Engineering", "Sales", "Operations"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setExpandedJob(null);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      activeTab === tab
                        ? "bg-[#0C2340] text-white shadow-sm"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Job cards stack */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 text-slate-400">
                <Briefcase className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-medium">
                  No open positions matching this filter currently.
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isExpanded = expandedJob === job.id;
                return (
                  <div
                    key={job.id}
                    className="rounded-2xl border border-slate-200/60 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Header trigger block */}
                    <div
                      onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                      className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors select-none"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-600 uppercase">
                            {job.dept}
                          </span>
                          <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                            {job.type}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#0c2340] font-display">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />{" "}
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />{" "}
                            Experience: {job.experience}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyClick(job.title);
                          }}
                          className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-bold transition-all hover:scale-103 active:scale-95 shadow-sm"
                        >
                          Apply Now
                        </button>
                        <span className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                          <ChevronDown
                            className={`h-4.5 w-4.5 transition-transform duration-300 ${isExpanded ? "rotate-180 text-blue-600" : ""}`}
                          />
                        </span>
                      </div>
                    </div>

                    {/* Expandable detailed block */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-slate-100 space-y-6 pt-5 bg-white text-xs">
                            <p className="text-slate-600 leading-relaxed font-body">
                              {job.desc}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Responsibilities list */}
                              <div className="space-y-3">
                                <h4 className="font-extrabold text-[#0c2340] font-display flex items-center gap-1">
                                  <Building className="h-4 w-4 text-blue-600" />{" "}
                                  Key Responsibilities
                                </h4>
                                <ul className="space-y-2 text-slate-600 leading-relaxed">
                                  {job.responsibilities.map((resp, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Requirements list */}
                              <div className="space-y-3">
                                <h4 className="font-extrabold text-[#0c2340] font-display flex items-center gap-1">
                                  <GraduationCap className="h-4 w-4 text-blue-600" />{" "}
                                  Qualifications & Skills
                                </h4>
                                <ul className="space-y-2 text-slate-600 leading-relaxed">
                                  {job.requirements.map((req, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Application intake Form section */}
      <section ref={formRef} className="py-24 bg-white scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-lg relative overflow-hidden">
            {/* Grid mesh styling */}
            <div className="absolute inset-0 bg-[radial-gradient(#00000002_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2 mb-8 text-center sm:text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
                TALENT INTAKE FORM
              </span>
              <h3 className="text-2xl font-bold text-[#0c2340] font-display">
                Submit Your Application
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-body">
                Please complete the form below. Our HR and technical design
                managers review applications weekly.
              </p>
            </div>

            {formSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-blue-100 bg-blue-50/50 p-8 text-center space-y-4"
              >
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-[#0c2340]">
                  Application Successfully Submitted!
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto font-body">
                  Thank you for your interest in ThermoVault Systems. Our
                  recruiting team will review your credentials and contact you
                  directly if there is an engineering match.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className="space-y-5 relative z-10"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] text-slate-500 font-mono block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner focus:shadow-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-500 font-mono block mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner focus:shadow-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] text-slate-500 font-mono block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. rahul@example.com"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner focus:shadow-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-500 font-mono block mb-1">
                      Target Position
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner focus:shadow-none"
                    >
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                      <option value="Other / General Application">
                        Other / General Application
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-slate-500 font-mono block mb-1">
                    Resume / CV (Upload)
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                      setFormData({ ...formData, resumeFile: file });
                    }}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner focus:shadow-none"
                  />
                  {formData.resumeFile && (
                    <div className="text-[9px] text-slate-500 mt-1">
                      Selected: {formData.resumeFile.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[9px] text-slate-500 font-mono block mb-1">
                    Statement of Interest (Optional)
                  </label>
                  <textarea
                    value={formData.coverNote}
                    onChange={(e) =>
                      setFormData({ ...formData, coverNote: e.target.value })
                    }
                    placeholder="Share a brief overview of your thermal design experience or projects completed..."
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all h-24 resize-none shadow-inner focus:shadow-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 py-4 text-xs font-bold text-white transition-all active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>
                    {isSubmitting
                      ? "Submitting Application..."
                      : "Submit Application Package"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
