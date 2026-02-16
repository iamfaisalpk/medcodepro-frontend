"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateUser } from "@/store/authSlice";
import {
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} from "@/store/authApiSlice";
import {
  Settings,
  User,
  Bell,
  Shield,
  Moon,
  Save,
  Lock,
  Mail,
  UserCircle,
  Database,
  Activity,
  History,
  ShieldCheck,
  ChevronRight,
  Camera,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { cn } from "@/utils/cn";

export default function SettingsPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("profile");

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ name, email }).unwrap();
      dispatch(updateUser(res.user));
      toast.success("Professional Profile Synchronized!");
    } catch (err: any) {
      toast.error(err.data?.error || "Synchronization failed.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Security verification failed: Passwords mismatch.");
    }
    try {
      await updatePassword({ currentPassword, newPassword }).unwrap();
      toast.success("Access Credentials Hardened!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.data?.error || "Security update failed.");
    }
  };

  const tabs = [
    {
      id: "profile",
      label: "Identity Profile",
      icon: User,
      desc: "Institutional name, email, and identity.",
    },
    {
      id: "security",
      label: "Security Protocols",
      icon: Shield,
      desc: "Advanced encryption and password hygiene.",
    },
    {
      id: "notifications",
      label: "Telemetry Alerts",
      icon: Bell,
      desc: "System events and learning reminders.",
    },
    {
      id: "appearance",
      label: "Visual Interface",
      icon: Moon,
      desc: "UI themes and visual performance.",
    },
  ];

  return (
    <div className="max-w-[1700px] mx-auto space-y-20 pb-40">
      {/* Dynamic Core Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-4 px-6 py-3 bg-[#6A89A7]/5 rounded-full border border-[#6A89A7]/10"
          >
            <Settings className="h-4 w-4 text-[#6A89A7]" />
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.4em]">
              Core Console: Synchronization Active
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-9xl font-black text-[#384959] tracking-tighter leading-none"
          >
            Institutional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#BDDFEC] to-[#6A89A7]">
              Settings
            </span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-2xl max-w-3xl leading-relaxed">
            Manage professional identity, harden security protocols, and
            calibrate your high-fidelity learning environment.
          </p>
        </div>
      </div>

      {/* Advanced Protocol Matrix */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-16">
        {/* Navigation Interface */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            {tabs.map((tab, idx) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full p-10 rounded-[3.5rem] border-2 transition-all duration-700 text-left group relative overflow-hidden",
                  activeTab === tab.id
                    ? "bg-[#384959] border-[#384959] text-white shadow-[0_40px_80px_-20px_rgba(56,73,89,0.3)] xl:translate-x-6"
                    : "bg-white border-transparent hover:border-slate-100 text-slate-400 hover:bg-slate-50/50",
                )}
              >
                <div className="flex items-center gap-8 relative z-10">
                  <div
                    className={cn(
                      "h-16 w-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 shadow-sm",
                      activeTab === tab.id
                        ? "bg-white/10 text-white"
                        : "bg-slate-50 text-slate-300 group-hover:bg-[#BDDFEC]/30 group-hover:text-[#6A89A7]",
                    )}
                  >
                    <tab.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        "text-xl font-black tracking-tighter leading-none mb-2",
                        activeTab === tab.id ? "text-white" : "text-[#384959]",
                      )}
                    >
                      {tab.label}
                    </p>
                    <p
                      className={cn(
                        "text-[9px] font-black uppercase tracking-[0.2em] opacity-60",
                        activeTab === tab.id ? "text-white" : "text-slate-400",
                      )}
                    >
                      {activeTab === tab.id ? "Protocol Hub" : "Configuration"}
                    </p>
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-6 w-6 transition-all duration-700",
                      activeTab === tab.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4",
                    )}
                  />
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-marker"
                    className="absolute inset-y-0 left-0 w-2 bg-[#6A89A7]"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 bg-gradient-to-br from-[#BDDFEC] via-[#6A89A7] to-[#384959] rounded-[4rem] text-white shadow-2xl relative overflow-hidden group mt-12"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
              <ShieldCheck className="h-40 w-40 rotate-12" />
            </div>
            <div className="relative z-10 space-y-6">
              <h4 className="text-2xl font-black tracking-tighter italic">
                Hardened Infrastructure
              </h4>
              <p className="text-[10px] font-bold text-white/80 leading-relaxed uppercase tracking-[0.3em]">
                Your professional telemetry is encrypted via AES-GCM 256 and
                verified for clinical compliance.
              </p>
              <button className="w-full h-16 bg-white/10 backdrop-blur-xl rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 hover:bg-white/20 transition-all shadow-lg active:scale-95">
                Verify Integrity
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Command Surface */}
        <div className="xl:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="bg-white rounded-[5rem] shadow-[0_60px_150px_-30px_rgba(106,137,167,0.15)] border border-slate-50 p-12 lg:p-24 relative overflow-hidden"
            >
              {/* Profile Intelligence Module */}
              {activeTab === "profile" && (
                <div className="space-y-20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 border-b border-slate-100 pb-16">
                    <div className="flex items-center gap-10">
                      <div className="relative group">
                        <div className="h-32 w-32 bg-gradient-to-br from-[#BDDFEC] via-[#6A89A7] to-[#384959] rounded-[3.5rem] p-1.5 shadow-2xl shadow-[#6A89A7]/30 group-hover:scale-105 transition-transform duration-700">
                          <div className="h-full w-full bg-white rounded-[3.2rem] flex items-center justify-center overflow-hidden">
                            <UserCircle className="h-16 w-16 text-[#6A89A7]" />
                          </div>
                        </div>
                        <button className="absolute -bottom-4 -right-4 h-14 w-14 bg-[#384959] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-[#6A89A7] transition-all group-hover:rotate-12 active:scale-90">
                          <Camera className="h-6 w-6" />
                        </button>
                      </div>
                      <div>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#384959] tracking-tighter leading-none mb-4">
                          {user?.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Master Identity Active
                            </span>
                          </div>
                          <span className="h-1 w-1 rounded-full bg-slate-200" />
                          <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-widest">
                            #{user?.id?.slice(-8).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="h-16 px-10 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-100 shadow-lg shadow-red-500/5">
                      Purge Identity
                    </button>
                  </div>

                  <form
                    onSubmit={handleProfileSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-16"
                  >
                    <div className="space-y-6">
                      <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] ml-2">
                        Professional Nomen
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-[#6A89A7]/5 opacity-0 group-focus-within:opacity-100 rounded-[2.5rem] transition-opacity -m-1" />
                        <User className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-[#6A89A7] transition-colors" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-20 pr-8 py-8 bg-[#f8fafc]/50 border-2 border-transparent rounded-[2.5rem] focus:bg-white focus:border-[#6A89A7]/20 outline-none font-black text-xl text-[#384959] transition-all shadow-inner placeholder:text-slate-200"
                          placeholder="Your identity..."
                        />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] ml-2">
                        Registry Coordinates
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-[#6A89A7]/5 opacity-0 group-focus-within:opacity-100 rounded-[2.5rem] transition-opacity -m-1" />
                        <Mail className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-[#6A89A7] transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-20 pr-8 py-8 bg-[#f8fafc]/50 border-2 border-transparent rounded-[2.5rem] focus:bg-white focus:border-[#6A89A7]/20 outline-none font-black text-xl text-[#384959] transition-all shadow-inner placeholder:text-slate-200"
                          placeholder="professional@medpro.edu"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 pt-12 flex flex-col sm:flex-row items-center justify-between gap-12 border-t border-slate-50">
                      <div className="flex items-center gap-6 max-w-lg">
                        <div className="h-16 w-16 rounded-[1.5rem] bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                          <Activity className="h-8 w-8" />
                        </div>
                        <p className="text-sm text-slate-400 font-bold italic leading-relaxed">
                          Identity modifications will propagate through the
                          institutional ledger and certification registry within
                          24 continuous hours.
                        </p>
                      </div>
                      <button
                        disabled={isUpdatingProfile}
                        className="h-24 px-16 bg-[#384959] text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-[#384959]/30 hover:bg-[#6A89A7] transition-all active:scale-95 disabled:opacity-50 flex items-center gap-6 group overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        {isUpdatingProfile ? (
                          <div className="h-6 w-6 border-4 border-white/20 border-t-white animate-spin rounded-full" />
                        ) : (
                          <Save className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        )}
                        Commit Protocol
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Synthesis Module */}
              {activeTab === "security" && (
                <div className="space-y-20">
                  <div className="flex items-center gap-8 pb-16 border-b border-slate-100">
                    <div className="h-20 w-20 bg-orange-50 rounded-[2rem] flex items-center justify-center text-orange-500 shadow-inner group-hover:rotate-12 transition-transform">
                      <Lock className="h-10 w-10" />
                    </div>
                    <div>
                      <h2 className="text-4xl lg:text-5xl font-black text-[#384959] tracking-tighter leading-none mb-3">
                        Hardened Protocols
                      </h2>
                      <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.4em]">
                        Advanced Credential Synchronization Engine
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-16">
                    <div className="space-y-6 max-w-xl">
                      <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] ml-2">
                        Current Authorization Core
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-slate-100 rounded-[2.5rem] -m-1 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <History className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-[#384959] transition-colors" />
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full pl-20 pr-8 py-8 bg-[#f8fafc] rounded-[2.5rem] border-2 border-transparent focus:bg-white focus:border-slate-200 outline-none font-black text-xl text-[#384959] transition-all shadow-inner"
                          placeholder="••••••••••••"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8 border-t border-slate-50">
                      <div className="space-y-6">
                        <label className="text-[11px] font-black text-orange-500 uppercase tracking-[0.4em] ml-2">
                          New Identity Cipher
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-20 pr-8 py-8 bg-[#f8fafc] rounded-[2.5rem] border-2 border-transparent focus:bg-white focus:border-orange-200 outline-none font-black text-xl text-[#384959] transition-all shadow-inner"
                            placeholder="Min 12 complex digits..."
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <label className="text-[11px] font-black text-orange-500 uppercase tracking-[0.4em] ml-2">
                          Verification Registry
                        </label>
                        <div className="relative group">
                          <ShieldCheck className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-20 pr-8 py-8 bg-[#f8fafc] rounded-[2.5rem] border-2 border-transparent focus:bg-white focus:border-orange-200 outline-none font-black text-xl text-[#384959] transition-all shadow-inner"
                            placeholder="Repeat identity cipher..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-20 flex justify-center">
                      <button
                        disabled={isUpdatingPassword}
                        className="h-24 px-20 bg-orange-500 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-[0_30px_60px_-15px_rgba(249,115,22,0.4)] hover:bg-[#384959] transition-all active:scale-95 disabled:opacity-50 flex items-center gap-6 group"
                      >
                        {isUpdatingPassword ? (
                          <div className="h-6 w-6 border-4 border-white/20 border-t-white animate-spin rounded-full" />
                        ) : (
                          <Shield className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        )}
                        Harden Authorization Key
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Placeholder Modules */}
              {(activeTab === "notifications" ||
                activeTab === "appearance") && (
                <div className="min-h-[600px] flex flex-col items-center justify-center text-center space-y-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-50/10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />
                  <div className="h-48 w-48 bg-[#f8fafc] rounded-[5rem] flex items-center justify-center text-slate-200 shadow-inner group relative">
                    <div className="absolute inset-0 bg-blue-500/5 animate-ping rounded-[5rem]" />
                    <Activity className="h-24 w-24 group-hover:scale-110 transition-transform duration-1000 relative z-10" />
                  </div>
                  <div className="space-y-6 max-w-md relative z-10">
                    <h3 className="text-4xl font-black text-[#384959] tracking-tighter leading-none italic">
                      Segment Blocked
                    </h3>
                    <p className="text-slate-400 font-bold text-xl leading-relaxed">
                      Our architectural team is finalizing this high-fidelity
                      module. Commencing diagnostic tests soon.
                    </p>
                  </div>
                  <button className="px-12 py-6 bg-[#384959] text-white font-black text-xs uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-[#384959]/20 hover:bg-[#6A89A7] transition-all relative z-10">
                    Access Audit Stream
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
