import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Menu, 
  X, 
  Search,
  Sparkles,
  Home,
  Building2,
  Wrench,
  Headphones,
  User,
  LogOut,
  Shield
} from 'lucide-react';
import { PageId } from '../types/navigation';
import { SocialIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: (initialService?: string, initialPackage?: string) => void;
  onOpenTracker: () => void;
  onOpenAuth: () => void;
  onOpenHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenTracker,
  onOpenAuth,
  onOpenHistory
}) => {
  const { currentUser, userProfile, signOut } = useAuth();
  const { language, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t('customers_badge')}
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-amber-300 font-semibold">
              {t('warranty_badge')}
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-300">
              {t('inspection_waived')}
            </span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-4 text-slate-300 shrink-0">
            <a 
              href="tel:+918095996638" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap font-medium text-amber-300 sm:text-slate-200">Hotline: +91 80959 96638</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href="https://wa.me/c/918095996638"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WA Catalog</span>
            </a>
            <span className="hidden lg:inline text-slate-600">|</span>
            <a
              href="mailto:quickfixpro01@gmail.com"
              className="hidden xl:inline-flex items-center gap-1 text-rose-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <span>quickfixpro01@gmail.com</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="hidden sm:inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors font-bold cursor-pointer whitespace-nowrap"
              title="Quick Fix Pro Administrator Portal"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>{t('admin_portal')}</span>
            </button>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <a
                href="https://www.instagram.com/quickfixproservicecentre/?__pwa=1"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-5 h-5 rounded flex items-center justify-center text-pink-400 hover:text-pink-300 transition-colors"
              >
                <SocialIcon id="instagram" className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com/@quickfixpro-k2e?si=LBe3LhvPjo-mcvPP"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-5 h-5 rounded flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
              >
                <SocialIcon id="youtube" className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.threads.com/@quickfixproservicecentre"
                target="_blank"
                rel="noopener noreferrer"
                title="Threads"
                className="w-5 h-5 rounded flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <SocialIcon id="threads" className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com/Quickfixpro01"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                className="w-5 h-5 rounded flex items-center justify-center text-sky-400 hover:text-sky-300 transition-colors"
              >
                <SocialIcon id="x" className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Brand Header Bar */}
      <div className="bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-800/80 py-3 sm:py-4 px-3 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 sm:gap-4 group text-left cursor-pointer min-w-0"
          >
            <img
              src="/assets/aistudio/image_d5e93998_07d21934.jpg"
              alt="Quick Fix Pro Service Centre Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover shadow-md border-2 border-amber-400 group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap leading-tight">
                <span className="font-heading font-black text-lg sm:text-2xl lg:text-3xl tracking-tight text-slate-900 dark:text-white">
                  {language === 'kn' ? (
                    <span>ಕ್ವಿಕ್ ಫಿಕ್ಸ್ <span className="text-blue-600 dark:text-blue-400">ಪ್ರೋ</span> <span className="text-amber-600 dark:text-amber-400 font-extrabold">ಸರ್ವಿಸ್ ಸೆಂಟರ್</span></span>
                  ) : (
                    <span>Quick Fix <span className="text-blue-600 dark:text-blue-400">Pro</span> <span className="text-amber-600 dark:text-amber-400 font-extrabold">Service Centre</span></span>
                  )}
                </span>
              </div>
              <span className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium tracking-normal mt-0.5 block break-words sm:whitespace-nowrap">
                Bangalore's Multi-Brand Appliance Repair • 8095996638
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Main Screen Language & Theme Controls in Brand Bar */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide pr-1">
                Display:
              </span>
              <LanguageToggle variant="compact" />
              <ThemeToggle variant="compact" />
            </div>

            <a
              href="tel:+918095996638"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/80 transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Direct Booking: 8095996638</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 gap-2">
          {/* Desktop Nav Links & Mobile Indicator */}
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <button
                onClick={() => handleNavClick('home')}
                className={`transition-colors cursor-pointer py-1 ${
                  currentPage === 'home'
                    ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                    : 'hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {t('nav_home')}
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`transition-colors cursor-pointer py-1 ${
                  currentPage === 'about'
                    ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                    : 'hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {t('nav_about')}
              </button>

              <button
                onClick={() => handleNavClick('services')}
                className={`transition-colors cursor-pointer py-1 ${
                  currentPage === 'services'
                    ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                    : 'hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {t('nav_services')}
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`transition-colors cursor-pointer py-1 ${
                  currentPage === 'contact'
                    ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400'
                    : 'hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {t('nav_contact')}
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className={`transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                  currentPage === 'admin'
                    ? 'text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-600 dark:border-amber-400'
                    : 'hover:text-amber-600 dark:hover:text-amber-400 text-slate-700 dark:text-slate-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('nav_admin')}</span>
              </button>

              {currentPage === 'home' && (
                <a href="#before-after" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 text-slate-500 dark:text-slate-400">
                  {t('nav_before_after')}
                </a>
              )}

              {currentPage === 'home' && (
                <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 text-slate-500 dark:text-slate-400">
                  {t('nav_faq')}
                </a>
              )}
            </nav>

            <div className="lg:hidden flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Menu Navigation</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Toggle */}
            <LanguageToggle />

            {/* Theme Toggle Button */}
            <ThemeToggle />

            <button
              onClick={onOpenTracker}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              title="Track status of your repair job"
            >
              <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              {t('btn_track_service')}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-1.5 pl-1">
                <button
                  onClick={() => onOpenHistory ? onOpenHistory() : onOpenAuth()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-all cursor-pointer"
                  title="View your Repair History, Invoices & Warranty Passes"
                >
                  <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-mono">
                    {currentUser.phoneNumber ? currentUser.phoneNumber.replace('+91', '') : (userProfile?.name?.split(' ')[0] || t('btn_my_repairs'))}
                  </span>
                </button>
                <button
                  onClick={signOut}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                  title="Sign out of Firebase"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                title="Sign in with phone number"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                {t('btn_sign_in')}
              </button>
            )}

            <a
              href="https://wa.me/918095996638?text=Hi%20Quick%20Fix%20Pro,%20I%20need%20doorstep%20appliance%20repair%20in%20Bangalore."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-blue-200" />
              {t('btn_book_service')}
            </button>
          </div>

          {/* Mobile menu button bar - Includes Direct Main Screen Language & Theme Toggles */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <LanguageToggle variant="compact" />
            <ThemeToggle variant="compact" />
            <button
              onClick={onOpenAuth}
              className={`p-2 rounded-lg text-xs font-semibold shrink-0 ${
                currentUser ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
              title="Sign In / Profile"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenTracker}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold shrink-0"
              title="Track Service"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 rounded-lg shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800 dark:text-slate-200" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-4 px-2 space-y-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-1 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('language_label')}</span>
              <LanguageToggle variant="pill" />
            </div>

            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-2 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('theme_appearance')}</span>
              <ThemeToggle variant="pill" />
            </div>

            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                currentPage === 'home' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{t('nav_home')}</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                currentPage === 'about' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>About Us</span>
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                currentPage === 'services' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>Services & Pricing</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                currentPage === 'contact' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Headphones className="w-4 h-4 text-blue-600" />
              <span>Contact Us</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                currentPage === 'admin' ? 'bg-amber-50 text-amber-800 font-bold' : 'text-slate-800 hover:bg-amber-50/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Operations Portal</span>
            </button>

            <div className="py-1 border-t border-slate-100 my-1"></div>

            <button
              onClick={() => handleNavClick('privacy')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                currentPage === 'privacy' ? 'text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Privacy Policy
            </button>

            <button
              onClick={() => handleNavClick('terms')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                currentPage === 'terms' ? 'text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Terms of Service
            </button>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {currentUser ? (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold text-slate-800 block">
                        {userProfile?.name || 'Customer Account'}
                      </span>
                      <span className="text-slate-500 font-mono">
                        {currentUser.phoneNumber || 'Phone Verified'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="px-2.5 py-1 text-rose-700 bg-rose-50 border border-rose-200 rounded font-semibold cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sign In with Mobile</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg text-center shadow-sm cursor-pointer"
              >
                Book Doorstep Service Now
              </button>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:+918095996638"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 text-white font-semibold rounded-lg text-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  Call: 8095996638
                </a>
                <a
                  href="https://wa.me/c/918095996638"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WA Catalog
                </a>
              </div>

              {/* Mobile Social Links Row */}
              <div className="pt-2 flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Social Channels:
                </span>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.slice(0, 6).map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 transition-colors`}
                    >
                      <SocialIcon id={link.id} className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
