"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useResetPasswordMutation } from "@/store/authApiSlice";
import { Button } from "@/components/ui/Button";
import {
  Lock,
  ShieldCheck,
  ChevronRight,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";
import { motion } from "framer-motion";

const resetPasswordSchema = z
  .object({
    otp: z.string().length(6, "OTP must be exactly 6 digits"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const email = searchParams.get("email");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
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
        newPassword: data.newPassword,
      }).unwrap();

      if (result.success) {
        toast.success("Password reset successful! You can now login.");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(
        err?.data?.error || "Failed to reset password. Please check your OTP.",
      );
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
        <div className="bg-white/80 backdrop-blur-3xl rounded-[4rem] p-10 lg:p-14 shadow-2xl shadow-[#6A89A7]/10 border border-white">
          <div className="text-center space-y-6 mb-12">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#6A89A7] to-[#384959] text-white shadow-2xl shadow-[#6A89A7]/20">
              <LockKeyhole className="h-12 w-12 text-[#BDDFEC]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-black text-[#384959] tracking-tighter leading-tight">
                Reset Credentials
              </h2>
              <p className="text-slate-400 font-bold tracking-tight text-lg leading-tight">
                Enter the code sent to <br />
                <span className="text-[#6A89A7] text-sm font-black uppercase tracking-widest">
                  {email}
                </span>
              </p>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                  Registry Access Code
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
                  <input
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    className={`w-full h-14 pl-14 pr-5 rounded-2xl border-2 ${
                      errors.otp
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#6A89A7]"
                    } bg-white/50 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#6A89A7]/10 transition-all font-medium text-center tracking-[0.5em]`}
                    {...register("otp")}
                  />
                </div>
                {errors.otp && (
                  <p className="text-xs text-red-500 pl-2 font-semibold">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                  New Security Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full h-14 pl-14 pr-14 rounded-2xl border-2 ${
                      errors.newPassword
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#6A89A7]"
                    } bg-white/50 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#6A89A7]/10 transition-all font-medium`}
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#6A89A7] transition-all focus:outline-none p-1.5 rounded-xl hover:bg-slate-50 z-10"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-xs text-red-500 pl-2 font-semibold">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                  Confirm Security Policy
                </label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full h-14 pl-14 pr-5 rounded-2xl border-2 ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#6A89A7]"
                    } bg-white/50 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#6A89A7]/10 transition-all font-medium`}
                    {...register("confirmPassword")}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 pl-2 font-semibold">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-16 rounded-[2rem] text-lg font-black shadow-2xl shadow-[#6A89A7]/20 hover:shadow-[#6A89A7]/40 transition-all uppercase tracking-[0.2em] bg-[#384959]"
              isLoading={isLoading}
            >
              Update Credentials <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}