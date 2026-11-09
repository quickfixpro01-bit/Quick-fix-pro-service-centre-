export const REFERRAL_DISCOUNT_AMOUNT = 150;
export const DEFAULT_REFERRAL_CODE = 'BLR150';

export interface ReferralBenefitStep {
  step: number;
  title: string;
  description: string;
  iconName: 'Share2' | 'Gift' | 'BadgePercent';
}

export const REFERRAL_STEPS: ReferralBenefitStep[] = [
  {
    step: 1,
    title: 'Share with an Apartment Neighbor',
    description: 'Send your personalized Bangalore referral link or WhatsApp message to your society group, flatmates, or friends.',
    iconName: 'Share2'
  },
  {
    step: 2,
    title: 'Neighbor Gets Flat ₹150 OFF',
    description: 'When they book any doorstep repair or deep clean in Bengaluru, ₹150 is automatically slashed from their final bill.',
    iconName: 'Gift'
  },
  {
    step: 3,
    title: 'You Earn ₹150 Service Credit',
    description: 'Get ₹150 instant credit applied to your next washing machine, fridge, AC, or microwave service booking.',
    iconName: 'BadgePercent'
  }
];

export const POPULAR_SOCIETIES = [
  'Prestige Shantiniketan (Whitefield)',
  'Raheja Residency (Koramangala)',
  'Sobha Cinnamon (HSR Layout)',
  'Adarsh Palm Retreat (Bellandur)',
  'Brigade Gateway (Rajajinagar)',
  'Salarpuria Greenage (Bommanahalli)'
];

export function cleanReferralCode(rawCode: string): string {
  if (!rawCode) return DEFAULT_REFERRAL_CODE;
  return rawCode
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, '')
    .slice(0, 20) || DEFAULT_REFERRAL_CODE;
}

export function generateReferralLink(code: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://quickfixpro-bangalore.com';
  return `${origin}/?ref=${encodeURIComponent(code)}#booking`;
}

export function generateWhatsAppMessage(code: string, senderName?: string, society?: string): string {
  const link = generateReferralLink(code);
  const fromText = senderName ? `${senderName}` : 'your neighbor';
  const societyText = society ? ` in ${society}` : ' in Bangalore';

  return `Hey neighbor! 👋

Quick recommendation from ${fromText}${societyText}:
If your Washing Machine, Refrigerator, AC, or Microwave ever gives trouble, I highly recommend QuickFixPro.

They send certified technicians to your doorstep in 90 minutes with 100% genuine spare parts and a written 6-Month Warranty.

🎁 Here is my neighbor referral link for flat ₹150 OFF your service:
${link}

(Use code ${code} for instant ₹150 discount auto-applied at checkout!)`;
}

export function generateWhatsAppShareUrl(code: string, senderName?: string, society?: string): string {
  const text = generateWhatsAppMessage(code, senderName, society);
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
