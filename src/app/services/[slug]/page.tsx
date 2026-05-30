"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Snowflake,
  ShieldCheck,
  Thermometer,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
} from "lucide-react";

interface ServiceDetail {
  title: string;
  tempRange: string;
  specs: string[];
  industries: string[];
  detailedDesc: string;
}

const serviceDb: Record<string, ServiceDetail> = {
  "modular-cold-rooms": {
    title: "Modular Cold Rooms Sizing",
    tempRange: "-25°C to +15°C",
    specs: [
      "Cam-locked high density PUF panels (120mm core thickness).",
      "Tongue-and-groove joint fittings matching vapor barrier rules.",
      "Pre-insulated floor panels with heavy-duty aluminum chequered plates.",
      "Pressure relief valves for extreme low-temperature adjustments.",
    ],
    industries: [
      "Dairy processing units",
      "Agricultural warehouses",
      "Frozen food processing plants",
      "Logistics hubs",
    ],
    detailedDesc:
      "Walk-in modular cold storage rooms engineered for agricultural cooperatives, pharmaceutical warehousing, and wholesale dairy distributors. The cam-locked joints enable modular rigging and future volume expansions without panel loss.",
  },
  "refrigeration-systems": {
    title: "Refrigeration Plant Engineering",
    tempRange: "Varies by TR Load",
    specs: [
      "Scroll and semi-hermetic compressor units (Copeland, Bitzer).",
      "Air-cooled coaxial condensing grids or shell-and-tube water condensers.",
      "Refrigerant options matching low-GWP criteria (R404A, R134a, R448A).",
      "Anti-vibration compressor mounts and dual high/low pressure cut-out grids.",
    ],
    industries: [
      "Industrial cold stores",
      "Chemical plants",
      "Slaughterhouses",
      "Ripening depots",
    ],
    detailedDesc:
      "Complete compression refrigeration systems designed to operate under tropical conditions. Our condensing plants feature compressor protection circuits to withstand voltage fluctuations commonly found in rural grids.",
  },
  "display-cold-rooms": {
    title: "Glass Display Cold Rooms",
    tempRange: "0°C to +8°C",
    specs: [
      "Heated double-pane glass doors (prevents external condensation).",
      "Integrated vertical LED light strips with soft diffuser profiles.",
      "Adjustable wire shelving grids (white epoxy dust-resistant coating).",
      "Gravity air coolers minimizing air movement to preserve fresh items.",
    ],
    industries: [
      "Supermarkets & Hypermarkets",
      "Organic retail shops",
      "Hotels & Bakeries",
      "Florists",
    ],
    detailedDesc:
      "Premium walk-in glass display cold storage rooms that bridge client display with storage needs. Perfect for beer cells, floriculture merchandising, and gourmet cheese retail depots.",
  },
  "clean-rooms": {
    title: "Clean Rooms & Sterile Chambers",
    tempRange: "+18°C to +22°C (Relative Humidity: 45% - 55%)",
    specs: [
      "ISO class particle control grids with absolute HEPA filtration.",
      "Stainless steel flush wall panels preventing bacterial dust collection.",
      "Differential pressure gauges monitoring sealed boundaries.",
      "Airlock entryways and automated interlocking magnetic doors.",
    ],
    industries: [
      "Pharmaceutical manufacturers",
      "Diagnostic testing laboratories",
      "Electronic microchip assemblies",
    ],
    detailedDesc:
      "Fully compliant environmental chambers built to validate clean room protocols. We integrate positive pressure systems and humidity controls to meet strict clinical audit parameters.",
  },
  "ripening-chambers": {
    title: "Fruits Ripening Chambers",
    tempRange: "+14°C to +20°C (Relative Humidity: 90% - 95%)",
    specs: [
      "Automated ethylene gas dosing controllers with leak sensors.",
      "Forced-air ventilation flow tunnels ensuring uniform ripening speeds.",
      "Precision CO2 exhaust venting cycles to prevent fruit decay.",
      "PLC program panels storing preset ripening curves by crop type.",
    ],
    industries: [
      "Banana wholesalers",
      "Mango export growers",
      "Agricultural ripening depots",
    ],
    detailedDesc:
      "Controlled atmosphere chambers for uniform ripening of mangoes, bananas, and papayas. Replaces unscientific ripening chemical processes with standardized organic gas exposure.",
  },
  "blast-chillers": {
    title: "Blast Chillers & Shock Freezers",
    tempRange: "+70°C to -18°C in 90 minutes",
    specs: [
      "High velocity air blast fans drawing heat away rapidly.",
      "Deep fin evaporator coils with automatic hot-gas defrost bypass.",
      "Integrated core food temperature needle insertion probes.",
      "Extra-thick 150mm insulation core panel rigging.",
    ],
    industries: [
      "Commercial kitchens",
      "Catering companies",
      "Poultry processing units",
      "Sea food exporters",
    ],
    detailedDesc:
      "Shock-freezing machinery designed to prevent ice-crystal expansion in food products, which preserves the texture and cellular structure of meats and poultry during subsequent storage.",
  },
  amc: {
    title: "AMC & Breakdown Contracts",
    tempRange: "24/7 Technical Response",
    specs: [
      "Four quarterly preventative checkups (coil checks, current loads).",
      "Compressor oil refills, filter dryer changes, and belt adjustments.",
      "Priority response within 4 hours in Pune and surrounding MIDC zones.",
      "Free remote dashboard telemetry diagnostic checks.",
    ],
    industries: [
      "Any active cold room installation",
      "Hospitals",
      "Food processing centers",
    ],
    detailedDesc:
      "Annual Maintenance Contracts keeping refrigeration plants at peak energy efficiency. Regular checkups reduce the likelihood of unexpected compressor failure and lower energy costs.",
  },
  consultation: {
    title: "Consultation & Sizing Engineering",
    tempRange: "Analytical Review",
    specs: [
      "Thermal heat gain load calculations (insulation + products + users).",
      "CAD drafting of layout blueprints showing evaporator air coverage.",
      "Government subsidy eligibility checklists (NABARD, NHM schemes).",
      "Detailed project reports (DPR) matching banking criteria.",
    ],
    industries: [
      "Cold room buyers",
      "Agricultural startups",
      "Banking institutions",
    ],
    detailedDesc:
      "Pre-design consulting services. We run computerized thermal simulation math to prevent oversized compressors, saving client capitals and optimizing ongoing running costs.",
  },
};

const relatedMap: Record<string, string[]> = {
  "modular-cold-rooms": ["refrigeration-systems", "display-cold-rooms", "amc"],
  "refrigeration-systems": ["blast-chillers", "amc", "consultation"],
  "display-cold-rooms": ["modular-cold-rooms", "refrigeration-systems"],
  "clean-rooms": ["consultation", "amc"],
  "ripening-chambers": ["consultation", "amc"],
  "blast-chillers": ["refrigeration-systems", "amc"],
  amc: ["refrigeration-systems", "modular-cold-rooms"],
  consultation: ["modular-cold-rooms", "refrigeration-systems"],
};

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = serviceDb[slug] || serviceDb["modular-cold-rooms"];

  const [formSent, setFormSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#0C2340] text-white selection:bg-[#0F6E56]">
      {/* Header */}
      <Navbar />

      {/* Main Page Area */}
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-xs text-silver hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Services Hub</span>
        </Link>

        {/* Dynamic Detail Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header segment */}
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-accent/15 text-teal-light">
                <Snowflake className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight font-display text-white">
                {service.title}
              </h1>
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-teal-accent/10 px-2.5 py-1 text-xs font-semibold text-teal-light border border-teal-accent/20 font-mono">
                <Thermometer className="h-3.5 w-3.5" />
                <span>Operating Range: {service.tempRange}</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-silver/85 leading-relaxed space-y-4">
              <p>{service.detailedDesc}</p>
            </div>

            {/* Specifications list */}
            <div className="rounded-2xl border border-white/5 bg-[#0C2340]/40 p-6 space-y-4">
              <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider text-teal-light">
                Technical Specifications
              </h3>
              <ul className="space-y-2 text-xs">
                {service.specs.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 leading-relaxed text-silver/90"
                  >
                    <ShieldCheck className="h-4 w-4 text-teal-light shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries served badges */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-silver font-mono block">
                Primary Target Industries
              </span>
              <div className="flex flex-wrap gap-2">
                {service.industries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-white/2 border border-white/5 px-3 py-1 text-xs text-white"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Solutions (internal linking + SEO) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider text-teal-light">
                Related Solutions
              </h3>
              <div className="flex flex-col gap-2">
                {(relatedMap[slug] || []).map((k) => (
                  <Link
                    key={k}
                    href={`/services/${k}`}
                    className="inline-flex items-center justify-between gap-3 rounded-lg bg-white/2 hover:bg-white/5 transition-colors px-4 py-2 text-xs text-white border border-white/5"
                  >
                    <span className="truncate">{serviceDb[k]?.title || k}</span>
                    <ChevronRight className="h-4 w-4 text-teal-light" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Why ThermoVault - Trust & Differentiators */}
            <div className="rounded-2xl border border-white/5 bg-[#0C2340]/40 p-6 space-y-3">
              <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider text-teal-light">
                Why ThermoVault
              </h3>
              <ul className="space-y-2 text-xs text-silver/90">
                {[
                  "Customized Engineering",
                  "Energy Efficient Systems",
                  "Subsidy Guidance",
                  "Reliable After-Sales Support",
                  "IoT Monitoring Ready",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-light shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Callback Quote Intake form */}
          <div className="rounded-2xl border border-white/5 bg-[#0C2340]/60 p-6 shadow-lg h-fit">
            <h3 className="text-sm font-bold text-white mb-2 font-display">
              Sizing Consultation
            </h3>
            <p className="text-xs text-silver/80 mb-4 leading-relaxed">
              Need engineering calculations or CAD layout blueprints for this
              specific utility? Request call.
            </p>

            {formSent ? (
              <div className="rounded-xl border border-teal-accent/20 bg-teal-accent/5 p-6 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-teal-light mx-auto" />
                <h4 className="text-xs font-bold text-white">
                  Callback Scheduled
                </h4>
                <p className="text-[10px] text-silver leading-relaxed">
                  Our design draftsman will contact you within 2 working hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <div>
                  <label className="text-[9px] text-silver font-mono block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kuldeep"
                    className="w-full rounded-xl bg-[#0c2340] border border-white/5 p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-teal-light"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-silver font-mono block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 80550 10620"
                    className="w-full rounded-xl bg-[#0c2340] border border-white/5 p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-teal-light"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-teal-accent py-2.5 text-xs font-semibold text-white hover:bg-teal-light transition-all active:scale-[0.98]"
                >
                  <Send className="h-3.5 w-3.5" />
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
