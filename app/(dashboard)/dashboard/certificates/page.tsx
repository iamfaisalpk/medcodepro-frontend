'use client';

import { Award, ShieldCheck, Download } from 'lucide-react';

export default function CertificatesPage() {
  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-[#384959] tracking-tight">Certificates & Achievements</h1>
        <p className="text-slate-500 font-bold tracking-tight">Your earned professional certifications and course completions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1].map((i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-[#6A89A7]/5 border border-slate-50 flex items-center justify-between group">
            <div className="flex items-center gap-8">
              <div className="h-20 w-20 bg-[#BDDFEC] rounded-[2rem] flex items-center justify-center text-[#6A89A7] shadow-lg group-hover:scale-110 transition-transform">
                <Award className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#384959] tracking-tight">Medical Coding Foundations</h3>
                <p className="text-slate-400 font-bold text-sm tracking-tight mt-1">Completed on Feb 10, 2026</p>
              </div>
            </div>
            <button className="h-14 w-14 bg-[#f8fafc] text-slate-400 rounded-2xl flex items-center justify-center hover:bg-[#6A89A7] hover:text-white transition-all shadow-md active:scale-90">
              <Download className="h-6 w-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
