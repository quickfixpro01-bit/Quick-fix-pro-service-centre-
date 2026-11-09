import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  AlertCircle,
  User,
  Sparkles,
  Lock,
  Zap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PhoneAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export const PhoneAuthModal: React.FC<PhoneAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = "Sign In with Mobile",
  subtitle = "Verify your phone number to access your doorstep repair bookings and 6-month warranty pass."
}) => {
  const { 
    currentUser, 
    userProfile, 
    sendOtp, 
    sendDemoOtp,
    verifyOtp, 
    signInWithGoogle,
    signOut, 
    authError, 
    authWarningNotice,
    isDemoMode,
    demoOtpCode,
    clearAuthError,
    resetToPhoneInput
  } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showConsoleGuide, setShowConsoleGuide] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep('phone');
      setOtp('');
      clearAuthError();
      resetToPhoneInput();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (!isOpen) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = orig;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = phoneNumber.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);
    const success = await sendOtp(phoneNumber, 'recaptcha-container-modal');
    setIsSubmitting(false);

    if (success) {
      setStep('otp');
      setTimer(45);
      if (isDemoMode) {
        setOtp('123456');
      }
    }
  };

  const handleInstantDemo = async () => {
    const cleanDigits = phoneNumber.replace(/\D/g, '') || '9845144210';
    if (!phoneNumber) setPhoneNumber('9845144210');
    setIsSubmitting(true);
    const success = await sendDemoOtp(cleanDigits);
    setIsSubmitting(false);
    if (success) {
      setStep('otp');
      setOtp('123456');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      alert('Please enter the 6-digit OTP code');
      return;
    }

    setIsSubmitting(true);
    const success = await verifyOtp(otp, customerName);
    setIsSubmitting(false);

    if (success) {
      setStep('success');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1200);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setIsSubmitting(true);
    const success = await sendOtp(phoneNumber, 'recaptcha-container-modal');
    setIsSubmitting(false);
    if (success) {
      setTimer(45);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overscroll-contain">
      <div className="fixed inset-0 bg-transparent" onClick={onClose} aria-hidden="true" />

      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Invisible reCAPTCHA container */}
        <div id="recaptcha-container-modal"></div>

        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">{title}</h3>
              <p className="text-[11px] text-amber-300">Quick Fix Pro • Secure OTP Sign Up</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {currentUser && step !== 'otp' && step !== 'success' ? (
            /* Logged In View */
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Signed In</h4>
                <p className="text-sm text-slate-600 mt-1 font-mono font-medium">
                  {currentUser.phoneNumber || userProfile?.phoneNumber || 'Customer Phone'}
                </p>
                {userProfile?.name && (
                  <p className="text-xs text-slate-500 mt-0.5">Name: {userProfile.name}</p>
                )}
              </div>
              <div className="pt-2 flex gap-2 justify-center">
                <button
                  onClick={() => {
                    if (onSuccess) onSuccess();
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Continue
                </button>
                <button
                  onClick={async () => {
                    await signOut();
                    setStep('phone');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : step === 'phone' ? (
            /* Step 1: Phone Input */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {subtitle}
              </p>

              {/* One-Tap Google Sign-In Button */}
              <div className="space-y-2 pb-1 border-b border-slate-200">
                <button
                  type="button"
                  onClick={async () => {
                    setIsSubmitting(true);
                    const success = await signInWithGoogle();
                    setIsSubmitting(false);
                    if (success) {
                      if (onSuccess) onSuccess();
                      onClose();
                    }
                  }}
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>One-Tap Sign in with Google</span>
                </button>
                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 border-t border-slate-200"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">or via Phone OTP</span>
                  <div className="flex-1 border-t border-slate-200"></div>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {authWarningNotice && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-2 text-amber-900 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{authWarningNotice}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (India)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-sm font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="98451 44210"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono tracking-wider"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  We'll send a 6-digit one-time password (OTP) via SMS.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting || phoneNumber.replace(/\D/g, '').length < 10}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                      Sending OTP...
                    </span>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleInstantDemo}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Instant Demo Mode (Code 123456)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowConsoleGuide(!showConsoleGuide)}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3 h-3 text-slate-400" />
                    <span>Firebase SMS Setup</span>
                  </button>
                </div>
              </div>

              {/* Collapsible Firebase Console Guide */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setShowConsoleGuide(!showConsoleGuide)}
                  className="w-full px-3 py-2 bg-slate-100 hover:bg-slate-200/80 flex items-center justify-between text-slate-700 font-semibold cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    Firebase SMS setup for quick-fix-pro-9ebd3
                  </span>
                  {showConsoleGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {showConsoleGuide && (
                  <div className="p-3 text-[11px] text-slate-600 space-y-2 border-t border-slate-200 bg-white">
                    <p>To enable real SMS delivery or add test numbers in Firebase for <strong className="text-slate-800">quick-fix-pro-9ebd3</strong>:</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700">
                      <li>
                        Open <a href="https://console.firebase.google.com/project/quick-fix-pro-9ebd3/authentication/providers" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold inline-flex items-center gap-0.5">Firebase Console &gt; Authentication <ExternalLink className="w-3 h-3 inline" /></a>.
                      </li>
                      <li>Under <strong>Sign-in method</strong>, enable <strong>Phone</strong>.</li>
                      <li>Add a <strong>Phone number for testing</strong> (e.g. <code className="bg-slate-100 px-1 rounded text-slate-800">+91 9999999999</code> with code <code className="bg-slate-100 px-1 rounded text-slate-800">123456</code>).</li>
                      <li>Under <strong>Settings &gt; SMS Regions policy</strong>, check <strong>India (+91)</strong>.</li>
                    </ol>
                  </div>
                )}
              </div>
            </form>
          ) : step === 'otp' ? (
            /* Step 2: OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Enter 6-Digit OTP</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Sent to <span className="font-mono font-bold text-slate-900">+91 {phoneNumber}</span>
                </p>
              </div>

              {isDemoMode && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-bold text-blue-950">Demo OTP Active: </span>
                      <span className="font-mono font-bold text-blue-900 bg-blue-200 px-1.5 py-0.5 rounded">123456</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOtp('123456')}
                    className="px-2.5 py-1 text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg cursor-pointer shrink-0"
                  >
                    Auto-fill
                  </button>
                </div>
              )}

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full py-3 text-center text-2xl font-mono tracking-widest bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.trim().length !== 6}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    Verifying...
                  </span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Continue</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    resetToPhoneInput();
                  }}
                  className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Change Number
                </button>
                <div className="flex items-center gap-3">
                  {!isDemoMode && (
                    <button
                      type="button"
                      onClick={handleInstantDemo}
                      className="text-blue-600 hover:underline font-medium cursor-pointer"
                    >
                      Use Demo OTP
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={timer > 0 || isSubmitting}
                    className="text-blue-600 hover:text-blue-800 disabled:text-slate-400 font-medium cursor-pointer disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Step 3: Success */
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Verified Successfully!</h4>
              <p className="text-xs text-slate-600">
                Welcome to Quick Fix Pro. Your account is active and saved in Firebase.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
