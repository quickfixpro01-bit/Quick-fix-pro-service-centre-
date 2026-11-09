import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Users, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  X,
  Globe,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { 
  BANGALORE_MAP_HUBS, 
  ZONE_CONFIGS, 
  BANGALORE_COVERAGE_METRICS, 
  BangaloreMapHub 
} from '../data/mapCoverageData';
import { lookupLocationWithGoogleMaps, MapsLookupResult } from '../lib/mapsService';
import { FadeInUp } from './ScrollAnimation';

interface ServiceCoverageMapProps {
  onSelectLocality: (localityName: string) => void;
}

export const ServiceCoverageMap: React.FC<ServiceCoverageMapProps> = ({ onSelectLocality }) => {
  const [selectedZone, setSelectedZone] = useState<'All' | 'Central' | 'South' | 'East' | 'North' | 'West'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Google Maps Grounding Search State
  const [mapsQuery, setMapsQuery] = useState('');
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsResult, setMapsResult] = useState<MapsLookupResult | null>(null);
  const [mapsError, setMapsError] = useState<string | null>(null);
  
  // Default selected hub is Koramangala (HQ Hub)
  const [activeHub, setActiveHub] = useState<BangaloreMapHub>(
    BANGALORE_MAP_HUBS.find(h => h.id === 'hub-koramangala') || BANGALORE_MAP_HUBS[0]
  );

  // Filter hubs
  const filteredHubs = useMemo(() => {
    return BANGALORE_MAP_HUBS.filter(hub => {
      const matchesZone = selectedZone === 'All' || hub.zone === selectedZone;
      const matchesSearch = 
        hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hub.pincode.includes(searchQuery) ||
        hub.landmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hub.popularSocieties.some(soc => soc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesZone && matchesSearch;
    });
  }, [selectedZone, searchQuery]);

  // Handle pin click
  const handlePinClick = (hub: BangaloreMapHub) => {
    setActiveHub(hub);
  };

  // Handle book in locality
  const handleBookLocality = (hub: BangaloreMapHub) => {
    onSelectLocality(hub.name);
  };

  // Google Maps Grounding Search Execution
  const handleGoogleMapsSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapsQuery.trim()) return;

    setMapsLoading(true);
    setMapsError(null);

    try {
      const res = await lookupLocationWithGoogleMaps(mapsQuery);
      setMapsResult(res);

      // Match closest hub on visual map
      const matched = BANGALORE_MAP_HUBS.find(
        h => h.name.toLowerCase() === res.closestHubName.toLowerCase() ||
             h.zone === res.zone
      );
      if (matched) {
        setActiveHub(matched);
      }
    } catch (err: any) {
      setMapsError('Could not fetch Google Maps grounding details. Please try another query.');
    } finally {
      setMapsLoading(false);
    }
  };

  const activeZoneConfig = ZONE_CONFIGS[activeHub.zone] || ZONE_CONFIGS['Central'];

  return (
    <section 
      id="coverage-map" 
      className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-200"
      aria-label="Bengaluru Appliance Service Coverage Map"
    >
      {/* Blueprint decorative accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeInUp distance={30} duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200/80 shadow-xs">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Google Maps Grounding • Live Bengaluru Location Lookup</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
              Service Coverage Map & Location Grounding
            </h2>

            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              We operate local technician stations across every quadrant of Bangalore. Search any address or landmark with Google Maps grounding to calculate exact km distance and travel ETA.
            </p>

            {/* Quick Stats Strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-700">
              <span className="inline-flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {BANGALORE_COVERAGE_METRICS.activeTechniciansOnDuty} Certified Technicians On Duty
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {BANGALORE_COVERAGE_METRICS.avgDoorstepETA} Arrival Window
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% BBMP & Electronic City Covered
              </span>
            </div>
          </div>
        </FadeInUp>

        {/* Google Maps AI Grounding Search Bar */}
        <div className="max-w-4xl mx-auto mb-10 p-5 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-blue-800">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="font-heading font-bold text-sm text-amber-300">
                Google Maps Location & Distance Calculator
              </span>
            </div>
            <span className="text-[11px] text-blue-200 bg-blue-900/80 px-2.5 py-0.5 rounded-md border border-blue-700">
              Grounded with Gemini 3.8 Flash
            </span>
          </div>

          <form onSubmit={handleGoogleMapsSearch} className="flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={mapsQuery}
                onChange={(e) => setMapsQuery(e.target.value)}
                placeholder="Enter any Bangalore address, apartment or landmark (e.g. Near Forum Mall Koramangala, Prestige Shantiniketan)..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/90 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              disabled={mapsLoading || !mapsQuery.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 font-bold text-xs sm:text-sm text-white transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {mapsLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Grounding Location...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 text-white" />
                  <span>Calculate Distance & ETA</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Suggestions Pills */}
          <div className="mt-3 flex items-center gap-2 text-xs flex-wrap">
            <span className="text-slate-400 font-medium">Try searching:</span>
            {['Sony World Koramangala', 'Prestige Shantiniketan', '100ft Road Indiranagar', 'Manyata Tech Park'].map((sug, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMapsQuery(sug);
                  lookupLocationWithGoogleMaps(sug).then(res => {
                    setMapsResult(res);
                    const matched = BANGALORE_MAP_HUBS.find(h => h.name.toLowerCase() === res.closestHubName.toLowerCase() || h.zone === res.zone);
                    if (matched) setActiveHub(matched);
                  });
                }}
                className="text-[11px] bg-slate-800/90 hover:bg-blue-800/60 text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-slate-700 cursor-pointer transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Maps Grounding Result Banner */}
          {mapsResult && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 text-left text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Location in Bangalore</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                  {mapsResult.zone} Zone • Service Available
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 pt-1 text-slate-300">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Grounded Address:</span>
                  <strong className="text-white text-xs leading-snug block mt-0.5">{mapsResult.formattedAddress}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Nearest QuickFixPro Station:</span>
                  <strong className="text-amber-300 text-xs block mt-0.5">{mapsResult.closestHubName} ({mapsResult.hubPincode})</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Distance & Doorstep ETA:</span>
                  <strong className="text-emerald-400 text-xs block mt-0.5">{mapsResult.distanceKm} km • ~{mapsResult.estimatedEtaMinutes} Mins Arrival</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-400 text-[11px]">
                <div className="truncate max-w-xl">
                  <span className="text-slate-300 font-medium">{mapsResult.transitNotes}</span>
                </div>
                <button
                  onClick={() => onSelectLocality(mapsResult.closestHubName)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <span>Book at this Address</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls Bar: Search & Zone Filters */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Zone Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {(['All', 'Central', 'South', 'East', 'North', 'West'] as const).map((zone) => {
              const isSelected = selectedZone === zone;
              return (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {zone === 'All' ? 'All Bangalore (20)' : `${zone} (${BANGALORE_MAP_HUBS.filter(h => h.zone === zone).length})`}
                </button>
              );
            })}
          </div>

          {/* Filter Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter pins by area or society..."
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Map Container & Spotlight Card Split */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left/Main: Stylized Blueprint Map Canvas (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden relative">
            
            {/* Map Top Bar */}
            <div className="px-5 py-3 bg-slate-900 text-white flex items-center justify-between text-xs border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <span className="font-heading font-bold text-slate-100">Bengaluru Metropolitan Territory Grid</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> East
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> South
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> North
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> Central
                </span>
              </div>
            </div>

            {/* Stylized Interactive Map Canvas */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#f8fafc] overflow-hidden select-none">
              
              {/* SVG Blueprint Background Grid & Arterial Road Corridors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Subtle Blueprint Grid Pattern */}
                  <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                  </pattern>
                  
                  {/* Soft Radial Gradients for Zones */}
                  <radialGradient id="central-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="east-grad" cx="70%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="south-grad" cx="50%" cy="70%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="north-grad" cx="50%" cy="25%" r="50%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Grid Background */}
                <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

                {/* Regional Soft Zone Glows */}
                <circle cx="50%" cy="50%" r="20%" fill="url(#central-grad)" />
                <circle cx="72%" cy="52%" r="25%" fill="url(#east-grad)" />
                <circle cx="48%" cy="68%" r="25%" fill="url(#south-grad)" />
                <circle cx="50%" cy="28%" r="22%" fill="url(#north-grad)" />

                {/* Outer Ring Road (ORR) Loop */}
                <ellipse 
                  cx="54%" 
                  cy="52%" 
                  rx="34%" 
                  ry="28%" 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="3.5" 
                  strokeDasharray="8 6" 
                />

                {/* Arterial Corridors */}
                <line x1="48%" y1="44%" x2="52%" y2="6%" stroke="#94a3b8" strokeWidth="2.5" />
                <line x1="52%" y1="56%" x2="64%" y2="84%" stroke="#94a3b8" strokeWidth="2.5" />
                <line x1="48%" y1="44%" x2="85%" y2="46%" stroke="#94a3b8" strokeWidth="2.5" />
                <line x1="42%" y1="58%" x2="40%" y2="88%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />

                {/* Arterial Corridor Labels */}
                <text x="54%" y="16%" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  AIRPORT EXPRESSWAY (NORTH)
                </text>
                <text x="68%" y="78%" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  HOSUR ROAD (ELECTRONIC CITY)
                </text>
                <text x="66%" y="42%" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  WHITEFIELD TECH CORRIDOR
                </text>
                <text x="22%" y="54%" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                  OUTER RING ROAD (ORR)
                </text>
              </svg>

              {/* Interactive Locality Map Pins */}
              {filteredHubs.map((hub) => {
                const isSelected = activeHub.id === hub.id;
                const zoneCfg = ZONE_CONFIGS[hub.zone] || ZONE_CONFIGS['Central'];

                return (
                  <div
                    key={hub.id}
                    style={{
                      left: `${hub.x}%`,
                      top: `${hub.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className="absolute z-20 group cursor-pointer"
                    onClick={() => handlePinClick(hub)}
                  >
                    {/* Pulsing Animated Radar Ring */}
                    <div 
                      className={`absolute -inset-2.5 rounded-full opacity-75 animate-ping pointer-events-none ${
                        isSelected ? 'opacity-100 duration-1000' : 'opacity-40'
                      }`}
                      style={{ backgroundColor: zoneCfg.color }}
                    />

                    {/* Secondary Steady Outer Glow */}
                    <div 
                      className={`absolute -inset-1 rounded-full ${
                        isSelected ? 'ring-4 ring-offset-2 ring-blue-500 scale-125' : 'group-hover:scale-110'
                      } transition-all`}
                      style={{ backgroundColor: zoneCfg.color, opacity: isSelected ? 0.9 : 0.3 }}
                    />

                    {/* Center Core Pin Icon */}
                    <div 
                      className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xs transition-transform ${
                        isSelected ? 'scale-115 shadow-xl ring-2 ring-white' : 'group-hover:scale-110'
                      }`}
                      style={{ backgroundColor: zoneCfg.color }}
                    >
                      <MapPin className="w-4 h-4 fill-white" />
                    </div>

                    {/* Compact Label Below Pin */}
                    <div 
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md whitespace-nowrap text-[10px] sm:text-[11px] font-extrabold transition-all shadow-sm ${
                        isSelected 
                          ? 'bg-slate-900 text-white z-30 scale-105' 
                          : 'bg-white/95 text-slate-800 border border-slate-300 group-hover:bg-slate-900 group-hover:text-white'
                      }`}
                    >
                      {hub.name.split(' (')[0].split(' /')[0]}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Map Canvas Footer Instructions */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Click any pin to inspect active technician standby & ETA</span>
              </span>
              <span className="hidden sm:inline-block font-semibold text-slate-500">
                Live Bengaluru GPS Coordinates Mapped
              </span>
            </div>

          </div>

          {/* Right: Selected Hub Spotlight & Booking Card (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden">
            
            {/* Top Zone Colored Stripe */}
            <div 
              className="absolute top-0 left-0 right-0 h-2.5"
              style={{ backgroundColor: activeZoneConfig.color }}
            />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4 mt-1">
                <span 
                  className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${activeZoneConfig.badgeBg} ${activeZoneConfig.badgeText}`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeHub.zone} Bangalore Hub</span>
                </span>
                
                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  {activeHub.pincode}
                </span>
              </div>

              {/* Hub Title */}
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading leading-tight">
                {activeHub.name}
              </h3>
              
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                <span>Station: {activeHub.landmark}</span>
              </div>

              {/* Status Metrics Box */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                
                {/* Technicians Available */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Engineers on Duty:</span>
                  </span>
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {activeHub.techniciansAvailable} Technicians Standby
                  </span>
                </div>

                {/* Doorstep ETA */}
                <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-200/70">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Doorstep Arrival Time:</span>
                  </span>
                  <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    ~{activeHub.estArrivalMins} Minutes
                  </span>
                </div>

                {/* Written Guarantee */}
                <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-200/70">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Warranty Guarantee:</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    6-Month Written
                  </span>
                </div>

              </div>

              {/* Popular Societies Served */}
              <div className="mt-5">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Key Societies & Apartments Served:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeHub.popularSocieties.map((soc, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      {soc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hub Action CTAs */}
            <div className="mt-8 space-y-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleBookLocality(activeHub)}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Technician in {activeHub.name.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+918095996638"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Hub Dispatch: +91 80959 96638</span>
              </a>
            </div>

          </div>

        </div>

        {/* Quick Hub Selector Grid below */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center sm:text-left">
            Quick-Select All Bangalore Hubs ({filteredHubs.length}):
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {filteredHubs.map((hub) => {
              const isSelected = activeHub.id === hub.id;
              const zoneCfg = ZONE_CONFIGS[hub.zone] || ZONE_CONFIGS['Central'];

              return (
                <button
                  key={hub.id}
                  onClick={() => handlePinClick(hub)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="truncate pr-1">
                    <div className="font-bold text-xs truncate">
                      {hub.name.split(' (')[0].split(' /')[0]}
                    </div>
                    <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                      {hub.pincode} • ~{hub.estArrivalMins}m
                    </div>
                  </div>
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: zoneCfg.color }}
                  />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
