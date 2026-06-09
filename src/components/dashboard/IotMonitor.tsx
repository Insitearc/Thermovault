"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Thermometer,
  Droplets,
  Zap,
  DoorOpen,
  RotateCcw,
  AlertTriangle,
  Sliders,
  Activity,
  Terminal,
  Cpu,
  RefreshCw,
  Trash2,
  Lock,
  Unlock,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import ColdRoom3D from "./ColdRoom3D";

// Define shape of event log item
interface LogItem {
  time: string;
  type: "info" | "warning" | "success";
  message: string;
}

// Define shape of chart data point
interface ChartData {
  time: string;
  temp: number;
  target: number;
  humidity: number;
}

export default function IotMonitor() {
  // --- Simulated State Variables ---
  const [temperature, setTemperature] = useState(-17.8);
  const [humidity, setHumidity] = useState(62);
  const [doorOpen, setDoorOpen] = useState(false);
  const [targetTemp, setTargetTemp] = useState(-18.0);
  const [compressorMode, setCompressorMode] = useState<"auto" | "off">("auto");
  const [compressorActive, setCompressorActive] = useState(true);
  const [defrostActive, setDefrostActive] = useState(false);
  const [powerLoad, setPowerLoad] = useState(4.2);
  const [filterType, setFilterType] = useState<"all" | "warning" | "success" | "info">("all");

  // Lists
  const [eventLogs, setEventLogs] = useState<LogItem[]>([
    { time: "10:35:12", type: "success", message: "System initialized. Deep Freeze mode enabled." },
    { time: "10:35:15", type: "info", message: "Compressor auto-started. Core drawing: 4.2kW." },
    { time: "10:36:40", type: "info", message: "Temperature reached set-point boundary (-17.5°C)." },
  ]);

  const initialChartData = useMemo(() => {
    const data: ChartData[] = [];
    const now = new Date();
    for (let i = 9; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 5000);
      const timeStr = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      data.push({
        time: timeStr,
        temp: parseFloat((-15.0 - (9 - i) * 0.3 + (i * 0.01)).toFixed(1)),
        target: -18.0,
        humidity: Math.floor(60 + (i % 3)),
      });
    }
    return data;
  }, []);

  const [chartData, setChartData] = useState<ChartData[]>(initialChartData);

  // Ticker ref to avoid state stale closure in interval
  const logsRef = useRef<LogItem[]>([]);
  useEffect(() => {
    logsRef.current = eventLogs;
  }, [eventLogs]);

  const addLog = (message: string, type: "info" | "warning" | "success" = "info") => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setEventLogs((prev) => [{ time: timeStr, type, message }, ...prev.slice(0, 25)]);
  };

  // --- Defrost Timer Simulation ---
  useEffect(() => {
    if (!defrostActive) return;

    const startTimer = setTimeout(() => {
      addLog("Defrost cycle active: Evaporator heater enabled.", "warning");
      setCompressorActive(false);
    }, 0);

    const endTimer = setTimeout(() => {
      setDefrostActive(false);
      addLog("Defrost cycle complete. Resuming standard compressor operations.", "success");
      setCompressorActive(true);
    }, 12000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [defrostActive]);

  // --- Real-time Thermodynamics Simulation Engine ---
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Calculate Compressor Action (Auto Mode logic)
      let isCompRunning = compressorActive;
      if (compressorMode === "auto" && !defrostActive) {
        if (temperature > targetTemp + 1.0) {
          isCompRunning = true;
        } else if (temperature < targetTemp - 0.5) {
          isCompRunning = false;
        }
      } else if (compressorMode === "off") {
        isCompRunning = false;
      }
      setCompressorActive(isCompRunning);

      // 2. Adjust temperature & humidity based on ambient heat and system cooling
      let nextTemp = temperature;
      let nextHumidity = humidity;

      const ambientTemp = 30.0;
      const ambientHumidity = 75.0;

      if (doorOpen) {
        nextTemp += (ambientTemp - nextTemp) * 0.08;
        nextHumidity += (ambientHumidity - nextHumidity) * 0.08;
      } else if (defrostActive) {
        nextTemp += (3.0 - nextTemp) * 0.15;
        nextHumidity += (80.0 - nextHumidity) * 0.1;
      } else if (isCompRunning) {
        nextTemp += (targetTemp - nextTemp) * 0.04;
        nextHumidity += (50.0 - nextHumidity) * 0.02;
      } else {
        nextTemp += (ambientTemp - nextTemp) * 0.005;
        nextHumidity += (ambientHumidity - nextHumidity) * 0.005;
      }

      nextTemp += (Math.random() - 0.5) * 0.05;
      nextHumidity += (Math.random() - 0.5) * 0.2;

      const finalTemp = parseFloat(nextTemp.toFixed(1));
      const finalHumidity = Math.max(10, Math.min(100, Math.floor(nextHumidity)));

      setTemperature(finalTemp);
      setHumidity(finalHumidity);

      // 3. Power Load calculation
      if (defrostActive) {
        setPowerLoad(1.8);
      } else if (isCompRunning) {
        const diff = Math.abs(ambientTemp - finalTemp);
        setPowerLoad(parseFloat((3.0 + diff * 0.05 + Math.random() * 0.1).toFixed(1)));
      } else {
        setPowerLoad(0.1);
      }

      // 4. Trigger Warning Alerts for extreme deviations
      if (finalTemp > -10.0 && !defrostActive) {
        const recentLogs = logsRef.current;
        const lastAlert = recentLogs.find((l) => l.message.includes("HIGH TEMPERATURE ALERT"));
        if (!lastAlert || new Date().getTime() - new Date().getTime() > 10000) {
          addLog(`HIGH TEMPERATURE ALERT: Cold room chamber exceeded safe threshold (${finalTemp}°C)!`, "warning");
        }
      }

      // 5. Append data to Chart
      const timeStr = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setChartData((prev) => [
        ...prev.slice(1),
        {
          time: timeStr,
          temp: finalTemp,
          target: targetTemp,
          humidity: finalHumidity,
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [temperature, humidity, doorOpen, targetTemp, compressorMode, compressorActive, defrostActive]);

  // Handle controls from UI
  const handleToggleDoor = () => {
    const nextState = !doorOpen;
    setDoorOpen(nextState);
    addLog(`Door contact sensor toggled: ${nextState ? "OPEN" : "SEALED"}`, nextState ? "warning" : "info");
  };

  const handleToggleDefrost = () => {
    if (defrostActive) return;
    setDefrostActive(true);
  };

  const handleCompressorModeChange = (mode: "auto" | "off") => {
    setCompressorMode(mode);
    addLog(`Compressor operation mode overridden to: ${mode.toUpperCase()}`, "info");
    if (mode === "off") {
      setCompressorActive(false);
    }
  };

  const clearLogs = () => {
    setEventLogs([]);
    addLog("Console log history cleared.", "info");
  };

  // Filter logs for display
  const filteredLogs = eventLogs.filter((log) => {
    if (filterType === "all") return true;
    return log.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Alarm Warning banner */}
      <AnimatePresence>
        {temperature > -12.0 && !defrostActive && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 shadow-lg shadow-red-950/20"
          >
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-400 animate-bounce" />
            <div className="text-xs">
              <span className="font-bold uppercase tracking-wider font-mono mr-1.5">[THERMAL CRITICAL]</span>
              Chamber temperature has exceeded safe parameters:{" "}
              <span className="font-bold font-mono text-red-400">{temperature}°C</span> (Safety threshold: -12.0°C). Check door seal integrity immediately.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Temp Card */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02, boxShadow: "0 8px 30px rgba(56, 189, 248, 0.15)" }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C2340]/40 p-5 shadow-lg backdrop-blur-md transition-shadow"
        >
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-sky-400" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-sky-400" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-sky-400" />
          
          <div className="flex items-center justify-between mb-3 text-silver">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Chamber Temp</span>
            <Thermometer className={`h-5 w-5 ${temperature > -12 ? "text-amber-500" : "text-sky-400"} animate-pulse`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              {temperature.toFixed(1)}
            </span>
            <span className="text-xs text-sky-400 font-mono">°C</span>
          </div>
          <div className="text-[9px] text-slate-400 mt-3.5 flex items-center justify-between border-t border-white/5 pt-2 font-mono uppercase">
            <span>Target:</span>
            <span className="text-white font-bold">{targetTemp.toFixed(1)}°C</span>
          </div>
        </motion.div>

        {/* Humidity Card */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02, boxShadow: "0 8px 30px rgba(129, 140, 248, 0.15)" }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C2340]/40 p-5 shadow-lg backdrop-blur-md transition-shadow"
        >
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-indigo-400" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-indigo-400" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-indigo-400" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-indigo-400" />

          <div className="flex items-center justify-between mb-3 text-silver">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Chamber RH</span>
            <Droplets className="h-5 w-5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono drop-shadow-[0_0_15px_rgba(129,140,248,0.4)]">
              {humidity}
            </span>
            <span className="text-xs text-indigo-400 font-mono">%</span>
          </div>
          <div className="text-[9px] text-slate-400 mt-3.5 flex items-center justify-between border-t border-white/5 pt-2 font-mono uppercase">
            <span>Range:</span>
            <span className="text-white font-bold">55% - 70%</span>
          </div>
        </motion.div>

        {/* Power Drawing Card */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02, boxShadow: "0 8px 30px rgba(29, 158, 117, 0.15)" }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C2340]/40 p-5 shadow-lg backdrop-blur-md transition-shadow"
        >
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-teal-light" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-teal-light" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-teal-light" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-teal-light" />

          <div className="flex items-center justify-between mb-3 text-silver">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">System Load</span>
            <Zap className={`h-5 w-5 ${compressorActive ? "text-teal-light" : "text-slate-500"} ${compressorActive ? "animate-pulse" : ""}`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono drop-shadow-[0_0_15px_rgba(29,158,117,0.4)]">
              {powerLoad.toFixed(1)}
            </span>
            <span className="text-xs text-teal-light font-mono">kW</span>
          </div>
          <div className="text-[9px] mt-3.5 flex items-center justify-between border-t border-white/5 pt-2 font-mono uppercase text-slate-400">
            <span>State:</span>
            <span className={`font-bold flex items-center gap-1 ${compressorActive ? "text-teal-light" : "text-red-400"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${compressorActive ? "bg-teal-light animate-ping" : "bg-red-400"}`} />
              {compressorActive ? "ACTIVE" : "STANDBY"}
            </span>
          </div>
        </motion.div>

        {/* Door Sensor Card */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02, boxShadow: doorOpen ? "0 8px 30px rgba(245, 158, 11, 0.15)" : "0 8px 30px rgba(29, 158, 117, 0.15)" }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C2340]/40 p-5 shadow-lg backdrop-blur-md transition-shadow"
        >
          <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 ${doorOpen ? "border-amber-400" : "border-teal-light"}`} />
          <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 ${doorOpen ? "border-amber-400" : "border-teal-light"}`} />
          <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 ${doorOpen ? "border-amber-400" : "border-teal-light"}`} />
          <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 ${doorOpen ? "border-amber-400" : "border-teal-light"}`} />

          <div className="flex items-center justify-between mb-3 text-silver">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Door Contact</span>
            <DoorOpen className={`h-5 w-5 ${doorOpen ? "text-amber-400" : "text-teal-light"}`} />
          </div>
          <div className="flex items-baseline">
            <span className={`text-lg font-bold tracking-tight font-display uppercase ${doorOpen ? "text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]" : "text-teal-light drop-shadow-[0_0_15px_rgba(29,158,117,0.4)]"}`}>
              {doorOpen ? "OPEN" : "SEALED"}
            </span>
          </div>
          <div className="text-[9px] text-slate-400 mt-3.5 flex items-center justify-between border-t border-white/5 pt-2 font-mono uppercase">
            <span>Seal Status:</span>
            <span className={`font-bold flex items-center gap-1 ${doorOpen ? "text-amber-400" : "text-teal-light"}`}>
              {doorOpen ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              {doorOpen ? "UNSECURED" : "SECURED"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Workspace: 3D Scene + Controls Side-by-Side */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* 3D Scene Container */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-[#0C2340]/40 shadow-xl overflow-hidden relative">
            {/* Cyber grid overlays */}
            <div className="absolute inset-0 cyber-grid-dark opacity-10 pointer-events-none" />

            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/30">
              <div className="flex items-center gap-2">
                <Cpu className="h-4.5 w-4.5 text-teal-light animate-pulse" />
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Chamber // 3D Interactive Telemetry Screen
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-accent/20 px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-teal-light border border-teal-light/20">
                <Activity className="h-3 w-3 animate-spin-slow" />
                Real-Time Render
              </span>
            </div>
            <ColdRoom3D
              doorOpen={doorOpen}
              compressorActive={compressorActive}
              temperature={temperature}
            />
          </div>
        </div>

        {/* System Interactive Control Box */}
        <div className="rounded-2xl border border-white/10 bg-[#0C2340]/60 p-6 flex flex-col justify-between shadow-xl relative backdrop-blur-md overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 bg-slate-950/0">
              <Sliders className="h-4.5 w-4.5 text-teal-light" />
              <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Telemetry Control Panel
              </h3>
            </div>

            {/* Target Temperature Slider */}
            <div className="space-y-3 mb-6 bg-slate-950/20 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-xs text-silver">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400">Set-Point Threshold</span>
                <span className="font-bold text-teal-light font-mono text-xs">{targetTemp.toFixed(1)}°C</span>
              </div>
              <input
                type="range"
                min="-25.0"
                max="15.0"
                step="0.5"
                value={targetTemp}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setTargetTemp(val);
                  addLog(`Thermostat set-point threshold adjusted to: ${val.toFixed(1)}°C`, "info");
                }}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-teal-light border border-white/5"
              />
              <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                <span>-25.0°C [DEEP FREEZE]</span>
                <span>15.0°C [AGRI CHILL]</span>
              </div>
            </div>

            {/* Interactive State Triggers */}
            <div className="space-y-3">
              {/* Door Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleToggleDoor}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-xs font-bold font-mono border transition-all ${
                  doorOpen
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-md shadow-amber-950/10"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DoorOpen className="h-4.5 w-4.5" />
                  <span>{doorOpen ? "CLOSE CHAMBER DOOR" : "SIMULATE DOOR OPEN"}</span>
                </div>
                <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded ${doorOpen ? "bg-amber-500/20" : "bg-white/10 text-slate-300"}`}>
                  {doorOpen ? "OPEN" : "SEALED"}
                </span>
              </motion.button>

              {/* Defrost Trigger Button */}
              <motion.button
                whileHover={defrostActive ? {} : { scale: 1.01 }}
                whileTap={defrostActive ? {} : { scale: 0.99 }}
                onClick={handleToggleDefrost}
                disabled={defrostActive}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-xs font-bold font-mono border transition-all ${
                  defrostActive
                    ? "bg-teal-accent/20 border-teal-accent/40 text-teal-light cursor-not-allowed shadow-md shadow-teal-950/10"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className={`h-4.5 w-4.5 ${defrostActive ? "animate-spin" : ""}`} />
                  <span>{defrostActive ? "DEFROST RUNNING..." : "TRIGGER DEFROST"}</span>
                </div>
                <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded ${defrostActive ? "bg-teal-light/20 text-teal-light" : "bg-white/10 text-slate-300"}`}>
                  {defrostActive ? "ACTIVE" : "READY"}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Compressor Mode Override */}
          <div className="border-t border-white/10 pt-5 mt-6">
            <span className="text-[9px] text-slate-400 font-mono block mb-2.5 uppercase tracking-wider font-bold">
              Compressor Overrides
            </span>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCompressorModeChange("auto")}
                className={`rounded-lg py-2.5 text-center text-xs font-bold font-mono transition-all border ${
                  compressorMode === "auto"
                    ? "bg-teal-accent text-white border-teal-light shadow-md shadow-teal-950/20"
                    : "bg-slate-950/40 text-slate-400 border-white/5 hover:text-white"
                }`}
              >
                AUTO THERMO
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCompressorModeChange("off")}
                className={`rounded-lg py-2.5 text-center text-xs font-bold font-mono transition-all border ${
                  compressorMode === "off"
                    ? "bg-red-950/40 text-red-400 border-red-900/30 shadow-md shadow-red-950/20"
                    : "bg-slate-950/40 text-slate-400 border-white/5 hover:text-white"
                }`}
              >
                FORCE SHUTDOWN
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Telemetry Chart & Event Logs Ticker */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recharts Area Graph */}
        <div className="rounded-2xl border border-white/10 bg-[#0C2340]/60 p-5 shadow-xl lg:col-span-2 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-xs font-bold text-white mb-4 font-mono uppercase tracking-wider flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            Sensor Chronology & Trend Matrix
          </h3>

          <div className="h-64 w-full pr-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="tempGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="humidityGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="time" stroke="#6b7e94" tick={{ fontFamily: "var(--font-mono)", fontSize: 8 }} />
                <YAxis stroke="#6b7e94" tick={{ fontFamily: "var(--font-mono)", fontSize: 8 }} domain={["dataMin - 3", "dataMax + 3"]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(12, 35, 64, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "9px", marginTop: "10px", fontFamily: "var(--font-mono)" }} />
                <Area
                  name="Interior Temperature (°C)"
                  type="monotone"
                  dataKey="temp"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#tempGlow)"
                />
                <Area
                  name="Relative Humidity (%)"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#818cf8"
                  strokeWidth={1.5}
                  fillOpacity={0.4}
                  fill="url(#humidityGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Event Logger terminal */}
        <div className="rounded-2xl border border-white/10 bg-[#0C2340]/60 p-5 shadow-xl flex flex-col h-[328px] backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3 shrink-0">
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Terminal className="h-4.5 w-4.5 text-teal-light" />
              SYSTEM_CONSOLE // STAGE_LOG
            </h3>
            
            <button
              onClick={clearLogs}
              title="Clear Console Logs"
              className="p-1 rounded bg-[#0c2340]/60 border border-white/5 text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Terminal Filters */}
          <div className="flex gap-1.5 mb-3 shrink-0">
            {[
              { id: "all", label: "ALL" },
              { id: "success", label: "SUCCESS" },
              { id: "warning", label: "ALERT" },
              { id: "info", label: "INFO" },
            ].map((filt) => (
              <button
                key={filt.id}
                onClick={() => setFilterType(filt.id as typeof filterType)}
                className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono border transition-all ${
                  filterType === filt.id
                    ? "bg-teal-accent text-white border-teal-light"
                    : "bg-slate-950/30 text-slate-400 border-white/5 hover:text-slate-200"
                }`}
              >
                {filt.label}
              </button>
            ))}
          </div>

          {/* Console Text Container */}
          <div className="overflow-y-auto flex-1 space-y-2 pr-1 font-mono text-[9px] bg-slate-950/40 p-3.5 rounded-xl border border-white/5 relative">
            <div className="absolute inset-0 bg-terminal-scanlines pointer-events-none opacity-2" />
            
            <AnimatePresence initial={false}>
              {filteredLogs.map((log, index) => {
                let colorClass = "text-slate-300";
                let tag = "[INFO]   ";
                if (log.type === "warning") {
                  colorClass = "text-amber-400";
                  tag = "[CRIT]   ";
                }
                if (log.type === "success") {
                  colorClass = "text-teal-light";
                  tag = "[STATUS] ";
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-start gap-1.5 leading-relaxed"
                  >
                    <span className="text-slate-500 select-none">[{log.time}]</span>
                    <span className={colorClass}>
                      <span className="font-bold opacity-80">{tag}</span>
                      {log.message}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredLogs.length === 0 && (
              <div className="text-center py-8 text-slate-600 italic select-none">
                No logs recorded for this category.
              </div>
            )}

            {/* Pulsing Command-line Cursor */}
            <div className="flex items-center gap-1.5 text-teal-light pt-2 select-none">
              <span>THERMOVAULT_SYSTEMS#</span>
              <span className="h-3 w-1.5 bg-teal-light animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
