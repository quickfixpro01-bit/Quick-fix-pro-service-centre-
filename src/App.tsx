import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { TrackerModal } from './components/TrackerModal';
import { PhoneAuthModal } from './components/PhoneAuthModal';
import { RepairHistoryModal } from './components/RepairHistoryModal';
import { QuickActionFab } from './components/QuickActionFab';
import { AdminPortal } from './components/AdminPortal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
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

  // If on Admin Portal Page, render dedicated Admin Portal
  if (currentPage === 'admin') {
    return (
      <AdminPortal onBackToCustomer={() => handleNavigate('home')} />
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

      {/* Main Page Router */}
      <main className="flex-grow">
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

      {/* Booking Wizard Modal */}
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

      {/* Live Service & Warranty Tracker Modal */}
      <TrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialBookingId={activeTrackingId}
        customBookings={userBookings}
      />

      {/* Phone Sign-In & Verification Modal */}
      <PhoneAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* User Profile & Repair History Dashboard Modal */}
      <RepairHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        userBookings={userBookings}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

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
