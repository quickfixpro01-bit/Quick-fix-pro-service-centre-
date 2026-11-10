import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Lock, 
  Phone, 
  Key, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Wrench, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  ArrowRight, 
  MessageSquare, 
  Check, 
  X, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Copy,
  ExternalLink,
  Car,
  IndianRupee,
  FileSpreadsheet,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  BookingRecord, 
  APPLIANCE_SERVICES, 
  BRANDS, 
  BANGALORE_AREAS 
} from '../data/servicesData';
import { 
  subscribeToAllBookings, 
  createBookingInFirestore, 
  updateBookingInFirestore, 
  deleteBookingFromFirestore 
} from '../lib/bookingsService';

const ADMIN_PASSWORD = '786786';
const ADMIN_SESSION_KEY = 'quick_fix_pro_admin_session';

const TECHNICIANS = [
  {
    name: 'Babu',
    phone: '8095996638',
    rating: 4.9,
    experience: '7+ Years Senior Specialist',
    vehicleNo: 'KA 01 EK 4920',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Ramesh Gowda',
    phone: '9886038291',
    rating: 4.8,
    experience: '6 Years Inverter & PCB Pro',
    vehicleNo: 'KA 03 HM 2210',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Manjunath K',
    phone: '9741288390',
    rating: 4.9,
    experience: '8 Years AC & Cooling Master',
    vehicleNo: 'KA 05 MN 8821',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Suresh Patil',
    phone: '9900112233',
    rating: 4.7,
    experience: '5 Years Washing Machine Specialist',
    vehicleNo: 'KA 04 SP 1044',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  }
];

interface AdminPortalProps {
  onBackToCustomer: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToCustomer }) => {
  // Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(ADMIN_SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed?.authenticated === true || parsed?.role === 'admin';
      }
    } catch {
      // fallback
    }
    return false;
  });

  // Login Form State
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Bookings State
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedApplianceFilter, setSelectedApplianceFilter] = useState<string>('all');
  const [selectedLocalityFilter, setSelectedLocalityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priceHigh' | 'priceLow'>('newest');

  // Modals State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingRecord | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Booking Form State
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerAddress, setNewCustomerAddress] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newLocality, setNewLocality] = useState(BANGALORE_AREAS[0].name);
  const [newAppliance, setNewAppliance] = useState(APPLIANCE_SERVICES[0].name);
  const [newBrand, setNewBrand] = useState(BRANDS[0].name);
  const [newIssue, setNewIssue] = useState('');
  const [newDate, setNewDate] = useState('Today (Express Same-Day)');
  const [newTimeSlot, setNewTimeSlot] = useState('Morning (09:00 AM - 12:00 PM)');
  const [newPrice, setNewPrice] = useState<number>(399);
  const [newStatus, setNewStatus] = useState<BookingRecord['status']>('assigned');
  const [newAssignedTech, setNewAssignedTech] = useState(TECHNICIANS[0].name);
  const [newAdminNotes, setNewAdminNotes] = useState('');
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  // Edit Booking Form State
  const [editStatus, setEditStatus] = useState<BookingRecord['status']>('assigned');
  const [editTechName, setEditTechName] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editNotes, setEditNotes] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Subscribe to all bookings when authenticated
  useEffect(() => {
    if (!isAdminAuthenticated) return;

    setIsLoadingBookings(true);
    const unsubscribe = subscribeToAllBookings((liveBookings) => {
      setBookings(liveBookings);
      setIsLoadingBookings(false);
    });

    return () => unsubscribe();
  }, [isAdminAuthenticated]);

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    if (loginPassword.trim() !== ADMIN_PASSWORD) {
      setLoginError('Invalid administrator password. Please enter the correct password.');
      setIsLoggingIn(false);
      return;
    }

    // Success
    const adminSession = {
      authenticated: true,
      role: 'admin',
      name: 'Quick Fix Pro Administrator',
      authenticatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminSession));
    } catch {
      // ignore
    }

    setIsAdminAuthenticated(true);
    setIsLoggingIn(false);
  };

  // Handle Admin Logout
  const handleAdminLogout = () => {
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
    setIsAdminAuthenticated(false);
    setLoginPassword('');
  };

  // Quick Status change from Table Row
  const handleQuickStatusChange = async (bookingId: string, status: BookingRecord['status']) => {
    await updateBookingInFirestore(bookingId, { status });
  };

  // Open Edit Modal
  const handleOpenEdit = (booking: BookingRecord) => {
    setEditingBooking(booking);
    setEditStatus(booking.status);
    setEditTechName(booking.assignedTech?.name || TECHNICIANS[0].name);
    setEditPrice(booking.totalEstimated);
    setEditNotes(booking.adminNotes || '');
  };

  // Save Edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    setIsSavingEdit(true);
    const selectedTechObj = TECHNICIANS.find(t => t.name === editTechName) || TECHNICIANS[0];

    const updates: Partial<BookingRecord> = {
      status: editStatus,
      totalEstimated: Number(editPrice) || 0,
      adminNotes: editNotes.trim(),
      assignedTech: {
        name: selectedTechObj.name,
        phone: selectedTechObj.phone,
        rating: selectedTechObj.rating,
        experience: selectedTechObj.experience,
        verified: selectedTechObj.verified,
        photo: selectedTechObj.photo,
        vehicleNo: selectedTechObj.vehicleNo,
        etaMinutes: editStatus === 'en_route' ? 20 : 35
      }
    };

    await updateBookingInFirestore(editingBooking.bookingId, updates);
    setIsSavingEdit(false);
    setEditingBooking(null);
  };

  // Handle Delete Booking
  const handleDeleteBooking = async (bookingId: string) => {
    if (confirm(`Are you sure you want to permanently delete booking ${bookingId}?`)) {
      const cleanId = bookingId.trim();
      setBookings(prev => prev.filter(b => b.bookingId.trim() !== cleanId));
      await deleteBookingFromFirestore(cleanId);
    }
  };

  // Handle Create Booking from Admin End
  const handleCreateAdminBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName || !newCustomerPhone || !newCustomerAddress) {
      alert('Please fill in Customer Name, Phone, and Address.');
      return;
    }

    setIsSubmittingNew(true);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `QFP-${randomSuffix}`;

    const selectedTechObj = TECHNICIANS.find(t => t.name === newAssignedTech) || TECHNICIANS[0];

    const newBooking: BookingRecord = {
      bookingId: generatedId,
      appliance: newAppliance,
      brand: newBrand,
      issue: newIssue.trim() || 'General diagnosis and service repair',
      date: newDate,
      timeSlot: newTimeSlot,
      locality: newLocality,
      customerName: newCustomerName.trim(),
      customerPhone: newCustomerPhone.startsWith('+91') ? newCustomerPhone : `+91 ${newCustomerPhone.replace(/\D/g, '')}`,
      customerAddress: newCustomerAddress.trim(),
      landmark: newLandmark.trim() || undefined,
      status: newStatus,
      assignedTech: {
        name: selectedTechObj.name,
        phone: selectedTechObj.phone,
        rating: selectedTechObj.rating,
        experience: selectedTechObj.experience,
        verified: selectedTechObj.verified,
        photo: selectedTechObj.photo,
        vehicleNo: selectedTechObj.vehicleNo,
        etaMinutes: 30
      },
      totalEstimated: Number(newPrice) || 399,
      adminNotes: newAdminNotes.trim() || 'Created via Admin Portal',
      createdAt: new Date().toISOString()
    };

    await createBookingInFirestore(newBooking, 'admin_portal');
    setIsSubmittingNew(false);
    setIsCreateModalOpen(false);

    // Reset Form
    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewCustomerAddress('');
    setNewLandmark('');
    setNewIssue('');
    setNewAdminNotes('');
  };

  // Copy Booking ID helper
  const handleCopyBookingId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredBookings.length === 0) return;

    const headers = ['Booking ID', 'Customer Name', 'Phone', 'Locality', 'Address', 'Appliance', 'Brand', 'Issue', 'Date', 'Time Slot', 'Technician', 'Status', 'Estimated (INR)', 'Created At'];
    const rows = filteredBookings.map(b => [
      `"${b.bookingId}"`,
      `"${b.customerName}"`,
      `"${b.customerPhone}"`,
      `"${b.locality}"`,
      `"${b.customerAddress.replace(/"/g, '""')}"`,
      `"${b.appliance}"`,
      `"${b.brand}"`,
      `"${b.issue.replace(/"/g, '""')}"`,
      `"${b.date}"`,
      `"${b.timeSlot}"`,
      `"${b.assignedTech?.name || 'Unassigned'}"`,
      `"${b.status}"`,
      `"${b.totalEstimated}"`,
      `"${b.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `quick_fix_pro_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compute Metrics
  const metrics = useMemo(() => {
    const total = bookings.length;
    const active = bookings.filter(b => ['assigned', 'en_route', 'in_inspection'].includes(b.status)).length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const revenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (Number(b.totalEstimated) || 0), 0);

    return { total, active, completed, cancelled, revenue };
  }, [bookings]);

  // Filter & Search Logic
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = b.bookingId.toLowerCase().includes(q);
        const matchesName = b.customerName.toLowerCase().includes(q);
        const matchesPhone = b.customerPhone.toLowerCase().includes(q);
        const matchesLoc = b.locality.toLowerCase().includes(q);
        const matchesApp = b.appliance.toLowerCase().includes(q);
        const matchesBrand = b.brand.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesPhone && !matchesLoc && !matchesApp && !matchesBrand) {
          return false;
        }
      }

      // Status
      if (selectedStatusFilter !== 'all' && b.status !== selectedStatusFilter) {
        return false;
      }

      // Appliance
      if (selectedApplianceFilter !== 'all' && !b.appliance.toLowerCase().includes(selectedApplianceFilter.toLowerCase())) {
        return false;
      }

      // Locality
      if (selectedLocalityFilter !== 'all' && !b.locality.toLowerCase().includes(selectedLocalityFilter.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'priceHigh') return b.totalEstimated - a.totalEstimated;
      if (sortBy === 'priceLow') return a.totalEstimated - b.totalEstimated;
      return 0;
    });
  }, [bookings, searchQuery, selectedStatusFilter, selectedApplianceFilter, selectedLocalityFilter, sortBy]);

  // Status Badge Styling Helper
  const getStatusBadge = (status: BookingRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Confirmed
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Wrench className="w-3.5 h-3.5 text-amber-700" />
            Tech Assigned
          </span>
        );
      case 'en_route':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-300">
            <Car className="w-3.5 h-3.5 text-purple-700 animate-pulse" />
            En Route
          </span>
        );
      case 'in_inspection':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
            Diagnosing
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <X className="w-3.5 h-3.5 text-slate-500" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            {status}
          </span>
        );
    }
  };

  // IF NOT AUTHENTICATED: Display Admin Sign In Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-heading font-extrabold text-white tracking-tight">
              Administrator Portal
            </h2>
            <p className="text-xs text-slate-400">
              Authorized management access for Quick Fix Pro Bangalore operations.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-base font-mono tracking-wider focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn || !loginPassword.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isLoggingIn ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-950/40 border-t-slate-950 rounded-full animate-spin"></span>
                  Authenticating Administrator...
                </span>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Authenticate & Enter Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 text-center">
            <button
              onClick={onBackToCustomer}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Back to Customer Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED: Display Full Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      {/* Top Admin Navigation Header */}
      <div className="sticky top-0 z-30 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand & Portal Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-white">
                    Quick Fix Pro <span className="text-amber-400">Admin</span>
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Live Operations
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span>Logged in as: <strong className="text-slate-200">Administrator</strong></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[11px] text-emerald-400">Firestore Connected</span>
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Booking</span>
              </button>

              <button
                onClick={handleExportCSV}
                title="Export bookings to CSV"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={onBackToCustomer}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <span>Storefront</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleAdminLogout}
                title="Log out of Admin Portal"
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 transition-colors cursor-pointer flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* KPI Metrics Summary Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Bookings</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{metrics.total}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">All customer requests</div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-amber-200 bg-amber-50/40">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Active In-Progress</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-1">{metrics.active}</div>
            <div className="text-[11px] text-amber-600 mt-0.5">Assigned & En Route</div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-emerald-200 bg-emerald-50/40">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Completed Jobs</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{metrics.completed}</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">Serviced & Invoiced</div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Cancelled</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-600 mt-1">{metrics.cancelled}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Closed without repair</div>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-4 rounded-2xl shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Total Pipeline</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 flex items-center">
              <span>₹{metrics.revenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="text-[11px] text-blue-300 mt-0.5">Estimated gross volume</div>
          </div>
        </div>

        {/* Filters, Search & Sorting Controls */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID (QFP-...), Customer Name, Phone, Area, Appliance, Brand..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedApplianceFilter}
                onChange={(e) => setSelectedApplianceFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Appliances</option>
                {APPLIANCE_SERVICES.map(srv => (
                  <option key={srv.id} value={srv.name}>{srv.name}</option>
                ))}
              </select>

              <select
                value={selectedLocalityFilter}
                onChange={(e) => setSelectedLocalityFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Areas ({BANGALORE_AREAS.length})</option>
                {BANGALORE_AREAS.map(area => (
                  <option key={area.name} value={area.name}>{area.name}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="priceLow">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Status Tab Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-100 pt-3 scrollbar-none">
            {[
              { id: 'all', label: 'All Statuses', count: metrics.total },
              { id: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
              { id: 'assigned', label: 'Tech Assigned', count: bookings.filter(b => b.status === 'assigned').length },
              { id: 'en_route', label: 'En Route', count: bookings.filter(b => b.status === 'en_route').length },
              { id: 'in_inspection', label: 'Diagnosing', count: bookings.filter(b => b.status === 'in_inspection').length },
              { id: 'completed', label: 'Completed', count: metrics.completed },
              { id: 'cancelled', label: 'Cancelled', count: metrics.cancelled }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedStatusFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedStatusFilter === tab.id ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table / List */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                Bookings Management Directory
              </h2>
              <p className="text-xs text-slate-500">
                Showing {filteredBookings.length} of {bookings.length} bookings
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatusFilter('all');
                setSelectedApplianceFilter('all');
                setSelectedLocalityFilter('all');
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>

          {isLoadingBookings ? (
            <div className="py-16 text-center text-slate-500 space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-600" />
              <p className="text-xs">Loading bookings from Firestore...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No bookings match the selected criteria.</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Booking</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Appliance & Brand</th>
                    <th className="py-3 px-4">Slot & Area</th>
                    <th className="py-3 px-4">Technician</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Est. Price</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredBookings.map((b) => (
                    <tr key={b.bookingId} className="hover:bg-slate-50/80 transition-colors">
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <span>{b.bookingId}</span>
                          <button
                            onClick={() => handleCopyBookingId(b.bookingId)}
                            title="Copy Booking ID"
                            className="p-1 hover:text-blue-600 rounded cursor-pointer text-slate-400"
                          >
                            {copiedId === b.bookingId ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {new Date(b.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{b.customerName}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a
                            href={`tel:${b.customerPhone}`}
                            className="font-mono text-slate-600 hover:text-blue-600 inline-flex items-center gap-0.5"
                          >
                            <Phone className="w-2.5 h-2.5 text-slate-400" />
                            {b.customerPhone}
                          </a>
                          <a
                            href={`https://wa.me/${b.customerPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(b.customerName)},%20this%20is%20Quick%20Fix%20Pro%20regarding%20your%20${encodeURIComponent(b.appliance)}%20service%20booking%20(${b.bookingId}).`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700"
                            title="WhatsApp Customer"
                          >
                            <MessageSquare className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[200px]" title={b.customerAddress}>
                          {b.customerAddress}
                        </div>
                      </td>

                      {/* Appliance & Issue */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          {b.appliance} <span className="font-normal text-slate-500">• {b.brand}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 truncate max-w-[220px]" title={b.issue}>
                          {b.issue}
                        </div>
                      </td>

                      {/* Slot & Area */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-900 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{b.date}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-blue-500" />
                          <span>{b.locality}</span>
                        </div>
                      </td>

                      {/* Technician */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {b.assignedTech ? (
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1">
                              <span>{b.assignedTech.name}</span>
                              <span className="text-[10px] text-amber-600 font-bold">★ {b.assignedTech.rating}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {b.assignedTech.phone} • {b.assignedTech.vehicleNo}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Unassigned</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={b.status}
                          onChange={(e) => handleQuickStatusChange(b.bookingId, e.target.value as any)}
                          className="text-xs font-semibold bg-white border border-slate-300 rounded-lg p-1 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="assigned">Tech Assigned</option>
                          <option value="en_route">En Route</option>
                          <option value="in_inspection">Diagnosing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Estimated Price */}
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 whitespace-nowrap font-mono">
                        ₹{b.totalEstimated}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(b)}
                            title="Edit / Manage Booking Details"
                            className="px-2.5 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer font-bold flex items-center gap-1 text-[11px]"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteBooking(b.bookingId)}
                            title={`Delete ${b.status === 'completed' ? 'Completed ' : ''}Booking ${b.bookingId}`}
                            className="px-2.5 py-1.5 text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 rounded-lg transition-colors cursor-pointer font-bold flex items-center gap-1 text-[11px]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: ADD NEW BOOKING FROM ADMIN END */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overscroll-contain">
          <div className="fixed inset-0 bg-transparent" onClick={() => setIsCreateModalOpen(false)} />
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Create New Doorstep Booking</h3>
                  <p className="text-[11px] text-amber-300">Admin Dispatch • Direct Firestore Registration</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateAdminBooking} className="p-6 overflow-y-auto space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Phone (+91) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={newCustomerPhone}
                      onChange={(e) => setNewCustomerPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="98451 44210"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bangalore Area / Locality *
                  </label>
                  <select
                    value={newLocality}
                    onChange={(e) => setNewLocality(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                  >
                    {BANGALORE_AREAS.map(area => (
                      <option key={area.name} value={area.name}>{area.name} ({area.pincode})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Landmark / Cross
                  </label>
                  <input
                    type="text"
                    value={newLandmark}
                    onChange={(e) => setNewLandmark(e.target.value)}
                    placeholder="Near BDA Complex / Metro Pillar"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Complete Doorstep Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newCustomerAddress}
                  onChange={(e) => setNewCustomerAddress(e.target.value)}
                  placeholder="Flat No, Building Name, Street, Bangalore"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Appliance *
                  </label>
                  <select
                    value={newAppliance}
                    onChange={(e) => setNewAppliance(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                  >
                    {APPLIANCE_SERVICES.map(srv => (
                      <option key={srv.id} value={srv.name}>{srv.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brand *
                  </label>
                  <select
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                  >
                    {BRANDS.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reported Issue / Problem Description
                </label>
                <input
                  type="text"
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  placeholder="e.g. Drum not spinning, making loud rattle on spin cycle"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <select
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Today (Express Same-Day)">Today (Express Same-Day)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Day after Tomorrow">Day after Tomorrow</option>
                    <option value="This Weekend">This Weekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                    <option value="Evening (03:00 PM - 06:00 PM)">Evening (03:00 PM - 06:00 PM)</option>
                    <option value="Late Evening (06:00 PM - 08:30 PM)">Late Evening (06:00 PM - 08:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Assign Technician
                  </label>
                  <select
                    value={newAssignedTech}
                    onChange={(e) => setNewAssignedTech(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500 font-semibold"
                  >
                    {TECHNICIANS.map(t => (
                      <option key={t.name} value={t.name}>
                        {t.name} ({t.experience})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="assigned">Technician Assigned</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="en_route">En Route</option>
                    <option value="in_inspection">Diagnosing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Internal Admin / Technician Notes
                </label>
                <input
                  type="text"
                  value={newAdminNotes}
                  onChange={(e) => setNewAdminNotes(e.target.value)}
                  placeholder="e.g. Call customer before leaving; carry multimeter & IFB inlet valve"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNew}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm cursor-pointer disabled:bg-slate-300"
                >
                  {isSubmittingNew ? 'Creating Booking...' : 'Dispatch & Register Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT / MANAGE BOOKING DETAILS */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overscroll-contain">
          <div className="fixed inset-0 bg-transparent" onClick={() => setEditingBooking(null)} />
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Manage Booking <span className="font-mono text-amber-400">{editingBooking.bookingId}</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">{editingBooking.customerName} • {editingBooking.appliance}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingBooking(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Booking Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="assigned">Technician Assigned</option>
                  <option value="en_route">En Route (On the way)</option>
                  <option value="in_inspection">In Inspection (Diagnosing)</option>
                  <option value="completed">Completed (Work Finished & Billed)</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assign Specialist Technician
                </label>
                <select
                  value={editTechName}
                  onChange={(e) => setEditTechName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  {TECHNICIANS.map(t => (
                    <option key={t.name} value={t.name}>
                      {t.name} ({t.experience} • {t.vehicleNo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Updated Total Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Technician Diagnosis / Admin Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add diagnosis result, replaced spare parts list, or customer feedback..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const id = editingBooking.bookingId;
                    setEditingBooking(null);
                    handleDeleteBooking(id);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-600 hover:text-white bg-rose-50 border border-rose-200 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Booking</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingBooking(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingEdit}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm cursor-pointer disabled:bg-slate-300"
                  >
                    {isSavingEdit ? 'Saving Updates...' : 'Save & Sync Firestore'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
