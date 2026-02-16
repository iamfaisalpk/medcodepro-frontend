import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface QuizHeaderProps {
  title: string;
  currentQuestionIdx: number;
  totalQuestions: number;
  timeLeft: number;
  answers: Record<string, number>;
  questions: any[];
  onMoveToQuestion: (idx: number) => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  currentQuestionIdx,
  totalQuestions,
  timeLeft,
  answers,
  questions,
  onMoveToQuestion,
}) => {
  const progressPercentage = ((currentQuestionIdx + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <div className="h-24 w-24 bg-gradient-to-br from-[#384959] to-[#2c3a47] rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-[#384959]/30 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <ClipboardList className="h-12 w-12" />
          </div>
          <div className="text-left">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#6A89A7] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-3 border border-blue-100">
              Medical Coding Audit
            </span>
            <h1 className="text-4xl font-black text-[#384959] tracking-tight leading-none">
              {title}
            </h1>
            <p className="text-slate-400 font-bold tracking-tight mt-2 uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Audit Session
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8 bg-white px-10 py-7 rounded-[3rem] border border-slate-100 text-[#384959] shadow-2xl shadow-[#6A89A7]/10 group transition-all hover:shadow-emerald-500/10">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Time Remaining
            </span>
            <span className="text-4xl font-black tracking-tighter tabular-nums text-[#384959] group-hover:text-emerald-500 transition-colors">
              {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="p-4 bg-orange-50 rounded-2xl text-orange-500 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
            <Clock className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              Examination Progress
            </h2>
            <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-[#384959]">
              {currentQuestionIdx + 1} / {totalQuestions}
            </span>
          </div>
          <span className="text-sm font-black text-[#384959]">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner p-1.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            className="h-full bg-gradient-to-r from-[#6A89A7] via-[#384959] to-[#2c3a47] rounded-full shadow-lg relative"
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Question Badge Grid */}
      <div className="flex flex-wrap gap-3 pt-2">
        {questions.map((q, idx) => {
          const isAnswered = answers[q._id] !== undefined;
          const isActive = currentQuestionIdx === idx;

          return (
            <button
              key={q._id}
              onClick={() => onMoveToQuestion(idx)}
              className={cn(
                "h-12 w-12 rounded-2xl font-black text-xs transition-all duration-300 relative group overflow-hidden border-2",
                isActive
                  ? "bg-[#384959] text-white border-[#384959] scale-110 shadow-lg shadow-[#384959]/30 z-10"
                  : isAnswered
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                    : "bg-white text-slate-400 border-slate-100 hover:border-[#6A89A7] hover:text-[#6A89A7]",
              )}
            >
              {isAnswered && !isActive && (
                <div className="absolute top-1 right-1">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
              )}
              {idx + 1}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-4 bg-white/40 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
