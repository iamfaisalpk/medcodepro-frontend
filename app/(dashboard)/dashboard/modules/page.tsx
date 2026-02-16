"use client";

import { useGetChaptersQuery } from "@/store/learningApiSlice";
import {
  Layers,
  BookOpen,
  Clock,
  Activity,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/utils/cn";

export default function ModulesPage() {
  const { data: chaptersData, isLoading } = useGetChaptersQuery(undefined);
  const chapters = chaptersData?.data || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredChapters = chapters.filter(
    (c: any) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center space-y-4">
        <div className="relative">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-[#6A89A7]/10 border-t-[#6A89A7]"></div>
          <Layers className="absolute inset-0 m-auto h-8 w-8 text-[#6A89A7] animate-pulse" />
        </div>
        <p className="font-black text-[#6A89A7] uppercase tracking-[0.3em] text-xs">
          Loading Knowledge Pool
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#BDDFEC]/20 rounded-full border border-[#BDDFEC]/30"
          >
            <span className="h-2 w-2 rounded-full bg-[#6A89A7] animate-pulse"></span>
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-widest">
              Library Access Active
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black text-[#384959] tracking-tighter"
          >
            Learning Modules
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-lg max-w-2xl">
            Access our comprehensive curriculum of medical coding modules, built
            by industry experts for professional mastery.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden xl:flex items-center gap-4"
        >
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-3 rounded-xl transition-all",
                viewMode === "grid"
                  ? "bg-[#384959] text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-600",
              )}
            >
              <Grid2X2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-3 rounded-xl transition-all",
                viewMode === "list"
                  ? "bg-[#384959] text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-600",
              )}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 lg:p-6 rounded-[2.5rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-100 flex flex-col md:flex-row items-center gap-4 lg:gap-8"
      >
        <div className="relative flex-1 block w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within curriculum..."
            className="w-full pl-16 pr-6 py-5 bg-[#f8fafc] border-none rounded-2xl focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white transition-all outline-none font-bold text-slate-600"
          />
        </div>
        <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-100 rounded-2xl text-slate-500 font-black text-xs uppercase tracking-widest hover:border-[#6A89A7] transition-all whitespace-nowrap">
          <SlidersHorizontal className="h-4 w-4" />
          Advanced Filters
        </button>
      </motion.div>

      {/* Modules Grid/List */}
      <div
        className={cn(
          "gap-8",
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "flex flex-col",
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredChapters.map((chapter: any, idx: number) => (
            <motion.div
              key={chapter._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "bg-white rounded-[3rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 hover:shadow-2xl hover:shadow-[#6A89A7]/10 transition-all duration-500 group relative overflow-hidden",
                viewMode === "grid"
                  ? "p-10 flex flex-col justify-between"
                  : "p-8 flex flex-row items-center gap-8",
              )}
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-12 w-12 rounded-full bg-[#f8fafc] flex items-center justify-center text-[#6A89A7] translate-x-4 group-hover:translate-x-0 transition-transform duration-500 shadow-inner">
                  <ChevronRight className="h-6 w-6" />
                </div>
              </div>

              <div
                className={cn(
                  viewMode === "list" && "flex items-center gap-8 flex-1",
                )}
              >
                <div
                  className={cn(
                    "bg-gradient-to-br from-[#BDDFEC]/50 to-[#6A89A7]/10 text-[#6A89A7] rounded-[2rem] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500 shrink-0",
                    viewMode === "grid" ? "h-20 w-20 mb-10" : "h-24 w-24",
                  )}
                >
                  <Layers className="h-10 w-10" />
                </div>

                <div className="flex-1 space-y-4">
                  <h3
                    className={cn(
                      "font-black text-[#384959] tracking-tighter leading-tight group-hover:text-[#6A89A7] transition-colors",
                      viewMode === "grid" ? "text-3xl" : "text-2xl",
                    )}
                  >
                    {chapter.title}
                  </h3>

                  <p className="text-slate-400 font-bold text-sm line-clamp-2 leading-relaxed max-w-md">
                    {chapter.description ||
                      "Master the essential skills and guidelines for this coding domain through structured learning paths."}
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "space-y-8",
                  viewMode === "grid"
                    ? "mt-10 pt-8 border-t border-slate-50"
                    : "w-1/4",
                )}
              >
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <BookOpen className="h-4 w-4" /> {chapter.lessonsCount || 8}{" "}
                    Lessons
                  </div>
                  <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <Clock className="h-4 w-4" />{" "}
                    {chapter.readingTime || "4.5h"}
                  </div>
                </div>

                <Link
                  href={`/dashboard/courses/${chapter._id}`}
                  className="block"
                >
                  <button className="w-full py-5 rounded-2xl bg-[#384959] text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-[#6A89A7] hover:shadow-xl hover:shadow-[#6A89A7]/20 transition-all duration-300 active:scale-95 group-hover:-translate-y-1">
                    Enter Module
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredChapters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-32 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100"
          >
            <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Activity className="h-12 w-12 text-slate-200" />
            </div>
            <h4 className="text-2xl font-black text-slate-400 tracking-tighter mb-2">
              No Matches Found
            </h4>
            <p className="text-slate-300 font-bold max-w-sm mx-auto">
              Try adjusting your filters or search query to find relevant
              modules.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-8 text-[#6A89A7] font-black text-xs uppercase tracking-widest hover:underline"
            >
              Reset Curriculum Search
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
