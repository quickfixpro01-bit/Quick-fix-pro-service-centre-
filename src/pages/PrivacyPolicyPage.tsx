import React from 'react';
import { ShieldCheck, Lock, FileText, Phone, Mail, Building2, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Trust & Confidentiality</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Effective Date: October 2026 • Quick Fix Pro Service Centre (Bengaluru, Karnataka)
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-950 leading-relaxed">
              <strong>Our Privacy Commitment:</strong> Quick Fix Pro respects your privacy. We strictly collect only the necessary information required to dispatch technicians to your doorstep, maintain your 6-month warranty pass, and process service invoices. We do not sell or rent customer data to third-party telemarketers.
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              1. Information We Collect
            </h2>
            <p>
              When you schedule a repair, request a callback, or purchase an annual maintenance plan through Quick Fix Pro, we collect the following information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Contact Information:</strong> Your full name, mobile phone number, and optional email address.</li>
              <li><strong>Service Location:</strong> Your complete doorstep address, apartment/building name, street, nearby landmark, and 6-digit Bangalore postal PIN code.</li>
              <li><strong>Appliance Details:</strong> Appliance category (Washing Machine, Refrigerator, AC, Microwave), brand name, approximate age, reported fault symptoms, and serial numbers of replaced OEM spare parts.</li>
              <li><strong>Transaction Records:</strong> Job card reference ID, service date, technician assigned, diagnostic notes, and invoice amount.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              2. How We Use Your Information
            </h2>
            <p>We use the collected information exclusively for the following legitimate business purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Dispatching certified technicians to your doorstep in Bangalore within our 60–90 minute SLA window.</li>
              <li>Sending appointment confirmations, technician ETA notifications, and service updates via SMS or WhatsApp.</li>
              <li>Issuing and validating your digital 180-Day (6-Month) Service & Spare Parts Warranty Pass.</li>
              <li>Facilitating priority warranty re-visits with zero customer friction or paper receipts required.</li>
              <li>Generating transparent tax invoices and payment receipts.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              3. Protection of Payment Data
            </h2>
            <p>
              Quick Fix Pro does not store your credit card, debit card, or net banking credentials. Doorstep payments are conducted using secure, PCI-DSS compliant channels such as official UPI QR codes (Google Pay, PhonePe, Paytm, BHIM) and authorized mobile POS terminals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              4. Non-Disclosure & Zero-Sale Guarantee
            </h2>
            <p>
              We enforce a strict zero-sale data policy. Your personal contact number and address are never traded, licensed, or sold to external marketing agencies, advertising networks, or data brokers. Information is only disclosed to our background-verified technical staff solely for completing your requested repair.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              5. Data Retention & Customer Rights
            </h2>
            <p>
              We maintain customer repair logs for a minimum duration of 180 days to fulfill warranty obligations. You have the right to inspect your service ledger records, correct outdated phone numbers, or request full deletion of your contact profile upon completion of active warranty periods.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              6. Privacy Grievances & Contact Information
            </h2>
            <p className="text-xs">
              For any privacy concerns, data removal requests, or clarifications regarding this policy, please reach out to our central customer desk:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
              <div><strong>Service Centre:</strong> Quick Fix Pro Service Centre Bangalore</div>
              <div><strong>Helpline:</strong> <a href="tel:+918095996638" className="text-blue-600 hover:underline">8095996638</a></div>
              <div><strong>Email:</strong> <a href="mailto:privacy@quickfixpro.in" className="text-blue-600 hover:underline">privacy@quickfixpro.in</a></div>
              <div><strong>Address:</strong> #84, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034</div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
