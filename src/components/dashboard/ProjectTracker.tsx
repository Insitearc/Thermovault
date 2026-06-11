"use client";

import React, { useState, useEffect } from "react";
import {
  Milestone,
  CheckCircle2,
  Clock,
  Calendar,
  FileText,
  Download,
  Phone,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

interface MilestoneStep {
  title: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  description: string;
}

interface ProjectData {
  id: string;
  name: string;
  milestones: MilestoneStep[];
}

export default function ProjectTracker() {
  const [callbackRequestSent, setCallbackRequestSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", notes: "" });

  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: "seafood-mumbai",
      name: "Seafood Cold Room (Mumbai)",
      milestones: [
        {
          title: "Free Consultation",
          date: "Oct 12, 2025",
          status: "completed",
          description: "Requirements analysis, capacity estimates, and thermal sizing calculation.",
        },
        {
          title: "Site Assessment & Design",
          date: "Nov 05, 2025",
          status: "completed",
          description: "CAD layout drafting, civil check, and 120mm PUF panel thickness specifications map.",
        },
        {
          title: "Manufacturing & Installation",
          date: "In Progress",
          status: "current",
          description: "Assembly of Copeland Scroll compressor, piping leak checks, and wall panel joints rigging.",
        },
        {
          title: "Testing & Handover",
          date: "Est. Dec 15, 2025",
          status: "upcoming",
          description: "Pull-down test, electric defrost testing, IoT controller calibration, and handover.",
        },
      ],
    },
  ]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("seafood-mumbai");

  useEffect(() => {
    async function loadTrackerData() {
      try {
        const res = await fetch("/api/admin");
        const json = await res.json();
        if (json.success && json.data.tracker && json.data.tracker.length > 0) {
          const firstItem = json.data.tracker[0];
          if (firstItem.milestones) {
            // Multi-project structure
            setProjects(json.data.tracker);
            setSelectedProjectId(json.data.tracker[0].id);
          } else {
            // Legacy single project structure - wrap it
            setProjects([
              {
                id: "legacy-project",
                name: "Active Showcase Project",
                milestones: json.data.tracker,
              },
            ]);
            setSelectedProjectId("legacy-project");
          }
        }
      } catch (err) {
        console.error("Error loading tracker data:", err);
      }
    }
    loadTrackerData();
  }, []);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const timeline = activeProject?.milestones || [];

  const specs = [
    { label: "Dimensions", value: "24' x 16' x 10' (Length x Width x Height in feet)" },
    { label: "Insulation", value: "120mm PUF Panels (Density: 40 kg/m³, Thermal Cond: 0.022 W/mK)" },
    { label: "Compressor", value: "Copeland Scroll Compressor (7.5 TR Capacity | Refrigerant: R404A)" },
    { label: "Evaporator", value: "Forced Air Gravity Evaporator with integrated electric heater strip" },
    { label: "Control Panel", value: "Carel Digital Controller with IoT Gateway & temperature alerts" },
    { label: "Access Door", value: "1000mm x 2000mm Insulated Sliding Door with magnetic seal" },
    { label: "Target Range", value: "-25°C to -15°C (Optimized for Deep Freeze Storage)" },
  ];

  const documents = [
    { name: "ThermoVault_Project_Quotation.pdf", size: "1.4 MB", date: "Oct 15, 2025" },
    { name: "CAD_Engineering_Layout_Drawing.pdf", size: "4.8 MB", date: "Nov 02, 2025" },
    { name: "Subsidy_Eligibility_Report_NABARD.pdf", size: "850 KB", date: "Nov 07, 2025" },
    { name: "PUF_Panel_Quality_Certificate.pdf", size: "2.1 MB", date: "Nov 12, 2025" },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setCallbackRequestSent(true);
    setFormData({ name: "", phone: "", notes: "" });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Timeline Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Milestone Tracker Card */}
        <div className="rounded-2xl border border-white/5 bg-[#0C2340]/60 p-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Milestone className="h-4.5 w-4.5 text-teal-light" />
              Installation Milestones & Progress
            </h3>

            {projects.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-silver uppercase font-bold shrink-0">
                  Select Project:
                </span>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="rounded-lg bg-[#0c2340] border border-white/10 px-3 py-1.5 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-teal-light font-medium"
                >
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id} className="bg-[#0c2340]">
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
            {timeline.map((step, idx) => {
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";

              return (
                <div key={idx} className="relative group">
                  {/* Indicator Dot */}
                  <div className="absolute -left-6 sm:-left-8 top-1">
                    {isCompleted ? (
                      <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-teal-accent text-white shadow-lg shadow-teal-accent/20">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                    ) : isCurrent ? (
                      <div className="relative flex h-[18px] w-[18px] items-center justify-center rounded-full bg-teal-light">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-light opacity-75" />
                        <Clock className="relative h-3 w-3 text-white" />
                      </div>
                    ) : (
                      <div className="h-[18px] w-[18px] rounded-full border-2 border-white/10 bg-[#0C2340]" />
                    )}
                  </div>

                  {/* Context */}
                  <div
                    className={`rounded-xl p-4 transition-all duration-200 border ${
                      isCurrent
                        ? "bg-teal-accent/5 border-teal-accent/20"
                        : "bg-[#0C2340]/30 border-transparent hover:border-white/5"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4
                        className={`text-xs font-bold font-display ${
                          isCurrent ? "text-teal-light" : "text-white"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[9px] font-mono text-silver flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs text-silver/80 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cold Room Sizing Specifications Table */}
        <div className="rounded-2xl border border-white/5 bg-[#0C2340]/60 p-6 shadow-md">
          <h3 className="text-sm font-bold text-white mb-4 font-display flex items-center gap-2">
            <ShieldCheck className="h-4.5 w-4.5 text-teal-light" />
            Engineering Design Specifications
          </h3>

          <div className="divide-y divide-white/5">
            {specs.map((spec, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row py-3 gap-1 sm:gap-4 justify-between">
                <span className="text-xs text-silver/70 font-semibold sm:w-1/4 shrink-0">
                  {spec.label}
                </span>
                <span className="text-xs text-white/90 font-mono sm:w-3/4 leading-relaxed">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Documents Vault & PM Callback Request */}
      <div className="space-y-6">
        {/* Document Vault Download box */}
        <div className="rounded-2xl border border-white/5 bg-[#0C2340]/60 p-6 shadow-md">
          <h3 className="text-sm font-bold text-white mb-4 font-display flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-teal-light" />
            Document Vault
          </h3>
          <p className="text-xs text-silver/80 mb-4 leading-relaxed">
            Access secure engineering drafts, compliance files, and pricing sheets.
          </p>

          <div className="space-y-3">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/10 group transition-all duration-200"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-semibold text-white truncate font-mono">
                    {doc.name}
                  </div>
                  <div className="text-[9px] text-silver mt-1 font-mono">
                    {doc.size} | Uploaded {doc.date}
                  </div>
                </div>
                <button
                  onClick={() => alert(`Simulating file download: ${doc.name}`)}
                  className="h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-teal-accent/15 border border-teal-accent/30 text-teal-light group-hover:bg-teal-accent group-hover:text-white transition-all active:scale-95"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Coordinator & Modification request callback */}
        <div className="rounded-2xl border border-white/5 bg-[#0C2340]/60 p-6 shadow-md">
          <h3 className="text-sm font-bold text-white mb-4 font-display">Project Coordination</h3>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/5 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-accent text-sm font-bold text-white">
              KV
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Karan Varma</div>
              <div className="text-[10px] text-silver">Project Lead Engineer (Pune)</div>
              <div className="text-[10px] text-teal-light mt-0.5">+91 80550 10620</div>
            </div>
          </div>

          {callbackRequestSent ? (
            <div className="rounded-xl border border-teal-accent/20 bg-teal-accent/5 p-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-teal-light mx-auto mb-2" />
              <div className="text-xs font-semibold text-white">Callback Request Sent</div>
              <div className="text-[10px] text-silver mt-1 leading-relaxed">
                Karan Varma will reach out via call or WhatsApp within 2 working hours.
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <span className="text-[10px] font-mono text-silver uppercase block mb-1">
                Request Layout Modification
              </span>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl bg-[#0C2340] border border-white/5 p-2.5 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-teal-light transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl bg-[#0C2340] border border-white/5 p-2.5 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-teal-light transition-colors"
              />
              <textarea
                placeholder="What revisions do you need? (e.g. door orientation, compressor brand)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-xl bg-[#0C2340] border border-white/5 p-2.5 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-teal-light transition-colors h-16 resize-none"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-accent py-2.5 text-xs font-semibold text-white hover:bg-teal-light transition-all active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
