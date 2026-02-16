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
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
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
            className="relative bg-white rounded-[2.5rem] sm:rounded-[4rem] w-full max-w-3xl shadow-[0_50px_100px_-20px_rgba(56,73,89,0.3)] border border-white max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Fixed Header */}
            <div className="p-6 sm:p-10 lg:p-12 border-b border-slate-100 flex items-center justify-between bg-gradient-to-br from-slate-50/50 to-white shrink-0">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-[#6A89A7] text-white rounded-2xl sm:rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#6A89A7]/20">
                  <Upload className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em] mb-1">
                    Engine Processing
                  </p>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#384959] tracking-tighter leading-none">
                    Bulk <span className="text-[#6A89A7]">Ingestion</span>
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-white text-slate-300 flex items-center justify-center hover:text-red-500 hover:shadow-xl transition-all border border-slate-100 active:scale-90 disabled:opacity-50"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <div className="p-6 sm:p-10 lg:p-12 space-y-8 sm:space-y-10">
                <div className="bg-[#BDDFEC]/10 p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-[#BDDFEC]/20 flex gap-4 sm:gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                    <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16" />
                  </div>
                  <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-[#6A89A7] shrink-0" />
                  <div className="space-y-2 relative z-10">
                    <p className="text-xs sm:text-sm font-black text-[#384959] uppercase tracking-wider">
                      PDF SMART PROCESSOR v2.0
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#6A89A7] font-bold leading-relaxed">
                      Ensure document follows "1. Question" & "A. Option"
                      architecture. Mark keys with an asterisk (*) for automated
                      validation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <label className="text-[9px] sm:text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1">
                      Target Module Layer
                    </label>
                    <div className="relative">
                      <select
                        value={bulkChapterId}
                        onChange={(e) => setBulkChapterId(e.target.value)}
                        className="w-full p-4 sm:p-5 lg:p-6 bg-[#f8fafc] rounded-2xl sm:rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-sm sm:text-base text-[#384959] appearance-none transition-all shadow-inner"
                      >
                        <option value="">Select Modular Unit</option>
                        {chapters.map((c: any) => (
                          <option key={c._id} value={c._id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-300 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <label className="text-[9px] sm:text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1">
                      Designated Audit Hub
                    </label>
                    <div className="relative">
                      <select
                        value={bulkQuizId}
                        onChange={(e) => setBulkQuizId(e.target.value)}
                        className="w-full p-4 sm:p-5 lg:p-6 bg-[#f8fafc] rounded-2xl sm:rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-sm sm:text-base text-[#384959] appearance-none transition-all disabled:opacity-40 shadow-inner"
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
                      <ChevronRight className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-300 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => !isLoading && fileInputRef.current?.click()}
                  className={cn(
                    "border-[3px] border-dashed rounded-2xl sm:rounded-[3.5rem] p-10 sm:p-12 lg:p-16 text-center cursor-pointer transition-all duration-700 relative overflow-hidden group",
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

                  <div className="flex flex-col items-center gap-4 sm:gap-6">
                    {bulkFile ? (
                      <>
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 bg-emerald-500 text-white rounded-2xl sm:rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/30"
                        >
                          <FileText className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
                        </motion.div>
                        <div className="max-w-full">
                          <p className="text-base sm:text-lg lg:text-xl font-black text-[#384959] tracking-tighter truncate max-w-[250px] sm:max-w-md">
                            {bulkFile.name}
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] mt-2 bg-white px-4 sm:px-5 py-2 rounded-full border border-emerald-100 inline-block">
                            {(bulkFile.size / 1024 / 1024).toFixed(2)} MB •
                            Verification Pending
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 bg-white text-slate-300 rounded-2xl sm:rounded-[2rem] flex items-center justify-center shadow-xl border border-slate-50 group-hover:scale-110 transition-transform duration-700">
                          <Upload className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg sm:text-xl lg:text-2xl font-black text-[#384959] tracking-tighter">
                            Drop Institutional PDF
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase mt-1 tracking-[0.2em]">
                            System compatible with .pdf standards
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 pt-4">
                  <button
                    onClick={onUpload}
                    disabled={isLoading || !bulkFile || !bulkChapterId}
                    className="w-full bg-[#384959] text-white py-5 sm:py-6 lg:py-7 rounded-2xl sm:rounded-[2.5rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] hover:bg-[#6A89A7] transition-all shadow-[0_25px_50px_-12px_rgba(56,73,89,0.3)] disabled:opacity-30 disabled:shadow-none flex items-center justify-center gap-3 sm:gap-4 active:scale-95"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />{" "}
                        Commencing Data Harvest...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 sm:h-5 sm:w-5" /> Execute Bulk
                        Ingestion
                      </>
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 sm:py-4 text-slate-400 hover:text-red-400 font-black text-[9px] sm:text-[10px] uppercase tracking-widest transition-colors"
                  >
                    Abort Record Entry
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
