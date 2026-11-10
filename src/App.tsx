import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { QuickActionFab } from './components/QuickActionFab';
import { PageId } from './types/navigation';
import { BookingRecord } from './data/servicesData';
import { ServicePackage } from './data/packagesData';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { subscribeToUserBookings } from './lib/bookingsService';

import { ScrollProgressBar, ScrollToTopButton } from './components/ScrollAnimation';
import { Background3DCanvas } from './components/Background3DCanvas';
import { PushNotificationToast } from './components/PushNotificationToast';

// Lazy load secondary application routes for code splitting
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(m => ({ default: m.TermsOfServicePage })));

// Lazy load heavy components and interactive modals
const AdminPortal = lazy(() => import('./components/AdminPortal').then(m => ({ default: m.AdminPortal })));
const BookingModal = lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));
const TrackerModal = lazy(() => import('./components/TrackerModal').then(m => ({ default: m.TrackerModal })));
const PhoneAuthModal = lazy(() => import('./components/PhoneAuthModal').then(m => ({ default: m.PhoneAuthModal })));
const RepairHistoryModal = lazy(() => import('./components/RepairHistoryModal').then(m => ({ default: m.RepairHistoryModal })));

// Route Fallback Loading Spinner
const PageLoadingFallback: React.FC<{ message?: string }> = ({ message = 'Loading Quick Fix Pro...' }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-slate-800"></div>
      <div className="absolute inset-0 rounded-full border-4 border-blue-600 dark:border-amber-400 border-t-transparent animate-spin"></div>
    </div>
    <div className="text-center space-y-1">
      <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">{message}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">Bangalore Doorstep Service Center</p>
    </div>
  </div>
);

// Modal Fallback Loading Spinner Overlay
const ModalLoadingFallback: React.FC<{ title: string }> = ({ title }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
    <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800 animate-in fade-in zoom-in-95">
      <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin shrink-0"></div>
      <span className="text-xs font-bold tracking-wide">{title}</span>
    </div>
  </div>
);

function AppContent() {
  const { currentUser } = useAuth();

  // Page Routing State with URL Hash Sync
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'about', 'services', 'contact', 'privacy', 'terms', 'admin'].includes(hash)) {
      return hash as PageId;
    }
    return 'home';
  });

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Booking pre-fill state
  const [prefilledServiceId, setPrefilledServiceId] = useState<string | undefined>();
  const [prefilledPackageId, setPrefilledPackageId] = useState<string | undefined>();
  const [prefilledLocality, setPrefilledLocality] = useState<string | undefined>();
  const [prefilledReferralCode, setPrefilledReferralCode] = useState<string | undefined>();
  const [prefilledEstimate, setPrefilledEstimate] = useState<{
    applianceId: string;
    issue: string;
    brand: string;
    price: number;
  } | undefined>();

  // Tracker state & real-time Firestore sync
  const [activeTrackingId, setActiveTrackingId] = useState<string | undefined>();
  const [userBookings, setUserBookings] = useState<BookingRecord[]>([]);

  // Check URL search parameters for referral code (?ref=BLR150)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        setPrefilledReferralCode(ref.toUpperCase());
        setIsBookingOpen(true);
      }
    }
  }, []);

  // Real-time synchronization of bookings from Firebase Firestore
  useEffect(() => {
    if (currentUser?.uid) {
      const unsubscribe = subscribeToUserBookings(currentUser.uid, (remoteBookings) => {
        setUserBookings(remoteBookings);
      });
      return () => unsubscribe();
    } else {
      setUserBookings([]);
    }
  }, [currentUser?.uid]);

  // Listen for browser back/forward or direct hash links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'about', 'services', 'contact', 'privacy', 'terms', 'admin'].includes(hash)) {
        setCurrentPage(hash as PageId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '' || hash === '/') {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string, packageId?: string) => {
    setPrefilledServiceId(serviceId);
    setPrefilledPackageId(packageId);
    setPrefilledEstimate(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    setPrefilledPackageId(pkg.id);
    setPrefilledServiceId(undefined);
    setPrefilledEstimate(undefined);
    setIsBookingOpen(true);
  };

  const handleBookWithEstimate = (applianceId: string, issue: string, brand: string, price: number) => {
    setPrefilledEstimate({ applianceId, issue, brand, price });
    setPrefilledServiceId(applianceId);
    setPrefilledPackageId(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectLocality = (localityName: string) => {
    setPrefilledLocality(localityName);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithReferral = (referralCode: string) => {
    setPrefilledReferralCode(referralCode);
    setPrefilledServiceId(undefined);
    setPrefilledPackageId(undefined);
    setPrefilledEstimate(undefined);
    setIsBookingOpen(true);
  };

  const handleBookingCreated = (newBooking: BookingRecord) => {
    setUserBookings(prev => {
      const exists = prev.some(b => b.bookingId === newBooking.bookingId);
      if (exists) return prev;
      return [newBooking, ...prev];
    });
  };

  const handleTrackBooking = (bookingId: string) => {
    setActiveTrackingId(bookingId);
    setIsTrackerOpen(true);
  };

  const handleOpenTracker = (bookingId?: string) => {
    const targetId = bookingId || (userBookings.length > 0 ? userBookings[0].bookingId : undefined);
    setActiveTrackingId(targetId);
    setIsTrackerOpen(true);
  };

  // If on Admin Portal Page, render lazy-loaded dedicated Admin Portal
  if (currentPage === 'admin') {
    return (
      <Suspense fallback={<PageLoadingFallback message="Loading Administrator Portal..." />}>
        <AdminPortal onBackToCustomer={() => handleNavigate('home')} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white relative transition-colors duration-200">
      {/* 3D Interactive Scroll Canvas */}
      <Background3DCanvas />

      {/* Scroll Progress Bar at the top of the screen */}
      <ScrollProgressBar />

      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={() => handleOpenTracker()}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Main Page Router with Suspense boundary for lazy routes */}
      <main className="flex-grow">
        <Suspense fallback={<PageLoadingFallback message="Loading page..." />}>
          {currentPage === 'home' && (
            <HomePage
              onOpenBooking={handleOpenBooking}
              onSelectPackage={handleSelectPackage}
              onBookWithEstimate={handleBookWithEstimate}
              onSelectLocality={handleSelectLocality}
              onOpenBookingWithReferral={handleOpenBookingWithReferral}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              onOpenBooking={() => handleOpenBooking()}
              onNavigatePage={handleNavigate}
            />
          )}

          {currentPage === 'services' && (
            <ServicesPage
              onOpenBooking={handleOpenBooking}
              onSelectPackage={handleSelectPackage}
              onBookWithEstimate={handleBookWithEstimate}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage />
          )}

          {currentPage === 'privacy' && (
            <PrivacyPolicyPage />
          )}

          {currentPage === 'terms' && (
            <TermsOfServicePage />
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={() => handleOpenTracker()}
      />

      {/* Floating Action CTA */}
      <QuickActionFab
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Lazy Loaded Booking Wizard Modal */}
      {isBookingOpen && (
        <Suspense fallback={<ModalLoadingFallback title="Loading Booking Wizard..." />}>
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            initialServiceId={prefilledServiceId}
            initialPackageId={prefilledPackageId}
            initialLocality={prefilledLocality}
            initialEstimate={prefilledEstimate}
            initialReferralCode={prefilledReferralCode}
            onBookingCreated={handleBookingCreated}
            onTrackBooking={handleTrackBooking}
          />
        </Suspense>
      )}

      {/* Lazy Loaded Live Service & Warranty Tracker Modal */}
      {isTrackerOpen && (
        <Suspense fallback={<ModalLoadingFallback title="Loading Live Service Tracker..." />}>
          <TrackerModal
            isOpen={isTrackerOpen}
            onClose={() => setIsTrackerOpen(false)}
            initialBookingId={activeTrackingId}
            customBookings={userBookings}
          />
        </Suspense>
      )}

      {/* Lazy Loaded Phone Sign-In & Verification Modal */}
      {isAuthOpen && (
        <Suspense fallback={<ModalLoadingFallback title="Loading Sign In..." />}>
          <PhoneAuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
          />
        </Suspense>
      )}

      {/* Lazy Loaded User Profile & Repair History Dashboard Modal */}
      {isHistoryOpen && (
        <Suspense fallback={<ModalLoadingFallback title="Loading Repair History..." />}>
          <RepairHistoryModal
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            userBookings={userBookings}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </Suspense>
      )}

      {/* Live Foreground Push Alert Notification Toast */}
      <PushNotificationToast onTrackBooking={handleTrackBooking} />

      {/* Floating Back-to-Top Button with Scroll Progress Ring */}
      <ScrollToTopButton />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
