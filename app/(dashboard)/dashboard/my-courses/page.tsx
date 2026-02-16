"use client";

import { useGetChaptersQuery } from "@/store/learningApiSlice";
import {
  BookOpen,
  Star,
  Clock,
  ArrowRight,
  Layers,
  Layout,
  ChevronRight,
  Activity,
  BookCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function MyCoursesPage() {
  const { data: chaptersData, isLoading } = useGetChaptersQuery(undefined);
  const chapters = chaptersData?.data || [];

  if (isLoading) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center space-y-4">
        <div className="relative">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-[#6A89A7]/10 border-t-[#6A89A7]"></div>
          <BookCheck className="absolute inset-0 m-auto h-8 w-8 text-[#6A89A7] animate-pulse" />
        </div>
        <p className="font-black text-[#6A89A7] uppercase tracking-[0.3em] text-xs font-serif">
          Syncing Enrollments
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-16 pb-24">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-xl bg-[#6A89A7]/10 flex items-center justify-center text-[#6A89A7]">
              <Layout className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em]">
              Institutional Dashboard
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter"
          >
            Your <span className="text-[#6A89A7]">Personal</span> Learning Track
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-xl max-w-2xl leading-relaxed">
            Manage your enrolled medical coding specializations and track your
            historical progress through the professional curriculum.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden xl:flex bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-[#6A89A7]/5 items-center gap-8"
        >
          <div className="text-center">
            <p className="text-3xl font-black text-[#384959] tracking-tighter">
              {chapters.length}
            </p>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
              Active Tracks
            </p>
          </div>
          <div className="h-12 w-[1px] bg-slate-100" />
          <div className="text-center">
            <p className="text-3xl font-black text-[#6A89A7] tracking-tighter">
              Pro
            </p>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
              Account Level
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        <AnimatePresence>
          {chapters.length > 0 ? (
            chapters.map((chapter: any, idx: number) => (
              <motion.div
                key={chapter._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[3.5rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 overflow-hidden hover:shadow-2xl hover:shadow-[#6A89A7]/15 transition-all duration-700 flex flex-col h-full"
              >
                {/* Premium Visual Header */}
                <div className="h-64 bg-[#384959] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6A89A7]/40 to-[#384959]/90 z-10" />
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-20"
                  />

                  <Layers className="h-32 w-32 text-white/10 relative z-30 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000" />

                  <div className="absolute top-10 left-10 z-40">
                    <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 rounded-2xl border border-white/20 shadow-2xl">
                      {chapter.codeRange || "C - " + (idx + 1)}
                    </span>
                  </div>

                  <div className="absolute bottom-0 right-0 p-8 z-40">
                    <div className="h-16 w-16 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-10 group-hover:translate-y-0">
                      <ChevronRight className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* Sophisticated Content Area */}
                <div className="p-12 space-y-8 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        Enrollment Active
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-[#384959] tracking-tighter group-hover:text-[#6A89A7] transition-all duration-500 leading-tight">
                      {chapter.title}
                    </h3>
                    <p className="text-slate-400 font-bold text-base leading-relaxed line-clamp-3">
                      {chapter.description ||
                        "Master industry-standard coding protocols and clinical nomenclature in this specialized professional track."}
                    </p>
                  </div>

                  <div className="pt-10 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="h-4 w-4 text-slate-300" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          {chapter.lessonsCount || 12} Lessons
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/courses/${chapter._id}`}
                      className="w-full sm:w-fit bg-[#384959] text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 active:scale-95 group/btn"
                    >
                      Resume Path{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-40 text-center space-y-10 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 flex flex-col items-center"
            >
              <div className="h-28 w-28 bg-slate-50 rounded-[2.5rem] shadow-inner flex items-center justify-center text-slate-200">
                <BookOpen className="h-14 w-14" />
              </div>
              <div className="space-y-4 max-w-sm">
                <h2 className="text-3xl font-black text-[#384959] tracking-tighter">
                  Curriculum Engine Idle
                </h2>
                <p className="text-slate-400 font-bold text-lg leading-relaxed">
                  Our clinical faculty is currently updating your professional
                  modules. Check back soon for new content.
                </p>
              </div>
              <Link href="/dashboard/modules">
                <button className="px-10 py-5 bg-[#384959] text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#6A89A7] transition-all shadow-xl shadow-[#384959]/10">
                  Explore Global Modules
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
