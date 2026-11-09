import React, { useMemo, useEffect } from 'react';
import { 
  Zap, 
  Clock, 
  MapPin, 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Check, 
  CheckCircle2,
  TrendingDown,
  Navigation
} from 'lucide-react';
import { getZoneSmartSlots, SmartSlotItem } from '../lib/smartSchedulingService';

interface SmartSlotPickerProps {
  localityName: string;
  selectedDate: string;
  selectedSlotId: string;
  onSelectSlot: (slot: SmartSlotItem) => void;
  isEmergencyDispatch: boolean;
  onToggleEmergency: (enabled: boolean) => void;
}

export const SmartSlotPicker: React.FC<SmartSlotPickerProps> = ({
  localityName,
  selectedDate,
  selectedSlotId,
  onSelectSlot,
  isEmergencyDispatch,
  onToggleEmergency
}) => {
  // Calculate smart slots for selected locality and date
  const scheduleInfo = useMemo(() => {
    return getZoneSmartSlots(localityName, selectedDate);
  }, [localityName, selectedDate]);

  // Auto-select recommended express slot if none is currently selected
  useEffect(() => {
    if (!selectedSlotId && scheduleInfo.slots.length > 0) {
      const rec = scheduleInfo.slots.find(s => s.isRecommended) || scheduleInfo.slots[0];
      onSelectSlot(rec);
    }
  }, [scheduleInfo, selectedSlotId, onSelectSlot]);

  return (
    <div className="space-y-5">
      
      {/* Live Zone Capacity & Hub Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white border border-blue-800/80 shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider text-blue-200">
              {scheduleInfo.zone} Zone • {scheduleInfo.hubName} Station
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/20">
            <UserCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{scheduleInfo.activeTechsCount} Senior Techs On Duty</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2.5 border-t border-blue-800/60 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Station Distance:</span>
            <span className="font-bold text-white flex items-center gap-1">
              <Navigation className="w-3 h-3 text-blue-400" />
              {scheduleInfo.distanceKm} km from Hub
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Doorstep ETA:</span>
            <span className="font-bold text-emerald-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              ~{scheduleInfo.avgEtaMinutes} mins
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[11px]">Landmark Hub:</span>
            <span className="font-semibold text-slate-200 truncate block">
              {scheduleInfo.hubLandmark}
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Breakdown Priority Toggle */}
      <div className={`p-4 rounded-2xl border transition-all ${
        isEmergencyDispatch
          ? 'bg-amber-500/10 border-amber-500/80 shadow-md'
          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
      }`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isEmergencyDispatch ? 'bg-amber-500 text-white animate-bounce' : 'bg-amber-100 text-amber-700'
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-extrabold text-sm text-slate-900">
                  Emergency Breakdown Priority
                </h4>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                  Express 60-Min
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Urgent appliance failure? (Water leaking, fridge not cooling, gas leak). Prioritizes senior engineer dispatch in 60 minutes.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleEmergency(!isEmergencyDispatch)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isEmergencyDispatch ? 'bg-amber-500' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isEmergencyDispatch ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Smart Slot Selection Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Smart Time Slots for {scheduleInfo.locality}</span>
          </label>
          <span className="text-[11px] text-slate-500 font-medium">
            Auto-selects fastest available arrival window
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {scheduleInfo.slots.map((slot) => {
            const isSelected = selectedSlotId === slot.id;

            return (
              <div
                key={slot.id}
                onClick={() => onSelectSlot(slot)}
                className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Slot Header: Badge & Status */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${slot.badgeStyle}`}>
                      {slot.badge}
                    </span>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Time Window */}
                  <h5 className="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {slot.timeSlot}
                  </h5>

                  {/* Technician Availability Info */}
                  <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
                    <span className="font-medium text-[11px] text-slate-500">
                      {slot.techniciansFree} Techs Free
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700">
                      ~{slot.etaMinutes} min arrival
                    </span>
                  </div>

                  {/* Capacity Progress Bar */}
                  <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        slot.capacityPercent > 75 
                          ? 'bg-amber-500' 
                          : slot.capacityPercent < 30 
                          ? 'bg-blue-600' 
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${slot.capacityPercent}%` }}
                    />
                  </div>
                </div>

                {slot.isRecommended && (
                  <div className="mt-2 pt-2 border-t border-blue-100 flex items-center gap-1 text-[10px] font-extrabold text-blue-700">
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>Recommended Fastest Doorstep Slot</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
