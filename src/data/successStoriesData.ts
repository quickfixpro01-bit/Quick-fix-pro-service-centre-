export interface SuccessStoryItem {
  id: string;
  customerName: string;
  locality: string;
  applianceType: 'washing-machine' | 'refrigerator' | 'ac' | 'microwave';
  applianceLabel: string;
  rating: number;
  verified: boolean;
  date: string;
  storyTitle: string;
  comment: string;
  technicianName: string;
  repairHighlight: string;
  savingsAmount: number;
  helpfulCount: number;
}

export const INITIAL_SUCCESS_STORIES: SuccessStoryItem[] = [
  {
    id: 'story-1',
    customerName: 'Ananya Sharma',
    locality: 'Koramangala 4th Block',
    applianceType: 'washing-machine',
    applianceLabel: 'Front Load Washing Machine',
    rating: 5,
    verified: true,
    date: 'Yesterday',
    storyTitle: 'Fixed heavy spinning noise in under 45 minutes!',
    comment: 'Our Bosch front loader was making a deafening metallic noise during the spin cycle. Senior Tech Babu arrived right on time with full police ID and shoe covers. He replaced the worn drum bearing with a genuine OEM part right in front of us. The machine is now whisper-quiet!',
    technicianName: 'Senior Specialist Babu',
    repairHighlight: 'Saved ₹1,800 compared to brand service center quote with 6-month written warranty',
    savingsAmount: 1800,
    helpfulCount: 34
  },
  {
    id: 'story-2',
    customerName: 'Rajesh Venkat',
    locality: 'HSR Layout Sector 2',
    applianceType: 'ac',
    applianceLabel: '1.5 Ton Inverter Split AC',
    rating: 5,
    verified: true,
    date: '3 days ago',
    storyTitle: 'Restored ice-cold air in peak Bangalore summer',
    comment: 'Our Daikin split AC stopped cooling suddenly on a hot Sunday afternoon. Called QuickFixPro helpline and Tech Ramesh arrived within 90 minutes. He identified a micro gas leak, sealed the copper pipe joint, refilled R32 gas with pressure testing, and gave a written 6-month guarantee.',
    technicianName: 'Cooling Expert Ramesh',
    repairHighlight: 'High pressure foam wash + R32 gas recharge completed same day',
    savingsAmount: 1200,
    helpfulCount: 28
  },
  {
    id: 'story-3',
    customerName: 'Priya Nambiar',
    locality: 'Indiranagar 100ft Road',
    applianceType: 'refrigerator',
    applianceLabel: 'Double Door Refrigerator',
    rating: 5,
    verified: true,
    date: '5 days ago',
    storyTitle: 'Saved all our frozen food from spoiling!',
    comment: 'The compressor in our LG double door fridge stopped cooling overnight. Tech Srinivas ran diagnostic testing, replaced the faulty defrost sensor and starter relay with original spares, and stayed until the freezer temperature dropped back to -18°C.',
    technicianName: 'Appliance Specialist Srinivas',
    repairHighlight: 'Defrost sensor replaced on doorstep with live temperature verification',
    savingsAmount: 1450,
    helpfulCount: 42
  },
  {
    id: 'story-4',
    customerName: 'Vikramaditya Roy',
    locality: 'Whitefield (Prestige Shantiniketan)',
    applianceType: 'microwave',
    applianceLabel: 'Convection Microwave Oven',
    rating: 5,
    verified: true,
    date: '1 week ago',
    storyTitle: 'Fixed magnetron spark issue safely at home',
    comment: 'Our IFB microwave was sparking whenever we tried to heat food. Tech Manjunath replaced the burnt mica wave guide sheet and high-voltage diode right on our kitchen counter. Very polite engineer who tested heating with water before taking payment.',
    technicianName: 'Electrical Specialist Manjunath',
    repairHighlight: 'Mica sheet & diode replacement with 100% safety test run',
    savingsAmount: 950,
    helpfulCount: 19
  },
  {
    id: 'story-5',
    customerName: 'Sneha Kulkarni',
    locality: 'Bellandur (Sobha Green)',
    applianceType: 'washing-machine',
    applianceLabel: 'Top Load Fully Automatic',
    rating: 5,
    verified: true,
    date: '1 week ago',
    storyTitle: 'Zero water drain problem fixed in 30 minutes',
    comment: 'Our Samsung top load was throwing OE error code and holding 40 liters of dirty water. QuickFixPro technician cleared a coin blockage in the drain pump and replaced the worn drain valve motor. Inspection fee ₹199 was fully waived off as promised!',
    technicianName: 'Senior Specialist Babu',
    repairHighlight: 'Drain motor replacement + ₹199 inspection fee 100% waived',
    savingsAmount: 700,
    helpfulCount: 25
  },
  {
    id: 'story-6',
    customerName: 'Karthik Subramanian',
    locality: 'Sarjapur Road (Assetz East Point)',
    applianceType: 'ac',
    applianceLabel: '2 Ton Dual Inverter AC',
    rating: 5,
    verified: true,
    date: '2 weeks ago',
    storyTitle: 'Jet pump foam cleaning restored room cooling to 16°C',
    comment: 'Airflow was weak and smelled musty. The technician did a 360-degree deep foam jet wash for both indoor fan turbine and outdoor condenser coils. Indoor air flow doubled immediately and temperature dropped from 28°C to 16°C in under 7 minutes!',
    technicianName: 'Cooling Expert Ramesh',
    repairHighlight: 'Deep foam jet wash + drain pipe de-clogging',
    savingsAmount: 1100,
    helpfulCount: 31
  }
];
