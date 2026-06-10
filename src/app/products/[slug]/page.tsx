"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Snowflake, ShieldCheck, Settings, ChevronLeft, Send, CheckCircle2, Wrench, Thermometer } from "lucide-react";

interface ProductDetail {
  name: string;
  category: string;
  specs: string[];
  industries: string[];
  detailedDesc: string;
  features: string[];
}

const productDb: Record<string, ProductDetail> = {
  "puf-panels": {
    name: "PUF Panels Sizing & Specification",
    category: "PUF Panels",
    specs: [
      "Thickness range: 60mm, 80mm, 100mm, 120mm, 150mm.",
      "Density: 40 ± 2 kg/m³ with high pressure injection systems.",
      "Facings: Pre-painted Galvanized Steel (PPGI), Stainless Steel (SS 304/316), or Alu-Zinc.",
      "Joint Type: Double tongue-and-groove joint with cam-lock alignment mechanisms.",
    ],
    industries: ["Commercial cold rooms", "Pharmaceutical cleanrooms", "Food processing facilities", "Walk-in freezers"],
    detailedDesc: "High-density Polyurethane Foam (PUF) panels engineered for superior thermal insulation and structural integrity. Featuring pre-fabricated cam-locks that draw panels together tightly, compressing the tongue-and-groove joints to create an airtight vapor barrier that reduces thermal leakage and energy costs.",
    features: ["Flame retardant PUF core", "Airtight cam-lock system", "Corrosion resistant skins", "High load-bearing capability"],
  },
  "compressors": {
    name: "High-Efficiency Compressors",
    category: "Compressors",
    specs: [
      "Types: Scroll, Hermetic Reciprocating, and Semi-Hermetic Compressors.",
      "Brands Supported: Copeland, Bitzer, Danfoss, Tecumseh.",
      "Power Ratings: 1.5 HP to 50+ HP matching custom heat load profiles.",
      "Refrigerant Compatibility: R404A, R134a, R407C, R448A.",
    ],
    industries: ["Industrial cold stores", "Commercial walk-in coolers", "Ripening chambers", "Chiller units"],
    detailedDesc: "Premium refrigeration compressors selected for quiet operation, longevity, and high Coefficient of Performance (COP). Designed to withstand severe tropical ambient temperatures and unstable voltage profiles commonly found in agricultural hubs.",
    features: ["Intelligent motor protection", "High volumetric efficiency", "Vibration absorption mounting", "Low power consumption"],
  },
  "evaporators": {
    name: "Forced-Draft Evaporators & Air Coolers",
    category: "Evaporators",
    specs: [
      "Fins spacing: 4.5mm (Chilling applications) to 9.0mm (Deep freezing applications).",
      "Coil material: Seamless copper tubes with corrugated aluminum fins.",
      "Defrosting: Electrical heater grids, hot gas bypass, or water wash options.",
      "Casing: Corrosion-proof powder-coated aluminum or stainless steel sheets.",
    ],
    industries: ["Blast freezing tunnels", "Supermarkets", "Agricultural warehouses", "Food processing units"],
    detailedDesc: "High-performance air coolers engineered to optimize air distribution and heat transfer rates. Featuring low-noise axial fans and deep fin-to-tube contacts to achieve fast pull-down times and maintain uniform temperature distribution.",
    features: ["Uniform air throw profiles", "Optimized defrost cycles", "Corrosion-resistant casing", "Easy maintenance access"],
  },
  "condensing-units": {
    name: "Outdoor Condensing Units",
    category: "Condensing Units",
    specs: [
      "Configuration: Air-cooled coaxial grid or Water-cooled Shell-and-Tube condenser.",
      "Fan Speed: Variable speed axial fans for low-noise night cycles.",
      "Enclosure: Weatherproof, sound-insulated galvanized steel cabinets.",
      "Controls: Integrated dual high/low pressure cut-outs and oil pressure safety switches.",
    ],
    industries: ["Hotels & Restaurants", "Hospitals & Laboratories", "Food Retail", "Dairy Chilling Depots"],
    detailedDesc: "Robust outdoor condensing plants that house the compressor, condenser coil, and fan. Engineered with heavy-duty weather guards and anti-corrosive coil coatings to perform reliably under direct sunlight and high ambient temperatures.",
    features: ["Weatherproof housing", "Enhanced heat rejection", "Pre-wired electrical panels", "Easy service access valves"],
  },
  "control-panels": {
    name: "Smart Control Panels",
    category: "Control Panels",
    specs: [
      "Controller: PLC or Microprocessor-based digital thermostats (Dixell, Eliwell).",
      "Telemetry: Integrated GSM/Wi-Fi IoT module for real-time cloud tracking.",
      "Safety: Overload relays, phase preventers, and voltage stabilizers.",
      "Alarms: High/low temp warnings, power failure alerts, and door-open alarms.",
    ],
    industries: ["Vaccine cold chain storage", "Food retail operations", "Export ripening complexes", "Unattended facilities"],
    detailedDesc: "Custom-configured electrical starter and control panels. Features clear digital readouts, user-friendly temperature tuning, automated defrost schedules, and advanced telemetry interfaces to push real-time alerts to phone apps.",
    features: ["IoT telemetry integration", "Phase failure protection", "Visual and audible alarms", "Pre-programmed cycles"],
  },
  "cold-room-doors": {
    name: "Insulated Cold Room Doors",
    category: "Cold Room Doors",
    specs: [
      "Types: Sliding doors, Hinged doors, and Roll-up high-speed curtains.",
      "Insulation: 80mm to 120mm injected PUF core matching wall thickness.",
      "Heating: 230V low-wattage perimeter heater wire for freezer units.",
      "Safety: Inside safety release knob (preventing accidental lock-ins).",
    ],
    industries: ["Logistics hubs", "Distribution warehouses", "Commercial kitchens", "Cleanroom entries"],
    detailedDesc: "Heavy-duty thermal barrier doors built to withstand high frequency cycles. Outfitted with dual-lip EPDM gaskets to maintain a tight seal, and low-temperature heater cables to prevent ice build-up along the door frame.",
    features: ["Perimeter frame heaters", "Emergency internal release", "Heavy-duty tracking system", "Impact-resistant frames"],
  },
  "doors-hardware": {
    name: "Heavy-Duty Door Hardware & Hinges",
    category: "Doors & Hardware",
    specs: [
      "Material: High-strength composite material or chrome-plated zinc die-cast.",
      "Hinges: Self-closing rise hinges (lifts door slightly during swings).",
      "Locks: Padlockable lock latches with heavy strike brackets.",
      "Fasteners: Stainless steel grade 304 mounting screws.",
    ],
    industries: ["Replacement spares", "Custom door manufacturing", "Heavy usage cold rooms"],
    detailedDesc: "High-grade hinges, latches, sliding tracks, and brackets. Built with wear-resistant self-lubricating plastics and anti-corrosive alloys to ensure smooth swings and airtight sealing over hundreds of thousands of cycles.",
    features: ["Rise-run self closing", "Corrosion-free finishes", "Airtight compression latching", "High weight ratings"],
  },
  "copper-piping": {
    name: "Refrigeration Grade Copper Piping",
    category: "Copper Piping",
    specs: [
      "Material: Deoxidized High Phosphorus (DHP) copper (99.9% pure).",
      "Standards: ASTM B280 / EN 12735-1 compliance for refrigeration.",
      "Insulation: Closed-cell elastomeric nitrile rubber foam tubing.",
      "Pressure: Tested to withstand up to 450 PSI operating pressures.",
    ],
    industries: ["Site piping installations", "Evaporator-Condenser rigging", "System overhauls"],
    detailedDesc: "High-purity seamless copper tubes selected specifically for refrigerant flow. Features uniform wall thickness, zero internal impurities, and pre-insulated thermal jackets to prevent suction line condensation and maximize thermal efficiency.",
    features: ["Zero moisture ingress", "Smooth inner wall profiles", "Flexible bending properties", "Heavy thermal sleeve insulation"],
  },
  "electrical-systems": {
    name: "Cold Storage Electrical Systems",
    category: "Electrical Systems",
    specs: [
      "Wiring: Flame retardant low smoke (FRLS) multi-strand copper cables.",
      "Switchgear: MCBs, Contactors, and Overload Relays (Schneider, Siemens).",
      "Lighting: IP65 low-temperature LED linear light fixtures.",
      "Conduits: Rigid PVC or metal conduit routes preventing rodent bite issues.",
    ],
    industries: ["New facility setups", "Safety retrofits", "Automation upgrades"],
    detailedDesc: "End-to-end electrical wiring layouts designed to meet industrial safety standards. Outfitted with high-durability switchgear, watertight junctions, and specialized cold-room lighting that functions continuously without generating additional heat.",
    features: ["Flame retardant cabling", "IP65 wet-location lights", "Short circuit protection", "Aesthetic layout ducts"],
  },
  "refrigeration-accessories": {
    name: "Refrigeration System Accessories",
    category: "Refrigeration Accessories",
    specs: [
      "Valves: Thermostatic Expansion Valves (TXV), Solenoid valves, Hand shut-offs.",
      "Filtration: Liquid line filter dryers (eliminates moisture & acid particles).",
      "Indicators: Moisture-liquid sight glasses with color status grids.",
      "Accumulators: Suction line accumulators preventing liquid slugging.",
    ],
    industries: ["System assembly", "AMC maintenance servicing", "Refrigeration retrofits"],
    detailedDesc: "Essential ancillary components including expansion valves, filter dryers, solenoid valves, and accumulators. Every accessory is sourced from leading global brands to ensure absolute reliability and prevent compressor failures.",
    features: ["TXV precision metering", "High-capacity core dryers", "Liquid backup protection", "Quick diagnostics windows"],
  },
  "insulation-materials": {
    name: "Specialty Insulation Materials",
    category: "Insulation Materials",
    specs: [
      "Types: Extruded Polystyrene (XPS), Rockwool slabs, Nitrile foam sheets.",
      "Density: XPS (35-40 kg/m³), Rockwool (80-120 kg/m³).",
      "Thermal Conductivity: Under 0.028 W/m·K at mean temperatures.",
      "Fire Rating: Class A / Class 1 flame spread index compliance.",
    ],
    industries: ["Floor underdeck insulation", "Ceiling overlays", "Hot water lines", "Vibration pads"],
    detailedDesc: "High-grade insulation materials for underdeck floors, ceilings, and duct piping. We select optimal foam or fiber matrices to match the temperature differential, preventing floor buckling and underdeck frost heave.",
    features: ["High compression strength", "Zero water absorption", "Fire-resistant variants", "Low thermal conductivity"],
  },
  "spare-parts": {
    name: "Genuine Replacement Spare Parts",
    category: "Spare Parts",
    specs: [
      "Fan Motors: Evaporator/condenser axial fan motors (EBM-Papst, MaEr).",
      "Heaters: Evaporator drain line heaters, door border heater wires.",
      "Sensors: NTC/PT100 temperature probes, pressure transducers.",
      "Refrigerants: Pure grade cylinder gases (R404A, R134a, R410A).",
    ],
    industries: ["Breakdown repairs", "Preventative AMC replacements", "Emergency stock"],
    detailedDesc: "Comprehensive inventory of replacement parts to keep cold storage facilities operating continuously. Sourced directly from manufacturers to ensure original specifications, maximum performance, and compatibility.",
    features: ["OEM certified parts", "Emergency stock availability", "Calibrated sensor grids", "High durability ratings"],
  },
};

// Aliasing doors--hardware to doors-hardware for safety
productDb["doors--hardware"] = productDb["doors-hardware"] = {
  name: "Heavy-Duty Door Hardware & Hinges",
  category: "Doors & Hardware",
  specs: [
    "Material: High-strength composite material or chrome-plated zinc die-cast.",
    "Hinges: Self-closing rise hinges (lifts door slightly during swings).",
    "Locks: Padlockable lock latches with heavy strike brackets.",
    "Fasteners: Stainless steel grade 304 mounting screws.",
  ],
  industries: ["Replacement spares", "Custom door manufacturing", "Heavy usage cold rooms"],
  detailedDesc: "High-grade hinges, latches, sliding tracks, and brackets. Built with wear-resistant self-lubricating plastics and anti-corrosive alloys to ensure smooth swings and airtight sealing over hundreds of thousands of cycles.",
  features: ["Rise-run self closing", "Corrosion-free finishes", "Airtight compression latching", "High weight ratings"],
};

export async function generateStaticParams() {
  return [
    { slug: "puf-panels" },
    { slug: "compressors" },
    { slug: "evaporators" },
    { slug: "condensing-units" },
    { slug: "control-panels" },
    { slug: "cold-room-doors" },
    { slug: "doors-hardware" },
    { slug: "copper-piping" },
    { slug: "electrical-systems" },
    { slug: "refrigeration-accessories" },
    { slug: "insulation-materials" },
    { slug: "spare-parts" },
  ];
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = productDb[slug] || productDb["puf-panels"];

  const [formSent, setFormSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#0C2340] text-white selection:bg-blue-600">
      {/* Header */}
      <Navbar />

      {/* Main Page Area */}
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs text-silver hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Product Range</span>
        </Link>

        {/* Dynamic Detail Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header segment */}
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-accent/15 text-teal-light">
                <Settings className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight font-display text-white">
                {product.name}
              </h1>
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-teal-accent/10 px-2.5 py-1 text-xs font-semibold text-teal-light border border-teal-accent/20 font-mono">
                <Wrench className="h-3.5 w-3.5" />
                <span>Category: {product.category}</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-silver/85 leading-relaxed space-y-4">
              <p>{product.detailedDesc}</p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-silver font-mono block">
                Key Performance Advantages
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-xl bg-white/2 border border-white/5 p-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-accent/10 text-teal-light">
                      <Snowflake className="h-3 w-3" />
                    </div>
                    <span className="text-xs text-silver">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications list */}
            <div className="rounded-2xl border border-white/5 bg-[#0C2340]/40 p-6 space-y-4">
              <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider text-teal-light">
                Technical Specifications
              </h3>
              <ul className="space-y-2 text-xs">
                {product.specs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-silver/90">
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
                {product.industries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-white/2 border border-white/5 px-3 py-1 text-xs text-white"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Callback Quote Intake form */}
          <div className="rounded-2xl border border-white/5 bg-[#0C2340]/60 p-6 shadow-lg h-fit">
            <h3 className="text-sm font-bold text-white mb-2 font-display">Technical Consultation</h3>
            <p className="text-xs text-silver/80 mb-4 leading-relaxed">
              Need technical sheets, CAD drawings, or pricing details for this component? Request callback.
            </p>

            {formSent ? (
              <div className="rounded-xl border border-teal-accent/20 bg-teal-accent/5 p-6 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-teal-light mx-auto" />
                <h4 className="text-xs font-bold text-white">Callback Scheduled</h4>
                <p className="text-[10px] text-silver leading-relaxed">
                  Our application engineer will contact you within 2 working hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <div>
                  <label className="text-[9px] text-silver font-mono block mb-1">Your Name</label>
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
                  <label className="text-[9px] text-silver font-mono block mb-1">Mobile Number</label>
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
                  <span>Request Specifications</span>
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
