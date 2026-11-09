import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Search, 
  Navigation, 
  Users, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { BANGALORE_AREAS, BangaloreHub } from '../data/servicesData';

interface BangaloreCoverageProps {
  onSelectLocality: (localityName: string) => void;
}

export const BangaloreCoverage: React.FC<BangaloreCoverageProps> = ({ onSelectLocality }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<'All' | 'South' | 'North' | 'East' | 'West' | 'Central'>('All');

  const filteredAreas = useMemo(() => {
    return BANGALORE_AREAS.filter(area => {
      const matchesZone = selectedZone === 'All' || area.zone === selectedZone;
      const matchesSearch = 
        area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.pincode.includes(searchTerm) ||
        area.landmark.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesZone && matchesSearch;
    });
  }, [selectedZone, searchTerm]);

  return (
    <section id="coverage" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            All Bangalore Doorstep Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Check Service Availability in Your Area
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We operate decentralized technician hubs across Bangalore to guarantee 45-90 minute doorstep arrival.
          </p>

          {/* Search Box */}
          <div className="mt-6 max-w-xl mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by area or pincode (e.g. Whitefield, Koramangala, 560102)..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm shadow-xs transition-all bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Zone filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {(['All', 'South', 'East', 'North', 'West', 'Central'] as const).map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedZone === zone
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {zone === 'All' ? 'All Bangalore' : `${zone} Bangalore`}
              </button>
            ))}
          </div>
        </div>

        {/* Live Area Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAreas.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
              <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-slate-700 font-semibold text-sm">
                No hub listed matching "{searchTerm}", but we still cover all Bangalore pin codes!
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Call our dispatch controller at +91 80 4748 3920 to schedule a mobile technician.
              </p>
            </div>
          ) : (
            filteredAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {area.zone} Zone • {area.pincode}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-slate-900 mt-2.5 group-hover:text-blue-600 transition-colors">
                    {area.name}
                  </h3>

                  <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                    Hub Landmark: {area.landmark}
                  </div>

                  {/* Technician and ETA details */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      {area.techniciansAvailable} Techs on Field
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Clock className="w-3.5 h-3.5" />
                      ~{area.estArrivalMins} mins ETA
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onSelectLocality(area.name)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Book in {area.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Dispatch banner */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-sm">
                Same-Day Guarantee across 560001 through 560103
              </span>
              <span className="text-slate-500">
                Technicians carry standardized toolkits and the most common genuine spare parts in their mobile bags.
              </span>
            </div>
          </div>
          <a
            href="tel:+918047483920"
            className="shrink-0 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors"
          >
            Express Dispatch: +91 80 4748 3920
          </a>
        </div>

      </div>
    </section>
  );
};
