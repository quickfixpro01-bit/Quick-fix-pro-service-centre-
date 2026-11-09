import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  Search, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  BadgeCheck,
  AlertTriangle,
  Sparkles,
  Layers,
  UserCheck,
  CreditCard,
  Receipt,
  FileCheck
} from 'lucide-react';
import { FAQ_DATA, FaqItem } from '../data/packagesData';
import { FadeInUp, StaggerContainer, StaggerItem } from './ScrollAnimation';

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'warranty' | 'verification' | 'payment'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Multi-item accordion state: multiple questions can stay open concurrently
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-warranty-1': true,
    'faq-verify-1': true,
    'faq-payment-1': true
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.highlight && item.highlight.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Check if all filtered items are currently open
  const allOpen = useMemo(() => {
    if (filteredFaqs.length === 0) return false;
    return filteredFaqs.every(item => !!openItems[item.id]);
  }, [filteredFaqs, openItems]);

  const toggleAll = () => {
    if (allOpen) {
      setOpenItems({});
    } else {
      const newOpen: Record<string, boolean> = { ...openItems };
      filteredFaqs.forEach(item => {
        newOpen[item.id] = true;
      });
      setOpenItems(newOpen);
    }
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeInUp distance={30} duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200/80 dark:border-blue-800 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Service Warranties • Technician Safety • Payment Guarantees</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Everything you need to know about our 6-month written warranty, background-checked senior technicians, and pay-after-service policies in Bangalore.
            </p>

            {/* Search Bar */}
            <div className="mt-6 max-w-xl mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search warranty, technician ID, payment modes, inspection fee..."
                className="w-full pl-10 pr-16 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold px-2 py-1 rounded bg-slate-100 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </FadeInUp>

        {/* 3 Pillar Highlight Cards: Warranties, Verification, Payment */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: 6-Month Written Warranty Card */}
          <StaggerItem>
            <div className="rounded-2xl p-6 bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white border border-blue-200 shadow-xs relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow h-full">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-blue-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  6-Month Written Warranty Card
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Official 180-day written guarantee on parts and labor. If the issue recurs, technician Babu returns within 2 hours with zero visit fee.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-100 flex items-center gap-2 text-xs font-bold text-blue-700">
                <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Digital Warranty Pass on WhatsApp</span>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Background-Checked Specialist Verification */}
          <StaggerItem>
            <div className="rounded-2xl p-6 bg-gradient-to-b from-emerald-50/80 via-emerald-50/30 to-white border border-emerald-200 shadow-xs relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow h-full">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-emerald-500/30">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Verified Senior Specialists
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Aadhar & police background-checked technicians with 5+ years experience. Photo ID, vehicle number & pre-arrival phone call provided.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Uniformed & Photo ID Authenticated</span>
              </div>
            </div>
          </StaggerItem>

          {/* Card 3: Pay-After-Service Guarantee & Fee Waiver */}
          <StaggerItem>
            <div className="rounded-2xl p-6 bg-gradient-to-b from-amber-50/80 via-amber-50/30 to-white border border-amber-200 shadow-xs relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow h-full">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-amber-500/30">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Pay After Demonstration
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Zero advance payment. Pay via UPI, Card or Cash only after a live demonstration test-run. ₹199 inspection fee is 100% waived on repair.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center gap-2 text-xs font-bold text-amber-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Inspection Fee ₹0 on Repair Approval</span>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>

        {/* Category Filter Tabs & Expand All Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 max-w-4xl mx-auto">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Questions ({filteredFaqs.length})
            </button>
            <button
              onClick={() => setActiveCategory('warranty')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'warranty'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Service Warranties
            </button>
            <button
              onClick={() => setActiveCategory('verification')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'verification'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Technician Safety
            </button>
            <button
              onClick={() => setActiveCategory('payment')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'payment'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Payment Policies
            </button>
          </div>

          {/* Expand/Collapse All Button */}
          {filteredFaqs.length > 0 && (
            <button
              onClick={toggleAll}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
              title={allOpen ? 'Collapse all visible FAQs' : 'Expand all visible FAQs'}
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>{allOpen ? 'Collapse All' : 'Expand All'}</span>
            </button>
          )}
        </div>

        {/* Multi-Item FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm">No matching questions found for "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-3 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Reset Search & Show All Questions
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              const isFailureQuestion = faq.id === 'faq-warranty-fail';

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? isFailureQuestion
                        ? 'border-amber-300 bg-amber-50/20 shadow-sm'
                        : faq.category === 'verification'
                          ? 'border-emerald-300 bg-emerald-50/20 shadow-sm'
                          : faq.category === 'payment'
                            ? 'border-amber-300 bg-amber-50/20 shadow-sm'
                            : 'border-blue-300 bg-blue-50/20 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <div className="flex items-center gap-3">
                      {faq.category === 'warranty' && (
                        isFailureQuestion ? (
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-4 h-4 text-blue-600" />
                          </div>
                        )
                      )}

                      {faq.category === 'verification' && (
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <UserCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                      )}

                      {faq.category === 'payment' && (
                        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                          <CreditCard className="w-4 h-4 text-amber-600" />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                            {faq.question}
                          </span>
                          {isFailureQuestion && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                              Failure Policy
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                      <p>{faq.answer}</p>
                      
                      {faq.highlight && (
                        <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-900 shadow-2xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Guaranteed Policy: {faq.highlight}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box with Bangalore Direct Contact */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bangalore Customer Support Desk</span>
            </div>
            <h4 className="font-heading text-lg sm:text-2xl font-bold">
              Still have questions about your service or technician?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              Speak directly with our senior Bangalore repair supervisor or WhatsApp our dispatch team for an instant quote.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+918095996638"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-md"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Call 80959 96638</span>
            </a>

            <a
              href="https://wa.me/918095996638?text=Hi%20Quick%20Fix%20Pro,%20I%20have%20a%20question%20about%20my%20appliance%20repair%20and%20warranty%20in%20Bangalore."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
