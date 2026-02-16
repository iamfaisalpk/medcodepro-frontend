import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      label,
      leftIcon,
      rightIcon,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("w-full space-y-1.5", containerClassName)}>
        {label && (
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-black text-[#6A89A7] uppercase tracking-[0.2em] ml-2">
              {label}
            </label>
          </div>
        )}
        <div className="group relative">
          {leftIcon && (
            <div className="absolute left-6 top-0 bottom-0 flex items-center justify-center text-slate-400 group-focus-within:text-[#6A89A7] transition-all duration-300 pointer-events-none z-10">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "flex h-14 w-full rounded-2xl border-2 border-slate-100 bg-[#f8fafc]/50 backdrop-blur-sm py-4 text-sm font-bold text-[#384959] transition-all duration-300 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-[#6A89A7]/5 focus:border-[#6A89A7] disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:border-[#6A89A7]/20",
              leftIcon ? "pl-[72px]" : "px-6",
              rightIcon ? "pr-[72px]" : "px-6",
              error &&
                "border-red-100 focus:ring-red-500/5 focus:border-red-400 bg-red-50/20",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-6 top-0 bottom-0 flex items-center justify-center text-slate-400 z-10">
              {rightIcon}
            </div>
          )}
        </div>
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-[9px] font-black text-red-400 uppercase tracking-widest ml-3 pt-0.5"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
