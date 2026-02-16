"use client";

import {
  Users,
  BookOpen,
  CheckCircle,
  TrendingUp,
  Activity,
  ArrowUpRight,
  UserCheck,
  Layout,
  ChevronRight,
  ShieldCheck,
  Zap,
  Target,
  FileBarChart,
  Globe,
  PieChart,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function AdminAnalyticsPage() {
  const stats = [
    {
      name: "Total Enrollments",
      value: "1,592",
      icon: Users,
      color: "blue",
      change: "+18.4%",
      trend: "up",
    },
    {
      name: "Active Modules",
      value: "32",
      icon: BookOpen,
      color: "purple",
      change: "+4",
      trend: "up",
    },
    {
      name: "Certifications",
      value: "624",
      icon: CheckCircle,
      color: "emerald",
      change: "+32.1%",
      trend: "up",
    },
    {
      name: "Avg. Accuracy",
      value: "84.2%",
      icon: Target,
      color: "amber",
      change: "+2.4%",
      trend: "up",
    },
  ];

  return (
    <div className="max-w-[1750px] mx-auto space-y-20 pb-40">
      {/* Intelligence Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-4 px-6 py-3 bg-[#6A89A7]/5 rounded-full border border-[#6A89A7]/10"
          >
            <ShieldCheck className="h-4 w-4 text-[#6A89A7]" />
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.4em]">
              Intelligence Command Center: Operational
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-9xl font-black text-[#384959] tracking-tighter leading-none"
          >
            System{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#BDDFEC] to-[#6A89A7]">
              Analytics
            </span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-2xl max-w-3xl leading-relaxed">
            Real-time telemetry and advanced performance metrics harmonized
            across the institutional ecosystem.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(106,137,167,0.15)] border border-slate-50 flex items-center gap-8 group"
        >
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 w-12 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center -z-[i] group-hover:translate-x-2 transition-transform duration-500"
              >
                <Users className="h-5 w-5 text-slate-300" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-lg font-black text-[#384959]">
              42 Active Sessions
            </p>
            <p className="text-[9px] font-black text-[#6A89A7] uppercase tracking-[0.3em]">
              Synchronizing Pulse
            </p>
          </div>
        </motion.div>
      </div>

      {/* Advanced Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -15 }}
            className="p-12 bg-white rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(106,137,167,0.12)] border border-slate-50 relative overflow-hidden group transition-all duration-700 hover:shadow-[#6A89A7]/20"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform duration-1000">
              <stat.icon className="h-32 w-32" />
            </div>

            <div className="flex justify-between items-start mb-12 relative z-10">
              <div className="h-16 w-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-[#6A89A7] group-hover:bg-[#384959] group-hover:text-white transition-all duration-700 shadow-inner group-hover:rotate-12">
                <stat.icon className="h-8 w-8" />
              </div>
              <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 bg-emerald-50/50 px-5 py-2.5 rounded-full border border-emerald-100/50 uppercase tracking-widest shadow-sm">
                <ArrowUpRight className="h-4 w-4" /> {stat.change}
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">
                {stat.name}
              </p>
              <h2 className="text-6xl font-black text-[#384959] tracking-tighter leading-none">
                {stat.value}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Primary Analytics Surface */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">
        <div className="xl:col-span-2 p-14 lg:p-20 bg-white rounded-[6rem] shadow-[0_60px_150px_-30px_rgba(106,137,167,0.15)] border border-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50/50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-10 mb-20 relative z-10">
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-[#384959] tracking-tighter leading-none">
                Global Enrollment Velocity
              </h3>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.3em]">
                30-Cycle Mastery Progression
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 px-8 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="h-2 w-2 rounded-full bg-[#6A89A7] animate-pulse" />
                <span className="text-[10px] font-black text-[#384959] uppercase tracking-widest">
                  Live Feed
                </span>
              </div>
              <button className="h-14 w-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-xl text-slate-300 hover:text-[#6A89A7] transition-all">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="h-[450px] w-full bg-slate-50/30 rounded-[4rem] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 space-y-10 group-hover:bg-slate-50/50 transition-colors duration-700 relative overflow-hidden">
            <div className="absolute inset-x-0 h-px bg-slate-100 top-1/2 -translate-y-1/2" />
            <div className="absolute inset-y-0 w-px bg-slate-100 left-1/2 -translate-x-1/2" />

            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute inset-0 bg-[#BDDFEC] rounded-full blur-3xl"
              />
              <Activity className="h-24 w-24 text-[#6A89A7] relative z-10" />
            </div>
            <div className="text-center space-y-4 relative z-10">
              <p className="text-[#384959] font-black uppercase text-sm tracking-[0.4em]">
                Synchronizing Global Telemetry
              </p>
              <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest opacity-60">
                Awaiting Primary Data Ingestion from Registry Nodes...
              </p>
            </div>
          </div>
        </div>

        <div className="p-12 lg:p-16 bg-white rounded-[5rem] shadow-[0_60px_150px_-30px_rgba(106,137,167,0.15)] border border-slate-50 flex flex-col">
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-3xl font-black text-[#384959] tracking-tighter">
              Elite Matrix
            </h3>
            <div className="h-16 w-16 rounded-3xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(16,185,129,0.2)]">
              <UserCheck className="h-8 w-8" />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {[
              {
                name: "Dr. Sarah Mitchell",
                score: "99.4%",
                rank: "Diamond-I",
                color: "blue",
                trend: "+0.4%",
              },
              {
                name: "Marcus Sterling",
                score: "98.2%",
                rank: "Platinum-IV",
                color: "indigo",
                trend: "+1.2%",
              },
              {
                name: "Leila Varma",
                score: "97.8%",
                rank: "Gold-II",
                color: "purple",
                trend: "+0.8%",
              },
              {
                name: "Jason Thorne",
                score: "97.1%",
                rank: "Silver-V",
                color: "emerald",
                trend: "+2.1%",
              },
              {
                name: "Elena Rossi",
                score: "96.5%",
                rank: "Silver-III",
                color: "amber",
                trend: "-0.2%",
              },
            ].map((user, i) => (
              <motion.div
                key={user.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center justify-between p-8 rounded-[2.5rem] bg-[#f8fafc]/50 hover:bg-white hover:shadow-2xl hover:shadow-[#6A89A7]/10 transition-all duration-500 border border-transparent hover:border-slate-100 cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <div
                    className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center font-black text-white shadow-lg group-hover:rotate-12 transition-all duration-500",
                      `bg-${user.color}-500/80`,
                    )}
                  >
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-xl text-[#384959] tracking-tighter">
                      {user.name}
                    </p>
                    <p className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.2em] leading-none mt-2">
                      {user.rank}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-emerald-500 leading-none mb-2">
                    {user.score}
                  </p>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                    {user.trend} Velocity
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-10 h-20 bg-[#384959] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-[#384959]/20 hover:bg-[#6A89A7] transition-all active:scale-95 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            Audit Registry Node
          </button>
        </div>
      </div>

      {/* Tertiary Performance Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          whileHover={{ y: -10 }}
          className="p-14 bg-white rounded-[4rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 flex flex-col sm:flex-row items-center gap-12 group transition-all duration-700"
        >
          <div className="h-28 w-28 bg-blue-50/50 rounded-[2.5rem] flex items-center justify-center text-blue-500 shadow-inner shrink-0 group-hover:bg-[#384959] group-hover:text-white transition-all duration-700">
            <Globe className="h-12 w-12" />
          </div>
          <div className="space-y-6 flex-1">
            <h4 className="text-3xl font-black text-[#384959] tracking-tighter leading-none">
              Global Footprint
            </h4>
            <p className="text-slate-400 font-bold leading-relaxed text-sm max-w-sm">
              Synchronizing regional accuracy metrics and local institutional
              guidelines for global distribution.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "64%" }}
                  className="h-full bg-blue-500"
                />
              </div>
              <span className="text-[11px] font-black text-[#384959] uppercase tracking-widest shrink-0">
                64% Synchronized
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -10 }}
          className="p-14 bg-white rounded-[4rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 flex flex-col sm:flex-row items-center gap-12 group transition-all duration-700"
        >
          <div className="h-28 w-28 bg-purple-50/50 rounded-[2.5rem] flex items-center justify-center text-purple-500 shadow-inner shrink-0 group-hover:bg-[#384959] group-hover:text-white transition-all duration-700">
            <Zap className="h-12 w-12" />
          </div>
          <div className="space-y-6 flex-1">
            <h4 className="text-3xl font-black text-[#384959] tracking-tighter leading-none">
              Velocity Pulse
            </h4>
            <p className="text-slate-400 font-bold leading-relaxed text-sm max-w-sm">
              Real-time engagement speed and curriculum digestion rates across
              all mastery tiers.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "82%" }}
                  className="h-full bg-purple-500"
                />
              </div>
              <span className="text-[11px] font-black text-[#384959] uppercase tracking-widest shrink-0">
                82% Peak Activity
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
