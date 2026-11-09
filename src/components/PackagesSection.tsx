import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Zap, 
  Clock, 
  Award, 
  ChevronRight, 
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { TIERED_PACKAGES, ServicePackage } from '../data/packagesData';

interface PackagesSectionProps {
  onSelectPackage: (pkg: ServicePackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'amc' | 'bundles' | 'special'>('all');

  const filteredPackages = TIERED_PACKAGES.filter(pkg => {
    if (selectedFilter === 'amc') return pkg.id.includes('amc');
    if (selectedFilter === 'bundles') return pkg.id.includes('bundle') || pkg.id.includes('combo');
    if (selectedFilter === 'special') return pkg.id.includes('deep-clean');
    return true;
  });

  return (
    <section id="packages" className="py-20 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Tiered Appliance Care & Savings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
            Comprehensive Service Packages & AMC
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Prevent sudden breakdowns, reduce high electricity bills, and save up to 47% compared to standalone repairs. Includes certified technicians, genuine parts, and written warranties.
          </p>

          {/* Filter Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              All Packages ({TIERED_PACKAGES.length})
            </button>
            <button
              onClick={() => setSelectedFilter('amc')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === 'amc'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Annual AMC Plan
            </button>
            <button
              onClick={() => setSelectedFilter('special')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === 'special'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Washing Machine Deep Clean
            </button>
            <button
              onClick={() => setSelectedFilter('bundles')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === 'bundles'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Bundles & Combos
            </button>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredPackages.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-3xl bg-white border transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden ${
                  isPopular 
                    ? 'border-blue-500 ring-2 ring-blue-500/20' 
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {/* Top Vibrant Accent Stripe */}
                <div className={`h-2 bg-gradient-to-r ${
                  isPopular 
                    ? 'from-blue-600 via-indigo-600 to-amber-500' 
                    : 'from-emerald-600 via-teal-600 to-blue-600'
                }`}></div>

                {/* Popular Badge */}
                {pkg.badge && (
                  <div className="absolute top-3.5 right-4 z-10">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${pkg.badgeColor || 'bg-slate-900 text-white'}`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Card Header & Pricing */}
                <div className="p-6 pb-4">
                  <div className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider mb-1">
                    {pkg.period}
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {pkg.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    {pkg.appliancePricing ? (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                            Deep Clean Rates
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Transparent
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 text-center">
                          {pkg.appliancePricing.map((tier) => (
                            <div key={tier.type} className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                              <div className="text-[10px] font-semibold text-slate-600 truncate">{tier.type}</div>
                              <div className="text-sm font-extrabold text-slate-900 font-heading">₹{tier.price}</div>
                              {tier.originalPrice && (
                                <div className="text-[9px] line-through text-slate-400">₹{tier.originalPrice}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs line-through text-slate-400 font-medium">
                            ₹{pkg.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{pkg.savings}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Covered Appliances */}
                  <div className="mt-4">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Covered:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {pkg.coveredAppliances.map((app, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200/60"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                      Plan Inclusions:
                    </div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">
                          <strong className="text-slate-900">{feat.title}:</strong> {feat.desc}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card CTA Footer */}
                <div className="p-6 pt-0 mt-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isPopular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30' 
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Choose {pkg.name.split(' ')[0]} Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="text-[10px] text-slate-500 text-center mt-2 font-semibold">
                    No hidden fees • 6-Month Written Warranty
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
