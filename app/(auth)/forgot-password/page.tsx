'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { useForgotPasswordMutation } from '@/store/authApiSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, ChevronRight, ArrowLeft, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const result = await forgotPassword(data).unwrap();
      
      if (result.success) {
        toast.success(result.message || 'OTP sent to your email.');
        router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err: any) {
      toast.error(err?.data?.error || 'Failed to request password reset.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] relative overflow-hidden p-4">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#6A89A7]/5 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl shadow-[#6A89A7]/10 border border-white">
          <div className="text-center space-y-4 mb-8">
            <Link 
              href="/login" 
              className="inline-flex items-center text-xs font-bold text-[#6A89A7] uppercase tracking-widest hover:text-[#384959] transition-colors mb-4 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Secure Login
            </Link>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6A89A7] text-white shadow-xl">
              <KeyRound className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-[#384959] tracking-tight">
                Forgot Password
              </h2>
              <p className="text-slate-500 font-medium">
                We'll help you regain access securely
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              leftIcon={<Mail className="h-5 w-5" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-[#6A89A7]/20 transition-all"
              isLoading={isLoading}
            >
              Send Recovery Code <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
