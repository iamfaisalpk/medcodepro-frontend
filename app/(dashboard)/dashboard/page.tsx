"use client";

import { useGetStatsQuery } from "@/store/dashboardApiSlice";
import {
  TrendingUp,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Activity,
  ClipboardList,
  Calendar,
  Trophy,
  Star,
  Zap,
  ChevronRight,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import { GamifiedStats } from "@/components/Dashboard/GamifiedStats";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function DashboardPage() {
  const { data: statsData, isLoading } = useGetStatsQuery(undefined);
  const stats = statsData?.data;

  const cards = [
    {
      label: "Chapters Tracked",
      value: stats?.totalChapters || "0",
      icon: BookOpen,
      color: "blue",
      description: "Modules in curriculum",
    },
    {
      label: "Lessons Done",
      value: stats?.totalLessonsCompleted || "0",
      icon: CheckCircle2,
      color: "emerald",
      description: "Completed checkpoints",
    },
    {
      label: "Mastery Level",
      value: `${Math.round(stats?.overallProgress || 0)}%`,
      icon: TrendingUp,
      color: "slate",
      description: "Overall course progress",
    },
    {
      label: "Audit Accuracy",
      value: `${Math.round(stats?.quizAverage || 0)}%`,
      icon: Trophy,
      color: "orange",
      description: "Average quiz performance",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="relative">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-[#6A89A7]/10 border-t-[#6A89A7]"></div>
          <Star className="absolute inset-0 m-auto h-8 w-8 text-[#6A89A7] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-16 pb-24">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[#6A89A7] font-black text-[10px] uppercase tracking-[0.3em]"
          >
            <Zap className="h-4 w-4 fill-current" />
            Live Analytics Feed
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter"
          >
            Hello,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A89A7] to-[#384959]">
              {statsData?.user?.name || "Coder"}
            </span>
          </motion.h1>
          <p className="mt-4 text-slate-400 font-bold tracking-tight text-xl max-w-xl leading-relaxed">
            Your Medical Coding journey is{" "}
            <span className="text-[#384959] underline decoration-[#BDDFEC] decoration-4">
              evolving
            </span>
            . Here's your real-time performance audit.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-100 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-500">
            <div className="h-14 w-14 bg-[#f8fafc] rounded-2xl flex items-center justify-center text-[#6A89A7] group-hover:bg-[#6A89A7] group-hover:text-white transition-all duration-500 shadow-inner">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">
                Current Session
              </p>
              <p className="text-lg font-black text-[#384959] tracking-tight whitespace-nowrap">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gamified Analytics & Rank Section */}
      <section className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-[#BDDFEC]/20 to-transparent rounded-[4rem] -z-10 blur-3xl"></div>
        <GamifiedStats
          xp={stats?.xp || 0}
          level={stats?.level || 1}
          rank={stats?.rank || "Novice Coder"}
          overallProgress={stats?.overallProgress || 0}
          quizAverage={stats?.quizAverage || 0}
          quizCount={stats?.quizCount || 0}
        />
      </section>

      {/* Main Grid Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Statistics and Progress */}
        <div className="lg:col-span-2 space-y-12">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {cards.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col gap-6">
                  <div
                    className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg",
                      card.color === "blue" &&
                        "bg-blue-50 text-blue-500 shadow-blue-500/10",
                      card.color === "emerald" &&
                        "bg-emerald-50 text-emerald-500 shadow-emerald-500/10",
                      card.color === "slate" &&
                        "bg-slate-50 text-slate-500 shadow-slate-500/10",
                      card.color === "orange" &&
                        "bg-orange-50 text-orange-500 shadow-orange-500/10",
                    )}
                  >
                    <card.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                      {card.label}
                    </h3>
                    <p className="text-4xl font-black text-[#384959] tracking-tighter mb-2">
                      {card.value}
                    </p>
                    <p className="text-xs text-slate-300 font-bold">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Learning Path Banner */}
          <Link href="/dashboard/modules">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-[#384959] rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl shadow-[#384959]/20 border border-white/5 cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6A89A7]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#6A89A7]/20 transition-all duration-700"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 text-left">
                  <span className="bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
                    Recommended Curriculum
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none max-w-lg">
                    Finish where you left off.
                  </h2>
                  <p className="text-slate-300 font-bold max-w-sm">
                    Continue your mastery path and unlock professional-grade
                    medical coding skills.
                  </p>

                  <div className="mt-8 bg-[#6A89A7] text-white font-black px-10 py-5 rounded-2xl flex items-center gap-4 hover:bg-white hover:text-[#384959] transition-all shadow-2xl active:scale-95 group/btn w-fit uppercase text-xs tracking-widest">
                    Continue Learning
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="h-48 w-48 bg-white/5 rounded-[3rem] backdrop-blur-xl border border-white/10 p-10 flex items-center justify-center group-hover:rotate-12 transition-all duration-700">
                    <Layers className="h-20 w-20 text-[#BDDFEC] opacity-80" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Activity Log */}
          <div className="bg-white rounded-[3rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#384959] tracking-tighter">
                  Recent Audit Logs
                </h2>
                <p className="text-xs text-slate-400 font-bold mt-1">
                  Summary of your latest performance reports.
                </p>
              </div>
              <Link
                href="/dashboard/quizzes"
                className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#6A89A7] hover:bg-[#6A89A7] hover:text-white transition-all shadow-inner"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50 px-4">
              {(stats?.recentActivity || []).length > 0 ? (
                stats.recentActivity.map((activity: any, idx: number) => (
                  <motion.div
                    key={activity._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group rounded-[2rem] my-2"
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-[1.5rem] bg-slate-50 text-[#6A89A7] flex items-center justify-center border border-slate-100 group-hover:bg-[#384959] group-hover:text-white transition-all shadow-sm">
                        <ClipboardList className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-[#384959] tracking-tighter group-hover:text-[#6A89A7] transition-colors">
                          {activity.quizId?.title ||
                            "Professional Audit Attempt"}
                        </h4>
                        <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-100/50 px-2 py-1 rounded-md">
                            Score: {activity.score}
                          </span>
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            {new Date(
                              activity.completedAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100 shadow-sm">
                        Validated
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-24 text-center">
                  <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                    <Activity className="h-10 w-10" />
                  </div>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-sm">
                    No Audit Records in feed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-100 text-left"
          >
            <h2 className="text-2xl font-black text-[#384959] tracking-tighter mb-10">
              Platform Mastery
            </h2>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-[#384959] tracking-tight uppercase">
                      Curriculum Engine
                    </span>
                    <p className="text-[10px] text-slate-400 font-bold">
                      Overall completion rate
                    </p>
                  </div>
                  <span className="text-lg font-black text-[#6A89A7]">
                    {Math.round(stats?.overallProgress || 0)}%
                  </span>
                </div>
                <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden p-1 shadow-inner border border-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats?.overallProgress || 0}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#6A89A7] to-[#384959] shadow-lg shadow-[#6A89A7]/20"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-[#f8fafc] rounded-[2rem] border border-slate-100">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Mastery Insight
              </h4>
              <p className="text-xs font-bold text-slate-500 leading-relaxed italic">
                "Your audit scores show high potential in Case Coding. Focus on
                terminology modules to boost your overall accuracy."
              </p>
            </div>

            <Link href="/dashboard/analytics">
              <button className="w-full mt-10 py-5 bg-[#384959] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#6A89A7] transition-all shadow-xl shadow-[#384959]/10 active:scale-95">
                Full Performance Report
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#384959] to-[#6A89A7] p-10 rounded-[3rem] text-white relative shadow-2xl overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="text-2xl font-black tracking-tighter mb-8 leading-tight">
              Ready for Certification?
            </h3>
            <div className="space-y-4 mb-4">
              <div className="bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-black text-white/40 uppercase block mb-1">
                  Status
                </span>
                <span className="text-lg font-bold text-[#BDDFEC]">
                  Professional Access
                </span>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-black text-white/40 uppercase block mb-1">
                  Opportunity
                </span>
                <span className="text-lg font-bold text-white">
                  Mock Audit Library Unlocked
                </span>
              </div>
            </div>
            <Link href="/dashboard/quizzes" className="block pt-8 text-center">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#BDDFEC] hover:text-white transition-colors cursor-pointer">
                Unlock Library &rarr;
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
