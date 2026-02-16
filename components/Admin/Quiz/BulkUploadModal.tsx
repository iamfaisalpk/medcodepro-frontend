import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Loader2,
  FileText,
  AlertCircle,
  Database,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: () => void;
  isLoading: boolean;
  chapters: any[];
  quizzes: any[];
  bulkChapterId: string;
  setBulkChapterId: (id: string) => void;
  bulkQuizId: string;
  setBulkQuizId: (id: string) => void;
  bulkFile: File | null;
  setBulkFile: (file: File | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  isLoading,
  chapters,
  quizzes,
  bulkChapterId,
  setBulkChapterId,
  bulkQuizId,
  setBulkQuizId,
  bulkFile,
  setBulkFile,
  fileInputRef,
}) => {
  const filteredQuizzes = (chapterId: string) => {
    if (!chapterId) return [];
    return quizzes.filter((q: any) => {
      const qChapterId =
        typeof q.chapterId === "object" ? q.chapterId?._id : q.chapterId;
      return qChapterId === chapterId;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined}
            className="absolute inset-0 bg-[#384959]/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative bg-white rounded-[4rem] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(56,73,89,0.3)] overflow-hidden border border-white"
          >
            {/* Header */}
            <div className="p-10 lg:p-14 border-b border-slate-100 flex items-center justify-between bg-gradient-to-br from-slate-50/50 to-white">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 bg-[#6A89A7] text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#6A89A7]/20">
                  <Upload className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em] mb-1">
                    Engine Processing
                  </p>
                  <h2 className="text-3xl font-black text-[#384959] tracking-tighter leading-none">
                    Bulk <span className="text-[#6A89A7]">Ingestion</span>
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="h-14 w-14 rounded-2xl bg-white text-slate-300 flex items-center justify-center hover:text-red-500 hover:shadow-xl transition-all border border-slate-100 active:scale-90 disabled:opacity-50"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-10 lg:p-14 space-y-10">
              <div className="bg-[#BDDFEC]/10 p-8 rounded-[2.5rem] border border-[#BDDFEC]/20 flex gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                  <AlertCircle className="h-16 w-16" />
                </div>
                <AlertCircle className="h-8 w-8 text-[#6A89A7] shrink-0" />
                <div className="space-y-2 relative z-10">
                  <p className="text-sm font-black text-[#384959] uppercase tracking-wider">
                    PDF SMART PROCESSOR v2.0
                  </p>
                  <p className="text-xs text-[#6A89A7] font-bold leading-relaxed">
                    Ensure document follows "1. Question" & "A. Option"
                    architecture. Mark keys with an asterisk (*) for automated
                    validation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1">
                    Target Module Layer
                  </label>
                  <div className="relative">
                    <select
                      value={bulkChapterId}
                      onChange={(e) => setBulkChapterId(e.target.value)}
                      className="w-full p-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-[#384959] appearance-none transition-all shadow-inner"
                    >
                      <option value="">Select Modular Unit</option>
                      {chapters.map((c: any) => (
                        <option key={c._id} value={c._id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 rotate-90 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1">
                    Designated Audit Hub
                  </label>
                  <div className="relative">
                    <select
                      value={bulkQuizId}
                      onChange={(e) => setBulkQuizId(e.target.value)}
                      className="w-full p-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-[#384959] appearance-none transition-all disabled:opacity-40 shadow-inner"
                      disabled={!bulkChapterId}
                    >
                      <option value="">
                        {bulkChapterId
                          ? "General Pool Registry"
                          : "Calibrate Module First"}
                      </option>
                      {filteredQuizzes(bulkChapterId).map((q: any) => (
                        <option key={q._id} value={q._id}>
                          {q.title}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div
                onClick={() => !isLoading && fileInputRef.current?.click()}
                className={cn(
                  "border-[3px] border-dashed rounded-[3.5rem] p-16 text-center cursor-pointer transition-all duration-700 relative overflow-hidden group",
                  bulkFile
                    ? "bg-emerald-50/50 border-emerald-500 shadow-2xl shadow-emerald-500/10"
                    : "bg-slate-50 border-slate-100 hover:border-[#6A89A7]/40 hover:bg-white",
                  isLoading && "opacity-50 cursor-wait",
                )}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
                  className="hidden"
                  accept=".pdf"
                />

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6A89A7] to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />

                <div className="flex flex-col items-center gap-6">
                  {bulkFile ? (
                    <>
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="h-24 w-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/30"
                      >
                        <FileText className="h-10 w-10" />
                      </motion.div>
                      <div>
                        <p className="text-xl font-black text-[#384959] tracking-tighter">
                          {bulkFile.name}
                        </p>
                        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] mt-2 bg-white px-5 py-2 rounded-full border border-emerald-100 inline-block">
                          {(bulkFile.size / 1024 / 1024).toFixed(2)} MB •
                          Verification Pending
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-24 w-24 bg-white text-slate-300 rounded-[2rem] flex items-center justify-center shadow-xl border border-slate-50 group-hover:scale-110 transition-transform duration-700">
                        <Upload className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-black text-[#384959] tracking-tighter">
                          Drop Institutional PDF
                        </p>
                        <p className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-[0.2em]">
                          System compatible with .pdf standards
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-6 pt-4">
                <button
                  onClick={onUpload}
                  disabled={isLoading || !bulkFile || !bulkChapterId}
                  className="w-full bg-[#384959] text-white py-7 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#6A89A7] transition-all shadow-[0_25px_50px_-12px_rgba(56,73,89,0.3)] disabled:opacity-30 disabled:shadow-none flex items-center justify-center gap-4 active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Commencing
                      Data Harvest...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" /> Execute Bulk Ingestion
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-4 text-slate-400 hover:text-red-400 font-black text-[10px] uppercase tracking-widest transition-colors"
                >
                  Abort Record Entry
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
