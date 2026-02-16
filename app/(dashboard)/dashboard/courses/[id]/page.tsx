"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useGetChapterDetailsQuery,
  useGetChapterLessonsQuery,
  useGetLessonDetailQuery,
} from "@/store/learningApiSlice";
import {
  useCompleteLessonMutation,
  useGetUserProgressQuery,
} from "@/store/progressApiSlice";
import {
  Play,
  CheckCircle2,
  ChevronRight,
  FileText,
  Download,
  Video,
  ClipboardList,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Layers,
  BookOpen,
  MonitorPlay,
  Share2,
  Bookmark,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function CourseLearningPage() {
  const { id } = useParams();
  const chapterId = id as string;

  const { data: chapterData, isLoading: chapterLoading } =
    useGetChapterDetailsQuery(chapterId);
  const chapter = chapterData?.data;

  const { data: lessonsData, isLoading: lessonsLoading } =
    useGetChapterLessonsQuery(chapterId);
  const lessons = lessonsData?.data || [];

  const { data: userProgressData } = useGetUserProgressQuery(undefined);
  const userProgress = userProgressData?.data || [];

  const currentChapterProgress = userProgress.find(
    (p: any) => p.chapterId?._id === chapterId,
  );
  const completedLessonIds = currentChapterProgress?.completedLessons || [];

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSyllabusOpen, setSyllabusOpen] = useState(true);

  const { data: lessonData, isLoading: lessonLoading } =
    useGetLessonDetailQuery(activeLessonId as string, {
      skip: !activeLessonId,
    });
  const activeLesson = lessonData?.data;

  const [completeLesson, { isLoading: isCompleting }] =
    useCompleteLessonMutation();

  useEffect(() => {
    if (lessons.length > 0 && !activeLessonId) {
      setActiveLessonId(lessons[0]._id);
    }
  }, [lessons, activeLessonId]);

  const handleComplete = async () => {
    if (!activeLessonId) return;
    try {
      await completeLesson(activeLessonId).unwrap();
      toast.success("Professional Progress Updated!");
    } catch (err) {
      toast.error("Sync failed. Please retry.");
    }
  };

  if (chapterLoading || lessonsLoading) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center space-y-6">
        <div className="relative">
          <div className="h-24 w-24 animate-spin rounded-full border-4 border-[#6A89A7]/10 border-t-[#6A89A7]"></div>
          <MonitorPlay className="absolute inset-0 m-auto h-10 w-10 text-[#6A89A7] animate-pulse" />
        </div>
        <p className="font-black text-[#6A89A7] uppercase tracking-[0.4em] text-xs">
          Initializing Secure Stream
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto min-h-screen relative flex flex-col lg:flex-row gap-12 pb-32">
      {/* Dynamic Syllabus Sidebar */}
      <AnimatePresence>
        {isSyllabusOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full lg:w-[450px] shrink-0 bg-white rounded-[3.5rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 flex flex-col h-fit lg:sticky lg:top-12 overflow-hidden z-20"
          >
            {/* Sidebar Header */}
            <div className="p-10 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl bg-[#384959] flex items-center justify-center text-white shadow-lg">
                  <Layers className="h-6 w-6" />
                </div>
                <button
                  onClick={() => setSyllabusOpen(false)}
                  className="hidden lg:flex h-10 w-10 bg-slate-100 rounded-xl items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-2xl font-black text-[#384959] tracking-tighter leading-tight mb-2">
                {chapter?.title || "Learning Path"}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-widest">
                  {lessons.length} Modules Pool
                </span>
                <div className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  {chapter?.codeRange || "Professional Core"}
                </span>
              </div>
            </div>

            {/* Syllabus Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar max-h-[60vh]">
              {lessons.map((l: any, idx: number) => {
                const isCompleted = completedLessonIds.includes(l._id);
                const isActive = activeLessonId === l._id;
                return (
                  <motion.button
                    key={l._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveLessonId(l._id)}
                    className={cn(
                      "w-full flex items-center gap-5 p-6 rounded-[2rem] transition-all duration-500 group text-left relative overflow-hidden",
                      isActive
                        ? "bg-[#384959] text-white shadow-2xl shadow-[#384959]/20"
                        : "bg-transparent text-slate-500 hover:bg-slate-50",
                    )}
                  >
                    <div
                      className={cn(
                        "h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500",
                        isActive
                          ? "bg-white/10 text-white"
                          : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-lg",
                      )}
                    >
                      {l.videoUrl ? (
                        <Play
                          className={cn("h-5 w-5", isActive && "fill-current")}
                        />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-[15px] font-black tracking-tight line-clamp-1 mb-1",
                          isActive ? "text-white" : "text-[#384959]",
                        )}
                      >
                        {l.title}
                      </p>
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "text-[9px] font-black uppercase tracking-widest",
                            isActive ? "text-white/40" : "text-slate-300",
                          )}
                        >
                          0{idx + 1} • {l.duration || "15"} MIN
                        </span>
                        {isCompleted && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 drop-shadow-sm" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Sidebar Footer Link */}
            <div className="p-8 border-t border-slate-100 italic text-center">
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                Verify expertise in Audit section
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Player & Content Engine */}
      <div className="flex-1 space-y-12">
        {/* Toggle / Breadcrumbs */}
        {!isSyllabusOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSyllabusOpen(true)}
            className="bg-white px-8 py-4 rounded-2xl border border-slate-100 shadow-xl shadow-[#6A89A7]/5 flex items-center gap-3 text-[#6A89A7] font-black text-xs uppercase tracking-widest hover:bg-[#6A89A7] hover:text-white transition-all active:scale-95"
          >
            <Menu className="h-4 w-4" /> Open Syllabus
          </motion.button>
        )}

        {lessonLoading ? (
          <div className="h-[600px] w-full bg-slate-100 rounded-[4rem] animate-pulse flex items-center justify-center border-4 border-white shadow-2xl">
            <Video className="h-24 w-24 text-slate-200" />
          </div>
        ) : activeLesson ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            {/* Cinematic Video Player */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#6A89A7] to-[#384959] rounded-[4rem] opacity-20 blur-2xl -z-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="aspect-video w-full bg-[#0f172a] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(30,41,59,0.3)] overflow-hidden border-[10px] border-white relative">
                {activeLesson.videoUrl ? (
                  <iframe
                    src={
                      activeLesson.videoUrl.includes("youtube.com")
                        ? activeLesson.videoUrl.replace("watch?v=", "embed/")
                        : activeLesson.videoUrl
                    }
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-[#1e293b] to-[#0f172a]">
                    <div className="h-40 w-40 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-3xl border border-white/10 group-hover:scale-110 transition-transform duration-1000">
                      <Play className="h-16 w-16 text-[#BDDFEC] fill-current" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-white font-black tracking-[0.3em] uppercase text-xs">
                        Clinical Lecture Stream
                      </p>
                      <p className="text-slate-500 font-bold">
                        Visual content pending synchronization.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Control Suite */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <motion.span
                    key={activeLesson._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-6 py-2.5 bg-[#BDDFEC]/20 text-[#6A89A7] text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-[#BDDFEC]/40"
                  >
                    Live Lesson Feed
                  </motion.span>
                  {completedLessonIds.includes(activeLesson._id) && (
                    <span className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="h-3 w-3" /> Mastered
                    </span>
                  )}
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-[#384959] tracking-tighter leading-none">
                  {activeLesson.title}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button className="h-16 w-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#6A89A7] transition-all shadow-xl shadow-slate-100/50 active:scale-95">
                  <Bookmark className="h-6 w-6" />
                </button>
                <button className="h-16 w-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#6A89A7] transition-all shadow-xl shadow-slate-100/50 active:scale-95">
                  <Share2 className="h-6 w-6" />
                </button>
                <button
                  onClick={handleComplete}
                  disabled={
                    completedLessonIds.includes(activeLesson._id) ||
                    isCompleting
                  }
                  className={cn(
                    "h-16 px-10 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center gap-3",
                    completedLessonIds.includes(activeLesson._id)
                      ? "bg-emerald-50 text-emerald-500 border border-emerald-100"
                      : "bg-[#384959] text-white hover:bg-[#6A89A7] shadow-[#384959]/20",
                  )}
                >
                  {isCompleting ? (
                    <div className="h-5 w-5 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                  ) : completedLessonIds.includes(activeLesson._id) ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" /> Verified Completion
                    </>
                  ) : (
                    "Mark Completion"
                  )}
                </button>
              </div>
            </div>

            {/* Sophisticated Notes & Resources */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              <div className="xl:col-span-2 bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-[#384959] tracking-tighter mb-10 flex items-center gap-4">
                    <FileText className="h-8 w-8 text-[#6A89A7]" />
                    Professional Guidelines
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        activeLesson.notes ||
                        '<p class="text-slate-300 font-bold italic text-lg leading-relaxed">No additional guidance provided for this module segment.</p>',
                    }}
                    className="text-slate-500 font-bold leading-loose text-xl prose-p:mb-8"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-10 bg-white rounded-[3rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 text-left">
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8">
                    Lesson Assets
                  </h4>
                  <div className="space-y-4">
                    <button className="w-full p-6 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-center justify-between group hover:bg-[#384959] transition-all duration-500">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                          <Download className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-black text-[#384959] group-hover:text-white transition-colors">
                            Coding Manual
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            PDF • 4.2 MB
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-white" />
                    </button>

                    <Link href="/dashboard/quizzes" className="block">
                      <button className="w-full p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-center gap-4 group hover:bg-orange-500 transition-all duration-500">
                        <ClipboardList className="h-5 w-5 text-orange-500 group-hover:text-white" />
                        <span className="text-xs font-black text-orange-600 uppercase tracking-widest group-hover:text-white">
                          Start Practice Audit
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#BDDFEC] to-[#6A89A7] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                  <Activity className="absolute bottom-[-20%] right-[-10%] h-48 w-48 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                  <h5 className="text-xl font-black tracking-tight mb-4 leading-tight">
                    Expert Consultation
                  </h5>
                  <p className="text-xs text-white/80 font-bold leading-relaxed mb-8">
                    "Always correlate CPT nomenclature with institutional
                    guidelines for accurate reimbursement."
                  </p>
                  <button className="w-full py-4 bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 hover:bg-white/30 transition-all">
                    Submit Inquiry
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-10">
            <div className="h-32 w-32 bg-slate-50 rounded-[3.5rem] flex items-center justify-center shadow-inner">
              <BookOpen className="h-16 w-16 text-slate-200" />
            </div>
            <div className="space-y-4 max-w-sm">
              <h2 className="text-4xl font-black text-[#384959] tracking-tighter leading-none">
                Choose Your Lesson
              </h2>
              <p className="text-slate-400 font-bold text-lg leading-relaxed">
                Select a curriculum segment from the syllabus to initiate your
                high-definition learning stream.
              </p>
            </div>
            <motion.button
              whileHover={{ y: -5 }}
              onClick={() => setSyllabusOpen(true)}
              className="px-10 py-5 bg-[#384959] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-[#384959]/20"
            >
              Open Syllabus Explorer
            </motion.button>
          </div>
        )}
      </div>

      {/* Mobile Syllabus FAB */}
      {!isSyllabusOpen && (
        <button
          onClick={() => setSyllabusOpen(true)}
          className="lg:hidden fixed bottom-10 right-10 h-20 w-20 bg-[#384959] text-white rounded-full shadow-[0_20px_60px_-10px_rgba(56,73,89,0.5)] flex items-center justify-center z-50 active:scale-90 transition-transform"
        >
          <Layers className="h-8 w-8" />
        </button>
      )}
    </div>
  );
}
