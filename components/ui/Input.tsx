import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, leftIcon, rightIcon, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("w-full space-y-2", containerClassName)}>
        {label && (
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[13px] font-bold text-[#384959] tracking-tight ml-0.5">
              {label}
            </label>
          </div>
        )}
        <div className="group relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#6A89A7] transition-all duration-300 pointer-events-none z-10">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'flex h-12 w-full rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-white transition-all duration-300 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#6A89A7]/10 focus:border-[#6A89A7] disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:border-slate-300',
              leftIcon ? 'pl-12' : 'px-4',
              rightIcon ? 'pr-12' : 'px-4',
              error && 'border-red-400 focus:ring-red-500/10 focus:border-red-500',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center z-10">
              {rightIcon}
            </div>
          )}
        </div>
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1.5 pt-0.5"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
