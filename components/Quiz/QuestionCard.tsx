import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { ShieldCheck, HelpCircle } from "lucide-react";

interface QuestionCardProps {
  question: any;
  selectedOption: number | undefined;
  onSelectOption: (questionId: string, optionIdx: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption,
}) => {
  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -15 }}
      className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-100 relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 -z-10" />

      <div className="flex flex-col gap-12 text-left relative z-10">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#BDDFEC]/20 text-[#6A89A7] text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-full border border-[#BDDFEC]/40 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Validation Check ({question.marks || 1} Points)
            </span>
            <span className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-full border border-slate-100">
              {question.difficulty || "Professional"} Standard
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-[#384959] leading-[1.15] tracking-tighter">
            {question.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {question.options.map((option: string, idx: number) => {
            const isSelected = selectedOption === idx;
            return (
              <motion.button
                key={idx}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectOption(question._id, idx)}
                className={cn(
                  "flex items-center gap-8 p-8 lg:p-10 rounded-[2.5rem] border-[3px] transition-all duration-500 text-left group relative",
                  isSelected
                    ? "border-[#384959] bg-[#384959] text-white shadow-2xl shadow-[#384959]/20"
                    : "border-slate-50 bg-[#f8fafc] hover:border-[#6A89A7]/30 hover:bg-white text-slate-500",
                )}
              >
                <div
                  className={cn(
                    "h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 shadow-sm",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-white text-slate-300 border border-slate-100 group-hover:border-[#6A89A7] group-hover:text-[#6A89A7]",
                  )}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span
                  className={cn(
                    "text-xl font-bold tracking-tight transition-colors duration-500",
                    isSelected
                      ? "text-white"
                      : "text-slate-500 group-hover:text-[#384959]",
                  )}
                >
                  {option}
                </span>

                {isSelected && (
                  <div className="absolute right-10 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                      Stage Active
                    </span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
