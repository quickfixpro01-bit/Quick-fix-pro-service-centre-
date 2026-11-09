import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Award,
  ChevronRight,
  Shield,
  Zap,
  Box
} from 'lucide-react';
import { APPLIANCE_SERVICES, BRANDS } from '../data/servicesData';
import { StaggerContainer, StaggerItem, FadeInUp } from './ScrollAnimation';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('washing-machine');

  return (
    <section id="services" className="py-20 bg-slate-50/60 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeInUp distance={30} duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/80 dark:border-blue-800 shadow-2xs">
            <Wrench className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Quick Fix Pro Service Centre • Bengaluru</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
            Comprehensive Appliance Services & Transparent Rates
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Certified senior engineers, 100% genuine OEM spare parts, and guaranteed same-day doorstep service across all Bangalore neighborhoods.
          </p>

          {/* Supported Brand Badges */}
          <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-slate-800">
            <div className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3">
              Authorized Spares & Multi-Brand Multi-Model Expertise:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {BRANDS.map((brand, i) => (
                <div 
                  key={i}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:-translate-y-0.5"
                >
                  {brand.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        </FadeInUp>

        {/* 4 Core Appliance Cards Grid with Elevated Gradient Accent Headers */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPLIANCE_SERVICES.map((service) => {
            return (
              <StaggerItem key={service.id} className="h-full">
                <div
                  className="group relative flex flex-col justify-between h-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
                >
                  {/* Top Vibrant Gradient Header Bar */}
                  <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"></div>

                  <div className="p-6">
                    {/* Image Showcase Container */}
                    <div className="relative -mx-6 -mt-6 mb-5 overflow-hidden bg-slate-50 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-800 p-4 flex items-center justify-center">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      {/* Price Pill */}
                      <div className="absolute bottom-3 left-3 bg-slate-900 dark:bg-slate-950 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-slate-800">
                        <span className="text-amber-300 font-extrabold">Starting ₹{service.startingPrice}</span>
                      </div>

                      <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-slate-800 dark:text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                        {service.avgRepairTime}
                      </div>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.name}
                    </h3>
                    
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Unboxed Typographic Types */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                        Covers:
                      </span>
                      <div className="space-y-1">
                        {service.types.map((t, idx) => (
                          <div key={idx} className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                            <span className="truncate">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Common Fixes */}
                    <div className="mt-4">
                      <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                        Common Fixes:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {service.popularIssues.slice(0, 3).map((issue, idx) => (
                          <span 
                            key={idx}
                            className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card CTA Footer */}
                  <div className="p-6 pt-0 mt-2">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-blue-600/30 active:scale-98"
                    >
                      <span>Book {service.name.replace(' Repair', '')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="text-[11px] text-slate-500 text-center mt-2 font-medium flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>6-Month Warranty • ₹199 Waived</span>
                    </div>
                  </div>

                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Why Choose Us — The Quick Fix Pro Advantage */}
        <div className="mt-20 pt-16 border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
              Why Choose Us
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
              The Quick Fix Pro Advantage
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Building trust with every doorstep service across Bangalore.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg mb-4 border border-blue-100">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                6-Month Written Warranty
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                All repairs backed by a 6-month written warranty for complete peace of mind. Zero re-visit fees if any issue recurs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg mb-4 border border-amber-100">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                Same-Day Doorstep SLA
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                20+ localized technician hubs across Bangalore ensure 60 to 90 minute arrival at your doorstep, all 7 days a week.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4 border border-emerald-100">
                <Box className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                100% Genuine OEM Spares
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Factory sealed components opened in front of you. Defective parts returned to you with serial numbers logged on your invoice.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
