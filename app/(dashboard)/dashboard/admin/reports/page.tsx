"use client";

import {
  FileBarChart,
  Download,
  Calendar,
  Search,
  ShieldCheck,
  ChevronRight,
  FileText,
  Layers,
  TrendingUp,
  Activity,
  History,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function AdminReportsPage() {
  const reportTypes = [
    {
      title: "Encounter Accuracy",
      desc: "Detailed breakdown of coding accuracy by module.",
      icon: Target,
    },
    {
      title: "Certification Velocity",
      desc: "Timeline of student graduation and performance.",
      icon: Layers,
    },
    {
      title: "Institutional Growth",
      desc: "Financial and enrollment metrics over time.",
      icon: TrendingUp,
    },
    {
      title: "System Integrity",
      desc: "Security logs and administrative operation audits.",
      icon: Activity,
    },
  ];

  return (
    <div className="max-w-[1700px] mx-auto space-y-20 pb-40">
      {/* Master Archive Intelligence Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-4 px-6 py-3 bg-[#6A89A7]/5 rounded-full border border-[#6A89A7]/10"
          >
            <ShieldCheck className="h-4 w-4 text-[#6A89A7]" />
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.4em]">
              Master Archive Access Registry
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-9xl font-black text-[#384959] tracking-tighter leading-none"
          >
            Institutional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A89A7] to-[#384959]">
              Ledgers
            </span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-2xl max-w-3xl leading-relaxed">
            Generate, synthesize, and audit high-fidelity professional reports
            for institutional compliance and global performance tracking.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-wrap items-center gap-6"
        >
          <button className="h-20 px-10 bg-white border-2 border-slate-100 text-[#384959] rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-[#6A89A7]/10 transition-all active:scale-95 group">
            <Calendar className="h-5 w-5 text-[#6A89A7] group-hover:scale-110 transition-transform" />
            Define Epoch
          </button>
          <button className="h-20 px-10 bg-[#384959] text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 active:scale-95 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Download className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
            Extract Ledger
          </button>
        </motion.div>
      </div>

      {/* High-Fidelity Asset Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {reportTypes.map((report, idx) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -15 }}
            className="p-12 bg-white rounded-[4rem] shadow-[0_30px_80px_-15px_rgba(106,137,167,0.1)] border border-slate-50 flex flex-col items-center text-center group transition-all duration-700 hover:shadow-[#6A89A7]/20 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#BDDFEC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-24 w-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-[#6A89A7] mb-10 group-hover:bg-[#384959] group-hover:text-white transition-all duration-700 shadow-inner group-hover:rotate-[360deg]">
              <report.icon className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-[#384959] tracking-tighter mb-4 leading-none">
              {report.title}
            </h3>
            <p className="text-sm text-slate-400 font-bold leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
              {report.desc}
            </p>
            <button className="mt-10 px-8 py-3 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-[#6A89A7] hover:bg-[#6A89A7] hover:text-white transition-all flex items-center gap-3">
              Configure <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Grand Ledger Surface */}
      <div className="bg-white rounded-[6rem] shadow-[0_50px_120px_-30px_rgba(106,137,167,0.15)] border border-slate-50 relative overflow-hidden text-center flex flex-col items-center py-40 px-10">
        <div className="absolute inset-0 bg-slate-50/20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

        <div className="relative mb-16">
          <div className="h-48 w-48 bg-[#f8fafc] rounded-[5rem] flex items-center justify-center text-slate-200 shadow-inner -rotate-6 group hover:rotate-0 transition-transform duration-1000">
            <FileBarChart className="h-24 w-24 group-hover:scale-110 group-hover:text-[#6A89A7] transition-all duration-700" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -bottom-6 -right-6 h-20 w-20 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center text-emerald-500 border-4 border-slate-50"
          >
            <Lock className="h-8 w-8" />
          </motion.div>
        </div>

        <div className="space-y-8 max-w-2xl relative z-10">
          <h2 className="text-5xl lg:text-7xl font-black text-[#384959] tracking-tighter italic leading-[1.1]">
            "Awaiting Synchronization <br />
            with <span className="text-[#6A89A7] not-italic">Core Records</span>
            "
          </h2>
          <p className="text-slate-400 font-bold text-xl leading-relaxed max-w-lg mx-auto">
            The institutional ledger is in standby. Select a high-fidelity
            diagnostic template from the registry above to commence data
            distillation.
          </p>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 relative z-10">
          <div className="flex items-center gap-4 text-slate-300">
            <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <History className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">
              Archive Empty
            </span>
          </div>
          <div className="h-2 w-2 rounded-full bg-slate-100 hidden sm:block" />
          <div className="flex items-center gap-4 text-slate-300">
            <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <Search className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">
              Scanning Hub...
            </span>
          </div>
        </div>
      </div>

      {/* Compliance Metadata Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10 border-t border-slate-100">
        {[
          { label: "Protocol", val: "ENC-64 Bit Ledger Hub" },
          { label: "Status", val: "Compliance Verified" },
          { label: "Integrity", val: "100% Deterministic" },
        ].map((meta) => (
          <div key={meta.label} className="text-center md:text-left space-y-1">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
              {meta.label}
            </p>
            <p className="text-[11px] font-black text-[#384959] uppercase tracking-widest">
              {meta.val}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple placeholder icon for Targeting
function Target({ className }: { className?: string }) {
  return <FileText className={className} />;
}
