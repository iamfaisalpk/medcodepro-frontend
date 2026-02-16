"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/authSlice";
import { setAccessToken } from "@/lib/axios";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User as UserIcon,
  Activity,
  BookOpen,
  Layers,
  ClipboardList,
  BarChart3,
  Award,
  ShieldCheck,
  FileBarChart,
  BrainCircuit,
  HelpCircle,
  LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Auth redirection
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    setAccessToken(null);
    router.push("/login");
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#6A89A7]/20 border-t-[#6A89A7] shadow-xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="h-6 w-6 text-[#6A89A7] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const studentItems: NavItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "My Courses", icon: BookOpen, href: "/dashboard/my-courses" },
    { name: "Learning Modules", icon: Layers, href: "/dashboard/modules" },
    { name: "Quiz & Tests", icon: ClipboardList, href: "/dashboard/quizzes" },
    { name: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { name: "Certificates", icon: Award, href: "/dashboard/certificates" },
  ];

  const adminItems: NavItem[] = [
    {
      name: "Users Control",
      icon: ShieldCheck,
      href: "/dashboard/admin/users",
    },
    { name: "Courses Pool", icon: BookOpen, href: "/dashboard/admin/courses" },
    {
      name: "System Insights",
      icon: Activity,
      href: "/dashboard/admin/analytics",
    },
    {
      name: "Audit Engine",
      icon: BrainCircuit,
      href: "/dashboard/admin/quizzes",
    },
    { name: "Reports", icon: FileBarChart, href: "/dashboard/admin/reports" },
  ];

  const navItems = user?.role === "admin" ? adminItems : studentItems;

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans selection:bg-[#6A89A7]/10 selection:text-[#6A89A7]">
      {/* desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-white border-r border-[#6A89A7]/10 transition-all duration-500 ease-in-out z-40 shadow-[20px_0_50px_-20px_rgba(106,137,167,0.05)]",
          isSidebarOpen ? "w-80" : "w-24",
        )}
      >
        {/* Brand */}
        <div className="h-24 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#6A89A7] to-[#384959] p-2.5 rounded-2xl shadow-lg shadow-[#6A89A7]/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <Activity className="h-7 w-7 text-white relative z-10" />
            </div>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-black bg-gradient-to-r from-[#384959] to-[#6A89A7] bg-clip-text text-transparent tracking-tighter"
              >
                MedCodePro
              </motion.span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-8 custom-scrollbar">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative",
                    isActive
                      ? "bg-[#6A89A7] text-white shadow-lg shadow-[#6A89A7]/30"
                      : "text-slate-500 hover:bg-[#f8fafc] hover:text-[#384959]",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-6 w-6 transition-transform duration-500 group-hover:scale-110 shrink-0",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-[#6A89A7]",
                    )}
                  />
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-bold tracking-tight text-[15px] whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}

                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-6 px-4 py-2 bg-[#384959] text-white text-[12px] font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 z-50 shadow-2xl shadow-black/20 whitespace-nowrap border border-white/10">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

        </nav>

        {/* User Card / Logout */}
        <div className="p-6 border-t border-slate-100/60 shrink-0">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-4 w-full p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300 group font-black",
              !isSidebarOpen && "justify-center",
            )}
          >
            <LogOut className="h-6 w-6 transition-transform group-hover:rotate-12 group-hover:translate-x-1" />
            {isSidebarOpen && (
              <span className="tracking-tighter text-[15px] uppercase">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* mobile drawer overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#384959]/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-4 left-4 w-[85%] max-w-sm bg-white rounded-[2.5rem] shadow-2xl z-50 lg:hidden flex flex-col overflow-hidden border border-white"
            >
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#6A89A7] p-2 rounded-xl">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-black text-[#384959]">
                    MedCodePro
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-slate-50 rounded-xl"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-4 p-5 rounded-2xl transition-all font-bold",
                          isActive
                            ? "bg-[#384959] text-white"
                            : "text-slate-500",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="p-8 border-t border-slate-50">
                <button
                  onClick={handleLogout}
                  className="w-full py-5 rounded-2xl bg-red-50 text-red-500 font-black flex items-center justify-center gap-3"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header
          className={cn(
            "h-24 sticky top-0 flex items-center justify-between px-6 lg:px-12 z-30 transition-all duration-300",
            isScrolled
              ? "bg-white/80 backdrop-blur-xl border-b border-[#6A89A7]/10 shadow-sm"
              : "bg-transparent",
          )}
        >
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex p-3 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-[#6A89A7] transition-all active:scale-95"
            >
              <Menu className="h-5 w-5 text-slate-500" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-3 rounded-2xl bg-white shadow-sm border border-slate-100"
            >
              <Menu className="h-5 w-5 text-slate-500" />
            </button>

            <div className="relative hidden md:flex items-center group">
              <Search className="absolute left-4 h-5 w-5 text-slate-300 group-focus-within:text-[#6A89A7] transition-colors" />
              <input
                type="text"
                placeholder="Quick Search (Lessons, Chapters...)"
                className="pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-2xl w-[320px] focus:w-[400px] hover:border-slate-200 focus:ring-4 focus:ring-[#6A89A7]/10 outline-none text-sm font-bold placeholder:text-slate-300 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <button className="relative p-3 rounded-2xl bg-white border border-slate-100 hover:bg-slate-50 transition-all shadow-sm group">
              <Bell className="h-5 w-5 text-slate-500 group-hover:text-[#6A89A7]" />
              <div className="absolute top-2.5 right-2.5 h-3 w-3 bg-[#6A89A7] rounded-full border-[3px] border-white animate-pulse"></div>
            </button>

            <div className="flex items-center gap-4 pl-4 lg:pl-8 lg:border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-[#384959] leading-none mb-1">
                  {user?.name}
                </p>
                <div className="flex items-center justify-end gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {user?.role}
                  </span>
                </div>
              </div>
              <Link
                href="/dashboard/settings"
                className="relative active:scale-90 transition-transform"
              >
                <div className="h-12 w-12 lg:h-14 lg:w-14 rounded-2xl bg-gradient-to-br from-[#BDDFEC] to-[#6A89A7] p-[2px] shadow-lg shadow-[#6A89A7]/10">
                  <div className="h-full w-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden">
                    <UserIcon className="h-6 w-6 text-[#6A89A7]" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* content screen */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-12 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* mobile floating search FAB (optional) */}
        <button className="fixed bottom-8 right-8 h-16 w-16 bg-[#384959] text-white rounded-full lg:hidden flex items-center justify-center shadow-2xl z-40 active:scale-90 transition-transform">
          <Search className="h-6 w-6" />
        </button>
      </main>
    </div>
  );
}
