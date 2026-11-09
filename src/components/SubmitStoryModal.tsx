import React, { useState } from 'react';
import { X, Star, ShieldCheck, CheckCircle2, Sparkles, User, MapPin, Wrench } from 'lucide-react';
import { SuccessStoryItem } from '../data/successStoriesData';

interface SubmitStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitStory: (newStory: SuccessStoryItem) => void;
}

export const SubmitStoryModal: React.FC<SubmitStoryModalProps> = ({
  isOpen,
  onClose,
  onSubmitStory
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [applianceType, setApplianceType] = useState<'washing-machine' | 'refrigerator' | 'ac' | 'microwave'>('washing-machine');
  const [customerName, setCustomerName] = useState('');
  const [locality, setLocality] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [comment, setComment] = useState('');
  const [technicianName, setTechnicianName] = useState('Senior Tech Babu');
  const [savingsAmount, setSavingsAmount] = useState('800');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const getApplianceLabel = (type: string) => {
    switch (type) {
      case 'washing-machine': return 'Washing Machine';
      case 'refrigerator': return 'Refrigerator';
      case 'ac': return 'Split AC';
      case 'microwave': return 'Microwave Oven';
      default: return 'Home Appliance';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !locality.trim() || !storyTitle.trim() || !comment.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Locality, Title, Review).');
      return;
    }

    const newStory: SuccessStoryItem = {
      id: `story-user-${Date.now()}`,
      customerName: customerName.trim(),
      locality: locality.trim().includes('Bangalore') ? locality.trim() : `${locality.trim()}, Bangalore`,
      applianceType,
      applianceLabel: getApplianceLabel(applianceType),
      rating,
      verified: true,
      date: 'Just now',
      storyTitle: storyTitle.trim(),
      comment: comment.trim(),
      technicianName: technicianName.trim() || 'Senior Tech Babu',
      repairHighlight: `Saved ₹${savingsAmount || 800} with 6-month written warranty`,
      savingsAmount: parseInt(savingsAmount, 10) || 800,
      helpfulCount: 1
    };

    onSubmitStory(newStory);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrorMsg('');
    setCustomerName('');
    setLocality('');
    setStoryTitle('');
    setComment('');
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-blue-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/80 flex items-center justify-center text-white font-bold border border-blue-400/40">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">
                Share Your Success Story
              </h3>
              <p className="text-xs text-blue-200">
                Help fellow Bangalore residents with verified doorstep service reviews
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Submission Success State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 border border-emerald-200 shadow-sm animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-black text-slate-900 font-heading">
              Success Story Published!
            </h4>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{customerName}</span>! Your review has been verified and added to our live Bangalore Appliance Success Stories feed.
            </p>

            {/* Verified Badge Preview */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold my-3">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Verified Doorstep Customer • 6-Month Warranty Card Issued</span>
            </div>

            <div>
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                View Your Published Story
              </button>
            </div>
          </div>
        ) : (
          /* Review Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Star Rating Picker */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <label className="block text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-2">
                Overall Service Rating
              </label>
              <div className="flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                          : 'fill-slate-200 text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700 mt-1 block">
                {rating === 5 ? '⭐⭐⭐⭐⭐ Exceptional (5/5)' : `${rating}/5 Stars`}
              </span>
            </div>

            {/* Appliance & Locality Row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Appliance Repaired <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Wrench className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={applianceType}
                    onChange={(e) => setApplianceType(e.target.value as any)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs font-medium outline-none bg-white"
                  >
                    <option value="washing-machine">Washing Machine</option>
                    <option value="refrigerator">Refrigerator</option>
                    <option value="ac">Split AC</option>
                    <option value="microwave">Microwave Oven</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bangalore Locality <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g. Koramangala 4th Block"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Customer Name & Technician */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assigned Technician Name
                </label>
                <input
                  type="text"
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  placeholder="e.g. Senior Tech Babu"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs outline-none"
                />
              </div>
            </div>

            {/* Story Title & Detailed Comment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Story Title / Kicker <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                placeholder="e.g. Restored ice-cold cooling in under 45 minutes!"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Doorstep Service Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe technician arrival, diagnostic clarity, part replacement, live demonstration, or written warranty card..."
                className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs outline-none leading-relaxed"
              ></textarea>
            </div>

            {/* Estimated Repair Savings */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estimated Money Saved (₹)
              </label>
              <input
                type="number"
                value={savingsAmount}
                onChange={(e) => setSavingsAmount(e.target.value)}
                placeholder="800"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs outline-none font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Compared to standard brand service center replacement quotes.
              </p>
            </div>

            {/* Verification Notice */}
            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center gap-2.5 text-xs text-blue-900">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Submitting auto-generates your official <strong>Verified Doorstep Customer</strong> badge.</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Publish Verified Success Story</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
