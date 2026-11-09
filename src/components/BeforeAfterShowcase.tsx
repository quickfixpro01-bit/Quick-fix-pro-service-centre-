import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  ArrowRight, 
  Wrench, 
  Maximize2, 
  X, 
  Check, 
  ShieldCheck,
  Droplets,
  Layers
} from 'lucide-react';
import { REAL_BEFORE_AFTER_ITEMS, RealBeforeAfterItem } from '../data/beforeAfterData';

interface BeforeAfterShowcaseProps {
  onBookService?: (serviceName?: string) => void;
}

export const BeforeAfterShowcase: React.FC<BeforeAfterShowcaseProps> = ({ onBookService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItemId, setActiveItemId] = useState<string>(REAL_BEFORE_AFTER_ITEMS[0].id);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const filteredItems = REAL_BEFORE_AFTER_ITEMS.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const activeItem = REAL_BEFORE_AFTER_ITEMS.find(item => item.id === activeItemId) || REAL_BEFORE_AFTER_ITEMS[0];

  return (
    <section id="before-after" className="py-20 bg-slate-100/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Real Service Transformations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Before & After Service Results
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Real photos and field transformations from Quick Fix Pro doorstep repairs across Bangalore: deep descaling, tub disassembly, and rusted body replacements.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Transformations ({REAL_BEFORE_AFTER_ITEMS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('descaling')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === 'descaling'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Limescale & Hard Water Descaling
            </button>
            <button
              onClick={() => setSelectedCategory('body-restoration')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === 'body-restoration'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Rusted Body & Cabinet Change
            </button>
            <button
              onClick={() => setSelectedCategory('tub-cleaning')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === 'tub-cleaning'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Drum & Pulsator Wash
            </button>
            <button
              onClick={() => setSelectedCategory('disassembly')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === 'disassembly'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Tub Disassembly
            </button>
          </div>
        </div>

        {/* Featured Spotlight Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-14 transition-colors duration-200">
          <div className="grid lg:grid-cols-12 items-stretch">
            
            {/* Left Col: High-Res Real Before/After Poster */}
            <div className="lg:col-span-7 relative bg-slate-950 flex items-center justify-center min-h-[380px] sm:min-h-[480px] p-4 group">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full max-h-[560px] object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Category Tag overlay */}
              <div className="absolute top-6 left-6 z-10 px-3 py-1 rounded-full bg-slate-900/90 text-amber-300 text-xs font-bold border border-amber-400/40 shadow-md">
                {activeItem.categoryLabel}
              </div>

              {/* Zoom Button overlay */}
              <button
                onClick={() => setZoomImage(activeItem.image)}
                className="absolute bottom-6 right-6 z-10 px-3.5 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs border border-slate-700 shadow-lg cursor-pointer"
                title="View Full Resolution"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Poster View</span>
              </button>
            </div>

            {/* Right Col: Service Breakdown & Helpline */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-50/60 dark:bg-slate-950/60">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                    Quick Fix Pro Case Study
                  </span>
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                    {activeItem.priceNote}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-3 leading-snug">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {activeItem.subtitle}
                </p>

                {/* Problem vs Solution Boxes */}
                <div className="mt-5 space-y-3">
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200/80 dark:border-rose-900">
                    <div className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      The Problem (Before):
                    </div>
                    <p className="text-xs text-rose-900/90 dark:text-rose-200 mt-1 leading-relaxed">
                      {activeItem.problem}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-900">
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      The Solution (After):
                    </div>
                    <p className="text-xs text-emerald-900/90 dark:text-emerald-200 mt-1 leading-relaxed">
                      {activeItem.solution}
                    </p>
                  </div>
                </div>

                {/* Features Pill List */}
                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Key Advantages:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {activeItem.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onBookService && onBookService(activeItem.title)}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Book This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:+918095996638"
                    className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-amber-400 flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>8095996638</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Educational Bangalore Hard Water Warning Callout */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 border border-blue-500/30 shadow-xl relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                Bangalore Hard Water Alert
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                Hard Water is Silently Damaging Your Washing Machine
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Borewell water in Bangalore creates hidden calcium limescale on outer drums, heating elements, and spider arms. This causes foul laundry odors, heavy vibrations, and increases power consumption by up to 30%.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-amber-300 font-semibold">
                <span>✓ Removes Hidden Limescale</span>
                <span>✓ Stops Bad Odors</span>
                <span>✓ Extends Machine Life</span>
                <span>✓ From Just ₹699* (Front ₹1499 • Top ₹1299 • Semi ₹699)</span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <button
                onClick={() => onBookService && onBookService('Washing Machine Deep Cleaning')}
                className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg text-center cursor-pointer transition-all"
              >
                Book Deep Cleaning (from ₹699)
              </button>
              <a
                href="tel:+918095996638"
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs sm:text-sm border border-slate-700 text-center transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call: 8095996638
              </a>
            </div>
          </div>
        </div>

        {/* Gallery Grid of All 11 Real Cases */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                All Before & After Proofs ({filteredItems.length})
              </h3>
              <p className="text-xs text-slate-500">
                Click any case to inspect details in the spotlight viewer above.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isSelected = item.id === activeItemId;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveItemId(item.id);
                    // scroll smoothly to the spotlight
                    const el = document.getElementById('before-after');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group rounded-2xl bg-white border overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-lg'
                      : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {/* Poster Thumbnail */}
                  <div className="relative h-60 bg-slate-950 overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-700">
                      {item.categoryLabel}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomImage(item.image);
                      }}
                      className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-slate-900/80 text-white hover:bg-blue-600 transition-colors"
                      title="Zoom"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-amber-700">{item.priceNote}</div>
                      <h4 className="font-heading font-bold text-slate-900 text-sm mt-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.problem}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-600 group-hover:underline flex items-center gap-1">
                        View Spotlight <ArrowRight className="w-3 h-3" />
                      </span>
                      <span className="text-[11px] text-slate-400">Ph: {item.phone}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Full-screen Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-transparent">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={zoomImage}
              alt="Zoomed Before After Poster"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};
