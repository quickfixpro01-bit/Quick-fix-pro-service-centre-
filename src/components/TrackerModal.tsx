import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  User, 
  Download, 
  FileCheck,
  AlertCircle,
  Database,
  Wrench
} from 'lucide-react';
import { SAMPLE_TRACKING_BOOKINGS, BookingRecord } from '../data/servicesData';
import { getBookingByIdFromFirestore, subscribeToBookingById, getLocalBookings } from '../lib/bookingsService';
import { useAuth } from '../context/AuthContext';

interface TrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBookingId?: string;
  customBookings?: BookingRecord[];
}

export const TrackerModal: React.FC<TrackerModalProps> = ({
  isOpen,
  onClose,
  initialBookingId,
  customBookings = []
}) => {
  const { currentUser, userProfile } = useAuth();
  const [lookupId, setLookupId] = useState<string>(initialBookingId || 'QFP-8492');
  const [isSearching, setIsSearching] = useState(false);
  const [activeBooking, setActiveBooking] = useState<BookingRecord | null>(() => {
    const all = [...customBookings, ...SAMPLE_TRACKING_BOOKINGS];
    if (initialBookingId) {
      const found = all.find(b => b.bookingId.toLowerCase() === initialBookingId.toLowerCase());
      if (found) return found;
    }
    return SAMPLE_TRACKING_BOOKINGS[0];
  });
  const [showWarrantyPass, setShowWarrantyPass] = useState(false);

  // Auto-expand warranty pass if booking status is completed
  useEffect(() => {
    if (activeBooking?.status === 'completed') {
      setShowWarrantyPass(true);
    }
  }, [activeBooking?.status]);

  // Real-time listener for current active booking (Admin status updates reflect immediately)
  useEffect(() => {
    if (!isOpen || !activeBooking?.bookingId) return;

    const unsubscribe = subscribeToBookingById(activeBooking.bookingId, (updated) => {
      if (updated) {
        setActiveBooking(updated);
      }
    });

    return () => unsubscribe();
  }, [isOpen, activeBooking?.bookingId]);

  // Sync initialBookingId prop or select customer's real latest booking when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (initialBookingId) {
      setLookupId(initialBookingId);
      const all = [...customBookings, ...SAMPLE_TRACKING_BOOKINGS];
      const found = all.find(b => b.bookingId.toLowerCase() === initialBookingId.toLowerCase());
      if (found) {
        setActiveBooking(found);
      } else {
        handleLookupFirestore(initialBookingId);
      }
    } else {
      if (customBookings.length > 0) {
        setActiveBooking(customBookings[0]);
        setLookupId(customBookings[0].bookingId);
      } else {
        const localList = getLocalBookings();
        if (localList.length > 0) {
          setActiveBooking(localList[0]);
          setLookupId(localList[0].bookingId);
        } else {
          setActiveBooking(SAMPLE_TRACKING_BOOKINGS[0]);
          setLookupId(SAMPLE_TRACKING_BOOKINGS[0].bookingId);
        }
      }
    }
  }, [isOpen, initialBookingId, customBookings]);

  const handleLookupFirestore = async (idToSearch: string) => {
    setIsSearching(true);
    try {
      const remoteBooking = await getBookingByIdFromFirestore(idToSearch);
      if (remoteBooking) {
        setActiveBooking(remoteBooking);
      }
    } catch (e) {
      console.warn('Firestore lookup error:', e);
    } finally {
      setIsSearching(false);
    }
  };

  // Lock body scroll and handle Escape key while tracker modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'contain';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = lookupId.trim();
    if (!query) return;

    // Check custom & sample bookings first
    const all = [...customBookings, ...SAMPLE_TRACKING_BOOKINGS];
    const found = all.find(b => 
      b.bookingId.toLowerCase().includes(query.toLowerCase()) ||
      b.customerPhone.includes(query)
    );

    if (found) {
      setActiveBooking(found);
      return;
    }

    // Otherwise check Firestore in real-time
    setIsSearching(true);
    try {
      const fromDb = await getBookingByIdFromFirestore(query);
      if (fromDb) {
        setActiveBooking(fromDb);
      } else {
        alert(`No active booking found matching "${query}". Try searching by booking reference (e.g. QFP-8492) or contact number.`);
      }
    } catch (err) {
      alert(`Could not retrieve booking "${query}" from Firestore.`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs overscroll-contain">
      {/* Backdrop overlay (click to close) */}
      <div 
        className="fixed inset-0 bg-transparent" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col z-10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Shrink-0) */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base">
                Bangalore Live Service & Technician Tracker
              </h3>
              <p className="text-[11px] text-slate-300">
                Real-time technician GPS tracking & 6-month warranty lookup
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar (Shrink-0) */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/70 shrink-0">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={lookupId}
                onChange={(e) => setLookupId(e.target.value)}
                placeholder="Enter Booking ID (e.g. QFP-8492) or Mobile Number"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isSearching ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  <span>Searching...</span>
                </>
              ) : (
                <span>Track Now</span>
              )}
            </button>
          </form>

          {/* Quick chips: User Bookings + Sample Bookings */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] text-slate-500">
            {customBookings.length > 0 && (
              <>
                <span className="font-semibold text-emerald-700">Your Bookings:</span>
                {customBookings.slice(0, 3).map((cb) => (
                  <button
                    key={cb.bookingId}
                    type="button"
                    onClick={() => { setLookupId(cb.bookingId); setActiveBooking(cb); }}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-semibold cursor-pointer"
                  >
                    {cb.bookingId} ({cb.appliance.split(' ')[0]})
                  </button>
                ))}
                <span>•</span>
              </>
            )}
            <span>Samples:</span>
            <button
              type="button"
              onClick={() => { setLookupId('QFP-8492'); setActiveBooking(SAMPLE_TRACKING_BOOKINGS[0]); }}
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              QFP-8492 (En Route)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => { setLookupId('QFP-7104'); setActiveBooking(SAMPLE_TRACKING_BOOKINGS[1]); }}
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              QFP-7104 (Assigned)
            </button>
          </div>
        </div>

        {/* Tracker Content Body - Smoothly Scrollable */}
        {activeBooking && (
          <div className="p-5 sm:p-6 space-y-6 overflow-y-auto overscroll-contain flex-1 touch-pan-y modal-body-scroll">
            
            {/* Top Overview Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  Service ID: {activeBooking.bookingId}
                </span>
                <h4 className="font-heading font-extrabold text-base text-slate-900 mt-0.5">
                  {activeBooking.brand} {activeBooking.appliance}
                </h4>
                <div className="text-xs text-slate-600 mt-0.5">
                  Issue: {activeBooking.issue}
                </div>
              </div>

              <div className="text-right">
                {(() => {
                  const s = activeBooking.status;
                  let badgeText = 'Technician Assigned';
                  let badgeBg = 'bg-amber-100 text-amber-900 border-amber-300';
                  let dotBg = 'bg-amber-500';

                  if (s === 'confirmed') {
                    badgeText = 'Booking Confirmed';
                    badgeBg = 'bg-blue-100 text-blue-900 border-blue-300';
                    dotBg = 'bg-blue-500';
                  } else if (s === 'assigned') {
                    badgeText = 'Technician Assigned';
                    badgeBg = 'bg-amber-100 text-amber-900 border-amber-300';
                    dotBg = 'bg-amber-500';
                  } else if (s === 'en_route') {
                    badgeText = 'Technician En Route';
                    badgeBg = 'bg-purple-100 text-purple-900 border-purple-300';
                    dotBg = 'bg-purple-500';
                  } else if (s === 'in_inspection') {
                    badgeText = 'Diagnosing & Repairing';
                    badgeBg = 'bg-indigo-100 text-indigo-900 border-indigo-300';
                    dotBg = 'bg-indigo-500';
                  } else if (s === 'completed') {
                    badgeText = 'Service Completed';
                    badgeBg = 'bg-emerald-100 text-emerald-900 border-emerald-300';
                    dotBg = 'bg-emerald-500';
                  } else if (s === 'cancelled') {
                    badgeText = 'Booking Cancelled';
                    badgeBg = 'bg-rose-100 text-rose-900 border-rose-300';
                    dotBg = 'bg-rose-500';
                  }

                  return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
                      <span className={`w-2 h-2 rounded-full ${dotBg} animate-pulse`}></span>
                      {badgeText}
                    </span>
                  );
                })()}
                <div className="text-[11px] text-slate-500 mt-1">
                  Slot: {activeBooking.timeSlot.split(' ')[0]}
                </div>
              </div>
            </div>

            {/* Completed Service Card Banner */}
            {activeBooking.status === 'completed' && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white space-y-3 border border-emerald-500/40 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-base text-white">
                      Doorstep Repair Completed & Closed
                    </h4>
                    <p className="text-xs text-emerald-300">
                      Serviced by Senior Technician <strong>{activeBooking.assignedTech?.name || 'Babu'}</strong>. 180-Day Written Warranty Pass activated.
                    </p>
                  </div>
                </div>
                <div className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Official 6-Month Guarantee Card Active
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowWarrantyPass(!showWarrantyPass)}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    {showWarrantyPass ? 'Hide Digital Card' : 'View Warranty Pass'}
                  </button>
                </div>
              </div>
            )}

            {/* Cancelled Alert Banner if Admin Cancelled */}
            {activeBooking.status === 'cancelled' && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Service Request Cancelled</span>
                </div>
                <p className="text-xs text-rose-700">
                  This doorstep booking was cancelled in system management. If you need assistance or wish to reschedule, please call our Bangalore hotline at +91 80959 96638.
                </p>
              </div>
            )}

            {/* Live Timeline matching Admin status */}
            {activeBooking.status !== 'cancelled' && (
              <div>
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                  Live Service Progression Timeline
                </h5>

                {(() => {
                  const s = activeBooking.status;
                  const stepIndex = s === 'confirmed' ? 1 : s === 'assigned' ? 2 : s === 'en_route' ? 3 : s === 'in_inspection' ? 4 : s === 'completed' ? 5 : 1;

                  return (
                    <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {/* Step 1: Booked */}
                      <div className="flex items-start gap-3 relative">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-white ${
                          stepIndex > 1 ? 'bg-emerald-600' : 'bg-blue-600 ring-4 ring-blue-100 animate-pulse'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${stepIndex === 1 ? 'text-blue-700 font-extrabold' : 'text-slate-900'}`}>
                            Doorstep Request Booked & Verified
                          </div>
                          <div className="text-[11px] text-slate-500">Address confirmed in {activeBooking.locality}</div>
                        </div>
                      </div>

                      {/* Step 2: Assigned */}
                      <div className={`flex items-start gap-3 relative ${stepIndex < 2 ? 'opacity-40' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-white ${
                          stepIndex > 2 ? 'bg-emerald-600' : stepIndex === 2 ? 'bg-amber-500 ring-4 ring-amber-100 animate-pulse' : 'bg-slate-300'
                        }`}>
                          {stepIndex > 2 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Wrench className="w-3 h-3" />}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${stepIndex === 2 ? 'text-amber-700 font-extrabold' : 'text-slate-900'}`}>
                            Doorstep Technician Assigned
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {activeBooking.assignedTech?.name || 'Senior Specialist'} ({activeBooking.assignedTech?.experience || '7+ Yrs Exp'})
                          </div>
                        </div>
                      </div>

                      {/* Step 3: En Route */}
                      <div className={`flex items-start gap-3 relative ${stepIndex < 3 ? 'opacity-40' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-white ${
                          stepIndex > 3 ? 'bg-emerald-600' : stepIndex === 3 ? 'bg-purple-600 ring-4 ring-purple-100 animate-pulse' : 'bg-slate-300'
                        }`}>
                          {stepIndex > 3 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${stepIndex === 3 ? 'text-purple-700 font-extrabold' : 'text-slate-900'}`}>
                            Technician En Route to Doorstep (~{activeBooking.assignedTech?.etaMinutes || 20} Mins ETA)
                          </div>
                          <div className="text-[11px] text-slate-500">Navigating Bangalore traffic with mobile spares toolkit</div>
                        </div>
                      </div>

                      {/* Step 4: In Inspection */}
                      <div className={`flex items-start gap-3 relative ${stepIndex < 4 ? 'opacity-40' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-white ${
                          stepIndex > 4 ? 'bg-emerald-600' : stepIndex === 4 ? 'bg-indigo-600 ring-4 ring-indigo-100 animate-pulse' : 'bg-slate-300'
                        }`}>
                          {stepIndex > 4 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">4</span>}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${stepIndex === 4 ? 'text-indigo-700 font-extrabold' : 'text-slate-900'}`}>
                            Doorstep Inspection & Genuine Part Fitment
                          </div>
                          <div className="text-[11px] text-slate-500">100% upfront quote approval before starting</div>
                        </div>
                      </div>

                      {/* Step 5: Completed & Warranty */}
                      <div className={`flex items-start gap-3 relative ${stepIndex < 5 ? 'opacity-40' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-white ${
                          stepIndex === 5 ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-slate-300'
                        }`}>
                          {stepIndex === 5 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">5</span>}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${stepIndex === 5 ? 'text-emerald-700 font-extrabold' : 'text-slate-900'}`}>
                            Testing & 180-Day Digital Warranty Activation
                          </div>
                          <div className="text-[11px] text-slate-500">Official 6-month guarantee card active</div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Assigned Technician Profile Box */}
            {activeBooking.assignedTech && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeBooking.assignedTech.photo}
                    alt={activeBooking.assignedTech.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">{activeBooking.assignedTech.name}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-semibold border border-emerald-800">
                        Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      ★ {activeBooking.assignedTech.rating} • Vehicle: {activeBooking.assignedTech.vehicleNo}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${activeBooking.assignedTech.phone}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Babu: {activeBooking.assignedTech.phone}
                  </a>
                  <button
                    onClick={() => setShowWarrantyPass(!showWarrantyPass)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                    Warranty Pass
                  </button>
                </div>
              </div>
            )}

            {/* Warranty Certificate Pass Preview (Expandable) */}
            {showWarrantyPass && (
              <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-dashed border-amber-300 text-slate-900 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <span className="font-heading font-extrabold text-sm uppercase tracking-wider">
                      Quick Fix Pro 180-Day Guarantee Certificate
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-700">Digital Copy</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Covered Machine:</span>
                    <strong className="block text-slate-900">{activeBooking.brand} {activeBooking.appliance}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Warranty Period:</span>
                    <strong className="block text-slate-900">180 Days from Service Date</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Service Area:</span>
                    <strong className="block text-slate-900">{activeBooking.locality}, Bangalore</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Genuine Spares Guarantee:</span>
                    <strong className="block text-emerald-700">100% OEM Certified</strong>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-600 italic">
                  * Covers both replaced components and technician re-service with zero visit charge across all Bangalore pin codes.
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
