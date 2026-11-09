import React, { useEffect, useState } from 'react';
import { Bell, Navigation, Clock, ShieldCheck, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { subscribeToPushAlerts, PushAlertPayload } from '../lib/fcmService';

interface PushNotificationToastProps {
  onTrackBooking?: (bookingId: string) => void;
}

export const PushNotificationToast: React.FC<PushNotificationToastProps> = ({ onTrackBooking }) => {
  const [activeAlert, setActiveAlert] = useState<PushAlertPayload | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPushAlerts((payload) => {
      setActiveAlert(payload);
    });

    return () => unsubscribe();
  }, []);

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (activeAlert) {
      const timer = setTimeout(() => {
        setActiveAlert(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [activeAlert]);

  if (!activeAlert) return null;

  const getStatusBadge = (status: PushAlertPayload['status']) => {
    switch (status) {
      case 'en_route':
        return {
          bg: 'bg-blue-600',
          text: 'En Route',
          icon: Navigation,
          badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
        };
      case 'arriving_soon':
        return {
          bg: 'bg-amber-600',
          text: 'Arriving in 10 Mins',
          icon: Clock,
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
        };
      case 'completed':
        return {
          bg: 'bg-emerald-600',
          text: 'Service Completed',
          icon: ShieldCheck,
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
        };
      default:
        return {
          bg: 'bg-slate-900',
          text: 'Technician Update',
          icon: Bell,
          badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
        };
    }
  };

  const statusConfig = getStatusBadge(activeAlert.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-full animate-slide-in pointer-events-auto">
      <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700/90 relative overflow-hidden backdrop-blur-md">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-start gap-3">
            {/* Status Icon */}
            <div className={`w-10 h-10 rounded-xl ${statusConfig.bg} text-white flex items-center justify-center shrink-0 shadow-md animate-pulse`}>
              <StatusIcon className="w-5 h-5 text-white" />
            </div>

            <div className="space-y-1">
              {/* Header Badge & Title */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${statusConfig.badgeColor}`}>
                  FCM Push • {statusConfig.text}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {activeAlert.timestamp}
                </span>
              </div>

              <h4 className="font-heading font-extrabold text-white text-sm leading-snug">
                {activeAlert.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeAlert.body}
              </p>

              {/* Action Link */}
              <div className="pt-2 flex items-center gap-3">
                {onTrackBooking && (
                  <button
                    onClick={() => {
                      onTrackBooking(activeAlert.bookingId);
                      setActiveAlert(null);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                  >
                    <span>Track Technician {activeAlert.techName}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setActiveAlert(null)}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close notification toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
