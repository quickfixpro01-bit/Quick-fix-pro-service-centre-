import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Wrench, 
  Sparkles, 
  ArrowRight,
  HeartHandshake,
  BadgeCheck,
  Building2,
  FileCheck
} from 'lucide-react';
import { BANGALORE_AREAS } from '../data/servicesData';

import { PageId } from '../types/navigation';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigatePage: (pageId: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigatePage }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb & Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>About Quick Fix Pro Service Centre</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Bangalore's Most Trusted Doorstep Appliance Repair Centre
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded with a singular mission: to eliminate the frustration of unreliable mechanics, duplicate spare parts, and surprise bills by delivering certified doorstep appliance care across all of Bangalore.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span>Book a Doorstep Service</span>
            </button>
            <a
              href="tel:+918095996638"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: 8095996638</span>
            </a>
          </div>
        </div>

        {/* Company Overview & Official Emblem Spotlight */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-3 rounded-3xl bg-gradient-to-br from-amber-500/20 via-blue-600/10 to-slate-900/10 border border-amber-400/40 shadow-2xl">
                <img
                  src="/assets/aistudio/image_d5e93998_07d21934.jpg"
                  alt="Quick Fix Pro Official Emblem"
                  className="w-full max-w-sm rounded-2xl object-cover shadow-inner"
                />
                <div className="mt-3 text-center">
                  <div className="text-xs font-bold text-slate-900">Official Bangalore Service Emblem</div>
                  <div className="text-[11px] text-slate-500">Vidhana Soudha • Metro • 4 Core Appliances</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-slate-700 text-sm leading-relaxed">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Our Story & Vision
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Transforming Home Appliance Maintenance in Bengaluru
              </h2>
              
              <p>
                Started in 2021 by a dedicated team of senior refrigeration and electronic control engineers, <strong>Quick Fix Pro Service Centre</strong> recognized that modern Indian homes depend heavily on their washing machines, refrigerators, air conditioners, and microwaves. When an appliance breaks down in Bangalore, homeowners were frequently left with long waiting times, unskilled local handymen, or unauthorized workshops that fit counterfeit spare parts.
              </p>

              <p>
                We built Quick Fix Pro to change that standard completely. Today, we operate decentralized technical dispatch hubs across North, South, East, West, and Central Bangalore. Every technician carries certified diagnostic meters, high-pressure cleaning pumps, and factory-sealed OEM parts in their mobile kits.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-extrabold text-blue-600 font-heading">5,000+</div>
                  <div className="text-[11px] text-slate-500">Happy Bangalore Customers</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-extrabold text-emerald-600 font-heading">6 Mo</div>
                  <div className="text-[11px] text-slate-500">Written Warranty (180 Days)</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-extrabold text-amber-500 font-heading">Proper Rate</div>
                  <div className="text-[11px] text-slate-500">₹199 Inspection Waived</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-extrabold text-slate-900 font-heading">100%</div>
                  <div className="text-[11px] text-slate-500">Genuine OEM Spares</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Technician Standards & Verification Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Quality & Trust
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
              Rigorous Technician Credentials & Standards
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              We never send unverified third-party contractors to your home. Every Quick Fix Pro technician meets strict employment criteria.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                Police & Background Verified
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                100% background-checked with verified permanent address, government ID card, and mandatory clean police record for your family's safety.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-amber-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                Multi-Brand Certified
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Trained on inverter motherboards, brushless DC motors, and sealed refrigeration loops for Samsung, LG, Whirlpool, Bosch, IFB, and Godrej.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                Advanced Toolkits
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Technicians carry precision nitrogen leak testers, digital multimeters, electronic refrigerant scales, and 140 PSI high-pressure jet wash kits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                Doorstep Ethics Code
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Clean uniform, shoe covers, respectful communication, upfront rate explanation before work starts, and leaving your home spotless.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Guarantees Pillar Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              The Quick Fix Pro Guarantee
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
              Four Core Pillars We Promise to Every Bangalore Customer
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              When you call 8095996638 or book online, these guarantees are contractually honored on every job sheet.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>1. Written 6-Month Warranty</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  180 days complete protection on both replaced spare parts and re-visit labor. If issue recurs, we fix it with ₹0 visit fees.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>2. 100% Genuine OEM Spares</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Factory-sealed brand packaging opened right in front of you. Defective components returned with serial numbers logged on your invoice.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>3. Same-Day 60-90 Min SLA</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Book before 3:00 PM for guaranteed same-day service. Dispatched from 20+ neighbourhood hubs across Bangalore.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <FileCheck className="w-4 h-4" />
                  <span>4. ₹199 Diagnostic Fee Waived</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Transparent upfront quotation before any tools touch your machine. Diagnostic fee is 100% credited against your final repair bill.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bangalore Hubs Directory */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Local Presence
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Bangalore Neighbourhood Dispatch Hubs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Central Headquarters in Koramangala with 20+ localized field hubs covering pin codes 560001 to 560103.
              </p>
            </div>
            <a
              href="tel:+918095996638"
              className="shrink-0 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Bangalore Dispatch: 8095996638</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
            {BANGALORE_AREAS.slice(0, 15).map((area, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div className="font-bold text-slate-900">{area.name}</div>
                <div className="text-[11px] text-slate-500">{area.pincode} • {area.zone}</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                  ~{area.estArrivalMins}m ETA
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              Need assistance in another Bangalore locality? We cover all 100+ pin codes across the city.
            </div>
            <button
              onClick={() => onNavigatePage('contact')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View Contact & Location Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
