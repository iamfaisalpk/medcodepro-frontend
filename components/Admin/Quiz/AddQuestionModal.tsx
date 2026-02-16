import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PlusCircle,
  Loader2,
  Database,
  Layers,
  Target,
  FileText,
  ChevronRight,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  questionData: {
    quizId: string;
    chapterId: string;
    question: string;
    options: string[];
    correctAnswer: number;
    difficulty: string;
    marks: number;
    explanation: string;
  };
  setQuestionData: (data: any) => void;
  chapters: any[];
  quizzes: any[];
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  questionData,
  setQuestionData,
  chapters,
  quizzes,
}) => {
  const filteredQuizzes = (chapterId: string) => {
    if (!chapterId) return [];
    return quizzes.filter((q: any) => {
      const qChapterId =
        typeof q.chapterId === "object" ? q.chapterId?._id : q.chapterId;
      return qChapterId === chapterId;
    });
  };

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
            className="relative bg-white rounded-[4rem] w-full max-w-5xl shadow-[0_50px_100px_-20px_rgba(56,73,89,0.3)] flex flex-col max-h-[92vh] overflow-hidden border border-white"
          >
            {/* Header */}
            <div className="p-10 lg:p-14 border-b border-slate-100 flex items-center justify-between bg-gradient-to-br from-slate-50/50 to-white">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 bg-[#384959] text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#384959]/20">
                  <Database className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em] mb-1">
                    Vault Provisioning
                  </p>
                  <h2 className="text-3xl lg:text-4xl font-black text-[#384959] tracking-tighter leading-none">
                    Manual <span className="text-[#6A89A7]">Ingestion</span>
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

            {/* Form Surface */}
            <form
              onSubmit={onSubmit}
              className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-12 custom-scrollbar"
            >
              {/* Classification Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                    <Layers className="h-3 w-3" /> Module Classification
                  </label>
                  <div className="relative">
                    <select
                      value={questionData.chapterId}
                      onChange={(e) =>
                        setQuestionData({
                          ...questionData,
                          chapterId: e.target.value,
                          quizId: "",
                        })
                      }
                      className="w-full p-6 bg-[#f8fafc] rounded-[2rem] border border-slate-100 focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white outline-none font-black text-[#384959] appearance-none transition-all"
                      required
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
                    <Target className="h-3 w-3" /> Designated Audit Pool
                  </label>
                  <div className="relative">
                    <select
                      value={questionData.quizId}
                      onChange={(e) =>
                        setQuestionData({
                          ...questionData,
                          quizId: e.target.value,
                        })
                      }
                      className="w-full p-6 bg-[#f8fafc] rounded-[2rem] border border-slate-100 focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white outline-none font-black text-[#384959] appearance-none transition-all disabled:opacity-40"
                      disabled={!questionData.chapterId}
                    >
                      <option value="">
                        {questionData.chapterId
                          ? "General Validation Pool"
                          : "Chapter Calibration Required"}
                      </option>
                      {filteredQuizzes(questionData.chapterId).map((q: any) => (
                        <option key={q._id} value={q._id}>
                          {q.title}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Logic Input */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                  <Activity className="h-3 w-3" /> Clinical Logic Verification
                </label>
                <textarea
                  value={questionData.question}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      question: e.target.value,
                    })
                  }
                  className="w-full p-8 bg-[#f8fafc] rounded-[2.5rem] border border-slate-100 focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white outline-none font-bold text-[#384959] min-h-[160px] resize-none text-lg leading-relaxed transition-all shadow-inner"
                  placeholder="Articulate the clinical scenario or coding query..."
                  required
                />
              </div>

              {/* Options Engine */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" /> Selection Matrix
                  </label>
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    Click Label to Verify Key
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {questionData.options.map((opt, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="relative group"
                    >
                      <input
                        value={opt}
                        onChange={(e) => {
                          const nextOpts = [...questionData.options];
                          nextOpts[idx] = e.target.value;
                          setQuestionData({
                            ...questionData,
                            options: nextOpts,
                          });
                        }}
                        className={cn(
                          "w-full pl-20 pr-8 py-7 rounded-[2rem] border-2 transition-all duration-500 outline-none font-bold text-[#384959] text-base shadow-inner group-hover:shadow-lg",
                          questionData.correctAnswer === idx
                            ? "bg-emerald-50 border-emerald-500 text-[#384959]"
                            : "bg-[#f8fafc] border-transparent hover:border-[#6A89A7]/30",
                        )}
                        placeholder={`Option Identifier ${String.fromCharCode(65 + idx)}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setQuestionData({
                            ...questionData,
                            correctAnswer: idx,
                          })
                        }
                        className={cn(
                          "absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 shadow-xl",
                          questionData.correctAnswer === idx
                            ? "bg-emerald-500 text-white"
                            : "bg-white text-slate-300 border border-slate-100 group-hover:border-[#6A89A7] group-hover:text-[#6A89A7]",
                        )}
                      >
                        {String.fromCharCode(65 + idx)}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Advanced Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1">
                    Difficulty Calibration
                  </label>
                  <div className="flex bg-[#f8fafc] p-2 rounded-[2rem] border border-slate-100 shadow-inner">
                    {["easy", "medium", "hard"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() =>
                          setQuestionData({ ...questionData, difficulty: d })
                        }
                        className={cn(
                          "flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500",
                          questionData.difficulty === d
                            ? "bg-[#384959] text-white shadow-2xl"
                            : "text-slate-400 hover:text-[#6A89A7]",
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1">
                    Reward Distribution (Marks)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={
                        isNaN(questionData.marks) ? "" : questionData.marks
                      }
                      onChange={(e) =>
                        setQuestionData({
                          ...questionData,
                          marks:
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value),
                        })
                      }
                      className="w-full p-6 bg-[#f8fafc] rounded-[2rem] border border-slate-100 focus:ring-4 focus:ring-[#6A89A7]/10 outline-none font-black text-[#384959] transition-all shadow-inner"
                      required
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      Points
                    </div>
                  </div>
                </div>
              </div>

              {/* Rationale Engine */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                  <FileText className="h-3 w-3" /> Institutional Rationale
                </label>
                <textarea
                  value={questionData.explanation}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      explanation: e.target.value,
                    })
                  }
                  className="w-full p-8 bg-[#f8fafc] rounded-[2.5rem] border border-slate-100 focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white outline-none font-bold text-[#384959] min-h-[120px] resize-none text-base leading-relaxed transition-all shadow-inner"
                  placeholder="Provide clinical justifications for the correct selection..."
                />
              </div>

              {/* Action Suite */}
              <div className="pt-12 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-6">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="h-20 px-12 text-[#384959] font-black text-[10px] uppercase tracking-widest rounded-[2rem] hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
                >
                  Abort Operation
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-20 bg-[#384959] text-white px-16 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Committing...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" /> Commit Record
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper Icon
function Save({ className }: { className?: string }) {
  return <ShieldCheck className={className} />;
}
