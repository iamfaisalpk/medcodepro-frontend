"use client";

import { useGetAllUsersQuery } from "@/store/adminApiSlice";
import {
  Users,
  Mail,
  ShieldCheck,
  User as UserIcon,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  UserPlus,
  BadgeCheck,
  ShieldAlert,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useState } from "react";

export default function ManageUsersPage() {
  const { data: usersData, isLoading } = useGetAllUsersQuery({});
  const users = usersData?.data || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (u: any) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center space-y-6">
        <div className="relative">
          <div className="h-24 w-24 animate-spin rounded-full border-4 border-[#6A89A7]/10 border-t-[#6A89A7]"></div>
          <Users className="absolute inset-0 m-auto h-10 w-10 text-[#6A89A7] animate-pulse" />
        </div>
        <p className="font-black text-[#6A89A7] uppercase tracking-[0.4em] text-xs">
          Accessing User Directory
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto space-y-16 pb-32">
      {/* Institutional Intelligence Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#384959]/5 rounded-full border border-[#384959]/10"
          >
            <ShieldCheck className="h-4 w-4 text-[#384959]" />
            <span className="text-[10px] font-black text-[#384959] uppercase tracking-[0.4em]">
              Institutional Access Registry
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-8xl font-black text-[#384959] tracking-tighter leading-none"
          >
            User{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A89A7] to-[#384959]">
              Directory
            </span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-xl max-w-2xl leading-relaxed">
            Manage institutional access levels, audit professional credentials,
            and orchestrate user roles with clinical precision.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-wrap items-center gap-6"
        >
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-[#6A89A7]/10 border border-slate-50 flex items-center gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black text-[#384959] tracking-tighter leading-none">
                {users.length}
              </span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Active Souls
              </span>
            </div>
            <div className="h-14 w-[1px] bg-slate-100 hidden sm:block" />
            <button className="h-16 px-10 bg-[#384959] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#6A89A7] transition-all shadow-2xl shadow-[#384959]/20 flex items-center gap-4 group active:scale-95">
              <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Provision User
            </button>
          </div>
        </motion.div>
      </div>

      {/* Advanced Telemetry Filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[3.5rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-50 flex flex-col xl:flex-row items-center gap-8"
      >
        <div className="relative flex-1 block w-full group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-[#6A89A7] transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by credentials, identity, or access tier..."
            className="w-full pl-20 pr-10 py-6 bg-[#f8fafc]/50 border-2 border-transparent rounded-[2.5rem] focus:ring-8 focus:ring-[#6A89A7]/5 focus:bg-white focus:border-[#6A89A7]/20 transition-all outline-none font-bold text-slate-600 text-lg placeholder:text-slate-300"
          />
        </div>
        <div className="flex items-center gap-6 w-full xl:w-auto">
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-4 px-12 py-6 bg-white border-2 border-slate-100 rounded-[2.5rem] text-[#384959] font-black text-xs uppercase tracking-[0.2em] hover:border-[#6A89A7] transition-all group overflow-hidden relative">
            <Filter className="h-5 w-5 text-slate-400 group-hover:text-[#6A89A7]" />
            Advanced Parameters
          </button>
          <button className="h-20 w-20 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center text-[#6A89A7] hover:bg-[#384959] hover:text-white transition-all shadow-inner">
            <Activity className="h-6 w-6" />
          </button>
        </div>
      </motion.div>

      {/* Directory Interface */}
      <div className="bg-white rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(106,137,167,0.1)] border border-slate-50 overflow-hidden">
        {/* Desktop Interface */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">
                  Professional Identity
                </th>
                <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">
                  Registry Tier
                </th>
                <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">
                  Institutional Integrity
                </th>
                <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] text-right">
                  Control
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredUsers.map((user: any, idx: number) => (
                  <motion.tr
                    key={user._id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-slate-50/70 transition-all group relative"
                  >
                    <td className="px-12 py-12">
                      <div className="flex items-center gap-8">
                        <div className="h-20 w-20 rounded-[2.5rem] bg-gradient-to-br from-[#BDDFEC] via-[#6A89A7] to-[#384959] p-[3px] shadow-2xl shadow-[#6A89A7]/20 group-hover:scale-105 transition-transform duration-700">
                          <div className="h-full w-full rounded-[2.4rem] bg-white flex items-center justify-center">
                            <UserIcon className="h-8 w-8 text-[#6A89A7]" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-black text-[#384959] tracking-tighter group-hover:text-[#6A89A7] transition-colors">
                            {user.name}
                          </p>
                          <div className="flex items-center gap-3">
                            <Mail className="h-3.5 w-3.5 text-slate-300" />
                            <span className="text-sm text-slate-400 font-bold tracking-tight">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-12">
                      <div className="flex flex-col gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border shadow-sm w-fit",
                            user.role === "admin"
                              ? "bg-purple-50 text-purple-600 border-purple-100"
                              : "bg-blue-50 text-[#6A89A7] border-blue-100",
                          )}
                        >
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-12 py-12">
                      <div
                        className={cn(
                          "inline-flex items-center gap-4 px-6 py-3 rounded-[1.5rem] border transition-all",
                          user.isVerified
                            ? "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-emerald-500/5 shadow-lg"
                            : "bg-amber-50 border-amber-100 text-amber-600 shadow-amber-500/5 shadow-lg",
                        )}
                      >
                        <div
                          className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            user.isVerified
                              ? "bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                              : "bg-amber-500",
                          )}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                          {user.isVerified
                            ? "Authenticated"
                            : "Awaiting Verification"}
                        </span>
                      </div>
                    </td>
                    <td className="px-12 py-12 text-right">
                      <button className="h-16 w-16 rounded-[1.5rem] bg-white text-slate-300 hover:bg-[#384959] hover:text-white transition-all shadow-xl shadow-[#6A89A7]/5 border border-slate-100 hover:border-transparent active:scale-95 flex items-center justify-center">
                        <MoreVertical className="h-7 w-7" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Cinematic Mobile Interface */}
        <div className="xl:hidden p-8 sm:p-12 space-y-10">
          <AnimatePresence>
            {filteredUsers.map((user: any) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 bg-[#f8fafc] rounded-[3.5rem] border border-slate-100 shadow-xl shadow-[#6A89A7]/5 space-y-10 group hover:bg-white transition-all duration-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-[#6A89A7] to-[#384959] flex items-center justify-center text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                      <UserIcon className="h-8 w-8 relative z-10" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-[#384959] tracking-tighter leading-none mb-2">
                        {user.name}
                      </p>
                      <div
                        className={cn(
                          "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border w-fit",
                          user.role === "admin"
                            ? "bg-purple-100/50 text-purple-600 border-purple-200"
                            : "bg-blue-100/50 text-[#6A89A7] border-blue-200",
                        )}
                      >
                        {user.role} TIER
                      </div>
                    </div>
                  </div>
                  <button className="h-14 w-14 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-center text-slate-400 active:scale-90 transition-all">
                    <MoreVertical className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-200/50">
                  <div className="flex items-center gap-4 text-[#384959]">
                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                      <Mail className="h-4 w-4 text-[#6A89A7]" />
                    </div>
                    <span className="text-sm font-bold tracking-tight truncate">
                      {user.email}
                    </span>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group-hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-3 w-3 rounded-full",
                          user.isVerified
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-amber-500",
                        )}
                      />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#384959]">
                        {user.isVerified
                          ? "Authenticated Identity"
                          : "Awaiting Verification"}
                      </span>
                    </div>
                    <BadgeCheck
                      className={cn(
                        "h-6 w-6",
                        user.isVerified ? "text-emerald-500" : "text-slate-200",
                      )}
                    />
                  </div>
                </div>

                <button className="w-full h-16 bg-[#384959] text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-[#384959]/20 group-hover:bg-[#6A89A7] transition-all active:scale-95">
                  Institutional Dossier
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-48 text-center bg-white">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-40 w-40 bg-slate-50 rounded-[4rem] flex items-center justify-center mx-auto mb-10 text-slate-200 shadow-inner group"
            >
              <Search className="h-16 w-16 group-hover:rotate-12 transition-transform duration-700" />
            </motion.div>
            <h4 className="text-4xl font-black text-[#384959] tracking-tighter">
              Archive Void Detected
            </h4>
            <p className="text-slate-400 font-bold text-lg max-w-sm mx-auto mt-4 leading-relaxed">
              The professional directory yielded no spectral matches for your
              current telemetry filters.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-10 px-10 py-4 bg-slate-50 text-[#6A89A7] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#6A89A7] hover:text-white transition-all"
            >
              Reset Directory Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
