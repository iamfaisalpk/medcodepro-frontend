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
              Institutional Intelligence Active
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter"
          >
            System <span className="text-[#6A89A7]">Analytics</span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-xl max-w-2xl leading-relaxed">
            Real-time telemetry and deep-learning performance metrics across the
            entire professional ecosystem.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-100 flex items-center gap-6"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center -z-[i]"
              >
                <Users className="h-4 w-4 text-slate-300" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-black text-[#384959]">42 Users Live</p>
            <p className="text-[9px] font-black text-[#6A89A7] uppercase tracking-widest">
              Active Synchronizations
            </p>
          </div>
        </motion.div>
      </div>

      {/* Metric Infrastructure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className="p-10 bg-white rounded-[3.5rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <stat.icon className="h-24 w-24" />
            </div>

            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#6A89A7] group-hover:bg-[#384959] group-hover:text-white transition-all duration-500 shadow-inner">
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-500 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 uppercase tracking-widest">
                <ArrowUpRight className="h-3 w-3" /> {stat.change}
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                {stat.name}
              </p>
              <h2 className="text-5xl font-black text-[#384959] tracking-tighter mt-3 leading-none">
                {stat.value}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Data Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 p-12 lg:p-16 bg-white rounded-[4rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-16 relative z-10">
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-[#384959] tracking-tighter">
                Global Enrollment Velocity
              </h3>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                Last 30 Continuous Cycles
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="h-2 w-2 rounded-full bg-[#6A89A7]" />
                <span className="text-[9px] font-black text-[#384959] uppercase tracking-widest">
                  Current Period
                </span>
              </div>
              <button className="h-12 w-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-lg text-slate-300">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="h-96 w-full bg-slate-50/50 rounded-[3rem] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 space-y-6">
            <div className="relative">
              <Activity className="h-16 w-16 text-[#BDDFEC] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-transparent" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-[#384959] font-black uppercase text-xs tracking-[0.3em]">
                Synchronizing Telemetry
              </p>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                Awaiting Primary Data Ingestion...
              </p>
            </div>
          </div>
        </div>

        <div className="p-10 lg:p-14 bg-white rounded-[4rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 flex flex-col">
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-2xl font-black text-[#384959] tracking-tighter">
              Elite Performers
            </h3>
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <UserCheck className="h-6 w-6" />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {[
              {
                name: "Dr. Sarah Mitchell",
                score: "99.4%",
                rank: "Diamond-I",
                color: "blue",
              },
              {
                name: "Marcus Sterling",
                score: "98.2%",
                rank: "Platinum-IV",
                color: "indigo",
              },
              {
                name: "Leila Varma",
                score: "97.8%",
                rank: "Gold-II",
                color: "purple",
              },
              {
                name: "Jason Thorne",
                score: "97.1%",
                rank: "Silver-V",
                color: "emerald",
              },
              {
                name: "Elena Rossi",
                score: "96.5%",
                rank: "Silver-III",
                color: "amber",
              },
            ].map((user, i) => (
              <motion.div
                key={user.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 rounded-3xl bg-[#f8fafc] hover:bg-white hover:shadow-xl hover:shadow-[#6A89A7]/5 transition-all duration-500 border border-transparent hover:border-slate-100 cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center font-black text-white shadow-lg group-hover:scale-110 transition-transform",
                      `bg-${user.color}-500/80`,
                    )}
                  >
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-[#384959] tracking-tight">
                      {user.name}
                    </p>
                    <p className="text-[9px] font-black text-[#6A89A7] uppercase tracking-widest leading-none mt-1">
                      {user.rank}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-500">
                    {user.score}
                  </p>
                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                    Accuracy
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-10 py-5 bg-[#384959] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#384959]/20 hover:bg-[#6A89A7] transition-all">
            Audit Full Registry
          </button>
        </div>
      </div>

      {/* Secondary Analytics Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-12 bg-white rounded-[3.5rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 flex flex-col md:flex-row items-center gap-10">
          <div className="h-24 w-24 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-500 shadow-inner shrink-0">
            <Globe className="h-10 w-10" />
          </div>
          <div className="space-y-4">
            <h4 className="text-2xl font-black text-[#384959] tracking-tighter">
              Global Footprint
            </h4>
            <p className="text-slate-400 font-bold leading-relaxed text-sm">
              Synchronizing regional accuracy metrics and local institutional
              guidelines for global distribution.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-blue-500" />
              </div>
              <span className="text-[10px] font-black text-blue-500">
                64% SYNC
              </span>
            </div>
          </div>
        </div>

        <div className="p-12 bg-white rounded-[3.5rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 flex flex-col md:flex-row items-center gap-10">
          <div className="h-24 w-24 bg-purple-50 rounded-[2rem] flex items-center justify-center text-purple-500 shadow-inner shrink-0">
            <Zap className="h-10 w-10" />
          </div>
          <div className="space-y-4">
            <h4 className="text-2xl font-black text-[#384959] tracking-tighter">
              Velocity Pulse
            </h4>
            <p className="text-slate-400 font-bold leading-relaxed text-sm">
              Real-time engagement speed and curriculum digestion rates across
              all mastery tiers.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-purple-500" />
              </div>
              <span className="text-[10px] font-black text-purple-500">
                82% PEAK
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
