import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  FileBarChart,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

interface QuizResultProps {
  result: any;
  questions: any[];
}

export const QuizResult: React.FC<QuizResultProps> = ({
  result,
  questions,
}) => {
  const router = useRouter();

  if (!result) return null;

  const isPassing = result.percentage >= 80;

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 space-y-24">
      {/* Hero Result Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[5rem] p-12 lg:p-24 shadow-2xl shadow-[#6A89A7]/10 border border-slate-100 relative overflow-hidden"
      >
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-4",
            isPassing
              ? "bg-gradient-to-r from-emerald-400 to-teal-500"
              : "bg-gradient-to-r from-orange-400 to-red-500",
          )}
        />

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10 }}
            className={cn(
              "h-32 w-32 rounded-[3.5rem] flex items-center justify-center shadow-2xl mb-12",
              isPassing
                ? "bg-emerald-50 text-emerald-500 shadow-emerald-500/20"
                : "bg-orange-50 text-orange-500 shadow-orange-500/20",
            )}
          >
            {isPassing ? (
              <Trophy className="h-16 w-16" />
            ) : (
              <ShieldAlert className="h-16 w-16" />
            )}
          </motion.div>

          <h1 className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter mb-6">
            {isPassing ? "Audit Verified Successfully" : "Knowledge Base Audit"}
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-sm mb-20">
            Professional Performance Analysis
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mb-20">
            <div className="bg-[#f8fafc] p-12 rounded-[3.5rem] border border-slate-100 shadow-inner group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <Target className="h-6 w-6 text-[#6A89A7] mx-auto mb-6" />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">
                Mastery Index
              </p>
              <p className="text-6xl font-black text-[#384959] tracking-tighter">
                {Math.round(result.percentage)}%
              </p>
            </div>
            <div className="bg-[#f8fafc] p-12 rounded-[3.5rem] border border-slate-100 shadow-inner group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-6" />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">
                Points Verified
              </p>
              <p className="text-6xl font-black text-emerald-500 tracking-tighter">
                {result.score}/{result.total}
              </p>
            </div>
            <div className="bg-[#f8fafc] p-12 rounded-[3.5rem] border border-slate-100 shadow-inner group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <Clock className="h-6 w-6 text-blue-500 mx-auto mb-6" />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">
                Efficiency
              </p>
              <p className="text-6xl font-black text-blue-500 tracking-tighter">
                {Math.floor(result.timeTaken / 60)}
                <span className="text-2xl ml-1">M</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 w-fit mx-auto">
            <button
              onClick={() => router.push("/dashboard/quizzes")}
              className="bg-[#384959] text-white px-16 py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 active:scale-95 group"
            >
              System Overview{" "}
              <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => window.print()}
              className="bg-white text-[#384959] border-2 border-slate-100 px-16 py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:border-[#6A89A7] hover:text-[#6A89A7] transition-all active:scale-95"
            >
              Print Transcript
            </button>
          </div>
        </div>
      </motion.div>

      {/* Audit Feed Review */}
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-10">
          <div className="text-left">
            <h2 className="text-3xl lg:text-5xl font-black text-[#384959] tracking-tighter">
              Critical Logic Review
            </h2>
            <p className="text-slate-400 font-bold text-lg mt-2">
              Historical case validation and clinical justifications.
            </p>
          </div>
          <div className="h-20 w-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-[#6A89A7] border border-slate-50">
            <FileBarChart className="h-8 w-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {result.results?.length > 0 ? (
            result.results.map((res: any, idx: number) => {
              const questionData = questions.find(
                (q: any) => q._id === res.questionId,
              );
              if (!questionData) return null;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "p-12 lg:p-20 rounded-[4rem] border-[3px] bg-white shadow-2xl transition-all relative overflow-hidden text-left",
                    res.isCorrect
                      ? "border-emerald-50 shadow-emerald-500/5"
                      : "border-orange-50 shadow-orange-500/5",
                  )}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16 px-4">
                    <div className="flex items-center gap-8">
                      <span className="h-16 w-16 rounded-3xl bg-[#384959] flex items-center justify-center font-black text-xl text-white shadow-xl shadow-[#384959]/20">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="text-2xl font-black text-[#384959] tracking-tighter uppercase">
                          Case Study Analysis
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              res.isCorrect
                                ? "bg-emerald-500"
                                : "bg-orange-500",
                            )}
                          />
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            Entry ID: {res.questionId.slice(-6)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {res.isCorrect ? (
                      <span className="bg-emerald-500 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/10 flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4" /> Logic Verified
                      </span>
                    ) : (
                      <span className="bg-orange-500 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-500/10 flex items-center gap-3">
                        <ShieldAlert className="h-4 w-4" /> Revision Advised
                      </span>
                    )}
                  </div>

                  <div className="space-y-12">
                    <div className="bg-[#f8fafc] p-12 rounded-[3.5rem] border border-slate-100 shadow-inner group">
                      <p className="text-2xl lg:text-3xl font-black text-[#384959] leading-[1.25] tracking-tight group-hover:text-[#6A89A7] transition-colors duration-500">
                        {questionData.question}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {questionData.options.map(
                        (option: string, oIdx: number) => {
                          const isSelected = res.selectedAnswer === oIdx;
                          const isCorrect = questionData.correctAnswer === oIdx;

                          return (
                            <div
                              key={oIdx}
                              className={cn(
                                "p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex items-center gap-6",
                                isCorrect
                                  ? "bg-emerald-500 text-white border-emerald-500 shadow-2xl shadow-emerald-500/20"
                                  : isSelected
                                    ? "bg-orange-500 text-white border-orange-500 shadow-2xl shadow-orange-500/20"
                                    : "bg-white border-slate-100 text-slate-400 opacity-60",
                              )}
                            >
                              <span
                                className={cn(
                                  "h-12 w-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all",
                                  isCorrect || isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-100 text-slate-300",
                                )}
                              >
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="font-bold text-lg tracking-tight flex-1">
                                {option}
                              </span>

                              {isCorrect && !isSelected && (
                                <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                    True Key
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>

                    <div className="pt-12 border-t border-slate-100 flex flex-col gap-6">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-6 w-6 text-[#6A89A7]" />
                        <h4 className="text-[12px] font-black text-[#384959] uppercase tracking-[0.3em]">
                          Institutional Rationale
                        </h4>
                      </div>
                      <div className="bg-blue-50/50 p-12 lg:p-16 rounded-[4rem] border border-blue-100/50 relative">
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                          <Target className="h-32 w-32" />
                        </div>
                        <p className="text-slate-600 leading-loose font-bold text-xl italic relative z-10">
                          {res.explanation ||
                            "Clinical narrative Pending faculty synchronization."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-24 text-center bg-white rounded-[5rem] border-2 border-dashed border-slate-100 italic font-black text-slate-300 text-xl tracking-tighter">
              Performance metrics archive is unavailable for this session.
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-[#384959] text-white h-20 w-20 rounded-full mx-auto flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
        >
          <ChevronRight className="h-8 w-8 -rotate-90" />
        </motion.button>
      </div>
    </div>
  );
};
