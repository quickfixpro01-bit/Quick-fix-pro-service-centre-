import React from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Clock, 
  Phone, 
  MessageSquare,
  CheckCircle2,
  Sliders,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { APPLIANCE_SERVICES, BRANDS } from '../data/servicesData';
import { TIERED_PACKAGES, ServicePackage } from '../data/packagesData';
import { PriceCalculator } from '../components/PriceCalculator';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string, packageId?: string) => void;
  onSelectPackage: (pkg: ServicePackage) => void;
  onBookWithEstimate: (applianceId: string, issue: string, brand: string, price: number) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onSelectPackage,
  onBookWithEstimate
}) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>Bangalore Multi-Brand Appliance Repair</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Comprehensive Appliance Services & Proper Transparent Rates
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Same-day doorstep repair, genuine OEM spare parts, and written <strong>6-month warranty</strong> across all Bangalore localities. Inspection fee of ₹199 is 100% waived on repair approval.
          </p>

          {/* Trust Highlights Pill Strip */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              5,000+ Happy Customers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              6-Month Written Warranty
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              Proper Transparent Rates
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+918095996638"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Direct Booking: 8095996638</span>
            </a>
            <a
              href="https://wa.me/918095996638?text=Hi%20Quick%20Fix%20Pro,%20I%20need%20doorstep%20appliance%20repair%20in%20Bangalore."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Booking</span>
            </a>
          </div>

          {/* Brands bar */}
          <div className="mt-8 pt-6 border-t border-slate-200/80">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Authorized Spares & Expertise For All Leading Brands:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              {BRANDS.map((b, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs"
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Core Appliance Service Cards with Exact Multi-Brand Illustrations */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Our 4 Core Appliance Repair Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select your appliance to view detailed repair procedures, diagnostics, and transparent pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {APPLIANCE_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Exact Multi-Brand Graphic Container */}
                  <div className="relative bg-white border-b border-slate-100 p-4 flex items-center justify-center">
                    <img
                      src={srv.image}
                      alt={srv.name}
                      className="w-full h-64 object-contain"
                    />

                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md">
                      Starting ₹{srv.startingPrice}
                    </div>

                    <div className="absolute top-4 right-4 bg-slate-900/85 text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {srv.avgRepairTime}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                        {srv.tagline}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mt-0.5">
                        {srv.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    {/* Types covered */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Supported Appliance Types:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {srv.types.map((type, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 bg-white text-slate-700 rounded-md border border-slate-200 text-xs font-medium"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Common Issues Fixed */}
                    <div>
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Common Issues Repaired:
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {srv.popularIssues.map((iss, iIdx) => (
                          <div key={iIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                            <span className="truncate">{iss}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Features */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Service Inclusions:
                      </div>
                      <div className="space-y-1.5">
                        {srv.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-6 sm:p-8 pt-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Proper Rate • 6-Mo Warranty</span>
                    <strong className="text-xs text-emerald-700">₹199 Inspection Waived</strong>
                  </div>

                  <button
                    onClick={() => onOpenBooking(srv.id)}
                    className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Book {srv.name.replace(' Repair', '')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Tiered Packages & AMC Section */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Yearly & Combo Savings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
              Tiered Maintenance Plans & AMC
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Prevent expensive sudden breakdowns with structured maintenance packages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERED_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 bg-white border flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                  pkg.popular ? 'border-blue-600 shadow-md ring-2 ring-blue-600/20' : 'border-slate-200'
                }`}
              >
                <div>
                  {pkg.badge && (
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-3 ${pkg.badgeColor || 'bg-slate-900 text-white'}`}>
                      {pkg.badge}
                    </span>
                  )}
                  <div className="text-[11px] font-bold text-blue-600 uppercase">{pkg.period}</div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mt-1">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{pkg.tagline}</p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-slate-900 font-heading">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs line-through text-slate-400">
                        ₹{pkg.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-[10px] font-semibold text-emerald-700 mt-0.5">{pkg.savings}</div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    {pkg.benefits.slice(0, 4).map((b, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                  >
                    Book This Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Transparent Cost Calculator */}
        <div className="pt-4">
          <PriceCalculator onBookWithEstimate={onBookWithEstimate} />
        </div>

      </div>
    </div>
  );
};
