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
  Phone,
  MessageSquare,
  Wind,
  Zap,
  Play,
  Pause,
  TrendingUp,
  Sparkles,
  Eye,
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

// Tab metadata for product visuals
function getVisualTabs(slug: string) {
  const db: Record<string, { id: string; label: string }[]> = {
    "modular-cold-rooms": [
      { id: "airflow", label: "Airflow Design" },
      { id: "panel", label: "Panel Structure" },
      { id: "telemetry", label: "Temp. Monitoring" },
    ],
    "refrigeration-systems": [
      { id: "pid", label: "P&ID Diagram" },
      { id: "layout", label: "3D Layout" },
      { id: "panel", label: "Control Panel" },
    ],
    "display-cold-rooms": [
      { id: "airflow", label: "Airflow Design" },
      { id: "lighting", label: "LED Lighting" },
      { id: "thermostat", label: "Temperature Control" },
    ],
    "clean-rooms": [
      { id: "laminar", label: "HEPA Laminar Flow" },
      { id: "cascade", label: "Pressure Cascade" },
      { id: "telemetry", label: "Particle Telemetry" },
    ],
    "ripening-chambers": [
      { id: "airflow", label: "Airflow Design" },
      { id: "panel", label: "Control Panel" },
      { id: "dosing", label: "Gas Dosing Unit" },
    ],
    "blast-chillers": [
      { id: "airflow", label: "Airflow Design" },
      { id: "probe", label: "Core Probe" },
      { id: "controller", label: "Digital Controller" },
    ],
    "amc": [
      { id: "telemetry", label: "Telemetry Dashboard" },
      { id: "checklist", label: "Inspection Matrix" },
      { id: "sla", label: "SLA Response" },
    ],
    "consultation": [
      { id: "balance", label: "Thermal Balance" },
      { id: "simulation", label: "Airflow Simulation" },
      { id: "compliance", label: "DPR Checklist" },
    ],
  };
  return db[slug] || db["modular-cold-rooms"];
}

interface SystemVisualsProps {
  slug: string;
  serviceTitle: string;
}

function SystemVisuals({ slug, serviceTitle }: SystemVisualsProps) {
  const tabs = getVisualTabs(slug);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "airflow");

  // Local state controls for visuals interactivity
  const [fanSpeed, setFanSpeed] = useState<"off" | "low" | "medium" | "high">("medium");
  const [heatmap, setHeatmap] = useState(false);
  const [camLocked, setCamLocked] = useState(false);
  const [pufThickness, setPufThickness] = useState<60 | 100 | 120 | 150>(100);
  const [selectedSensor, setSelectedSensor] = useState<"sensor1" | "sensor2" | "sensor3">("sensor1");
  const [alarmActive, setAlarmActive] = useState(false);
  const [refrigLoad, setRefrigLoad] = useState<"low" | "normal" | "high">("normal");
  const [ledIntensity, setLedIntensity] = useState(80);
  const [heaterOn, setHeaterOn] = useState(true);
  const [doorOpen, setDoorOpen] = useState(false);
  const [ethyleneActive, setEthyleneActive] = useState(false);
  const [chillingCycle, setChillingCycle] = useState<"soft" | "hard" | "shock">("shock");
  const [vibrationSpeed, setVibrationSpeed] = useState(50);
  const [panelSwitches, setPanelSwitches] = useState({ power: true, defrost: false, fanAuto: true });

  // Telemetry sensor data mapping
  const sensorData = {
    sensor1: { label: "Ambient Temp (Air)", val: "-18.2°C", status: "Optimal", color: "text-emerald-400" },
    sensor2: { label: "Evaporator Temp", val: "-22.5°C", status: "Optimal", color: "text-teal-400" },
    sensor3: { label: "Product Core Temp", val: "-17.9°C", status: "Warning", color: "text-amber-400" }
  };

  // Reset tab when slug changes
  useEffect(() => {
    const currentTabs = getVisualTabs(slug);
    if (currentTabs.length > 0) {
      setActiveTab(currentTabs[0].id);
    }
  }, [slug]);

  // Render visual graphic based on slug and activeTab
  const renderVisualGraphic = () => {
    const strokeSpeed = fanSpeed === "off" ? "0s" : fanSpeed === "low" ? "4s" : fanSpeed === "medium" ? "1.5s" : "0.6s";
    const fanSpinSpeed = fanSpeed === "off" ? "0s" : fanSpeed === "low" ? "3s" : fanSpeed === "medium" ? "1s" : "0.3s";
    
    // 1. Modular Cold Rooms Sizing Visuals
    if (slug === "modular-cold-rooms") {
      if (activeTab === "airflow") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <style>{`
              @keyframes flow { to { stroke-dashoffset: -20; } }
              @keyframes fspin { to { transform: rotate(360deg); } }
              .flow-path { stroke-dasharray: 4, 4; animation: flow ${strokeSpeed} linear infinite; }
              .fan-blade { transform-origin: 25px 50px; animation: fspin ${fanSpinSpeed} linear infinite; }
            `}</style>
            
            {/* Grid overlay */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Heatmap overlay */}
            {heatmap && (
              <rect x="10" y="10" width="180" height="130" fill="url(#heat-grad)" opacity="0.45" rx="8" />
            )}
            <defs>
              <linearGradient id="heat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="40%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Outer Chamber outline */}
            <rect x="10" y="10" width="180" height="130" rx="8" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
            
            {/* Evaporator Unit */}
            <rect x="15" y="30" width="20" height="40" rx="2" fill="#0c2340" stroke="#10b981" strokeWidth="1" />
            {/* Evaporator Fan */}
            <circle cx="25" cy="50" r="7" fill="#030f26" stroke="#10b981" strokeWidth="0.5" />
            <path className="fan-blade" d="M 25 43 L 25 57 M 18 50 L 32 50" stroke="#10b981" strokeWidth="1.5" />

            {/* Airflow paths */}
            {fanSpeed !== "off" && (
              <>
                <path className="flow-path" d="M 35 45 C 80 45, 120 45, 175 45" fill="none" stroke="#22d3ee" strokeWidth="1" />
                <path className="flow-path" d="M 175 45 C 185 45, 185 105, 175 105" fill="none" stroke="#22d3ee" strokeWidth="1" />
                <path className="flow-path" d="M 175 105 C 120 105, 70 105, 35 105" fill="none" stroke="#06b6d4" strokeWidth="1" />
                <path className="flow-path" d="M 35 105 C 20 105, 20 55, 35 50" fill="none" stroke="#06b6d4" strokeWidth="1" />
              </>
            )}

            {/* Chamber contents / shelves */}
            <line x1="120" y1="65" x2="160" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <line x1="120" y1="90" x2="160" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <rect x="125" y="50" width="10" height="15" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="0.5" rx="1" />
            <rect x="145" y="75" width="12" height="15" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="0.5" rx="1" />

            {/* Labels */}
            <text x="25" y="25" fill="#10b981" fontSize="5" fontFamily="monospace" textAnchor="middle">EVAPORATOR</text>
            <text x="140" y="125" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="monospace" textAnchor="middle">PRODUCT CARRIER</text>
          </svg>
        );
      }
      
      if (activeTab === "panel") {
        const offset = camLocked ? 0 : 12;
        const widthVal = pufThickness === 60 ? 18 : pufThickness === 100 ? 25 : pufThickness === 120 ? 30 : 38;
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            {/* Grid overlay */}
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Left Panel slice */}
            <rect x="25" y="30" width={widthVal} height="90" fill="#0C2340" stroke="#10b981" strokeWidth="1" rx="2" />
            <rect x="28" y="33" width={widthVal - 6} height="84" fill="#030F26" stroke="rgba(16,185,129,0.1)" strokeWidth="1" rx="1" />
            {/* Polyurethane insulation filling texture */}
            <line x1="32" y1="36" x2="32" y2="114" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="1 3" />
            <line x1={22 + widthVal} y1="36" x2={22 + widthVal} y2="114" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="1 3" />

            {/* Right Panel slice (moves dynamically) */}
            <g transform={`translate(${offset}, 0)`}>
              <rect x="95" y="30" width={widthVal} height="90" fill="#0C2340" stroke="#10b981" strokeWidth="1" rx="2" />
              <rect x="98" y="33" width={widthVal - 6} height="84" fill="#030F26" stroke="rgba(16,185,129,0.1)" strokeWidth="1" rx="1" />
              <line x1="102" y1="36" x2="102" y2="114" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="1 3" />
              <line x1={92 + widthVal} y1="36" x2={92 + widthVal} y2="114" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="1 3" />

              {/* Pin receiver inside right panel */}
              <circle cx="102" cy="75" r="4.5" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
              <circle cx="102" cy="75" r="1.5" fill="#22d3ee" />
            </g>

            {/* Cam lock hook inside left panel */}
            <line x1={20 + widthVal} y1="75" x2={52 + widthVal} y2="75" stroke="#10b981" strokeWidth="2.5" />
            <path 
              d={camLocked ? `M ${40+widthVal} 75 C ${40+widthVal} 68, ${68+widthVal} 68, ${68+widthVal} 75` : `M ${40+widthVal} 75 C ${40+widthVal} 55, ${52+widthVal} 50, ${52+widthVal} 60`} 
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="2" 
              className="transition-all duration-500" 
            />

            {/* Label callouts */}
            <text x="35" y="23" fill="#10b981" fontSize="4.5" fontFamily="monospace">PANEL A ({pufThickness}mm)</text>
            <text x="110" y="23" fill="#10b981" fontSize="4.5" fontFamily="monospace">PANEL B ({pufThickness}mm)</text>

            <text x="100" y="138" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">
              {camLocked ? "JOINT COMPRESSED & LOCKED" : "ALIGN PANELS & ROTATE LATCH"}
            </text>
          </svg>
        );
      }
      
      if (activeTab === "telemetry") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex flex-col justify-between font-mono">
            {/* Telemetry Display Screen */}
            <div className={`relative rounded-lg border p-4 transition-all duration-300 ${alarmActive ? "bg-red-950/20 border-red-500/30" : "bg-slate-950/50 border-white/10"}`}>
              {/* Alert Warning Overlay */}
              {alarmActive && (
                <div className="absolute inset-0 bg-red-600/10 animate-pulse rounded-lg flex items-center justify-center border border-red-500 z-10">
                  <div className="text-center text-red-500 font-extrabold text-[10px] tracking-widest flex items-center gap-1.5 uppercase">
                    <ShieldAlert className="h-4.5 w-4.5 animate-bounce" />
                    <span>OVERTEMP ALERT SYSTEM TRIGGERED</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-start border-b border-white/5 pb-2 mb-2 text-[9px] text-slate-400">
                <span>SYSTEM ID: TV-NODE-409</span>
                <span className="flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full animate-ping ${alarmActive ? "bg-red-500" : "bg-emerald-500"}`} />
                  {alarmActive ? "ALERTING" : "STREAMING ONLINE"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1">
                {Object.entries(sensorData).map(([key, data]) => {
                  const isActive = selectedSensor === key;
                  return (
                    <button 
                      key={key}
                      onClick={() => setSelectedSensor(key as any)}
                      className={`text-left p-2 rounded border transition-all ${
                        isActive ? "bg-emerald-500/15 border-emerald-500" : "bg-transparent border-white/5 hover:border-white/10"
                      }`}
                    >
                      <span className="text-[7px] text-slate-400 block truncate">{data.label}</span>
                      <span className={`text-xs font-bold block ${isActive ? "text-emerald-300" : "text-white"}`}>{data.val}</span>
                      <span className="text-[6px] text-slate-500 block uppercase font-bold">{data.status}</span>
                    </button>
                  );
                })}
              </div>

              {/* simulated chart line */}
              <div className="h-10 w-full bg-slate-900/60 rounded border border-white/5 mt-3 relative overflow-hidden flex items-end">
                <svg className="w-full h-8" viewBox="0 0 160 30" preserveAspectRatio="none">
                  <path 
                    d={selectedSensor === "sensor1" 
                      ? "M 0 20 L 20 22 L 40 18 L 60 19 L 80 20 L 100 22 L 120 18 L 140 19 L 160 20"
                      : selectedSensor === "sensor2"
                      ? "M 0 28 L 20 27 L 40 29 L 60 28 L 80 27 L 100 28 L 120 29 L 140 27 L 160 28"
                      : "M 0 10 L 20 15 L 40 18 L 60 12 L 80 8 L 100 11 L 120 14 L 140 9 L 160 10"
                    } 
                    fill="none" 
                    stroke={alarmActive ? "#ef4444" : "#10b981"} 
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  <line x1="0" y1="15" x2="160" y2="15" stroke="rgba(239,68,68,0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
                </svg>
                <span className="absolute bottom-1 right-2 text-[6px] text-slate-500 font-mono">1m intervals</span>
              </div>
            </div>

            {/* Diagnostic Log Output */}
            <div className="bg-black/60 rounded p-2.5 text-[8px] text-slate-400 border border-white/5 space-y-1 text-left">
              <div>&gt; telemetry node initialized... OK</div>
              <div>&gt; gsm handshake established... 98% signal</div>
              <div>&gt; current payload packet sent to cloud vault: 32 bytes</div>
              {alarmActive ? (
                <div className="text-red-500 font-bold">&gt; WARNING: high threshold exceeded on sensor: {sensorData[selectedSensor].label}</div>
              ) : (
                <div className="text-emerald-400">&gt; monitoring status: optimal. no deviations recorded.</div>
              )}
            </div>
          </div>
        );
      }
    }

    // 2. Refrigeration Systems Visuals
    if (slug === "refrigeration-systems") {
      if (activeTab === "pid") {
        const loopSpeed = refrigLoad === "low" ? "5s" : refrigLoad === "normal" ? "2s" : "0.8s";
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <style>{`
              @keyframes dashflow { to { stroke-dashoffset: -20; } }
              .pipe-flow { stroke-dasharray: 4, 4; animation: dashflow ${loopSpeed} linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Compressor */}
            <rect x="25" y="90" width="24" height="24" rx="12" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <text x="37" y="104" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">COMP</text>

            {/* Condenser */}
            <rect x="85" y="20" width="30" height="20" rx="2" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <text x="100" y="32" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">CONDENSER</text>

            {/* Receiver */}
            <rect x="150" y="20" width="20" height="30" rx="3" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <text x="160" y="37" fill="#10b981" fontSize="4" fontFamily="monospace" textAnchor="middle">RECEIVER</text>

            {/* Expansion Valve */}
            <polygon points="160,102 170,95 170,109" fill="#0C2340" stroke="#22d3ee" strokeWidth="1" />
            <polygon points="160,102 150,95 150,109" fill="#0C2340" stroke="#22d3ee" strokeWidth="1" />
            <text x="160" y="117" fill="#22d3ee" fontSize="4.5" fontFamily="monospace" textAnchor="middle">TXV</text>

            {/* Evaporator */}
            <rect x="85" y="90" width="30" height="20" rx="2" fill="#0C2340" stroke="#22d3ee" strokeWidth="1" />
            <text x="100" y="102" fill="#22d3ee" fontSize="4.5" fontFamily="monospace" textAnchor="middle">EVAP</text>

            {/* Piping Loop lines */}
            {/* Hot Gas line (compressor to condenser) */}
            <path className="pipe-flow" d="M 37 90 L 37 30 L 85 30" fill="none" stroke="#ef4444" strokeWidth="1" />
            {/* Liquid Line (condenser to receiver to TXV) */}
            <path className="pipe-flow" d="M 115 30 L 150 30" fill="none" stroke="#f59e0b" strokeWidth="1" />
            <path className="pipe-flow" d="M 160 50 L 160 95" fill="none" stroke="#f59e0b" strokeWidth="1" />
            {/* Low Pressure Liquid (TXV to evaporator) */}
            <path className="pipe-flow" d="M 150 102 L 115 102" fill="none" stroke="#06b6d4" strokeWidth="1" />
            {/* Suction Gas (evaporator to compressor) */}
            <path className="pipe-flow" d="M 85 102 L 49 102" fill="none" stroke="#3b82f6" strokeWidth="1" />

            <text x="100" y="75" fill="rgba(255,255,255,0.3)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">
              REFRIGERANT FLOW: {refrigLoad.toUpperCase()} LOAD
            </text>
          </svg>
        );
      }
      
      if (activeTab === "layout") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Condensing unit chassis outer layout blueprint */}
            <rect x="25" y="25" width="150" height="100" rx="4" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
            <rect x="30" y="30" width="140" height="90" rx="2" fill="#0C2340" stroke="#10b981" strokeWidth="1" />

            {/* Fan guards */}
            <circle cx="65" cy="75" r="26" fill="#030F26" stroke="#10b981" strokeWidth="0.75" />
            <circle cx="135" cy="75" r="26" fill="#030F26" stroke="#10b981" strokeWidth="0.75" />
            
            {/* Fan Blades spinning */}
            <path className="fan-blade" style={{ transformOrigin: "65px 75px", animation: `fspin ${fanSpinSpeed} linear infinite` }} d="M 65 52 L 65 98 M 42 75 L 88 75" stroke="#22d3ee" strokeWidth="2.5" />
            <path className="fan-blade" style={{ transformOrigin: "135px 75px", animation: `fspin ${fanSpinSpeed} linear infinite` }} d="M 135 52 L 135 98 M 112 75 L 158 75" stroke="#22d3ee" strokeWidth="2.5" />

            {/* Compressor Dome placement visual */}
            <rect x="90" y="65" width="20" height="30" rx="8" fill="#0c2340" stroke="#10b981" strokeWidth="1" />
            
            {/* Technical labeling */}
            <text x="100" y="20" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">OUTDOOR DUAL-FAN CONDENSING UNIT</text>
            <text x="100" y="112" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">COOPELAND RESILIENT GRIDS</text>
          </svg>
        );
      }
      
      if (activeTab === "panel") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex gap-4 font-mono">
            {/* Control Panel Door */}
            <div className="w-2/5 border border-[#10b981]/50 bg-slate-900 rounded-lg p-3 flex flex-col justify-between select-none">
              <div className="text-[8px] text-center text-emerald-400 border-b border-white/5 pb-1">PANEL OVERRIDE</div>
              
              {/* LED lamps */}
              <div className="flex justify-around py-2">
                <div className="text-center">
                  <div className={`h-4 w-4 rounded-full mx-auto mb-1 transition-all ${panelSwitches.power ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" : "bg-emerald-950"}`} />
                  <span className="text-[6px] text-slate-500">POWER</span>
                </div>
                <div className="text-center">
                  <div className={`h-4 w-4 rounded-full mx-auto mb-1 transition-all ${panelSwitches.defrost ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" : "bg-amber-950"}`} />
                  <span className="text-[6px] text-slate-500">DEFROST</span>
                </div>
                <div className="text-center">
                  <div className="h-4 w-4 rounded-full mx-auto mb-1 bg-red-950" />
                  <span className="text-[6px] text-slate-500">FAULT</span>
                </div>
              </div>

              {/* Selector switches */}
              <div className="space-y-2">
                <button 
                  onClick={() => setPanelSwitches(prev => ({ ...prev, power: !prev.power }))}
                  className={`w-full text-center py-1 text-[7px] font-bold rounded border ${panelSwitches.power ? "bg-emerald-500/10 border-emerald-500 text-emerald-300" : "bg-transparent border-white/5 text-slate-500"}`}
                >
                  MAINS {panelSwitches.power ? "ON" : "OFF"}
                </button>
                <button 
                  onClick={() => setPanelSwitches(prev => ({ ...prev, defrost: !prev.defrost }))}
                  className={`w-full text-center py-1 text-[7px] font-bold rounded border ${panelSwitches.defrost ? "bg-amber-500/10 border-amber-500 text-amber-300" : "bg-transparent border-white/5 text-slate-500"}`}
                >
                  MAN DEFROST
                </button>
              </div>
            </div>

            {/* Dial / Gauge details */}
            <div className="w-3/5 flex flex-col justify-between py-1 text-left">
              <div className="border border-white/5 rounded bg-black/40 p-2 space-y-1.5">
                <div className="flex justify-between items-center text-[8px] text-slate-400">
                  <span>LINE VOLTAGE</span>
                  <span className="text-emerald-400 font-bold">415 V</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: panelSwitches.power ? "85%" : "0%" }} />
                </div>
              </div>

              <div className="border border-white/5 rounded bg-black/40 p-2 space-y-1.5">
                <div className="flex justify-between items-center text-[8px] text-slate-400">
                  <span>MOTOR CURRENT</span>
                  <span className="text-emerald-400 font-bold">{panelSwitches.power ? (panelSwitches.defrost ? "4.5 A" : "18.2 A") : "0.0 A"}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: panelSwitches.power ? (panelSwitches.defrost ? "25%" : "72%") : "0%" }} />
                </div>
              </div>

              <div className="text-[7px] text-slate-500 space-y-0.5">
                <div>&gt; LP SWITCH STATUS: CONTACT CLOSED (2.4 bar)</div>
                <div>&gt; HP SWITCH STATUS: CONTACT CLOSED (18.5 bar)</div>
                <div>&gt; PH-SEQUENCER PRESET: OPTIMAL</div>
              </div>
            </div>
          </div>
        );
      }
    }

    // 3. Glass Display Cold Rooms Visuals
    if (slug === "display-cold-rooms") {
      if (activeTab === "airflow") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <style>{`
              @keyframes gravityflow { to { stroke-dashoffset: 20; } }
              .g-flow { stroke-dasharray: 3, 3; animation: gravityflow 3s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Ceiling Gravity Coils */}
            <rect x="20" y="15" width="160" height="12" rx="1" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <text x="100" y="23" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">GRAVITY COOLING COILS</text>

            {/* Display racks */}
            <line x1="25" y1="55" x2="175" y2="55" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="25" y1="90" x2="175" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="25" y1="120" x2="175" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

            {/* Soft vertical drafts */}
            <line className="g-flow" x1="45" y1="30" x2="45" y2="135" stroke="#22d3ee" strokeWidth="0.75" />
            <line className="g-flow" x1="100" y1="30" x2="100" y2="135" stroke="#22d3ee" strokeWidth="0.75" />
            <line className="g-flow" x1="155" y1="30" x2="155" y2="135" stroke="#22d3ee" strokeWidth="0.75" />

            {/* Beverage display items */}
            <rect x="55" y="42" width="6" height="12" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="0.5" rx="0.5" />
            <rect x="63" y="42" width="6" height="12" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="0.5" rx="0.5" />
            <rect x="120" y="77" width="6" height="12" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="0.5" rx="0.5" />

            {/* Front Glass frame */}
            <rect x="12" y="10" width="176" height="130" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="3" />
            <text x="100" y="145" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">SOFT GRAVITY CONVECTION DRAFTS</text>
          </svg>
        );
      }

      if (activeTab === "lighting") {
        const opacityVal = ledIntensity / 100;
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Product racks outline */}
            <rect x="35" y="25" width="130" height="100" fill="#0C2340" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            
            {/* Shelf lines */}
            <line x1="35" y1="60" x2="165" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="35" y1="95" x2="165" y2="95" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {/* Diffused light cones overlay */}
            <polygon points="35,25 65,25 65,125 35,125" fill="url(#led-glow)" opacity={opacityVal * 0.4} />
            <polygon points="165,25 135,25 135,125 165,125" fill="url(#led-glow)" opacity={opacityVal * 0.4} />

            <defs>
              <linearGradient id="led-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Vertical LED light bars */}
            <line x1="35" y1="25" x2="35" y2="125" stroke="#22d3ee" strokeWidth="2.5" opacity={opacityVal} />
            <line x1="165" y1="25" x2="165" y2="125" stroke="#22d3ee" strokeWidth="2.5" opacity={opacityVal} />

            {/* Render items on shelves */}
            <circle cx="50" cy="50" r="5" fill="#10b981" />
            <circle cx="80" cy="50" r="5" fill="#f59e0b" />
            <circle cx="110" cy="85" r="5" fill="#ef4444" />
            <circle cx="140" cy="85" r="5" fill="#3b82f6" />

            <text x="100" y="18" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">VERTICAL MULLION LIGHTING MATRIX</text>
          </svg>
        );
      }

      if (activeTab === "thermostat") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Shelf view behind glass */}
            <rect x="25" y="25" width="150" height="100" fill="#0C2340" opacity="0.6" />
            <line x1="25" y1="75" x2="175" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

            {/* Condensation fog overlay if heater is off */}
            {!heaterOn && (
              <g opacity="0.65">
                <rect x="25" y="25" width="150" height="100" fill="#e2e8f0" rx="1" />
                {/* simulated condensation streaks */}
                <path d="M 50 35 L 50 85 M 90 40 L 90 70 M 140 30 L 140 100 M 110 60 L 110 110" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
                <text x="100" y="78" fill="#475569" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">CONDENSATION FOG</text>
              </g>
            )}

            {/* Glass door frame with heater warning labels */}
            <rect x="20" y="20" width="160" height="110" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
            <rect x="22" y="22" width="156" height="106" fill="none" stroke="#10b981" strokeWidth="0.75" />

            {/* Heated frame callouts */}
            <text x="100" y="15" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">ANTI-FOG HEATED FRAME SYSTEM</text>
            <text x="100" y="142" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">
              STATUS: {heaterOn ? "HEATER ON (FOG CLEARED)" : "HEATER OFF (FOG FORMING)"}
            </text>
          </svg>
        );
      }
    }

    // Default fallback (e.g. for clean-rooms, blast-chillers, etc. which can also be rendered or fall back to General Loop)
    // 4. Clean Rooms & Sterile Chambers
    if (slug === "clean-rooms") {
      if (activeTab === "laminar") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <style>{`
              @keyframes downward { to { stroke-dashoffset: -20; } }
              .laminar-path { stroke-dasharray: 5, 5; animation: downward 2s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* HEPA filter ceiling grid */}
            <rect x="15" y="15" width="170" height="15" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <line x1="57" y1="15" x2="57" y2="30" stroke="#10b981" strokeWidth="1" />
            <line x1="100" y1="15" x2="100" y2="30" stroke="#10b981" strokeWidth="1" />
            <line x1="142" y1="15" x2="142" y2="30" stroke="#10b981" strokeWidth="1" />

            {/* Vertical parallel air loops */}
            <line className="laminar-path" x1="35" y1="30" x2="35" y2="125" stroke="#22d3ee" strokeWidth="1" />
            <line className="laminar-path" x1="75" y1="30" x2="75" y2="125" stroke="#22d3ee" strokeWidth="1" />
            <line className="laminar-path" x1="125" y1="30" x2="125" y2="125" stroke="#22d3ee" strokeWidth="1" />
            <line className="laminar-path" x1="165" y1="30" x2="165" y2="125" stroke="#22d3ee" strokeWidth="1" />

            {/* Low-level return vents */}
            <rect x="15" y="125" width="20" height="10" fill="#0C2340" stroke="#10b981" strokeWidth="0.5" />
            <rect x="165" y="125" width="20" height="10" fill="#0C2340" stroke="#10b981" strokeWidth="0.5" />

            <text x="100" y="24" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">HEPA FILTERS (99.97% EFFICIENCY)</text>
            <text x="100" y="142" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">VERTICAL UNIDIRECTIONAL LAMINAR AIRFLOW</text>
          </svg>
        );
      }

      if (activeTab === "cascade") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Chamber partitions */}
            {/* Corridor */}
            <rect x="15" y="30" width="50" height="90" fill="rgba(255,255,255,0.02)" stroke="rgba(16,185,129,0.2)" />
            <text x="40" y="45" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">CORRIDOR</text>
            <text x="40" y="75" fill="#ef4444" fontSize="6.5" fontFamily="monospace" textAnchor="middle">0 Pa</text>

            {/* Ante-room */}
            <rect x="65" y="30" width="60" height="90" fill="rgba(255,255,255,0.02)" stroke="rgba(16,185,129,0.2)" />
            <text x="95" y="45" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">ANTE-ROOM</text>
            <text x="95" y="75" fill="#f59e0b" fontSize="6.5" fontFamily="monospace" textAnchor="middle">+15 Pa</text>

            {/* Sterile core */}
            <rect x="125" y="30" width="60" height="90" fill="rgba(16,185,129,0.05)" stroke="#10b981" strokeWidth="1.5" />
            <text x="155" y="45" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">STERILE CORE</text>
            <text x="155" y="75" fill="#10b981" fontSize="7.5" fontFamily="monospace" textAnchor="middle">+30 Pa</text>

            {/* Pressure cascade flow indicators */}
            <path d="M 120 70 L 130 75 L 120 80 Z" fill="#10b981" transform="rotate(180, 125, 75)" />
            <path d="M 60 70 L 70 75 L 60 80 Z" fill="#f59e0b" transform="rotate(180, 65, 75)" />

            <text x="100" y="20" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">POSITIVE PRESSURE GRADIENT CASCADES</text>
            <text x="100" y="138" fill="rgba(255,255,255,0.4)" fontSize="4" fontFamily="monospace" textAnchor="middle">PREVENTS BACKFLOW CONTAMINATION ON ENTRY</text>
          </svg>
        );
      }

      if (activeTab === "telemetry") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex flex-col justify-between font-mono">
            <div className="rounded-lg bg-slate-950/50 border border-white/10 p-3 text-left">
              <div className="text-[8px] text-slate-500 mb-2">PARTICULATE DUST MONITOR</div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/5 p-2 rounded bg-black/20">
                  <span className="text-[6px] text-slate-500 block">PM 0.3 CHANNEL</span>
                  <span className="text-sm font-bold text-white">12 <span className="text-[7px] text-slate-400">pcs/m³</span></span>
                  <span className="text-[5px] text-emerald-400 block font-bold uppercase">ISO CLASS 5 OK</span>
                </div>
                <div className="border border-white/5 p-2 rounded bg-black/20">
                  <span className="text-[6px] text-slate-500 block">PM 0.5 CHANNEL</span>
                  <span className="text-sm font-bold text-white">4 <span className="text-[7px] text-slate-400">pcs/m³</span></span>
                  <span className="text-[5px] text-emerald-400 block font-bold uppercase">ISO CLASS 5 OK</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[7px] text-slate-400 border-t border-white/5 pt-2 mt-2">
                <span>FILTER HEPA RESISTANCE:</span>
                <span className="text-teal-400 font-bold">120 Pa</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button 
                onClick={() => {
                  setDoorOpen(true);
                  setTimeout(() => setDoorOpen(false), 2000);
                }}
                disabled={doorOpen}
                className="w-1/2 text-center py-2 text-[8px] font-bold rounded bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50"
              >
                {doorOpen ? "DOOR AJAR (Cascade active)" : "SIMULATE DOOR OPEN"}
              </button>
              <div className="w-1/2 text-left bg-slate-900/60 p-2 rounded border border-white/5 text-[7px] text-slate-400">
                {doorOpen ? (
                  <span className="text-amber-400 font-bold animate-pulse">&gt; Air velocity spike at seal: 0.45 m/s</span>
                ) : (
                  <span>&gt; Sealed differential locks stable at +30.2 Pa</span>
                )}
              </div>
            </div>
          </div>
        );
      }
    }

    // 5. Fruits Ripening Chambers Visuals
    if (slug === "ripening-chambers") {
      if (activeTab === "airflow") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <style>{`
              @keyframes ripenflow { to { stroke-dashoffset: -20; } }
              .ripen-path { stroke-dasharray: 4, 4; animation: ripenflow 2s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Pallet crate stack A */}
            <rect x="25" y="40" width="30" height="70" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <line x1="25" y1="63" x2="55" y2="63" stroke="rgba(16,185,129,0.3)" />
            <line x1="25" y1="87" x2="55" y2="87" stroke="rgba(16,185,129,0.3)" />

            {/* Pallet crate stack B */}
            <rect x="75" y="40" width="30" height="70" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <line x1="75" y1="63" x2="105" y2="63" stroke="rgba(16,185,129,0.3)" />
            <line x1="75" y1="87" x2="105" y2="87" stroke="rgba(16,185,129,0.3)" />

            {/* Tarp suction fan on the ceiling/right */}
            <rect x="135" y="45" width="40" height="60" fill="#0C2340" stroke="#22d3ee" strokeWidth="1" />
            <circle cx="155" cy="75" r="14" fill="#030F26" stroke="#22d3ee" strokeWidth="0.5" />
            <path className="fan-blade" style={{ transformOrigin: "155px 75px", animation: `fspin 0.8s linear infinite` }} d="M 155 58 L 155 92 M 138 75 L 172 75" stroke="#22d3ee" strokeWidth="1.5" />

            {/* Forced Airflow currents through crates */}
            <path className="ripen-path" d="M 15 50 L 70 50 L 135 50" fill="none" stroke="#22d3ee" strokeWidth="0.8" />
            <path className="ripen-path" d="M 15 75 L 70 75 L 135 75" fill="none" stroke="#22d3ee" strokeWidth="0.8" />
            <path className="ripen-path" d="M 15 98 L 70 98 L 135 98" fill="none" stroke="#22d3ee" strokeWidth="0.8" />

            {/* Labels */}
            <text x="40" y="33" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">PALLET RACKS</text>
            <text x="155" y="33" fill="#22d3ee" fontSize="4.5" fontFamily="monospace" textAnchor="middle">SUCTION WALL</text>
            <text x="100" y="132" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">FORCED-AIR TARP RIPENING SYSTEM</text>
          </svg>
        );
      }

      if (activeTab === "panel") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex flex-col justify-between font-mono">
            <div className="rounded-lg bg-slate-950/50 border border-white/10 p-3 text-left">
              <div className="text-[8px] text-slate-500 mb-2">PLC RIPENING CONTROLLER</div>

              <div className="space-y-2 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">ETHYLENE SETPOINT:</span>
                  <span className="text-emerald-400 font-bold">100 PPM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">CO2 CONCENTRATION:</span>
                  <span className="text-amber-400 font-bold">0.45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">RELATIVE HUMIDITY:</span>
                  <span className="text-teal-400 font-bold">92%</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setEthyleneActive(true);
                  setTimeout(() => setEthyleneActive(false), 3000);
                }}
                className="w-1/2 py-2 text-[8px] font-bold rounded bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                START ETHYLENE DOSE
              </button>
              <div className="w-1/2 text-left bg-slate-900/60 p-2 rounded border border-white/5 text-[7px] text-slate-400">
                {ethyleneActive ? (
                  <span className="text-emerald-400 font-bold animate-pulse">&gt; Dosing solenoid active. Gas injection path open.</span>
                ) : (
                  <span>&gt; Standby mode. Venting exhaust fans off.</span>
                )}
              </div>
            </div>
          </div>
        );
      }

      if (activeTab === "dosing") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <style>{`
              @keyframes inject { to { stroke-dashoffset: -10; opacity: 0.8; } }
              .gas-particle { stroke-dasharray: 2, 4; animation: inject 1s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Ethylene gas cylinder */}
            <rect x="25" y="45" width="24" height="65" rx="8" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <rect x="31" y="38" width="12" height="7" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <text x="37" y="78" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle" transform="rotate(-90, 37, 78)">ETHYLENE</text>

            {/* Gas dosing pipeline */}
            <path d="M 37 38 L 37 25 L 140 25 L 140 50" fill="none" stroke="#10b981" strokeWidth="1.5" />
            
            {/* Solenoid valve body */}
            <polygon points="85,20 95,20 90,25" fill="#0C2340" stroke="#22d3ee" strokeWidth="1" />
            <polygon points="85,30 95,30 90,25" fill="#0C2340" stroke="#22d3ee" strokeWidth="1" />
            <rect x="87" y="12" width="6" height="8" fill="#0c2340" stroke="#22d3ee" strokeWidth="1" />
            
            {/* Nozzle outlet */}
            <polygon points="135,50 145,50 140,58" fill="#0C2340" stroke="#22d3ee" strokeWidth="1" />

            {/* Dosing particles */}
            {ethyleneActive && (
              <path className="gas-particle" d="M 140 58 C 140 90, 110 110, 80 110" fill="none" stroke="#22d3ee" strokeWidth="2" />
            )}

            {/* Labels */}
            <text x="90" y="8" fill="#22d3ee" fontSize="4.5" fontFamily="monospace" textAnchor="middle">SOLENOID INJECTOR</text>
            <text x="140" y="130" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">DOSING LINES &amp; DISCHARGE NOZZLE</text>
          </svg>
        );
      }
    }

    // 6. Blast Chillers & Shock Freezers Visuals
    if (slug === "blast-chillers") {
      if (activeTab === "airflow") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <style>{`
              @keyframes highblast { to { stroke-dashoffset: -20; } }
              .blast-flow { stroke-dasharray: 6, 3; animation: highblast 0.6s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* High velocity fans at back */}
            <rect x="15" y="30" width="20" height="90" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
            <circle cx="25" cy="50" r="8" fill="#030f26" stroke="#10b981" strokeWidth="0.5" />
            <path className="fan-blade" style={{ transformOrigin: "25px 50px", animation: "fspin 0.2s linear infinite" }} d="M 25 42 L 25 58 M 17 50 L 33 50" stroke="#22d3ee" strokeWidth="1" />
            <circle cx="25" cy="100" r="8" fill="#030f26" stroke="#10b981" strokeWidth="0.5" />
            <path className="fan-blade" style={{ transformOrigin: "25px 100px", animation: "fspin 0.2s linear infinite" }} d="M 25 92 L 25 108 M 17 100 L 33 100" stroke="#22d3ee" strokeWidth="1" />

            {/* Trolley food rack */}
            <rect x="90" y="35" width="40" height="80" rx="2" fill="#0c2340" stroke="#10b981" strokeWidth="1" />
            {/* Racks trays lines */}
            <line x1="90" y1="50" x2="130" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="90" y1="65" x2="130" y2="65" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="90" y1="80" x2="130" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="90" y1="95" x2="130" y2="95" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {/* Horizontal flow lines */}
            <line className="blast-flow" x1="35" y1="50" x2="185" y2="50" stroke="#22d3ee" strokeWidth="1.2" />
            <line className="blast-flow" x1="35" y1="75" x2="185" y2="75" stroke="#22d3ee" strokeWidth="1.2" />
            <line className="blast-flow" x1="35" y1="98" x2="185" y2="98" stroke="#22d3ee" strokeWidth="1.2" />

            {/* Labels */}
            <text x="25" y="22" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">BLAST FANS</text>
            <text x="110" y="28" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">TROLLEY CART</text>
            <text x="100" y="132" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">HIGH-VELOCITY HORIZONTAL AIR BLAST (5.0 m/s)</text>
          </svg>
        );
      }

      if (activeTab === "probe") {
        return (
          <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Product profile cross section */}
            <circle cx="85" cy="75" r="40" fill="#0C2340" stroke="#10b981" strokeWidth="1.5" />
            {/* Shell layer */}
            <circle cx="85" cy="75" r="30" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="2 2" />
            {/* Core zone */}
            <circle cx="85" cy="75" r="10" fill="#030F26" stroke="#22d3ee" strokeWidth="1" />

            {/* Insertion needle probe */}
            <line x1="165" y1="75" x2="87" y2="75" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="165" cy="75" r="4" fill="#0c2340" stroke="#f59e0b" strokeWidth="1" />

            {/* Temp point dots */}
            <circle cx="87" cy="75" r="1.5" fill="#ef4444" />
            <circle cx="115" cy="75" r="1.5" fill="#f59e0b" />
            <circle cx="140" cy="75" r="1.5" fill="#10b981" />

            {/* Legend readouts */}
            <text x="160" y="30" fill="#ef4444" fontSize="4.5" fontFamily="monospace">CORE TEMP: +3.2°C</text>
            <text x="160" y="45" fill="#f59e0b" fontSize="4.5" fontFamily="monospace">MID TEMP: -8.5°C</text>
            <text x="160" y="60" fill="#10b981" fontSize="4.5" fontFamily="monospace">SHELL TEMP: -18.0°C</text>

            <text x="100" y="132" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">MULTI-POINT CORE THERMOMETER INSERTION PROBE</text>
          </svg>
        );
      }

      if (activeTab === "controller") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex flex-col justify-between font-mono">
            <div className="rounded-lg bg-slate-950/50 border border-white/10 p-3 text-left">
              <div className="text-[8px] text-slate-500 mb-2">SHOCK FREEZING CYCLE CURVE</div>
              
              <div className="flex gap-4 mb-2">
                <button 
                  onClick={() => setChillingCycle("soft")}
                  className={`px-3 py-1 text-[7px] font-bold rounded border ${chillingCycle === "soft" ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-transparent border-white/5"}`}
                >
                  SOFT CHILL
                </button>
                <button 
                  onClick={() => setChillingCycle("hard")}
                  className={`px-3 py-1 text-[7px] font-bold rounded border ${chillingCycle === "hard" ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-transparent border-white/5"}`}
                >
                  HARD CHILL
                </button>
                <button 
                  onClick={() => setChillingCycle("shock")}
                  className={`px-3 py-1 text-[7px] font-bold rounded border ${chillingCycle === "shock" ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-transparent border-white/5"}`}
                >
                  SHOCK FREEZE
                </button>
              </div>

              {/* simulated cycle rate curve */}
              <svg className="w-full h-16 bg-slate-900/60 rounded border border-white/5 relative" viewBox="0 0 160 50">
                {/* target curve */}
                <path 
                  d={chillingCycle === "soft"
                    ? "M 0 5 Q 50 15, 100 22 T 160 25"
                    : chillingCycle === "hard"
                    ? "M 0 5 L 40 25 L 100 35 L 160 38"
                    : "M 0 5 L 30 35 L 75 42 L 160 44"
                  } 
                  fill="none" 
                  stroke="#22d3ee" 
                  strokeWidth="2" 
                  className="transition-all duration-500"
                />
                
                {/* labels */}
                <text x="145" y="48" fill="#64748b" fontSize="4">&gt; -18°C</text>
                <text x="5" y="10" fill="#64748b" fontSize="4">+70°C</text>
                <text x="80" y="48" fill="#64748b" fontSize="4">90 mins</text>
              </svg>
            </div>
            
            <div className="text-[7.5px] text-slate-500 text-left">
              &gt; shock cooling rate: 1.2°C per minute pulling rate... OK. cell structure lock integrity: 100% active.
            </div>
          </div>
        );
      }
    }

    // Default general layout (for AMC, Consultation, etc.)
    return (
      <svg className="w-full h-full bg-[#030F26] rounded-xl border border-white/5" viewBox="0 0 200 150">
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect x="20" y="20" width="160" height="110" rx="3" fill="#0C2340" stroke="#10b981" strokeWidth="1" />
        
        {/* Simple schematic representation */}
        <circle cx="65" cy="75" r="22" fill="#030F26" stroke="#22d3ee" strokeWidth="1.5" />
        <path d="M 65 53 L 65 97 M 43 75 L 87 75" stroke="#22d3ee" strokeWidth="1" />
        
        <circle cx="135" cy="75" r="22" fill="#030F26" stroke="#22d3ee" strokeWidth="1.5" />
        <path d="M 135 53 L 135 97 M 113 75 L 157 75" stroke="#22d3ee" strokeWidth="1" />

        <text x="100" y="15" fill="#10b981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">{serviceTitle.toUpperCase()} SCHEMATIC</text>
        <text x="100" y="142" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">ENGINEERING SYSTEM SCHEMATIC MODEL</text>
      </svg>
    );
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0C2340]/60 p-6 md:p-8 shadow-xl relative scroll-mt-24">
      {/* Decorative top blur glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 border-b border-white/5 pb-3">
        <Eye className="h-5 w-5 text-emerald-400" />
        <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-wider">
          System Visuals &amp; Engineering Diagrams
        </h3>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-6 font-body">
        Select the tabs below to explore real-time thermodynamic airflow diagrams, panel joint models, and dynamic sensor telemetry profiles.
      </p>

      {/* Showcase area grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Showcase (col-span-8) */}
        <div className="md:col-span-8 flex justify-center relative select-none">
          <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] pointer-events-none z-0" />
          <div className="w-full aspect-[4/3] relative z-10">
            {renderVisualGraphic()}
          </div>
        </div>

        {/* Right Column: Visual Controls (col-span-4) */}
        <div className="md:col-span-4 space-y-4 bg-slate-950/30 p-4 rounded-xl border border-white/5 h-full flex flex-col justify-between min-h-[220px]">
          <div className="space-y-4 text-left">
            <div className="text-[9px] text-slate-400 font-mono uppercase font-bold tracking-wider border-b border-white/5 pb-1">
              Interactive Controls
            </div>

            {/* Controls for modular-cold-rooms */}
            {slug === "modular-cold-rooms" && activeTab === "airflow" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[8px] text-slate-400 font-mono uppercase block">Evaporator Fan Speed</label>
                  <div className="grid grid-cols-4 gap-1">
                    {(["off", "low", "medium", "high"] as const).map((spd) => (
                      <button 
                        key={spd}
                        onClick={() => setFanSpeed(spd)}
                        className={`text-[8px] font-bold py-1 rounded capitalize border transition-all ${
                          fanSpeed === spd ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-transparent border-white/5 text-slate-500"
                        }`}
                      >
                        {spd}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setHeatmap(!heatmap)}
                  className={`w-full py-2 text-[8.5px] font-bold rounded border transition-all flex items-center justify-center gap-1.5 ${
                    heatmap ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-transparent border-white/5 text-slate-500"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Toggle Temperature Heatmap</span>
                </button>
              </div>
            )}

            {slug === "modular-cold-rooms" && activeTab === "panel" && (
              <div className="space-y-3">
                <button 
                  onClick={() => setCamLocked(!camLocked)}
                  className={`w-full py-2 text-[8.5px] font-bold rounded border transition-all flex items-center justify-center gap-1.5 ${
                    camLocked ? "bg-emerald-600 border-emerald-500 text-white" : "bg-transparent border-white/5 text-slate-500 hover:border-white/10"
                  }`}
                >
                  <span>{camLocked ? "Release Cam-Lock Joint" : "Engage Cam-Lock Joint"}</span>
                </button>

                <div className="space-y-1">
                  <label className="text-[8px] text-slate-400 font-mono uppercase block">Panel Insulation Core</label>
                  <div className="grid grid-cols-4 gap-1">
                    {([60, 100, 120, 150] as const).map((thk) => (
                      <button 
                        key={thk}
                        onClick={() => setPufThickness(thk)}
                        className={`text-[8px] font-bold py-1 rounded border transition-all ${
                          pufThickness === thk ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-transparent border-white/5 text-slate-500"
                        }`}
                      >
                        {thk}mm
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {slug === "modular-cold-rooms" && activeTab === "telemetry" && (
              <div className="space-y-3">
                <button 
                  onClick={() => setAlarmActive(!alarmActive)}
                  className={`w-full py-2.5 text-[8.5px] font-bold rounded border transition-all flex items-center justify-center gap-1.5 ${
                    alarmActive ? "bg-red-600 border-red-500 text-white animate-pulse" : "bg-transparent border-white/5 text-slate-500 hover:border-white/10"
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>{alarmActive ? "Acknowledge Alert" : "Simulate Alarm Test"}</span>
                </button>
                <div className="text-[7.5px] text-slate-500 leading-normal">
                  Toggle the test trigger above to verify the automatic digital relay alerts in over-temperature safety scenarios.
                </div>
              </div>
            )}

            {/* Controls for refrigeration-systems */}
            {slug === "refrigeration-systems" && activeTab === "pid" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[8px] text-slate-400 font-mono uppercase block">System Refrigeration Load</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["low", "normal", "high"] as const).map((ld) => (
                      <button 
                        key={ld}
                        onClick={() => setRefrigLoad(ld)}
                        className={`text-[8px] font-bold py-1 rounded capitalize border transition-all ${
                          refrigLoad === ld ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-transparent border-white/5 text-slate-500"
                        }`}
                      >
                        {ld} Load
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {slug === "refrigeration-systems" && activeTab === "layout" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[8px] text-slate-400 font-mono uppercase block">Condenser Fan Speed</label>
                  <div className="grid grid-cols-4 gap-1">
                    {(["off", "low", "medium", "high"] as const).map((spd) => (
                      <button 
                        key={spd}
                        onClick={() => setFanSpeed(spd)}
                        className={`text-[8px] font-bold py-1 rounded capitalize border transition-all ${
                          fanSpeed === spd ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-transparent border-white/5 text-slate-500"
                        }`}
                      >
                        {spd}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {slug === "refrigeration-systems" && activeTab === "panel" && (
              <div className="text-[7.5px] text-slate-400 space-y-2 leading-relaxed">
                <div>Dials and lamps simulate hand-off-auto (HOA) functions. Mains switch isolates current draws. Manual Defrost engages coil heating relays.</div>
              </div>
            )}

            {/* Controls for display-cold-rooms */}
            {slug === "display-cold-rooms" && activeTab === "lighting" && (
              <div className="space-y-2">
                <label className="text-[8px] text-slate-400 font-mono uppercase block">LED Light Dimmer ({ledIntensity}%)</label>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={ledIntensity}
                  onChange={(e) => setLedIntensity(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            )}

            {slug === "display-cold-rooms" && activeTab === "thermostat" && (
              <div className="space-y-3">
                <button 
                  onClick={() => setHeaterOn(!heaterOn)}
                  className={`w-full py-2 text-[8.5px] font-bold rounded border transition-all flex items-center justify-center gap-1.5 ${
                    heaterOn ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-transparent border-white/5 text-slate-500 hover:border-white/10"
                  }`}
                >
                  <span>{heaterOn ? "Disable Frame Heater" : "Enable Frame Heater"}</span>
                </button>
                <div className="text-[7.5px] text-slate-500 leading-normal">
                  Turn the heated frame off to simulate what happens when external humidity condenses against the glass.
                </div>
              </div>
            )}

            {/* Fallback description */}
            {((slug !== "modular-cold-rooms" && slug !== "refrigeration-systems" && slug !== "display-cold-rooms") || (activeTab === "default")) && (
              <div className="text-[8px] text-slate-400 space-y-1.5 leading-relaxed">
                <div>Engineering schematics display technical joint designs, airflow currents, and components mapped out for the {serviceTitle} service category.</div>
                <div className="text-[7px] text-slate-500">Model verified under MIDH and NHM technical guidelines.</div>
              </div>
            )}
          </div>

          <div className="text-[7px] text-slate-500 font-mono border-t border-white/5 pt-2 text-left">
            DRAFTSMAN LABS v1.8 • THERMOVAULT SYSTEMS
          </div>
        </div>
      </div>

      {/* Tabs list at the bottom */}
      <div className="flex items-center gap-2 overflow-x-auto border-t border-white/5 pt-4 mt-6 select-none scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all shrink-0 border ${
              activeTab === tab.id
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                : "bg-[#0C2340]/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
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
              radial-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px, 40px 40px, 40px 40px"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0C2340] via-[#0D3830]/90 to-[#0A1D1A]/95 z-0" />
        
        {/* Soft glowing ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Clickable Breadcrumbs (Interactive Navigation) */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="text-white/40">/</span>
            <span className="text-emerald-400">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Text Details (col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 text-xs font-bold text-emerald-400 font-mono w-fit shadow-sm">
                <Snowflake className="h-4 w-4 text-emerald-400 shrink-0 animate-pulse" />
                <span>TECHNICAL UTILITY DESIGN</span>
              </div>

              <h1 className="text-4.5xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.12]">
                ThermoVault Solutions:<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-display">
                  {service.title}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body max-w-2xl">
                {service.detailedDesc} Sourced and engineered to withstand severe tropical climates, delivering optimized coefficient of performance (COP) and strict thermal security.
              </p>

              {/* Temp Range Pill & Sizing Quick Link */}
              <div className="flex flex-wrap gap-4 pt-1 items-center">
                <div className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-950/50 via-[#0A1A30]/50 to-emerald-900/30 border border-emerald-500/30 px-4 py-2 text-xs font-bold font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse shrink-0">❄</span>
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
              <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] pointer-events-none z-0" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-[340px] aspect-[4/3] rounded-2xl border border-emerald-500/20 bg-white/2 p-2.5 shadow-2xl backdrop-blur-sm overflow-hidden group select-none"
              >
                {/* Laser scan line overlay */}
                <div 
                  className="absolute left-0 right-0 h-[1.5px] bg-cyan-400/40 shadow-[0_0_8px_rgba(34,211,238,0.4)] z-20 pointer-events-none"
                  style={{ animation: "scan 3.5s linear infinite" }}
                />

                <div className="absolute top-2 left-2 text-[8px] font-mono text-emerald-400/40 font-bold">SCALE: 1:35</div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-emerald-400/40 font-bold">TV-BLUEPRINT-v1</div>

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
                      <path d="M 95 45 C 95 35, 90 30, 85 30" strokeWidth="0.75" strokeDasharray="1.5 1.5" className="stroke-emerald-400" />
                      <line x1="95" y1="45" x2="85" y2="45" strokeWidth="1" className="stroke-emerald-400" />
                      
                      {/* Evaporator placement */}
                      <rect x="30" y="32" width="10" height="26" strokeWidth="0.75" className="stroke-teal-light/70" />
                      {/* Air throw direction arrows */}
                      <path d="M 42 37 L 54 37 M 42 45 L 54 45 M 42 53 L 54 53" strokeWidth="0.5" className="stroke-cyan-400" />
                      
                      {/* Labels */}
                      <text x="31" y="27" fill="#1d9e75" fontSize="4.5" className="font-mono">EVAPORATOR</text>
                      <text x="50" y="60" fill="#6b7e94" fontSize="4.5" className="font-mono">COLD ROOM CORE</text>
                      <text x="76" y="25" fill="#34d399" fontSize="4.5" className="font-mono">EPDM DOOR SEAL</text>
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
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

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
                        className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs font-mono text-white text-center focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 font-mono block mb-1">Width (ft)</label>
                      <input
                        type="number"
                        value={calcWidth}
                        onChange={(e) => setCalcWidth(e.target.value)}
                        className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs font-mono text-white text-center focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 font-mono block mb-1">Height (ft)</label>
                      <input
                        type="number"
                        value={calcHeight}
                        onChange={(e) => setCalcHeight(e.target.value)}
                        className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs font-mono text-white text-center focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[8px] text-slate-400 font-mono uppercase block mb-1">Temperature Profile</label>
                    <select
                      value={calcTempProfile}
                      onChange={(e) => setCalcTempProfile(e.target.value)}
                      className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                      className="w-full rounded-lg bg-[#0C2340] border border-white/10 p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-bold text-white shadow-md transition-all active:scale-[0.98]"
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

            {/* System Visuals Section */}
            <SystemVisuals slug={slug} serviceTitle={service.title} />

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
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-25 blur-md pointer-events-none" />
            
            <div 
              className="relative rounded-2xl border border-white/15 bg-[#0C2340]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md overflow-hidden"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "16px 16px"
              }}
            >
              {/* Ambient glowing radial blur */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Technical Vector Drawing Blueprint Schematic */}
              <div className="relative h-20 w-full rounded-xl bg-slate-950/40 border border-white/5 overflow-hidden mb-6 flex items-center justify-center">
                <div 
                  className="absolute inset-0 opacity-20" 
                  style={{
                    backgroundImage: "radial-gradient(rgba(16, 185, 129, 0.3) 1.2px, transparent 1.2px)",
                    backgroundSize: "12px 12px"
                  }}
                />
                <svg className="absolute inset-0 h-full w-full stroke-emerald-500/25 fill-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="50" cy="50" r="32" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="16" strokeWidth="0.5" />
                  <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" strokeDasharray="4 4" />
                  <path d="M 20 20 L 80 80 M 20 80 L 80 20" strokeWidth="0.25" strokeDasharray="1 3" />
                </svg>
                
                <div className="relative z-10 flex items-center gap-3 px-4 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/35 text-emerald-400">
                    <Settings className="h-5 w-5 animate-spin-slow text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-emerald-400">CAD Blueprint Sizing</div>
                    <div className="text-[8px] font-bold text-slate-300 font-mono flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>DRAFTSMAN STATUS: ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Phone className="h-4.5 w-4.5" />
                <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-wider">
                  Sizing Consultation
                </h3>
              </div>
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
                      className="w-full rounded-xl bg-[#0C2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-body animate-reveal-input"
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
                      className="w-full rounded-xl bg-[#0C2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
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
                      className="w-full rounded-xl bg-[#0C2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-body"
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
                      className="w-full rounded-xl bg-[#0C2340] border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-body h-20 resize-none text-[10px] leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold font-mono py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl justify-center w-full shadow-inner select-none">
                    <Clock className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
                    <span>Response within 30 mins</span>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3.5 text-xs font-bold text-white shadow-lg active:scale-[0.98] transition-all font-display group/btn"
                    >
                      <Phone className="h-3.5 w-3.5 text-inherit transition-transform group-hover/btn:scale-110" />
                      <span>Request Callback</span>
                    </button>

                    <a
                      href={`https://wa.me/918055010620?text=Hi,%20I'm%20interested%20in%20ThermoVault%20${encodeURIComponent(service.title)}.%20Please%20connect%20me%20with%20an%20expert.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/10 py-3.5 text-xs font-bold text-white transition-all active:scale-[0.98] font-display group/btn"
                    >
                      <svg className="h-3.5 w-3.5 fill-emerald-400 transition-transform group-hover/btn:scale-110" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.785 1.453 5.424 0 9.835-4.403 9.838-9.817.002-2.622-1.018-5.086-2.87-6.941C16.49 1.993 14.032.975 11.41.974 5.986.974 1.574 5.376 1.571 10.79c-.001 1.702.457 3.361 1.32 4.867L1.87 21.652l6.027-1.579.034-.02-.284.148zM17.43 14.1c-.29-.145-1.722-.85-1.99-.948-.266-.1-.462-.146-.656.145-.194.291-.75.947-.919 1.14-.17.194-.339.219-.63.073-.29-.146-1.229-.452-2.34-1.444-.864-.771-1.448-1.723-1.618-2.014-.17-.291-.018-.448.128-.593.131-.131.29-.34.436-.51.145-.17.194-.291.291-.485.1-.194.05-.364-.025-.51-.073-.145-.656-1.579-.9-2.162-.236-.57-.478-.493-.656-.502-.17-.008-.364-.01-.557-.01-.194 0-.51.072-.776.364-.267.291-1.02 1.02-1.02 2.48s1.068 2.868 1.214 3.063c.146.194 2.102 3.21 5.093 4.5.712.307 1.267.49 1.7.629.715.227 1.365.195 1.88.118.574-.087 1.723-.704 1.965-1.385.243-.68.243-1.263.17-1.384-.073-.122-.267-.194-.557-.34z"/>
                      </svg>
                      <span className="text-emerald-400">Chat on WhatsApp</span>
                    </a>
                  </div>
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
