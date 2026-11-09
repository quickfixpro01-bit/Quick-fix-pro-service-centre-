import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Wrench, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare,
  AlertCircle,
  Copy,
  Check,
  LocateFixed,
  Compass,
  Gift,
  Globe,
  Navigation,
  Loader2,
  Bell
} from 'lucide-react';
import { APPLIANCE_SERVICES, BRANDS, BANGALORE_AREAS, BookingRecord, BangaloreHub } from '../data/servicesData';
import { TIERED_PACKAGES } from '../data/packagesData';
import { useAuth } from '../context/AuthContext';
import { createBookingInFirestore } from '../lib/bookingsService';
import { lookupLocationWithGoogleMaps } from '../lib/mapsService';
import { SmartSlotPicker } from './SmartSlotPicker';
import { SmartSlotItem } from '../lib/smartSchedulingService';
import { requestPushPermissionAndToken, scheduleTechnicianStatusAlerts } from '../lib/fcmService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialPackageId?: string;
  initialLocality?: string;
  initialReferralCode?: string;
  initialReferralDiscount?: number;
  initialEstimate?: {
    applianceId: string;
    issue: string;
    brand: string;
    price: number;
  };
  onBookingCreated?: (booking: BookingRecord) => void;
  onTrackBooking?: (bookingId: string) => void;
}

// Approximate coordinates for Bangalore hubs to support browser geolocation
const BANGALORE_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Koramangala': { lat: 12.9352, lng: 77.6245 },
  'Indiranagar': { lat: 12.9784, lng: 77.6408 },
  'HSR Layout': { lat: 12.9121, lng: 77.6446 },
  'Whitefield': { lat: 12.9698, lng: 77.7500 },
  'Electronic City': { lat: 12.8452, lng: 77.6602 },
  'Jayanagar': { lat: 12.9308, lng: 77.5838 },
  'Marathahalli': { lat: 12.9591, lng: 77.6974 },
  'Bellandur': { lat: 12.9304, lng: 77.6784 },
  'BTM Layout': { lat: 12.9166, lng: 77.6101 },
  'JP Nagar': { lat: 12.9063, lng: 77.5857 },
  'Malleshwaram': { lat: 13.0031, lng: 77.5643 },
  'Rajajinagar': { lat: 12.9982, lng: 77.5530 },
  'Hebbal': { lat: 13.0358, lng: 77.5970 },
  'Yelahanka': { lat: 13.1007, lng: 77.5963 },
  'Sarjapur Road': { lat: 12.9100, lng: 77.6850 },
  'Banashankari': { lat: 12.9255, lng: 77.5468 },
  'RT Nagar': { lat: 13.0247, lng: 77.5948 },
  'Kalyan Nagar': { lat: 13.0280, lng: 77.6465 },
  'Basavanagudi': { lat: 12.9416, lng: 77.5755 },
  'MG Road / CBD': { lat: 12.9756, lng: 77.6066 }
};

// Haversine formula to find nearest hub
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialPackageId,
  initialLocality,
  initialReferralCode,
  initialReferralDiscount,
  initialEstimate,
  onBookingCreated,
  onTrackBooking
}) => {
  const { currentUser, userProfile, saveUserProfile } = useAuth();

  const [bookingType, setBookingType] = useState<'service' | 'package'>('service');
  
  // Appliance & Service Details
  const [selectedAppliance, setSelectedAppliance] = useState<string>('washing-machine');
  const [selectedPackage, setSelectedPackage] = useState<string>('deep-clean-special');
  const [selectedApplianceTypeTier, setSelectedApplianceTypeTier] = useState<string>('Front Load');
  const [selectedBrand, setSelectedBrand] = useState<string>('Samsung');
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  
  // Slot & Area
  const [locality, setLocality] = useState<string>('Koramangala');
  const [pincode, setPincode] = useState<string>('560034');
  const [preferredDate, setPreferredDate] = useState<string>('Today (Express Same-Day)');
  const [preferredTime, setPreferredTime] = useState<string>('12:00 PM - 02:00 PM (Express 60-min)');
  
  // Smart Scheduling State
  const [selectedSlotId, setSelectedSlotId] = useState<string>('slot-3');
  const [isEmergencyDispatch, setIsEmergencyDispatch] = useState<boolean>(false);
  const [selectedSmartSlot, setSelectedSmartSlot] = useState<SmartSlotItem | null>(null);

  const handleSelectSmartSlot = (slot: SmartSlotItem) => {
    setSelectedSlotId(slot.id);
    setSelectedSmartSlot(slot);
    setPreferredTime(`${slot.timeSlot} (${slot.badge})`);
  };
  
  // Geolocation detection state
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationFeedback, setLocationFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Customer Contact Details (Direct Booking - No OTP required)
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');

  // Google Maps Grounding address verification state
  const [isVerifyingMapsAddress, setIsVerifyingMapsAddress] = useState(false);
  const [mapsAddressDetails, setMapsAddressDetails] = useState<{
    formatted: string;
    hub: string;
    distance: number;
    eta: number;
  } | null>(null);

  // Referral discount state (Give ₹150, Get ₹150)
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralDiscount, setReferralDiscount] = useState<number>(0);

  const handleVerifyGoogleMapsAddress = async () => {
    if (!address.trim()) return;
    setIsVerifyingMapsAddress(true);
    try {
      const fullSearch = `${address}, ${locality}, Bengaluru`;
      const res = await lookupLocationWithGoogleMaps(fullSearch);
      setMapsAddressDetails({
        formatted: res.formattedAddress,
        hub: res.closestHubName,
        distance: res.distanceKm,
        eta: res.estimatedEtaMinutes
      });
    } catch {
      // Fallback
    } finally {
      setIsVerifyingMapsAddress(false);
    }
  };

  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Sync initial props and detect referral code
  useEffect(() => {
    if (initialPackageId) {
      setBookingType('package');
      setSelectedPackage(initialPackageId);
    } else if (initialServiceId) {
      setBookingType('service');
      setSelectedAppliance(initialServiceId);
    }

    if (initialLocality) {
      setLocality(initialLocality);
      const hub = BANGALORE_AREAS.find(a => a.name.toLowerCase() === initialLocality.toLowerCase());
      if (hub) setPincode(hub.pincode);
    }

    if (initialEstimate) {
      setBookingType('service');
      setSelectedAppliance(initialEstimate.applianceId);
      setSelectedBrand(initialEstimate.brand);
      setSelectedIssue(initialEstimate.issue);
    }

    // Check referral code from prop or URL
    let refCode = initialReferralCode;
    if (!refCode && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const qRef = urlParams.get('ref');
      if (qRef) refCode = qRef;
    }

    if (refCode) {
      setReferralCode(refCode.toUpperCase());
      setReferralDiscount(initialReferralDiscount || 150);
    }
  }, [initialServiceId, initialPackageId, initialLocality, initialEstimate, initialReferralCode, initialReferralDiscount, isOpen]);

  // Sync logged in user profile if available
  useEffect(() => {
    if (currentUser) {
      if (userProfile?.name && !name) {
        setName(userProfile.name);
      }
      if (currentUser.phoneNumber) {
        const cleanPhone = currentUser.phoneNumber.replace('+91', '').trim();
        setPhone(cleanPhone);
      } else if (userProfile?.phoneNumber && !phone) {
        const cleanPhone = userProfile.phoneNumber.replace('+91', '').trim();
        setPhone(cleanPhone);
      }
      if (userProfile?.defaultAddress && !address) {
        setAddress(userProfile.defaultAddress);
      }
      if (userProfile?.locality) {
        setLocality(userProfile.locality);
      }
    }
  }, [currentUser, userProfile]);

  // Lock body scroll and handle Escape key while modal is open
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

  const currentService = APPLIANCE_SERVICES.find(s => s.id === selectedAppliance) || APPLIANCE_SERVICES[0];
  const currentPkg = TIERED_PACKAGES.find(p => p.id === selectedPackage) || TIERED_PACKAGES[0];

  const handleLocalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locName = e.target.value;
    setLocality(locName);
    const hub = BANGALORE_AREAS.find(a => a.name === locName);
    if (hub) setPincode(hub.pincode);
    setLocationFeedback(null);
  };

  // Browser-based Geolocation request to suggest user's closest Bangalore hub
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationFeedback({
        type: 'error',
        message: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    setIsDetectingLocation(true);
    setLocationFeedback(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        let closestArea: BangaloreHub = BANGALORE_AREAS[0];
        let minDistance = Infinity;

        BANGALORE_AREAS.forEach((area) => {
          const coords = BANGALORE_COORDINATES[area.name];
          if (coords) {
            const dist = calculateDistanceKm(userLat, userLng, coords.lat, coords.lng);
            if (dist < minDistance) {
              minDistance = dist;
              closestArea = area;
            }
          }
        });

        setLocality(closestArea.name);
        setPincode(closestArea.pincode);
        setIsDetectingLocation(false);
        setLocationFeedback({
          type: 'success',
          message: `Nearest hub detected: ${closestArea.name} (~${minDistance} km) • ${closestArea.zone} Hub`
        });
      },
      (err) => {
        setIsDetectingLocation(false);
        let errorMsg = 'Could not access your location. Please pick your Bangalore area from the list.';
        if (err.code === err.PERMISSION_DENIED) {
          errorMsg = 'Location permission denied. Please select your area below.';
        } else if (err.code === err.TIMEOUT) {
          errorMsg = 'Location request timed out. Please choose your area manually.';
        }
        setLocationFeedback({
          type: 'info',
          message: errorMsg
        });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  // Direct Submission: No OTP verification gate required!
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    const cleanDigits = phone.replace(/\D/g, '');

    if (!name.trim()) {
      setSaveError('Please enter your full name.');
      return;
    }

    if (cleanDigits.length < 10) {
      setSaveError('Please enter a valid 10-digit mobile number for technician dispatch.');
      return;
    }

    if (!address.trim()) {
      setSaveError('Please enter your complete doorstep address (flat, building, street).');
      return;
    }

    setBookingInProgress(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `QFP-${randomNum}`;
    const formattedPhone = phone.startsWith('+91') ? phone.trim() : `+91 ${cleanDigits}`;

    const selectedTierObj = currentPkg.appliancePricing?.find(t => t.type === selectedApplianceTypeTier) || currentPkg.appliancePricing?.[0];
    const effectivePackagePrice = selectedTierObj ? selectedTierObj.price : currentPkg.price;
    const effectivePackageName = currentPkg.appliancePricing
      ? `${currentPkg.name} (${selectedApplianceTypeTier})`
      : currentPkg.name;

    const baseEstimated = bookingType === 'service' ? currentService.startingPrice : effectivePackagePrice;
    const finalEstimated = Math.max(0, baseEstimated - (referralDiscount || 0));

    const newBooking: BookingRecord = {
      bookingId: generatedId,
      appliance: bookingType === 'service' ? currentService.name : effectivePackageName,
      brand: selectedBrand,
      issue: bookingType === 'service' ? (selectedIssue || 'General diagnostic inspection') : currentPkg.tagline,
      date: preferredDate,
      timeSlot: preferredTime,
      locality,
      customerName: name.trim(),
      customerPhone: formattedPhone,
      customerAddress: address.trim(),
      landmark: landmark.trim() || undefined,
      status: 'assigned',
      assignedTech: {
        name: 'Babu',
        phone: '8095996638',
        rating: 4.9,
        experience: '7+ Years Senior Specialist',
        verified: true,
        photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&q=80',
        vehicleNo: 'KA 01 EK 4920',
        etaMinutes: 30
      },
      totalEstimated: finalEstimated,
      referralCode: referralDiscount > 0 ? (referralCode || 'BLR150') : undefined,
      referralDiscount: referralDiscount > 0 ? referralDiscount : undefined,
      createdAt: new Date().toISOString()
    };

    try {
      // Allow booking without any phone OTP requirement
      const effectiveUserId = currentUser?.uid || `guest_${cleanDigits}`;
      await createBookingInFirestore(newBooking, effectiveUserId);

      // If user is logged in, optionally update their address preference
      if (currentUser) {
        await saveUserProfile({
          name: name.trim(),
          defaultAddress: address.trim(),
          locality
        });
      }

      setConfirmedBooking(newBooking);
      if (onBookingCreated) {
        onBookingCreated(newBooking);
      }

      // Request browser Web Push notification permission & schedule technician alerts
      try {
        await requestPushPermissionAndToken(effectiveUserId);
        scheduleTechnicianStatusAlerts(generatedId, 'Babu', locality);
      } catch (pushErr) {
        console.warn('Push notification initialization warning:', pushErr);
      }
    } catch (err: any) {
      console.error('Failed to save booking to Firestore:', err);
      setSaveError('Could not sync booking to Firestore. Please check your connection and retry.');
    } finally {
      setBookingInProgress(false);
    }
  };

  const handleCopyId = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.bookingId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // WhatsApp click-to-chat payload
  const whatsappUrl = confirmedBooking 
    ? `https://wa.me/918095996638?text=${encodeURIComponent(
        `Hi Quick Fix Pro, I booked service with ID: ${confirmedBooking.bookingId}.\nAppliance: ${confirmedBooking.appliance}\nBrand: ${confirmedBooking.brand}\nLocality: ${confirmedBooking.locality}\nSlot: ${confirmedBooking.date} - ${confirmedBooking.timeSlot}\nName: ${confirmedBooking.customerName}\nAssigned Technician: Babu (8095996638)`
      )}`
    : '#';

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
        {/* Modal Top Header (Sticky / Shrink-0) */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/image_d5e93998_07d21934.jpg"
              alt="Quick Fix Pro Logo"
              className="w-8 h-8 rounded-lg object-contain bg-slate-950 p-0.5 border border-slate-700"
            />
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg flex items-center gap-2">
                <span>Book Quick Fix Pro Doorstep Service</span>
              </h3>
              <p className="text-[11px] text-amber-300">
                Bangalore Multi-Brand Appliance Repair • 8095996638 • 6-Month Warranty
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

        {/* Modal Content - Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain flex-1 touch-pan-y modal-body-scroll">
          {confirmedBooking ? (
            /* Booking Confirmed State */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Service Request Confirmed
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
                  Technician Babu Dispatched!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  Senior technician <strong>Babu</strong> has been assigned to your doorstep from the nearest <strong>{confirmedBooking.locality}</strong> hub.
                </p>
              </div>

              {/* Assigned Technician Highlight Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white text-left max-w-md mx-auto shadow-lg border border-slate-700">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={confirmedBooking.assignedTech?.photo}
                      alt="Technician Babu"
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-white">Technician {confirmedBooking.assignedTech?.name}</span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-semibold border border-emerald-700">
                          Verified
                        </span>
                      </div>
                      <div className="text-[11px] text-amber-300 font-semibold">
                        Phone: {confirmedBooking.assignedTech?.phone}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {confirmedBooking.assignedTech?.experience} • Vehicle: {confirmedBooking.assignedTech?.vehicleNo}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${confirmedBooking.assignedTech?.phone}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Technician Babu (8095996638)</span>
                  </a>
                </div>
              </div>

              {/* Booking Reference Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Booking Reference ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-lg text-blue-700">
                      {confirmedBooking.bookingId}
                    </span>
                    <button
                      onClick={handleCopyId}
                      className="p-1 rounded text-slate-500 hover:text-blue-600 cursor-pointer"
                      title="Copy ID"
                    >
                      {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <strong className="text-slate-900">{confirmedBooking.appliance}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Brand:</span>
                    <strong className="text-slate-900">{confirmedBooking.brand}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Slot:</span>
                    <strong className="text-slate-900">{confirmedBooking.date} • {confirmedBooking.timeSlot.split(' ')[0]}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Address:</span>
                    <span className="text-slate-900 text-right truncate max-w-[200px]">{confirmedBooking.customerAddress}</span>
                  </div>
                  {confirmedBooking.referralDiscount && confirmedBooking.referralDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                      <span className="flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Neighbor Referral Discount:</span>
                      </span>
                      <span>-₹{confirmedBooking.referralDiscount} ({confirmedBooking.referralCode || 'BLR150'})</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span>Assigned Specialist:</span>
                    <strong className="text-blue-700">Babu (8095996638) • ~{confirmedBooking.assignedTech?.etaMinutes} mins ETA</strong>
                  </div>
                  <div className="mt-2.5 p-2 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center gap-2 text-blue-900 font-medium">
                    <Bell className="w-4 h-4 text-blue-600 shrink-0 animate-bounce" />
                    <span>Push Alerts Active: Updates for <em>En Route</em>, <em>10-Min Arrival</em> &amp; <em>Completed Service</em> will appear on your screen.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`tel:${confirmedBooking.assignedTech?.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Babu: 8095996638
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Confirm via WhatsApp
                </a>

                <button
                  onClick={() => {
                    onClose();
                    if (onTrackBooking) {
                      onTrackBooking(confirmedBooking.bookingId);
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-colors cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  Track Live
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                A confirmation SMS with technician Babu's direct contact (8095996638) has been queued. Inspection fee ₹199 is waived upon repair approval.
              </p>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Type Switcher */}
              <div className="flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setBookingType('service')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    bookingType === 'service'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Single Appliance Repair</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('package')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    bookingType === 'package'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Annual Maintenance / Package</span>
                  </span>
                </button>
              </div>

              {/* Service or Package Selection */}
              {bookingType === 'service' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Appliance:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {APPLIANCE_SERVICES.map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => {
                          setSelectedAppliance(srv.id);
                          setSelectedIssue('');
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                          selectedAppliance === srv.id
                            ? 'border-blue-600 bg-blue-50/70 text-blue-800'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <div className="truncate">{srv.name.replace(' Repair', '')}</div>
                        <div className="text-[10px] text-amber-600 font-semibold mt-0.5">from ₹{srv.startingPrice}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Care Package / AMC:
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {TIERED_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          selectedPackage === pkg.id
                            ? 'border-blue-600 bg-blue-50/70 text-slate-900 ring-1 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span className="truncate pr-1">{pkg.name}</span>
                          <span className="text-blue-700 font-extrabold shrink-0">
                            {pkg.appliancePricing ? `from ₹${pkg.price}` : `₹${pkg.price}`}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{pkg.period}</div>
                      </button>
                    ))}
                  </div>

                  {currentPkg.appliancePricing && (
                    <div className="mt-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Select Machine Type:
                        </label>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Updated Rate Card
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {currentPkg.appliancePricing.map((tier) => (
                          <button
                            key={tier.type}
                            type="button"
                            onClick={() => setSelectedApplianceTypeTier(tier.type)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              selectedApplianceTypeTier === tier.type
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-600/30'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="text-[11px] font-semibold truncate">{tier.type}</div>
                            <div className={`text-sm font-extrabold mt-0.5 ${selectedApplianceTypeTier === tier.type ? 'text-white' : 'text-blue-700'}`}>
                              ₹{tier.price}
                            </div>
                            {tier.originalPrice && (
                              <div className={`text-[9px] line-through ${selectedApplianceTypeTier === tier.type ? 'text-blue-200' : 'text-slate-400'}`}>
                                ₹{tier.originalPrice}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Brand & Common Issues */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Appliance Brand:
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-100 focus:bg-white text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  >
                    {BRANDS.map((b, idx) => (
                      <option key={idx} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Reported Issue / Symptom:
                  </label>
                  <input
                    type="text"
                    value={selectedIssue}
                    onChange={(e) => setSelectedIssue(e.target.value)}
                    placeholder="e.g. Not cooling, loud noise, water leak..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-100 focus:bg-white text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Bangalore Locality & Preferred Date/Time with Browser Geolocation */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Bangalore Doorstep Slot:</span>
                  </div>

                  {/* Browser-based Geolocation Auto-Detect Button */}
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isDetectingLocation}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors cursor-pointer disabled:cursor-not-allowed self-start sm:self-auto"
                    title="Use GPS to suggest your nearest Bangalore service hub"
                  >
                    <LocateFixed className={`w-3.5 h-3.5 text-blue-600 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                    <span>{isDetectingLocation ? 'Detecting Nearest Hub...' : 'Auto-Detect My Area'}</span>
                  </button>
                </div>

                {/* Location feedback alert */}
                {locationFeedback && (
                  <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                    locationFeedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    <Compass className="w-4 h-4 shrink-0 text-current" />
                    <span>{locationFeedback.message}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Bangalore Locality:
                    </label>
                    <select
                      value={locality}
                      onChange={handleLocalityChange}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-100 focus:bg-white text-slate-900 font-medium focus:border-blue-500 outline-none transition-colors"
                    >
                      {BANGALORE_AREAS.map((a, idx) => (
                        <option key={idx} value={a.name}>
                          {a.name} ({a.pincode}) - {a.zone} Hub
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Preferred Service Day:
                    </label>
                    <select
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-100 focus:bg-white text-slate-900 font-medium focus:border-blue-500 outline-none transition-colors"
                    >
                      <option value="Today (Express Same-Day)">Today (Express Same-Day)</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Day after Tomorrow">Day after Tomorrow</option>
                      <option value="This Weekend">This Weekend</option>
                    </select>
                  </div>
                </div>

                {/* Smart Scheduling Utility (Zone Capacity, Load Badges, Auto-Selected Slot) */}
                <div className="pt-2">
                  <SmartSlotPicker
                    localityName={locality}
                    selectedDate={preferredDate}
                    selectedSlotId={selectedSlotId}
                    onSelectSlot={handleSelectSmartSlot}
                    isEmergencyDispatch={isEmergencyDispatch}
                    onToggleEmergency={(enabled) => {
                      setIsEmergencyDispatch(enabled);
                      if (enabled) {
                        setPreferredTime('Express 60-Min Emergency Breakdown Priority Dispatch');
                      }
                    }}
                  />
                </div>
              </div>

              {/* Customer Contact & Doorstep Details (Direct Booking - No Phone OTP Gate) */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Customer & Doorstep Details:</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Direct Booking • No OTP Required
                  </span>
                </div>

                {saveError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{saveError}</span>
                  </div>
                )}

                {currentUser && (
                  <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs flex items-center justify-between text-blue-900">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Signed in as <strong>{userProfile?.name || currentUser.phoneNumber || 'Customer'}</strong></span>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-medium">Auto-filled</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-100 focus:bg-white text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Mobile Number (+91) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-200 text-slate-700 text-xs font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone.replace('+91', '').trim()}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98451 44210"
                        className="w-full p-2.5 rounded-r-xl border border-slate-300 text-xs bg-slate-100 focus:bg-white text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-mono transition-colors"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Technician Babu will call this number prior to arrival.
                    </span>
                  </div>
                </div>

                {/* Doorstep Address inputs */}
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-semibold text-slate-700">
                        Doorstep Address *
                      </label>
                      <button
                        type="button"
                        onClick={handleVerifyGoogleMapsAddress}
                        disabled={isVerifyingMapsAddress || !address.trim()}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 hover:text-blue-800 disabled:text-slate-400 cursor-pointer"
                      >
                        {isVerifyingMapsAddress ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <Globe className="w-3 h-3 text-blue-600" />
                            <span>Verify with Google Maps</span>
                          </>
                        )}
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (mapsAddressDetails) setMapsAddressDetails(null);
                      }}
                      placeholder="Flat / House No, Apartment Name, Street *"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-100 focus:bg-white text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Metro / Park"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-100 focus:bg-white text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {mapsAddressDetails && (
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>
                        <strong>Google Maps Verified:</strong> ~{mapsAddressDetails.distance} km from <strong>{mapsAddressDetails.hub}</strong> hub ({mapsAddressDetails.eta} min ETA)
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded shrink-0">
                      Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Neighbor Referral Discount Banner */}
              {referralDiscount > 0 && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold">Neighbor Referral Discount Applied!</span>
                      <div className="text-[11px] text-emerald-700">
                        Code: <span className="font-mono font-bold">{referralCode}</span> • ₹{referralDiscount} credited to your service
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-200/80 text-emerald-900 text-xs font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    -₹{referralDiscount} OFF
                  </span>
                </div>
              )}

              {/* Price & Guarantee Summary */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-700">
                    6-Month Written Warranty • Genuine OEM Spares
                  </span>
                </div>
                <div className="text-right">
                  {bookingType === 'package' ? (
                    (() => {
                      const origPrice = currentPkg.appliancePricing?.find(t => t.type === selectedApplianceTypeTier)?.price ?? currentPkg.price;
                      const discountedPrice = Math.max(0, origPrice - referralDiscount);
                      return (
                        <>
                          <span className="text-[11px] text-slate-500 block">Package Total:</span>
                          {referralDiscount > 0 ? (
                            <>
                              <div className="flex items-center justify-end gap-1.5">
                                <span className="line-through text-slate-400 text-xs">₹{origPrice.toLocaleString('en-IN')}</span>
                                <span className="font-extrabold text-emerald-700">₹{discountedPrice.toLocaleString('en-IN')}</span>
                              </div>
                              <span className="text-[10px] text-emerald-600 font-semibold block">-₹{referralDiscount} referral applied</span>
                            </>
                          ) : (
                            <span className="font-extrabold text-blue-700">
                              ₹{origPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </>
                      );
                    })()
                  ) : (
                    <>
                      <span className="text-[11px] text-slate-500 block">Doorstep Inspection:</span>
                      {referralDiscount > 0 ? (
                        <>
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="line-through text-slate-400 text-xs">₹199</span>
                            <span className="font-extrabold text-emerald-700">₹{Math.max(0, 199 - referralDiscount)}</span>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold block">-₹{referralDiscount} referral applied</span>
                        </>
                      ) : (
                        <span className="font-extrabold text-blue-700">₹199 (waived upon repair)</span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={bookingInProgress || !name.trim() || phone.replace(/\D/g, '').length < 10 || !address.trim()}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {bookingInProgress ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    <span>Assigning Technician Babu & Confirming Slot...</span>
                  </span>
                ) : (
                  <>
                    <span>Confirm Doorstep Booking (Pay After Service)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
