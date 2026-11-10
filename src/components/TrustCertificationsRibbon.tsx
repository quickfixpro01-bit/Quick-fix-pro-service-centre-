import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Award, 
  Receipt, 
  CheckCircle2, 
  Sparkles,
  Lock,
  Building2,
  PhoneCall
} from 'lucide-react';

interface TrustCertificationsRibbonProps {
  onOpenBooking?: () => void;
}

export const TrustCertificationsRibbon: React.FC<TrustCertificationsRibbonProps> = ({ onOpenBooking }) => {
  const trustItems = [
    {
      id: 'warranty',
      icon: ShieldCheck,
      badge: '6-Month Warranty',
      title: '6-Month Written Warranty',
      description: 'Official guarantee card issued for all spare parts & labor.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
      borderColor: 'border-amber-400/30'
    },
    {
      id: 'verified-techs',
      icon: UserCheck,
      badge: 'Police Verified',
      title: 'Verified Technicians',
      description: 'Aadhaar & background checked senior Bangalore specialists.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/30'
    },
    {
      id: 'iso-certified',
      icon: Award,
      badge: 'ISO 9001:2025',
      title: 'ISO Certified Service',
      description: 'Audited repair process & 100% genuine OEM components.',
      color: 'text-sky-400',
      bgColor: 'bg-sky-400/10',
      borderColor: 'border-sky-400/30'
    },
    {
      id: 'proper-rates',
      icon: Receipt,
      badge: 'Waived Inspection',
      title: 'Proper Upfront Rates',
      description: '₹199 inspection fee waived upon repair approval.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/30'
    }
  ];

  return (
    <section className="relative z-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-y border-slate-800 shadow-xl overflow-hidden py-6 sm:py-8">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h2 className="font-heading font-bold text-xs sm:text-sm text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <span>Trust &amp; Quality Certifications</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 normal-case font-normal text-xs">Bangalore Certified Operations</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-200">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Multi-Brand Authorized Standards</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Genuine Spares</span>
            </span>
          </div>
        </div>

        {/* 4 Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-11 h-11 rounded-xl ${item.bgColor} border ${item.borderColor} ${item.color} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${item.bgColor} ${item.color} border ${item.borderColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Standard
                  </span>
                  <span className="font-mono text-slate-500">QFP-CERT</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
