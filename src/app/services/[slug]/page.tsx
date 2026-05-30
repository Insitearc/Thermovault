"use client";

import React, { use, useState, useEffect } from "react";
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
  Sliders,
  Calculator,
  ShieldAlert,
  Wrench,
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

// Technical standards & characteristics parameters matching each service
interface TechnicalParameter {
  label: string;
  value: string;
  metric: string;
}

function getTechnicalParameters(slug: string): TechnicalParameter[] {
  const defaultParams = [
    { label: "Core PUF Density", value: "40 ± 2", metric: "kg/m³" },
    { label: "Thermal Conductivity", value: "0.022", metric: "W/m·K" },
    { label: "Fire Classification", value: "Class B-s2, d0", metric: "EN 13501-1" },
    { label: "Compressor COP", value: "3.2 - 4.1", metric: "Rating" },
    { label: "Joint Alignment System", value: "Dual Cam-lock", metric: "Type" },
  ];

  const db: Record<string, TechnicalParameter[]> = {
    "modular-cold-rooms": [
      { label: "Core PUF Density", value: "40 ± 2", metric: "kg/m³" },
      { label: "Thermal Conductivity", value: "0.021", metric: "W/m·K" },
      { label: "Compressor Coef (COP)", value: "3.5", metric: "W/W" },
      { label: "Cam-lock Lock Tension", value: "280", metric: "kg/pull" },
      { label: "Skin Sheet Thickness", value: "0.5 - 0.6", metric: "mm PPGI" },
    ],
    "refrigeration-systems": [
      { label: "Volumetric Efficiency", value: "82 - 88", metric: "%" },
      { label: "Condenser Airflow", value: "3200", metric: "m³/hr" },
      { label: "Operating Pressure (LP)", value: "2.4", metric: "bar" },
      { label: "Operating Pressure (HP)", value: "18.5", metric: "bar" },
      { label: "Refrigerant GWP", value: "1300 - 2100", metric: "Rating" },
    ],
    "display-cold-rooms": [
      { label: "Glass Light Transmission", value: "78", metric: "%" },
      { label: "LED Brightness", value: "120", metric: "lm/W" },
      { label: "Heater Wire Load", value: "12.5", metric: "W/m" },
      { label: "Gravity Fan Throw", value: "2.5", metric: "meters" },
    ],
    "clean-rooms": [
      { label: "HEPA Filtering Efficiency", value: "99.97", metric: "% @ 0.3μm" },
      { label: "Differential Pressure", value: "15 - 30", metric: "Pascal" },
      { label: "Air Change Rate", value: "25 - 45", metric: "ACH" },
      { label: "SS Facing Finish", value: "Ra < 0.8", metric: "μm (Polish)" },
    ],
  };

  return db[slug] || defaultParams;
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = serviceDb[slug] || serviceDb["modular-cold-rooms"];

  // Thermodynamic Sizing Calculator States
  const [calcLength, setCalcLength] = useState("10");
  const [calcWidth, setCalcWidth] = useState("10");
  const [calcHeight, setCalcHeight] = useState("10");
  const [calcTempProfile, setCalcTempProfile] = useState("chilling");
  const [calcApplicant, setCalcApplicant] = useState("private");

  // Output sizing values
  const [volumeCuFt, setVolumeCuFt] = useState(1000);
  const [volumeCuM, setVolumeCuM] = useState(28.3);
  const [coolingTR, setCoolingTR] = useState(0.8);
  const [pufThickness, setPufThickness] = useState("80mm");
  const [estimatedSubsidy, setEstimatedSubsidy] = useState("Rs. 1,05,000");

  // Consultation form states
  const [formSent, setFormSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [notes, setNotes] = useState("");
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null);

  // Run thermodynamic equations when inputs change
  useEffect(() => {
    const l = parseFloat(calcLength) || 10;
    const w = parseFloat(calcWidth) || 10;
    const h = parseFloat(calcHeight) || 10;
    const volCuFt = l * w * h;
    const volCuM = parseFloat((volCuFt * 0.0283168).toFixed(1));

    setVolumeCuFt(Math.round(volCuFt));
    setVolumeCuM(volCuM);

    // 1. Cooling Load Load Factor per cubic feet
    let trMultiplier = 0.0008; // Chilling default
    let thickness = "80mm";
    if (calcTempProfile === "freezing") {
      trMultiplier = 0.0012;
      thickness = "100mm";
    } else if (calcTempProfile === "deep-freezing") {
      trMultiplier = 0.0015;
      thickness = "120mm";
    } else if (calcTempProfile === "sterile-control") {
      trMultiplier = 0.0005;
      thickness = "60mm";
    }
    const tr = parseFloat((volCuFt * trMultiplier).toFixed(2));
    setCoolingTR(tr);
    setPufThickness(thickness);

    // 2. Cost estimation baseline
    const costFactor = calcTempProfile.includes("freezing") ? 220 : 160;
    const projectCost = volCuFt * costFactor;

    // Subsidy rate matching (35% private, 50% FPO/Cooperative)
    const rate = calcApplicant === "fpo" ? 50 : 35;
    const subsidy = (projectCost * rate) / 100;

    const formattedSubsidy = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(subsidy);

    setEstimatedSubsidy(formattedSubsidy);
  }, [calcLength, calcWidth, calcHeight, calcTempProfile, calcApplicant]);

  const handleApplySizingToForm = () => {
    const formattedNotes = `Requested custom Sizing:
- Dimensions: ${calcLength}'L x ${calcWidth}'W x ${calcHeight}'H
- Calculated Volume: ${volumeCuFt} cu. ft. (${volumeCuM} m³)
- Target cooling Profile: ${calcTempProfile.toUpperCase()}
- Suggested Load: ${coolingTR} TR
- PUF Panel thickness: ${pufThickness}
- Expected Subsidy: ${estimatedSubsidy} (${calcApplicant === "fpo" ? "50%" : "35%"})`;
    setNotes(formattedNotes);

    // Scroll smoothly down to the consultation form
    const formEl = document.getElementById("sizing-form-card");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <div className="flex flex-col flex-1 min-h-screen bg-[#0C2340] text-white selection:bg-[#0F6E56] overflow-x-hidden">
      {/* Header */}
      <Navbar />

      {/* Futuristic Blueprint Hero Banner */}
      <section className="relative bg-[#0C2340] text-white pt-16 pb-24 overflow-hidden min-h-[540px] flex items-center">
        {/* Blueprint background grid overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none z-0" 
          style={{
            backgroundImage: `
              radial-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px, 40px 40px, 40px 40px"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0C2340] via-[#0E2F56]/90 to-[#0A1A30]/95 z-0" />
        
        {/* Soft glowing ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Clickable Breadcrumbs (Interactive Navigation) */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="text-white/40">/</span>
            <span className="text-blue-400">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Text Details (col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/25 px-4 py-2 text-xs font-bold text-blue-400 font-mono w-fit shadow-sm">
                <Snowflake className="h-4 w-4 text-blue-400 shrink-0 animate-pulse" />
                <span>TECHNICAL UTILITY DESIGN</span>
              </div>

              <h1 className="text-4.5xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.12]">
                ThermoVault Solutions:<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 font-display">
                  {service.title}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body max-w-2xl">
                {service.detailedDesc} Sourced and engineered to withstand severe tropical climates, delivering optimized coefficient of performance (COP) and strict thermal security.
              </p>

              {/* Temp Range Pill & Sizing Quick Link */}
              <div className="flex flex-wrap gap-4 pt-1 items-center">
                <div className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-950/50 via-[#0A1A30]/50 to-blue-900/30 border border-blue-500/30 px-4 py-2 text-xs font-bold font-mono text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-md">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[10px] shadow-[0_0_8px_rgba(59,130,246,0.4)] animate-pulse shrink-0">❄</span>
                  <span>Operational Range: <strong className="text-white font-extrabold tracking-wide">{service.tempRange}</strong></span>
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById("sizing-calculator-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-teal-accent/15 hover:bg-teal-accent/25 border border-teal-light/20 text-teal-light px-4 py-2 text-xs font-bold font-mono transition-all flex items-center gap-1 hover:border-teal-light/40"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Run Sizing Calculator</span>
                </button>
              </div>
            </div>

            {/* Right side: Interactive CAD blueprint vector panel (col-span-5) */}
            <div className="lg:col-span-5 hidden lg:flex justify-center relative">
              <div className="absolute inset-0 bg-blue-500/5 blur-[80px] pointer-events-none z-0" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-[340px] aspect-[4/3] rounded-2xl border border-blue-500/20 bg-white/2 p-2.5 shadow-2xl backdrop-blur-sm overflow-hidden group select-none"
              >
                {/* Laser scan line overlay */}
                <div 
                  className="absolute left-0 right-0 h-[1.5px] bg-cyan-400/40 shadow-[0_0_8px_rgba(34,211,238,0.4)] z-20 pointer-events-none"
                  style={{ animation: "scan 3.5s linear infinite" }}
                />

                <div className="absolute top-2 left-2 text-[8px] font-mono text-blue-400/40 font-bold">SCALE: 1:35</div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-blue-400/40 font-bold">TV-BLUEPRINT-v1</div>

                {/* High tech SVG wireframe layout drawing */}
                <div className="relative w-full h-full rounded-xl bg-[#0A1A30]/90 p-4 border border-white/5 flex flex-col justify-between">
                  <div className="w-full flex-1 relative flex items-center justify-center">
                    <svg className="stroke-teal-light/35 fill-none w-full h-full max-h-40" viewBox="0 0 120 90">
                      {/* Blueprint Grid Lines */}
                      <path d="M 0 15 H 120 M 0 30 H 120 M 0 45 H 120 M 0 60 H 120 M 0 75 H 120" strokeWidth="0.1" />
                      <path d="M 20 0 V 90 M 40 0 V 90 M 60 0 V 90 M 80 0 V 90 M 100 0 V 90" strokeWidth="0.1" />
                      
                      {/* Chamber Walls */}
                      <rect x="25" y="20" width="70" height="50" strokeWidth="1" className="stroke-teal-light" />
                      
                      {/* Door Swing */}
                      <path d="M 95 45 C 95 35, 90 30, 85 30" strokeWidth="0.75" strokeDasharray="1.5 1.5" className="stroke-blue-400" />
                      <line x1="95" y1="45" x2="85" y2="45" strokeWidth="1" className="stroke-blue-400" />
                      
                      {/* Evaporator placement */}
                      <rect x="30" y="32" width="10" height="26" strokeWidth="0.75" className="stroke-teal-light/70" />
                      {/* Air throw direction arrows */}
                      <path d="M 42 37 L 54 37 M 42 45 L 54 45 M 42 53 L 54 53" strokeWidth="0.5" className="stroke-cyan-400" />
                      
                      {/* Labels */}
                      <text x="31" y="27" fill="#1d9e75" fontSize="4.5" className="font-mono">EVAPORATOR</text>
                      <text x="50" y="60" fill="#6b7e94" fontSize="4.5" className="font-mono">COLD ROOM CORE</text>
                      <text x="76" y="25" fill="#38bdf8" fontSize="4.5" className="font-mono">EPDM DOOR SEAL</text>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[9px] font-mono text-slate-400">
                    <span>GRID REF: MIDH-95</span>
                    <span className="flex items-center gap-1 text-teal-light">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-light animate-ping" />
                      ENGINEERING MODEL
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace Area */}
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-12 flex-1">
        
        {/* Dynamic Detail Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Technical Specifications list */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-teal-light font-display uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="h-4 w-4" />
                Technical Specifications
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.specs.map((item, idx) => {
                  const specIcons = [Layers, ShieldCheck, Box, Gauge];
                  const IconComponent = specIcons[idx % specIcons.length];
                  
                  return (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className="group relative rounded-2xl border border-white/5 bg-[#0C2340]/40 p-5 shadow-sm hover:bg-white/5 hover:border-teal-light/20 hover:shadow-[0_0_15px_rgba(29,158,117,0.15)] flex flex-col justify-between"
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
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* NEW: Thermodynamic Heat Load & Sizing Calculator Section */}
            <div id="sizing-calculator-section" className="rounded-2xl border border-white/10 bg-[#0C2340]/60 p-6 md:p-8 shadow-xl relative scroll-mt-24">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2.5 mb-4 border-b border-white/5 pb-3">
                <Calculator className="h-5 w-5 text-teal-light" />
                <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-wider">
                  Thermodynamic Heat Load &amp; Sizing Calculator
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Calculate standard volumetric measurements, suggested refrigeration Tons (TR) capacity, recommended PUF panel thickness, and back-ended capital subsidy bounds dynamically.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Inputs Columns (col-span-5) */}
                <div className="md:col-span-5 space-y-4 bg-slate-950/25 p-4 rounded-xl border border-white/5">
                  <div className="text-[9px] text-slate-400 font-mono uppercase font-bold tracking-wider">Chamber Dimensions</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[8px] text-slate-400 font-mono block mb-1">Length (ft)</label>
                      <input
                        type="number"
                        value={calcLength}
                        onChange={(e) => setCalcLength(e.target.value)}
                        className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs font-mono text-white text-center focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 font-mono block mb-1">Width (ft)</label>
                      <input
                        type="number"
                        value={calcWidth}
                        onChange={(e) => setCalcWidth(e.target.value)}
                        className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs font-mono text-white text-center focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 font-mono block mb-1">Height (ft)</label>
                      <input
                        type="number"
                        value={calcHeight}
                        onChange={(e) => setCalcHeight(e.target.value)}
                        className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs font-mono text-white text-center focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[8px] text-slate-400 font-mono uppercase block mb-1">Temperature Profile</label>
                    <select
                      value={calcTempProfile}
                      onChange={(e) => setCalcTempProfile(e.target.value)}
                      className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="chilling">Chilling (0°C to +8°C)</option>
                      <option value="freezing">Freezing (-15°C to -18°C)</option>
                      <option value="deep-freezing">Deep Freezing (-20°C to -25°C)</option>
                      <option value="sterile-control">Sterile Room (+18°C to +22°C)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[8px] text-slate-400 font-mono uppercase block mb-1">Applicant Category</label>
                    <select
                      value={calcApplicant}
                      onChange={(e) => setCalcApplicant(e.target.value)}
                      className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="private">Private Enterprise (35% Grant)</option>
                      <option value="fpo">Farmer Group / FPO (50% Grant)</option>
                    </select>
                  </div>
                </div>

                {/* Outputs Column (col-span-7) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0A1A30]/50 border border-white/5 rounded-xl p-3.5">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">Volume</span>
                      <span className="text-sm font-bold font-mono text-white">
                        {volumeCuFt} <span className="text-[10px] text-slate-400">cu.ft.</span>
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono block">({volumeCuM} m³)</span>
                    </div>

                    <div className="bg-[#0A1A30]/50 border border-white/5 rounded-xl p-3.5">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">Calculated Load</span>
                      <span className="text-sm font-bold font-mono text-teal-light">
                        {coolingTR} <span className="text-[10px] text-slate-400">TR</span>
                      </span>
                      <span className="text-[8px] text-slate-400 font-mono block">Tons of Refrigeration</span>
                    </div>

                    <div className="bg-[#0A1A30]/50 border border-white/5 rounded-xl p-3.5">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">PUF Thickness</span>
                      <span className="text-sm font-bold font-mono text-white">
                        {pufThickness}
                      </span>
                      <span className="text-[8px] text-slate-400 font-mono block">Rigid Cam-lock Panel</span>
                    </div>

                    <div className="bg-[#0A1A30]/50 border border-white/5 rounded-xl p-3.5">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">Est. Gov Subsidy</span>
                      <span className="text-sm font-bold font-mono text-emerald-400">
                        {estimatedSubsidy}
                      </span>
                      <span className="text-[8px] text-slate-400 font-mono block">MIDH / NHM Scheme</span>
                    </div>
                  </div>

                  <button
                    onClick={handleApplySizingToForm}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white shadow-md transition-all active:scale-[0.98]"
                  >
                    <Sliders className="h-4 w-4" />
                    <span>Apply Sizing to Consultation Form</span>
                  </button>
                </div>

              </div>

            </div>

            {/* NEW: Engineering Parameters Datasheet Board */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <h3 className="text-xs font-bold text-teal-light font-display uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="h-4 w-4" />
                Engineering Parameters &amp; Compliance
              </h3>

              <div className="rounded-2xl border border-white/5 bg-[#0C2340]/40 overflow-hidden shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/5 font-mono">
                  {getTechnicalParameters(slug).map((param, i) => (
                    <div key={i} className="p-4 space-y-1">
                      <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-bold">{param.label}</span>
                      <div className="text-xs font-bold text-white">
                        {param.value} <span className="text-[9px] text-teal-light font-normal">{param.metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ideal Applications Section */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-light font-mono block">
                  DEPLOYMENT SOLUTIONS
                </span>
                <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider flex items-center gap-1.5">
                  <Ruler className="h-4 w-4" />
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
                  SEO &amp; SEARCH ASSISTANCE
                </span>
                <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="h-4.5 w-4.5 text-teal-light" />
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
            <div className="space-y-3 pt-6 border-t border-white/5">
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
                  "Customized Engineering: Tailored design parameters matching product load matrices.",
                  "Energy Efficient Systems: Sub-cooler cycles reducing ongoing electricity bills.",
                  "Subsidy Guidance: Compiling bankable DPR reports for MIDH, NHM, and NABARD grants.",
                  "Reliable After-Sales Support: Emergency 4-hour breakdown SLAs across Pune MIDC.",
                  "IoT Monitoring Ready: Integrated remote digital temperature & humidity telemetry.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-teal-light shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Callback Quote Intake form (col-span-1) */}
          <div id="sizing-form-card" className="relative h-fit lg:sticky lg:top-24 z-20 scroll-mt-24">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-25 blur-md pointer-events-none" />
            
            <div 
              className="relative rounded-2xl border border-white/15 bg-[#0C2340]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md overflow-hidden"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "16px 16px"
              }}
            >
              {/* Ambient glowing radial blur */}
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
                Need engineering heat gain load calculations or customized CAD layout blueprints? Request quote callback.
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
                    <p className="text-[10px] text-slate-300 leading-relaxed px-1">
                      Thanks <strong className="text-white">{name}</strong>. Our design draftsman will contact you within 30 minutes.
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
                      className="w-full rounded-xl bg-[#0C2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body animate-reveal-input"
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
                      className="w-full rounded-xl bg-[#0C2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold font-mono uppercase tracking-wider block mb-1">
                      Business / Organization
                    </label>
                    <input
                      type="text"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="e.g. Cooperative / Farm"
                      className="w-full rounded-xl bg-[#0C2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold font-mono uppercase tracking-wider block mb-1">
                      Sizing Parameters
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Enter details or click 'Apply Sizing' from the calculator above..."
                      className="w-full rounded-xl bg-[#0C2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body h-20 resize-none text-[10px] leading-relaxed"
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
