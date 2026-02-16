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
    <div className="max-w-[1600px] mx-auto space-y-12 pb-32">
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#BDDFEC]/20 rounded-full border border-[#BDDFEC]/40"
          >
            <ShieldCheck className="h-4 w-4 text-[#6A89A7]" />
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em]">
              Validation Control Active
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter"
          >
            Audit <span className="text-[#6A89A7]">Engineer</span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-xl max-w-2xl leading-relaxed">
            Manage institutional question vaults, orchestrate module-wide
            audits, and monitor clinical accuracy analytics.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => setBulkModalOpen(true)}
            className="flex-1 lg:flex-none h-16 px-8 bg-white border border-slate-100 text-[#6A89A7] rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-[#6A89A7]/5 transition-all active:scale-95"
          >
            <Upload className="h-4 w-4" /> Bulk Ingest
          </button>
          <button
            onClick={() => setQuizModalOpen(true)}
            className="flex-1 lg:flex-none h-16 px-8 bg-[#384959] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 active:scale-95"
          >
            <Database className="h-4 w-4" /> New Audit
          </button>
          <button
            onClick={() => setQuestionModalOpen(true)}
            className="flex-1 lg:flex-none h-16 px-8 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          >
            <Plus className="h-4 w-4" /> Create Record
          </button>
        </motion.div>
      </div>

      {/* Intelligence Cards */}
      <QuizStats questions={questions} chapters={chapters} />

      {/* Control Surface */}
      <div className="bg-white rounded-[4rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 overflow-hidden">
        <div className="border-b border-slate-100 flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50/30 gap-6">
          <div className="flex bg-white p-2 rounded-3xl border border-slate-100 w-full md:w-fit overflow-x-auto scrollbar-none">
            {[
              { id: "analytics", label: "Intelligence", icon: BarChart3 },
              { id: "questions", label: "Question Vault", icon: Database },
              { id: "attempts", label: "Student Audits", icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-[#384959] text-white shadow-xl"
                    : "text-slate-400 hover:text-[#384959]",
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-[400px]">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="text"
                placeholder="Query records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#6A89A7]/10 font-bold text-sm text-slate-500 placeholder:text-slate-300"
              />
            </div>
          </div>
        </div>

        <div className="p-10 lg:p-14 min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <QuizAnalytics questions={questions} chapters={chapters} />
              </motion.div>
            )}

            {activeTab === "questions" && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
