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
  category: 'costs' | 'expertise' | 'warranty';
  question: string;
  answer: string;
  highlight?: string;
}

export const FAQ_DATA: FaqItem[] = [
  // 1. Repair Costs & Pricing Transparency
  {
    id: 'faq-costs-1',
    category: 'costs',
    question: 'How much do repairs cost, and are there any hidden charges?',
    answer: 'Every repair begins with an upfront, flat-rate quotation from our standard Bangalore rate card before any work starts. Core service visits start from ₹249 (Microwave), ₹299 (Washing Machine), ₹399 (Refrigerator), and ₹499 (AC Service). Spare parts are billed strictly at genuine OEM MRP with zero hidden weekend, convenience, or doorstep surcharges.',
    highlight: 'Upfront written quote before repair starts • Zero hidden fees.'
  },
  {
    id: 'faq-costs-2',
    category: 'costs',
    question: 'How is the ₹199 diagnostic inspection fee waived?',
    answer: 'Our doorstep inspection fee is ₹199, which covers technician travel and a 32-point diagnostic check with calibrated tools. Whenever you approve the repair quote provided by our technician, this ₹199 inspection fee is 100% WAIVED OFF and deducted directly from your final invoice.',
    highlight: 'Inspection fee is ₹0 when you proceed with the repair.'
  },
  {
    id: 'faq-costs-3',
    category: 'costs',
    question: 'When do I pay, and what payment modes are accepted?',
    answer: 'We follow a strict Pay-After-Service policy — you never pay in advance. After the technician completes the repair and runs a live cooling, heating, or spin demonstration in front of you, you can pay via UPI (GPay, PhonePe, Paytm), Credit/Debit Card, Net Banking, or Cash and receive an instant digital GST/tax invoice on WhatsApp.',
    highlight: 'Zero advance payment • Pay via UPI, Card, or Cash after live demo.'
  },

  // 2. Technician Expertise & Safety
  {
    id: 'faq-expertise-1',
    category: 'expertise',
    question: 'What appliance brands and technologies are your technicians trained to fix?',
    answer: 'Our Bangalore specialists hold 5+ years of hands-on experience across all major brands including LG, Samsung, Bosch, IFB, Whirlpool, Siemens, Haier, Godrej, Daikin, Voltas, and O General. Each technician is trained on modern Inverter PCB boards, BLDC direct-drive motors, frost-free thermal sensors, and R32/R410A refrigerant systems.',
    highlight: 'Multi-brand Inverter PCB & Direct-Drive certified engineers.'
  },
  {
    id: 'faq-expertise-2',
    category: 'expertise',
    question: 'How are Quick Fix Pro technicians verified and vetted?',
    answer: 'Customer safety and technical quality come first. Every technician undergoes mandatory 3-Tier Verification: 1) Aadhar government ID & local Bangalore police background clearance. 2) Practical diagnostic skill assessment with 5+ years minimum field experience. 3) Doorstep hygiene training including shoe covers and post-repair workspace cleanup.',
    highlight: 'Aadhar & Police verified specialists with 5+ years experience.'
  },
  {
    id: 'faq-expertise-3',
    category: 'expertise',
    question: 'Do technicians carry genuine spare parts and official ID?',
    answer: 'Yes. Before arrival, you receive an SMS/WhatsApp alert with your technician’s name, photo, phone number (e.g., Senior Specialist Babu: 8095996638), and vehicle number. Technicians carry sealed, OEM-grade spare parts in their service vans so 92% of repairs are finished in a single doorstep visit.',
    highlight: '92% single-visit completion with sealed OEM spare parts.'
  },

  // 3. Warranty Terms & Claims
  {
    id: 'faq-warranty-1',
    category: 'warranty',
    question: 'What does your 6-Month Written Warranty cover?',
    answer: 'Every repair completed by Quick Fix Pro includes an official 6-Month (180-Day) Written Warranty certificate. It covers both the newly replaced OEM spare parts (against defects, failure, or burn-out) and all technician re-visit labor charges for the repaired fault.',
    highlight: '180-day written coverage on both replaced spare parts & labor.'
  },
  {
    id: 'faq-warranty-fail',
    category: 'warranty',
    question: 'What happens if the same issue recurs during the warranty period?',
    answer: 'If the same fault reoccurs within 180 days: 1) Your ticket is marked priority and a senior specialist is dispatched within 2 hours. 2) Re-inspection, labor, and replacement of any defective spare part are 100% FREE with zero visit fee. 3) If an issue cannot be permanently resolved, we refund 100% of our service labor charges.',
    highlight: 'Priority 2-hour free revisit + free part replacement or labor refund.'
  },
  {
    id: 'faq-warranty-lookup',
    category: 'warranty',
    question: 'How do I claim a warranty service without paper bills?',
    answer: 'Your warranty is stored digitally against your Booking ID (e.g., QFP-8492) and registered mobile number. You never need physical paper receipts—simply open "Track Service" on our website or call +91 80959 96638 to schedule an instant zero-cost warranty revisit.',
    highlight: 'Paperless digital warranty lookup via phone number or Booking ID.'
  }
];
