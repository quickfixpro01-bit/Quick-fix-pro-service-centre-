import React, { useState, useMemo } from 'react';
import { 
  X, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Download, 
  Sparkles, 
  User, 
  MapPin, 
  LogOut, 
  Receipt, 
  Printer, 
  ChevronRight,
  Shield,
  Gift,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Users,
  MessageSquare
} from 'lucide-react';
import { BookingRecord } from '../data/servicesData';
import { useAuth } from '../context/AuthContext';

interface RepairHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBookings: BookingRecord[];
  onOpenBooking: () => void;
}

export const RepairHistoryModal: React.FC<RepairHistoryModalProps> = ({
  isOpen,
  onClose,
  userBookings,
  onOpenBooking
}) => {
  const { currentUser, userProfile, saveUserProfile, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<'history' | 'warranties' | 'referral' | 'profile'>('history');
  const [selectedInvoice, setSelectedInvoice] = useState<BookingRecord | null>(null);
  
  // Referral state
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userProfile?.name || '');
  const [editAddress, setEditAddress] = useState(userProfile?.defaultAddress || '');
  const [editLocality, setEditLocality] = useState(userProfile?.locality || 'Koramangala');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  // Process completed repairs and calculate warranty status (180 days = 6 months)
  const processedBookings = useMemo(() => {
    return userBookings.map(b => {
      const createdDate = new Date(b.createdAt || Date.now());
      const warrantyExpiryDate = new Date(createdDate.getTime() + 180 * 24 * 60 * 60 * 1000);
      const now = new Date();

      const daysRemaining = Math.ceil((warrantyExpiryDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
      const isWarrantyActive = daysRemaining > 0;
      const isWarrantyExpiringSoon = isWarrantyActive && daysRemaining <= 30;

      return {
        ...b,
        createdDateFormatted: createdDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        warrantyExpiryFormatted: warrantyExpiryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        daysRemaining: Math.max(0, daysRemaining),
        isWarrantyActive,
        isWarrantyExpiringSoon
      };
    });
  }, [userBookings]);

  // Active warranty count
  const activeWarrantiesCount = processedBookings.filter(b => b.isWarrantyActive).length;

  // Generate unique referral code and shareable URL for the customer
  const userReferralCode = useMemo(() => {
    const rawName = userProfile?.name || 'VIP';
    const cleanName = rawName.split(' ')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
    return `BLR150-${cleanName || 'PRO'}`;
  }, [userProfile?.name]);

  const referralLink = useMemo(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/?ref=${userReferralCode}`;
    }
    return `https://quickfixpro.in/?ref=${userReferralCode}`;
  }, [userReferralCode]);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Hey! Use my QuickFixPro referral code *${userReferralCode}* to get flat ₹150 OFF on your next doorstep appliance repair in Bangalore with 6-month written warranty!\n\nBook your doorstep service here: ${referralLink}`
  )}`;

  const handleSaveProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveUserProfile({
      name: editName.trim(),
      defaultAddress: editAddress.trim(),
      locality: editLocality.trim()
    });
    setSaveSuccess(true);
    setIsEditingProfile(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 transform transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between shrink-0 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/80 flex items-center justify-center text-white font-extrabold shadow-md border border-blue-400/40">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                  My Profile & Repair History
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Verified Customer
                </span>
              </div>
              <p className="text-xs text-blue-200">
                {userProfile?.name || 'Valued Customer'} • {currentUser?.phoneNumber || userProfile?.phoneNumber || '+91 80959 96638'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close profile modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-white text-blue-600 border-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>My Repairs & Invoices ({userBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('warranties')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'warranties'
                ? 'bg-white text-blue-600 border-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Warranty Alerts ({activeWarrantiesCount} Active)</span>
          </button>

          <button
            onClick={() => setActiveTab('referral')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'referral'
                ? 'bg-white text-amber-600 border-amber-500 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-500" />
            <span>Refer & Earn (₹150 OFF)</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-white text-blue-600 border-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Doorstep Details</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">

          {/* TAB 1: REPAIR HISTORY & INVOICES */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-extrabold text-base text-slate-900">
                    Completed & Active Doorstep Jobs
                  </h4>
                  <p className="text-xs text-slate-500">
                    View job status, assigned technician credits, and official GST repair tax invoices
                  </p>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Book New Service</span>
                </button>
              </div>

              {processedBookings.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h5 className="font-heading font-bold text-slate-900 text-base">
                    No Repair History Yet
                  </h5>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    You haven't placed any doorstep repair bookings with QuickFixPro yet. Book a service now to get your 6-month written warranty card!
                  </p>
                  <button
                    onClick={() => { onClose(); onOpenBooking(); }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    Book Doorstep Repair (₹199 Fee Waived)
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {processedBookings.map((booking) => (
                    <div 
                      key={booking.bookingId}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      {/* Top Job Status Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-blue-700 text-sm">
                            {booking.bookingId}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {booking.createdDateFormatted}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {booking.isWarrantyActive && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>180-Day Warranty Covered</span>
                            </span>
                          )}

                          {(() => {
                            const s = booking.status;
                            let label = 'Tech Assigned';
                            let cls = 'bg-amber-100 text-amber-900 border-amber-300';
                            if (s === 'confirmed') {
                              label = 'Confirmed';
                              cls = 'bg-blue-100 text-blue-900 border-blue-300';
                            } else if (s === 'assigned') {
                              label = 'Tech Assigned';
                              cls = 'bg-amber-100 text-amber-900 border-amber-300';
                            } else if (s === 'en_route') {
                              label = 'En Route';
                              cls = 'bg-purple-100 text-purple-900 border-purple-300';
                            } else if (s === 'in_inspection') {
                              label = 'Diagnosing';
                              cls = 'bg-indigo-100 text-indigo-900 border-indigo-300';
                            } else if (s === 'completed') {
                              label = 'Completed';
                              cls = 'bg-emerald-100 text-emerald-900 border-emerald-300';
                            } else if (s === 'cancelled') {
                              label = 'Cancelled';
                              cls = 'bg-rose-100 text-rose-900 border-rose-300';
                            }

                            return (
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${cls}`}>
                                {label}
                              </span>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Main Job Body */}
                      <div className="grid md:grid-cols-3 gap-4 py-4">
                        {/* Column 1: Appliance & Symptom */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Appliance & Brand:
                          </span>
                          <h5 className="font-heading font-extrabold text-slate-900 text-base">
                            {booking.appliance}
                          </h5>
                          <p className="text-xs text-slate-600">
                            Brand: <strong className="text-slate-800">{booking.brand}</strong>
                          </p>
                          <p className="text-xs text-slate-500 italic mt-1">
                            "{booking.issue}"
                          </p>
                        </div>

                        {/* Column 2: Assigned Specialist */}
                        <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Assigned Senior Specialist:
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                              {booking.assignedTech?.name[0] || 'B'}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">
                                Tech {booking.assignedTech?.name || 'Babu'}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {booking.assignedTech?.experience || '7+ Yrs Senior Specialist'}
                              </p>
                            </div>
                          </div>
                          <a 
                            href={`tel:${booking.assignedTech?.phone || '8095996638'}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline mt-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Tech: {booking.assignedTech?.phone || '8095996638'}</span>
                          </a>
                        </div>

                        {/* Column 3: Invoice Amount & Download */}
                        <div className="flex flex-col justify-between items-start md:items-end space-y-2">
                          <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block md:text-right">
                              Total Invoice Paid:
                            </span>
                            <span className="text-2xl font-black text-slate-900 font-mono block md:text-right">
                              ₹{booking.totalEstimated}
                            </span>
                            <span className="text-[11px] text-emerald-700 font-semibold block md:text-right">
                              ₹199 Doorstep Fee Waived
                            </span>
                          </div>

                          <button
                            onClick={() => setSelectedInvoice(booking)}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-300" />
                            <span>View Tax Invoice</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WARRANTY ALERTS */}
          {activeTab === 'warranties' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-heading font-extrabold text-base text-slate-900">
                  180-Day Written Warranty Passbook
                </h4>
                <p className="text-xs text-slate-500">
                  Track active written warranties, remaining days, and instant zero-cost re-visit requests across Bangalore
                </p>
              </div>

              {processedBookings.length === 0 ? (
                <div className="text-center py-10 px-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-600">No written warranty passes issued yet.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {processedBookings.map((b) => (
                    <div 
                      key={b.bookingId}
                      className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                        b.isWarrantyActive 
                          ? 'bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/40 border-blue-200 shadow-xs'
                          : 'bg-slate-50 border-slate-200 opacity-80'
                      }`}
                    >
                      <div>
                        {/* Warranty Header */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-xs font-black text-slate-900">
                            {b.bookingId}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            b.isWarrantyActive
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {b.isWarrantyActive ? 'Active 180-Day Protection' : 'Warranty Expired'}
                          </span>
                        </div>

                        <h5 className="font-heading font-extrabold text-slate-900 text-base">
                          {b.appliance}
                        </h5>
                        <p className="text-xs text-slate-600 mt-1">
                          Serviced by: <strong className="text-slate-800">Tech {b.assignedTech?.name || 'Babu'}</strong>
                        </p>

                        {/* Countdown Gauge */}
                        <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-600">Days Remaining:</span>
                            <span className={b.isWarrantyActive ? 'text-emerald-700 font-extrabold' : 'text-slate-400'}>
                              {b.daysRemaining} Days
                            </span>
                          </div>
                          
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                b.daysRemaining > 60 ? 'bg-emerald-500' : b.daysRemaining > 15 ? 'bg-blue-600' : 'bg-amber-500'
                              }`}
                              style={{ width: `${Math.min(100, Math.max(0, (b.daysRemaining / 180) * 100))}%` }}
                            />
                          </div>

                          <div className="flex justify-between text-[11px] text-slate-500">
                            <span>Service: {b.createdDateFormatted}</span>
                            <span>Expires: {b.warrantyExpiryFormatted}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      {b.isWarrantyActive ? (
                        <a
                          href={`tel:${b.assignedTech?.phone || '8095996638'}`}
                          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-300" />
                          <span>Claim Express Free Revisit (2-Hr Arrival)</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => { onClose(); onOpenBooking(); }}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-2"
                        >
                          <span>Renew Protection / Book Maintenance</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: REFER & EARN */}
          {activeTab === 'referral' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              
              {/* Hero Banner Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1.5 max-w-lg">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/40 text-amber-200 text-xs font-bold border border-amber-300/30">
                      <Gift className="w-3.5 h-3.5 text-amber-300" />
                      <span>Give ₹150, Get ₹150 Referral Program</span>
                    </div>

                    <h4 className="font-heading font-black text-2xl text-white">
                      Share & Earn Repair Credits
                    </h4>

                    <p className="text-xs text-amber-100 leading-relaxed">
                      Invite your apartment neighbors, family, or friends in Bangalore. They get <strong className="text-white">flat ₹150 OFF</strong> their first repair, and you earn <strong className="text-white">₹150 in service credits</strong> auto-deducted on your next invoice!
                    </p>
                  </div>

                  {/* Summary Stat Pill */}
                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-amber-300/30 text-center shrink-0">
                    <span className="text-[11px] uppercase font-extrabold tracking-wider text-amber-200 block">
                      Total Earned Credits
                    </span>
                    <span className="text-3xl font-black text-white font-mono block mt-0.5">
                      ₹300
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold block mt-0.5">
                      2 Neighbors Joined
                    </span>
                  </div>
                </div>
              </div>

              {/* Referral Code & Sharable Link Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h5 className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-amber-600" />
                  <span>Your Personal Referral Code & Unique Link</span>
                </h5>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Code Card */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">
                      Your Unique Promo Code:
                    </span>
                    <div className="flex items-center justify-between gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      <span className="font-mono font-black text-base text-amber-900 tracking-wider">
                        {userReferralCode}
                      </span>
                      <button
                        onClick={handleCopyReferralCode}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Link Card */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">
                      Your Direct Web Share Link:
                    </span>
                    <div className="flex items-center justify-between gap-2 bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                      <span className="font-mono text-xs text-blue-950 truncate max-w-[150px] sm:max-w-[170px]">
                        {referralLink}
                      </span>
                      <button
                        onClick={handleCopyReferralLink}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shrink-0"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Instant WhatsApp Share CTA Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                    <span>Share Referral Code on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleCopyReferralLink}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Copy Web Link</span>
                  </button>
                </div>
              </div>

              {/* Referral Activity & History List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Your Recent Referral Activity</span>
                  </h5>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Auto-Deducted on Next Repair
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center">
                        DK
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Deepak Kumar</div>
                        <div className="text-[11px] text-slate-500">Sobha Green, Bellandur • Washing Machine Repair</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-emerald-700 font-extrabold block">
                        +₹150 Reward Dispatched
                      </span>
                      <span className="text-[10px] text-slate-400">Joined 3 days ago</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center">
                        MN
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Meera Nair</div>
                        <div className="text-[11px] text-slate-500">Assetz East Point, Sarjapur • Split AC Jet Wash</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-emerald-700 font-extrabold block">
                        +₹150 Reward Dispatched
                      </span>
                      <span className="text-[10px] text-slate-400">Joined 1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: DOORSTEP PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="font-heading font-extrabold text-base text-slate-900">
                    Doorstep Delivery Address
                  </h4>
                  <p className="text-xs text-slate-500">
                    Manage your verified Bangalore address for auto-filling future bookings
                  </p>
                </div>

                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Doorstep profile updated successfully!</span>
                </div>
              )}

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfileSubmit} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none bg-white focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bangalore Locality
                    </label>
                    <input
                      type="text"
                      required
                      value={editLocality}
                      onChange={(e) => setEditLocality(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none bg-white focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Doorstep Address (Flat / House / Apartment / Street)
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none bg-white focus:border-blue-500"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 cursor-pointer"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Name:</span>
                    <strong className="text-slate-900">{userProfile?.name || editName || 'Valued Customer'}</strong>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Phone Number:</span>
                    <strong className="text-slate-900">{currentUser?.phoneNumber || userProfile?.phoneNumber || '+91 80959 96638'}</strong>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Bangalore Locality:</span>
                    <strong className="text-blue-700">{userProfile?.locality || editLocality || 'Koramangala'}</strong>
                  </div>

                  <div className="flex justify-between text-xs pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Doorstep Address:</span>
                    <span className="text-slate-900 font-medium max-w-[240px] text-right">
                      {userProfile?.defaultAddress || editAddress || 'Address on file'}
                    </span>
                  </div>
                </div>
              )}

              {/* Sign out button */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => { signOut(); onClose(); }}
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Itemized Tax Invoice Printable Popup Dialog */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invoice Header */}
            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-black text-xl text-slate-900">
                  Quick Fix <span className="text-blue-600">Pro</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                  TAX INVOICE
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Quick Fix Pro Service Centre • GSTIN: 29AABCQ8492K1Z9
              </p>
              <p className="text-[11px] text-slate-500">
                Ref ID: <strong className="text-slate-900">{selectedInvoice.bookingId}</strong> • Date: {selectedInvoice.createdAt?.split('T')[0] || '2026-11-04'}
              </p>
            </div>

            {/* Billed To */}
            <div className="p-3 rounded-xl bg-slate-50 text-xs space-y-1">
              <div className="font-bold text-slate-900">Billed To:</div>
              <div>{selectedInvoice.customerName} ({selectedInvoice.customerPhone})</div>
              <div className="text-slate-600">{selectedInvoice.customerAddress}, {selectedInvoice.locality}</div>
            </div>

            {/* Itemized Breakdown Table */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 pb-1 border-b border-slate-200 flex justify-between">
                <span>Description</span>
                <span>Amount (₹)</span>
              </div>

              <div className="flex justify-between text-slate-700 py-1">
                <span>{selectedInvoice.appliance} ({selectedInvoice.issue})</span>
                <span>₹{selectedInvoice.totalEstimated + (selectedInvoice.referralDiscount || 0)}</span>
              </div>

              <div className="flex justify-between text-emerald-700 py-1 bg-emerald-50 px-2 rounded font-medium">
                <span>Doorstep Inspection Fee</span>
                <span>₹0 (₹199 Waived)</span>
              </div>

              {selectedInvoice.referralDiscount && selectedInvoice.referralDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 py-1 bg-emerald-50 px-2 rounded font-medium">
                  <span>Neighbor Referral Discount ({selectedInvoice.referralCode || 'BLR150'})</span>
                  <span>-₹{selectedInvoice.referralDiscount}</span>
                </div>
              )}

              <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-300">
                <span>TOTAL PAID INVOICE:</span>
                <span className="font-mono text-blue-700">₹{selectedInvoice.totalEstimated}</span>
              </div>
            </div>

            {/* Warranty Certificate */}
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Includes <strong>180-Day Written Warranty Certificate</strong> for parts and technician revisit labor across Bangalore.</span>
            </div>

            {/* Print & Close */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handlePrintInvoice}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Print / Download Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
