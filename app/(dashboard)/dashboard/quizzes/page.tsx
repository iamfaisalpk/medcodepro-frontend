"use client";

import { useGetQuizzesQuery } from "@/store/quizApiSlice";
import {
  ClipboardList,
  Search,
  Activity,
  SlidersHorizontal,
  BookOpen,
  Clock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/utils/cn";

export default function QuizzesPage() {
  const { data: quizzesData, isLoading } = useGetQuizzesQuery(undefined);
  const quizzes = quizzesData?.data || [];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuizzes = quizzes.filter(
    (q: any) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.description &&
        q.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  if (isLoading) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center space-y-4">
        <div className="relative">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-[#6A89A7]/10 border-t-[#6A89A7]"></div>
          <ClipboardList className="absolute inset-0 m-auto h-8 w-8 text-[#6A89A7] animate-pulse" />
        </div>
        <p className="font-black text-[#6A89A7] uppercase tracking-[0.3em] text-xs">
          Accessing Audit Vault
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-24">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 rounded-full border border-orange-500/20"
          >
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">
              Certification Path Active
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter"
          >
            Audit & <span className="text-[#6A89A7]">Verification</span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-xl max-w-2xl leading-relaxed">
            Validate your mastery with our professional-grade audit engine.
            Designed to mirror real-world medical coding scenarios.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-100 flex items-center gap-6"
        >
          <div className="h-16 w-16 bg-[#384959] rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Activity className="h-8 w-8" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1 text-left">
              System Health
            </p>
            <p className="text-lg font-black text-[#384959] tracking-tight">
              Audit Engine 2.0 Active
            </p>
          </div>
        </motion.div>
      </div>

      {/* Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-[3rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-100 flex flex-col md:flex-row items-center gap-6"
      >
        <div className="relative flex-1 block w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for specific audits by chapter or title..."
            className="w-full pl-16 pr-6 py-5 bg-[#f8fafc] border-none rounded-[2rem] focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white transition-all outline-none font-bold text-slate-600"
          />
        </div>
        <button className="flex items-center gap-3 px-10 py-5 bg-[#384959] rounded-[2rem] text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-[#6A89A7] transition-all shadow-xl shadow-[#384959]/10">
          <SlidersHorizontal className="h-4 w-4" />
          Audit Config
        </button>
      </motion.div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredQuizzes.map((quiz: any, idx: number) => (
            <motion.div
              key={quiz._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-10 rounded-[3.5rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 hover:shadow-2xl hover:shadow-[#6A89A7]/10 transition-all duration-700 group flex flex-col justify-between h-auto relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 translate-x-12 translate-y-[-12px] opacity-20 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <Activity className="h-16 w-16 text-[#6A89A7]/20" />
              </div>

              <div>
                <div className="h-20 w-20 bg-gradient-to-br from-orange-400 to-orange-600 p-[2px] rounded-[2rem] mb-10 shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                  <div className="h-full w-full bg-white rounded-[1.9rem] flex items-center justify-center">
                    <ClipboardList className="h-10 w-10 text-orange-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em] block mb-2">
                    Module Audit
                  </span>
                  <h3 className="text-3xl font-black text-[#384959] tracking-tighter leading-[1.1] group-hover:text-[#6A89A7] transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm line-clamp-2 leading-relaxed max-w-xs">
                    {quiz.description ||
                      "Validate your coding accuracy with this module-specific audit challenge."}
                  </p>
                </div>
              </div>

              <div className="mt-12 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f8fafc] p-5 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 group-hover:bg-white transition-colors duration-500">
                    <BookOpen className="h-5 w-5 text-[#6A89A7]" />
                    <span className="text-[10px] font-black text-[#384959] uppercase tracking-widest">
                      {quiz.totalMarks || "10"} Qs
                    </span>
                  </div>
                  <div className="bg-[#f8fafc] p-5 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 group-hover:bg-white transition-colors duration-500">
                    <Clock className="h-5 w-5 text-[#6A89A7]" />
                    <span className="text-[10px] font-black text-[#384959] uppercase tracking-widest">
                      {quiz.timeLimit || "20"} Min
                    </span>
                  </div>
                </div>

                <Link href={`/dashboard/quizzes/${quiz._id}`} className="block">
                  <button className="w-full py-6 rounded-2xl bg-[#384959] text-white font-black text-xs uppercase tracking-[0.2em] transform transition-all duration-500 hover:bg-[#6A89A7] shadow-xl shadow-[#384959]/20 flex items-center justify-center gap-4 group/btn">
                    Initialize Audit{" "}
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredQuizzes.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-8">
            <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 shadow-inner translate-y-[-10px]">
              <ClipboardList className="h-12 w-12" />
            </div>
            <div className="space-y-4 max-w-sm">
              <h4 className="text-2xl font-black text-slate-400 tracking-tighter">
                No Audits Available
              </h4>
              <p className="text-slate-300 font-bold leading-relaxed">
                Either clear your search or check back later for newly scheduled
                module audits.
              </p>
            </div>
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#6A89A7] font-black text-xs uppercase tracking-[0.2em] hover:underline pt-4"
            >
              Reset Audit Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
