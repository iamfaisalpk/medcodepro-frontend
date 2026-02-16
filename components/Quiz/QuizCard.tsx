import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Clock, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface QuizCardProps {
  quiz: any;
  idx: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="bg-white p-10 rounded-[3rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 hover:shadow-2xl hover:shadow-[#6A89A7]/10 transition-all duration-500 group flex flex-col justify-between h-full"
    >
      <div>
        <div className="h-16 w-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-500/10 group-hover:scale-110 transition-transform duration-500">
          <ClipboardList className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-black text-[#384959] mb-3 tracking-tight leading-tight">
          {quiz.title}
        </h3>
        <p className="text-slate-400 font-bold text-sm mb-8 leading-relaxed">
          {quiz.description ||
            "Comprehensive evaluation for your current module. Covers guidelines, terminology, and practical cases."}
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between py-6 border-t border-slate-50 border-b">
          <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
            <BookOpen className="h-4 w-4" /> {quiz.totalMarks || "10"} Marks
          </div>
          <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
            <Clock className="h-4 w-4" /> {quiz.timeLimit || "20"} Mins
          </div>
        </div>

        <Link href={`/dashboard/quizzes/${quiz._id}`}>
          <button className="w-full py-5 rounded-2xl bg-[#384959] text-white font-black text-xs uppercase tracking-[0.2em] transform transition-all duration-300 hover:bg-[#6A89A7] hover:scale-[1.02] shadow-xl shadow-[#384959]/20 flex items-center justify-center gap-3">
            Begin Audit <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
