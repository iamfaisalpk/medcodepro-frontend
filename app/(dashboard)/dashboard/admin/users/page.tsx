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
    <div className="max-w-[1600px] mx-auto space-y-12 pb-24">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#BDDFEC]/20 rounded-full border border-[#BDDFEC]/40"
          >
            <ShieldCheck className="h-4 w-4 text-[#6A89A7]" />
            <span className="text-[10px] font-black text-[#6A89A7] uppercase tracking-widest">
              Administrative Control
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black text-[#384959] tracking-tighter"
          >
            User <span className="text-[#6A89A7]">Management</span>
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight text-xl max-w-2xl leading-relaxed">
            Monitor institutional access, verify credentials, and manage
            professional roles across the platform.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4"
        >
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-100 flex items-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-black text-[#384959] tracking-tighter">
                {users.length}
              </p>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
                Total Souls
              </p>
            </div>
            <div className="h-12 w-[1px] bg-slate-100" />
            <button className="h-16 px-8 bg-[#384959] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#6A89A7] transition-all shadow-xl shadow-[#384959]/20 flex items-center gap-3">
              <UserPlus className="h-4 w-4" /> Provision User
            </button>
          </div>
        </motion.div>
      </div>

      {/* Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-[3rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-100 flex flex-col md:flex-row items-center gap-6"
      >
        <div className="relative flex-1 block w-full text-left">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search directory by name, email or role..."
            className="w-full pl-16 pr-6 py-5 bg-[#f8fafc] border-none rounded-[2rem] focus:ring-4 focus:ring-[#6A89A7]/10 focus:bg-white transition-all outline-none font-bold text-slate-600"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-white border border-slate-100 rounded-[2rem] text-slate-500 font-black text-xs uppercase tracking-widest hover:border-[#6A89A7] transition-all">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="h-16 w-16 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center text-slate-400 hover:text-[#6A89A7] transition-all">
            <Activity className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Users Table / List */}
      <div className="bg-white rounded-[4rem] shadow-2xl shadow-[#6A89A7]/5 border border-slate-100 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-12 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Identity Hub
                </th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Role Level
                </th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Institutional Status
                </th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredUsers.map((user: any, idx: number) => (
                  <motion.tr
                    key={user._id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-br from-[#BDDFEC] to-[#6A89A7] p-[2px] shadow-lg shadow-[#6A89A7]/10 group-hover:scale-110 transition-transform duration-500">
                          <div className="h-full w-full rounded-[1.4rem] bg-white flex items-center justify-center">
                            <UserIcon className="h-7 w-7 text-[#6A89A7]" />
                          </div>
                        </div>
                        <div>
                          <p className="text-xl font-black text-[#384959] tracking-tighter group-hover:text-[#6A89A7] transition-colors">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-400 font-bold tracking-tight">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <span
                        className={cn(
                          "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm",
                          user.role === "admin"
                            ? "bg-purple-50 text-purple-600 border-purple-100"
                            : "bg-blue-50 text-[#6A89A7] border-blue-100",
                        )}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-12 py-10 text-left">
                      <div
                        className={cn(
                          "inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all",
                          user.isVerified
                            ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                            : "bg-amber-50 border-amber-100 text-amber-600",
                        )}
                      >
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            user.isVerified
                              ? "bg-emerald-500 animate-pulse"
                              : "bg-amber-500",
                          )}
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {user.isVerified
                            ? "Verified Pro"
                            : "Verification Pending"}
                        </span>
                      </div>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <button className="h-14 w-14 rounded-2xl bg-[#f8fafc] text-slate-300 hover:bg-[#384959] hover:text-white transition-all shadow-inner border border-slate-100 hover:border-transparent active:scale-95">
                        <MoreVertical className="h-6 w-6 mx-auto" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile View (Cards) */}
        <div className="lg:hidden p-8 space-y-6">
          {filteredUsers.map((user: any) => (
            <div
              key={user._id}
              className="p-8 bg-[#f8fafc] rounded-[2.5rem] border border-slate-100 space-y-8 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#6A89A7] flex items-center justify-center text-white">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-[#384959] tracking-tight">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {user.role}
                    </p>
                  </div>
                </div>
                <button className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                  <MoreVertical className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-bold">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      user.isVerified ? "bg-emerald-500" : "bg-amber-500",
                    )}
                  />
                  <span className="text-xs font-black uppercase tracking-widest text-[#384959]">
                    {user.isVerified
                      ? "Verified Account"
                      : "Pending Verification"}
                  </span>
                </div>
              </div>

              <button className="w-full py-4 bg-white border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-[#6A89A7] shadow-sm">
                View Full Profile
              </button>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-32 text-center">
            <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-inner">
              <Search className="h-10 w-10" />
            </div>
            <h4 className="text-2xl font-black text-slate-400 tracking-tighter">
              No Access Records Found
            </h4>
            <p className="text-slate-300 font-bold max-w-xs mx-auto mt-2 leading-relaxed">
              Adjust your search parameters to find specific professionals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
