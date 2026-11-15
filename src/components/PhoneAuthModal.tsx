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
  Zap
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
    signOut, 
    authError, 
    authWarningNotice,
    isDemoMode,
    clearAuthError,
    resetToPhoneInput
  } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);

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
    const success = await sendOtp(phoneNumber);
    setIsSubmitting(false);

    if (success) {
      setStep('otp');
      setTimer(45);
      setOtp('123456');
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
    const success = await sendOtp(phoneNumber);
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
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">{title}</h3>
              <p className="text-[11px] text-amber-300">Quick Fix Pro • Mobile Sign In</p>
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
                  Verify your mobile number to view bookings and warranty history on this device.
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
                      Preparing Code...
                    </span>
                  ) : (
                    <>
                      <span>Continue with Mobile</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center pt-1">
                  <button
                    type="button"
                    onClick={handleInstantDemo}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Quick Guest Sign-In (Code 123456)</span>
                  </button>
                </div>
              </div>
            </form>
          ) : step === 'otp' ? (
            /* Step 2: OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Enter Verification Code</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Mobile: <span className="font-mono font-bold text-slate-900">+91 {phoneNumber}</span>
                </p>
              </div>

              {isDemoMode && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-bold text-blue-950">Verification Code: </span>
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
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0 || isSubmitting}
                  className="text-blue-600 hover:text-blue-800 disabled:text-slate-400 font-medium cursor-pointer disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}</span>
                </button>
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
                Welcome to Quick Fix Pro. Your customer profile is active and ready.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
