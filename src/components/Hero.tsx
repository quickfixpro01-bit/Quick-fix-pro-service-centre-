import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Star, 
  Wrench, 
  Zap, 
  MapPin, 
  Award,
  ChevronRight,
  Flame,
  Wind,
  Rotate3d
} from 'lucide-react';
import { APPLIANCE_SERVICES } from '../data/servicesData';
import { SocialIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { useLanguage } from '../context/LanguageContext';
import bangaloreSkylineImg from '../assets/images/bangalore_skyline_hero_1793660095503.jpg';

interface HeroProps {
  onOpenBooking: (initialService?: string) => void;
  onExplorePackages: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplorePackages }) => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-16 lg:pt-14 lg:pb-24">
      {/* Vivid Bangalore Theme Panoramic Skyline Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={bangaloreSkylineImg}
          alt="Bangalore Vidhana Soudha & Tech Park Skyline at Twilight"
          className="w-full h-full object-cover object-center opacity-80 lg:opacity-85 brightness-105 contrast-110 scale-100"
        />
        {/* Balanced Vignette Overlay: Keeps skyline rich & colorful while gently shadowing bottom edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/60 to-slate-950/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
      </div>

      {/* Subtle Blueprint Grid Accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] z-0"></div>
      
      {/* Ambient Regional Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Top Prominent Bengaluru Watermark Badge */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-amber-400/50 text-xs font-bold text-amber-300 shadow-xl backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>{t('hero_locality_kicker')}</span>
          </div>
          <div className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-950/70 border border-slate-700/80 px-3 py-1 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Silicon Valley Doorstep Service Center • 8095996638</span>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Core Value Proposition in High-Contrast Frosted Panel */}
          <div className="lg:col-span-7 backdrop-blur-xl bg-slate-950/85 p-6 sm:p-9 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6 text-center lg:text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-400/50 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-amber-300 font-bold">{t('customers_badge')}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-300 font-semibold">{t('warranty_badge')}</span>
              <span className="text-slate-500">•</span>
              <span className="text-white">Proper Rates</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t('hero_title_1')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                {t('hero_title_2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero_description')}
            </p>

            {/* Official Logo Banner & Direct Hotline Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-amber-500/30 backdrop-blur-sm max-w-xl">
              <img
                src="/assets/aistudio/image_d5e93998_07d21934.jpg"
                alt="Quick Fix Pro Official Emblem"
                className="w-16 h-16 rounded-xl object-cover shadow-lg border-2 border-amber-400 shrink-0"
              />
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Official Bangalore Helpline
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-semibold border border-emerald-800">
                    Live Now
                  </span>
                </div>
                <a
                  href="tel:+918095996638"
                  className="text-2xl sm:text-3xl font-extrabold text-white hover:text-amber-300 font-heading tracking-wide transition-colors"
                >
                  8095996638
                </a>
                <div className="text-[11px] text-slate-300">
                  Doorstep Repair & Maintenance Across All Bangalore Areas
                </div>

                {/* Social media direct links strip */}
                <div className="mt-2.5 pt-2 border-t border-slate-700/80 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-medium">Follow & Chat:</span>
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      title={`${link.name} (${link.handle})`}
                      className={`w-6 h-6 rounded-md flex items-center justify-center transition-all bg-slate-900/90 border ${link.borderClass} ${link.textClass} hover:scale-110 shadow-xs`}
                    >
                      <SocialIcon id={link.id} className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Service Callouts */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-300 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Same-Day 90 Min Doorstep SLA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                6-Month Written Warranty Card
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Proper Transparent Rates (₹199 Waived)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all cursor-pointer text-base hover:-translate-y-0.5"
              >
                <Wrench className="w-5 h-5 text-blue-200" />
                {t('hero_cta_book')}
              </button>

              <a
                href="tel:+918095996638"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-sm sm:text-base hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                {t('btn_call_now')}
              </a>

              <a
                href="https://wa.me/918095996638?text=Hi%20Quick%20Fix%20Pro,%20I%20want%20to%20book%20an%20appliance%20repair%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/40 border border-emerald-500 transition-all text-sm sm:text-base hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Stat Counters from screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-left">
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">5000+</div>
                <div className="text-xs text-slate-400">Happy Bangalore Customers</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">5+ Yrs</div>
                <div className="text-xs text-slate-400">Hands-on Experience</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-heading">All</div>
                <div className="text-xs text-slate-400">Bangalore Zones Covered</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">6 Month</div>
                <div className="text-xs text-slate-400">Written Warranty & Proper Rates</div>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Booking Card & Technician Presence */}
          <div className="lg:col-span-5">
            <div className="relative bg-slate-950/85 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-slate-700/80 shadow-2xl">
              
              {/* Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Instant Bangalore Dispatch
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Inspection Fee: <strong className="text-white">₹199</strong> (Waived on Repair)
                </span>
              </div>

              {/* Instant Appliance Selector */}
              <div className="py-4">
                <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center justify-between">
                  <span>Select Appliance to Fix:</span>
                  <span className="text-xs text-blue-400 font-normal">Starting from ₹249</span>
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  {APPLIANCE_SERVICES.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => onOpenBooking(srv.id)}
                      className="group p-3 rounded-xl bg-slate-900/80 hover:bg-blue-900/30 border border-slate-700/70 hover:border-blue-500/60 transition-all text-left cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                          {srv.name.replace(' Repair', '')}
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {srv.avgRepairTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800">
                        <span className="text-xs font-extrabold text-amber-400">
                          ₹{srv.startingPrice}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Highlight Banner */}
              <div className="mt-2 p-3.5 rounded-xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-600/30 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    New: Service Bundles & Deep Clean Packages
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Save up to 47% on multi-appliance deep cleaning & diagnostics.
                  </div>
                </div>
                <button
                  onClick={onExplorePackages}
                  className="shrink-0 px-2.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                >
                  View Plans
                </button>
              </div>

              {/* Technician Verification Guarantee Bar */}
              <div className="mt-4 pt-4 border-t border-slate-700/70 flex items-center gap-3">
                <div className="flex -space-x-2 shrink-0">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-slate-800 object-cover"
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&q=80"
                    alt="Technician Ramesh"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-slate-800 object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Technician Suresh"
                  />
                  <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    +12
                  </div>
                </div>
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">14 Certified Technicians</span> on duty today across Koramangala, Whitefield, HSR & more.
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
