"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "@/store/authApiSlice";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, ...registerData } = data;
      const result = await registerUser(registerData).unwrap();

      if (result.success) {
        if (result.otp) {
          toast.success(`Dev Mode: User created! Your OTP is ${result.otp}`, {
            duration: 6000,
          });
          router.push(
            `/verify-otp?email=${encodeURIComponent(data.email)}&code=${result.otp}`,
          );
        } else {
          toast.success("Registration successful! Please verify your email.");
          router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] relative overflow-x-hidden p-6">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#6A89A7]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#BDDFEC]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-3xl rounded-[4rem] p-10 lg:p-16 shadow-[0_32px_64px_-16px_rgba(106,137,167,0.15)] border border-white">
          <div className="text-center mb-16 space-y-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#6A89A7] to-[#384959] text-white shadow-2xl shadow-[#6A89A7]/20"
            >
              <ShieldCheck className="h-12 w-12 text-[#BDDFEC]" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-black text-[#384959] tracking-tighter">
                Join MedCodePro
              </h2>
              <p className="text-slate-400 font-bold tracking-tight text-lg leading-tight max-w-sm mx-auto">
                Experience the <span className="text-[#6A89A7]">future</span> of
                medical coding intelligence
              </p>
            </div>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                    Institutional Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
                    <input
                      type="text"
                      placeholder="Ex: John Harrison"
                      className={`w-full h-14 pl-14 pr-5 rounded-2xl border-2 ${
                        errors.name
                          ? "border-red-300 focus:border-red-500"
                          : "border-slate-200 focus:border-[#6A89A7]"
                      } bg-white/50 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#6A89A7]/10 transition-all font-medium`}
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 pl-2 font-semibold">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                    Registry Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
                    <input
                      type="email"
                      placeholder="john@institutional.com"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                    Security Password
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
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#6A89A7] transition-all p-1.5 rounded-xl hover:bg-slate-50 focus:outline-none z-10"
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

                <div className="space-y-3">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-[0.15em] pl-2">
                    Verify Password
                  </label>
                  <div className="relative">
                    <CheckCircle2 className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
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
            </div>

            <Button
              type="submit"
              className="w-full h-16 rounded-[2rem] text-lg font-black shadow-2xl shadow-[#6A89A7]/20 hover:shadow-[#6A89A7]/40 transition-all uppercase tracking-[0.2em] bg-[#384959]"
              isLoading={isLoading}
            >
              Establish Account
            </Button>
          </form>

          <div className="mt-16 text-center">
            <p className="text-slate-400 font-bold">
              Already have an identity?{" "}
              <Link
                href="/login"
                className="text-[#6A89A7] font-black hover:underline underline-offset-8 decoration-2 decoration-[#BDDFEC]"
              >
                Authorize Session
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}