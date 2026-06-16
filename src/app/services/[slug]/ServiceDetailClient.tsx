"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  X,
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
  Sprout,
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
      {
        title: "PUF Insulation",
        desc: "Cam-locked high density PUF panels with 120mm core thickness.",
      },
      {
        title: "Vapor Barrier",
        desc: "Tongue-and-groove joint fittings matching vapor barrier rules.",
      },
      {
        title: "Heavy Duty Flooring",
        desc: "Pre-insulated floor panels with heavy-duty aluminum chequered plates.",
      },
      {
        title: "Pressure Relief System",
        desc: "Pressure relief valves for extreme low-temperature adjustments.",
      },
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
      {
        title: "Compressor Units",
        desc: "Scroll and semi-hermetic compressor units (Copeland, Bitzer).",
      },
      {
        title: "Condensing Grids",
        desc: "Air-cooled coaxial condensing grids or shell-and-tube water condensers.",
      },
      {
        title: "Eco Refrigerants",
        desc: "Refrigerant options matching low-GWP criteria (R404A, R134a, R448A).",
      },
      {
        title: "Safety Grids",
        desc: "Anti-vibration compressor mounts and dual high/low pressure cut-out grids.",
      },
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
  "mushroom-saffron-cultivation": {
    title: "Mushroom & Safron Cultivation Chambers",
    tempRange: "+12°C to +28°C (Humidity Control: 60% - 95%)",
    specs: [
      {
        title: "PUF Insulation Panels",
        desc: "High-density thermal envelope maintaining perfect relative humidity.",
      },
      {
        title: "Precision Micro-Climate",
        desc: "Precision temperature & humidity control tailored to growing cycles.",
      },
      {
        title: "HEPA Fresh Air Exchange",
        desc: "Automated air exchange with medical-grade HEPA particle filters.",
      },
      {
        title: "CO2 Levels Ventilation",
        desc: "Integrated CO2 monitoring & automated damper ventilation system.",
      },
      {
        title: "Stainless Steel Shelves",
        desc: "SS-304 grow racks with complete corrosion and rust resistance.",
      },
      {
        title: "IoT growth telemetry",
        desc: "IoT-enabled remote monitoring & live alerts for cultivation safety.",
      },
    ],
    industries: [
      "Mushroom Cultivation Rooms",
      "Safron Cultivation Chambers",
      "Seed Germination Rooms",
      "Agri Research Facilities",
      "Herbal & Medicinal Plants",
    ],
    detailedDesc:
      "Precision-controlled environment chambers designed for optimal growth, higher yield, and consistent quality in mushroom and saffron cultivation. Our systems ensure ideal temperature, humidity, CO2 levels, and air circulation.",
  },
  "clean-rooms": {
    title: "Clean Rooms & Sterile Chambers",
    tempRange: "+18°C to +22°C (Relative Humidity: 45% - 55%)",
    specs: [
      {
        title: "HEPA Filters",
        desc: "ISO class particle control grids with absolute HEPA filtration.",
      },
      {
        title: "Sterile Panels",
        desc: "Stainless steel flush wall panels preventing bacterial dust collection.",
      },
      {
        title: "Pressure Control",
        desc: "Differential pressure gauges monitoring sealed boundaries.",
      },
      {
        title: "Magnetic Airlocks",
        desc: "Airlock entryways and automated interlocking magnetic doors.",
      },
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
      {
        title: "Ethylene Control",
        desc: "Automated ethylene gas dosing controllers with leak sensors.",
      },
      {
        title: "Airflow Tunnels",
        desc: "Forced-air ventilation flow tunnels ensuring uniform ripening speeds.",
      },
      {
        title: "Venting Cycles",
        desc: "Precision CO2 exhaust venting cycles to prevent fruit decay.",
      },
      {
        title: "PLC Presets",
        desc: "PLC program panels storing preset ripening curves by crop type.",
      },
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
      {
        title: "High Velocity Fans",
        desc: "High velocity air blast fans drawing heat away rapidly.",
      },
      {
        title: "Defrost Bypass",
        desc: "Deep fin evaporator coils with automatic hot-gas defrost bypass.",
      },
      {
        title: "Needle Probes",
        desc: "Integrated core food temperature needle insertion probes.",
      },
      {
        title: "Thick Insulation",
        desc: "Extra-thick 150mm insulation core panel rigging.",
      },
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
      {
        title: "Quarterly Audits",
        desc: "Four quarterly preventative checkups (coil checks, current loads).",
      },
      {
        title: "Refill & Align",
        desc: "Compressor oil refills, filter dryer changes, and belt adjustments.",
      },
      {
        title: "Emergency SLA",
        desc: "Priority response within 4 hours in Pune and surrounding MIDC zones.",
      },
      {
        title: "Telemetry Diagnostics",
        desc: "Free remote dashboard telemetry diagnostic checks.",
      },
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
      {
        title: "Heat Calculations",
        desc: "Thermal heat gain load calculations (insulation + products + users).",
      },
      {
        title: "Evaporator CAD",
        desc: "CAD drafting of layout blueprints showing evaporator air coverage.",
      },
      {
        title: "Capital Schemes",
        desc: "Government subsidy eligibility checklists (NABARD, NHB schemes).",
      },
      {
        title: "Feasibility DPR",
        desc: "Detailed project reports (DPR) matching banking criteria.",
      },
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
  "modular-cold-rooms": ["refrigeration-systems", "mushroom-saffron-cultivation", "amc"],
  "refrigeration-systems": ["blast-chillers", "amc", "consultation"],
  "mushroom-saffron-cultivation": ["modular-cold-rooms", "refrigeration-systems"],
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
  icon: React.ComponentType<{ className?: string }>;
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
    "mushroom-saffron-cultivation": [
      {
        title: "Button & Oyster Cultivation",
        desc: "High relative humidity growth beds with integrated climate and fresh air cycling.",
        link: "/services/mushroom-saffron-cultivation",
        icon: Sprout,
      },
      {
        title: "Saffron Sprouting Chambers",
        desc: "Advanced growth light schedules and multi-tiered vertical trays maximizing crop yield.",
        link: "/services/mushroom-saffron-cultivation",
        icon: Sprout,
      },
      {
        title: "Seed Germination Labs",
        desc: "Precision temperature and absolute sterile air controls ensuring pristine root spritzes.",
        link: "/services/mushroom-saffron-cultivation",
        icon: ShieldCheck,
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
        desc: "Detailed project reports (DPR) matching NABARD and NHB grant checklists.",
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
    "mushroom-saffron-cultivation": [
      {
        q: "How is precise relative humidity maintained in cultivation chambers?",
        a: "We integrate ultrasonic micro-humidification networks alongside specialized DX-dehumidifiers, allowing relative humidity to be modulated precisely between 60% and 95% via smart PLC loops.",
      },
      {
        q: "How do you manage CO2 build-up during growing cycles?",
        a: "Our chambers feature high-sensitivity infrared CO2 sensor arrays linked to automated fresh-air intake damper fans. This ensures continuous HEPA-filtered fresh air exchange whenever CO2 limits are exceeded.",
      },
      {
        q: "What custom lighting is provided for saffron sprouting?",
        a: "We install customized vertical LED growing light matrices with tailorable spectrum adjustments (focused on deep-blue and red wavelengths) and intensity sliders to maximize saffron yield.",
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
        a: "Yes! We compile complete project layout drawings and bankability dossiers that fully comply with NABARD, NHB, and MIDH subsidy program criteria.",
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
    {
      label: "Fire Classification",
      value: "Class B-s2, d0",
      metric: "EN 13501-1",
    },
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
    "mushroom-saffron-cultivation": [
      { label: "Humidity Control Range", value: "60 - 95", metric: "% RH" },
      { label: "Operating Temp Range", value: "12 - 28", metric: "°C" },
      { label: "CO2 Setpoint Accuracy", value: "±50", metric: "ppm" },
      { label: "HEPA Air Exchange Rate", value: "20 - 35", metric: "ACH" },
      { label: "LED Grow Light Peak", value: "450 & 660", metric: "nm (Grow Light)" },
    ],
    "clean-rooms": [
      {
        label: "HEPA Filtering Efficiency",
        value: "99.97",
        metric: "% @ 0.3μm",
      },
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
    "mushroom-saffron-cultivation": [
      { id: "airflow", label: "Airflow Design" },
      { id: "panel", label: "Control Panel" },
      { id: "telemetry", label: "Data Monitoring" },
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
    amc: [
      { id: "telemetry", label: "Telemetry Dashboard" },
      { id: "checklist", label: "Inspection Matrix" },
      { id: "sla", label: "SLA Response" },
    ],
    consultation: [
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
  const [fanSpeed, setFanSpeed] = useState<"off" | "low" | "medium" | "high">(
    "medium",
  );
  const [heatmap, setHeatmap] = useState(false);
  const [camLocked, setCamLocked] = useState(false);
  const [pufThickness, setPufThickness] = useState<60 | 100 | 120 | 150>(100);
  const [selectedSensor, setSelectedSensor] = useState<
    "sensor1" | "sensor2" | "sensor3"
  >("sensor1");
  const [alarmActive, setAlarmActive] = useState(false);
  const [refrigLoad, setRefrigLoad] = useState<"low" | "normal" | "high">(
    "normal",
  );
  const [ledIntensity, setLedIntensity] = useState(80);
  const [heaterOn, setHeaterOn] = useState(true);
  const [doorOpen, setDoorOpen] = useState(false);
  const [ethyleneActive, setEthyleneActive] = useState(false);
  const [chillingCycle, setChillingCycle] = useState<"soft" | "hard" | "shock">(
    "shock",
  );
  const [vibrationSpeed, setVibrationSpeed] = useState(50);
  const [panelSwitches, setPanelSwitches] = useState({
    power: true,
    defrost: false,
    fanAuto: true,
  });

  // Telemetry sensor data mapping
  const sensorData = {
    sensor1: {
      label: "Ambient Temp (Air)",
      val: "-18.2°C",
      status: "Optimal",
      color: "text-blue-400",
    },
    sensor2: {
      label: "Evaporator Temp",
      val: "-22.5°C",
      status: "Optimal",
      color: "text-cyan-400",
    },
    sensor3: {
      label: "Product Core Temp",
      val: "-17.9°C",
      status: "Warning",
      color: "text-amber-400",
    },
  };

  // Reset tab when slug changes
  useEffect(() => {
    const currentTabs = getVisualTabs(slug);
    if (currentTabs.length > 0) {
      setTimeout(() => {
        setActiveTab(currentTabs[0].id);
      }, 0);
    }
  }, [slug]);

  // Render visual graphic based on slug and activeTab
  const renderVisualGraphic = () => {
    const strokeSpeed =
      fanSpeed === "off"
        ? "0s"
        : fanSpeed === "low"
          ? "4s"
          : fanSpeed === "medium"
            ? "1.5s"
            : "0.6s";
    const fanSpinSpeed =
      fanSpeed === "off"
        ? "0s"
        : fanSpeed === "low"
          ? "3s"
          : fanSpeed === "medium"
            ? "1s"
            : "0.3s";

    // 1. Modular Cold Rooms Sizing Visuals
    if (slug === "modular-cold-rooms") {
      if (activeTab === "airflow") {
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <style>{`
              @keyframes flow { to { stroke-dashoffset: -20; } }
              @keyframes fspin { to { transform: rotate(360deg); } }
              .flow-path { stroke-dasharray: 4, 4; animation: flow ${strokeSpeed} linear infinite; }
              .fan-blade { transform-origin: 25px 50px; animation: fspin ${fanSpinSpeed} linear infinite; }
            `}</style>

            {/* Grid overlay */}
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Heatmap overlay */}
            {heatmap && (
              <rect
                x="10"
                y="10"
                width="180"
                height="130"
                fill="url(#heat-grad)"
                opacity="0.45"
                rx="8"
              />
            )}
            <defs>
              <linearGradient
                id="heat-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="40%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            {/* Outer Chamber outline */}
            <rect
              x="10"
              y="10"
              width="180"
              height="130"
              rx="8"
              fill="none"
              stroke="rgba(59, 130, 246,0.3)"
              strokeWidth="1.5"
            />

            {/* Evaporator Unit */}
            <rect
              x="15"
              y="30"
              width="20"
              height="40"
              rx="2"
              fill="#0c2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            {/* Evaporator Fan */}
            <circle
              cx="25"
              cy="50"
              r="7"
              fill="#030f26"
              stroke="#3b82f6"
              strokeWidth="0.5"
            />
            <path
              className="fan-blade"
              d="M 25 43 L 25 57 M 18 50 L 32 50"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />

            {/* Airflow paths */}
            {fanSpeed !== "off" && (
              <>
                <path
                  className="flow-path"
                  d="M 35 45 C 80 45, 120 45, 175 45"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1"
                />
                <path
                  className="flow-path"
                  d="M 175 45 C 185 45, 185 105, 175 105"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1"
                />
                <path
                  className="flow-path"
                  d="M 175 105 C 120 105, 70 105, 35 105"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1"
                />
                <path
                  className="flow-path"
                  d="M 35 105 C 20 105, 20 55, 35 50"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1"
                />
              </>
            )}

            {/* Chamber contents / shelves */}
            <line
              x1="120"
              y1="65"
              x2="160"
              y2="65"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            <line
              x1="120"
              y1="90"
              x2="160"
              y2="90"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            <rect
              x="125"
              y="50"
              width="10"
              height="15"
              fill="rgba(59, 130, 246,0.2)"
              stroke="#3b82f6"
              strokeWidth="0.5"
              rx="1"
            />
            <rect
              x="145"
              y="75"
              width="12"
              height="15"
              fill="rgba(59, 130, 246,0.2)"
              stroke="#3b82f6"
              strokeWidth="0.5"
              rx="1"
            />

            {/* Labels */}
            <text
              x="25"
              y="25"
              fill="#3b82f6"
              fontSize="5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              EVAPORATOR
            </text>
            <text
              x="140"
              y="125"
              fill="rgba(255,255,255,0.3)"
              fontSize="5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              PRODUCT CARRIER
            </text>
          </svg>
        );
      }

      if (activeTab === "panel") {
        const offset = camLocked ? 0 : 12;
        const widthVal =
          pufThickness === 60
            ? 18
            : pufThickness === 100
              ? 25
              : pufThickness === 120
                ? 30
                : 38;
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            {/* Grid overlay */}
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Left Panel slice */}
            <rect
              x="25"
              y="30"
              width={widthVal}
              height="90"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
              rx="2"
            />
            <rect
              x="28"
              y="33"
              width={widthVal - 6}
              height="84"
              fill="#030F26"
              stroke="rgba(59, 130, 246,0.1)"
              strokeWidth="1"
              rx="1"
            />
            {/* Polyurethane insulation filling texture */}
            <line
              x1="32"
              y1="36"
              x2="32"
              y2="114"
              stroke="rgba(59, 130, 246,0.2)"
              strokeWidth="1"
              strokeDasharray="1 3"
            />
            <line
              x1={22 + widthVal}
              y1="36"
              x2={22 + widthVal}
              y2="114"
              stroke="rgba(59, 130, 246,0.2)"
              strokeWidth="1"
              strokeDasharray="1 3"
            />

            {/* Right Panel slice (moves dynamically) */}
            <g transform={`translate(${offset}, 0)`}>
              <rect
                x="95"
                y="30"
                width={widthVal}
                height="90"
                fill="#0C2340"
                stroke="#3b82f6"
                strokeWidth="1"
                rx="2"
              />
              <rect
                x="98"
                y="33"
                width={widthVal - 6}
                height="84"
                fill="#030F26"
                stroke="rgba(59, 130, 246,0.1)"
                strokeWidth="1"
                rx="1"
              />
              <line
                x1="102"
                y1="36"
                x2="102"
                y2="114"
                stroke="rgba(59, 130, 246,0.2)"
                strokeWidth="1"
                strokeDasharray="1 3"
              />
              <line
                x1={92 + widthVal}
                y1="36"
                x2={92 + widthVal}
                y2="114"
                stroke="rgba(59, 130, 246,0.2)"
                strokeWidth="1"
                strokeDasharray="1 3"
              />

              {/* Pin receiver inside right panel */}
              <circle
                cx="102"
                cy="75"
                r="4.5"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1.5"
              />
              <circle cx="102" cy="75" r="1.5" fill="#22d3ee" />
            </g>

            {/* Cam lock hook inside left panel */}
            <line
              x1={20 + widthVal}
              y1="75"
              x2={52 + widthVal}
              y2="75"
              stroke="#3b82f6"
              strokeWidth="2.5"
            />
            <path
              d={
                camLocked
                  ? `M ${40 + widthVal} 75 C ${40 + widthVal} 68, ${68 + widthVal} 68, ${68 + widthVal} 75`
                  : `M ${40 + widthVal} 75 C ${40 + widthVal} 55, ${52 + widthVal} 50, ${52 + widthVal} 60`
              }
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              className="transition-all duration-500"
            />

            {/* Label callouts */}
            <text
              x="35"
              y="23"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
            >
              PANEL A ({pufThickness}mm)
            </text>
            <text
              x="110"
              y="23"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
            >
              PANEL B ({pufThickness}mm)
            </text>

            <text
              x="100"
              y="138"
              fill="rgba(255,255,255,0.4)"
              fontSize="5.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {camLocked
                ? "JOINT COMPRESSED & LOCKED"
                : "ALIGN PANELS & ROTATE LATCH"}
            </text>
          </svg>
        );
      }

      if (activeTab === "telemetry") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex flex-col justify-between font-mono">
            {/* Telemetry Display Screen */}
            <div
              className={`relative rounded-lg border p-4 transition-all duration-300 ${alarmActive ? "bg-red-950/20 border-red-500/30" : "bg-slate-950/50 border-white/10"}`}
            >
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
                  <span
                    className={`h-1.5 w-1.5 rounded-full animate-ping ${alarmActive ? "bg-red-500" : "bg-blue-500"}`}
                  />
                  {alarmActive ? "ALERTING" : "STREAMING ONLINE"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1">
                {Object.entries(sensorData).map(([key, data]) => {
                  const isActive = selectedSensor === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedSensor(key as typeof selectedSensor)}
                      className={`text-left p-2 rounded border transition-all ${
                        isActive
                          ? "bg-blue-500/15 border-blue-500"
                          : "bg-transparent border-white/5 hover:border-white/10"
                      }`}
                    >
                      <span className="text-[7px] text-slate-400 block truncate">
                        {data.label}
                      </span>
                      <span
                        className={`text-xs font-bold block ${isActive ? "text-blue-300" : "text-white"}`}
                      >
                        {data.val}
                      </span>
                      <span className="text-[6px] text-slate-500 block uppercase font-bold">
                        {data.status}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* simulated chart line */}
              <div className="h-10 w-full bg-slate-900/60 rounded border border-white/5 mt-3 relative overflow-hidden flex items-end">
                <svg
                  className="w-full h-8"
                  viewBox="0 0 160 30"
                  preserveAspectRatio="none"
                >
                  <path
                    d={
                      selectedSensor === "sensor1"
                        ? "M 0 20 L 20 22 L 40 18 L 60 19 L 80 20 L 100 22 L 120 18 L 140 19 L 160 20"
                        : selectedSensor === "sensor2"
                          ? "M 0 28 L 20 27 L 40 29 L 60 28 L 80 27 L 100 28 L 120 29 L 140 27 L 160 28"
                          : "M 0 10 L 20 15 L 40 18 L 60 12 L 80 8 L 100 11 L 120 14 L 140 9 L 160 10"
                    }
                    fill="none"
                    stroke={alarmActive ? "#ef4444" : "#3b82f6"}
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  <line
                    x1="0"
                    y1="15"
                    x2="160"
                    y2="15"
                    stroke="rgba(239,68,68,0.2)"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                  />
                </svg>
                <span className="absolute bottom-1 right-2 text-[6px] text-slate-500 font-mono">
                  1m intervals
                </span>
              </div>
            </div>

            {/* Diagnostic Log Output */}
            <div className="bg-black/60 rounded p-2.5 text-[8px] text-slate-400 border border-white/5 space-y-1 text-left">
              <div>&gt; telemetry node initialized... OK</div>
              <div>&gt; gsm handshake established... 98% signal</div>
              <div>
                &gt; current payload packet sent to cloud vault: 32 bytes
              </div>
              {alarmActive ? (
                <div className="text-red-500 font-bold">
                  &gt; WARNING: high threshold exceeded on sensor:{" "}
                  {sensorData[selectedSensor].label}
                </div>
              ) : (
                <div className="text-blue-400">
                  &gt; monitoring status: optimal. no deviations recorded.
                </div>
              )}
            </div>
          </div>
        );
      }
    }

    // 2. Refrigeration Systems Visuals
    if (slug === "refrigeration-systems") {
      if (activeTab === "pid") {
        const loopSpeed =
          refrigLoad === "low" ? "5s" : refrigLoad === "normal" ? "2s" : "0.8s";
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <style>{`
              @keyframes dashflow { to { stroke-dashoffset: -20; } }
              .pipe-flow { stroke-dasharray: 4, 4; animation: dashflow ${loopSpeed} linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Compressor */}
            <rect
              x="25"
              y="90"
              width="24"
              height="24"
              rx="12"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x="37"
              y="104"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              COMP
            </text>

            {/* Condenser */}
            <rect
              x="85"
              y="20"
              width="30"
              height="20"
              rx="2"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x="100"
              y="32"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              CONDENSER
            </text>

            {/* Receiver */}
            <rect
              x="150"
              y="20"
              width="20"
              height="30"
              rx="3"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x="160"
              y="37"
              fill="#3b82f6"
              fontSize="4"
              fontFamily="monospace"
              textAnchor="middle"
            >
              RECEIVER
            </text>

            {/* Expansion Valve */}
            <polygon
              points="160,102 170,95 170,109"
              fill="#0C2340"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <polygon
              points="160,102 150,95 150,109"
              fill="#0C2340"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <text
              x="160"
              y="117"
              fill="#22d3ee"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              TXV
            </text>

            {/* Evaporator */}
            <rect
              x="85"
              y="90"
              width="30"
              height="20"
              rx="2"
              fill="#0C2340"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <text
              x="100"
              y="102"
              fill="#22d3ee"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              EVAP
            </text>

            {/* Piping Loop lines */}
            {/* Hot Gas line (compressor to condenser) */}
            <path
              className="pipe-flow"
              d="M 37 90 L 37 30 L 85 30"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1"
            />
            {/* Liquid Line (condenser to receiver to TXV) */}
            <path
              className="pipe-flow"
              d="M 115 30 L 150 30"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
            />
            <path
              className="pipe-flow"
              d="M 160 50 L 160 95"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
            />
            {/* Low Pressure Liquid (TXV to evaporator) */}
            <path
              className="pipe-flow"
              d="M 150 102 L 115 102"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1"
            />
            {/* Suction Gas (evaporator to compressor) */}
            <path
              className="pipe-flow"
              d="M 85 102 L 49 102"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
            />

            <text
              x="100"
              y="75"
              fill="rgba(255,255,255,0.3)"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              REFRIGERANT FLOW: {refrigLoad.toUpperCase()} LOAD
            </text>
          </svg>
        );
      }

      if (activeTab === "layout") {
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Condensing unit chassis outer layout blueprint */}
            <rect
              x="25"
              y="25"
              width="150"
              height="100"
              rx="4"
              fill="none"
              stroke="rgba(59, 130, 246,0.3)"
              strokeWidth="1"
            />
            <rect
              x="30"
              y="30"
              width="140"
              height="90"
              rx="2"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />

            {/* Fan guards */}
            <circle
              cx="65"
              cy="75"
              r="26"
              fill="#030F26"
              stroke="#3b82f6"
              strokeWidth="0.75"
            />
            <circle
              cx="135"
              cy="75"
              r="26"
              fill="#030F26"
              stroke="#3b82f6"
              strokeWidth="0.75"
            />

            {/* Fan Blades spinning */}
            <path
              className="fan-blade"
              style={{
                transformOrigin: "65px 75px",
                animation: `fspin ${fanSpinSpeed} linear infinite`,
              }}
              d="M 65 52 L 65 98 M 42 75 L 88 75"
              stroke="#22d3ee"
              strokeWidth="2.5"
            />
            <path
              className="fan-blade"
              style={{
                transformOrigin: "135px 75px",
                animation: `fspin ${fanSpinSpeed} linear infinite`,
              }}
              d="M 135 52 L 135 98 M 112 75 L 158 75"
              stroke="#22d3ee"
              strokeWidth="2.5"
            />

            {/* Compressor Dome placement visual */}
            <rect
              x="90"
              y="65"
              width="20"
              height="30"
              rx="8"
              fill="#0c2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />

            {/* Technical labeling */}
            <text
              x="100"
              y="20"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              OUTDOOR DUAL-FAN CONDENSING UNIT
            </text>
            <text
              x="100"
              y="112"
              fill="rgba(255,255,255,0.4)"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              COOPELAND RESILIENT GRIDS
            </text>
          </svg>
        );
      }

      if (activeTab === "panel") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex gap-4 font-mono">
            {/* Control Panel Door */}
            <div className="w-2/5 border border-[#3b82f6]/50 bg-slate-900 rounded-lg p-3 flex flex-col justify-between select-none">
              <div className="text-[8px] text-center text-blue-400 border-b border-white/5 pb-1">
                PANEL OVERRIDE
              </div>

              {/* LED lamps */}
              <div className="flex justify-around py-2">
                <div className="text-center">
                  <div
                    className={`h-4 w-4 rounded-full mx-auto mb-1 transition-all ${panelSwitches.power ? "bg-blue-500 shadow-[0_0_8px_rgba(59, 130, 246,0.7)]" : "bg-blue-950"}`}
                  />
                  <span className="text-[6px] text-slate-500">POWER</span>
                </div>
                <div className="text-center">
                  <div
                    className={`h-4 w-4 rounded-full mx-auto mb-1 transition-all ${panelSwitches.defrost ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" : "bg-amber-950"}`}
                  />
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
                  onClick={() =>
                    setPanelSwitches((prev) => ({
                      ...prev,
                      power: !prev.power,
                    }))
                  }
                  className={`w-full text-center py-1 text-[7px] font-bold rounded border ${panelSwitches.power ? "bg-blue-500/10 border-blue-500 text-blue-300" : "bg-transparent border-white/5 text-slate-500"}`}
                >
                  MAINS {panelSwitches.power ? "ON" : "OFF"}
                </button>
                <button
                  onClick={() =>
                    setPanelSwitches((prev) => ({
                      ...prev,
                      defrost: !prev.defrost,
                    }))
                  }
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
                  <span className="text-blue-400 font-bold">415 V</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: panelSwitches.power ? "85%" : "0%" }}
                  />
                </div>
              </div>

              <div className="border border-white/5 rounded bg-black/40 p-2 space-y-1.5">
                <div className="flex justify-between items-center text-[8px] text-slate-400">
                  <span>MOTOR CURRENT</span>
                  <span className="text-blue-400 font-bold">
                    {panelSwitches.power
                      ? panelSwitches.defrost
                        ? "4.5 A"
                        : "18.2 A"
                      : "0.0 A"}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{
                      width: panelSwitches.power
                        ? panelSwitches.defrost
                          ? "25%"
                          : "72%"
                        : "0%",
                    }}
                  />
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

    // 3. Mushroom & Saffron Cultivation Chambers Visuals
    if (slug === "mushroom-saffron-cultivation") {
      if (activeTab === "airflow") {
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <style>{`
              @keyframes dynamic-flow { to { stroke-dashoffset: -20; } }
              .air-flow { stroke-dasharray: 4, 4; animation: dynamic-flow 2.5s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Ceiling HEPA Ventilation Duct */}
            <rect x="25" y="15" width="150" height="10" rx="1" fill="#0C2340" stroke="#3b82f6" strokeWidth="0.75" />
            <text x="100" y="22" fill="#3b82f6" fontSize="4.5" fontFamily="monospace" textAnchor="middle">
              CENTRAL HEPA VENTILATION DUCT
            </text>

            {/* Multi-tier Grow Shelves */}
            {/* Shelf Left */}
            <rect x="20" y="45" width="65" height="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <rect x="20" y="85" width="65" height="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <rect x="20" y="125" width="65" height="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

            {/* Mushrooms growing on left shelves */}
            <circle cx="28" cy="40" r="2.5" fill="#f1f5f9" />
            <path d="M 28 42 L 28 45" stroke="#f1f5f9" strokeWidth="1" />
            <circle cx="45" cy="40" r="2.5" fill="#f1f5f9" />
            <path d="M 45 42 L 45 45" stroke="#f1f5f9" strokeWidth="1" />
            <circle cx="65" cy="40" r="2.5" fill="#f1f5f9" />
            <path d="M 65 42 L 65 45" stroke="#f1f5f9" strokeWidth="1" />
            
            {/* Saffron growing on right shelves */}
            <rect x="115" y="45" width="65" height="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <rect x="115" y="85" width="65" height="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <rect x="115" y="125" width="65" height="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            
            {/* Purple flowers with red stigma on right shelves */}
            <path d="M 125 40 L 128 35 L 131 40 Z" fill="#c084fc" />
            <line x1="128" y1="35" x2="128" y2="39" stroke="#ef4444" strokeWidth="0.5" />
            <path d="M 151 40 L 154 35 L 157 40 Z" fill="#c084fc" />
            <line x1="154" y1="35" x2="154" y2="39" stroke="#ef4444" strokeWidth="0.5" />
            <path d="M 165 40 L 168 35 L 171 40 Z" fill="#c084fc" />
            <line x1="168" y1="35" x2="168" y2="39" stroke="#ef4444" strokeWidth="0.5" />

            {/* Dynamic Airflow Loops */}
            <path className="air-flow" d="M 50 25 L 50 135" fill="none" stroke="#22d3ee" strokeWidth="0.75" />
            <path className="air-flow" d="M 150 25 L 150 135" fill="none" stroke="#c084fc" strokeWidth="0.75" />
            <path className="air-flow" d="M 100 25 L 100 135" fill="none" stroke="#3b82f6" strokeWidth="0.75" />

            {/* Horizontal convection cycles */}
            <path className="air-flow" d="M 20 65 Q 100 55 180 65" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" />
            <path className="air-flow" d="M 180 105 Q 100 115 20 105" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" />

            {/* Labels */}
            <text x="52" y="142" fill="#22d3ee" fontSize="3.5" fontFamily="monospace">MUSHROOM BEDS (HIGH CO2)</text>
            <text x="148" y="142" fill="#c084fc" fontSize="3.5" fontFamily="monospace" textAnchor="end">SAFFRON SHELVES (GROW LIGHTS)</text>
          </svg>
        );
      }

      if (activeTab === "panel") {
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Automation controller interface */}
            <rect x="15" y="15" width="170" height="120" rx="4" fill="#0C2340" stroke="#3b82f6" strokeWidth="1.5" />
            <rect x="20" y="20" width="160" height="18" rx="2" fill="#030F26" />
            
            <text x="100" y="32" fill="#3b82f6" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              THERMOPLC CULTIVATION ENGINE v4.2
            </text>
            <circle cx="28" cy="29" r="2.5" fill="#10b981" />
            <text x="34" y="31" fill="#10b981" fontSize="4.5" fontFamily="monospace">ACTIVE</text>

            {/* 3 Readout Cards */}
            {/* Card 1: Temp */}
            <rect x="25" y="45" width="45" height="35" rx="2" fill="#030F26" stroke="rgba(59,130,246,0.15)" />
            <text x="47.5" y="55" fill="#94a3b8" fontSize="4" fontFamily="monospace" textAnchor="middle">TEMPERATURE</text>
            <text x="47.5" y="70" fill="#22d3ee" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">21.5°C</text>
            <text x="47.5" y="76" fill="#10b981" fontSize="3" fontFamily="monospace" textAnchor="middle">TARGET: 18.0°C</text>

            {/* Card 2: Humid */}
            <rect x="77.5" y="45" width="45" height="35" rx="2" fill="#030F26" stroke="rgba(59,130,246,0.15)" />
            <text x="100" y="55" fill="#94a3b8" fontSize="4" fontFamily="monospace" textAnchor="middle">REL. HUMIDITY</text>
            <text x="100" y="70" fill="#3b82f6" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              {heaterOn ? "82.5%" : "42.0%"}
            </text>
            <text x="100" y="76" fill={heaterOn ? "#10b981" : "#ef4444"} fontSize="3" fontFamily="monospace" textAnchor="middle">
              {heaterOn ? "HUMIDIFIER: ON" : "HUMIDIFIER: OFF"}
            </text>

            {/* Card 3: CO2 */}
            <rect x="130" y="45" width="45" height="35" rx="2" fill="#030F26" stroke="rgba(59,130,246,0.15)" />
            <text x="152.5" y="55" fill="#94a3b8" fontSize="4" fontFamily="monospace" textAnchor="middle">CO2 LEVELS</text>
            <text x="152.5" y="70" fill="#f59e0b" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">840 PPM</text>
            <text x="152.5" y="76" fill="#10b981" fontSize="3" fontFamily="monospace" textAnchor="middle">DAMPER: CLOSED</text>

            {/* Dynamic Saffron LED Schedule Status */}
            <rect x="25" y="90" width="150" height="32" rx="2" fill="#030F26" stroke="rgba(192,132,252,0.15)" />
            <text x="35" y="102" fill="#c084fc" fontSize="4.5" fontFamily="monospace" fontWeight="bold">GROW LIGHT SYSTEM</text>
            <text x="35" y="112" fill="#94a3b8" fontSize="4" fontFamily="monospace">LED Dimmer Level: {ledIntensity}%</text>
            <rect x="95" y="107" width="70" height="6" rx="1" fill="#1e1b4b" />
            <rect x="95" y="107" width={`${ledIntensity * 0.7}`} height="6" rx="1" fill="#c084fc" />

            <circle cx="162" cy="99" r="2" fill="#10b981" className="animate-pulse" />
            <text x="155" y="100.5" fill="#10b981" fontSize="3" fontFamily="monospace" textAnchor="end">AUTO SPECTRUM PEAK</text>
          </svg>
        );
      }

      if (activeTab === "telemetry") {
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Real-time Telemetry Graph */}
            <rect x="15" y="15" width="170" height="95" rx="3" fill="#051430" stroke="rgba(34,211,238,0.1)" />
            <text x="25" y="27" fill="#22d3ee" fontSize="5" fontFamily="monospace" fontWeight="bold">REAL-TIME MICRO-CLIMATE TELEMETRY</text>
            
            {/* Gridlines */}
            <line x1="20" y1="50" x2="180" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="20" y1="75" x2="180" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

            {/* Graph Paths */}
            {/* Humidity Line */}
            <path
              d="M 20 60 Q 40 45 60 70 T 100 55 T 140 80 T 180 50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
            {/* CO2 Line */}
            <path
              d="M 20 90 Q 50 80 80 95 T 140 70 T 180 85"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
              strokeDasharray="2,2"
            />

            {/* Sensor Tags */}
            <circle cx="60" cy="70" r="2.5" fill="#3b82f6" />
            <text x="65" y="68" fill="#3b82f6" fontSize="4.5" fontFamily="monospace">82.5% RH</text>
            <circle cx="140" cy="70" r="2.5" fill="#f59e0b" />
            <text x="145" y="68" fill="#f59e0b" fontSize="4.5" fontFamily="monospace">840 PPM CO2</text>

            {/* Bottom Telemetry Details */}
            <rect x="15" y="118" width="170" height="20" rx="2" fill="#0C2340" stroke="rgba(59,130,246,0.1)" />
            <text x="25" y="130.5" fill="#94a3b8" fontSize="4" fontFamily="monospace">GATEWAY: ONLINE</text>
            <text x="90" y="130.5" fill="#10b981" fontSize="4" fontFamily="monospace">TELEMETRY PRESETS: MIDH & NHB CERTIFIED</text>
            <text x="175" y="130.5" fill="#22d3ee" fontSize="4" fontFamily="monospace" textAnchor="end">ALERTS: ACTIVE</text>
          </svg>
        );
      }
    }

    // Default fallback (e.g. for clean-rooms, blast-chillers, etc. which can also be rendered or fall back to General Loop)
    // 4. Clean Rooms & Sterile Chambers
    if (slug === "clean-rooms") {
      if (activeTab === "laminar") {
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <style>{`
              @keyframes downward { to { stroke-dashoffset: -20; } }
              .laminar-path { stroke-dasharray: 5, 5; animation: downward 2s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* HEPA filter ceiling grid */}
            <rect
              x="15"
              y="15"
              width="170"
              height="15"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <line
              x1="57"
              y1="15"
              x2="57"
              y2="30"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="15"
              x2="100"
              y2="30"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <line
              x1="142"
              y1="15"
              x2="142"
              y2="30"
              stroke="#3b82f6"
              strokeWidth="1"
            />

            {/* Vertical parallel air loops */}
            <line
              className="laminar-path"
              x1="35"
              y1="30"
              x2="35"
              y2="125"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <line
              className="laminar-path"
              x1="75"
              y1="30"
              x2="75"
              y2="125"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <line
              className="laminar-path"
              x1="125"
              y1="30"
              x2="125"
              y2="125"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <line
              className="laminar-path"
              x1="165"
              y1="30"
              x2="165"
              y2="125"
              stroke="#22d3ee"
              strokeWidth="1"
            />

            {/* Low-level return vents */}
            <rect
              x="15"
              y="125"
              width="20"
              height="10"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="0.5"
            />
            <rect
              x="165"
              y="125"
              width="20"
              height="10"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="0.5"
            />

            <text
              x="100"
              y="24"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              HEPA FILTERS (99.97% EFFICIENCY)
            </text>
            <text
              x="100"
              y="142"
              fill="rgba(255,255,255,0.4)"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              VERTICAL UNIDIRECTIONAL LAMINAR AIRFLOW
            </text>
          </svg>
        );
      }

      if (activeTab === "cascade") {
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Chamber partitions */}
            {/* Corridor */}
            <rect
              x="15"
              y="30"
              width="50"
              height="90"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(59, 130, 246,0.2)"
            />
            <text
              x="40"
              y="45"
              fill="rgba(255,255,255,0.4)"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              CORRIDOR
            </text>
            <text
              x="40"
              y="75"
              fill="#ef4444"
              fontSize="6.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              0 Pa
            </text>

            {/* Ante-room */}
            <rect
              x="65"
              y="30"
              width="60"
              height="90"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(59, 130, 246,0.2)"
            />
            <text
              x="95"
              y="45"
              fill="rgba(255,255,255,0.4)"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              ANTE-ROOM
            </text>
            <text
              x="95"
              y="75"
              fill="#f59e0b"
              fontSize="6.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              +15 Pa
            </text>

            {/* Sterile core */}
            <rect
              x="125"
              y="30"
              width="60"
              height="90"
              fill="rgba(59, 130, 246,0.05)"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
            <text
              x="155"
              y="45"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              STERILE CORE
            </text>
            <text
              x="155"
              y="75"
              fill="#3b82f6"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              +30 Pa
            </text>

            {/* Pressure cascade flow indicators */}
            <path
              d="M 120 70 L 130 75 L 120 80 Z"
              fill="#3b82f6"
              transform="rotate(180, 125, 75)"
            />
            <path
              d="M 60 70 L 70 75 L 60 80 Z"
              fill="#f59e0b"
              transform="rotate(180, 65, 75)"
            />

            <text
              x="100"
              y="20"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              POSITIVE PRESSURE GRADIENT CASCADES
            </text>
            <text
              x="100"
              y="138"
              fill="rgba(255,255,255,0.4)"
              fontSize="4"
              fontFamily="monospace"
              textAnchor="middle"
            >
              PREVENTS BACKFLOW CONTAMINATION ON ENTRY
            </text>
          </svg>
        );
      }

      if (activeTab === "telemetry") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex flex-col justify-between font-mono">
            <div className="rounded-lg bg-slate-950/50 border border-white/10 p-3 text-left">
              <div className="text-[8px] text-slate-500 mb-2">
                PARTICULATE DUST MONITOR
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/5 p-2 rounded bg-black/20">
                  <span className="text-[6px] text-slate-500 block">
                    PM 0.3 CHANNEL
                  </span>
                  <span className="text-sm font-bold text-white">
                    12 <span className="text-[7px] text-slate-400">pcs/m³</span>
                  </span>
                  <span className="text-[5px] text-blue-400 block font-bold uppercase">
                    ISO CLASS 5 OK
                  </span>
                </div>
                <div className="border border-white/5 p-2 rounded bg-black/20">
                  <span className="text-[6px] text-slate-500 block">
                    PM 0.5 CHANNEL
                  </span>
                  <span className="text-sm font-bold text-white">
                    4 <span className="text-[7px] text-slate-400">pcs/m³</span>
                  </span>
                  <span className="text-[5px] text-blue-400 block font-bold uppercase">
                    ISO CLASS 5 OK
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[7px] text-slate-400 border-t border-white/5 pt-2 mt-2">
                <span>FILTER HEPA RESISTANCE:</span>
                <span className="text-cyan-400 font-bold">120 Pa</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  setDoorOpen(true);
                  setTimeout(() => setDoorOpen(false), 2000);
                }}
                disabled={doorOpen}
                className="w-1/2 text-center py-2 text-[8px] font-bold rounded bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
              >
                {doorOpen ? "DOOR AJAR (Cascade active)" : "SIMULATE DOOR OPEN"}
              </button>
              <div className="w-1/2 text-left bg-slate-900/60 p-2 rounded border border-white/5 text-[7px] text-slate-400">
                {doorOpen ? (
                  <span className="text-amber-400 font-bold animate-pulse">
                    &gt; Air velocity spike at seal: 0.45 m/s
                  </span>
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
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <style>{`
              @keyframes ripenflow { to { stroke-dashoffset: -20; } }
              .ripen-path { stroke-dasharray: 4, 4; animation: ripenflow 2s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Pallet crate stack A */}
            <rect
              x="25"
              y="40"
              width="30"
              height="70"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <line
              x1="25"
              y1="63"
              x2="55"
              y2="63"
              stroke="rgba(59, 130, 246,0.3)"
            />
            <line
              x1="25"
              y1="87"
              x2="55"
              y2="87"
              stroke="rgba(59, 130, 246,0.3)"
            />

            {/* Pallet crate stack B */}
            <rect
              x="75"
              y="40"
              width="30"
              height="70"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <line
              x1="75"
              y1="63"
              x2="105"
              y2="63"
              stroke="rgba(59, 130, 246,0.3)"
            />
            <line
              x1="75"
              y1="87"
              x2="105"
              y2="87"
              stroke="rgba(59, 130, 246,0.3)"
            />

            {/* Tarp suction fan on the ceiling/right */}
            <rect
              x="135"
              y="45"
              width="40"
              height="60"
              fill="#0C2340"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <circle
              cx="155"
              cy="75"
              r="14"
              fill="#030F26"
              stroke="#22d3ee"
              strokeWidth="0.5"
            />
            <path
              className="fan-blade"
              style={{
                transformOrigin: "155px 75px",
                animation: `fspin 0.8s linear infinite`,
              }}
              d="M 155 58 L 155 92 M 138 75 L 172 75"
              stroke="#22d3ee"
              strokeWidth="1.5"
            />

            {/* Forced Airflow currents through crates */}
            <path
              className="ripen-path"
              d="M 15 50 L 70 50 L 135 50"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="0.8"
            />
            <path
              className="ripen-path"
              d="M 15 75 L 70 75 L 135 75"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="0.8"
            />
            <path
              className="ripen-path"
              d="M 15 98 L 70 98 L 135 98"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="0.8"
            />

            {/* Labels */}
            <text
              x="40"
              y="33"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              PALLET RACKS
            </text>
            <text
              x="155"
              y="33"
              fill="#22d3ee"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              SUCTION WALL
            </text>
            <text
              x="100"
              y="132"
              fill="rgba(255,255,255,0.4)"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              FORCED-AIR TARP RIPENING SYSTEM
            </text>
          </svg>
        );
      }

      if (activeTab === "panel") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex flex-col justify-between font-mono">
            <div className="rounded-lg bg-slate-950/50 border border-white/10 p-3 text-left">
              <div className="text-[8px] text-slate-500 mb-2">
                PLC RIPENING CONTROLLER
              </div>

              <div className="space-y-2 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">ETHYLENE SETPOINT:</span>
                  <span className="text-blue-400 font-bold">100 PPM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">CO2 CONCENTRATION:</span>
                  <span className="text-amber-400 font-bold">0.45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">RELATIVE HUMIDITY:</span>
                  <span className="text-cyan-400 font-bold">92%</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setEthyleneActive(true);
                  setTimeout(() => setEthyleneActive(false), 3000);
                }}
                className="w-1/2 py-2 text-[8px] font-bold rounded bg-blue-600 hover:bg-blue-500 text-white"
              >
                START ETHYLENE DOSE
              </button>
              <div className="w-1/2 text-left bg-slate-900/60 p-2 rounded border border-white/5 text-[7px] text-slate-400">
                {ethyleneActive ? (
                  <span className="text-blue-400 font-bold animate-pulse">
                    &gt; Dosing solenoid active. Gas injection path open.
                  </span>
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
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <style>{`
              @keyframes inject { to { stroke-dashoffset: -10; opacity: 0.8; } }
              .gas-particle { stroke-dasharray: 2, 4; animation: inject 1s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Ethylene gas cylinder */}
            <rect
              x="25"
              y="45"
              width="24"
              height="65"
              rx="8"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <rect
              x="31"
              y="38"
              width="12"
              height="7"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x="37"
              y="78"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
              transform="rotate(-90, 37, 78)"
            >
              ETHYLENE
            </text>

            {/* Gas dosing pipeline */}
            <path
              d="M 37 38 L 37 25 L 140 25 L 140 50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />

            {/* Solenoid valve body */}
            <polygon
              points="85,20 95,20 90,25"
              fill="#0C2340"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <polygon
              points="85,30 95,30 90,25"
              fill="#0C2340"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <rect
              x="87"
              y="12"
              width="6"
              height="8"
              fill="#0c2340"
              stroke="#22d3ee"
              strokeWidth="1"
            />

            {/* Nozzle outlet */}
            <polygon
              points="135,50 145,50 140,58"
              fill="#0C2340"
              stroke="#22d3ee"
              strokeWidth="1"
            />

            {/* Dosing particles */}
            {ethyleneActive && (
              <path
                className="gas-particle"
                d="M 140 58 C 140 90, 110 110, 80 110"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
              />
            )}

            {/* Labels */}
            <text
              x="90"
              y="8"
              fill="#22d3ee"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              SOLENOID INJECTOR
            </text>
            <text
              x="140"
              y="130"
              fill="rgba(255,255,255,0.4)"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              DOSING LINES &amp; DISCHARGE NOZZLE
            </text>
          </svg>
        );
      }
    }

    // 6. Blast Chillers & Shock Freezers Visuals
    if (slug === "blast-chillers") {
      if (activeTab === "airflow") {
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <style>{`
              @keyframes highblast { to { stroke-dashoffset: -20; } }
              .blast-flow { stroke-dasharray: 6, 3; animation: highblast 0.6s linear infinite; }
            `}</style>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* High velocity fans at back */}
            <rect
              x="15"
              y="30"
              width="20"
              height="90"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <circle
              cx="25"
              cy="50"
              r="8"
              fill="#030f26"
              stroke="#3b82f6"
              strokeWidth="0.5"
            />
            <path
              className="fan-blade"
              style={{
                transformOrigin: "25px 50px",
                animation: "fspin 0.2s linear infinite",
              }}
              d="M 25 42 L 25 58 M 17 50 L 33 50"
              stroke="#22d3ee"
              strokeWidth="1"
            />
            <circle
              cx="25"
              cy="100"
              r="8"
              fill="#030f26"
              stroke="#3b82f6"
              strokeWidth="0.5"
            />
            <path
              className="fan-blade"
              style={{
                transformOrigin: "25px 100px",
                animation: "fspin 0.2s linear infinite",
              }}
              d="M 25 92 L 25 108 M 17 100 L 33 100"
              stroke="#22d3ee"
              strokeWidth="1"
            />

            {/* Trolley food rack */}
            <rect
              x="90"
              y="35"
              width="40"
              height="80"
              rx="2"
              fill="#0c2340"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            {/* Racks trays lines */}
            <line
              x1="90"
              y1="50"
              x2="130"
              y2="50"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <line
              x1="90"
              y1="65"
              x2="130"
              y2="65"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <line
              x1="90"
              y1="80"
              x2="130"
              y2="80"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <line
              x1="90"
              y1="95"
              x2="130"
              y2="95"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />

            {/* Horizontal flow lines */}
            <line
              className="blast-flow"
              x1="35"
              y1="50"
              x2="185"
              y2="50"
              stroke="#22d3ee"
              strokeWidth="1.2"
            />
            <line
              className="blast-flow"
              x1="35"
              y1="75"
              x2="185"
              y2="75"
              stroke="#22d3ee"
              strokeWidth="1.2"
            />
            <line
              className="blast-flow"
              x1="35"
              y1="98"
              x2="185"
              y2="98"
              stroke="#22d3ee"
              strokeWidth="1.2"
            />

            {/* Labels */}
            <text
              x="25"
              y="22"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              BLAST FANS
            </text>
            <text
              x="110"
              y="28"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              TROLLEY CART
            </text>
            <text
              x="100"
              y="132"
              fill="rgba(255,255,255,0.4)"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              HIGH-VELOCITY HORIZONTAL AIR BLAST (5.0 m/s)
            </text>
          </svg>
        );
      }

      if (activeTab === "probe") {
        return (
          <svg
            className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
            viewBox="0 0 200 150"
          >
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Product profile cross section */}
            <circle
              cx="85"
              cy="75"
              r="40"
              fill="#0C2340"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
            {/* Shell layer */}
            <circle
              cx="85"
              cy="75"
              r="30"
              fill="none"
              stroke="rgba(34,211,238,0.2)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            {/* Core zone */}
            <circle
              cx="85"
              cy="75"
              r="10"
              fill="#030F26"
              stroke="#22d3ee"
              strokeWidth="1"
            />

            {/* Insertion needle probe */}
            <line
              x1="165"
              y1="75"
              x2="87"
              y2="75"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="165"
              cy="75"
              r="4"
              fill="#0c2340"
              stroke="#f59e0b"
              strokeWidth="1"
            />

            {/* Temp point dots */}
            <circle cx="87" cy="75" r="1.5" fill="#ef4444" />
            <circle cx="115" cy="75" r="1.5" fill="#f59e0b" />
            <circle cx="140" cy="75" r="1.5" fill="#3b82f6" />

            {/* Legend readouts */}
            <text
              x="160"
              y="30"
              fill="#ef4444"
              fontSize="4.5"
              fontFamily="monospace"
            >
              CORE TEMP: +3.2°C
            </text>
            <text
              x="160"
              y="45"
              fill="#f59e0b"
              fontSize="4.5"
              fontFamily="monospace"
            >
              MID TEMP: -8.5°C
            </text>
            <text
              x="160"
              y="60"
              fill="#3b82f6"
              fontSize="4.5"
              fontFamily="monospace"
            >
              SHELL TEMP: -18.0°C
            </text>

            <text
              x="100"
              y="132"
              fill="rgba(255,255,255,0.4)"
              fontSize="4.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              MULTI-POINT CORE THERMOMETER INSERTION PROBE
            </text>
          </svg>
        );
      }

      if (activeTab === "controller") {
        return (
          <div className="w-full h-full bg-[#030F26] rounded-xl border border-white/5 p-4 flex flex-col justify-between font-mono">
            <div className="rounded-lg bg-slate-950/50 border border-white/10 p-3 text-left">
              <div className="text-[8px] text-slate-500 mb-2">
                SHOCK FREEZING CYCLE CURVE
              </div>

              <div className="flex gap-4 mb-2">
                <button
                  onClick={() => setChillingCycle("soft")}
                  className={`px-3 py-1 text-[7px] font-bold rounded border ${chillingCycle === "soft" ? "bg-blue-500/20 border-blue-500 text-blue-300" : "bg-transparent border-white/5"}`}
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
              <svg
                className="w-full h-16 bg-slate-900/60 rounded border border-white/5 relative"
                viewBox="0 0 160 50"
              >
                {/* target curve */}
                <path
                  d={
                    chillingCycle === "soft"
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
                <text x="145" y="48" fill="#64748b" fontSize="4">
                  &gt; -18°C
                </text>
                <text x="5" y="10" fill="#64748b" fontSize="4">
                  +70°C
                </text>
                <text x="80" y="48" fill="#64748b" fontSize="4">
                  90 mins
                </text>
              </svg>
            </div>

            <div className="text-[7.5px] text-slate-500 text-left">
              &gt; shock cooling rate: 1.2°C per minute pulling rate... OK. cell
              structure lock integrity: 100% active.
            </div>
          </div>
        );
      }
    }

    // Default general layout (for AMC, Consultation, etc.)
    return (
      <svg
        className="w-full h-full bg-[#030F26] rounded-xl border border-white/5"
        viewBox="0 0 200 150"
      >
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect
          x="20"
          y="20"
          width="160"
          height="110"
          rx="3"
          fill="#0C2340"
          stroke="#3b82f6"
          strokeWidth="1"
        />

        {/* Simple schematic representation */}
        <circle
          cx="65"
          cy="75"
          r="22"
          fill="#030F26"
          stroke="#22d3ee"
          strokeWidth="1.5"
        />
        <path
          d="M 65 53 L 65 97 M 43 75 L 87 75"
          stroke="#22d3ee"
          strokeWidth="1"
        />

        <circle
          cx="135"
          cy="75"
          r="22"
          fill="#030F26"
          stroke="#22d3ee"
          strokeWidth="1.5"
        />
        <path
          d="M 135 53 L 135 97 M 113 75 L 157 75"
          stroke="#22d3ee"
          strokeWidth="1"
        />

        <text
          x="100"
          y="15"
          fill="#3b82f6"
          fontSize="4.5"
          fontFamily="monospace"
          textAnchor="middle"
        >
          {serviceTitle.toUpperCase()} SCHEMATIC
        </text>
        <text
          x="100"
          y="142"
          fill="rgba(255,255,255,0.4)"
          fontSize="4.5"
          fontFamily="monospace"
          textAnchor="middle"
        >
          ENGINEERING SYSTEM SCHEMATIC MODEL
        </text>
      </svg>
    );
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0C2340]/60 p-6 md:p-8 shadow-xl relative scroll-mt-24">
      {/* Decorative top blur glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 border-b border-white/5 pb-3">
        <Eye className="h-5 w-5 text-blue-400" />
        <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-wider">
          System Visuals &amp; Engineering Diagrams
        </h3>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-6 font-body">
        Select the tabs below to explore real-time thermodynamic airflow
        diagrams, panel joint models, and dynamic sensor telemetry profiles.
      </p>

      {/* Showcase area grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Showcase (col-span-8) */}
        <div className="md:col-span-8 flex justify-center relative select-none">
          <div className="absolute inset-0 bg-blue-500/5 blur-[80px] pointer-events-none z-0" />
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
                  <label className="text-[8px] text-slate-400 font-mono uppercase block">
                    Evaporator Fan Speed
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {(["off", "low", "medium", "high"] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setFanSpeed(spd)}
                        className={`text-[8px] font-bold py-1 rounded capitalize border transition-all ${
                          fanSpeed === spd
                            ? "bg-blue-500/20 border-blue-500 text-blue-300"
                            : "bg-transparent border-white/5 text-slate-500"
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
                    heatmap
                      ? "bg-blue-500/20 border-blue-500 text-blue-300"
                      : "bg-transparent border-white/5 text-slate-500"
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
                    camLocked
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-transparent border-white/5 text-slate-500 hover:border-white/10"
                  }`}
                >
                  <span>
                    {camLocked
                      ? "Release Cam-Lock Joint"
                      : "Engage Cam-Lock Joint"}
                  </span>
                </button>

                <div className="space-y-1">
                  <label className="text-[8px] text-slate-400 font-mono uppercase block">
                    Panel Insulation Core
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {([60, 100, 120, 150] as const).map((thk) => (
                      <button
                        key={thk}
                        onClick={() => setPufThickness(thk)}
                        className={`text-[8px] font-bold py-1 rounded border transition-all ${
                          pufThickness === thk
                            ? "bg-blue-500/20 border-blue-500 text-blue-300"
                            : "bg-transparent border-white/5 text-slate-500"
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
                    alarmActive
                      ? "bg-red-600 border-red-500 text-white animate-pulse"
                      : "bg-transparent border-white/5 text-slate-500 hover:border-white/10"
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>
                    {alarmActive ? "Acknowledge Alert" : "Simulate Alarm Test"}
                  </span>
                </button>
                <div className="text-[7.5px] text-slate-500 leading-normal">
                  Toggle the test trigger above to verify the automatic digital
                  relay alerts in over-temperature safety scenarios.
                </div>
              </div>
            )}

            {/* Controls for refrigeration-systems */}
            {slug === "refrigeration-systems" && activeTab === "pid" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[8px] text-slate-400 font-mono uppercase block">
                    System Refrigeration Load
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["low", "normal", "high"] as const).map((ld) => (
                      <button
                        key={ld}
                        onClick={() => setRefrigLoad(ld)}
                        className={`text-[8px] font-bold py-1 rounded capitalize border transition-all ${
                          refrigLoad === ld
                            ? "bg-blue-500/20 border-blue-500 text-blue-300"
                            : "bg-transparent border-white/5 text-slate-500"
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
                  <label className="text-[8px] text-slate-400 font-mono uppercase block">
                    Condenser Fan Speed
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {(["off", "low", "medium", "high"] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setFanSpeed(spd)}
                        className={`text-[8px] font-bold py-1 rounded capitalize border transition-all ${
                          fanSpeed === spd
                            ? "bg-blue-500/20 border-blue-500 text-blue-300"
                            : "bg-transparent border-white/5 text-slate-500"
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
                <div>
                  Dials and lamps simulate hand-off-auto (HOA) functions. Mains
                  switch isolates current draws. Manual Defrost engages coil
                  heating relays.
                </div>
              </div>
            )}

            {/* Controls for mushroom-saffron-cultivation */}
            {slug === "mushroom-saffron-cultivation" && activeTab === "panel" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[8px] text-slate-400 font-mono uppercase block">
                    Grow LED Light Dimmer ({ledIntensity}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={ledIntensity}
                    onChange={(e) => setLedIntensity(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
                <button
                  onClick={() => setHeaterOn(!heaterOn)}
                  className={`w-full py-2.5 text-[8.5px] font-bold rounded border transition-all flex items-center justify-center gap-1.5 ${
                    heaterOn
                      ? "bg-blue-500/20 border-blue-500 text-blue-300"
                      : "bg-transparent border-white/5 text-slate-500 hover:border-white/10"
                  }`}
                >
                  <span>
                    {heaterOn ? "Disable Humidifier (RH)" : "Enable Humidifier (RH)"}
                  </span>
                </button>
                <div className="text-[7px] text-slate-500 leading-normal">
                  Turn the ultrasonic humidifier off to simulate drop in cultivation micro-climate relative humidity.
                </div>
              </div>
            )}

            {/* Fallback description */}
            {((slug !== "modular-cold-rooms" &&
              slug !== "refrigeration-systems" &&
              slug !== "mushroom-saffron-cultivation") ||
              activeTab === "default") && (
              <div className="text-[8px] text-slate-400 space-y-1.5 leading-relaxed">
                <div>
                  Engineering schematics display technical joint designs,
                  airflow currents, and components mapped out for the{" "}
                  {serviceTitle} service category.
                </div>
                <div className="text-[7px] text-slate-500">
                  Model verified under MIDH and NHB technical guidelines.
                </div>
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
                ? "bg-blue-500/10 border-blue-500/40 text-blue-400 shadow-[0_0_12px_rgba(59, 130, 246,0.1)]"
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
  const [estimatedSubsidy, setEstimatedSubsidy] = useState("35%");

  // Consultation form states
  const [formSent, setFormSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [notes, setNotes] = useState("");
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null);

  // New states for premium interactions
  const [heroView, setHeroView] = useState<"photo" | "blueprint">("photo");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const [hoveredSpecIdx, setHoveredSpecIdx] = useState<number | null>(null);
  const [specMouseCoords, setSpecMouseCoords] = useState({ x: 0, y: 0 });

  const [hoveredAppIdx, setHoveredAppIdx] = useState<number | null>(null);
  const [appMouseCoords, setAppMouseCoords] = useState({ x: 0, y: 0 });

  const [hoveredWhyIdx, setHoveredWhyIdx] = useState<number | null>(null);
  const [whyMouseCoords, setWhyMouseCoords] = useState({ x: 0, y: 0 });

  const handleSpecMouseMove = (e: React.MouseEvent<HTMLElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpecMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHoveredSpecIdx(idx);
  };

  const handleAppMouseMove = (e: React.MouseEvent<HTMLElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAppMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHoveredAppIdx(idx);
  };

  const handleWhyMouseMove = (e: React.MouseEvent<HTMLElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setWhyMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHoveredWhyIdx(idx);
  };

  // Run thermodynamic equations when inputs change
  useEffect(() => {
    const l = parseFloat(calcLength) || 10;
    const w = parseFloat(calcWidth) || 10;
    const h = parseFloat(calcHeight) || 10;
    const volCuFt = l * w * h;
    const volCuM = parseFloat((volCuFt * 0.0283168).toFixed(1));

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

    // 2. Cost estimation baseline
    const costFactor = calcTempProfile.includes("freezing") ? 220 : 160;

    // Subsidy rate matching (35% private, 50% FPO/Cooperative)
    const rate = calcApplicant === "fpo" ? 50 : 35;

    setTimeout(() => {
      setVolumeCuFt(Math.round(volCuFt));
      setVolumeCuM(volCuM);
      setCoolingTR(tr);
      setPufThickness(thickness);
      setEstimatedSubsidy(`${rate}%`);
    }, 0);
  }, [calcLength, calcWidth, calcHeight, calcTempProfile, calcApplicant]);

  const handleApplySizingToForm = () => {
    const formattedNotes = `Requested custom Sizing:
- Dimensions: ${calcLength}'L x ${calcWidth}'W x ${calcHeight}'H
- Calculated Volume: ${volumeCuFt} cu. ft. (${volumeCuM} m³)
- Target cooling Profile: ${calcTempProfile.toUpperCase()}
- Suggested Load: ${coolingTR} TR
- PUF Panel thickness: ${pufThickness}
- Expected Subsidy: ${estimatedSubsidy}`;
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
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
  };

  // Dynamic Image Mapping for Hero & Gallery
  const heroImageMap: Record<string, string> = {
    "modular-cold-rooms": "/images/cold_room_modular.png",
    "refrigeration-systems": "/images/refrigeration_system.png",
    "mushroom-saffron-cultivation": "/images/mushroom_saffron_cultivation.png",
    "clean-rooms": "/images/cold_room_door.png",
    "ripening-chambers": "/images/ripening_chamber.png",
    "blast-chillers": "/images/blast_chiller.png",
    amc: "/images/amc_maintenance.png",
    consultation: "/images/technician.png",
  };
  const heroImage = heroImageMap[slug] || "/images/cold_room_modular.png";

  const galleryDb: Record<
    string,
    { src: string; title: string; desc: string; tag: string }[]
  > = {
    "modular-cold-rooms": [
      {
        src: "/images/cold_room_modular.png",
        title: "Modular Cold Store Sizing",
        desc: "Cam-lock panel alignment & insulation holding test",
        tag: "MODULAR BUILD",
      },
      {
        src: "/images/deep_freezer_room.png",
        title: "Sub-Zero Holding Room",
        desc: "Heavy duty aluminum flooring & pressure valves setup",
        tag: "-25°C CHAMBER",
      },
      {
        src: "/images/puf_panels.png",
        title: "High Density PUF Panels",
        desc: "Dual cam-locked joint layout with absolute vapor seal",
        tag: "INSULATION CORE",
      },
      {
        src: "/images/cold_room_unit.png",
        title: "Dairy Distribution Depot",
        desc: "Uniform airflow delivery & hygienic walls inspection",
        tag: "ACTIVE NODE",
      },
    ],
    "refrigeration-systems": [
      {
        src: "/images/refrigeration_system.png",
        title: "Condensing Unit Rigging",
        desc: "Tropical grade fan condensing plant setup at site",
        tag: "PLANT ENG",
      },
      {
        src: "/images/compressors.png",
        title: "Semi-Hermetic Compressor Rack",
        desc: "Vibration isolation mounting & dual pressure checks",
        tag: "TR COMPRESSOR",
      },
      {
        src: "/images/control_panel_unit.png",
        title: "PLC Control Starter Panel",
        desc: "Dixell electronic controller wiring & HOA diagnostics",
        tag: "SYSTEM CONTROL",
      },
      {
        src: "/images/evaporator.png",
        title: "Forced Draft Evaporator Coil",
        desc: "Electrical heater defrost loop inspection at MIDC",
        tag: "COIL HEAT",
      },
    ],
    "mushroom-saffron-cultivation": [
      {
        src: "/images/mushroom_saffron_cultivation.png",
        title: "Cleanroom Climate Cultivation Chambers",
        desc: "Precision vertical growth shelves with smart controls",
        tag: "CULTIVATION SYSTEM",
      },
      {
        src: "/images/cold_room_modular.png",
        title: "Cam-Lock PUF Shell Walls",
        desc: "Rigid insulation grids maintaining high humidity hermeticity",
        tag: "INSULATED CORE",
      },
      {
        src: "/images/control_panel_unit.png",
        title: "IoT Growth Control Panel",
        desc: "Automatic CO2, lighting levels, and airflow adjustments",
        tag: "PLC AUTOMATION",
      },
      {
        src: "/images/evaporator.png",
        title: "Ventilation and HEPA Filtration Systems",
        desc: "High velocity HEPA filtered air exchanges",
        tag: "AIR QUALITY",
      },
    ],
    "clean-rooms": [
      {
        src: "/images/cold_room_door.png",
        title: "Sterile Cleanroom Entryway",
        desc: "Double interlocking flush doors airlock compliance",
        tag: "ISO CLASS 5",
      },
      {
        src: "/images/control_panel_unit.png",
        title: "Differential Pressure Gauge",
        desc: "Automatic pressure cascade sensor loops validation",
        tag: "CASCADE VALVE",
      },
      {
        src: "/images/puf_panels.png",
        title: "Stainless Steel Wall Cladding",
        desc: "Smooth anti-bacterial Ra polish clean panel joints",
        tag: "STERILE PANEL",
      },
      {
        src: "/images/evaporator.png",
        title: "HEPA Absolute Airflow Unit",
        desc: "ISO standard laminar airflow HEPA filters rigging",
        tag: "HEPA FLOW",
      },
    ],
    "ripening-chambers": [
      {
        src: "/images/ripening_chamber.png",
        title: "Banana Ripening Chamber",
        desc: "Pressurized forced-air ventilation tunnels layout",
        tag: "AGRI RIPENING",
      },
      {
        src: "/images/evaporator.png",
        title: "Ripening Room Evaporator",
        desc: "Dual speed air throw fans for uniform ripening check",
        tag: "AIR TUNNEL",
      },
      {
        src: "/images/control_panel_unit.png",
        title: "PLC Ethylene Dosing Panel",
        desc: "Ethylene gas concentration automatic control loops",
        tag: "GAS DOSING",
      },
      {
        src: "/images/technician.png",
        title: "Compliance Sensor Calibration",
        desc: "Carbon dioxide extraction venting sensors test",
        tag: "CO2 CHECK",
      },
    ],
    "blast-chillers": [
      {
        src: "/images/blast_chiller.png",
        title: "Shock Freezer Chamber",
        desc: "High velocity evaporator fan pulling -38°C speed",
        tag: "BLAST FREEZE",
      },
      {
        src: "/images/ice_flake_machine.png",
        title: "Industrial Ice Flake Node",
        desc: "Evaporator drum refrigeration assembly validation",
        tag: "SUB-COOLED ICE",
      },
      {
        src: "/images/control_panel_unit.png",
        title: "Needle Temperature Controller",
        desc: "Core product probe auto defrost log curves setup",
        tag: "CORE PROBE",
      },
      {
        src: "/images/compressors.png",
        title: "Booster Compressor Rack",
        desc: "High volume compression loops running blast cycles",
        tag: "BOOSTER TR",
      },
    ],
    amc: [
      {
        src: "/images/amc_maintenance.png",
        title: "Preventative Coil Cleaning",
        desc: "Condenser coil chemical washing & refrigerant tests",
        tag: "SLA AMC",
      },
      {
        src: "/images/technician.png",
        title: "On-site Electrical Review",
        desc: "Current draws measurements & overload relay checkups",
        tag: "TECH RESPONSE",
      },
      {
        src: "/images/compressors.png",
        title: "Compressor Valve Inspection",
        desc: "Copeland scroll oil changes & vibration diagnostics",
        tag: "OEM SERVICE",
      },
      {
        src: "/images/control_panel_unit.png",
        title: "Telemetry Signal Calibration",
        desc: "IoT sensor telemetry alert systems validation check",
        tag: "ALARM TEST",
      },
    ],
    consultation: [
      {
        src: "/images/technician.png",
        title: "Engineering Blueprint Drafting",
        desc: "Computer heat gain simulations & piping isometric CAD",
        tag: "CAD CONSULT",
      },
      {
        src: "/images/control_panel_unit.png",
        title: "Subsidy DPR Compilation",
        desc: "NHB and MIDH grant bankable project dossiers setup",
        tag: "GOV SCHEMES",
      },
      {
        src: "/images/puf_panels.png",
        title: "Structural Load Sizing Review",
        desc: "Underdeck insulation & floor load equations check",
        tag: "LOAD CALCUL",
      },
      {
        src: "/images/refrigeration_system.png",
        title: "Plant Capacity Calculations",
        desc: "Condensing unit coefficient of performance simulations",
        tag: "COP MATH",
      },
    ],
  };

  const galleryItems = galleryDb[slug] || galleryDb["modular-cold-rooms"];

  const handlePrevGalleryItem = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIdx !== null) {
      if (lightboxIdx > 0) {
        setLightboxIdx(lightboxIdx - 1);
      } else {
        setLightboxIdx(galleryItems.length - 1);
      }
    }
  };

  const handleNextGalleryItem = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIdx !== null) {
      if (lightboxIdx < galleryItems.length - 1) {
        setLightboxIdx(lightboxIdx + 1);
      } else {
        setLightboxIdx(0);
      }
    }
  };

  // Keyboard navigation for service page lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") handlePrevGalleryItem();
      if (e.key === "ArrowRight") handleNextGalleryItem();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIdx, galleryItems]);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-[#0C2340] text-white selection:bg-blue-600 overflow-x-hidden">
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
            backgroundSize: "20px 20px, 40px 40px, 40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0C2340] via-[#0E2F56]/90 to-[#0A1A30]/95 z-0" />

        {/* Soft glowing ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Clickable Breadcrumbs (Interactive Navigation) */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/services"
              className="hover:text-white transition-colors"
            >
              Services
            </Link>
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

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.12]">
                ThermoVault Solutions:
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-400 font-display">
                  {service.title}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body max-w-2xl">
                {service.detailedDesc} Sourced and engineered to withstand
                severe tropical climates, delivering optimized coefficient of
                performance (COP) and strict thermal security.
              </p>

              {/* Temp Range Pill & Sizing Quick Link */}
              <div className="flex flex-wrap gap-4 pt-1 items-center">
                <div className="flex items-center gap-2.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 transition-all duration-300 px-4.5 py-2 text-xs font-bold text-slate-300 shadow-[0_0_20px_rgba(34,211,238,0.08)] select-none">
                  <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs shadow-[0_0_8px_rgba(6,182,212,0.3)] animate-pulse shrink-0 font-sans">
                    ❄
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-slate-400">
                    OPERATIONAL CORE:{" "}
                    <strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 font-mono tracking-normal">
                      {service.tempRange}
                    </strong>
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping ml-1" />
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById(
                      "sizing-calculator-section",
                    );
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-cyan-accent/15 hover:bg-cyan-accent/25 border border-cyan-light/20 text-cyan-light px-4 py-2 text-xs font-bold font-mono transition-all flex items-center gap-1 hover:border-cyan-light/40 shadow-sm"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Run Sizing Calculator</span>
                </button>
              </div>
            </div>

            {/* Right side: Dual-View Media Widget (col-span-5) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-10 lg:mt-0 w-full max-w-[380px] mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-blue-500/5 blur-[80px] pointer-events-none z-0" />

              {/* High-tech selector tab */}
              <div className="flex items-center bg-slate-950/40 border border-white/5 rounded-lg p-1 mb-4 select-none z-10 font-mono text-[9px] uppercase tracking-wider shadow-inner">
                <button
                  onClick={() => setHeroView("photo")}
                  className={`px-3.5 py-1.5 rounded transition-all duration-300 font-bold ${
                    heroView === "photo"
                      ? "bg-blue-500/20 border border-blue-500/30 text-blue-300 shadow-[0_0_10px_rgba(59, 130, 246,0.2)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Real-World Build
                </button>
                <button
                  onClick={() => setHeroView("blueprint")}
                  className={`px-3.5 py-1.5 rounded transition-all duration-300 font-bold ${
                    heroView === "blueprint"
                      ? "bg-blue-500/20 border border-blue-500/30 text-blue-300 shadow-[0_0_10px_rgba(59, 130, 246,0.2)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  CAD Blueprint
                </button>
              </div>

              <motion.div
                layout
                className="relative w-full aspect-[4/3] rounded-2xl border border-white/10 bg-white/2 p-2 shadow-2xl backdrop-blur-sm overflow-hidden group select-none z-10"
              >
                {/* Laser scan line overlay */}
                <div
                  className="absolute left-0 right-0 h-[1.5px] bg-cyan-400/40 shadow-[0_0_8px_rgba(34,211,238,0.4)] z-20 pointer-events-none"
                  style={{ animation: "scan 3.5s linear infinite" }}
                />

                <div className="absolute top-3 left-3 text-[8px] font-mono text-blue-400/40 font-bold z-20">
                  SCALE: 1:35
                </div>
                <div className="absolute bottom-3 right-3 text-[8px] font-mono text-blue-400/40 font-bold z-20">
                  TV-NODE-{slug.toUpperCase()}
                </div>

                <AnimatePresence mode="wait">
                  {heroView === "photo" ? (
                    <motion.div
                      key="photo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-white/5"
                    >
                      {/* Industrial image */}
                      <Image
                        src={heroImage}
                        alt={service.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 35vw"
                      />
                      {/* Tech blueprint grid pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: "20px 20px",
                        }}
                      />
                      {/* Soft dark vignettes */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                      <div className="absolute bottom-3 left-3 text-left">
                        <div className="text-[10px] font-bold text-white uppercase tracking-wider font-display">
                          {service.title}
                        </div>
                        <div className="text-[7.5px] font-mono text-slate-300">
                          ACTUAL INSTALLATION IN OPERATION
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="blueprint"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full rounded-xl bg-[#0A1A30]/90 p-4 border border-white/5 flex flex-col justify-between"
                    >
                      <div className="w-full flex-1 relative flex items-center justify-center">
                        <svg
                          className="stroke-cyan-light/35 fill-none w-full h-full max-h-40"
                          viewBox="0 0 120 90"
                        >
                          {/* Blueprint Grid Lines */}
                          <path
                            d="M 0 15 H 120 M 0 30 H 120 M 0 45 H 120 M 0 60 H 120 M 0 75 H 120"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M 20 0 V 90 M 40 0 V 90 M 60 0 V 90 M 80 0 V 90 M 100 0 V 90"
                            strokeWidth="0.1"
                          />

                          {/* Chamber Walls */}
                          <rect
                            x="25"
                            y="20"
                            width="70"
                            height="50"
                            strokeWidth="1"
                            className="stroke-cyan-light"
                          />

                          {/* Door Swing */}
                          <path
                            d="M 95 45 C 95 35, 90 30, 85 30"
                            strokeWidth="0.75"
                            strokeDasharray="1.5 1.5"
                            className="stroke-blue-400"
                          />
                          <line
                            x1="95"
                            y1="45"
                            x2="85"
                            y2="45"
                            strokeWidth="1"
                            className="stroke-blue-400"
                          />

                          {/* Evaporator placement */}
                          <rect
                            x="30"
                            y="32"
                            width="10"
                            height="26"
                            strokeWidth="0.75"
                            className="stroke-cyan-light/70"
                          />
                          {/* Air throw direction arrows */}
                          <path
                            d="M 42 37 L 54 37 M 42 45 L 54 45 M 42 53 L 54 53"
                            strokeWidth="0.5"
                            className="stroke-cyan-400"
                          />

                          {/* Labels */}
                          <text
                            x="31"
                            y="27"
                            fill="#1d9e75"
                            fontSize="4.5"
                            className="font-mono"
                          >
                            EVAPORATOR
                          </text>
                          <text
                            x="50"
                            y="60"
                            fill="#6b7e94"
                            fontSize="4.5"
                            className="font-mono"
                          >
                            COLD ROOM CORE
                          </text>
                          <text
                            x="76"
                            y="25"
                            fill="#34d399"
                            fontSize="4.5"
                            className="font-mono"
                          >
                            EPDM DOOR SEAL
                          </text>
                        </svg>
                      </div>
                      <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[9px] font-mono text-slate-400">
                        <span>GRID REF: MIDH-95</span>
                        <span className="flex items-center gap-1 text-cyan-light">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-light animate-ping" />
                          ENGINEERING MODEL
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          <div className="lg:col-span-2 space-y-12">
            {/* Technical Specifications list */}
            <div className="space-y-6">
              <div className="space-y-1.5 border-l-2 border-blue-500 pl-4 mb-6 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono block">
                  SYSTEM SPECIFICATIONS
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-400 animate-spin-slow" />
                  Technical Specifications
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.specs.map((item, idx) => {
                  const specIcons = [Layers, ShieldCheck, Box, Gauge];
                  const IconComponent = specIcons[idx % specIcons.length];
                  const isHovered = hoveredSpecIdx === idx;

                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3, scale: 1.01 }}
                      onMouseMove={(e) => handleSpecMouseMove(e, idx)}
                      onMouseLeave={() => setHoveredSpecIdx(null)}
                      className="group relative rounded-2xl border border-white/5 bg-[#0C2340]/40 p-5 shadow-sm hover:bg-white/5 hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59, 130, 246,0.1)] flex flex-col justify-between overflow-hidden"
                    >
                      {/* Spotlight Glow Effect */}
                      {isHovered && (
                        <div
                          className="absolute inset-0 pointer-events-none opacity-45 transition-opacity duration-300 bg-[radial-gradient(150px_circle_at_var(--x)_var(--y),rgba(59, 130, 246,0.12),transparent_80%)]"
                          style={{
                            "--x": `${specMouseCoords.x}px`,
                            "--y": `${specMouseCoords.y}px`,
                          } as React.CSSProperties}
                        />
                      )}

                      <div className="absolute top-4 right-4 text-[9px] font-mono font-bold text-slate-500 group-hover:text-blue-400/50 transition-colors">
                        [{String(idx + 1).padStart(2, "0")}]
                      </div>

                      <div className="space-y-3.5 z-10 text-left">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 transition-transform duration-300 group-hover:scale-110">
                          <IconComponent className="h-4.5 w-4.5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white font-display tracking-wide group-hover:text-blue-300 transition-colors">
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

            {/* Thermodynamic Heat Load & Sizing Calculator Section */}
            <div
              id="sizing-calculator-section"
              className="rounded-2xl border border-white/10 bg-[#0C2340]/60 p-6 md:p-8 shadow-xl relative scroll-mt-24 text-left"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2.5 mb-4 border-b border-white/5 pb-3">
                <Calculator className="h-5 w-5 text-blue-400 animate-pulse" />
                <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-wider">
                  Thermodynamic Heat Load &amp; Sizing Calculator
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Calculate standard volumetric measurements, suggested
                refrigeration Tons (TR) capacity, recommended PUF panel
                thickness, and back-ended capital subsidy bounds dynamically.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Inputs Columns (col-span-5) */}
                <div className="md:col-span-5 space-y-4 bg-slate-950/25 p-4 rounded-xl border border-white/5">
                  <div className="text-[9px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                    Chamber Dimensions
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[8px] text-slate-400 font-mono block mb-1">
                        Length (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={calcLength}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "") {
                            setCalcLength("");
                            return;
                          }
                          const num = parseFloat(val);
                          if (num < 0) setCalcLength("0");
                          else if (num > 100) setCalcLength("100");
                          else setCalcLength(val);
                        }}
                        className="w-full rounded-lg bg-slate-950/50 border border-white/10 p-2 text-xs font-mono text-white text-center focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 font-mono block mb-1">
                        Width (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={calcWidth}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "") {
                            setCalcWidth("");
                            return;
                          }
                          const num = parseFloat(val);
                          if (num < 0) setCalcWidth("0");
                          else if (num > 100) setCalcWidth("100");
                          else setCalcWidth(val);
                        }}
                        className="w-full rounded-lg bg-slate-950/50 border border-white/10 p-2 text-xs font-mono text-white text-center focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-400 font-mono block mb-1">
                        Height (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={calcHeight}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "") {
                            setCalcHeight("");
                            return;
                          }
                          const num = parseFloat(val);
                          if (num < 0) setCalcHeight("0");
                          else if (num > 100) setCalcHeight("100");
                          else setCalcHeight(val);
                        }}
                        className="w-full rounded-lg bg-slate-950/50 border border-white/10 p-2 text-xs font-mono text-white text-center focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[8px] text-slate-400 font-mono uppercase block mb-1">
                      Temperature Profile
                    </label>
                    <select
                      value={calcTempProfile}
                      onChange={(e) => setCalcTempProfile(e.target.value)}
                      className="w-full rounded-lg bg-slate-950/50 border border-white/10 p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="chilling">Chilling (0°C to +8°C)</option>
                      <option value="freezing">
                        Freezing (-15°C to -18°C)
                      </option>
                      <option value="deep-freezing">
                        Deep Freezing (-20°C to -25°C)
                      </option>
                      <option value="sterile-control">
                        Sterile Room (+18°C to +22°C)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[8px] text-slate-400 font-mono uppercase block mb-1">
                      Applicant Category
                    </label>
                    <select
                      value={calcApplicant}
                      onChange={(e) => setCalcApplicant(e.target.value)}
                      className="w-full rounded-lg bg-slate-950/50 border border-white/10 p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="private">
                        Private Enterprise (35% Grant)
                      </option>
                      <option value="fpo">
                        Farmer Group / FPO (50% Grant)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Outputs Column (col-span-7) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0A1A30]/50 border border-white/5 rounded-xl p-3.5 text-left">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">
                        Volume
                      </span>
                      <span className="text-sm font-bold font-mono text-white">
                        {volumeCuFt}{" "}
                        <span className="text-[10px] text-slate-400">
                          cu.ft.
                        </span>
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono block">
                        ({volumeCuM} m³)
                      </span>
                    </div>

                    <div className="bg-[#0A1A30]/50 border border-white/5 rounded-xl p-3.5 text-left">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">
                        Calculated Load
                      </span>
                      <span className="text-sm font-bold font-mono text-blue-400">
                        {coolingTR}{" "}
                        <span className="text-[10px] text-slate-400">TR</span>
                      </span>
                      <span className="text-[8px] text-slate-400 font-mono block">
                        Tons of Refrigeration
                      </span>
                    </div>

                    <div className="bg-[#0A1A30]/50 border border-white/5 rounded-xl p-3.5 text-left">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">
                        PUF Thickness
                      </span>
                      <span className="text-sm font-bold font-mono text-white">
                        {pufThickness}
                      </span>
                      <span className="text-[8px] text-slate-400 font-mono block">
                        Rigid Cam-lock Panel
                      </span>
                    </div>

                    <div className="bg-[#0A1A30]/50 border border-white/5 rounded-xl p-3.5 text-left">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">
                        Est. Gov Subsidy
                      </span>
                      <span className="text-sm font-bold font-mono text-blue-400">
                        {estimatedSubsidy}
                      </span>
                      <span className="text-[8px] text-slate-400 font-mono block">
                        MIDH / NHB Scheme
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleApplySizingToForm}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Sliders className="h-4 w-4" />
                    <span>Apply Sizing to Consultation Form</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Engineering Parameters Datasheet Board */}
            <div className="space-y-4 pt-6 border-t border-white/5 text-left">
              <div className="space-y-1.5 border-l-2 border-blue-500 pl-4 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono block">
                  COMPLIANCE STATS
                </span>
                <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="h-4.5 w-4.5 text-blue-400" />
                  Engineering Parameters &amp; Compliance
                </h3>
              </div>

              <div className="rounded-2xl border border-white/5 bg-[#0C2340]/40 overflow-hidden shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/5 font-mono">
                  {getTechnicalParameters(slug).map((param, i) => (
                    <div key={i} className="p-4 space-y-1 text-left">
                      <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-bold">
                        {param.label}
                      </span>
                      <div className="text-xs font-bold text-white">
                        {param.value}{" "}
                        <span className="text-[9px] text-blue-400 font-normal">
                          {param.metric}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Visuals Section */}
            {slug !== "amc" && <SystemVisuals slug={slug} serviceTitle={service.title} />}

            {/* Real Project / Installation Gallery */}
            <div className="space-y-6 pt-6 border-t border-white/5 text-left">
              <div className="space-y-1.5 border-l-2 border-blue-500 pl-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono block">
                  PROPOSED 3D CONCEPTS
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-400" />
                  Proposed Designs &amp; Gallery
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {galleryItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIdx(idx)}
                    className="group relative h-48 rounded-2xl overflow-hidden border border-white/5 bg-[#0C2340]/40 shadow-sm cursor-pointer hover:border-blue-500/20 transition-all duration-300"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Tech blueprint grid overlay */}
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: "16px 16px",
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                    {/* Top Right Tag */}
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[8px] font-bold font-mono text-blue-400 tracking-wider">
                      {item.tag}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <h4 className="text-xs font-bold text-white font-display tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-300 leading-normal font-body mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Applications Section */}
            <div className="space-y-6 pt-6 border-t border-white/5 text-left">
              <div className="space-y-1.5 border-l-2 border-blue-500 pl-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono block">
                  DEPLOYMENT SOLUTIONS
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-blue-400" />
                  Ideal Applications
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getApplicationItems(slug).map((app, idx) => {
                  const Icon = app.icon;
                  const isHovered = hoveredAppIdx === idx;
                  return (
                    <Link
                      key={idx}
                      href={app.link}
                      onMouseMove={(e) => handleAppMouseMove(e, idx)}
                      onMouseLeave={() => setHoveredAppIdx(null)}
                      className="group relative flex gap-4 rounded-2xl border border-white/5 bg-[#0C2340]/40 p-5 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:bg-white/5 hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59, 130, 246,0.1)] text-left overflow-hidden"
                    >
                      {/* Spotlight Glow Effect */}
                      {isHovered && (
                        <div
                          className="absolute inset-0 pointer-events-none opacity-45 transition-opacity duration-300 bg-[radial-gradient(150px_circle_at_var(--x)_var(--y),rgba(59, 130, 246,0.12),transparent_80%)]"
                          style={{
                            "--x": `${appMouseCoords.x}px`,
                            "--y": `${appMouseCoords.y}px`,
                          } as React.CSSProperties}
                        />
                      )}

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 transition-transform duration-300 group-hover:scale-110 z-10">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="space-y-1 flex-1 z-10">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-white font-display tracking-wide group-hover:text-blue-300 transition-colors">
                            {app.title}
                          </h4>
                          <ChevronRight className="h-3.5 w-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
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
            <div className="space-y-6 pt-8 border-t border-white/5 text-left">
              <div className="space-y-1.5 border-l-2 border-blue-500 pl-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono block">
                  SEO &amp; SEARCH SUPPORT
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-400" />
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((item, idx) => {
                  const isExpanded = expandedFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden text-left ${
                        isExpanded
                          ? "bg-[#0C2340]/80 border-blue-500/30 shadow-[0_0_15px_rgba(59, 130, 246,0.05)]"
                          : "bg-[#0C2340]/40 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setExpandedFaqIdx(isExpanded ? null : idx)
                        }
                        className="w-full flex items-center justify-between gap-4 p-5 text-left transition-all select-none"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle
                            className={`h-4.5 w-4.5 shrink-0 transition-colors ${isExpanded ? "text-blue-400" : "text-slate-400"}`}
                          />
                          <span
                            className={`text-xs font-bold font-display tracking-wide transition-colors ${isExpanded ? "text-blue-300" : "text-white"}`}
                          >
                            {item.q}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isExpanded
                              ? "rotate-180 text-blue-400"
                              : "text-slate-400"
                          }`}
                        />
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
            <div className="space-y-4 pt-6 border-t border-white/5 text-left">
              <div className="space-y-1.5 border-l-2 border-blue-500 pl-4 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono block">
                  SUGGESTED COMBINATIONS
                </span>
                <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-wider">
                  Related Solutions
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(relatedMap[slug] || []).map((k) => {
                  const title = serviceDb[k]?.title || k;
                  const iconsMap: Record<string, React.ComponentType<{ className?: string }>> = {
                    "modular-cold-rooms": Box,
                    "refrigeration-systems": Settings,
                    "mushroom-saffron-cultivation": Sprout,
                    "clean-rooms": ShieldCheck,
                    "ripening-chambers": Sliders,
                    "blast-chillers": Wind,
                    amc: Wrench,
                    consultation: Ruler,
                  };
                  const RelatedIcon = iconsMap[k] || Settings;
                  return (
                    <Link
                      key={k}
                      href={`/services/${k}`}
                      className="group flex flex-col justify-between p-4 rounded-xl border border-white/5 bg-[#0C2340]/40 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/5 text-left h-24"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
                        <RelatedIcon className="h-4 w-4" />
                      </div>
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[11px] font-bold text-white tracking-wide truncate group-hover:text-blue-300 transition-colors">
                          {title}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-blue-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Why ThermoVault - Trust & Differentiators */}
            <div className="space-y-4 pt-6 border-t border-white/5 text-left">
              <div className="space-y-1.5 border-l-2 border-blue-500 pl-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono block">
                  TRUST &amp; RELIABILITY
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-400" />
                  Why ThermoVault
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    title: "Customized Engineering",
                    desc: "Tailored design parameters matching product thermal load matrices.",
                    icon: Settings,
                  },
                  {
                    title: "Energy Efficient Systems",
                    desc: "Sub-cooler cycles and optimized compressor COP reducing electricity bills.",
                    icon: Zap,
                  },
                  {
                    title: "Subsidy Guidance",
                    desc: "Compiling bankable project reports (DPR) for MIDH, NHB, and NABARD grants.",
                    icon: Layers,
                  },
                  {
                    title: "Reliable After-Sales Support",
                    desc: "Emergency priority response with on-site SLAs across Pune surrounding MIDC.",
                    icon: Wrench,
                  },
                  {
                    title: "IoT Monitoring Ready",
                    desc: "Integrated remote digital temperature & humidity telemetry dashboards.",
                    icon: Gauge,
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  const isHovered = hoveredWhyIdx === i;
                  return (
                    <div
                      key={i}
                      onMouseMove={(e) => handleWhyMouseMove(e, i)}
                      onMouseLeave={() => setHoveredWhyIdx(null)}
                      className="group relative rounded-xl border border-white/5 bg-[#0C2340]/40 p-4 transition-all duration-300 hover:border-blue-500/20 flex gap-4 overflow-hidden"
                    >
                      {isHovered && (
                        <div
                          className="absolute inset-0 pointer-events-none opacity-45 transition-opacity duration-300 bg-[radial-gradient(150px_circle_at_var(--x)_var(--y),rgba(59, 130, 246,0.1),transparent_80%)]"
                          style={{
                            "--x": `${whyMouseCoords.x}px`,
                            "--y": `${whyMouseCoords.y}px`,
                          } as React.CSSProperties}
                        />
                      )}

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1 text-left flex-1">
                        <h4 className="text-xs font-bold text-white font-display">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-body">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Callback Quote Intake form (col-span-1) */}
          <div
            id="sizing-form-card"
            className="relative h-fit lg:sticky lg:top-24 z-20 scroll-mt-24 w-full"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-25 blur-md pointer-events-none" />

            <div className="relative rounded-2xl border border-white/15 bg-[#0C2340]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md overflow-hidden text-left">
              {/* Ambient glowing radial blur */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Technical Vector Drawing Blueprint Schematic with Masked Engineer Image */}
              <div className="relative h-24 w-full rounded-xl bg-slate-950/40 border border-white/5 overflow-hidden mb-6 flex items-center justify-start p-4 select-none">
                <div className="relative z-10 flex items-center gap-3.5 w-full">
                  <div className="relative h-12 w-12 rounded-full border border-blue-500/40 p-0.5 overflow-hidden bg-slate-900 shrink-0 shadow-[0_0_12px_rgba(59, 130, 246,0.25)]">
                    <div className="relative h-full w-full rounded-full overflow-hidden">
                      <Image
                        src="/images/technician.png"
                        alt="Cold Chain Expert"
                        fill
                        className="object-cover object-top scale-105"
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-blue-400">
                      Cold Chain Expert
                    </div>
                    <div className="text-[9px] font-bold text-white font-display">
                      Talk to Design Engineer
                    </div>
                    <div className="text-[8px] font-bold text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
                      <span>RESPONSE SLA: 12-24 HOURS</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Phone className="h-4.5 w-4.5" />
                <h3 className="text-sm font-extrabold text-white font-display uppercase tracking-wider">
                  Sizing Consultation
                </h3>
              </div>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed font-body">
                Need engineering heat gain load calculations or customized CAD
                layout blueprints? Request quote callback.
              </p>

              {formSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 text-center space-y-4 py-10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/15 text-blue-400 mx-auto">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white font-display">
                      Callback Request Scheduled
                    </h4>
                    <p className="text-[10px] text-slate-300 leading-relaxed px-1">
                      Thanks <strong className="text-white">{name}</strong>. Our
                      design draftsman will contact you within 12–24 hours.
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
                      className="w-full rounded-xl bg-slate-950/50 border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all font-body animate-reveal-input"
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
                      className="w-full rounded-xl bg-slate-950/50 border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all font-mono"
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
                      className="w-full rounded-xl bg-slate-950/50 border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all font-body"
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
                      className="w-full rounded-xl bg-slate-950/50 border border-white/10 p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all font-body h-20 resize-none text-[10px] leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold font-mono py-2 bg-blue-500/5 border border-blue-500/10 rounded-xl justify-center w-full shadow-inner select-none">
                    <Clock className="h-3.5 w-3.5 animate-pulse text-blue-400" />
                    <span>Response within 12–24 Hours</span>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white shadow-lg active:scale-[0.98] transition-all font-display group/btn cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5 text-inherit transition-transform group-hover/btn:translate-x-0.5" />
                      <span>Talk to Cold Chain Expert</span>
                    </button>

                    <a
                      href={`https://wa.me/918055010620?text=Hi,%20I'm%20interested%20in%20ThermoVault%20${encodeURIComponent(service.title)}.%20Please%20connect%20me%20with%20an%20expert.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-blue-500/25 bg-blue-500/5 hover:bg-blue-500/10 py-3.5 text-xs font-bold text-white transition-all active:scale-[0.98] font-display group/btn"
                    >
                      <svg
                        className="h-3.5 w-3.5 fill-blue-400 transition-transform group-hover/btn:scale-110"
                        viewBox="0 0 24 24"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.785 1.453 5.424 0 9.835-4.403 9.838-9.817.002-2.622-1.018-5.086-2.87-6.941C16.49 1.993 14.032.975 11.41.974 5.986.974 1.574 5.376 1.571 10.79c-.001 1.702.457 3.361 1.32 4.867L1.87 21.652l6.027-1.579.034-.02-.284.148zM17.43 14.1c-.29-.145-1.722-.85-1.99-.948-.266-.1-.462-.146-.656.145-.194.291-.75.947-.919 1.14-.17.194-.339.219-.63.073-.29-.146-1.229-.452-2.34-1.444-.864-.771-1.448-1.723-1.618-2.014-.17-.291-.018-.448.128-.593.131-.131.29-.34.436-.51.145-.17.194-.291.291-.485.1-.194.05-.364-.025-.51-.073-.145-.656-1.579-.9-2.162-.236-.57-.478-.493-.656-.502-.17-.008-.364-.01-.557-.01-.194 0-.51.072-.776.364-.267.291-1.02 1.02-1.02 2.48s1.068 2.868 1.214 3.063c.146.194 2.102 3.21 5.093 4.5.712.307 1.267.49 1.7.629.715.227 1.365.195 1.88.118.574-.087 1.723-.704 1.965-1.385.243-.68.243-1.263.17-1.384-.073-.122-.267-.194-.557-.34z" />
                      </svg>
                      <span className="text-blue-400">Chat on WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 select-none"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Close button top right */}
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95 shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrevGalleryItem}
              className="absolute left-4 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNextGalleryItem}
              className="absolute right-4 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95 shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full rounded-2xl border border-white/10 bg-[#0C2340] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="relative w-full md:w-3/5 aspect-[4/3] md:aspect-auto bg-slate-950 md:h-[60vh]">
                <Image
                  src={galleryItems[lightboxIdx].src}
                  alt={galleryItems[lightboxIdx].title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Description side */}
              <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-2/5 font-sans border-t md:border-t-0 md:border-l border-white/5 text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-500/10 border border-blue-500/25 px-2.5 py-0.5 rounded text-[8px] font-bold font-mono text-blue-400 tracking-wider">
                      {galleryItems[lightboxIdx].tag}
                    </span>
                    <button
                      onClick={() => setLightboxIdx(null)}
                      className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider font-mono"
                    >
                      [ Close ]
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-white font-display uppercase tracking-wide">
                      {galleryItems[lightboxIdx].title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-body">
                      {galleryItems[lightboxIdx].desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 space-y-2">
                  <div className="text-[8px] font-mono text-slate-400">
                    THERMOVAULT TECHNICAL COMPLIANCE
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-blue-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span>VERIFIED INSTALLATION NODE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern & Premium Performance / Feature Bar */}
      <div className="py-12 border-t border-white/5 bg-[#0C2340]">
        <PerformanceFeatureBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
