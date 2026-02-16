import React from "react";
import { cn } from "@/utils/cn";
import {
  Loader2,
  User,
  Clock,
  Award,
  Calendar,
  BadgeCheck,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface AuditAttemptsListProps {
  attempts: any[];
  isLoading: boolean;
}

export const AuditAttemptsList: React.FC<AuditAttemptsListProps> = ({
  attempts,
  isLoading,
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return "N/A";
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    } catch (e) {
      return "N/A";
    }
  };

  if (isLoading) {
    return (
      <div className="py-32 text-center space-y-6">
        <div className="relative inline-block">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#6A89A7]/10 border-t-[#6A89A7]" />
          <Clock className="absolute inset-0 m-auto h-6 w-6 text-[#6A89A7] animate-pulse" />
        </div>
        <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">
          Retrieving Historical Audit Stream
        </p>
      </div>
    );
  }

  if (attempts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-8">
        <div className="h-32 w-32 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200 shadow-inner">
          <Clock className="h-14 w-14" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-[#384959] tracking-tighter">
            Archive Empty
          </h3>
          <p className="text-slate-400 font-bold max-w-xs mx-auto text-lg leading-relaxed">
            Historical performance logs will materialize once professionals
            engage the audit engines.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="hidden lg:block overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
                Institutional Learner
              </th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
                Audit Module
              </th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
                Mastery Score
              </th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
                Duration
              </th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] text-right">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {attempts.map((attempt: any, idx: number) => (
              <motion.tr
                key={attempt._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-slate-50/30 transition-all group"
              >
                <td className="px-10 py-8">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 bg-gradient-to-br from-[#BDDFEC] to-[#6A89A7] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-black text-[#384959] text-lg tracking-tighter leading-none">
                        {attempt.userId?.name || "Anonymous Professional"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {attempt.userId?.email || "unlinked@medcode.pro"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <p className="font-black text-[#384959] tracking-tight text-base">
                      {attempt.quizId?.title || "Standalone Validation"}
                    </p>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-2xl border font-black text-[10px] uppercase tracking-widest",
                        attempt.percentage >= 70
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-orange-50 text-orange-600 border-orange-100",
                      )}
                    >
                      {attempt.percentage >= 70 ? (
                        <BadgeCheck className="h-4 w-4" />
                      ) : (
                        <ShieldAlert className="h-4 w-4" />
                      )}
                      {Math.round(attempt.percentage)}%
                    </div>
                    <span className="text-xs font-bold text-slate-300">
                      [{attempt.score}/{attempt.totalMarks} PKT]
                    </span>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-2 text-slate-500 font-black text-xs uppercase tracking-widest">
                    <Clock className="h-4 w-4 text-slate-300" />
                    {Math.floor(attempt.timeTaken / 60)}M{" "}
                    {attempt.timeTaken % 60}S
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <p className="text-slate-600 font-bold tracking-tight">
                    {formatDate(attempt.createdAt)}
                  </p>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-0.5">
                    {formatTime(attempt.createdAt)}
                  </p>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-6">
        {attempts.map((attempt: any) => (
          <div
            key={attempt._id}
            className="bg-[#f8fafc] p-10 rounded-[3rem] border border-slate-100 space-y-10 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 -translate-y-1/2 -z-10" />

            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 bg-[#384959] rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xl font-black text-[#384959] tracking-tighter">
                    {attempt.userId?.name}
                  </p>
                  <p className="text-[10px] font-black text-[#6A89A7] uppercase tracking-widest">
                    Level: Master Auditor
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "p-4 rounded-2xl border flex flex-col items-center gap-1",
                  attempt.percentage >= 70
                    ? "bg-emerald-50 border-emerald-100 text-emerald-500"
                    : "bg-orange-50 border-orange-100 text-orange-500",
                )}
              >
                <span className="text-2xl font-black leading-none">
                  {Math.round(attempt.percentage)}%
                </span>
                <span className="text-[8px] font-black uppercase tracking-widest opacity-60">
                  Result
                </span>
              </div>
            </div>

            <div className="space-y-6 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-4 text-slate-500">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <Award className="h-4 w-4 text-orange-400" />
                </div>
                <p className="text-sm font-black text-[#384959] tracking-tight">
                  {attempt.quizId?.title}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {Math.floor(attempt.timeTaken / 60)}M{" "}
                    {attempt.timeTaken % 60}S
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-bold">
                    {formatDate(attempt.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full py-5 bg-white border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-[#384959] shadow-sm flex items-center justify-center gap-3">
              Full Integrity Report <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
