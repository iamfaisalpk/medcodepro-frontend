"use client";

import { useState, useRef } from "react";
import {
  useGetAdminQuizAnalyticsQuery,
  useCreateQuestionMutation,
  useBulkUploadQuestionsMutation,
  useCreateQuizMutation,
  useGetAdminChaptersQuery,
  useGetAdminQuizzesQuery,
  useGetAdminQuestionsQuery,
  useDeleteQuestionMutation,
  useGetAllAttemptsQuery,
} from "@/store/adminApiSlice";
import {
  Plus,
  BarChart3,
  Layers,
  Upload,
  FileText,
  Activity,
  ShieldCheck,
  ChevronRight,
  Search,
  Database,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { toast } from "react-hot-toast";

// Extracted Components
import { QuizStats } from "@/components/Admin/Quiz/QuizStats";
import { QuizAnalytics } from "@/components/Admin/Quiz/QuizAnalytics";
import { QuestionList } from "@/components/Admin/Quiz/QuestionList";
import { AddQuestionModal } from "@/components/Admin/Quiz/AddQuestionModal";
import { AddQuizModal } from "@/components/Admin/Quiz/AddQuizModal";
import { BulkUploadModal } from "@/components/Admin/Quiz/BulkUploadModal";
import { AuditAttemptsList } from "@/components/Admin/Quiz/AuditAttemptsList";

export default function AdminQuizManagement() {
  // Queries
  const { refetch: refetchAnalytics } =
    useGetAdminQuizAnalyticsQuery(undefined);
  const { data: chaptersData } = useGetAdminChaptersQuery(undefined);
  const { data: quizzesData } = useGetAdminQuizzesQuery(undefined);
  const {
    data: questionsData,
    refetch: refetchQuestions,
    isLoading: questionsLoading,
  } = useGetAdminQuestionsQuery(undefined);
  const { data: attemptsData, isLoading: attemptsLoading } =
    useGetAllAttemptsQuery(undefined);

  // Mutations
  const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation();
  const [createQuestion, { isLoading: isCreatingQuestion }] =
    useCreateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [bulkUpload, { isLoading: isBulkUploading }] =
    useBulkUploadQuestionsMutation();

  // State
  const [activeTab, setActiveTab] = useState("analytics");
  const [isQuestionModalOpen, setQuestionModalOpen] = useState(false);
  const [isQuizModalOpen, setQuizModalOpen] = useState(false);
  const [isBulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkChapterId, setBulkChapterId] = useState("");
  const [bulkQuizId, setBulkQuizId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const chapters = chaptersData?.data || [];
  const quizzes = quizzesData?.data || [];
  const questions = questionsData?.data || [];

  const [questionData, setQuestionData] = useState({
    quizId: "",
    chapterId: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    difficulty: "medium",
    marks: 1,
    explanation: "",
  });

  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    chapterId: "",
    timeLimit: 20,
    totalMarks: 10,
    passPercentage: 70,
  });

  const resetQuizForm = () => {
    setQuizData({
      title: "",
      description: "",
      chapterId: "",
      timeLimit: 20,
      totalMarks: 10,
      passPercentage: 70,
    });
  };

  const resetQuestionForm = () => {
    setQuestionData({
      quizId: "",
      chapterId: "",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      difficulty: "medium",
      marks: 1,
      explanation: "",
    });
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizData.title || !quizData.chapterId) {
      return toast.error("Please fill required fields");
    }

    try {
      await createQuiz(quizData).unwrap();
      toast.success("Audit Engine Initialized!");
      setQuizModalOpen(false);
      resetQuizForm();
      refetchAnalytics();
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to create audit");
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionData.chapterId || !questionData.question.trim()) {
      return toast.error("Chapter and logic validation required");
    }

    if (questionData.options.some((opt) => !opt.trim())) {
      return toast.error("All clinical options must be defined");
    }

    try {
      const payload: any = { ...questionData };
      if (!payload.quizId) delete payload.quizId;

      await createQuestion(payload).unwrap();
      toast.success("Question record committed to vault!");
      setQuestionModalOpen(false);
      resetQuestionForm();
      refetchQuestions();
      refetchAnalytics();
    } catch (err: any) {
      toast.error(err?.data?.error || "Sync failed");
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Are you sure you want to purge this record?")) return;

    try {
      await deleteQuestion(id).unwrap();
      toast.success("Record purged.");
      refetchQuestions();
      refetchAnalytics();
    } catch (err: any) {
      toast.error(err?.data?.error || "Purge failed");
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkFile || !bulkChapterId) {
      return toast.error("Selection required for bulk ingestion");
    }

    const formData = new FormData();
    formData.append("file", bulkFile);
    formData.append("chapterId", bulkChapterId);
    if (bulkQuizId) formData.append("quizId", bulkQuizId);

    try {
      const result = await bulkUpload(formData).unwrap();
      const count = result?.data?.count || result?.count || 0;
      toast.success(`Successfully ingested ${count} professional records!`);
      setBulkModalOpen(false);
      setBulkFile(null);
      setBulkChapterId("");
      setBulkQuizId("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      refetchQuestions();
      refetchAnalytics();
    } catch (err: any) {
      toast.error(err?.data?.error || "Ingestion failure");
    }
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-20 pb-40">
      {/* Master Audit Intelligence Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-4 px-6 py-3 bg-[#6A89A7]/5 rounded-full border border-[#6A89A7]/10"
          >
            <ShieldCheck className="h-4 w-4 text-[#6A89A7]" />
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.4em]">
              Validation Control: Secure
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-9xl font-black text-[#384959] tracking-tighter leading-none"
          >
            Audit{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#BDDFEC] to-[#6A89A7]">
              Engineer
            </span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-2xl max-w-3xl leading-relaxed">
            Manage institutional knowledge vaults, orchestrate module-wide
            audits, and monitor clinical accuracy telemetry.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-wrap items-center gap-6"
        >
          <button
            onClick={() => setBulkModalOpen(true)}
            className="h-20 px-10 bg-white border-2 border-slate-100 text-[#6A89A7] rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-[#6A89A7]/10 transition-all active:scale-95 group"
          >
            <Upload className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
            Bulk Ingest
          </button>
          <button
            onClick={() => setQuizModalOpen(true)}
            className="h-20 px-10 bg-[#384959] text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 active:scale-95 group"
          >
            <Database className="h-5 w-5 group-hover:scale-110 transition-transform" />
            New Audit
          </button>
          <button
            onClick={() => setQuestionModalOpen(true)}
            className="h-20 px-10 bg-black text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-slate-800 transition-all shadow-xl active:scale-95 group"
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
            Create Record
          </button>
        </motion.div>
      </div>

      {/* Advanced Telemetry Dashboard */}
      <QuizStats questions={questions} chapters={chapters} />

      {/* Main Command Surface */}
      <div className="bg-white rounded-[5rem] shadow-[0_50px_120px_-30px_rgba(106,137,167,0.15)] border border-slate-50 overflow-hidden">
        <div className="border-b border-slate-100 flex flex-col xl:flex-row items-center justify-between p-10 lg:p-14 bg-slate-50/30 gap-10">
          <div className="flex bg-white p-2.5 rounded-[2.5rem] border border-slate-100 w-full xl:w-fit overflow-x-auto scrollbar-none shadow-sm">
            {[
              { id: "analytics", label: "Intelligence", icon: BarChart3 },
              { id: "questions", label: "Question Vault", icon: Database },
              { id: "attempts", label: "Student Audits", icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-4 px-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-[#384959] text-white shadow-2xl shadow-[#384959]/30 scale-105 z-10"
                    : "text-slate-400 hover:text-[#384959] hover:bg-slate-50",
                )}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 w-full xl:w-[500px] group">
            <div className="relative flex-1">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#6A89A7] transition-colors" />
              <input
                type="text"
                placeholder="Query institutional records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-18 pr-8 py-6 bg-white border-2 border-transparent rounded-[2.5rem] outline-none focus:border-[#6A89A7]/20 focus:ring-8 focus:ring-[#6A89A7]/5 font-bold text-lg text-slate-600 placeholder:text-slate-300 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="p-10 lg:p-20 min-h-[600px] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/20 pointer-events-none" />
          <AnimatePresence mode="wait">
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <QuizAnalytics questions={questions} chapters={chapters} />
              </motion.div>
            )}

            {activeTab === "questions" && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <QuestionList
                  questions={questions}
                  isLoading={questionsLoading}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onDelete={handleDeleteQuestion}
                />
              </motion.div>
            )}

            {activeTab === "attempts" && (
              <motion.div
                key="attempts"
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <AuditAttemptsList
                  attempts={attemptsData?.data || []}
                  isLoading={attemptsLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals are kept as they are but wrapped in AnimatePresence which is already there, 
          I'll update the components themselves if needed. */}

      <AddQuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => {
          setQuestionModalOpen(false);
          resetQuestionForm();
        }}
        onSubmit={handleCreateQuestion}
        isLoading={isCreatingQuestion}
        questionData={questionData}
        setQuestionData={setQuestionData}
        chapters={chapters}
        quizzes={quizzes}
      />

      <BulkUploadModal
        isOpen={isBulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onUpload={handleBulkUpload}
        isLoading={isBulkUploading}
        chapters={chapters}
        quizzes={quizzes}
        bulkChapterId={bulkChapterId}
        setBulkChapterId={setBulkChapterId}
        bulkQuizId={bulkQuizId}
        setBulkQuizId={setBulkQuizId}
        bulkFile={bulkFile}
        setBulkFile={setBulkFile}
        fileInputRef={fileInputRef}
      />

      <AddQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onSubmit={handleCreateQuiz}
        isLoading={isCreatingQuiz}
        quizData={quizData}
        setQuizData={setQuizData}
        chapters={chapters}
      />
    </div>
  );
}
