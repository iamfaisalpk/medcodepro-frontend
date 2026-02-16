import React from "react";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";

interface QuizControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
  canProceed: boolean; // e.g. if answer selected
}

export const QuizControls: React.FC<QuizControlsProps> = ({
  onPrevious,
  onNext,
  onSubmit,
  isFirst,
  isLast,
  isSubmitting,
  canProceed,
}) => {
  return (
    <div className="pt-12 border-t border-slate-100 flex items-center justify-between">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className="flex items-center gap-4 px-10 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest disabled:opacity-20 disabled:cursor-not-allowed hover:bg-slate-100 hover:text-[#384959] transition-all"
      >
        <ArrowLeft className="h-5 w-5" /> Previous
      </button>

      {isLast ? (
        <button
          onClick={onSubmit}
          disabled={isSubmitting || !canProceed}
          className="flex items-center gap-4 px-14 py-6 bg-emerald-500 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-emerald-500/20 disabled:opacity-50"
        >
          {isSubmitting ? "Processing Audit..." : "Submit Audit"}{" "}
          <Award className="h-6 w-6" />
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-4 px-14 py-6 bg-[#384959] text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 disabled:opacity-50"
        >
          Confirm & Next <ArrowRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
