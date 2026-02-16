"use client";

import { useState } from "react";
import {
  useGetAdminChaptersQuery,
  useCreateChapterMutation,
  useCreateLessonMutation,
  useDeleteChapterMutation,
} from "@/store/adminApiSlice";
import {
  Plus,
  BookOpen,
  Layers,
  Trash2,
  Settings,
  X,
  Activity,
  Layout,
  Rocket,
  Edit3,
  ChevronDown,
  MonitorPlay,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { cn } from "@/utils/cn";

export default function ManageCoursesPage() {
  const { data: chaptersData, isLoading } = useGetAdminChaptersQuery({});
  const chapters = chaptersData?.data || [];

  const [createChapter, { isLoading: isCreatingChapter }] =
    useCreateChapterMutation();
  const [createLesson, { isLoading: isCreatingLesson }] =
    useCreateLessonMutation();
  const [deleteChapter] = useDeleteChapterMutation();

  const [isChapterModalOpen, setChapterModalOpen] = useState(false);
  const [isLessonModalOpen, setLessonModalOpen] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState("");

  // Form states
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterCodeRange, setNewChapterCodeRange] = useState("");
  const [newChapterOrder, setNewChapterOrder] = useState(1);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [lessonOrder, setLessonOrder] = useState(1);

  const handleCreateChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createChapter({
        title: newChapterTitle,
        codeRange: newChapterCodeRange,
        order: Number(newChapterOrder),
        isPublished: true,
      }).unwrap();
      toast.success("Professional Module Created!");
      setChapterModalOpen(false);
      resetChapterForm();
    } catch (err: any) {
      toast.error(err.data?.error || "Validation failed.");
    }
  };

  const resetChapterForm = () => {
    setNewChapterTitle("");
    setNewChapterCodeRange("");
    setNewChapterOrder(chapters.length + 1);
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLesson({
        chapterId: selectedChapterId,
        title: lessonTitle,
        videoUrl: lessonVideoUrl,
        order: Number(lessonOrder),
        isPreview: false,
      }).unwrap();
      toast.success("Curriculum segment added!");
      setLessonModalOpen(false);
      setLessonTitle("");
      setLessonVideoUrl("");
    } catch (err: any) {
      toast.error(err.data?.error || "Segment failed to sync.");
    }
  };

  const handleDeleteChapter = async (id: string, title: string) => {
    if (
      confirm(
        `CRITICAL: Are you sure you want to purge "${title}"? This operation cannot be undone and will delete all associated curriculum data.`,
      )
    ) {
      try {
        await deleteChapter(id).unwrap();
        toast.success("Module successfully purged from records.");
      } catch (err) {
        toast.error("Operation failed.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center space-y-6">
        <div className="relative">
          <div className="h-24 w-24 animate-spin rounded-full border-4 border-[#384959]/10 border-t-[#384959]"></div>
          <Layout className="absolute inset-0 m-auto h-10 w-10 text-[#384959] animate-pulse" />
        </div>
        <p className="font-black text-[#384959] uppercase tracking-[0.4em] text-xs">
          Syncing Curriculum Pool
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-16 pb-32">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#384959]/5 rounded-full border border-[#384959]/10"
          >
            <Rocket className="h-4 w-4 text-[#384959]" />
            <span className="text-[10px] font-black text-[#384959] uppercase tracking-[0.3em]">
              Architect Mode Active
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter"
          >
            Curriculum <span className="text-[#6A89A7]">Forge</span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-xl max-w-2xl leading-relaxed">
            Architect, organize, and publish professional medical coding modules
            to the global learning ecosystem.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button
            onClick={() => {
              setNewChapterOrder(chapters.length + 1);
              setChapterModalOpen(true);
            }}
            className="h-20 px-10 bg-[#384959] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 flex items-center gap-4 active:scale-95 group"
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
            Initialize New Module
          </button>
        </motion.div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 gap-12">
        <AnimatePresence>
          {chapters.map((chapter: any, idx: number) => (
            <motion.div
              key={chapter._id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[4rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 overflow-hidden group"
            >
              {/* Module Banner */}
              <div className="p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-10 border-b border-slate-100 bg-gradient-to-br from-slate-50/50 to-white">
                <div className="flex items-center gap-10">
                  <div className="h-20 w-20 bg-[#384959] rounded-[2rem] flex items-center justify-center text-white font-serif text-3xl font-black shadow-xl shrink-0">
                    {chapter.order}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">
                        Global Publication Active
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-[#384959] tracking-tighter leading-none">
                      {chapter.title}
                    </h3>
                    <p className="text-xs text-[#6A89A7] font-black uppercase tracking-[0.3em] mt-3">
                      {chapter.codeRange || "PRO CORE CONTENT"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="h-14 px-8 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:border-[#6A89A7] hover:text-[#6A89A7] transition-all">
                    <Edit3 className="h-4 w-4" /> Config
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteChapter(chapter._id, chapter.title)
                    }
                    className="h-14 w-14 rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-100/50"
                  >
                    <Trash2 className="h-5 w-5 mx-auto" />
                  </button>
                </div>
              </div>

              {/* Lesson Slots */}
              <div className="p-10 lg:p-14 bg-[#f8fafc]/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {/* List existing lessons if you had them in this view, 
                        or just provide the add button as in the original */}
                  <div
                    onClick={() => {
                      setSelectedChapterId(chapter._id);
                      setLessonModalOpen(true);
                    }}
                    className="p-10 rounded-[3rem] bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-6 group cursor-pointer hover:border-[#6A89A7] hover:bg-white transition-all shadow-sm hover:shadow-xl hover:shadow-[#6A89A7]/10"
                  >
                    <div className="h-16 w-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-300 group-hover:bg-[#384959] group-hover:text-white transition-all shadow-inner">
                      <Plus className="h-8 w-8" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#384959]">
                        Provision Segment
                      </p>
                      <p className="text-[9px] font-bold text-slate-300 group-hover:text-slate-400">
                        Add to curriculum pool
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {chapters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center space-y-10 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 flex flex-col items-center"
          >
            <div className="h-32 w-32 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200 shadow-inner">
              <Layers className="h-14 w-14" />
            </div>
            <div className="space-y-4 max-w-sm">
              <h2 className="text-3xl font-black text-[#384959] tracking-tighter">
                Forge Repository Empty
              </h2>
              <p className="text-slate-400 font-bold text-lg leading-relaxed">
                Your professional repository is awaiting its first architectural
                module.
              </p>
            </div>
            <button
              onClick={() => setChapterModalOpen(true)}
              className="px-12 py-5 bg-[#384959] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-[#384959]/10"
            >
              Initialize Primary Module
            </button>
          </motion.div>
        )}
      </div>

      {/* Chapter Modal */}
      <AnimatePresence>
        {isChapterModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isCreatingChapter && setChapterModalOpen(false)}
              className="absolute inset-0 bg-[#384959]/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-[4rem] p-12 lg:p-20 shadow-[0_50px_100px_-20px_rgba(56,73,89,0.3)] border border-white"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em]">
                    Institutional Records
                  </p>
                  <h2 className="text-4xl font-black text-[#384959] tracking-tighter">
                    New Module
                  </h2>
                </div>
                {!isCreatingChapter && (
                  <button
                    onClick={() => setChapterModalOpen(false)}
                    className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                )}
              </div>
              <form onSubmit={handleCreateChapter} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                    Module Identity
                  </label>
                  <input
                    type="text"
                    required
                    value={newChapterTitle}
                    onChange={(e) => setNewChapterTitle(e.target.value)}
                    placeholder="e.g. Clinical Pathophysiology"
                    className="w-full p-6 bg-[#f8fafc] rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white font-black text-[#384959] transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                      Code Classification
                    </label>
                    <input
                      type="text"
                      value={newChapterCodeRange}
                      onChange={(e) => setNewChapterCodeRange(e.target.value)}
                      placeholder="e.g. ICD-10-CM"
                      className="w-full p-6 bg-[#f8fafc] rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white font-black text-[#384959] transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                      Chronological Order
                    </label>
                    <input
                      type="number"
                      required
                      value={newChapterOrder}
                      onChange={(e) =>
                        setNewChapterOrder(Number(e.target.value))
                      }
                      className="w-full p-6 bg-[#f8fafc] rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white font-black text-[#384959] transition-all"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isCreatingChapter}
                  className="w-full h-20 bg-[#384959] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#384959]/20 hover:bg-[#6A89A7] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
                >
                  {isCreatingChapter ? (
                    <div className="h-6 w-6 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                  ) : (
                    "Authorize Module Creation"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lesson Modal */}
      <AnimatePresence>
        {isLessonModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isCreatingLesson && setLessonModalOpen(false)}
              className="absolute inset-0 bg-[#384959]/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-[4rem] p-12 lg:p-20 shadow-[0_50px_100px_-20px_rgba(56,73,89,0.3)] border border-white"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">
                    Knowledge Segment
                  </p>
                  <h2 className="text-4xl font-black text-[#384959] tracking-tighter leading-none">
                    Add Curriculum Asset
                  </h2>
                </div>
                {!isCreatingLesson && (
                  <button
                    onClick={() => setLessonModalOpen(false)}
                    className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                )}
              </div>
              <form onSubmit={handleCreateLesson} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                    Segment Nom de Guerre
                  </label>
                  <input
                    type="text"
                    required
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="e.g. Advanced CPT Documentation Guidelines"
                    className="w-full p-6 bg-[#f8fafc] rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white font-black text-[#384959] transition-all"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                    High-Definition Video Stream (Direct URL)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={lessonVideoUrl}
                      onChange={(e) => setLessonVideoUrl(e.target.value)}
                      placeholder="Encrypted Stream URL..."
                      className="w-full pl-16 pr-6 py-6 bg-[#f8fafc] rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white font-black text-[#384959] transition-all"
                    />
                    <MonitorPlay className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                    Sequence Priority
                  </label>
                  <input
                    type="number"
                    required
                    value={lessonOrder}
                    onChange={(e) => setLessonOrder(Number(e.target.value))}
                    className="w-full p-6 bg-[#f8fafc] rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white font-black text-[#384959] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isCreatingLesson}
                  className="w-full h-20 bg-[#6A89A7] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#6A89A7]/20 hover:bg-[#384959] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {isCreatingLesson ? (
                    <div className="h-6 w-6 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                  ) : (
                    <>
                      <Rocket className="h-5 w-5" /> Commission Segment
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
