import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  ThumbsUp, 
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/servicesData';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = CUSTOMER_REVIEWS.filter(item => {
    if (filter === 'all') return true;
    return item.appliance.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>5,000+ Happy Customers Across Bengaluru</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            5,000+ Happy Customers with 4.9★ Trust
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Read real feedback from homeowners across Bangalore who rely on our proper rates and 6-month written warranty guarantee.
          </p>

          {/* Rating Summary Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-heading">4.9</span>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Over 5,000+ Verified Ratings</div>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div className="text-xs text-slate-600 text-left">
              <div><strong className="text-slate-900">6 Months</strong> Written warranty on parts & labor</div>
              <div><strong className="text-slate-900">Proper Rates</strong> ₹199 inspection credited to bill</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setFilter('washing machine')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'washing machine'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Washing Machines
            </button>
            <button
              onClick={() => setFilter('refrigerator')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'refrigerator'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Refrigerators
            </button>
            <button
              onClick={() => setFilter('air conditioner')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'air conditioner'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Air Conditioners
            </button>
            <button
              onClick={() => setFilter('microwave')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'microwave'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Microwave Ovens
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {rev.badge}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Author & Locality Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.name}</div>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{rev.locality}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-semibold text-blue-700">{rev.appliance.split(' (')[0]}</div>
                  <div className="text-[10px] text-slate-400">{rev.date}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
