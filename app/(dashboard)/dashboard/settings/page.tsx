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
    <div className="max-w-[1600px] mx-auto space-y-16 pb-32">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#BDDFEC]/20 rounded-full border border-[#BDDFEC]/40"
          >
            <Settings className="h-4 w-4 text-[#6A89A7]" />
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-[0.3em]">
              Core Configuration Mode
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter"
          >
            Institutional <span className="text-[#6A89A7]">Settings</span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-xl max-w-2xl leading-relaxed">
            Manage your professional identity, harden security protocols, and
            calibrate your personalized learning environment.
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
        {/* Navigation Sidebar */}
        <div className="space-y-4">
          {tabs.map((tab, idx) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full p-8 rounded-[2.5rem] border-2 transition-all duration-500 text-left group relative overflow-hidden",
                activeTab === tab.id
                  ? "bg-[#384959] border-[#384959] text-white shadow-2xl shadow-[#384959]/20 translate-x-4"
                  : "bg-white border-transparent hover:border-slate-100 text-slate-400",
              )}
            >
              <div className="flex items-center gap-6 relative z-10">
                <div
                  className={cn(
                    "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm",
                    activeTab === tab.id
                      ? "bg-white/10 text-white"
                      : "bg-slate-50 text-slate-300 group-hover:bg-[#BDDFEC]/20 group-hover:text-[#6A89A7]",
                  )}
                >
                  <tab.icon className="h-6 w-6" />
                </div>
                <div>
                  <p
                    className={cn(
                      "text-lg font-black tracking-tighter leading-none mb-1.5",
                      activeTab === tab.id ? "text-white" : "text-[#384959]",
                    )}
                  >
                    {tab.label}
                  </p>
                  <p
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest opacity-60",
                      activeTab === tab.id ? "text-white" : "text-slate-400",
                    )}
                  >
                    {activeTab === tab.id ? "Active Section" : "Configuration"}
                  </p>
                </div>
              </div>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-highlight"
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-1.5 bg-[#6A89A7] rounded-l-full"
                />
              )}
            </motion.button>
          ))}

          <div className="mt-12 p-10 bg-gradient-to-br from-[#BDDFEC] to-[#6A89A7] rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
            <ShieldCheck className="absolute bottom-[-10%] right-[-10%] h-32 w-32 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
            <div className="relative z-10 space-y-4">
              <h4 className="text-xl font-black tracking-tighter leading-tight">
                Privacy Guard
              </h4>
              <p className="text-[10px] font-bold text-white/80 leading-relaxed uppercase tracking-widest">
                Your institutional data is encrypted with AES-256 standard and
                verified by HIPAA compliance engines.
              </p>
              <button className="w-full py-4 bg-white/20 backdrop-blur-md rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] border border-white/20 hover:bg-white/30 transition-all">
                Audit Security Logs
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="xl:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[4rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 p-12 lg:p-20 relative overflow-hidden"
            >
              {/* Identity Section */}
              {activeTab === "profile" && (
                <div className="space-y-16">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 border-b border-slate-100 pb-16">
                    <div className="flex items-center gap-10">
                      <div className="relative group">
                        <div className="h-28 w-28 bg-gradient-to-br from-[#BDDFEC] to-[#6A89A7] rounded-[3rem] p-1 shadow-2xl shadow-[#6A89A7]/20 group-hover:scale-105 transition-transform duration-500">
                          <div className="h-full w-full bg-white rounded-[2.8rem] flex items-center justify-center overflow-hidden">
                            <UserCircle className="h-14 w-14 text-[#6A89A7]" />
                          </div>
                        </div>
                        <button className="absolute -bottom-2 -right-2 h-12 w-12 bg-[#384959] text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-[#6A89A7] transition-all">
                          <Camera className="h-5 w-5" />
                        </button>
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-[#384959] tracking-tighter">
                          {user?.name}
                        </h2>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-widest">
                            Master Coder ID: #{user?.id?.slice(-6)}
                          </span>
                          <div className="h-1 w-1 rounded-full bg-slate-200" />
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            {user?.role} Tier Account
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="h-14 px-8 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-100/50">
                      Purge Record
                    </button>
                  </div>

                  <form
                    onSubmit={handleProfileSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                  >
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                        Professional Nomen
                      </label>
                      <div className="relative group">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#6A89A7] transition-colors" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-16 pr-6 py-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-[#384959] transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                        Digital Coordinates
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#6A89A7] transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-16 pr-6 py-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-[#384959] transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 pt-8 flex items-center justify-between gap-8 border-t border-slate-50">
                      <p className="text-xs text-slate-400 font-bold max-w-sm italic leading-relaxed">
                        Identity updates will propagate across all institutional
                        certificates and telemetry reports within 24 hours.
                      </p>
                      <button
                        disabled={isUpdatingProfile}
                        className="h-20 px-12 bg-[#384959] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#384959]/20 hover:bg-[#6A89A7] transition-all active:scale-95 disabled:opacity-50 flex items-center gap-4 shrink-0"
                      >
                        {isUpdatingProfile ? (
                          <div className="h-5 w-5 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                        ) : (
                          <Save className="h-5 w-5" />
                        )}
                        Commit Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Section */}
              {activeTab === "security" && (
                <div className="space-y-16">
                  <div className="flex items-center gap-6 pb-12 border-b border-slate-100">
                    <div className="h-16 w-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-inner">
                      <Lock className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-[#384959] tracking-tighter leading-none mb-2">
                        Harden Protocol
                      </h2>
                      <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">
                        Multi-Factor Credential Invalidation Engine
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-12">
                    <div className="space-y-4 max-w-md">
                      <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">
                        Current Authorization Key
                      </label>
                      <div className="relative group">
                        <History className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#6A89A7] transition-colors" />
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full pl-16 pr-6 py-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-[#6A89A7]/20 focus:bg-white outline-none font-black text-[#384959] transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest ml-1">
                          New Identity Cipher
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-16 pr-6 py-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-black text-[#384959] transition-all"
                            placeholder="Strong encryption..."
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest ml-1">
                          Verify Cipher Integrity
                        </label>
                        <div className="relative group">
                          <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-16 pr-6 py-6 bg-[#f8fafc] rounded-3xl border border-transparent focus:border-orange-500/20 focus:bg-white outline-none font-black text-[#384959] transition-all"
                            placeholder="Repeat cipher..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-16 border-t border-slate-50 flex items-center justify-center">
                      <button
                        disabled={isUpdatingPassword}
                        className="h-20 px-16 bg-orange-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-orange-500/20 hover:bg-[#384959] transition-all active:scale-95 disabled:opacity-50 flex items-center gap-4"
                      >
                        {isUpdatingPassword ? (
                          <div className="h-5 w-5 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                        ) : (
                          <Shield className="h-5 w-5" />
                        )}
                        Hard-Reset Authentication
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Placeholders for notifications/appearance */}
              {(activeTab === "notifications" ||
                activeTab === "appearance") && (
                <div className="h-[500px] flex flex-col items-center justify-center text-center space-y-10 group">
                  <div className="h-40 w-40 bg-slate-50 rounded-[4rem] flex items-center justify-center text-slate-200 shadow-inner group-hover:rotate-12 transition-transform duration-1000">
                    <Activity className="h-20 w-20 animate-pulse" />
                  </div>
                  <div className="space-y-3 max-w-xs">
                    <h3 className="text-3xl font-black text-[#384959] tracking-tighter leading-none italic">
                      Configuration Locked
                    </h3>
                    <p className="text-slate-400 font-bold text-lg leading-relaxed">
                      Our engineering team is finalizing this high-fidelity
                      module segment.
                    </p>
                  </div>
                  <button className="px-10 py-5 bg-[#384959] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#384959]/10">
                    Access Audit Queue
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
