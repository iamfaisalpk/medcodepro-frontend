'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { useLoginMutation } from '@/store/authApiSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCredentials } from '@/store/authSlice';
import { setAccessToken } from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Lock, Mail, ChevronRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
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
        router.push('/dashboard');
      }
    } catch (err: any) {
      toast.error(err?.data?.error || 'Login failed. Please check your credentials.');
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
        <div className="bg-white/90 backdrop-blur-3xl rounded-[3rem] p-10 shadow-2xl shadow-[#6A89A7]/10 border border-white">
          <div className="text-center space-y-4 mb-10">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#6A89A7] to-[#384959] text-white shadow-xl shadow-[#6A89A7]/20"
            >
              <Sparkles className="h-10 w-10 text-[#BDDFEC]" />
            </motion.div>
            <div className="space-y-1">
              <h2 className="text-4xl font-black tracking-tight text-[#384959]">
                Welcome Back
              </h2>
              <p className="text-slate-500 font-bold tracking-tight">
                Secure access to your coding portal
              </p>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <Input
                label="Registered Email"
                placeholder="name@example.com"
                type="email"
                leftIcon={<Mail className="h-5 w-5" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="space-y-3">
                <Input
                  label="Password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  leftIcon={<Lock className="h-5 w-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-[#6A89A7] transition-colors focus:outline-none p-1 rounded-md"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  }
                  error={errors.password?.message}
                  {...register('password')}
                />
                <div className="flex justify-end pr-1">
                  <Link 
                    href="/forgot-password" 
                    className="text-xs font-black text-[#6A89A7] hover:text-[#384959] transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-[#BDDFEC]"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-[#6A89A7]/20 hover:shadow-[#6A89A7]/40 active:scale-95 transition-all"
              isLoading={isLoading}
            >
              Secure Login <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-bold">
              No account?{' '}
              <Link href="/register" className="text-[#6A89A7] hover:underline underline-offset-8 decoration-2 decoration-[#BDDFEC]">
                Create One
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
