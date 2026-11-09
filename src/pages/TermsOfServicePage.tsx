import React from 'react';
import { FileText, ShieldCheck, CheckCircle2, AlertCircle, Phone, Scale } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Customer Terms & Warranty Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Last Updated: October 2026 • Quick Fix Pro Service Centre (Bengaluru)
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 leading-relaxed">
              <strong>Fair Service Policy:</strong> Quick Fix Pro operates with 100% upfront pricing. Before any repair work commences, our technician performs a comprehensive diagnostic test and provides an itemized quote. You are never obligated to proceed if you do not approve the quotation.
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              1. Doorstep Inspection & Diagnostic Fee Policy
            </h2>
            <p>
              Our standard home inspection charge is a flat <strong>₹199</strong> across all Bangalore pin codes. This covers technician travel, multi-point electrical and mechanical diagnostic testing, and provision of a written quote.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
              <strong>Fee Waiver Rule:</strong> If you approve the repair quotation and proceed with the service, the ₹199 diagnostic fee is <strong>100% WAIVED OFF</strong> and deducted from your final bill.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              2. Written 6-Month (180-Day) Warranty Terms
            </h2>
            <p>
              Every repair conducted by Quick Fix Pro includes a digital and written 180-Day Warranty Certificate. The warranty provisions are governed by the following terms:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Scope of Coverage:</strong> The warranty applies to the specific replaced OEM spare part and technician workmanship. If the identical fault recurs within 180 days, we dispatch a technician back with <strong>₹0 visit charges</strong> to repair or replace the part.</li>
              <li><strong>Zero Paperwork Claims:</strong> Customers do not need physical paper receipts. Providing your registered phone number or Booking Reference ID (e.g. QFP-8492) instantly validates warranty coverage in our database.</li>
              <li><strong>Warranty Exclusions:</strong> Warranty does not cover issues resulting from external voltage surges (lightning/MCB burnout without stabilizer), accidental physical dropping, foreign object obstruction (coins/pins in drain pumps), external flooding, or unauthorized tampering by non-Quick Fix Pro mechanics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              3. 100% Genuine OEM Spare Parts Guarantee
            </h2>
            <p>
              We source replacement components directly from brand-certified distributor networks for Whirlpool, Bosch, Godrej, Panasonic, Voltas, Beko, Samsung, LG, IFB, and Haier.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>All replacement components arrive in sealed factory packaging with manufacturer hologram seals, unboxed in front of you.</li>
              <li>The old defective part removed from your appliance is handed back to you at completion.</li>
              <li>Part serial numbers are entered into your digital invoice for warranty tracking.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              4. Payment & Completion Protocol
            </h2>
            <p>
              Payment is due only after the repair is completed, the appliance has undergone a successful operational test run (e.g. spin cycle, cooling chill, or heat cycle), and you are fully satisfied. We accept UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, Net Banking, and Cash.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              5. Rescheduling & Cancellation
            </h2>
            <p>
              You may cancel or reschedule your doorstep appointment at any time without penalty prior to the technician being dispatched from your neighbourhood hub. There are zero cancellation charges.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              6. Multi-Brand Trademark Disclaimer
            </h2>
            <p className="text-xs text-slate-500">
              Quick Fix Pro is an independent third-party doorstep service centre providing repair and maintenance services using OEM-certified components. All brand names, model trademarks, and logos (Whirlpool, Bosch, Godrej, Panasonic, Voltas, Beko, Samsung, LG, IFB, Haier, etc.) remain the exclusive property of their respective trademark holders.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              7. Jurisdiction & Service Support
            </h2>
            <p className="text-xs">
              These terms are governed by the laws of Karnataka, India. Any disputes shall be subject to the exclusive jurisdiction of the civil courts in Bengaluru. For any warranty assistance, contact our central helpline:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div><strong>Helpline:</strong> <a href="tel:+918095996638" className="text-blue-600 font-bold hover:underline">8095996638</a></div>
              <div><strong>Office HQ:</strong> #84, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034</div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
