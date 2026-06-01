"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  Calculator,
  FileCheck,
  Sliders,
  Send,
  Sparkles,
} from "lucide-react";

export default function SubsidyPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    state: "Maharashtra",
    areaType: "Rural",
    bizType: "Farmer / FPO",
    capacity: "5-20 MT",
    name: "",
    phone: "",
  });
  const [calculationResult, setCalculationResult] = useState<{
    scheme: string;
    percentage: string;
    description: string;
  } | null>(null);
  const [consultationSent, setConsultationSent] = useState(false);

  const states = [
    "Maharashtra",
    "Gujarat",
    "Karnataka",
    "Madhya Pradesh",
    "Himachal Pradesh",
    "Other State",
  ];
  const areaTypes = ["Urban", "Suburban", "Rural"];
  const bizTypes = [
    "Farmer / FPO",
    "Dairy Cooperative",
    "Private Cold Store Enterprise",
    "Food Processor / Exporter",
  ];
  const capacities = [
    "Below 5 MT",
    "5-20 MT",
    "20-50 MT",
    "50-100 MT",
    "Above 100 MT",
  ];

  const handleCalculate = () => {
    let percentage = "35% - 50%";
    let scheme = "MIDH (Horticulture Development)";
    let desc =
      "Standard credit-linked back-ended capital subsidy for cold storage enclosures.";

    // Settle rates depending on areaType and categories
    if (form.areaType === "Urban") {
      percentage = "15%";
      scheme = "PMEGP / PMFME Urban Subsidy Support";
      desc = "Standard urban area capital subsidy under self-employment incentives.";
    } else if (form.areaType === "Suburban") {
      percentage = "16% - 34%";
      scheme = "PMKSY / MIDH Semi-Urban Cold Chain Support";
      desc = "Semi-urban cold chain creation and preservation infrastructure support.";
    } else {
      // Rural
      if (form.bizType === "Farmer / FPO") {
        percentage = "50%";
        scheme = "NHB (National Horticulture Board)";
        desc = "Special cooperative category subsidy matching farming producer groups in rural areas.";
      } else if (form.state === "Himachal Pradesh") {
        percentage = "50%";
        scheme = "MIDH Hilly State Scheme";
        desc = "Hilly state elevation rural capital grant for cold chain components.";
      } else {
        percentage = "35% - 50%";
        scheme = "NHB / MIDH Rural Cold Chain Support";
        desc = "Standard credit-linked rural back-ended capital grant matching cold rooms.";
      }
    }

    setCalculationResult({
      scheme,
      percentage,
      description: desc,
    });
    setStep(5); // Show results page (Step 5)
  };

  const handleRequestConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setConsultationSent(true);
  };

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
            <span className="text-slate-300">Government Subsidies</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            Cold Room <span className="text-blue-400">Capital Subsidies</span>
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-200/90 leading-relaxed">
            We guide you through credit-linked capital back-ended subsidies (up
            to 35% - 50%) under National Horticulture Mission (NHB) and NABARD
            schemes.
          </p>
        </div>
      </section>

      {/* Schemes overview & Interactive Checker Tool */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Schemes Overview */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono block">
                GRANTS OVERVIEW
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#0c2340] font-display">
                Active Capital Subsidy Schemes
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                The Indian Government, through the Department of Agriculture,
                encourages cold chain infrastructure setup to prevent food
                spoilage. Key active programs include:
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 space-y-2">
                  <div className="text-xs font-bold text-[#0c2340]">
                    NHB / MIDH Schemes
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Offers up to 35% subsidy for private developers, and up to
                    50% for scheduled tribal regions, hilly terrains, and
                    registered Farmer Producer Organizations (FPOs).
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 space-y-2">
                  <div className="text-xs font-bold text-[#0c2340]">
                    NABARD Sizing Fund
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Refinancing loans and direct subsidy allocation for milk
                    chilling centers, sorting-grading units, and large-scale
                    multi-chamber warehouses.
                  </p>
                </div>
              </div>
            </div>

            {/* Sizing Eligibility Checker Tool Wizard */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-md">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Calculator className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-bold text-[#0c2340] font-display">
                  Subsidy Eligibility Checker
                </h3>
              </div>

              {step <= 4 && (
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        s <= step ? "bg-blue-600" : "bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Step 1: State */}
              {step === 1 && (
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                    Select Installation State
                  </span>
                  <div className="space-y-2">
                    {states.map((st) => (
                      <button
                        key={st}
                        onClick={() => setForm({ ...form, state: st })}
                        className={`w-full text-left rounded-xl p-3 text-xs border font-medium transition-all ${
                          form.state === st
                            ? "bg-blue-50 border-blue-600 text-blue-600"
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Area Type */}
              {step === 2 && (
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                    Select Area Type
                  </span>
                  <div className="space-y-2">
                    {areaTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setForm({ ...form, areaType: type })}
                        className={`w-full text-left rounded-xl p-3 text-xs border font-medium transition-all ${
                          form.areaType === type
                            ? "bg-blue-50 border-blue-600 text-blue-600"
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Applicant Category */}
              {step === 3 && (
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                    Applicant Business Category
                  </span>
                  <div className="space-y-2">
                    {bizTypes.map((biz) => (
                      <button
                        key={biz}
                        onClick={() => setForm({ ...form, bizType: biz })}
                        className={`w-full text-left rounded-xl p-3 text-xs border font-medium transition-all ${
                          form.bizType === biz
                            ? "bg-blue-50 border-blue-600 text-blue-600"
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {biz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Capacity */}
              {step === 4 && (
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                    Chamber Storage Capacity
                  </span>
                  <div className="space-y-2">
                    {capacities.map((cap) => (
                      <button
                        key={cap}
                        onClick={() => setForm({ ...form, capacity: cap })}
                        className={`w-full text-left rounded-xl p-3 text-xs border font-medium transition-all ${
                          form.capacity === cap
                            ? "bg-blue-50 border-blue-600 text-blue-600"
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Results */}
              {step === 5 && calculationResult && (
                <div className="space-y-6">
                  <div className="text-center py-2">
                    <CheckCircle2 className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h4 className="text-sm font-bold text-[#0c2340] font-display">
                      Eligibility Sizing Result
                    </h4>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 space-y-3">
                    <div className="flex justify-between text-xs border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Matching Scheme:</span>
                      <span className="font-bold text-[#0c2340]">
                        {calculationResult.scheme}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-slate-100 pb-2">
                      <span className="text-slate-500">
                        Subsidy Percentage:
                      </span>
                      <span className="font-bold text-blue-600 font-mono">
                        {calculationResult.percentage}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed pt-1">
                      {calculationResult.description}
                    </p>

                    {/* Eligibility Notes */}
                    <div className="border-t border-dashed border-blue-200/60 pt-3 mt-3 space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Note — depends on eligibility criteria
                      </div>
                      <div className="flex gap-2.5 text-[9px] font-mono text-blue-600 font-extrabold">
                        <span>• PMJP</span>
                        <span>• PMFP</span>
                      </div>
                    </div>
                  </div>

                  {consultationSent ? (
                    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-center">
                      <CheckCircle2 className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-xs font-bold text-[#0c2340]">
                        Callback Request Logged
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                        A project engineer will contact you with DPR checklist
                        drafts.
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleRequestConsultation}
                      className="space-y-3 border-t border-slate-100 pt-4"
                    >
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                        Request Subsidy Sizing Consultation
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="rounded-lg bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Mobile Number"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className="rounded-lg bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-1 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white hover:bg-blue-500 transition-all shadow-sm"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Schedule Review Callback</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Wizard Footer controls */}
              {step <= 4 && (
                <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 pt-4">
                  {step > 1 && (
                    <button
                      onClick={() => setStep((prev) => prev - 1)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={
                      step === 4
                        ? handleCalculate
                        : () => setStep((prev) => prev + 1)
                    }
                    className="flex items-center gap-1 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 shadow-sm"
                  >
                    <span>{step === 4 ? "Calculate Grant" : "Continue"}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
