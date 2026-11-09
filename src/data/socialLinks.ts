export interface SocialLink {
  id: string;
  name: string;
  label: string;
  url: string;
  handle: string;
  category: 'social' | 'contact' | 'messaging';
  badge?: string;
  color: string;
  borderClass: string;
  bgClass: string;
  textClass: string;
  description: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Catalog & Chat',
    label: 'WhatsApp Catalog',
    url: 'https://wa.me/c/918095996638',
    handle: '+91 80959 96638',
    category: 'messaging',
    badge: 'Live Catalog & Chat',
    color: '#25D366',
    borderClass: 'border-emerald-500/40 hover:border-emerald-400',
    bgClass: 'bg-emerald-950/60 hover:bg-emerald-900/80',
    textClass: 'text-emerald-400',
    description: 'Browse our full appliance service rate cards and chat directly with technicians'
  },
  {
    id: 'email',
    name: 'Official Email Support',
    label: 'quickfixpro01@gmail.com',
    url: 'mailto:quickfixpro01@gmail.com',
    handle: 'quickfixpro01@gmail.com',
    category: 'contact',
    badge: 'Official Inbox',
    color: '#EA4335',
    borderClass: 'border-rose-500/40 hover:border-rose-400',
    bgClass: 'bg-rose-950/60 hover:bg-rose-900/80',
    textClass: 'text-rose-400',
    description: 'Send invoices, corporate repair inquiries, or feedback directly to our team'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    label: '@quickfixproservicecentre',
    url: 'https://www.instagram.com/quickfixproservicecentre/?__pwa=1',
    handle: '@quickfixproservicecentre',
    category: 'social',
    badge: 'Before & After Reels',
    color: '#E4405F',
    borderClass: 'border-pink-500/40 hover:border-pink-400',
    bgClass: 'bg-pink-950/60 hover:bg-pink-900/80',
    textClass: 'text-pink-400',
    description: 'Watch daily washing machine descaling, AC deep cleaning, and appliance maintenance reels'
  },
  {
    id: 'youtube',
    name: 'YouTube Channel',
    label: '@quickfixpro-k2e',
    url: 'https://youtube.com/@quickfixpro-k2e?si=LBe3LhvPjo-mcvPP',
    handle: '@quickfixpro-k2e',
    category: 'social',
    badge: 'Video Guides & Demos',
    color: '#FF0000',
    borderClass: 'border-red-500/40 hover:border-red-400',
    bgClass: 'bg-red-950/60 hover:bg-red-900/80',
    textClass: 'text-red-400',
    description: 'Full video walkthroughs of appliance diagnostics and doorstep servicing tips'
  },
  {
    id: 'threads',
    name: 'Threads',
    label: '@quickfixproservicecentre',
    url: 'https://www.threads.com/@quickfixproservicecentre',
    handle: '@quickfixproservicecentre',
    category: 'social',
    badge: 'Daily Quick Tips',
    color: '#FFFFFF',
    borderClass: 'border-slate-600 hover:border-slate-400',
    bgClass: 'bg-slate-900/80 hover:bg-slate-800',
    textClass: 'text-slate-200',
    description: 'Quick appliance troubleshooting tips and Bengaluru service updates on Meta Threads'
  },
  {
    id: 'facebook-page',
    name: 'Facebook Page',
    label: 'Quick Fix Pro Official',
    url: 'https://www.facebook.com/share/1dFbBZ7i1Q/',
    handle: 'quickfixproservicecentre',
    category: 'social',
    badge: 'Official Page',
    color: '#1877F2',
    borderClass: 'border-blue-500/40 hover:border-blue-400',
    bgClass: 'bg-blue-950/60 hover:bg-blue-900/80',
    textClass: 'text-blue-400',
    description: 'Connect with our Facebook community, check customer reviews, and get service alerts'
  },
  {
    id: 'facebook-share',
    name: 'Facebook Community',
    label: 'Customer Case Studies',
    url: 'https://www.facebook.com/share/1FAh3fQxNx/',
    handle: 'Bangalore Community',
    category: 'social',
    badge: 'Community Stories',
    color: '#1877F2',
    borderClass: 'border-sky-500/40 hover:border-sky-400',
    bgClass: 'bg-sky-950/60 hover:bg-sky-900/80',
    textClass: 'text-sky-400',
    description: 'Read real stories and customer feedback from Bangalore households'
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    label: '@Quickfixpro01',
    url: 'https://x.com/Quickfixpro01',
    handle: '@Quickfixpro01',
    category: 'social',
    badge: 'Instant Updates',
    color: '#38BDF8',
    borderClass: 'border-slate-500/40 hover:border-slate-300',
    bgClass: 'bg-slate-900/90 hover:bg-slate-800',
    textClass: 'text-sky-300',
    description: 'Real-time updates, customer care announcements, and repair tips on X'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Profile',
    label: 'Abdul Samad (Quick Fix Pro)',
    url: 'https://in.linkedin.com/in/abdul-samad-5375ba436',
    handle: 'Abdul Samad',
    category: 'social',
    badge: 'Founder Profile',
    color: '#0A66C2',
    borderClass: 'border-blue-600/40 hover:border-blue-400',
    bgClass: 'bg-blue-950/70 hover:bg-blue-900/90',
    textClass: 'text-blue-300',
    description: 'Professional credentials, company background, and partnership inquiries'
  }
];
