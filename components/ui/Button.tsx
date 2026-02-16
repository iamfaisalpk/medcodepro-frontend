import { ButtonHTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6A89A7]/20 disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-br from-[#6A89A7] to-[#384959] text-white hover:shadow-lg hover:shadow-[#6A89A7]/30 border border-white/10',
        secondary: 'bg-[#BDDFEC] text-[#384959] hover:bg-[#88BDF2] hover:text-white',
        outline: 'border-2 border-[#6A89A7]/30 text-[#6A89A7] hover:border-[#6A89A7] hover:bg-[#6A89A7]/5',
        ghost: 'text-[#384959] hover:bg-[#6A89A7]/10',
        danger: 'bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/30',
      },
      size: {
        small: 'h-10 px-4',
        medium: 'h-12 px-6',
        large: 'h-[58px] px-8 text-base tracking-wide',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="opacity-80">Please wait...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
