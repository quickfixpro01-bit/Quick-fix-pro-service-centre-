import React from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  Users, 
  Award, 
  Phone, 
  ArrowRight,
  BadgeCheck,
  Sparkles
} from 'lucide-react';

interface WarrantyRateBannerProps {
  onOpenBooking: () => void;
}

export const WarrantyRateBanner: React.FC<WarrantyRateBannerProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden border-y border-slate-700/80">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide uppercase mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Our Customer Guarantee</span>
            <span className="text-slate-400">•</span>
            <span className="text-amber-300 font-extrabold">5,000+ Happy Customers</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            6-Month Comprehensive Warranty <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
              & Proper Transparent Rates
            </span>
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Every repair in Bangalore is backed by an official written 180-day warranty card with zero hidden fees. Fair, upfront prices guaranteed.
          </p>
        </div>

        {/* 3 Value Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Pillar 1: 6-Month Written Warranty */}
          <div className="rounded-2xl bg-slate-800/80 border border-emerald-500/30 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-between hover:border-emerald-500/60 transition-all shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-5">
                <FileCheck2 className="w-6 h-6" />
              </div>
              
              <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 mb-2">
                180 Days Protection
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                6-Month Written Warranty
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Full 6-month written coverage on both replaced genuine spare parts and technician labor.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Re-visit Charge:</strong> If the issue recurs within 6 months, we fix it 100% free.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Digital & Physical Card:</strong> Official warranty certificate issued to WhatsApp & email.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Genuine OEM Spares:</strong> Unboxed directly at your doorstep in sealed packing.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
              <span>Coverage: Spares + Labor</span>
              <span className="text-emerald-400 font-bold">180 Days Guaranteed</span>
            </div>
          </div>

          {/* Pillar 2: Proper Rate Cards & No Hidden Fees */}
          <div className="rounded-2xl bg-slate-800/80 border border-amber-500/30 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-between hover:border-amber-500/60 transition-all shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-5">
                <IndianRupee className="w-6 h-6" />
              </div>
              
              <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-800 mb-2">
                100% Transparent
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                Proper & Fair Rates
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Standard fixed rate cards with diagnostic inspection credited into final bill upon repair approval.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>₹199 Inspection Waived:</strong> Credited 100% against your repair bill with zero surprises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Upfront Itemized Quote:</strong> Technician provides full cost breakdown before starting work.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Post-Repair Payment:</strong> Pay via UPI, GPay, PhonePe or card only after satisfactory test run.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
              <span>Fair Market Pricing</span>
              <span className="text-amber-400 font-bold">No Hidden Surcharges</span>
            </div>
          </div>

          {/* Pillar 3: 5,000+ Happy Customers Milestone */}
          <div className="rounded-2xl bg-slate-800/80 border border-blue-500/30 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-between hover:border-blue-500/60 transition-all shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              
              <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-950 text-blue-300 border border-blue-800 mb-2">
                Proven Track Record
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                5,000+ Happy Customers
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Trusted by thousands of families across Bengaluru with a stellar 4.9★ rating on Google & JustDial.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>5,000+ Homes Serviced:</strong> Covering Koramangala, Whitefield, HSR, Indiranagar, Jayanagar & all zones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Senior Technician Babu:</strong> Experienced specialists dispatched with verified background checks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>98.4% First-Visit Fix:</strong> Technicians carry 50+ common spare parts in mobile van units.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
              <span>Bengaluru Rating: 4.9★</span>
              <span className="text-sky-300 font-bold">5,000+ Satisfied Homes</span>
            </div>
          </div>

        </div>

        {/* Proper Rate Summary Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Standard Doorstep Proper Rates Across Bangalore</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                  Fixed Labor
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <span>Washing Machine: <strong>from ₹299</strong></span>
                <span>Refrigerator: <strong>from ₹399</strong></span>
                <span>Air Conditioner: <strong>from ₹499</strong></span>
                <span>Microwave Oven: <strong>from ₹249</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+918095996638"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>8095996638</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Book with 6-Mo Warranty</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
