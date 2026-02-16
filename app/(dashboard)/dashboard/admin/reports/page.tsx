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
    <div className="max-w-[1600px] mx-auto space-y-16 pb-32">
      {/* Header Intelligence */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#BDDFEC]/20 rounded-full border border-[#BDDFEC]/40"
          >
            <ShieldCheck className="h-4 w-4 text-[#6A89A7]" />
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em]">
              Master Archive Access
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter"
          >
            System <span className="text-[#6A89A7]">Reports</span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-xl max-w-2xl leading-relaxed">
            Generate, verify, and export high-fidelity institutional reports for
            auditing and compliance tracking.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button className="h-16 px-10 bg-white border border-slate-100 text-[#384959] rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-[#6A89A7]/5 transition-all active:scale-95">
            <Calendar className="h-5 w-5" /> Set Epoch
          </button>
          <button className="h-16 px-10 bg-[#384959] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 active:scale-95">
            <Download className="h-5 w-5" /> Export Ledger
          </button>
        </motion.div>
      </div>

      {/* Report Architecture Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {reportTypes.map((report, idx) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className="p-10 bg-white rounded-[3.5rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-[#6A89A7]/15"
          >
            <div className="h-20 w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-[#6A89A7] mb-8 group-hover:bg-[#384959] group-hover:text-white transition-all duration-500 shadow-inner">
              <report.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-[#384959] tracking-tighter mb-3">
              {report.title}
            </h3>
            <p className="text-xs text-slate-400 font-bold leading-relaxed">
              {report.desc}
            </p>
            <button className="mt-8 text-[10px] font-black uppercase tracking-widest text-[#6A89A7] hover:text-[#384959] transition-colors flex items-center gap-2">
              Configure <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Prime Report Surface */}
      <div className="bg-white rounded-[4rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 relative overflow-hidden text-center flex flex-col items-center py-32 px-10">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-100 via-[#6A89A7] to-slate-100 opacity-20" />

        <div className="relative mb-12">
          <div className="h-40 w-40 bg-[#f8fafc] rounded-[4rem] flex items-center justify-center text-slate-200 shadow-inner rotate-3 group">
            <FileBarChart className="h-20 w-20 group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="absolute -bottom-4 -right-4 h-16 w-16 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-emerald-500 border border-emerald-50">
            <Lock className="h-6 w-6" />
          </div>
        </div>

        <div className="space-y-6 max-w-xl">
          <h2 className="text-4xl lg:text-5xl font-black text-[#384959] tracking-tighter italic">
            "Awaiting Ledger Synchronization"
          </h2>
          <p className="text-slate-400 font-bold text-lg leading-relaxed">
            Initialize your first institutional audit by selecting a
            high-fidelity report template from the architecture pool above.
          </p>
        </div>

        <div className="mt-16 flex items-center gap-8">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-slate-300" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              No Previous Exports
            </span>
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-200" />
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-slate-300" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Directory Empty
            </span>
          </div>
        </div>
      </div>

      {/* Asset Metadata Footer */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-10 opacity-40">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
            Encrypted Export Engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
            Institutional Compliance
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
            Historical Chain Integrity
          </span>
        </div>
      </div>
    </div>
  );
}

// Simple placeholder icon for Targeting
function Target({ className }: { className?: string }) {
  return <FileText className={className} />;
}
