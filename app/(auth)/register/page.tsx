'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { useRegisterMutation } from '@/store/authApiSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { User, Mail, Lock, CheckCircle2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
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
          toast.success(`Dev Mode: User created! Your OTP is ${result.otp}`, { duration: 6000 });
          router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&code=${result.otp}`);
        } else {
          toast.success('Registration successful! Please verify your email.');
          router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.error || 'Registration failed.');
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
        <div className="bg-white/90 backdrop-blur-3xl rounded-[3rem] p-8 md:p-14 shadow-[0_32px_64px_-16px_rgba(106,137,167,0.15)] border border-white">
          <div className="text-center mb-12">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#6A89A7] to-[#384959] text-white shadow-xl shadow-[#6A89A7]/20 mb-6"
            >
              <ShieldCheck className="h-10 w-10 text-[#BDDFEC]" />
            </motion.div>
            <h2 className="text-4xl font-black text-[#384959] tracking-tight mb-2">
              Join MedCodePro
            </h2>
            <p className="text-slate-500 font-semibold tracking-tight">
              Experience the future of medical coding
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              <Input
                label="Full Name"
                placeholder="Ex: John Harrison"
                leftIcon={<User className="h-5 w-5" />}
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Professional Email"
                placeholder="john@company.com"
                type="email"
                leftIcon={<Mail className="h-5 w-5" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  leftIcon={<Lock className="h-5 w-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-[#6A89A7] transition-colors p-1 rounded-md focus:bg-slate-100"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  }
                  error={errors.password?.message}
                  {...register('password')}
                />

                <Input
                  label="Confirm Password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  leftIcon={<CheckCircle2 className="h-5 w-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-[#6A89A7] transition-colors p-1 rounded-md focus:bg-slate-100"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  }
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-[60px] rounded-[1.25rem] text-lg font-black shadow-2xl shadow-[#6A89A7]/20 hover:shadow-[#6A89A7]/40 transition-all uppercase tracking-widest mt-4"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-bold">
              Already a member?{' '}
              <Link href="/login" className="text-[#6A89A7] hover:underline underline-offset-8 decoration-2 decoration-[#BDDFEC]">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
