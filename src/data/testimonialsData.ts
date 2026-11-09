export interface CustomerTestimonial {
  id: string;
  name: string;
  locality: string;
  society?: string;
  appliance: string;
  serviceType: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
  avatarColor: string;
}

export const BANGALORE_TESTIMONIALS: CustomerTestimonial[] = [
  {
    id: 'rev-blr-01',
    name: 'Priya Narayanan',
    locality: 'Koramangala 4th Block',
    society: 'Raheja Residency',
    appliance: 'IFB Senator 8kg Front Load',
    serviceType: 'Drum Bearing & Deep Cleaning',
    rating: 5,
    review: 'Our front-load machine had a loud grinding noise during high-speed spin. The technician arrived within 90 mins, replaced the bearing with genuine IFB spare parts, and gave a 6-month written warranty card right on WhatsApp. Transparent ₹1,499 rate for deep clean too!',
    date: '2 days ago',
    verified: true,
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'rev-blr-02',
    name: 'Ananth Kulkarni',
    locality: 'Indiranagar 100ft Road',
    society: 'Defence Colony',
    appliance: 'Samsung 345L Frost-Free Refrigerator',
    serviceType: 'Inverter Compressor Relay',
    rating: 5,
    review: 'The fridge stopped cooling right on Sunday morning before a family lunch. Called QuickFixPro; technician Ramesh arrived by 11:30 AM with original Samsung multimeter & sensor parts. Fixed in 40 minutes and tested cooling thoroughly.',
    date: '3 days ago',
    verified: true,
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'rev-blr-03',
    name: 'Deepa & Rohit Sen',
    locality: 'HSR Layout Sector 2',
    society: 'Sobha Cinnamon',
    appliance: 'LG 1.5 Ton Dual Inverter Split AC',
    serviceType: 'Jet-Pump Deep Servicing & Gas Top-up',
    rating: 5,
    review: 'Our living room AC started blowing warm air and smelling musty. Their jet cleaning kit cleaned all deep coils without spilling a drop on the wooden flooring. Cooling is icy cold again. Best appliance service in HSR Layout!',
    date: '5 days ago',
    verified: true,
    avatarColor: 'bg-purple-600'
  },
  {
    id: 'rev-blr-04',
    name: 'Venkatesh Murthy',
    locality: 'Jayanagar 4th Block',
    society: 'Ashoka Pillar Area',
    appliance: 'Bosch Serie 6 Front Load Washer',
    serviceType: 'Drain Pump & Scale Removal',
    rating: 5,
    review: 'Cauvery hard water had clogged the drain pump with limescale error code E18. Other local mechanics asked for ₹3,500. QuickFixPro charged standard ₹199 inspection (adjusted in final bill) and replaced only the pump filter. Honest and prompt service.',
    date: '1 week ago',
    verified: true,
    avatarColor: 'bg-amber-600'
  },
  {
    id: 'rev-blr-05',
    name: 'Sneha Chawla',
    locality: 'Whitefield',
    society: 'Prestige Shantiniketan',
    appliance: 'Whirlpool 7.5kg Top Load',
    serviceType: 'Pulsator & Agitator Service',
    rating: 5,
    review: 'Live in Whitefield and usually technicians refuse or delay coming here. QuickFixPro sent a technician with all parts in his kit within 2 hours. He did the ₹1,299 top load deep clean as well. Clothes smell fresh and zero vibration now.',
    date: '1 week ago',
    verified: true,
    avatarColor: 'bg-rose-600'
  },
  {
    id: 'rev-blr-06',
    name: 'Karthik Subbaraman',
    locality: 'Electronic City Phase 1',
    society: 'Ajmera Infinity',
    appliance: 'Panasonic 27L Convection Microwave',
    serviceType: 'Magnetron & Diode Replacement',
    rating: 5,
    review: 'The microwave was humming loudly without heating food. Tech Suresh diagnosed the magnetron failure in 10 mins. Proper rate charged as per their upfront rate card and verified with billing. Super reliable tech team!',
    date: '2 weeks ago',
    verified: true,
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 'rev-blr-07',
    name: 'Meenakshi Sundaram',
    locality: 'Malleshwaram 15th Cross',
    society: 'Margosa Avenue',
    appliance: 'Godrej Eon Double Door Fridge',
    serviceType: 'Defrost Timer & Thermostat Fix',
    rating: 5,
    review: 'Ice was building up heavily in the freezer but lower cabinet was completely warm. Repaired quickly without asking to take the fridge to a workshop. Completed doorstep within an hour and warranty letter provided.',
    date: '2 weeks ago',
    verified: true,
    avatarColor: 'bg-teal-600'
  },
  {
    id: 'rev-blr-08',
    name: 'Arjun Banerji',
    locality: 'Bellandur / Outer Ring Road',
    society: 'Adarsh Palm Retreat',
    appliance: 'LG 8kg Fully Automatic Washing Machine',
    serviceType: 'PCB Motherboard Repair',
    rating: 5,
    review: 'Power fluctuation damaged the main control board. LG service center quoted 10-day wait for replacement. QuickFixPro senior engineer diagnosed the chip resistor issue and fixed it on-site for half the brand cost. Working flawlessly!',
    date: '3 weeks ago',
    verified: true,
    avatarColor: 'bg-cyan-600'
  },
  {
    id: 'rev-blr-09',
    name: 'Suma & Harish Gowda',
    locality: 'Banashankari 3rd Stage',
    society: 'BSK Ring Road',
    appliance: 'Voltas 1.5 Ton Split AC',
    serviceType: 'Capillary Tube & Filter Flushing',
    rating: 5,
    review: 'AC kept tripping the MCB switch. Technician checked copper piping, electrical grounding, and condenser coils. Very polite, clean workmanship, wore shoe covers inside home. Highly recommended for Bangalore homeowners.',
    date: '3 weeks ago',
    verified: true,
    avatarColor: 'bg-sky-600'
  },
  {
    id: 'rev-blr-10',
    name: 'Pradeep Mathew',
    locality: 'Sarjapur Road',
    society: 'SJR Parkway Homes',
    appliance: 'IFB Elena Semi-Automatic Washer',
    serviceType: 'Semi-Automatic Deep Clean (₹699)',
    rating: 5,
    review: 'Opted for their ₹699 semi-automatic deep sanitization package. The technician dismantled the tub, power jet sprayed 3 years of black sludge, and sanitized with chemical treatment. Looks and runs like brand new.',
    date: '1 month ago',
    verified: true,
    avatarColor: 'bg-emerald-700'
  }
];

export const GOOGLE_REVIEWS_SUMMARY = {
  averageRating: 4.9,
  totalReviews: '1,280+',
  fiveStarPercentage: 96,
  recommendationRate: '98.4%',
  areasCovered: '40+ Bengaluru Localities'
};
