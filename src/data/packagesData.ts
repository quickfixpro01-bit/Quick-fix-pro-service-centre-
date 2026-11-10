export interface AppliancePricingTier {
  type: string;
  price: number;
  originalPrice?: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  badgeColor?: string;
  price: number;
  originalPrice: number;
  savings: string;
  period: string;
  popular?: boolean;
  coveredAppliances: string[];
  appliancePricing?: AppliancePricingTier[];
  benefits: string[];
  features: { title: string; desc: string }[];
  idealFor: string;
}

export const TIERED_PACKAGES: ServicePackage[] = [
  {
    id: 'deep-clean-special',
    name: 'Washing Machine Deep Cleaning Special',
    tagline: 'Complete tub descaling, fungus elimination & vibration tune-up',
    badge: 'Most Popular for Homes',
    badgeColor: 'bg-emerald-600 text-white',
    price: 699,
    originalPrice: 999,
    savings: 'Front Load ₹1499 • Top Load ₹1299 • Semi ₹699',
    period: 'One-time Doorstep Service',
    popular: true,
    coveredAppliances: ['Front Load (₹1,499)', 'Top Load (₹1,299)', 'Semi-Automatic (₹699)'],
    appliancePricing: [
      { type: 'Front Load', price: 1499, originalPrice: 1999 },
      { type: 'Top Load', price: 1299, originalPrice: 1699 },
      { type: 'Semi-Automatic', price: 699, originalPrice: 999 }
    ],
    benefits: [
      'Drum split disassembly / high-pressure rotor wash',
      'High-grade medical descaling chemical treatment (removes 99.9% limescale)',
      'Drain pump, lint filter & water inlet valve purge',
      'Silicone door gasket anti-mildew sterilization',
      'Suspension damper & shock-absorber stability balance check',
      '3-Month Service & Odor-Free Warranty'
    ],
    features: [
      { title: 'Zero Limescale Sludge', desc: 'Eliminates grey sludge and detergent build-up causing foul laundry odor.' },
      { title: 'Spin Vibration Reduction', desc: 'Calibrates drum leveling to reduce noisy thumping at high RPM.' },
      { title: 'Extended Drum Life', desc: 'Protects costly spider arm & bearings from hard Bangalore borewell water.' }
    ],
    idealFor: 'Bangalore households using borewell/hard water or machines with bad odor/lint.'
  },
  {
    id: 'health-checkup-bundle',
    name: 'Home Appliance Health Check-up Bundle',
    tagline: 'Multi-appliance diagnostic & safety inspection for your whole home',
    badge: 'Best Family Value',
    badgeColor: 'bg-blue-600 text-white',
    price: 799,
    originalPrice: 1499,
    savings: 'Save ₹700 (47% OFF)',
    period: 'Covers up to 3 Household Appliances',
    popular: false,
    coveredAppliances: ['Washing Machine', 'Refrigerator', 'Air Conditioner', 'Microwave Oven'],
    benefits: [
      '32-point comprehensive electrical, thermal & safety diagnostic',
      'Earthing & current leakage safety test (prevents shock hazards)',
      'Refrigerator coil dust-clearing & gas pressure check',
      'AC blower airflow, filter wash & refrigerant level inspection',
      'Washing machine motor amp draw & belt tension calibration',
      'Microwave radiation leakage test using RF detector probe',
      'Detailed Digital Appliance Health Report with lifespan forecast'
    ],
    features: [
      { title: '3 Appliances in 1 Visit', desc: 'Choose any 3 appliances (e.g. AC + Fridge + Washing Machine) in single visit.' },
      { title: 'Early Fault Prevention', desc: 'Identifies gas micro-leaks and failing capacitors before catastrophic burnout.' },
      { title: 'Waived Repair Labor', desc: 'If any repair is required during inspection, inspection fee is 100% credited.' }
    ],
    idealFor: 'Apartments, families moving into rented homes, or pre-summer checkups.'
  },
  {
    id: 'cooling-master-combo',
    name: 'Summer Cooling Master Combo',
    tagline: 'Dual Split AC Jet Wash + Refrigerator Condenser De-choke',
    badge: 'Seasonal Bestseller',
    badgeColor: 'bg-cyan-700 text-white',
    price: 999,
    originalPrice: 1699,
    savings: 'Save ₹700 (41% OFF)',
    period: 'Single Comprehensive Service Visit',
    popular: false,
    coveredAppliances: ['1 Split AC', '1 Refrigerator'],
    benefits: [
      '1x AC Indoor & Outdoor High-Pressure Jet Pump Foam Wash',
      'Anti-bacterial coil sanitization spray (destroys allergens & pollen)',
      'AC Gas Operating Pressure PSI check & drain line de-clogging',
      'Refrigerator rear condenser coil brushing & fan motor lubrication',
      'Fridge door magnetic gasket airtightness inspection',
      '60-Day Cooling Performance Warranty'
    ],
    features: [
      { title: 'Ice-Cold Air Delivery', desc: 'Restores room AC cooling drop to 16°C in under 8 minutes.' },
      { title: 'Water Leak Protection', desc: 'Clears slime from condensate tray to prevent indoor ceiling dripping.' }
    ],
    idealFor: 'Bangalore homes preparing for summer months or high humidity seasons.'
  }
];

export interface FaqItem {
  id: string;
  category: 'warranty' | 'verification' | 'payment' | 'scheduling' | 'parts' | 'pricing' | 'general';
  question: string;
  answer: string;
  highlight?: string;
}

export const FAQ_DATA: FaqItem[] = [
  // 1. Service Warranties
  {
    id: 'faq-warranty-1',
    category: 'warranty',
    question: 'How does your 6-Month Written Service & Parts Warranty work?',
    answer: 'Every repair conducted by QuickFixPro comes with an official 6-Month (180-Day) written warranty certificate. The warranty covers both the replaced spare part (against manufacturing defects, failure, or burn-out) and technician re-visit labor. If the exact same issue recurs within 180 days, our technician will visit your Bangalore address within 2 hours and fix or replace the component with zero extra charges.',
    highlight: '180-day digital warranty certificate with instant WhatsApp verification.'
  },
  {
    id: 'faq-warranty-fail',
    category: 'warranty',
    question: 'What happens if the repair fails or the same issue recurs?',
    answer: 'If a repair fails or the exact same problem reoccurs within your 6-month warranty period, you are fully protected: 1) We prioritize your service ticket and dispatch a senior specialist to your doorstep within 2 hours. 2) Re-inspection, technician labor, and replacement of the defective spare part are 100% FREE with zero visitation fee. 3) In the rare circumstance that the appliance fault cannot be permanently corrected, we issue a 100% full refund on our service labor charges.',
    highlight: 'Zero-cost 2-hour warranty revisit + free part replacement or 100% money-back refund.'
  },
  {
    id: 'faq-warranty-lookup',
    category: 'warranty',
    question: 'How do I claim a warranty revisit without physical paper receipts?',
    answer: 'You do not need paper receipts! Your booking reference number (e.g. QFP-8492) and registered mobile number are permanently logged in our Bangalore service ledger. Simply tap "Track Service" on our website or call our helpline (+91 80959 96638), and an express warranty revisit is auto-scheduled.',
    highlight: 'No paper bills required. Instant phone number ledger lookup.'
  },

  // 2. Technician Verification & Safety
  {
    id: 'faq-verify-1',
    category: 'verification',
    question: 'How are QuickFixPro technicians verified and background-checked?',
    answer: 'Customer safety and peace of mind are paramount. Every technician on our Bangalore roster undergoes mandatory 3-Tier Verification: 1) Aadhar government ID and local Bangalore police background verification. 2) Prior 5+ years hands-on experience credential verification. 3) Mandatory protocol training on wearing shoe covers, sanitization, and polite doorstep behavior.',
    highlight: 'Police background verified + Aadhar authenticated 5+ year specialists.'
  },
  {
    id: 'faq-verify-2',
    category: 'verification',
    question: 'Will the technician arrive with official ID and vehicle tracking?',
    answer: 'Yes. Upon booking confirmation, you receive a SMS/WhatsApp alert containing your assigned technician’s full name, live photo, verified phone number (e.g., Senior Tech Babu: 8095996638), and registered vehicle number (e.g. KA 01 EK 4920). The technician arrives in official QuickFixPro uniform with a digital photo ID badge.',
    highlight: 'Photo ID, vehicle number & direct technician contact provided before arrival.'
  },

  // 3. Payment & Pricing Policies
  {
    id: 'faq-payment-1',
    category: 'payment',
    question: 'How does your "Pay After Service" policy work?',
    answer: 'You never pay in advance! The technician completes the repair, performs a live demonstration test run in front of you (checking spin speed, cooling, or heating), and ensures you are 100% satisfied. Only after your approval do you pay using your preferred payment mode.',
    highlight: 'Zero advance payment required. Test-and-approve before paying.'
  },
  {
    id: 'faq-payment-2',
    category: 'payment',
    question: 'How is the ₹199 diagnostic inspection fee waived?',
    answer: 'Our doorstep inspection fee is ₹199, which covers technician travel and multi-point diagnostic testing with specialized tools. If you choose to proceed with the repair quotation provided by the technician, this ₹199 inspection fee is 100% WAIVED OFF and deducted directly from your final repair invoice!',
    highlight: 'Inspection fee is ₹0 when you proceed with the repair.'
  },
  {
    id: 'faq-payment-3',
    category: 'payment',
    question: 'What payment modes are accepted upon service completion?',
    answer: 'We accept all digital and cash payment options: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit & Debit Cards via mobile POS, Net Banking, and Cash. An instant itemized tax invoice is sent directly to your WhatsApp.',
    highlight: 'UPI, Credit/Debit Cards, Net Banking & Cash accepted with instant WhatsApp invoice.'
  }
];
