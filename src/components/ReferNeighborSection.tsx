import React, { useState } from 'react';
import { 
  Gift, 
  Share2, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  Users, 
  ShieldCheck, 
  Tag, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { 
  REFERRAL_DISCOUNT_AMOUNT, 
  DEFAULT_REFERRAL_CODE, 
  REFERRAL_STEPS, 
  cleanReferralCode, 
  generateReferralLink, 
  generateWhatsAppShareUrl,
  POPULAR_SOCIETIES
} from '../data/referralData';

interface ReferNeighborSectionProps {
  onOpenBookingWithReferral?: (referralCode: string) => void;
}

export const ReferNeighborSection: React.FC<ReferNeighborSectionProps> = ({
  onOpenBookingWithReferral
}) => {
  const [userName, setUserName] = useState<string>('');
  const [selectedSociety, setSelectedSociety] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Compute clean personalized referral code
  const referralCode = React.useMemo(() => {
    if (userName.trim()) {
      const cleanName = cleanReferralCode(userName).slice(0, 8);
      return `${cleanName}150`;
    }
    return DEFAULT_REFERRAL_CODE;
  }, [userName]);

  const referralLink = generateReferralLink(referralCode);
  const whatsappUrl = generateWhatsAppShareUrl(referralCode, userName.trim() || undefined, selectedSociety || undefined);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleApplyDiscountNow = () => {
    if (onOpenBookingWithReferral) {
      onOpenBookingWithReferral(referralCode);
    }
  };

  return (
    <section 
      id="refer-neighbor" 
      className="py-20 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200 relative overflow-hidden"
      aria-label="Refer a Neighbor for Service Discount"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/80 shadow-xs">
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>Bengaluru Neighbor Program • Give ₹{REFERRAL_DISCOUNT_AMOUNT}, Get ₹{REFERRAL_DISCOUNT_AMOUNT}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
            Refer an Apartment Neighbor & Both Save ₹{REFERRAL_DISCOUNT_AMOUNT}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Help your flatmates, apartment society members, and Bangalore friends get reliable doorstep appliance repair. They save flat <strong>₹{REFERRAL_DISCOUNT_AMOUNT}</strong> on their first booking, and you receive <strong>₹{REFERRAL_DISCOUNT_AMOUNT}</strong> credit on your next service!
          </p>
        </div>

        {/* Main Interactive Referral Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold text-emerald-300 mb-2">
                  Instant Referral Link Generator
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                  Share via WhatsApp with 1 Tap
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm mt-1">
                  Works across WhatsApp society groups, apartment Telegram channels, and chats.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 shrink-0">
                <Tag className="w-5 h-5 text-amber-300" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-blue-200">Your Referral Code</div>
                  <div className="text-lg font-black tracking-wider text-amber-300 font-mono">
                    {referralCode}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Optional Personalization inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Name (Optional - personalizes message)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh or Ananya"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Apartment / Locality (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prestige Shantiniketan or Koramangala"
                  value={selectedSociety}
                  onChange={(e) => setSelectedSociety(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Link & Action Strip */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
              {/* Readonly Link Box */}
              <div className="flex-1 flex items-center bg-slate-100 rounded-xl border border-slate-300 px-3.5 py-2.5 overflow-hidden">
                <span className="text-xs text-slate-500 font-mono truncate select-all">
                  {referralLink}
                </span>
              </div>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm shrink-0 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              {/* WhatsApp Share Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-emerald-600/30 shrink-0"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Share via WhatsApp</span>
              </a>
            </div>

            {/* Instant Test / Book Now Trigger */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Auto-applies ₹{REFERRAL_DISCOUNT_AMOUNT} OFF to washing machines, fridges, ACs, and microwaves.</span>
              </div>

              {onOpenBookingWithReferral && (
                <button
                  onClick={handleApplyDiscountNow}
                  className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  <span>Book with ₹{REFERRAL_DISCOUNT_AMOUNT} Discount Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* 3 Step Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REFERRAL_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-extrabold text-sm flex items-center justify-center mb-4 border border-blue-100">
                {item.step}
              </div>

              <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Popular Societies Tag Strip */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Popular with residents in:</span>
            {POPULAR_SOCIETIES.map((soc, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600"
              >
                {soc}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
