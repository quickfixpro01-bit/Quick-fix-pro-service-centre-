import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  ShieldCheck, 
  Wrench, 
  PhoneCall, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { BANGALORE_TESTIMONIALS, GOOGLE_REVIEWS_SUMMARY, CustomerTestimonial } from '../data/testimonialsData';

interface TestimonialCarouselProps {
  onOpenBooking?: (serviceId?: string) => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ onOpenBooking }) => {
  const [filter, setFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  // Filter reviews
  const filteredReviews = BANGALORE_TESTIMONIALS.filter((rev) => {
    if (filter === 'all') return true;
    if (filter === 'washing') return rev.appliance.toLowerCase().includes('load') || rev.appliance.toLowerCase().includes('wash');
    if (filter === 'fridge') return rev.appliance.toLowerCase().includes('refrigerator') || rev.appliance.toLowerCase().includes('fridge');
    if (filter === 'ac') return rev.appliance.toLowerCase().includes('ac') || rev.appliance.toLowerCase().includes('split');
    if (filter === 'microwave') return rev.appliance.toLowerCase().includes('microwave');
    return true;
  });

  // Calculate items per view based on typical viewport
  // We will handle responsive sliding cleanly:
  // Desktop shows 3 cards, Tablet 2 cards, Mobile 1 card
  const [cardsPerPage, setCardsPerPage] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, filteredReviews.length - cardsPerPage);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  // Auto-slide interval
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Helper to extract initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <section 
      id="reviews" 
      className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 overflow-hidden relative"
      aria-label="Customer Reviews from Bangalore Residents"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/80 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Bangalore's #1 Rated Doorstep Appliance Specialists</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
            Trusted by Bangalore Residents in Every Neighborhood
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Real feedback from homeowners across Koramangala, Indiranagar, Whitefield, HSR Layout, and beyond who rely on our transparent rates and 6-month written warranty.
          </p>

          {/* 4.9★ Google Review Summary Banner */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-md max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 transition-all hover:shadow-lg">
            
            {/* Left: Overall Rating Score */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-sm">
                {GOOGLE_REVIEWS_SUMMARY.averageRating}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                  <span>{GOOGLE_REVIEWS_SUMMARY.totalReviews} Verified Customer Reviews</span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Google & In-App Verified Bengaluru Feedback
                </div>
              </div>
            </div>

            {/* Right: Key Trust Highlights */}
            <div className="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-5 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>6 Months</strong> Written Warranty Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>₹199 Inspection</strong> Credited to Repair Bill</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>90 Min</strong> Rapid Doorstep Arrival</span>
              </div>
            </div>

          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              All Bangalore Reviews ({BANGALORE_TESTIMONIALS.length})
            </button>
            <button
              onClick={() => setFilter('washing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === 'washing'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Washing Machines
            </button>
            <button
              onClick={() => setFilter('fridge')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === 'fridge'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Refrigerators
            </button>
            <button
              onClick={() => setFilter('ac')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === 'ac'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Air Conditioners
            </button>
            <button
              onClick={() => setFilter('microwave')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === 'microwave'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Microwave Ovens
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative px-2 sm:px-8 mt-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous customer review"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm border border-slate-300 shadow-md text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:shadow-lg transition-all flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next customer review"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm border border-slate-300 shadow-md text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:shadow-lg transition-all flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Track Wrapper */}
          <div className="overflow-hidden py-4 -mx-2 sm:-mx-3">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`
              }}
            >
              {filteredReviews.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / cardsPerPage}%` }}
                >
                  <div className="h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 p-6 flex flex-col justify-between relative group">
                    
                    {/* Quotation Watermark Accent */}
                    <Quote className="absolute top-5 right-5 w-10 h-10 text-slate-100 group-hover:text-blue-50 transition-colors pointer-events-none -z-0" />

                    <div className="relative z-10">
                      {/* Top Bar: Stars & Verified Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center text-amber-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified Resident</span>
                        </span>
                      </div>

                      {/* Appliance & Service Badges */}
                      <div className="space-y-1.5 mb-4">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100/90 px-2.5 py-1 rounded-lg">
                          <Wrench className="w-3.5 h-3.5 text-blue-600" />
                          <span className="truncate max-w-[220px]">{testimonial.appliance}</span>
                        </div>
                        <div className="text-[11px] font-medium text-blue-700 block">
                          Service: {testimonial.serviceType}
                        </div>
                      </div>

                      {/* Review Quote */}
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                        "{testimonial.review}"
                      </p>
                    </div>

                    {/* Author & Bangalore Locality Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs relative z-10">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${testimonial.avatarColor} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          {getInitials(testimonial.name)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 leading-tight">
                            {testimonial.name}
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-0.5">
                            <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                            <span className="font-medium text-slate-700">{testimonial.locality}</span>
                          </div>
                          {testimonial.society && (
                            <div className="text-[10px] text-slate-400">
                              {testimonial.society}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-[10px] text-slate-400 font-medium">
                          {testimonial.date}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {maxIndex > 0 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {[...Array(maxIndex + 1)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-blue-600'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Trust Action Box */}
        <div className="mt-14 max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bangalore Instant Doorstep Service</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading">
              Need Reliable Appliance Repair at Your Residence?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Same-day technician at your door in 90 minutes. ₹199 inspection fee 100% credited to your final bill.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
            {onOpenBooking && (
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Doorstep Visit</span>
              </button>
            )}

            <a
              href="tel:+918095996638"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:border-slate-600"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call +91 80959 96638</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
