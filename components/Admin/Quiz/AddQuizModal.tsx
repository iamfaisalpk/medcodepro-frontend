import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Loader2,
  ClipboardList,
  Clock,
  Trophy,
  Layers,
  Target,
  FileText,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface AddQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  quizData: {
    title: string;
    description: string;
    chapterId: string;
    timeLimit: number;
    totalMarks: number;
    passPercentage: number;
  };
  setQuizData: (data: any) => void;
  chapters: any[];
}

export const AddQuizModal: React.FC<AddQuizModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  quizData,
  setQuizData,
  chapters,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined}
            className="absolute inset-0 bg-[#384959]/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative bg-white rounded-[4rem] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(56,73,89,0.3)] overflow-hidden border border-white"
          >
            {/* Header */}
            <div className="p-10 lg:p-14 border-b border-slate-100 flex items-center justify-between bg-gradient-to-br from-slate-50/50 to-white">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                  <Target className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-1">
                    Architecture Config
                  </p>
                  <h2 className="text-3xl font-black text-[#384959] tracking-tighter leading-none">
                    New <span className="text-emerald-500">Audit</span> Pool
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="h-14 w-14 rounded-2xl bg-white text-slate-300 flex items-center justify-center hover:text-red-500 hover:shadow-xl transition-all border border-slate-100 active:scale-90 disabled:opacity-50"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="p-10 lg:p-14 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 col-span-full">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1">
                    Audit Designation Name
                  </label>
                  <div className="relative group">
                    <ClipboardList className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#6A89A7] transition-colors" />
                    <input
                      type="text"
                      required
                      value={quizData.title}
                      onChange={(e) =>
                        setQuizData({ ...quizData, title: e.target.value })
                      }
                      placeholder="e.g. CPC Terminal Validation [1000 Series]"
                      className="w-full pl-16 pr-6 py-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-[#384959] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4 col-span-full">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1">
                    Chapter Association
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={quizData.chapterId}
                      onChange={(e) =>
                        setQuizData({ ...quizData, chapterId: e.target.value })
                      }
                      className="w-full p-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-[#384959] appearance-none transition-all shadow-inner"
                    >
                      <option value="">Select Modular Unit</option>
                      {chapters.map((c: any) => (
                        <option key={c._id} value={c._id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 rotate-90 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                    <Clock className="h-3 w-3" /> Duration (MIN)
                  </label>
                  <input
                    type="number"
                    value={isNaN(quizData.timeLimit) ? "" : quizData.timeLimit}
                    onChange={(e) =>
                      setQuizData({
                        ...quizData,
                        timeLimit:
                          e.target.value === "" ? 0 : parseInt(e.target.value),
                      })
                    }
                    className="w-full p-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-[#384959] transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                    <Trophy className="h-3 w-3" /> Mastery Threshold %
                  </label>
                  <input
                    type="number"
                    value={
                      isNaN(quizData.passPercentage)
                        ? ""
                        : quizData.passPercentage
                    }
                    onChange={(e) =>
                      setQuizData({
                        ...quizData,
                        passPercentage:
                          e.target.value === "" ? 0 : parseInt(e.target.value),
                      })
                    }
                    className="w-full p-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-[#384959] transition-all"
                  />
                </div>

                <div className="space-y-4 col-span-full">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1">
                    Institutional Guidance
                  </label>
                  <textarea
                    value={quizData.description}
                    onChange={(e) =>
                      setQuizData({ ...quizData, description: e.target.value })
                    }
                    className="w-full p-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-bold text-[#384959] min-h-[120px] resize-none transition-all shadow-inner"
                    placeholder="Provide professional parameters for this audit..."
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-[#384959] text-white py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 disabled:opacity-50 flex items-center justify-center gap-4 active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />{" "}
                      Provisioning...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" /> Initialize Audit
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-10 py-6 bg-white border border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-[2rem] hover:bg-slate-50 transition-all"
                >
                  Abort
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
