import React from 'react';
import { Phone, MessageSquare, Wrench, ShieldCheck } from 'lucide-react';

interface QuickActionFabProps {
  onOpenBooking: () => void;
}

export const QuickActionFab: React.FC<QuickActionFabProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Live status badge */}
      <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-lg backdrop-blur-md border border-slate-700/80 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Bangalore Hubs Active: <strong>~45 min ETA</strong></span>
      </div>

      <div className="flex items-center gap-2">
        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/918095996638?text=Hi%20Quick%20Fix%20Pro,%20I%20need%20appliance%20repair%20service%20in%20Bangalore."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          title="Chat on WhatsApp (8095996638)"
        >
          <MessageSquare className="w-6 h-6" />
        </a>

        {/* Call Direct */}
        <a
          href="tel:+918095996638"
          className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-slate-700"
          title="Call Bangalore Helpline: 8095996638"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Primary Instant Booking Button */}
        <button
          onClick={onOpenBooking}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-105 transition-all cursor-pointer"
        >
          <Wrench className="w-4 h-4" />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};
