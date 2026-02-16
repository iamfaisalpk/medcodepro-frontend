'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { useVerifyOtpMutation } from '@/store/authApiSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      router.push('/register');
    }
  }, [email, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: searchParams.get('code') || '',
    },
  });

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setValue('otp', code);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: OtpFormValues) => {
    try {
      const result = await verifyOtp({ email, otp: data.otp }).unwrap();
      
      if (result.success) {
        toast.success('Email verified successfully! You can now login.');
        router.push('/login');
      }
    } catch (err: any) {
      toast.error(err?.data?.error || 'Verification failed. Please check your OTP.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#BDDFEC]/20 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl shadow-[#6A89A7]/10 border border-slate-100"
      >
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6A89A7] text-white shadow-lg"
          >
            <ShieldCheck className="h-8 w-8" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#384959]">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-bold text-[#6A89A7]">{email}</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Enter Verification Code"
            placeholder="000000"
            maxLength={6}
            leftIcon={<ShieldCheck className="h-5 w-5" />}
            error={errors.otp?.message}
            {...register('otp')}
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            size="large"
          >
            Verify & Continue <ChevronRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="text-center">
            <button 
              type="button"
              className="text-sm font-medium text-[#6A89A7] hover:underline"
              onClick={() => toast.success('A new code has been sent to your email (Mock)')}
            >
              Resend Code?
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
