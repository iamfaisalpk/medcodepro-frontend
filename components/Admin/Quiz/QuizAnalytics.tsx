import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { PieChart as PieIcon, Layers, Target, Activity } from "lucide-react";

interface QuizAnalyticsProps {
  questions: any[];
  chapters: any[];
}

export const QuizAnalytics: React.FC<QuizAnalyticsProps> = ({
  questions,
  chapters,
}) => {
  const getDifficultyDistribution = () => {
    return ["easy", "medium", "hard"].map((diff) => {
      const count = questions.filter(
        (q: any) => q.difficulty?.toLowerCase() === diff.toLowerCase(),
      ).length;
      const percentage =
        questions.length > 0 ? (count / questions.length) * 100 : 0;
      return { difficulty: diff, count, percentage };
    });
  };

  const getChapterDistribution = () => {
    return chapters.map((ch: any) => {
      const count = questions.filter((q: any) => {
        const qChapterId =
          typeof q.chapterId === "object" ? q.chapterId?._id : q.chapterId;
        return qChapterId === ch._id;
      }).length;
      return { ...ch, questionCount: count };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14"
    >
      <div className="p-10 md:p-14 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl shadow-[#6A89A7]/5 space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Activity className="h-24 w-24" />
        </div>

        <div className="space-y-2">
          <h4 className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em] leading-none">
            Telemetry Spectrum
          </h4>
          <h3 className="text-3xl font-black text-[#384959] tracking-tighter flex items-center gap-4">
            Clinical Difficulty
          </h3>
        </div>

        <div className="space-y-8 relative z-10">
          {getDifficultyDistribution().map(
            ({ difficulty, count, percentage }) => (
              <div key={difficulty} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-sm font-black text-[#384959] capitalize tracking-tight">
                      {difficulty}
                    </span>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">
                      Tier Calibration
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-[#6A89A7] leading-none">
                      {count}
                    </span>
                    <p className="text-[8px] font-black text-[#6A89A7] uppercase tracking-widest mt-1">
                      {Math.round(percentage)}% Allocation
                    </p>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-50 rounded-full border border-slate-100 overflow-hidden shadow-inner p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full shadow-lg",
                      difficulty === "easy"
                        ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                        : difficulty === "medium"
                          ? "bg-gradient-to-r from-orange-400 to-orange-500"
                          : "bg-gradient-to-r from-red-400 to-red-500",
                    )}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="p-10 md:p-14 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl shadow-[#6A89A7]/5 space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-purple-500">
          <Layers className="h-24 w-24" />
        </div>

        <div className="space-y-2">
          <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] leading-none">
            Curriculum Ingestion
          </h4>
          <h3 className="text-3xl font-black text-[#384959] tracking-tighter">
            Module Distribution
          </h3>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar relative z-10 pr-2">
          {getChapterDistribution().map((ch: any, i: number) => (
            <motion.div
              key={ch._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-6 bg-[#f8fafc] hover:bg-white rounded-[2.5rem] border border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-[#6A89A7]/5 transition-all duration-500 group"
            >
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-[#384959] group-hover:text-white transition-all shadow-sm">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-black text-[#384959] text-base tracking-tighter block leading-none">
                    {ch.title}
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1 block leading-none">
                    Module Registry active
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="bg-[#BDDFEC] text-[#6A89A7] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                  {ch.questionCount} Records
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
