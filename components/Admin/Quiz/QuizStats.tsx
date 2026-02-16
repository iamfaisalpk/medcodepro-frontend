import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  Database,
  BrainCircuit,
  Trophy,
  Layers,
  Activity,
  Target,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface QuizStatsProps {
  questions: any[];
  chapters: any[];
}

export const QuizStats: React.FC<QuizStatsProps> = ({
  questions,
  chapters,
}) => {
  const stats = [
    {
      label: "Vault Capacity",
      val: questions.length,
      icon: Database,
      color: "text-[#6A89A7]",
      bg: "bg-[#BDDFEC]/20",
      desc: "Committed records",
    },
    {
      label: "Critical Active",
      val: questions.filter((q: any) => q.isActive !== false).length,
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      desc: "Validation stream",
    },
    {
      label: "Logic Velocity",
      val: questions.length > 0 ? "84%" : "N/A",
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-50",
      desc: "System efficiency",
    },
    {
      label: "Structural Units",
      val: chapters.length,
      icon: Layers,
      color: "text-purple-500",
      bg: "bg-purple-50",
      desc: "Curriculum layers",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
      {stats.map((s, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
            <s.icon className="h-20 w-20" />
          </div>

          <div className="flex flex-col gap-8 relative z-10">
            <div
              className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center shadow-inner transition-all duration-500",
                s.bg,
                s.color,
                "group-hover:bg-[#384959] group-hover:text-white group-hover:shadow-xl",
              )}
            >
              <s.icon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">
                {s.label}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl md:text-5xl font-black text-[#384959] tracking-tighter">
                  {s.val}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {s.desc}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
