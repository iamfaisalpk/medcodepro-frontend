"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useStartQuizMutation,
  useSubmitQuizMutation,
} from "@/store/quizApiSlice";
import { AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import { QuizHeader } from "@/components/Quiz/QuizHeader";
import { QuestionCard } from "@/components/Quiz/QuestionCard";
import { QuizControls } from "@/components/Quiz/QuizControls";
import { QuizResult } from "@/components/Quiz/QuizResult";

export default function QuizPage() {
  const { id: quizId } = useParams();
  const router = useRouter();

  const [startQuiz, { data: sessionData, isLoading: sessionLoading }] =
    useStartQuizMutation();
  const [submitQuiz, { isLoading: isSubmitting }] = useSubmitQuizMutation();

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (quizId) {
      startQuiz(quizId);
    }
  }, [quizId, startQuiz]);

  useEffect(() => {
    if (sessionData?.data?.quiz?.timeLimit) {
      setTimeLeft(sessionData.data.quiz.timeLimit * 60);
    }
  }, [sessionData]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished && sessionData) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished && timeLeft !== 0 && sessionData) {
      handleSubmit();
    }
  }, [timeLeft, isFinished, sessionData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswerSelect = (questionId: string, optionIdx: number) => {
    setAnswers({ ...answers, [questionId]: optionIdx });
  };

  const handleSubmit = async () => {
    try {
      const res = await submitQuiz({
        attemptId: sessionData?.data?.attemptId,
        answers, // Already in Record<string, number> format which matches backend
      }).unwrap();

      setResult(res.data);
      setIsFinished(true);
      toast.success("Audit finalized successfully!");
    } catch (err: any) {
      toast.error(err.data?.error || "Failed to submit audit.");
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#384959] border-t-transparent shadow-2xl"></div>
      </div>
    );
  }

  const questions = sessionData?.data?.questions || [];
  const currentQuestion = questions[currentQuestionIdx];

  // Show results view
  if (isFinished && result) {
    return <QuizResult result={result} questions={questions} />;
  }

  // Handle no questions case
  if (questions.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
          <AlertCircle className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-black text-[#384959]">
          No Questions Available
        </h2>
        <p className="text-slate-400 font-bold max-w-sm">
          This audit has no active questions assigned. Contact your
          administrator.
        </p>
        <button
          onClick={() => router.back()}
          className="text-sm font-black text-[#6A89A7] uppercase tracking-widest"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 px-6">
      <QuizHeader
        title={sessionData?.data?.quiz?.title}
        currentQuestionIdx={currentQuestionIdx}
        totalQuestions={questions.length}
        timeLeft={timeLeft}
        answers={answers}
        questions={questions}
        onMoveToQuestion={(idx) => setCurrentQuestionIdx(idx)}
      />

      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestionIdx}
          question={currentQuestion}
          selectedOption={answers[currentQuestion._id]}
          onSelectOption={handleAnswerSelect}
        />
      </AnimatePresence>

      <QuizControls
        onPrevious={() =>
          setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))
        }
        onNext={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
        onSubmit={handleSubmit}
        isFirst={currentQuestionIdx === 0}
        isLast={currentQuestionIdx === questions.length - 1}
        isSubmitting={isSubmitting}
        canProceed={answers[currentQuestion._id] !== undefined}
      />
    </div>
  );
}
