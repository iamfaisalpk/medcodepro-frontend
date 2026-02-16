"use client";

import { motion } from "framer-motion";
import { Activity, Target, BookOpen, ChevronRight, Award } from "lucide-react";
import { useGetUserProgressQuery } from "@/store/progressApiSlice";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { cn } from "@/utils/cn";

export default function AnalyticsPage() {
  const { data: progressData, isLoading } = useGetUserProgressQuery(undefined);
  const progressList = progressData?.data || [];

  const getAnalyticsTheme = (percentage: number) => {
    // Thresholds based on 10-question logic (0-3: Low, 4-7: Med, 8-10: High)
    if (percentage <= 35) {
      return { color: "#ef4444", visualPct: Math.max(percentage, 10) }; // Red, Partial (min 10% for visibility)
    }
    if (percentage <= 75) {
      return { color: "#eab308", visualPct: 50 }; // Yellow, Half
    }
    return { color: "#22c55e", visualPct: 100 }; // Green, Full
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#6A89A7] border-t-transparent shadow-xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-black text-[#384959] tracking-tighter">
            Progress Analytics
          </h1>
          <p className="text-slate-500 font-bold tracking-tight text-lg">
            Detailed performance breakdown across all modules.
          </p>
        </div>

        <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <Activity className="h-5 w-5 text-emerald-500" />
          <span className="text-sm font-black text-[#384959] uppercase tracking-widest">
            {progressList.length} Active Modules
          </span>
        </div>
      </div>

      {progressList.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-100 text-center space-y-4">
          <BookOpen className="h-20 w-20 text-slate-100 mx-auto" />
          <p className="font-black text-slate-400 uppercase tracking-widest text-sm">
            Start a chapter to see analytics
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10">
          {progressList.map((progress: any, idx: number) => (
            <motion.div
              key={progress._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[3rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 overflow-hidden group"
            >
              <div className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Title and Module Info */}
                <div className="flex-1 space-y-6 text-center lg:text-left w-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em]">
                      Module {idx + 1}
                    </span>
                    <h2 className="text-3xl font-black text-[#384959] tracking-tight group-hover:text-[#6A89A7] transition-colors line-clamp-2">
                      {progress.chapterId?.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                        Status
                      </p>
                      <p
                        className={cn(
                          "text-xs font-black uppercase tracking-widest",
                          progress.percentage === 100
                            ? "text-emerald-500"
                            : "text-[#6A89A7]",
                        )}
                      >
                        {progress.percentage === 100
                          ? "Completed"
                          : "In Progress"}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                        Highest Score
                      </p>
                      <p className="text-xs font-black text-[#384959] uppercase tracking-widest">
                        {progress.quizScore || 0} Points
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Visuals */}
                <div className="flex flex-col sm:flex-row items-center gap-12 lg:gap-16">
                  {/* Lesson Mastery */}
                  <div className="flex flex-col items-center gap-4">
                    <CircularProgress
                      percentage={
                        getAnalyticsTheme(progress.percentage).visualPct
                      }
                      size={140}
                      strokeWidth={10}
                      label={`${Math.round(progress.percentage)}%`}
                      subLabel="Mastery"
                      color={getAnalyticsTheme(progress.percentage).color}
                    />
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                      <BookOpen className="h-3 w-3" />
                      Lesson Content
                    </div>
                  </div>

                  {/* Quiz performance */}
                  <div className="flex flex-col items-center gap-4">
                    <CircularProgress
                      percentage={
                        getAnalyticsTheme(progress.quizPercentage || 0)
                          .visualPct
                      }
                      size={140}
                      strokeWidth={10}
                      label={`${Math.round(progress.quizPercentage || 0)}%`}
                      subLabel="Accuracy"
                      color={
                        getAnalyticsTheme(progress.quizPercentage || 0).color
                      }
                    />
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                      <Award className="h-3 w-3" />
                      Audit Score
                    </div>
                  </div>
                </div>

                {/* Action Arrow */}
                <div className="hidden xl:block">
                  <div className="h-14 w-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#6A89A7] group-hover:text-white transition-all shadow-inner">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
