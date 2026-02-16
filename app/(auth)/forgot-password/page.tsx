"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from "@/store/authApiSlice";
import { Button } from "@/components/ui/Button";
import { Mail, ChevronRight, ArrowLeft, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
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
        toast.success(result.message || "OTP sent to your email.");
        router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to request password reset.");
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
        <div className="bg-white/80 backdrop-blur-3xl rounded-[4rem] p-10 lg:p-14 shadow-2xl shadow-[#6A89A7]/10 border border-white">
          <div className="text-center space-y-6 mb-12">
            <Link
              href="/login"
              className="inline-flex items-center text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.2em] hover:text-[#384959] transition-all mb-4 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />{" "}
              Back to Authorization
            </Link>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#6A89A7] to-[#384959] text-white shadow-2xl shadow-[#6A89A7]/20">
              <KeyRound className="h-10 w-10 text-[#BDDFEC]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-black text-[#384959] tracking-tighter leading-tight">
                Forgot Password
              </h2>
              <p className="text-slate-400 font-bold tracking-tight text-lg">
                We'll help you regain{" "}
                <span className="text-[#6A89A7]">access</span> securely
              </p>
            </div>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
                <input
                  type="email"
                  placeholder="name@institutional.com"
                  className={`w-full h-14 pl-14 pr-5 rounded-2xl border-2 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-slate-200 focus:border-[#6A89A7]"
                  } bg-white/50 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#6A89A7]/10 transition-all font-medium`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 pl-2 font-semibold">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-16 rounded-[2rem] text-lg font-black shadow-2xl shadow-[#6A89A7]/20 hover:shadow-[#6A89A7]/40 transition-all uppercase tracking-[0.2em] bg-[#384959]"
              isLoading={isLoading}
            >
              Request Access Code <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}