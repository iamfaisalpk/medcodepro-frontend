'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { useResetPasswordMutation } from '@/store/authApiSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, ShieldCheck, ChevronRight, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { motion } from 'framer-motion';

const resetPasswordSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const email = searchParams.get('email');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push('/forgot-password');
    }
  }, [email, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const result = await resetPassword({ 
        email, 
        otp: data.otp, 
        newPassword: data.newPassword 
      }).unwrap();
      
      if (result.success) {
        toast.success('Password reset successful! You can now login.');
        router.push('/login');
      }
    } catch (err: any) {
      toast.error(err?.data?.error || 'Failed to reset password. Please check your OTP.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] relative overflow-hidden p-4">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#BDDFEC]/10 rounded-full blur-3xl animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl shadow-[#6A89A7]/10 border border-white">
          <div className="text-center space-y-4 mb-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6A89A7] to-[#384959] text-white shadow-xl">
              <LockKeyhole className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-[#384959] tracking-tight">
                Reset Password
              </h2>
              <p className="text-slate-500 font-medium leading-tight">
                Enter the code sent to <span className="text-[#6A89A7] font-bold">{email}</span>
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Verification Code"
              placeholder="000000"
              maxLength={6}
              leftIcon={<ShieldCheck className="h-5 w-5" />}
              error={errors.otp?.message}
              {...register('otp')}
            />

            <Input
              label="New Password"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              leftIcon={<Lock className="h-5 w-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-[#384959] transition-colors focus:outline-none p-1"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              }
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />

            <Input
              label="Confirm New Password"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              leftIcon={<Lock className="h-5 w-5" />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-[#6A89A7]/20 transition-all mt-4"
              isLoading={isLoading}
            >
              Update Password <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
