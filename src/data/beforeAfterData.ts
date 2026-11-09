export interface RealBeforeAfterItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'all' | 'descaling' | 'body-restoration' | 'tub-cleaning' | 'disassembly';
  categoryLabel: string;
  image: string;
  problem: string;
  solution: string;
  priceNote: string;
  phone: string;
  features: string[];
}

export const REAL_BEFORE_AFTER_ITEMS: RealBeforeAfterItem[] = [
  {
    id: 'ba-limescale-1',
    title: 'Hidden Limescale Removal & Deep Drum Descaling',
    subtitle: 'For a Cleaner Machine & Better Wash Performance',
    category: 'descaling',
    categoryLabel: 'Limescale Descaling',
    image: '/assets/aistudio/IMG_20260915_004944_a67279a6.jpg',
    problem: 'Thick brown limescale crust and hard water calcium choking the outer drum surface, causing bad odors and poor rinse cycles.',
    solution: 'High-temperature industrial descaling chemical cycle dissolving 100% of mineral deposits and restoring mirror-finish stainless steel.',
    priceNote: 'Starting at ₹299 (Washing Machine Service)',
    phone: '8095996638',
    features: ['Removes Limescale', 'Protects Machine Life', 'Better Wash Performance', '180-Day Guarantee']
  },
  {
    id: 'ba-body-change-1',
    title: 'Front Load Washing Machine Body Change & Restoration',
    subtitle: 'Damaged Body? We Replace It. We Restore It.',
    category: 'body-restoration',
    categoryLabel: 'Body & Cabinet Change',
    image: '/assets/aistudio/image_b41480c2_e216fca2.jpg',
    problem: 'Severe sheet-metal rust, corroded bottom frame, and chipping paint caused by Bangalore laundry balcony dampness.',
    solution: 'Complete doorstep cabinet disassembly and installation of a brand-new factory powder-coated anti-rust body frame.',
    priceNote: 'Complete Body Restoration Package',
    phone: '8095996638',
    features: ['Complete Body Replacement', 'Skilled Technicians', 'Genuine Quality Parts', 'Smooth Performance & Long Life']
  },
  {
    id: 'ba-tub-clean-1',
    title: 'Front & Top Load Drum & Pulsator Sludge Purification',
    subtitle: 'Real Multi-Appliance Doorstep Deep Cleaning',
    category: 'tub-cleaning',
    categoryLabel: 'Drum & Pulsator Wash',
    image: '/assets/aistudio/image_6304c04_3569a257.jpg',
    problem: 'Black fungal slime and foul-smelling detergent sludge trapped beneath the pulsator and between the inner and outer drums.',
    solution: 'Pulsator removal, high-pressure jet wash, anti-bacterial sanitization, and descaling treatment resulting in showroom-clean drum.',
    priceNote: 'Front Load ₹1499 | Top Load ₹1299 | Semi ₹699',
    phone: '8095996638',
    features: ['Removes Hidden Fungus', 'Stops Musty Clothes Smell', 'Clean & Hygienic Wash', '6-Month Warranty']
  },
  {
    id: 'ba-disassembly-1',
    title: 'Disassembled Tub, Pulsator & Filter Housing Deep Clean',
    subtitle: 'Doorstep Washing Machine Split Servicing',
    category: 'disassembly',
    categoryLabel: 'Tub Disassembly',
    image: '/assets/aistudio/image_7f5d61e2_01f14758.jpg',
    problem: 'Lint traps, water channels, and plastic balance rings choked with mud, limescale, and hardened detergent buildup.',
    solution: 'Complete component split on customer terrace/balcony, individual chemical soaking, jet-spray cleaning, and airtight reassembly.',
    priceNote: 'Comprehensive Tub Split Service',
    phone: '8095996638',
    features: ['100% Component Split', 'Filter Housing Sanitized', 'Zero Residue Left Behind', 'Doorstep Service']
  },
  {
    id: 'ba-descaling-spider',
    title: 'Drum Spider Arm & Outer Basket Hard Water Descaling',
    subtitle: 'Before & After Heavy Mineral Scale Crust Removal',
    category: 'descaling',
    categoryLabel: 'Limescale Descaling',
    image: '/assets/aistudio/image_fdb11dd2_1_e98bc271.jpg',
    problem: 'Heavy borewell mineral accumulation on the drum spider arm and outer plastic tub, threatening motor bearing failure.',
    solution: 'Precision chemical scale breakdown, high-pressure water blasting, and corrosion-inhibitor coating applied to the spider assembly.',
    priceNote: 'Deep Clean & Descaling Package',
    phone: '8095996638',
    features: ['Saves Spider Arm', 'Prevents Bearing Seizure', 'Restores Quiet Spin', 'Verified Doorstep Techs']
  },
  {
    id: 'ba-hard-water-guide',
    title: 'Hard Water Damage Prevention & Complete Diagnostic',
    subtitle: 'Hard Water is Silently Damaging Your Washing Machine in Bangalore',
    category: 'descaling',
    categoryLabel: 'Hard Water Protection',
    image: '/assets/aistudio/IMG_20260915_003548_30bbdd18.jpg',
    problem: 'Bangalore borewell water with high TDS causes calcium scale buildup, high electricity bills, poor detergent lather, and early motor breakdown.',
    solution: 'Our specialized descaling formulation breaks calcium bonds instantly, restores 100% water flow, and extends appliance lifespan by years.',
    priceNote: 'Deep Cleaning: Front ₹1499 / Top ₹1299 / Semi ₹699',
    phone: '8095996638',
    features: ['Removes Hidden Limescale', 'Helps Prevent Bad Odors', 'Maintains Cleaning Power', 'Supports Longer Life']
  },
  {
    id: 'ba-pulsator-restoration',
    title: 'Before & After Pulsator & Drum Hygiene Overhaul',
    subtitle: 'Spotless Sanitary Wash Tub Restoration',
    category: 'tub-cleaning',
    categoryLabel: 'Drum & Pulsator Wash',
    image: '/assets/aistudio/image_10a6d836_8e083c3c.jpg',
    problem: 'Scum lines and stubborn detergent deposits inside spin basket perforated holes transferring grey stains onto fresh laundry.',
    solution: 'Ultra-clean descaling treatment clearing every micro-perforation in the drum wall and pulsator fins.',
    priceNote: 'Service Starting ₹299',
    phone: '8095996638',
    features: ['Clears Perforated Holes', 'No More Dirty Clothes Stains', 'Eco-Enzyme Sanitizer', 'Test Run Included']
  },
  {
    id: 'ba-wow-deep-clean',
    title: 'Scale Buildup vs Fresh Deep Clean Technology',
    subtitle: 'WOW! See the Difference Featuring Deep Cleaning Technology',
    category: 'descaling',
    categoryLabel: 'Limescale Descaling',
    image: '/assets/aistudio/image_961eb72a_4dbfd381.jpg',
    problem: 'Severe scale buildup coating heating element and drum back-wall, reducing thermal efficiency and tripping MCB.',
    solution: 'Proprietary deep-cleaning formulation targeting hidden mold, detergent sludge, and mineral deposits.',
    priceNote: 'Guaranteed Results',
    phone: '8095996638',
    features: ['Removes Limescale & Buildup', 'Provides Complete Clean', 'Eliminates Hidden Mold', 'Fresher Machine']
  },
  {
    id: 'ba-whirlpool-front-body',
    title: 'Whirlpool Front Load Rusted Cabinet Restoration',
    subtitle: 'Full Body Overhaul for Corroded Front Load Washers',
    category: 'body-restoration',
    categoryLabel: 'Body & Cabinet Change',
    image: '/assets/aistudio/image_7c0b871d_38d16184.jpg',
    problem: 'Extreme base corrosion and rusted front fascia causing machine tilt, heavy spin vibrations, and electrical hazard.',
    solution: 'Complete cabinet replacement with OEM galvanized steel outer body, leveling shock absorbers, and fresh door seal.',
    priceNote: 'Save ₹15,000+ over buying a new machine',
    phone: '8095996638',
    features: ['Galvanized Anti-Rust Steel', 'Zero Machine Shake', 'Showroom White Finish', '100% Genuine Fit']
  },
  {
    id: 'ba-drum-split-circle',
    title: 'Circular Drum Grime & Detergent Residue Clearance',
    subtitle: 'Targets Grime, Detergent Scum, and Odor-Causing Residue',
    category: 'tub-cleaning',
    categoryLabel: 'Drum & Pulsator Wash',
    image: '/assets/aistudio/image_64316fe6_b6992174.jpg',
    problem: 'Greasy soap scum film holding dirt and bacteria on outer tub face, visible only when machine is split open.',
    solution: 'Intensive mechanical brushing and pressure foam treatment dissolving grease and bacterial biofilm.',
    priceNote: 'Deep Clean: Front ₹1499 | Top ₹1299 | Semi ₹699',
    phone: '8095996638',
    features: ['Removes Grime', 'Breaks Residue', 'Stops Bacterial Growth', 'Bangalore-Wide Service']
  },
  {
    id: 'ba-whirlpool-top-body',
    title: 'Whirlpool Top Load Titanium Grey Body Upgrade',
    subtitle: 'Rusted Antique Washer Transformed to Modern Metallic Design',
    category: 'body-restoration',
    categoryLabel: 'Body & Cabinet Change',
    image: '/assets/aistudio/image_321c11ca_a7a850c3.jpg',
    problem: 'Old Whirlpool top-loader with rusted, flaking metal base and sun-yellowed plastic control panel.',
    solution: 'Complete body restoration fitted with contemporary titanium grey cabinet, digital panel alignment, and anti-rodent base mesh.',
    priceNote: 'Complete Body Restoration',
    phone: '8095996638',
    features: ['Titanium Grey Upgrade', 'Anti-Rodent Base Guard', 'Reinforced Suspension', '5+ Years Extended Life']
  }
];
