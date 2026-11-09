export interface BangaloreMapHub {
  id: string;
  name: string;
  pincode: string;
  zone: 'Central' | 'South' | 'East' | 'North' | 'West';
  x: number; // percentage X position on map canvas (0 - 100)
  y: number; // percentage Y position on map canvas (0 - 100)
  techniciansAvailable: number;
  estArrivalMins: number;
  landmark: string;
  popularSocieties: string[];
}

export interface ZoneConfig {
  name: 'Central' | 'South' | 'East' | 'North' | 'West';
  color: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  pinBg: string;
  pulseColor: string;
}

export const ZONE_CONFIGS: Record<string, ZoneConfig> = {
  Central: {
    name: 'Central',
    color: '#8b5cf6',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    borderColor: 'border-purple-300',
    pinBg: 'bg-purple-600',
    pulseColor: 'bg-purple-400'
  },
  East: {
    name: 'East',
    color: '#3b82f6',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    borderColor: 'border-blue-300',
    pinBg: 'bg-blue-600',
    pulseColor: 'bg-blue-400'
  },
  South: {
    name: 'South',
    color: '#10b981',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    borderColor: 'border-emerald-300',
    pinBg: 'bg-emerald-600',
    pulseColor: 'bg-emerald-400'
  },
  North: {
    name: 'North',
    color: '#f59e0b',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    borderColor: 'border-amber-300',
    pinBg: 'bg-amber-600',
    pulseColor: 'bg-amber-400'
  },
  West: {
    name: 'West',
    color: '#f43f5e',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-800',
    borderColor: 'border-rose-300',
    pinBg: 'bg-rose-600',
    pulseColor: 'bg-rose-400'
  }
};

export const BANGALORE_MAP_HUBS: BangaloreMapHub[] = [
  // Central Hubs
  {
    id: 'hub-mg-road',
    name: 'MG Road / CBD',
    pincode: '560001',
    zone: 'Central',
    x: 48,
    y: 44,
    techniciansAvailable: 5,
    estArrivalMins: 30,
    landmark: 'Brigade Road / Residency Road',
    popularSocieties: ['Prestige Meridian', 'Craig Park Layout', 'Richmond Town']
  },
  {
    id: 'hub-koramangala',
    name: 'Koramangala',
    pincode: '560034',
    zone: 'Central',
    x: 52,
    y: 56,
    techniciansAvailable: 6,
    estArrivalMins: 30,
    landmark: 'Sony World Junction / 80 Feet Road',
    popularSocieties: ['Raheja Residency', 'Koramangala 3rd Block', 'ND Orchid']
  },

  // East Hubs (Tech Corridor)
  {
    id: 'hub-indiranagar',
    name: 'Indiranagar',
    pincode: '560038',
    zone: 'East',
    x: 58,
    y: 43,
    techniciansAvailable: 5,
    estArrivalMins: 35,
    landmark: '100 Feet Road / 12th Main',
    popularSocieties: ['Defence Colony', 'HAL 2nd Stage', 'Michaelpalya']
  },
  {
    id: 'hub-marathahalli',
    name: 'Marathahalli',
    pincode: '560037',
    zone: 'East',
    x: 72,
    y: 48,
    techniciansAvailable: 4,
    estArrivalMins: 40,
    landmark: 'Multiplex Junction / ORR Flyover',
    popularSocieties: ['Purva Fountain Square', 'SMR Vinay', 'Ashraya Layout']
  },
  {
    id: 'hub-bellandur',
    name: 'Bellandur',
    pincode: '560103',
    zone: 'East',
    x: 68,
    y: 57,
    techniciansAvailable: 5,
    estArrivalMins: 35,
    landmark: 'EcoSpace / Outer Ring Road',
    popularSocieties: ['Adarsh Palm Retreat', 'Sobha Lakeview', 'Sun City']
  },
  {
    id: 'hub-sarjapur',
    name: 'Sarjapur Road',
    pincode: '560035',
    zone: 'East',
    x: 74,
    y: 65,
    techniciansAvailable: 4,
    estArrivalMins: 40,
    landmark: 'Wipro Corporate Office / Carmelaram',
    popularSocieties: ['SJR Parkway Homes', 'Assetz East Point', 'Godrej Lake Gardens']
  },
  {
    id: 'hub-whitefield',
    name: 'Whitefield',
    pincode: '560066',
    zone: 'East',
    x: 85,
    y: 46,
    techniciansAvailable: 6,
    estArrivalMins: 45,
    landmark: 'ITPB / Hope Farm Junction',
    popularSocieties: ['Prestige Shantiniketan', 'Brigade Cosmopolis', 'Assetz Marq']
  },

  // South Hubs
  {
    id: 'hub-hsr',
    name: 'HSR Layout',
    pincode: '560102',
    zone: 'South',
    x: 56,
    y: 64,
    techniciansAvailable: 5,
    estArrivalMins: 30,
    landmark: '27th Main / BDA Complex',
    popularSocieties: ['Sobha Cinnamon', 'Purva Vantage', 'HSR Sector 2']
  },
  {
    id: 'hub-btm',
    name: 'BTM Layout',
    pincode: '560076',
    zone: 'South',
    x: 48,
    y: 63,
    techniciansAvailable: 4,
    estArrivalMins: 35,
    landmark: 'Udupi Garden Signal / 16th Main',
    popularSocieties: ['BTM 2nd Stage', 'Lakeview Residency', 'Tavarekere']
  },
  {
    id: 'hub-jayanagar',
    name: 'Jayanagar',
    pincode: '560041',
    zone: 'South',
    x: 42,
    y: 58,
    techniciansAvailable: 4,
    estArrivalMins: 35,
    landmark: '4th Block Complex / Cool Joint',
    popularSocieties: ['Ashoka Pillar Area', 'Jayanagar 9th Block', 'Madhavan Park']
  },
  {
    id: 'hub-jp-nagar',
    name: 'JP Nagar',
    pincode: '560078',
    zone: 'South',
    x: 43,
    y: 68,
    techniciansAvailable: 4,
    estArrivalMins: 40,
    landmark: 'Central Mall / 24th Main',
    popularSocieties: ['Brigade Millennium', 'Elita Promenade', 'Purva Panorama']
  },
  {
    id: 'hub-banashankari',
    name: 'Banashankari',
    pincode: '560050',
    zone: 'South',
    x: 35,
    y: 62,
    techniciansAvailable: 4,
    estArrivalMins: 40,
    landmark: 'BDC Complex / BSK 2nd & 3rd Stage',
    popularSocieties: ['Tata Promont', 'Brigade Omega', 'BSK Ring Road']
  },
  {
    id: 'hub-basavanagudi',
    name: 'Basavanagudi',
    pincode: '560004',
    zone: 'South',
    x: 40,
    y: 52,
    techniciansAvailable: 3,
    estArrivalMins: 35,
    landmark: 'Gandhi Bazaar / DVG Road',
    popularSocieties: ['Bull Temple Enclave', 'Netkallappa Circle', 'Tagore Circle']
  },
  {
    id: 'hub-electronic-city',
    name: 'Electronic City',
    pincode: '560100',
    zone: 'South',
    x: 64,
    y: 82,
    techniciansAvailable: 5,
    estArrivalMins: 45,
    landmark: 'Infosys Gate 1 / Neeladri Road',
    popularSocieties: ['Ajmera Infinity', 'SJR Equinox', 'Concorde Silicon Valley']
  },

  // North Hubs
  {
    id: 'hub-malleshwaram',
    name: 'Malleshwaram',
    pincode: '560003',
    zone: 'North',
    x: 38,
    y: 36,
    techniciansAvailable: 4,
    estArrivalMins: 40,
    landmark: '8th Cross / Margosa Road',
    popularSocieties: ['Sankey Lake Enclave', 'Renaissance Park', 'Margosa Avenue']
  },
  {
    id: 'hub-rt-nagar',
    name: 'RT Nagar',
    pincode: '560032',
    zone: 'North',
    x: 46,
    y: 30,
    techniciansAvailable: 3,
    estArrivalMins: 45,
    landmark: 'Dinnur Main Road / Post Office',
    popularSocieties: ['HMT Layout', 'Ganganagar', 'Rahmath Nagar']
  },
  {
    id: 'hub-hebbal',
    name: 'Hebbal',
    pincode: '560024',
    zone: 'North',
    x: 49,
    y: 22,
    techniciansAvailable: 4,
    estArrivalMins: 45,
    landmark: 'Hebbal Flyover / Esteem Mall',
    popularSocieties: ['Godrej Woodsman Estate', 'L&T Raintree Blvd', 'SNN Clermont']
  },
  {
    id: 'hub-kalyan-nagar',
    name: 'Kalyan Nagar',
    pincode: '560043',
    zone: 'North',
    x: 60,
    y: 28,
    techniciansAvailable: 4,
    estArrivalMins: 40,
    landmark: 'HRBR Layout / CMR Road',
    popularSocieties: ['Kalyan Residency', 'Banaswadi Ring Road', 'Prakruthi Layout']
  },
  {
    id: 'hub-yelahanka',
    name: 'Yelahanka',
    pincode: '560064',
    zone: 'North',
    x: 52,
    y: 12,
    techniciansAvailable: 3,
    estArrivalMins: 50,
    landmark: 'NES Office / Dairy Circle',
    popularSocieties: ['Purva Venezia', 'Prestige Monte Carlo', 'Sobha Palm Court']
  },

  // West Hubs
  {
    id: 'hub-rajajinagar',
    name: 'Rajajinagar',
    pincode: '560010',
    zone: 'West',
    x: 33,
    y: 42,
    techniciansAvailable: 4,
    estArrivalMins: 40,
    landmark: 'Navrang Theatre / Orion Mall Area',
    popularSocieties: ['Brigade Gateway', 'Phoenix One Bangalore West', 'Rajajinagar 1st Block']
  }
];

export const BANGALORE_COVERAGE_METRICS = {
  totalHubs: 20,
  activeTechniciansOnDuty: 38,
  avgDoorstepETA: '35 - 55 Mins',
  coverageRadiusKm: '40+ km across BBMP limits',
  sameDaySLAPercent: '98.4%'
};
