"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "@/store/authApiSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setCredentials } from "@/store/authSlice";
import { setAccessToken } from "@/lib/axios";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Lock, Mail, ChevronRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login(data).unwrap();

      if (result.success) {
        setAccessToken(result.token);
        dispatch(setCredentials({ user: result.user, isAuthenticated: true }));
        toast.success(`Welcome back, ${result.user.name}!`);
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(
        err?.data?.error || "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] relative overflow-x-hidden p-6">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#6A89A7]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#BDDFEC]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-3xl rounded-[4rem] p-10 lg:p-14 shadow-2xl shadow-[#6A89A7]/10 border border-white">
          <div className="text-center space-y-6 mb-12">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#6A89A7] to-[#384959] text-white shadow-2xl shadow-[#6A89A7]/20"
            >
              <Sparkles className="h-12 w-12 text-[#BDDFEC]" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-[#384959]">
                Welcome Back
              </h2>
              <p className="text-slate-400 font-bold tracking-tight text-lg">
                Secure access to your{" "}
                <span className="text-[#6A89A7]">coding vault</span>
              </p>
            </div>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                  Registry Email
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

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                    Access Protocol (Password)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full h-14 pl-14 pr-14 rounded-2xl border-2 ${
                        errors.password
                          ? "border-red-300 focus:border-red-500"
                          : "border-slate-200 focus:border-[#6A89A7]"
                      } bg-white/50 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#6A89A7]/10 transition-all font-medium`}
                      {...register("password")}
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
                  {errors.password && (
                    <p className="text-xs text-red-500 pl-2 font-semibold">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end pr-2">
                  <Link
                    href="/forgot-password"
                    className="text-[10px] font-black text-[#6A89A7] hover:text-[#384959] transition-all uppercase tracking-[0.2em]"
                  >
                    Reset Credentials?
                  </Link>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-16 rounded-[2rem] text-lg font-black shadow-2xl shadow-[#6A89A7]/20 hover:shadow-[#6A89A7]/40 active:scale-95 transition-all uppercase tracking-widest bg-[#384959]"
              isLoading={isLoading}
            >
              Initialize Session <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-14 text-center">
            <p className="text-slate-400 font-bold">
              New to the platform?{" "}
              <Link
                href="/register"
                className="text-[#6A89A7] font-black hover:underline underline-offset-8 decoration-2 decoration-[#BDDFEC]"
              >
                Register Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}