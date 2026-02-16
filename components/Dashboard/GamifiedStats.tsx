import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Shield,
  Medal,
  Target,
  Zap,
  Activity,
  Award,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { CircularProgress } from "../ui/CircularProgress";

interface GamifiedStatsProps {
  xp: number;
  level: number;
  rank: string;
  overallProgress: number;
  quizAverage: number;
  quizCount: number;
}

export const GamifiedStats: React.FC<GamifiedStatsProps> = ({
  xp,
  level,
  rank,
  overallProgress,
  quizAverage,
  quizCount,
}) => {
  const nextLevelXp = (Math.floor(xp / 1000) + 1) * 1000;
  const currentLevelXp = xp % 1000;
  const levelProgress = (currentLevelXp / 1000) * 100;

  const getRankConfig = (rankName: string) => {
    switch (rankName) {
      case "MedCode Legend":
        return {
          icon: Medal,
          color: "text-amber-500",
          bg: "bg-amber-50",
          border: "border-amber-200",
          tier: "Conqueror",
          gradient: "from-amber-400 to-orange-500",
        };
      case "Compliance Master":
        return {
          icon: Shield,
          color: "text-purple-500",
          bg: "bg-purple-50",
          border: "border-purple-200",
          tier: "Platinum",
          gradient: "from-purple-400 to-indigo-500",
        };
      case "Certified Auditor":
        return {
          icon: Target,
          color: "text-blue-500",
          bg: "bg-blue-50",
          border: "border-blue-200",
          tier: "Gold",
          gradient: "from-blue-400 to-[#6A89A7]",
        };
      case "Coding Analyst":
        return {
          icon: Zap,
          color: "text-slate-500",
          bg: "bg-slate-50",
          border: "border-slate-200",
          tier: "Silver",
          gradient: "from-slate-400 to-[#384959]",
        };
      default:
        return {
          icon: Star,
          color: "text-orange-500",
          bg: "bg-orange-50",
          border: "border-orange-200",
          tier: "Bronze",
          gradient: "from-orange-400 to-red-500",
        };
    }
  };

  const rankConfig = getRankConfig(rank);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
      {/* Identity Segment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 sm:p-10 xl:p-12 rounded-[3rem] xl:rounded-[4rem] shadow-2xl shadow-[#6A89A7]/10 border border-white flex flex-col justify-between relative group overflow-hidden"
      >
        {/* Single subtle background shape */}
        <div className="absolute -top-20 -right-20 sm:-top-24 sm:-right-24 w-48 h-48 sm:w-56 sm:h-56 xl:w-64 xl:h-64 bg-gradient-to-br from-slate-50 via-slate-100/50 to-transparent rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"></div>

        <div className="relative z-10 space-y-8 sm:space-y-10 xl:space-y-12">
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div className="space-y-2 flex-1 min-w-0">
              <p className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em] leading-none">
                Identity Tier
              </p>
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-sm",
                  rankConfig.bg,
                  rankConfig.color,
                  rankConfig.border,
                )}
              >
                <rankConfig.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{rankConfig.tier}</span>
              </div>
            </div>
            <div className="h-16 w-16 sm:h-20 sm:w-20 bg-[#384959] rounded-[1.5rem] sm:rounded-[2rem] flex flex-col items-center justify-center shadow-2xl shadow-[#384959]/20 border border-white/10 group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
              <span className="text-[9px] sm:text-[10px] font-black text-white/40 uppercase leading-none mb-0.5 sm:mb-1">
                LVL
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-none">
                {level}
              </span>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#384959] tracking-tighter leading-tight">
              {rank}
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-end gap-4">
                <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.2em]">
                  Synapse Progress
                </span>
                <span className="text-xs font-black text-[#384959] whitespace-nowrap">
                  {currentLevelXp} / 1000{" "}
                  <span className="text-[#6A89A7]">XP</span>
                </span>
              </div>
              <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className={cn(
                    "h-full rounded-full shadow-lg",
                    "bg-gradient-to-r",
                    rankConfig.gradient,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Telemetry Segment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-8 sm:p-10 xl:p-12 rounded-[3rem] xl:rounded-[4rem] shadow-2xl shadow-[#6A89A7]/10 border border-white xl:col-span-2 relative overflow-hidden"
      >
        {/* Single subtle background shape */}
        <div className="absolute -bottom-20 -left-20 sm:-bottom-28 sm:-left-28 w-56 h-56 sm:w-72 sm:h-72 xl:w-80 xl:h-80 bg-gradient-to-tr from-[#BDDFEC]/20 via-slate-50 to-transparent rounded-full opacity-50 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* Header Section */}
          <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
            <p className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.4em] leading-none">
              Institutional Intelligence
            </p>
            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-black text-[#384959] tracking-tighter">
              Progress <span className="text-[#6A89A7]">Analytics</span>
            </h3>
          </div>

          {/* Stats Cards and Circular Progress */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-10 xl:gap-12">
            {/* Stats Cards */}
            <div className="w-full lg:w-auto lg:flex-shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-md mx-auto lg:mx-0">
                <div className="bg-[#f8fafc] border border-slate-100 rounded-[2rem] p-5 sm:p-6 shadow-sm group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">
                        Velocity
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-[#384959] tracking-tight">
                          {xp.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#6A89A7] font-bold">
                          XP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#f8fafc] border border-slate-100 rounded-[2rem] p-5 sm:p-6 shadow-sm group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">
                        Audits
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-[#384959] tracking-tight">
                          {quizCount}
                        </span>
                        <span className="text-xs text-[#6A89A7] font-bold">
                          Records
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Circular Progress Indicators */}
            <div className="w-full lg:flex-1 flex flex-row items-center justify-center lg:justify-end gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
              <div className="relative group">
                <CircularProgress
                  percentage={Math.round(overallProgress)}
                  label={`${Math.round(overallProgress)}%`}
                  subLabel="Mastery"
                  color="#6A89A7"
                  size={130}
                />
                <div className="absolute -inset-4 bg-[#6A89A7]/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              
              <div className="relative group">
                <CircularProgress
                  percentage={Math.round(quizAverage)}
                  label={`${Math.round(quizAverage)}%`}
                  subLabel="Accuracy"
                  color="#10b981"
                  size={130}
                />
                <div className="absolute -inset-4 bg-emerald-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};