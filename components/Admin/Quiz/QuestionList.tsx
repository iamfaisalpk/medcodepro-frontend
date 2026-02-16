import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  Search,
  Loader2,
  Edit2,
  Trash2,
  Database,
  Layers,
  Activity,
  ChevronRight,
  Target,
  ShieldCheck,
} from "lucide-react";

interface QuestionListProps {
  questions: any[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onDelete: (id: string) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  isLoading,
  searchQuery,
  setSearchQuery,
  onDelete,
}) => {
  const filteredQuestions = questions.filter((q: any) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      q.question?.toLowerCase()?.includes(query) ||
      q.chapterId?.title?.toLowerCase()?.includes(query) ||
      q.quizId?.title?.toLowerCase()?.includes(query) ||
      q.difficulty?.toLowerCase()?.includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="py-40 text-center space-y-6">
        <div className="relative inline-block">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-[#6A89A7]/10 border-t-[#6A89A7]" />
          <Database className="absolute inset-0 m-auto h-8 w-8 text-[#6A89A7] animate-pulse" />
        </div>
        <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.4em]">
          Synchronizing Repository...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {/* Desktop Perspective */}
      <div className="hidden lg:block overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] w-1/2">
                Logic Structure
              </th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
                Institutional Layer
              </th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
                Calibration
              </th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] text-right">
                Vault Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q: any, idx) => (
                <motion.tr
                  key={q._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="bg-white hover:bg-slate-50/30 transition-all group"
                >
                  <td className="px-10 py-10">
                    <div className="space-y-6">
                      <div className="text-lg font-black text-[#384959] tracking-tight leading-relaxed max-w-3xl">
                        {q.question}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {q.options?.map((opt: string, i: number) => (
                          <div
                            key={i}
                            className={cn(
                              "text-[10px] p-4 rounded-2xl border transition-all duration-500 font-bold",
                              i === q.correctAnswer
                                ? "bg-emerald-50 border-emerald-500 text-[#384959] shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500"
                                : "bg-white border-slate-100 text-slate-400 group-hover:border-slate-200",
                            )}
                          >
                            <span
                              className={cn(
                                "mr-3 h-6 w-6 inline-flex items-center justify-center rounded-lg text-[9px] font-black",
                                i === q.correctAnswer
                                  ? "bg-emerald-500 text-white"
                                  : "bg-slate-50 text-slate-300",
                              )}
                            >
                              {String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-[#BDDFEC]/20 rounded-xl flex items-center justify-center text-[#6A89A7] border border-[#BDDFEC]/40">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#384959] tracking-tight">
                          {q.chapterId?.title || "Standalone"}
                        </p>
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mt-1">
                          Registry Active
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest",
                        q.difficulty?.toLowerCase() === "easy"
                          ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                          : q.difficulty?.toLowerCase() === "medium"
                            ? "bg-orange-50 text-orange-500 border-orange-100"
                            : "bg-red-50 text-red-500 border-red-100",
                      )}
                    >
                      <Activity className="h-3 w-3" />
                      {q.difficulty || "medium"}
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                      <button className="h-12 w-12 bg-white border border-slate-100 text-[#384959] rounded-2xl flex items-center justify-center hover:bg-[#384959] hover:text-white transition-all shadow-xl shadow-[#384959]/5 active:scale-90">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(q._id)}
                        className="h-12 w-12 bg-white border border-red-100 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-500/5 active:scale-90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-40 text-center">
                  <div className="h-40 w-40 bg-slate-50 rounded-[4rem] flex items-center justify-center text-slate-200 mx-auto mb-8 shadow-inner">
                    <Target className="h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-black text-[#384959] tracking-tighter">
                    Repository Empty
                  </h3>
                  <p className="text-slate-400 font-bold max-w-xs mx-auto text-lg leading-relaxed mt-2">
                    Initialize the forging process by clicking "Create Record"
                    or "Bulk Ingest" above.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Perspective */}
      <div className="lg:hidden space-y-8">
        {filteredQuestions.map((q: any) => (
          <div
            key={q._id}
            className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-[#6A89A7]/5 space-y-8 relative overflow-hidden active:scale-[0.98] transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 -z-10" />

            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "px-4 py-2 rounded-xl border text-[8px] font-black uppercase tracking-widest",
                    q.difficulty?.toLowerCase() === "easy"
                      ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                      : "bg-orange-100",
                  )}
                >
                  {q.difficulty} Tier
                </div>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">
                  ID: #{q._id.slice(-6)}
                </p>
              </div>

              <div className="text-xl font-black text-[#384959] tracking-tighter leading-tight">
                {q.question}
              </div>

              <div className="space-y-3">
                {q.options?.map((opt: string, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      "text-[10px] p-5 rounded-[2rem] border font-black transition-all",
                      i === q.correctAnswer
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg"
                        : "bg-[#f8fafc] border-transparent text-slate-400",
                    )}
                  >
                    <span
                      className={cn(
                        "mr-4 h-8 w-8 inline-flex items-center justify-center rounded-xl font-black",
                        i === q.correctAnswer
                          ? "bg-emerald-500 text-white"
                          : "bg-white text-slate-300",
                      )}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <div>
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">
                  Structural Unit
                </p>
                <p className="text-sm font-black text-[#384959] tracking-tight">
                  {q.chapterId?.title || "Standalone"}
                </p>
              </div>
              <div className="flex gap-4">
                <button className="h-14 w-14 bg-white border border-slate-100 text-[#384959] rounded-2xl flex items-center justify-center shadow-lg active:scale-90">
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(q._id)}
                  className="h-14 w-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 border border-red-100"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
