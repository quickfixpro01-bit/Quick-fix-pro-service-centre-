export type PageId = 'home' | 'about' | 'services' | 'contact' | 'privacy' | 'terms' | 'admin';

export interface PageInfo {
  id: PageId;
  title: string;
  path: string;
}

export const PAGES: PageInfo[] = [
  { id: 'home', title: 'Home', path: '#home' },
  { id: 'about', title: 'About Us', path: '#about' },
  { id: 'services', title: 'Services & Pricing', path: '#services' },
  { id: 'contact', title: 'Contact Us', path: '#contact' },
  { id: 'privacy', title: 'Privacy Policy', path: '#privacy' },
  { id: 'terms', title: 'Terms of Service', path: '#terms' },
  { id: 'admin', title: 'Admin Portal', path: '#admin' }
];
