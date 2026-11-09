export interface ApplianceService {
  id: string;
  name: string;
  tagline: string;
  startingPrice: number;
  popularIssues: string[];
  description: string;
  features: string[];
  types: string[];
  diagnosticFee: number;
  avgRepairTime: string;
  image: string;
  iconName: string;
}

export const APPLIANCE_SERVICES: ApplianceService[] = [
  {
    id: 'washing-machine',
    name: 'Washing Machine Repair',
    tagline: 'Front Load, Top Load & Semi-Automatic Specialists',
    startingPrice: 299,
    diagnosticFee: 199,
    avgRepairTime: '45 - 90 mins',
    description: 'Deep cleaning, drum repair, motor replacement, PCB repairs, drain pump issues, and all types of washing machine servicing.',
    popularIssues: [
      'Front Load Deep Cleaning (₹1,499)',
      'Top Load Deep Cleaning (₹1,299)',
      'Semi-Automatic Deep Cleaning (₹699)',
      'Drum not spinning / rattling noise',
      'Water not draining / E2 error',
      'Continuous water filling / overflow',
      'Heavy vibration & machine shaking',
      'Door lock jammed / latch broken',
      'Dead machine / PCB circuit fault'
    ],
    features: [
      'OEM shock absorbers & motor carbon brushes',
      'Digital PCB microcontroller level rework',
      'High-pressure steam tub descaling',
      'Original drain motor & inlet valves'
    ],
    types: ['Front Load (Inverter)', 'Top Load (Fully Automatic)', 'Semi-Automatic Twin Tub'],
    image: '/assets/services/washing_machine.jpg',
    iconName: 'WashingMachine'
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator Repair',
    tagline: 'Single, Double Door, Side-by-Side & Inverter Fridges',
    startingPrice: 399,
    diagnosticFee: 199,
    avgRepairTime: '60 - 120 mins',
    description: 'Gas charging, compressor repair, thermostat replacement, cooling issues, ice build-up, and full fridge servicing.',
    popularIssues: [
      'Fridge not cooling / freezer only cold',
      'Excessive ice buildup / defrost timer failure',
      'Refrigerant gas leak / hiss noise',
      'Compressor clicking & shutting off',
      'Water leakage inside vegetable crisper',
      'Torn or loose rubber door gasket',
      'Inverter board light blinking error'
    ],
    features: [
      'Pure R600a / R134a eco-friendly gas charging',
      'Brand-authorized hermetic compressor fitting',
      'Digital thermostat & defrost bimetal sensor replacement',
      'Copper capillary tube nitrogen flushing'
    ],
    types: ['Single Door Direct Cool', 'Double Door Frost Free', 'Side-by-Side Smart Fridge', 'Triple Door Inverter'],
    image: '/assets/services/refrigerator.jpg',
    iconName: 'Refrigerator'
  },
  {
    id: 'air-conditioner',
    name: 'Air Conditioner (AC) Repair',
    tagline: 'Split, Window & Inverter AC Deep Cleaning & Servicing',
    startingPrice: 499,
    diagnosticFee: 199,
    avgRepairTime: '45 - 75 mins',
    description: 'AC servicing, gas refilling, filter cleaning, PCB repair, water dropping, and complete AC maintenance.',
    popularIssues: [
      'AC blowing room-temperature air (no cooling)',
      'Water dripping from indoor unit',
      'Musty unpleasant smell from blower',
      'R32 / R410A gas refilling with leak fix',
      'Outdoor compressor unit tripping MCB',
      'Loud vibration or humming from fan',
      'Remote control not responding / sensor dead'
    ],
    features: [
      'High-pressure Jet Pump deep cleaning jacket',
      'Electronic nitrogen pressure leak testing',
      'Anti-bacterial coil sanitization foam',
      'Dual-run capacitor & fan motor replacement'
    ],
    types: ['Inverter Split AC (1.0 - 2.0 Ton)', 'Window AC', 'Cassette / Commercial AC'],
    image: '/assets/services/air_conditioner.jpg',
    iconName: 'AirVent'
  },
  {
    id: 'microwave-oven',
    name: 'Microwave Oven Repair',
    tagline: 'Solo, Grill & Convection Microwave Experts',
    startingPrice: 249,
    diagnosticFee: 199,
    avgRepairTime: '30 - 60 mins',
    description: 'Magnetron replacement, door repair, turntable motor, control panel touch issues, and all microwave repairs.',
    popularIssues: [
      'Not heating food / runs normally but cold',
      'Sparks and crackling noise inside chamber',
      'Turntable glass plate not rotating',
      'Touch keypad buttons not working',
      'Burning smell or smoke coming out',
      'Door switch stuck / does not start',
      'Fuses blowing immediately on start'
    ],
    features: [
      'Genuine high-power Magnetron tube replacements',
      'High-voltage capacitor & diode testing',
      'High-grade Mica sheet wave-guide replacement',
      'Synchronous heavy-load turntable motor'
    ],
    types: ['Convection Microwave', 'Grill Microwave', 'Solo Microwave', 'Built-in Microwave'],
    image: '/assets/services/microwave_oven.jpg',
    iconName: 'Flame'
  }
];

export interface BrandItem {
  name: string;
}

export const BRANDS: BrandItem[] = [
  { name: 'Samsung' },
  { name: 'LG' },
  { name: 'Whirlpool' },
  { name: 'Bosch' },
  { name: 'IFB' },
  { name: 'Godrej' },
  { name: 'Voltas' },
  { name: 'Haier' },
  { name: 'Panasonic' },
  { name: 'Daikin' },
  { name: 'Hitachi' },
  { name: 'Blue Star' },
  { name: 'Carrier' },
  { name: 'Lloyd' },
  { name: 'Siemens' },
  { name: 'Beko' },
  { name: 'Electrolux' },
  { name: 'Toshiba' },
  { name: 'Faber' },
  { name: 'Glen' },
  { name: 'Morphy Richards' },
  { name: 'Bajaj' },
  { name: 'Onida' },
  { name: 'Kelvinator' },
  { name: 'Videocon' },
  { name: 'Kaff' },
  { name: 'Hindware' },
  { name: 'Other Brand' }
];


export interface BangaloreHub {
  name: string;
  pincode: string;
  zone: 'South' | 'North' | 'East' | 'West' | 'Central';
  techniciansAvailable: number;
  estArrivalMins: number;
  landmark: string;
}

export const BANGALORE_AREAS: BangaloreHub[] = [
  { name: 'Koramangala', pincode: '560034', zone: 'South', techniciansAvailable: 6, estArrivalMins: 35, landmark: 'Near Sony World Signal' },
  { name: 'Indiranagar', pincode: '560038', zone: 'East', techniciansAvailable: 5, estArrivalMins: 40, landmark: '100ft Road / CMH Road' },
  { name: 'HSR Layout', pincode: '560102', zone: 'South', techniciansAvailable: 7, estArrivalMins: 30, landmark: 'Sector 1 to Sector 7' },
  { name: 'Whitefield', pincode: '560066', zone: 'East', techniciansAvailable: 8, estArrivalMins: 45, landmark: 'Near ITPL / Hope Farm' },
  { name: 'Electronic City', pincode: '560100', zone: 'South', techniciansAvailable: 5, estArrivalMins: 45, landmark: 'Phase 1 & Phase 2' },
  { name: 'Jayanagar', pincode: '560041', zone: 'South', techniciansAvailable: 4, estArrivalMins: 35, landmark: '4th Block Complex' },
  { name: 'Marathahalli', pincode: '560037', zone: 'East', techniciansAvailable: 6, estArrivalMins: 35, landmark: 'Multiplex Bridge / Outer Ring Road' },
  { name: 'Bellandur', pincode: '560103', zone: 'East', techniciansAvailable: 5, estArrivalMins: 40, landmark: 'Near EcoSpace / Central Mall' },
  { name: 'BTM Layout', pincode: '560068', zone: 'South', techniciansAvailable: 4, estArrivalMins: 30, landmark: 'Udupi Garden / 2nd Stage' },
  { name: 'JP Nagar', pincode: '560078', zone: 'South', techniciansAvailable: 5, estArrivalMins: 35, landmark: 'Phase 1 - Phase 7' },
  { name: 'Malleshwaram', pincode: '560003', zone: 'West', techniciansAvailable: 4, estArrivalMins: 45, landmark: 'Margosa Road / 8th Cross' },
  { name: 'Rajajinagar', pincode: '560010', zone: 'West', techniciansAvailable: 3, estArrivalMins: 40, landmark: 'Near Orion Mall / 1st Block' },
  { name: 'Hebbal', pincode: '560024', zone: 'North', techniciansAvailable: 4, estArrivalMins: 50, landmark: 'Hebbal Flyover / Manyata Tech Park' },
  { name: 'Yelahanka', pincode: '560064', zone: 'North', techniciansAvailable: 4, estArrivalMins: 55, landmark: 'Yelahanka New Town' },
  { name: 'Sarjapur Road', pincode: '560035', zone: 'East', techniciansAvailable: 6, estArrivalMins: 40, landmark: 'Carmelaram / Wipro Gate' },
  { name: 'Banashankari', pincode: '560050', zone: 'South', techniciansAvailable: 4, estArrivalMins: 40, landmark: 'BDC Complex / BSK 2nd & 3rd Stage' },
  { name: 'RT Nagar', pincode: '560032', zone: 'North', techniciansAvailable: 3, estArrivalMins: 45, landmark: 'Dinnur Main Road' },
  { name: 'Kalyan Nagar', pincode: '560043', zone: 'North', techniciansAvailable: 4, estArrivalMins: 40, landmark: 'HRBR Layout / CMR Road' },
  { name: 'Basavanagudi', pincode: '560004', zone: 'South', techniciansAvailable: 3, estArrivalMins: 35, landmark: 'Gandhi Bazaar / DVG Road' },
  { name: 'MG Road / CBD', pincode: '560001', zone: 'Central', techniciansAvailable: 5, estArrivalMins: 30, landmark: 'Brigade Road / Residency Road' }
];

export interface BeforeAfterCase {
  id: string;
  appliance: string;
  title: string;
  faultSummary: string;
  solution: string;
  beforeMetric: string;
  afterMetric: string;
  beforeImg: string;
  afterImg: string;
  location: string;
}

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'ba-wm',
    appliance: 'Washing Machine',
    title: 'Samsung 7kg Front-Load Drum Deep Descaling & Bearing Fix',
    faultSummary: 'Severe lime-scale sludge, deafening jet-engine noise during spin cycle, and recurrent drain pump choke.',
    solution: 'Complete tub split disassembly, German ceramic bearing kit replacement, high-temperature chemical descaling.',
    beforeMetric: 'Noise: 86 dB (Deafening vibration)',
    afterMetric: 'Noise: 52 dB (Whisper quiet spin)',
    beforeImg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    location: 'HSR Layout Sector 2'
  },
  {
    id: 'ba-fridge',
    appliance: 'Refrigerator',
    title: 'Whirlpool 340L Double Door Compressor Leak & Gas Charging',
    faultSummary: 'Refrigerator stopped cooling; milk spoiled overnight, freezer coil choked with ice block, whistling gas hiss.',
    solution: 'Nitrogen pressure leak detection, copper condenser brazing, R600a eco-gas refilling with sub-zero vacuum test.',
    beforeMetric: 'Cabinet Temp: 22°C (Warm)',
    afterMetric: 'Cabinet Temp: 3.2°C (Optimal Chill)',
    beforeImg: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    location: 'Indiranagar 12th Main'
  },
  {
    id: 'ba-ac',
    appliance: 'Air Conditioner',
    title: 'Voltas 1.5 Ton Inverter AC Jet-Pressure Deep Cleaning',
    faultSummary: 'Cooling coil completely blocked with dust mats & black mold; severe water dripping on living room couch.',
    solution: 'Fitted waterproof washjacket, sprayed eco-enzyme coil foam, 140 PSI high-pressure jet wash, drain pipe cleared.',
    beforeMetric: 'Air Flow: 180 CFM | Grill: 21°C',
    afterMetric: 'Air Flow: 490 CFM | Grill: 11°C',
    beforeImg: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    location: 'Whitefield (Prestige Shantiniketan)'
  },
  {
    id: 'ba-micro',
    appliance: 'Microwave Oven',
    title: 'IFB 30L Convection Microwave Magnetron & Waveguide Repair',
    faultSummary: 'Loud buzz with violent sparks inside cavity whenever heating timer was activated; food remained icy cold.',
    solution: 'Replaced scorched mica waveguide sheet, renewed high-voltage magnetron tube with OEM warranty unit.',
    beforeMetric: 'Heating power: 0 Watt (Dead)',
    afterMetric: 'Heating power: 900W (Full thermal output)',
    beforeImg: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
    location: 'Koramangala 4th Block'
  }
];

export interface CustomerReview {
  id: string;
  name: string;
  locality: string;
  appliance: string;
  rating: number;
  date: string;
  review: string;
  badge: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Siddharth Rao',
    locality: 'Koramangala 6th Block',
    appliance: 'Washing Machine (Bosch Front Load)',
    rating: 5,
    date: 'Yesterday',
    badge: 'Verified Doorstep Repair',
    review: 'Booked at 9:30 AM on a Saturday after our Bosch front loader threw an E18 error. Technician Karthik reached within 45 minutes, had genuine replacement drain motor in his toolkit, and finished everything cleanly. Transparent billing of ₹850 parts + standard service. 6 months warranty card sent via WhatsApp!'
  },
  {
    id: 'rev-2',
    name: 'Pooja Venkatesh',
    locality: 'Whitefield (near Hope Farm)',
    appliance: 'Refrigerator (LG Double Door)',
    rating: 5,
    date: '3 days ago',
    badge: 'Verified Doorstep Repair',
    review: 'Our LG double-door fridge compressor stopped kicking in during peak summer. Quick Fix Pro quoted ₹399 inspection which was waived against the repair. They refilled R600a gas and replaced the starting relay right at home. Cooling restored to freezing within 2 hours. Super courteous!'
  },
  {
    id: 'rev-3',
    name: 'Anand Kumar',
    locality: 'HSR Layout Sector 1',
    appliance: 'Air Conditioner (Voltas Split 1.5T)',
    rating: 5,
    date: '5 days ago',
    badge: 'Verified Doorstep Repair',
    review: 'The foam jet wash was unbelievable! Other local plumbers just brush the mesh with water. Quick Fix Pro technicians brought a proper waterproof funnel jacket and high pressure pump. The coil looks like brand new showroom condition and room cools in 5 minutes now.'
  },
  {
    id: 'rev-4',
    name: 'Meera Nambiar',
    locality: 'Indiranagar 100ft Road',
    appliance: 'Microwave Oven (Samsung Convection)',
    rating: 5,
    date: '1 week ago',
    badge: 'Verified Doorstep Repair',
    review: 'No hassle of carrying a 15kg heavy microwave to a market shop. Technician checked the high voltage circuit at our dining table, replaced the magnetron and gave a test run with a bowl of water in 40 minutes. Very professional behavior and digital bill provided.'
  },
  {
    id: 'rev-5',
    name: 'Rajesh Hegde',
    locality: 'Jayanagar 4th Block',
    appliance: 'Washing Machine (IFB Senator)',
    rating: 5,
    date: '2 weeks ago',
    badge: 'Verified Doorstep Repair',
    review: 'Drum was making a terrible screeching noise during high spin. Technician Manjunath diagnosed worn out bearings, split the outer tub without damaging the balance weights, and installed original German bearings. Saved me at least ₹15,000 compared to official brand quotes.'
  }
];

export interface PriceEstimateOption {
  applianceId: string;
  issues: {
    issue: string;
    diagnosticPrice: number;
    laborPrice: number;
    estimatedParts: string;
    estimatedPartsMin: number;
    estimatedPartsMax: number;
    warrantyMonths: number;
  }[];
}

export const PRICING_ESTIMATES: PriceEstimateOption[] = [
  {
    applianceId: 'washing-machine',
    issues: [
      {
        issue: 'Front Load Deep Cleaning & Tub Descaling',
        diagnosticPrice: 0,
        laborPrice: 1499,
        estimatedParts: 'Drum split, medical descaling & high-pressure jet sanitize',
        estimatedPartsMin: 0,
        estimatedPartsMax: 0,
        warrantyMonths: 6
      },
      {
        issue: 'Top Load Deep Cleaning & Pulsator Wash',
        diagnosticPrice: 0,
        laborPrice: 1299,
        estimatedParts: 'Pulsator disassembly, tub scale removal & anti-fungal rinse',
        estimatedPartsMin: 0,
        estimatedPartsMax: 0,
        warrantyMonths: 6
      },
      {
        issue: 'Semi-Automatic Deep Cleaning & Sanitize',
        diagnosticPrice: 0,
        laborPrice: 699,
        estimatedParts: 'Twin tub scrub, lint chamber purge & drain flush',
        estimatedPartsMin: 0,
        estimatedPartsMax: 0,
        warrantyMonths: 6
      },
      {
        issue: 'Drain Pump / Water Outlet Failure (E2/E18)',
        diagnosticPrice: 0,
        laborPrice: 399,
        estimatedParts: 'Original OEM drain motor pump assembly',
        estimatedPartsMin: 450,
        estimatedPartsMax: 850,
        warrantyMonths: 6
      },
      {
        issue: 'Drum Bearing Failure / Loud Spin Noise',
        diagnosticPrice: 0,
        laborPrice: 799,
        estimatedParts: 'Heavy-duty German waterproof bearing & oil-seal set',
        estimatedPartsMin: 800,
        estimatedPartsMax: 1400,
        warrantyMonths: 6
      },
      {
        issue: 'PCB Controller Board Repair / Error Codes',
        diagnosticPrice: 0,
        laborPrice: 650,
        estimatedParts: 'Micro-controller IC, relays or power capacitors',
        estimatedPartsMin: 600,
        estimatedPartsMax: 1800,
        warrantyMonths: 6
      },
      {
        issue: 'Door Lock Latch / Rubber Bellow Gasket Leak',
        diagnosticPrice: 0,
        laborPrice: 349,
        estimatedParts: 'Mould-resistant silicone door collar bellow',
        estimatedPartsMin: 500,
        estimatedPartsMax: 1100,
        warrantyMonths: 6
      }
    ]
  },
  {
    applianceId: 'refrigerator',
    issues: [
      {
        issue: 'Refrigerant Gas Charging (R600a / R134a)',
        diagnosticPrice: 0,
        laborPrice: 599,
        estimatedParts: '100% pure refrigerant gas canister + pin valve',
        estimatedPartsMin: 800,
        estimatedPartsMax: 1400,
        warrantyMonths: 6
      },
      {
        issue: 'Thermostat / Defrost Sensor / Bimetal Replacement',
        diagnosticPrice: 0,
        laborPrice: 399,
        estimatedParts: 'Digital bimetal thermostat / defrost timer',
        estimatedPartsMin: 350,
        estimatedPartsMax: 750,
        warrantyMonths: 6
      },
      {
        issue: 'Compressor Relay & Capacitor Fix',
        diagnosticPrice: 0,
        laborPrice: 350,
        estimatedParts: 'PTC starter relay & overload protector (OLP)',
        estimatedPartsMin: 300,
        estimatedPartsMax: 650,
        warrantyMonths: 6
      },
      {
        issue: 'New Compressor Replacement & Brazing',
        diagnosticPrice: 0,
        laborPrice: 899,
        estimatedParts: 'Brand OEM hermetic compressor + drier filter',
        estimatedPartsMin: 2800,
        estimatedPartsMax: 4500,
        warrantyMonths: 12
      },
      {
        issue: 'Magnetic Door Gasket Seal Replacement',
        diagnosticPrice: 0,
        laborPrice: 299,
        estimatedParts: 'Custom antimicrobial magnetic door gasket',
        estimatedPartsMin: 400,
        estimatedPartsMax: 900,
        warrantyMonths: 6
      }
    ]
  },
  {
    applianceId: 'air-conditioner',
    issues: [
      {
        issue: 'Power Jet Deep Foam Servicing (Indoor + Outdoor)',
        diagnosticPrice: 0,
        laborPrice: 599,
        estimatedParts: 'Eco-chemical coil foam wash & anti-fungal spray',
        estimatedPartsMin: 0,
        estimatedPartsMax: 0,
        warrantyMonths: 3
      },
      {
        issue: 'Gas Leak Detection & Complete Gas Refill (R32 / R410A)',
        diagnosticPrice: 0,
        laborPrice: 650,
        estimatedParts: 'Nitrogen test + certified gas weight refill',
        estimatedPartsMin: 1400,
        estimatedPartsMax: 2400,
        warrantyMonths: 6
      },
      {
        issue: 'Water Leakage / Clogged Drain Tray Clearing',
        diagnosticPrice: 0,
        laborPrice: 399,
        estimatedParts: 'Drain sleeve pipe & back-tray seal',
        estimatedPartsMin: 100,
        estimatedPartsMax: 250,
        warrantyMonths: 3
      },
      {
        issue: 'Inverter PCB Motherboard Repair',
        diagnosticPrice: 0,
        laborPrice: 850,
        estimatedParts: 'IPM module / communication chip repair',
        estimatedPartsMin: 900,
        estimatedPartsMax: 2200,
        warrantyMonths: 6
      },
      {
        issue: 'Outdoor Fan Motor / Dual Capacitor',
        diagnosticPrice: 0,
        laborPrice: 450,
        estimatedParts: 'Dual run capacitor 35/45uF or BLDC fan motor',
        estimatedPartsMin: 350,
        estimatedPartsMax: 1200,
        warrantyMonths: 6
      }
    ]
  },
  {
    applianceId: 'microwave-oven',
    issues: [
      {
        issue: 'Not Heating / Magnetron Tube Replacement',
        diagnosticPrice: 0,
        laborPrice: 450,
        estimatedParts: 'Original high-emission Magnetron tube (Witol/Galanz)',
        estimatedPartsMin: 950,
        estimatedPartsMax: 1650,
        warrantyMonths: 6
      },
      {
        issue: 'Sparking / Waveguide Mica Sheet Burnt',
        diagnosticPrice: 0,
        laborPrice: 249,
        estimatedParts: 'Heat-resistant Mica cover plate replacement',
        estimatedPartsMin: 150,
        estimatedPartsMax: 300,
        warrantyMonths: 6
      },
      {
        issue: 'Turntable Plate Not Rotating / Motor Stalled',
        diagnosticPrice: 0,
        laborPrice: 299,
        estimatedParts: 'Synchronous 220V turntable motor & drive coupler',
        estimatedPartsMin: 250,
        estimatedPartsMax: 500,
        warrantyMonths: 6
      },
      {
        issue: 'Touch Keypad Membrane Non-Responsive',
        diagnosticPrice: 0,
        laborPrice: 450,
        estimatedParts: 'Model specific touch panel membrane ribbon',
        estimatedPartsMin: 450,
        estimatedPartsMax: 950,
        warrantyMonths: 6
      }
    ]
  }
];

export interface BookingRecord {
  bookingId: string;
  appliance: string;
  brand: string;
  issue: string;
  date: string;
  timeSlot: string;
  locality: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  landmark?: string;
  status: 'confirmed' | 'assigned' | 'en_route' | 'in_inspection' | 'completed' | 'cancelled';
  assignedTech?: {
    name: string;
    phone: string;
    rating: number;
    experience: string;
    verified: boolean;
    photo: string;
    vehicleNo: string;
    etaMinutes: number;
  };
  totalEstimated: number;
  referralCode?: string;
  referralDiscount?: number;
  createdAt: string;
  adminNotes?: string;
  userId?: string;
  updatedAt?: string;
}

export const SAMPLE_TRACKING_BOOKINGS: BookingRecord[] = [
  {
    bookingId: 'QFP-8492',
    appliance: 'Washing Machine',
    brand: 'Bosch',
    issue: 'Drum rattling noise during spin cycle (E18)',
    date: 'Today',
    timeSlot: 'Morning (10:00 AM - 01:00 PM)',
    locality: 'Koramangala 4th Block',
    customerName: 'Ananya Sharma',
    customerPhone: '+91 98451 44210',
    customerAddress: 'Flat 302, Palm Springs Apts, 5th Cross',
    landmark: 'Near Wipro Park',
    status: 'en_route',
    assignedTech: {
      name: 'Babu',
      phone: '8095996638',
      rating: 4.9,
      experience: '7+ Years Senior Specialist',
      verified: true,
      photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&q=80',
      vehicleNo: 'KA 01 EK 4920',
      etaMinutes: 18
    },
    totalEstimated: 649,
    createdAt: '2026-10-29T08:30:00Z'
  },
  {
    bookingId: 'QFP-7104',
    appliance: 'Refrigerator',
    brand: 'Samsung',
    issue: 'Fridge not cooling, warm lower compartment',
    date: 'Today',
    timeSlot: 'Afternoon (02:00 PM - 05:00 PM)',
    locality: 'Whitefield',
    customerName: 'Vivek Nair',
    customerPhone: '+91 97412 88390',
    customerAddress: 'Villa 14, Prestige Silver Oak',
    landmark: 'Behind Forum Value Mall',
    status: 'assigned',
    assignedTech: {
      name: 'Suresh Patil',
      phone: '+91 98860 38291',
      rating: 4.8,
      experience: '6 Years Experience',
      verified: true,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      vehicleNo: 'KA 03 HM 2210',
      etaMinutes: 45
    },
    totalEstimated: 899,
    createdAt: '2026-10-29T09:15:00Z'
  }
];
