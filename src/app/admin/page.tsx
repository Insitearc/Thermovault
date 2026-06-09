"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Lock, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Image as ImageIcon, 
  Layers, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  LogOut,
  Briefcase,
  X,
  FileSpreadsheet,
  MapPin,
  Milestone,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types matching our JSON structures
interface Blog {
  slug: string;
  title: string;
  keyword: string;
  type: string;
  category: string;
  readTime: string;
  summary: string;
  intro: string;
  section1Title: string;
  section1Body: string;
  section2Title: string;
  section2Body: string;
  image?: string;
  contentImage?: string;
}

interface TrackerMilestone {
  title: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  description: string;
}

interface Service {
  title: string;
  desc: string;
  image: string;
  slug: string;
  icon: string;
}

interface Project {
  title: string;
  location: string;
  category: string;
  size: string;
  image: string;
  desc: string;
}

interface Job {
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

interface PageData {
  about: {
    hero_title: string;
    hero_subtitle: string;
    hero_description: string;
    founder_name: string;
    founder_title: string;
    founder_quote: string;
    founder_message_1: string;
    founder_message_2: string;
  };
  subsidy: {
    hero_title: string;
    hero_description: string;
    scheme1_title: string;
    scheme1_description: string;
    scheme2_title: string;
    scheme2_description: string;
  };
  careers: {
    hero_title: string;
    hero_description: string;
    jobs: Job[];
  };
}

export default function AdminDashboard() {
  // Passcode gate state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  // DB States
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pages, setPages] = useState<PageData | null>(null);
  const [tracker, setTracker] = useState<any[]>([]);
  const [selectedTrackerProjectId, setSelectedTrackerProjectId] = useState<string>("");

  const activeTrackerProject = tracker.find((p) => p.id === selectedTrackerProjectId) || tracker[0];
  
  // App states
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "blogs" | "services" | "projects" | "pages" | "tracker">("overview");
  const [pageSubTab, setPageSubTab] = useState<"about" | "subsidy" | "careers">("about");
  
  // Notification Toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Edit / Add Modals states
  const [blogModal, setBlogModal] = useState<{ isOpen: boolean; mode: "add" | "edit"; data: Blog; index?: number } | null>(null);
  const [serviceModal, setServiceModal] = useState<{ isOpen: boolean; mode: "add" | "edit"; data: Service; index?: number } | null>(null);
  const [projectModal, setProjectModal] = useState<{ isOpen: boolean; mode: "add" | "edit"; data: Project; index?: number } | null>(null);
  const [jobModal, setJobModal] = useState<{ isOpen: boolean; mode: "add" | "edit"; data: Job; index?: number } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Load data from API
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin");
      const result = await res.json();
      if (result.success) {
        setBlogs(result.data.blogs);
        setServices(result.data.services);
        setProjects(result.data.projects);
        setPages(result.data.pages);
        
        if (result.data.tracker && result.data.tracker.length > 0) {
          const firstItem = result.data.tracker[0];
          if (firstItem.milestones) {
            setTracker(result.data.tracker);
            setSelectedTrackerProjectId(result.data.tracker[0].id);
          } else {
            // Legacy single project conversion
            const legacyProj = [
              {
                id: "legacy-project",
                name: "Active Showcase Project",
                milestones: result.data.tracker
              }
            ];
            setTracker(legacyProj);
            setSelectedTrackerProjectId("legacy-project");
          }
        } else {
          setTracker([]);
          setSelectedTrackerProjectId("");
        }
      } else {
        showToast("Failed to load server data.", "error");
      }
    } catch (e) {
      showToast("Network error loading data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check local storage for session authentication
    const authSession = localStorage.getItem("admin_authenticated");
    if (authSession === "true") {
      setTimeout(() => {
        setIsAuthenticated(true);
        loadData();
      }, 0);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      setLoginError("");
      loadData();
    } else {
      setLoginError("Invalid passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };

  // Generic Save Function
  const saveToDatabase = async (action: string, updatedData: any) => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, data: updatedData }),
      });
      const result = await res.json();
      if (result.success) {
        showToast("Changes saved successfully!", "success");
        return true;
      } else {
        showToast(result.error || "Failed to save changes.", "error");
        return false;
      }
    } catch (e) {
      showToast("Network error saving changes.", "error");
      return false;
    }
  };

  // --- BLOG HANDLERS ---
  const openAddBlog = () => {
    setBlogModal({
      isOpen: true,
      mode: "add",
      data: {
        slug: "",
        title: "",
        keyword: "",
        type: "Technical Guide",
        category: "technical",
        readTime: "5 min read",
        summary: "",
        intro: "",
        section1Title: "",
        section1Body: "",
        section2Title: "",
        section2Body: "",
        image: "/images/cold_room_modular.png",
        contentImage: "/images/cold_room_unit.png",
      },
    });
  };

  const openEditBlog = (blog: Blog, idx: number) => {
    setBlogModal({
      isOpen: true,
      mode: "edit",
      data: { ...blog },
      index: idx,
    });
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogModal) return;

    // Validate slug
    const cleanSlug = blogModal.data.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const formattedData = { ...blogModal.data, slug: cleanSlug };

    const updatedBlogs = [...blogs];
    if (blogModal.mode === "add") {
      // Check duplicate slug
      if (blogs.some(b => b.slug === cleanSlug)) {
        showToast("A blog with this slug already exists.", "error");
        return;
      }
      updatedBlogs.push(formattedData);
    } else if (blogModal.mode === "edit" && blogModal.index !== undefined) {
      updatedBlogs[blogModal.index] = formattedData;
    }

    const success = await saveToDatabase("save_blogs", updatedBlogs);
    if (success) {
      setBlogs(updatedBlogs);
      setBlogModal(null);
    }
  };

  const handleDeleteBlog = async (idx: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const updatedBlogs = blogs.filter((_, i) => i !== idx);
    const success = await saveToDatabase("save_blogs", updatedBlogs);
    if (success) {
      setBlogs(updatedBlogs);
    }
  };

  // --- SERVICE HANDLERS ---
  const openAddService = () => {
    setServiceModal({
      isOpen: true,
      mode: "add",
      data: {
        title: "",
        desc: "",
        image: "/images/cold_room_modular.png",
        slug: "",
        icon: "Snowflake",
      },
    });
  };

  const openEditService = (service: Service, idx: number) => {
    setServiceModal({
      isOpen: true,
      mode: "edit",
      data: { ...service },
      index: idx,
    });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceModal) return;

    const cleanSlug = serviceModal.data.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const formattedData = { ...serviceModal.data, slug: cleanSlug };

    const updatedServices = [...services];
    if (serviceModal.mode === "add") {
      if (services.some(s => s.slug === cleanSlug)) {
        showToast("A service with this slug already exists.", "error");
        return;
      }
      updatedServices.push(formattedData);
    } else if (serviceModal.mode === "edit" && serviceModal.index !== undefined) {
      updatedServices[serviceModal.index] = formattedData;
    }

    const success = await saveToDatabase("save_services", updatedServices);
    if (success) {
      setServices(updatedServices);
      setServiceModal(null);
    }
  };

  const handleDeleteService = async (idx: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const updatedServices = services.filter((_, i) => i !== idx);
    const success = await saveToDatabase("save_services", updatedServices);
    if (success) {
      setServices(updatedServices);
    }
  };

  // --- PROJECT HANDLERS ---
  const openAddProject = () => {
    setProjectModal({
      isOpen: true,
      mode: "add",
      data: {
        title: "",
        location: "",
        category: "interiors",
        size: "",
        image: "/images/dairy_warehouse_storage.png",
        desc: "",
      },
    });
  };

  const openEditProject = (project: Project, idx: number) => {
    setProjectModal({
      isOpen: true,
      mode: "edit",
      data: { ...project },
      index: idx,
    });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectModal) return;

    const updatedProjects = [...projects];
    if (projectModal.mode === "add") {
      updatedProjects.push(projectModal.data);
    } else if (projectModal.mode === "edit" && projectModal.index !== undefined) {
      updatedProjects[projectModal.index] = projectModal.data;
    }

    const success = await saveToDatabase("save_projects", updatedProjects);
    if (success) {
      setProjects(updatedProjects);
      setProjectModal(null);
    }
  };

  const handleDeleteProject = async (idx: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const updatedProjects = projects.filter((_, i) => i !== idx);
    const success = await saveToDatabase("save_projects", updatedProjects);
    if (success) {
      setProjects(updatedProjects);
    }
  };

  // --- PAGE COPY HANDLERS ---
  const handleSavePageContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pages) return;
    await saveToDatabase("save_pages", pages);
  };

  // --- PROJECT TRACKER HANDLERS ---
  const handleSaveTracker = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveToDatabase("save_tracker", tracker);
  };

  const handleAddTrackerProject = () => {
    const name = prompt("Enter Project Name:");
    if (!name) return;
    const newProj = {
      id: "project-" + Date.now(),
      name: name,
      milestones: [
        {
          title: "Free Consultation",
          date: "Oct 12, 2025",
          status: "completed" as const,
          description: "Requirements analysis, capacity estimates, and thermal sizing calculation.",
        },
        {
          title: "Site Assessment & Design",
          date: "Nov 05, 2025",
          status: "upcoming" as const,
          description: "CAD layout drafting, civil check, and 120mm PUF panel thickness specifications map.",
        },
        {
          title: "Manufacturing & Installation",
          date: "Est. Dec 05, 2025",
          status: "upcoming" as const,
          description: "Assembly of Copeland Scroll compressor, piping leak checks, and wall panel joints rigging.",
        },
        {
          title: "Testing & Handover",
          date: "Est. Dec 15, 2025",
          status: "upcoming" as const,
          description: "Pull-down test, electric defrost testing, IoT controller calibration, and handover.",
        },
      ],
    };
    const newTracker = [...tracker, newProj];
    setTracker(newTracker);
    setSelectedTrackerProjectId(newProj.id);
    showToast(`Added project "${name}". Remember to click Save to persist.`, "success");
  };

  const handleDeleteTrackerProject = () => {
    if (!selectedTrackerProjectId) return;
    const activeProj = tracker.find((p) => p.id === selectedTrackerProjectId);
    if (!activeProj) return;
    if (!confirm(`Are you sure you want to delete the project "${activeProj.name}"?`)) return;
    const newTracker = tracker.filter((p) => p.id !== selectedTrackerProjectId);
    setTracker(newTracker);
    if (newTracker.length > 0) {
      setSelectedTrackerProjectId(newTracker[0].id);
    } else {
      setSelectedTrackerProjectId("");
    }
    showToast(`Deleted project. Remember to click Save to persist.`, "success");
  };

  // --- JOB HANDLERS (CAREERS) ---
  const openAddJob = () => {
    setJobModal({
      isOpen: true,
      mode: "add",
      data: {
        id: "",
        title: "",
        dept: "Engineering",
        location: "",
        type: "Full-Time",
        experience: "",
        desc: "",
        responsibilities: [""],
        requirements: [""],
      },
    });
  };

  const openEditJob = (job: Job, idx: number) => {
    setJobModal({
      isOpen: true,
      mode: "edit",
      data: {
        ...job,
        responsibilities: job.responsibilities.length ? [...job.responsibilities] : [""],
        requirements: job.requirements.length ? [...job.requirements] : [""],
      },
      index: idx,
    });
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobModal || !pages) return;

    const cleanId = jobModal.data.title.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const formattedData = { 
      ...jobModal.data, 
      id: jobModal.mode === "add" ? cleanId : jobModal.data.id,
      responsibilities: jobModal.data.responsibilities.filter(r => r.trim() !== ""),
      requirements: jobModal.data.requirements.filter(r => r.trim() !== ""),
    };

    const updatedJobs = [...pages.careers.jobs];
    if (jobModal.mode === "add") {
      updatedJobs.push(formattedData);
    } else if (jobModal.mode === "edit" && jobModal.index !== undefined) {
      updatedJobs[jobModal.index] = formattedData;
    }

    const updatedPages = {
      ...pages,
      careers: {
        ...pages.careers,
        jobs: updatedJobs,
      },
    };

    const success = await saveToDatabase("save_pages", updatedPages);
    if (success) {
      setPages(updatedPages);
      setJobModal(null);
    }
  };

  const handleDeleteJob = async (idx: number) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    if (!pages) return;
    const updatedJobs = pages.careers.jobs.filter((_, i) => i !== idx);
    const updatedPages = {
      ...pages,
      careers: {
        ...pages.careers,
        jobs: updatedJobs,
      },
    };
    const success = await saveToDatabase("save_pages", updatedPages);
    if (success) {
      setPages(updatedPages);
    }
  };

  // --- MAIN RENDER LOGIC ---

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#071628] cyber-grid-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/10 blur-[110px] pointer-events-none" />
        <div className="relative flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent shadow-neon-blue" />
          <span className="text-[10px] text-blue-400 font-mono tracking-widest uppercase mt-4 animate-pulse">Initializing System...</span>
        </div>
      </div>
    );
  }

  // --- LOGIN GATE RENDER ---
  if (!isAuthenticated) {
    return (
      <div 
        className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 relative overflow-hidden"
        style={{ backgroundImage: "url('/images/hero_background.png')" }}
      >
        <div className="absolute inset-0 bg-[#0C2340]/90 cyber-grid-dark" />
        
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl glass hover:border-white/15 transition-all duration-300"
        >
          <div className="text-center space-y-2 mb-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl shadow-blue-500/20 relative group hover:scale-105 transition-transform duration-300">
              <Image src="/images/logo.png" alt="ThermoVault System Logo" fill className="object-contain p-2" priority />
            </div>
            <h1 className="text-2xl font-extrabold text-white font-display tracking-tight mt-4">
              ThermoVault <span className="text-blue-400">Admin</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Access thermal telemetry & site content controls</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Access Passcode</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full rounded-xl bg-[#0c2340]/50 border border-white/10 px-4 py-3.5 text-center text-sm font-semibold text-white tracking-widest focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/85 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600 placeholder:tracking-normal"
                autoFocus
              />
              {loginError && (
                <div className="mt-2 text-xs text-red-400 flex items-center justify-center gap-1.5 bg-red-950/20 border border-red-500/10 py-2 rounded-lg">
                  <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue py-3.5 text-xs font-bold text-white transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>Unlock Console</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#071628] cyber-grid-dark text-slate-200 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-xl px-5 py-3 shadow-lg flex items-center gap-2 text-xs font-bold ${
              toast.type === "success" ? "bg-emerald-600 text-white shadow-neon-emerald" : "bg-red-650 text-white"
            }`}
          >
            {toast.type === "success" ? <CheckCircle className="h-4.5 w-4.5" /> : <AlertCircle className="h-4.5 w-4.5" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Admin Menu */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 glass bg-[#081a2f]/60 backdrop-blur-xl p-6 shrink-0 flex flex-col justify-between z-10 relative">
        <div className="space-y-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-md relative">
              <Image src="/images/logo.png" alt="ThermoVault System Logo" fill className="object-contain p-1.5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white leading-none">ThermoVault</div>
              <div className="text-[10px] text-blue-400 font-mono tracking-wider uppercase mt-1">Admin Panel</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "blogs", label: "Manage Blogs", icon: FileText },
              { id: "services", label: "Manage Services", icon: Layers },
              { id: "projects", label: "Manage Projects", icon: ImageIcon },
              { id: "pages", label: "Page Editor", icon: FileSpreadsheet },
              { id: "tracker", label: "Project Tracker", icon: Milestone },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all relative group cursor-pointer ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600/20 to-blue-600/5 text-white border-l-2 border-blue-500 shadow-md" 
                      : "text-slate-450 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-blue-450" : "group-hover:text-white"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="pt-6 border-t border-white/10 mt-6">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 hover:border-blue-500/30 hover:bg-blue-650/10 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 mb-3"
          >
            <span>View Public Site</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-red-405 hover:bg-red-600 hover:text-white text-xs font-bold transition-all duration-300 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen z-10 relative">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Welcome Back, Admin</h2>
              <p className="text-xs text-slate-450 mt-1">Here is a quick summary of your website contents.</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Active Blogs", val: blogs.length, desc: "Articles published on site", icon: FileText, tab: "blogs" },
                { title: "Sizing Services", val: services.length, desc: "Core services and modules", icon: Layers, tab: "services" },
                { title: "3D Concepts", val: projects.length, desc: "Items in project gallery", icon: ImageIcon, tab: "projects" },
                { title: "Careers Openings", val: pages?.careers.jobs.length || 0, desc: "Active jobs listed", icon: Briefcase, tab: "pages", subTab: "careers" },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={idx}
                    className="rounded-2xl p-5 flex flex-col justify-between h-38 relative overflow-hidden group glass shadow-neon-glow hover-lift hover:border-blue-500/30 cursor-pointer"
                    onClick={() => {
                      setActiveTab(stat.tab as any);
                      if (stat.subTab) setPageSubTab(stat.subTab as any);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-450">{stat.title}</span>
                        <div className="text-3xl font-extrabold text-white font-mono tracking-tight mt-1">{stat.val}</div>
                      </div>
                      <div className="h-10 w-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-450 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-white/5 pt-2">
                      <span>{stat.desc}</span>
                      <span className="text-blue-450 group-hover:text-blue-400 font-bold transition-colors">
                        Manage →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Tips */}
            <div className="rounded-2xl glass border-l-4 border-l-blue-500 p-6 space-y-3 shadow-neon-glow">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-blue-450" />
                <span>Admin Management Guidelines</span>
              </h3>
              <ul className="text-xs text-slate-400 space-y-2.5 list-disc list-inside leading-relaxed pl-1">
                <li>Make sure to use meaningful slug URLs for blogs and services (e.g. <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono text-[11px] text-blue-400">my-new-service</code>). Slugs should only contain letters, numbers, and dashes.</li>
                <li>Each blog post supports two custom sections. Fill out both titles and bodies to make the post look informative and engaging.</li>
                <li>Updating the projects, services, or page details will update the live site immediately without rebuilding the code.</li>
              </ul>
            </div>
          </div>
        )}

        {/* BLOGS TAB */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Manage Blogs & Insights</h2>
                <p className="text-xs text-slate-450 mt-1">Create, edit, or delete articles displayed in the Knowledge Center.</p>
              </div>
              <button
                onClick={openAddBlog}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Blog Post</span>
              </button>
            </div>

            {/* Table list */}
            <div className="rounded-2xl glass border border-white/10 overflow-hidden shadow-neon-glow">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/15 bg-white/5 text-slate-350 font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-4 font-semibold">Title</th>
                      <th className="p-4 font-semibold">Category</th>
                      <th className="p-4 font-semibold">SEO Keyword</th>
                      <th className="p-4 font-semibold">Read Time</th>
                      <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {blogs.map((blog, idx) => (
                      <tr key={blog.slug} className="hover:bg-white/5 transition-colors duration-250">
                        <td className="p-4 font-semibold text-white text-xs">{blog.title}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-650/10 text-blue-400 border border-blue-500/20">
                            {blog.category}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 font-mono select-all text-[11px]">{blog.keyword}</td>
                        <td className="p-4 text-slate-400">{blog.readTime}</td>
                        <td className="p-4 flex items-center justify-center gap-2.5">
                          <button
                            onClick={() => openEditBlog(blog, idx)}
                            className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all cursor-pointer"
                            title="Edit Post"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(idx)}
                            className="p-2 rounded-lg border border-red-500/10 bg-red-950/20 text-red-400 hover:text-white hover:bg-red-650 hover:border-red-500/30 transition-all cursor-pointer"
                            title="Delete Post"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {blogs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">
                          No blog posts found. Click &quot;Add Blog Post&quot; to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Manage Services</h2>
                <p className="text-xs text-slate-450 mt-1">Configure the main modular and refrigeration services listed across the website.</p>
              </div>
              <button
                onClick={openAddService}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Service</span>
              </button>
            </div>

            {/* List and Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((svc, idx) => (
                <div 
                  key={svc.slug} 
                  className="rounded-2xl glass p-5 flex items-start gap-5 hover-lift hover:border-blue-500/30 transition-all shadow-neon-glow"
                >
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-white/10 img-zoom">
                    <img src={svc.image} alt={svc.title} className="object-cover h-full w-full" />
                  </div>
                  <div className="space-y-2 flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold font-mono text-blue-400 bg-blue-650/15 px-2 py-0.5 rounded border border-blue-500/25 uppercase tracking-wider">
                        {svc.icon}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">/{svc.slug}</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-white font-display leading-tight">{svc.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{svc.desc}</p>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5 mt-2">
                      <button
                        onClick={() => openEditService(svc, idx)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/30 text-[10px] font-bold text-slate-350 hover:text-white transition-all cursor-pointer"
                      >
                        <Edit className="h-3 w-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(idx)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/20 border border-red-500/20 hover:bg-red-600 hover:border-red-500 hover:text-white text-[10px] font-bold text-red-400 transition-all cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Manage Projects Gallery</h2>
                <p className="text-xs text-slate-450 mt-1">Configure project blueprints, machinery setups, and proposed concept designs.</p>
              </div>
              <button
                onClick={openAddProject}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Grid list of project items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl glass overflow-hidden flex flex-col justify-between hover-lift hover:border-blue-500/30 transition-all shadow-neon-glow"
                >
                  <div className="relative h-44 w-full bg-slate-955 border-b border-white/10 img-zoom">
                    <img src={proj.image} alt={proj.title} className="object-cover h-full w-full" />
                    <div className="absolute top-3 left-3 bg-[#0c2340]/90 backdrop-blur-md text-[9px] font-extrabold text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20 uppercase tracking-wider">
                      {proj.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#0c2340]/90 backdrop-blur-md text-[9px] font-extrabold text-white px-2.5 py-1 rounded-full border border-white/10 uppercase font-mono tracking-wider">
                      {proj.size}
                    </div>
                  </div>
                  <div className="p-5 space-y-3 text-left">
                    <h3 className="text-xs font-bold text-white font-display line-clamp-1">{proj.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{proj.desc}</p>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-blue-450" />
                      <span>{proj.location}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5 mt-1">
                      <button
                        onClick={() => openEditProject(proj, idx)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/30 text-[10px] font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
                      >
                        <Edit className="h-3 w-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(idx)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-950/20 border border-red-500/20 hover:bg-red-655 hover:border-red-500 hover:text-white text-[10px] font-bold text-red-400 transition-all cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGES COPY TAB */}
        {activeTab === "pages" && pages && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Edit Static Page Content</h2>
              <p className="text-xs text-slate-400 mt-1">Modify copy, hero headers, founder details, or job vacancies in seconds.</p>
            </div>

            {/* Sub-Tabs Selector */}
            <div className="flex border-b border-white/10 gap-1.5">
              {[
                { id: "about", label: "About Us" },
                { id: "subsidy", label: "Subsidy Assistance" },
                { id: "careers", label: "Careers & Jobs" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPageSubTab(tab.id as any)}
                  className={`px-4 py-2.5 border-b-2 text-xs font-bold transition-all -mb-px cursor-pointer ${
                    pageSubTab === tab.id 
                      ? "border-blue-500 text-white font-extrabold" 
                      : "border-transparent text-slate-450 hover:text-white hover:border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SUBTAB: ABOUT US */}
            {pageSubTab === "about" && (
              <form onSubmit={handleSavePageContent} className="space-y-6 glass p-6 rounded-2xl border border-white/10 text-left shadow-neon-glow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono border-b border-white/5 pb-2">Hero Header Section</h3>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Hero Title</label>
                      <input
                        type="text"
                        required
                        value={pages.about.hero_title}
                        onChange={(e) => setPages({
                          ...pages,
                          about: { ...pages.about, hero_title: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Hero Subtitle</label>
                      <input
                        type="text"
                        required
                        value={pages.about.hero_subtitle}
                        onChange={(e) => setPages({
                          ...pages,
                          about: { ...pages.about, hero_subtitle: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Hero Description</label>
                      <textarea
                        required
                        value={pages.about.hero_description}
                        onChange={(e) => setPages({
                          ...pages,
                          about: { ...pages.about, hero_description: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-32 resize-y"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono border-b border-white/5 pb-2">Founder Quote & Message</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Founder Name</label>
                        <input
                          type="text"
                          required
                          value={pages.about.founder_name}
                          onChange={(e) => setPages({
                            ...pages,
                            about: { ...pages.about, founder_name: e.target.value }
                          })}
                          className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Founder Title</label>
                        <input
                          type="text"
                          required
                          value={pages.about.founder_title}
                          onChange={(e) => setPages({
                            ...pages,
                            about: { ...pages.about, founder_title: e.target.value }
                          })}
                          className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Founder Quote (Short italic block)</label>
                      <textarea
                        required
                        value={pages.about.founder_quote}
                        onChange={(e) => setPages({
                          ...pages,
                          about: { ...pages.about, founder_quote: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-16 resize-y"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Message Paragraph 1</label>
                      <textarea
                        required
                        value={pages.about.founder_message_1}
                        onChange={(e) => setPages({
                          ...pages,
                          about: { ...pages.about, founder_message_1: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-20 resize-y"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Message Paragraph 2</label>
                      <textarea
                        required
                        value={pages.about.founder_message_2}
                        onChange={(e) => setPages({
                          ...pages,
                          about: { ...pages.about, founder_message_2: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-550 h-20 resize-y"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save About Us Page Content</span>
                  </button>
                </div>
              </form>
            )}

            {/* SUBTAB: SUBSIDY ASSISTANCE */}
            {pageSubTab === "subsidy" && (
              <form onSubmit={handleSavePageContent} className="space-y-6 glass p-6 rounded-2xl border border-white/10 text-left shadow-neon-glow">
                <div className="space-y-4 max-w-2xl">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono border-b border-white/5 pb-2">Hero Header & Info</h3>
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Hero Title</label>
                    <input
                      type="text"
                      required
                      value={pages.subsidy.hero_title}
                      onChange={(e) => setPages({
                        ...pages,
                        subsidy: { ...pages.subsidy, hero_title: e.target.value }
                      })}
                      className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Hero Description</label>
                    <textarea
                      required
                      value={pages.subsidy.hero_description}
                      onChange={(e) => setPages({
                        ...pages,
                        subsidy: { ...pages.subsidy, hero_description: e.target.value }
                      })}
                      className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-20 resize-y"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono border-b border-white/5 pb-2">Scheme 1: NHB/MIDH</h3>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Title</label>
                      <input
                        type="text"
                        required
                        value={pages.subsidy.scheme1_title}
                        onChange={(e) => setPages({
                          ...pages,
                          subsidy: { ...pages.subsidy, scheme1_title: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Description</label>
                      <textarea
                        required
                        value={pages.subsidy.scheme1_description}
                        onChange={(e) => setPages({
                          ...pages,
                          subsidy: { ...pages.subsidy, scheme1_description: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-28 resize-y"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono border-b border-white/5 pb-2">Scheme 2: NABARD</h3>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Title</label>
                      <input
                        type="text"
                        required
                        value={pages.subsidy.scheme2_title}
                        onChange={(e) => setPages({
                          ...pages,
                          subsidy: { ...pages.subsidy, scheme2_title: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Description</label>
                      <textarea
                        required
                        value={pages.subsidy.scheme2_description}
                        onChange={(e) => setPages({
                          ...pages,
                          subsidy: { ...pages.subsidy, scheme2_description: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-550 h-28 resize-y"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Subsidy Page Content</span>
                  </button>
                </div>
              </form>
            )}

            {/* SUBTAB: CAREERS & JOBS */}
            {pageSubTab === "careers" && (
              <div className="space-y-6">
                <form onSubmit={handleSavePageContent} className="space-y-6 glass p-6 rounded-2xl border border-white/10 text-left shadow-neon-glow">
                  <div className="space-y-4 max-w-2xl">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono border-b border-white/5 pb-2">Hero Header & Details</h3>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Hero Title</label>
                      <input
                        type="text"
                        required
                        value={pages.careers.hero_title}
                        onChange={(e) => setPages({
                          ...pages,
                          careers: { ...pages.careers, hero_title: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Hero Description</label>
                      <textarea
                        required
                        value={pages.careers.hero_description}
                        onChange={(e) => setPages({
                          ...pages,
                          careers: { ...pages.careers, hero_description: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-550 h-20 resize-y"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Careers Banner Content</span>
                    </button>
                  </div>
                </form>

                {/* Job Listings sub-manager */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-bold text-white font-display">Active Job Openings</h3>
                    <button
                      onClick={openAddJob}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add New Job Position</span>
                    </button>
                  </div>

                  {/* Listings table */}
                  <div className="rounded-2xl glass border border-white/10 overflow-hidden shadow-neon-glow">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-white/15 bg-white/5 text-slate-350 font-mono text-[10px] uppercase tracking-wider">
                          <th className="p-4 font-semibold">Position Title</th>
                          <th className="p-4 font-semibold">Department</th>
                          <th className="p-4 font-semibold">Experience</th>
                          <th className="p-4 font-semibold">Location</th>
                          <th className="p-4 text-center font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {pages.careers.jobs.map((job, idx) => (
                          <tr key={job.id} className="hover:bg-white/5 transition-colors duration-250">
                            <td className="p-4 font-semibold text-white">{job.title}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-650/10 text-blue-400 border border-blue-500/20">
                                {job.dept}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400 font-mono">{job.experience}</td>
                            <td className="p-4 text-slate-400 truncate max-w-[200px]">{job.location}</td>
                            <td className="p-4 flex items-center justify-center gap-2.5">
                              <button
                                onClick={() => openEditJob(job, idx)}
                                className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all cursor-pointer"
                                title="Edit Job"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteJob(idx)}
                                className="p-2 rounded-lg border border-red-500/10 bg-red-950/20 text-red-400 hover:text-white hover:bg-red-650 hover:border-red-500/30 transition-all cursor-pointer"
                                title="Delete Job"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TRACKER TAB */}
        {activeTab === "tracker" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Manage Project Tracker Status</h2>
                <p className="text-xs text-slate-455 mt-1">
                  Edit current development milestones, dates, statuses, and details for multiple projects.
                </p>
              </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleAddTrackerProject}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-500 hover:shadow-neon-blue active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Project</span>
                    </button>

                    {tracker.length > 1 && (
                      <button
                        type="button"
                        onClick={handleDeleteTrackerProject}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white active:scale-95 transition-all shadow-md cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete Project</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-white/10 space-y-6 shadow-neon-glow">
                  {/* Project Selector & Name Editor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-white/10">
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Select Project to Edit</label>
                      <select
                        value={selectedTrackerProjectId}
                        onChange={(e) => setSelectedTrackerProjectId(e.target.value)}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all"
                      >
                        {tracker.map((proj) => (
                          <option key={proj.id} value={proj.id} className="bg-[#0c2340] text-white">
                            {proj.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {activeTrackerProject && (
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Rename Project</label>
                        <input
                          type="text"
                          required
                          value={activeTrackerProject.name}
                          onChange={(e) => {
                            const newTracker = tracker.map((p) => {
                              if (p.id === selectedTrackerProjectId) {
                                return { ...p, name: e.target.value };
                              }
                              return p;
                            });
                            setTracker(newTracker);
                          }}
                          className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {activeTrackerProject ? (
                    <form onSubmit={handleSaveTracker} className="space-y-6 text-left">
                      <div className="space-y-6 divide-y divide-white/10">
                        {activeTrackerProject.milestones.map((milestone: any, idx: number) => (
                          <div key={idx} className={`pt-6 ${idx === 0 ? "pt-0" : ""}`}>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-bold font-mono">
                                {idx + 1}
                              </div>
                              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                                Milestone Phase {idx + 1}
                              </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Phase Title</label>
                                <input
                                  type="text"
                                  required
                                  value={milestone.title}
                                  onChange={(e) => {
                                    const newTracker = tracker.map((p) => {
                                      if (p.id === selectedTrackerProjectId) {
                                        const updatedMilestones = [...p.milestones];
                                        updatedMilestones[idx] = { ...updatedMilestones[idx], title: e.target.value };
                                        return { ...p, milestones: updatedMilestones };
                                      }
                                      return p;
                                    });
                                    setTracker(newTracker);
                                  }}
                                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Target Date / Progress Label</label>
                                <input
                                  type="text"
                                  required
                                  value={milestone.date}
                                  onChange={(e) => {
                                    const newTracker = tracker.map((p) => {
                                      if (p.id === selectedTrackerProjectId) {
                                        const updatedMilestones = [...p.milestones];
                                        updatedMilestones[idx] = { ...updatedMilestones[idx], date: e.target.value };
                                        return { ...p, milestones: updatedMilestones };
                                      }
                                      return p;
                                    });
                                    setTracker(newTracker);
                                  }}
                                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Current Status</label>
                                <select
                                  value={milestone.status}
                                  onChange={(e) => {
                                    const newTracker = tracker.map((p) => {
                                      if (p.id === selectedTrackerProjectId) {
                                        const updatedMilestones = [...p.milestones];
                                        updatedMilestones[idx] = {
                                          ...updatedMilestones[idx],
                                          status: e.target.value as any,
                                        };
                                        return { ...p, milestones: updatedMilestones };
                                      }
                                      return p;
                                    });
                                    setTracker(newTracker);
                                  }}
                                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                >
                                  <option value="completed" className="bg-[#0c2340] text-white">Completed (Green Check)</option>
                                  <option value="current" className="bg-[#0c2340] text-white">In Progress / Started (Blue Clock & Ping)</option>
                                  <option value="upcoming" className="bg-[#0c2340] text-white">Upcoming (Grey Circle)</option>
                                </select>
                              </div>
                            </div>

                            <div className="mt-4">
                              <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Milestone Description / Work Details</label>
                              <textarea
                                required
                                value={milestone.description}
                                onChange={(e) => {
                                  const newTracker = tracker.map((p) => {
                                    if (p.id === selectedTrackerProjectId) {
                                      const updatedMilestones = [...p.milestones];
                                      updatedMilestones[idx] = { ...updatedMilestones[idx], description: e.target.value };
                                      return { ...p, milestones: updatedMilestones };
                                    }
                                    return p;
                                  });
                                  setTracker(newTracker);
                                }}
                                className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all h-20 resize-y placeholder:text-slate-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-4 border-t border-white/10">
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save Project Tracker Progress</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-12 text-slate-500 font-mono text-xs">
                      No projects found. Click &quot;Add Project&quot; to create one.
                    </div>
                  )}
                </div>
              </div>
            )}

      {/* --- EDIT BLOG MODAL --- */}
      {blogModal?.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-4xl glass bg-[#081a2f]/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                {blogModal.mode === "add" ? "Add New Blog Post" : "Edit Blog Post"}
              </h3>
              <button onClick={() => setBlogModal(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto p-6 space-y-5 text-left text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Post Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cold Room Thermodynamics Guide"
                    value={blogModal.data.title}
                    onChange={(e) => setBlogModal({
                      ...blogModal,
                      data: { ...blogModal.data, title: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">URL Slug (lowercase & hyphens only)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. cold-room-thermodynamics-guide"
                    value={blogModal.data.slug}
                    onChange={(e) => setBlogModal({
                      ...blogModal,
                      data: { ...blogModal.data, slug: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">SEO Keyword</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. cold room design"
                    value={blogModal.data.keyword}
                    onChange={(e) => setBlogModal({
                      ...blogModal,
                      data: { ...blogModal.data, keyword: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Type Tag</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Technical Guide"
                    value={blogModal.data.type}
                    onChange={(e) => setBlogModal({
                      ...blogModal,
                      data: { ...blogModal.data, type: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Category</label>
                  <select
                    value={blogModal.data.category}
                    onChange={(e) => setBlogModal({
                      ...blogModal,
                      data: { ...blogModal.data, category: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  >
                    <option value="technical" className="bg-[#0c2340] text-white">Technical</option>
                    <option value="how-to" className="bg-[#0c2340] text-white">How-to</option>
                    <option value="government" className="bg-[#0c2340] text-white">Government</option>
                    <option value="beginner" className="bg-[#0c2340] text-white">Beginner</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Read Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 min read"
                    value={blogModal.data.readTime}
                    onChange={(e) => setBlogModal({
                      ...blogModal,
                      data: { ...blogModal.data, readTime: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Summary (Short preview text for index cards)</label>
                <textarea
                  required
                  placeholder="A brief 1-2 sentence summary..."
                  value={blogModal.data.summary}
                  onChange={(e) => setBlogModal({
                    ...blogModal,
                    data: { ...blogModal.data, summary: e.target.value }
                  })}
                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-16 resize-y"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Introduction Paragraph</label>
                <textarea
                  required
                  placeholder="Introduce your article here..."
                  value={blogModal.data.intro}
                  onChange={(e) => setBlogModal({
                    ...blogModal,
                    data: { ...blogModal.data, intro: e.target.value }
                  })}
                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-24 resize-y"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                {/* Banner Image upload */}
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">Blog Banner Image</label>
                  <div className="flex items-center gap-4">
                    {blogModal.data.image && (
                      <div className="relative h-16 w-24 rounded-lg overflow-hidden border border-white/10 bg-slate-955 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={blogModal.data.image} alt="Banner Preview" className="object-cover h-full w-full" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="/images/cold_room_modular.png"
                        value={blogModal.data.image || ""}
                        onChange={(e) => setBlogModal({
                          ...blogModal,
                          data: { ...blogModal.data, image: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-2.5 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 transition-all placeholder:text-slate-500"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setIsUploading(true);
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const res = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData,
                              });
                              const result = await res.json();
                              if (result.success) {
                                setBlogModal({
                                  ...blogModal,
                                  data: { ...blogModal.data, image: result.url }
                                });
                                showToast("Banner image uploaded!", "success");
                              } else {
                                showToast(result.error || "Failed to upload image.", "error");
                              }
                            } catch (err) {
                              showToast("Error uploading file.", "error");
                            } finally {
                              setIsUploading(false);
                            }
                          }}
                          className="hidden"
                          id="blog-banner-image-upload"
                        />
                        <label
                          htmlFor="blog-banner-image-upload"
                          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer select-none ${
                            isUploading 
                              ? "bg-slate-800 text-slate-500 border border-slate-700 pointer-events-none cursor-wait" 
                              : "bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white"
                          }`}
                        >
                          {isUploading ? (
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                          ) : (
                            <Plus className="h-3.5 w-3.5" />
                          )}
                          <span>{isUploading ? "Uploading..." : "Upload Banner"}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Image upload */}
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">Blog Inline Content Image</label>
                  <div className="flex items-center gap-4">
                    {blogModal.data.contentImage && (
                      <div className="relative h-16 w-24 rounded-lg overflow-hidden border border-white/10 bg-slate-955 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={blogModal.data.contentImage} alt="Content Preview" className="object-cover h-full w-full" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="/images/cold_room_unit.png"
                        value={blogModal.data.contentImage || ""}
                        onChange={(e) => setBlogModal({
                          ...blogModal,
                          data: { ...blogModal.data, contentImage: e.target.value }
                        })}
                        className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-2.5 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 transition-all placeholder:text-slate-500"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setIsUploading(true);
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const res = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData,
                              });
                              const result = await res.json();
                              if (result.success) {
                                setBlogModal({
                                  ...blogModal,
                                  data: { ...blogModal.data, contentImage: result.url }
                                });
                                showToast("Content image uploaded!", "success");
                              } else {
                                showToast(result.error || "Failed to upload image.", "error");
                              }
                            } catch (err) {
                              showToast("Error uploading file.", "error");
                            } finally {
                              setIsUploading(false);
                            }
                          }}
                          className="hidden"
                          id="blog-content-image-upload"
                        />
                        <label
                          htmlFor="blog-content-image-upload"
                          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer select-none ${
                            isUploading 
                              ? "bg-slate-800 text-slate-550 border border-slate-700 pointer-events-none cursor-wait" 
                              : "bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white"
                          }`}
                        >
                          {isUploading ? (
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                          ) : (
                            <Plus className="h-3.5 w-3.5" />
                          )}
                          <span>{isUploading ? "Uploading..." : "Upload Content Image"}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">Section 1</h4>
                  <div>
                    <label className="text-[9px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Section 1 Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Main Mechanical Cycles"
                      value={blogModal.data.section1Title}
                      onChange={(e) => setBlogModal({
                        ...blogModal,
                        data: { ...blogModal.data, section1Title: e.target.value }
                      })}
                      className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Section 1 Content Body</label>
                    <textarea
                      required
                      placeholder="Write first section text..."
                      value={blogModal.data.section1Body}
                      onChange={(e) => setBlogModal({
                        ...blogModal,
                        data: { ...blogModal.data, section1Body: e.target.value }
                      })}
                      className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-550 h-44 resize-y"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">Section 2</h4>
                  <div>
                    <label className="text-[9px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Section 2 Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sizing Parameters"
                      value={blogModal.data.section2Title}
                      onChange={(e) => setBlogModal({
                        ...blogModal,
                        data: { ...blogModal.data, section2Title: e.target.value }
                      })}
                      className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Section 2 Content Body</label>
                    <textarea
                      required
                      placeholder="Write second section text..."
                      value={blogModal.data.section2Body}
                      onChange={(e) => setBlogModal({
                        ...blogModal,
                        data: { ...blogModal.data, section2Body: e.target.value }
                      })}
                      className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-555 h-44 resize-y"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setBlogModal(null)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 font-bold text-slate-355 hover:text-white cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Save Post
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* --- EDIT SERVICE MODAL --- */}
      {serviceModal?.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg glass bg-[#081a2f]/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                {serviceModal.mode === "add" ? "Add New Service" : "Edit Service Details"}
              </h3>
              <button onClick={() => setServiceModal(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-4 text-left text-xs">
              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modular Cold Rooms"
                  value={serviceModal.data.title}
                  onChange={(e) => setServiceModal({
                    ...serviceModal,
                    data: { ...serviceModal.data, title: e.target.value }
                  })}
                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">URL Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. modular-cold-rooms"
                    value={serviceModal.data.slug}
                    onChange={(e) => setServiceModal({
                      ...serviceModal,
                      data: { ...serviceModal.data, slug: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Lucide Icon Name</label>
                  <select
                    value={serviceModal.data.icon}
                    onChange={(e) => setServiceModal({
                      ...serviceModal,
                      data: { ...serviceModal.data, icon: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  >
                    {["Snowflake", "Settings", "Sprout", "ShieldCheck", "Calendar", "Wind", "Ruler", "Wrench"].map(icon => (
                      <option key={icon} value={icon} className="bg-[#0c2340] text-white">{icon}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">Service Image</label>
                <div className="flex items-center gap-4">
                  {serviceModal.data.image && (
                    <div className="relative h-16 w-24 rounded-lg overflow-hidden border border-white/10 bg-slate-950 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={serviceModal.data.image} alt="Preview" className="object-cover h-full w-full" />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="/images/cold_room_modular.png"
                      value={serviceModal.data.image}
                      onChange={(e) => setServiceModal({
                        ...serviceModal,
                        data: { ...serviceModal.data, image: e.target.value }
                      })}
                      className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-2.5 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 transition-all placeholder:text-slate-500"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsUploading(true);
                          const formData = new FormData();
                          formData.append("file", file);
                          try {
                            const res = await fetch("/api/admin/upload", {
                              method: "POST",
                              body: formData,
                            });
                            const result = await res.json();
                            if (result.success) {
                              setServiceModal({
                                ...serviceModal,
                                data: { ...serviceModal.data, image: result.url }
                              });
                              showToast("Image uploaded successfully!", "success");
                            } else {
                              showToast(result.error || "Failed to upload image.", "error");
                            }
                          } catch (err) {
                            showToast("Error uploading file.", "error");
                          } finally {
                            setIsUploading(false);
                          }
                        }}
                        className="hidden"
                        id="service-image-upload"
                      />
                      <label
                        htmlFor="service-image-upload"
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer select-none ${
                          isUploading 
                            ? "bg-slate-800 text-slate-550 border border-slate-700 pointer-events-none cursor-wait" 
                            : "bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white"
                        }`}
                      >
                        {isUploading ? (
                          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-550 border-t-transparent" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                        <span>{isUploading ? "Uploading..." : "Upload Custom Image"}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Service Description Summary</label>
                <textarea
                  required
                  placeholder="Provide a description of this service..."
                  value={serviceModal.data.desc}
                  onChange={(e) => setServiceModal({
                    ...serviceModal,
                    data: { ...serviceModal.data, desc: e.target.value }
                  })}
                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-24 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setServiceModal(null)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 font-bold text-slate-355 hover:text-white cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Save Service
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* --- EDIT PROJECT MODAL --- */}
      {projectModal?.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-955/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg glass bg-[#081a2f]/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                {projectModal.mode === "add" ? "Add New Project Design" : "Edit Project Design"}
              </h3>
              <button onClick={() => setProjectModal(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-4 text-left text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Large-Scale Dairy Cold Storage"
                    value={projectModal.data.title}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, title: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Location Details</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Maharashtra"
                    value={projectModal.data.location}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, location: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Category</label>
                  <select
                    value={projectModal.data.category}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, category: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  >
                    <option value="interiors" className="bg-[#0c2340] text-white">Interior Concepts</option>
                    <option value="machinery" className="bg-[#0c2340] text-white">Machinery Systems</option>
                    <option value="execution" className="bg-[#0c2340] text-white">Proposed Deployments</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Sizing (Capacity)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500 MT Capacity"
                    value={projectModal.data.size}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, size: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">Concept Image</label>
                <div className="flex items-center gap-4">
                  {projectModal.data.image && (
                    <div className="relative h-16 w-24 rounded-lg overflow-hidden border border-white/10 bg-slate-950 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={projectModal.data.image} alt="Preview" className="object-cover h-full w-full" />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="/images/dairy_warehouse_storage.png"
                      value={projectModal.data.image}
                      onChange={(e) => setProjectModal({
                        ...projectModal,
                        data: { ...projectModal.data, image: e.target.value }
                      })}
                      className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-2.5 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 transition-all placeholder:text-slate-500"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsUploading(true);
                          const formData = new FormData();
                          formData.append("file", file);
                          try {
                            const res = await fetch("/api/admin/upload", {
                              method: "POST",
                              body: formData,
                            });
                            const result = await res.json();
                            if (result.success) {
                              setProjectModal({
                                ...projectModal,
                                data: { ...projectModal.data, image: result.url }
                              });
                              showToast("Image uploaded successfully!", "success");
                            } else {
                              showToast(result.error || "Failed to upload image.", "error");
                            }
                          } catch (err) {
                            showToast("Error uploading file.", "error");
                          } finally {
                            setIsUploading(false);
                          }
                        }}
                        className="hidden"
                        id="project-image-upload"
                      />
                      <label
                        htmlFor="project-image-upload"
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer select-none ${
                          isUploading 
                            ? "bg-slate-800 text-slate-550 border border-slate-700 pointer-events-none cursor-wait" 
                            : "bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white"
                        }`}
                      >
                        {isUploading ? (
                          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-550 border-t-transparent" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                        <span>{isUploading ? "Uploading..." : "Upload Custom Image"}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Description</label>
                <textarea
                  required
                  placeholder="Explain structural design details, panel types, compressor configuration..."
                  value={projectModal.data.desc}
                  onChange={(e) => setProjectModal({
                    ...projectModal,
                    data: { ...projectModal.data, desc: e.target.value }
                  })}
                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-24 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setProjectModal(null)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 font-bold text-slate-355 hover:text-white cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Save Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* --- EDIT JOB MODAL --- */}
      {jobModal?.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-955/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl glass bg-[#081a2f]/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                {jobModal.mode === "add" ? "Create New Job Opening" : "Edit Job Opening"}
              </h3>
              <button onClick={() => setJobModal(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSaveJob} className="p-6 space-y-4 text-left text-xs overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thermal Sizing Engineer (HVAC/R)"
                    value={jobModal.data.title}
                    onChange={(e) => setJobModal({
                      ...jobModal,
                      data: { ...jobModal.data, title: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Department</label>
                  <select
                    value={jobModal.data.dept}
                    onChange={(e) => setJobModal({
                      ...jobModal,
                      data: { ...jobModal.data, dept: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  >
                    <option value="Engineering" className="bg-[#0c2340] text-white">Engineering</option>
                    <option value="Sales" className="bg-[#0c2340] text-white">Sales</option>
                    <option value="Operations" className="bg-[#0c2340] text-white">Operations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Experience Required</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2 - 4 Years"
                    value={jobModal.data.experience}
                    onChange={(e) => setJobModal({
                      ...jobModal,
                      data: { ...jobModal.data, experience: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Job Type</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full-Time / Internship"
                    value={jobModal.data.type}
                    onChange={(e) => setJobModal({
                      ...jobModal,
                      data: { ...jobModal.data, type: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajgurunagar, Pune"
                    value={jobModal.data.location}
                    onChange={(e) => setJobModal({
                      ...jobModal,
                      data: { ...jobModal.data, location: e.target.value }
                    })}
                    className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1.5 uppercase tracking-wider">Role Description Summary</label>
                <textarea
                  required
                  placeholder="Outline the core purpose of this role..."
                  value={jobModal.data.desc}
                  onChange={(e) => setJobModal({
                    ...jobModal,
                    data: { ...jobModal.data, desc: e.target.value }
                  })}
                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 h-20 resize-y"
                />
              </div>

              {/* Responsibilities list input */}
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">Key Responsibilities (One per line)</label>
                <textarea
                  placeholder="Calculate heat loads&#10;Coordinate with AutoCAD team..."
                  value={jobModal.data.responsibilities.join("\n")}
                  onChange={(e) => setJobModal({
                    ...jobModal,
                    data: { ...jobModal.data, responsibilities: e.target.value.split("\n") }
                  })}
                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all h-28 resize-y placeholder:text-slate-500"
                />
              </div>

              {/* Requirements list input */}
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">Qualifications & Requirements (One per line)</label>
                <textarea
                  placeholder="B.E. in Mechanical Engineering&#10;Familiarity with R404A/Copeland compressors..."
                  value={jobModal.data.requirements.join("\n")}
                  onChange={(e) => setJobModal({
                    ...jobModal,
                    data: { ...jobModal.data, requirements: e.target.value.split("\n") }
                  })}
                  className="w-full rounded-xl bg-[#0c2340]/45 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-blue-500/60 focus:bg-[#0c2340]/70 focus:ring-4 focus:ring-blue-500/10 transition-all h-28 resize-y placeholder:text-slate-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setJobModal(null)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 font-bold text-slate-355 hover:text-white cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-neon-blue text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Save Job Opening
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      </main>
    </div>
  );
}
