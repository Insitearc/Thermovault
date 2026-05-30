"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PerformanceFeatureBar from "@/components/layout/PerformanceFeatureBar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Snowflake,
  ShieldCheck,
  Thermometer,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
  Layers,
  Box,
  Gauge,
  Droplet,
  Pill,
  Apple,
  ShoppingCart,
  Fish,
  Activity,
  Settings,
  Ruler,
  Clock,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

interface SpecItem {
  title: string;
  desc: string;
}

interface ServiceDetail {
  title: string;
  tempRange: string;
  specs: SpecItem[];
  industries: string[];
  detailedDesc: string;
}

const serviceDb: Record<string, ServiceDetail> = {
  "modular-cold-rooms": {
    title: "Modular Cold Rooms Sizing",
    tempRange: "-25°C to +15°C",
    specs: [
      { title: "PUF Insulation", desc: "Cam-locked high density PUF panels with 120mm core thickness." },
      { title: "Vapor Barrier", desc: "Tongue-and-groove joint fittings matching vapor barrier rules." },
      { title: "Heavy Duty Flooring", desc: "Pre-insulated floor panels with heavy-duty aluminum chequered plates." },
      { title: "Pressure Relief System", desc: "Pressure relief valves for extreme low-temperature adjustments." }
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
      { title: "Compressor Units", desc: "Scroll and semi-hermetic compressor units (Copeland, Bitzer)." },
      { title: "Condensing Grids", desc: "Air-cooled coaxial condensing grids or shell-and-tube water condensers." },
      { title: "Eco Refrigerants", desc: "Refrigerant options matching low-GWP criteria (R404A, R134a, R448A)." },
      { title: "Safety Grids", desc: "Anti-vibration compressor mounts and dual high/low pressure cut-out grids." }
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
      { title: "Anti-Fog Glass", desc: "Heated double-pane glass doors (prevents external condensation)." },
      { title: "LED Diffusers", desc: "Integrated vertical LED light strips with soft diffuser profiles." },
      { title: "Sleek Shelving", desc: "Adjustable wire shelving grids (white epoxy dust-resistant coating)." },
      { title: "Gravity Coolers", desc: "Gravity air coolers minimizing air movement to preserve fresh items." }
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
      { title: "HEPA Filters", desc: "ISO class particle control grids with absolute HEPA filtration." },
      { title: "Sterile Panels", desc: "Stainless steel flush wall panels preventing bacterial dust collection." },
      { title: "Pressure Control", desc: "Differential pressure gauges monitoring sealed boundaries." },
      { title: "Magnetic Airlocks", desc: "Airlock entryways and automated interlocking magnetic doors." }
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
      { title: "Ethylene Control", desc: "Automated ethylene gas dosing controllers with leak sensors." },
      { title: "Airflow Tunnels", desc: "Forced-air ventilation flow tunnels ensuring uniform ripening speeds." },
      { title: "Venting Cycles", desc: "Precision CO2 exhaust venting cycles to prevent fruit decay." },
      { title: "PLC Presets", desc: "PLC program panels storing preset ripening curves by crop type." }
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
      { title: "High Velocity Fans", desc: "High velocity air blast fans drawing heat away rapidly." },
      { title: "Defrost Bypass", desc: "Deep fin evaporator coils with automatic hot-gas defrost bypass." },
      { title: "Needle Probes", desc: "Integrated core food temperature needle insertion probes." },
      { title: "Thick Insulation", desc: "Extra-thick 150mm insulation core panel rigging." }
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
      { title: "Quarterly Audits", desc: "Four quarterly preventative checkups (coil checks, current loads)." },
      { title: "Refill & Align", desc: "Compressor oil refills, filter dryer changes, and belt adjustments." },
      { title: "Emergency SLA", desc: "Priority response within 4 hours in Pune and surrounding MIDC zones." },
      { title: "Telemetry Diagnostics", desc: "Free remote dashboard telemetry diagnostic checks." }
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
      { title: "Heat Calculations", desc: "Thermal heat gain load calculations (insulation + products + users)." },
      { title: "Evaporator CAD", desc: "CAD drafting of layout blueprints showing evaporator air coverage." },
      { title: "Capital Schemes", desc: "Government subsidy eligibility checklists (NABARD, NHM schemes)." },
      { title: "Feasibility DPR", desc: "Detailed project reports (DPR) matching banking criteria." }
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

interface ApplicationItem {
  title: string;
  desc: string;
  link: string;
  icon: React.ComponentType<any>;
}

function getApplicationItems(slug: string): ApplicationItem[] {
  const defaultApps: ApplicationItem[] = [
    {
      title: "Dairy Industry",
      desc: "Maintains exact 2°C to 4°C chilled environment to halt bacterial activity in raw milk.",
      link: "/services/dairy-milk-products",
      icon: Droplet,
    },
    {
      title: "Pharma Warehousing",
      desc: "GMP-validated airtight layouts built for critical vaccine and biomedical stocks.",
      link: "/services/pharmaceuticals",
      icon: Pill,
    },
    {
      title: "Frozen Foods",
      desc: "Severe sub-zero structural holds keeping processed meat and packaged foods at -18°C.",
      link: "/services/meat-poultry",
      icon: Snowflake,
    },
    {
      title: "Logistics Hubs",
      desc: "Spacious micro-fulfillment storage optimized for high-velocity quick commerce loads.",
      link: "/services/last-mile-dark-store",
      icon: ShoppingCart,
    },
  ];

  const db: Record<string, ApplicationItem[]> = {
    "modular-cold-rooms": defaultApps,
    "refrigeration-systems": [
      {
        title: "Slaughterhouses & Meat",
        desc: "Industrial TR compressors delivering massive cooling loads for animal carcass holdings.",
        link: "/services/meat-poultry",
        icon: Snowflake,
      },
      {
        title: "Ripening Depots",
        desc: "Precise cooling loops paired with forced airflow ripening tunnels.",
        link: "/services/fruits-vegetables",
        icon: Apple,
      },
      {
        title: "Marine Processing",
        desc: "Deep freezing plant compressors locking catch freshness at coastal ports.",
        link: "/services/seafood-fish",
        icon: Fish,
      },
      {
        title: "Q-Commerce Depots",
        desc: "Compact multi-evaporator condensing networks running dark store cold grids.",
        link: "/services/last-mile-dark-store",
        icon: ShoppingCart,
      },
    ],
    "display-cold-rooms": [
      {
        title: "Supermarkets",
        desc: "Heated double-pane glass walk-ins showcasing chilled foods under vertical diffusers.",
        link: "/services/last-mile-dark-store",
        icon: ShoppingCart,
      },
      {
        title: "Organic Retail",
        desc: "Soft gravity coolers preventing dehydration of delicate greens and fruits.",
        link: "/services/fruits-vegetables",
        icon: Apple,
      },
      {
        title: "Dairy & Beverages",
        desc: "Display holds keeping milk bottles and yogurts perfectly chilled at point-of-sale.",
        link: "/services/dairy-milk-products",
        icon: Droplet,
      },
    ],
    "clean-rooms": [
      {
        title: "Pharma Manufacturers",
        desc: "ISO class particle-controlled sterile environments with HEPA air flow loops.",
        link: "/services/pharmaceuticals",
        icon: Pill,
      },
      {
        title: "Diagnostic Labs",
        desc: "Sealed boundaries keeping constant relative humidity for accurate test outcomes.",
        link: "/services/pharmaceuticals",
        icon: Activity,
      },
    ],
    "ripening-chambers": [
      {
        title: "Fruit Wholesalers",
        desc: "Automated ethylene chambers triggering uniform ripening curves in green bananas.",
        link: "/services/fruits-vegetables",
        icon: Apple,
      },
      {
        title: "Agricultural Cooperatives",
        desc: "Precision post-harvest venting ensuring zero decay of delicate mangoes.",
        link: "/services/fruits-vegetables",
        icon: Apple,
      },
    ],
    "blast-chillers": [
      {
        title: "Poultry Processing",
        desc: "Rapid shock-freezing dropping core temperature to -18°C in under 90 minutes.",
        link: "/services/meat-poultry",
        icon: Snowflake,
      },
      {
        title: "Seafood Export",
        desc: "High-velocity shock freezing tunnels to preserve moisture and weight in marine catch.",
        link: "/services/seafood-fish",
        icon: Fish,
      },
      {
        title: "Quick-Fulfillment Depots",
        desc: "Quick shock freezers to lock fresh ready-to-eat meals before final dispatch.",
        link: "/services/last-mile-dark-store",
        icon: ShoppingCart,
      },
    ],
    amc: [
      {
        title: "Active Warehouses",
        desc: "Continuous 24/7 telemetry monitoring to prevent unexpected compressor breakdowns.",
        link: "/services/last-mile-dark-store",
        icon: Settings,
      },
      {
        title: "Critical Pharma Holds",
        desc: "Quarterly compliance validation testing for temperature stability audits.",
        link: "/services/pharmaceuticals",
        icon: Pill,
      },
      {
        title: "Cooperative Dairies",
        desc: "Regular condenser coil washing and refrigerant level checks for low power bills.",
        link: "/services/dairy-milk-products",
        icon: Droplet,
      },
    ],
    consultation: [
      {
        title: "FPO Agri Cooperatives",
        desc: "Detailed project reports (DPR) matching NABARD and NHM grant checklists.",
        link: "/services/fruits-vegetables",
        icon: Apple,
      },
      {
        title: "Industrial Cold Stores",
        desc: "Computerized thermal heat load equations ensuring ideally-sized compressor units.",
        link: "/services/meat-poultry",
        icon: Ruler,
      },
    ],
  };

  return db[slug] || defaultApps;
}

interface FaqItem {
  q: string;
  a: string;
}

function getServiceFaqs(slug: string): FaqItem[] {
  const db: Record<string, FaqItem[]> = {
    "modular-cold-rooms": [
      {
        q: "What temperature range is supported by modular cold rooms?",
        a: "Our modular cold rooms support temperature ranges from -25°C to +15°C, making them highly versatile for both chilled and freezing applications.",
      },
      {
        q: "What insulation thickness is recommended for cold storage?",
        a: "We recommend 120mm to 150mm thick high-density PUF panels with cam-locks for sub-zero deep freezing, and 60mm to 80mm for standard medium-temperature chillers.",
      },
      {
        q: "Is real-time IoT telemetry monitoring available?",
        a: "Yes! Every modular cold room is IoT-ready, allowing you to monitor live temperatures, door open alerts, and compressor statuses remotely from a centralized telemetry dashboard.",
      },
      {
        q: "Which industries commonly deploy modular cold rooms?",
        a: "They are widely deployed across dairy cooperatives, agricultural warehouses, pharmaceutical distributors, frozen meat storage facilities, and quick-commerce dark stores.",
      },
    ],
    "refrigeration-systems": [
      {
        q: "What compressor units do you build into refrigeration plants?",
        a: "We use premium industrial scroll and semi-hermetic compressor units from leading manufacturers including Copeland, Bitzer, and Emerson to ensure voltage resilience and thermal output.",
      },
      {
        q: "Which refrigerants are supported by your condensing units?",
        a: "We support low-GWP, eco-friendly refrigerants including R404A, R134a, R448A, and R449A, complying with modern green transition criteria.",
      },
      {
        q: "Do you offer automatic hot gas defrosting grids?",
        a: "Yes! All our evaporator units include integrated automatic hot gas defrosting bypass valves to prevent operational coil blockages and drop overall running costs.",
      },
    ],
    "display-cold-rooms": [
      {
        q: "Do display cold room glass doors fog up in high-humidity zones?",
        a: "No. We integrate double-pane vacuum-insulated glass doors with heated wire profiles and low-E coatings to prevent external condensation in tropical, humid retail climates.",
      },
      {
        q: "What type of product display lighting is used?",
        a: "We integrate soft, vertical diffused LED light strips running along the door columns to showcase chilled foods and beverages at maximum aesthetic appeal.",
      },
    ],
    "clean-rooms": [
      {
        q: "What clean room ISO classes do you design and construct?",
        a: "We construct sterile chambers validating strict ISO Class 5 to Class 8 particle control specifications, suitable for pharma packaging and clinical diagnostic operations.",
      },
      {
        q: "How is precise relative humidity maintained?",
        a: "We construct sealed boundaries paired with integrated direct-expansion dehumidification and HVAC controls to hold relative humidity continuously between 45% and 55%.",
      },
    ],
    "ripening-chambers": [
      {
        q: "How is uniform fruit ripening speed achieved?",
        a: "We deploy pressurized forced-air ventilation tunnels that guide air evenly across crates, combined with computerized ethylene gas dosing curves and CO2 exhausts.",
      },
      {
        q: "What agricultural crops are supported by ripening curves?",
        a: "Our PLC control systems feature pre-programmed ripening curves for banana, mango, papaya, and tomato post-harvest processing.",
      },
    ],
    "blast-chillers": [
      {
        q: "How fast can your shock freezers drop product temperatures?",
        a: "Our heavy-duty blast chillers pull product core temperatures from +70°C down to -18°C in under 90 minutes, meeting strict food sanitation limits.",
      },
      {
        q: "Does rapid freezing cause texture damage to meats or seafood?",
        a: "No. Shock freezing prevents the expansion of large, jagged ice crystals, successfully locking in natural cellular moisture, weight, and food quality during subsequent storage.",
      },
    ],
    amc: [
      {
        q: "What maintenance routines are covered in the AMC contracts?",
        a: "Our AMCs cover four quarterly preventative inspections: evaporator coil washdowns, belt tension checks, compressor oil level additions, current loads analysis, and telemetry signal calibrations.",
      },
      {
        q: "What is your priority breakdown SLA response time?",
        a: "We commit to an on-site technician response within 4 hours in Pune and surrounding MIDC zones for critical system failures.",
      },
    ],
    consultation: [
      {
        q: "Can you assist in government subsidy documentation?",
        a: "Yes! We compile complete project layout drawings and bankability dossiers that fully comply with NABARD, NHM, and MIDH subsidy program criteria.",
      },
      {
        q: "What is included in your Pre-Design consulting?",
        a: "We execute precise computer heat gain load calculations (based on product loads, dimensions, insulation, and users) and draft fully sized CAD layout blueprints.",
      },
    ],
  };

  return db[slug] || db["modular-cold-rooms"];
}

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
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null);

  const faqs = getServiceFaqs(slug);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };

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
          className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors mb-6"
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
            <div className="max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              <p className="text-slate-100">{service.detailedDesc}</p>
            </div>

            {/* Specifications list (Modern Feature Cards) */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-teal-light font-display uppercase tracking-wider">
                Technical Specifications
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.specs.map((item, idx) => {
                  const specIcons = [Layers, ShieldCheck, Box, Gauge];
                  const IconComponent = specIcons[idx % specIcons.length];
                  
                  return (
                    <div 
                      key={idx}
                      className="group relative rounded-2xl border border-white/5 bg-[#0C2340]/40 p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-teal-light/20 hover:shadow-[0_0_15px_rgba(29,158,117,0.15)] flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-accent/10 border border-teal-accent/25 text-teal-light transition-transform duration-300 group-hover:scale-110">
                          <IconComponent className="h-4.5 w-4.5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white font-display tracking-wide group-hover:text-teal-light transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed font-body">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ideal Applications Section */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-light font-mono block">
                  DEPLOYMENT SOLUTIONS
                </span>
                <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                  Ideal Applications
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getApplicationItems(slug).map((app, idx) => {
                  const Icon = app.icon;
                  return (
                    <Link
                      key={idx}
                      href={app.link}
                      className="group flex gap-4 rounded-2xl border border-white/5 bg-[#0C2340]/40 p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 hover:border-teal-light/20 hover:shadow-[0_0_15px_rgba(29,158,117,0.15)] text-left"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-accent/10 border border-teal-accent/25 text-teal-light shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-white font-display tracking-wide group-hover:text-teal-light transition-colors">
                            {app.title}
                          </h4>
                          <ChevronRight className="h-3.5 w-3.5 text-teal-light/50 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-body">
                          {app.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* SEO FAQ Structured Data Schema Injection */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Dynamic Accordion FAQ Section */}
            <div className="space-y-4 pt-8 border-t border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-light font-mono block">
                  SEO & SEARCH ASSISTANCE
                </span>
                <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {faqs.map((item, idx) => {
                  const isExpanded = expandedFaqIdx === idx;
                  return (
                    <div 
                      key={idx}
                      className="rounded-2xl border border-white/5 bg-[#0C2340]/40 overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setExpandedFaqIdx(isExpanded ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left transition-all hover:bg-white/5 select-none"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="h-4.5 w-4.5 text-teal-light shrink-0" />
                          <span className="text-xs font-bold text-white font-display tracking-wide">
                            {item.q}
                          </span>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-teal-light/60 transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-teal-light" : ""
                        }`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="p-5 pt-0 border-t border-white/5 text-[11px] text-slate-300 leading-relaxed font-body">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
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
              <ul className="space-y-2 text-xs text-white">
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
          <div 
            className="relative rounded-2xl border border-white/10 bg-[#0C2340]/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md overflow-hidden h-fit"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "16px 16px"
            }}
          >
            {/* Ambient glowing radial blur behind illustration */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Technical Vector Drawing Blueprint Schematic */}
            <div className="relative h-20 w-full rounded-xl bg-slate-950/40 border border-white/5 overflow-hidden mb-6 flex items-center justify-center">
              <div 
                className="absolute inset-0 opacity-20" 
                style={{
                  backgroundImage: "radial-gradient(rgba(59, 130, 246, 0.3) 1.2px, transparent 1.2px)",
                  backgroundSize: "12px 12px"
                }}
              />
              <svg className="absolute inset-0 h-full w-full stroke-blue-500/25 fill-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50" cy="50" r="32" strokeWidth="0.5" strokeDasharray="2 2" />
                <circle cx="50" cy="50" r="16" strokeWidth="0.5" />
                <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" strokeDasharray="4 4" />
                <path d="M 20 20 L 80 80 M 20 80 L 80 20" strokeWidth="0.25" strokeDasharray="1 3" />
              </svg>
              
              <div className="relative z-10 flex items-center gap-3 px-4 py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/35 text-blue-400">
                  <Settings className="h-5 w-5 animate-spin-slow text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-blue-400">CAD Blueprint Sizing</div>
                  <div className="text-[8px] font-bold text-slate-300 font-mono flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>DRAFTSMAN STATUS: ONLINE</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-extrabold text-white mb-2 font-display uppercase tracking-wider">
              Sizing Consultation
            </h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed font-body">
              Need engineering heat gain load calculations or customized CAD layout blueprints? Request quote.
            </p>

            {formSent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center space-y-4 py-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white font-display">Callback Request Scheduled</h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Our design draftsman will contact you within 30 minutes.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-semibold font-mono uppercase tracking-wider block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kuldeep"
                    className="w-full rounded-xl bg-[#0c2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-semibold font-mono uppercase tracking-wider block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 80550 10620"
                    className="w-full rounded-xl bg-[#0c2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold font-mono py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl justify-center w-full shadow-inner select-none">
                  <Clock className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
                  <span>Response within 30 mins</span>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white shadow-lg active:scale-[0.98] transition-all font-display group/btn"
                >
                  <Send className="h-3.5 w-3.5 text-inherit transition-transform group-hover/btn:translate-x-0.5" />
                  <span>Talk to Cold Chain Expert</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Modern & Premium Performance / Feature Bar */}
      <div className="py-12 border-t border-white/5 bg-[#0C2340]">
        <PerformanceFeatureBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
