import React from 'react';
import { Phone, MapPin, Clock, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { PageId } from '../types/navigation';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { SocialIcon } from './SocialIcons';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, onOpenTracker }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <img
                src="/assets/aistudio/image_d5e93998_07d21934.jpg"
                alt="Quick Fix Pro Official Logo"
                className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                    Quick Fix <span className="text-blue-500">Pro</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800">
                    Service Centre
                  </span>
                </div>
                <div className="text-xs font-semibold text-amber-400 mt-0.5">
                  Bangalore Helpline: 8095996638
                </div>
              </div>
            </button>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Bangalore's trusted doorstep appliance repair service center for washing machines, refrigerators, air conditioners, and microwave ovens. Backed by certified technicians and a 6-month written warranty.
            </p>

            <div className="pt-2 space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Central HQ: #84, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Hotline: <a href="tel:+918095996638" className="text-white hover:underline font-bold text-sm text-amber-400">+91 80959 96638</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Email Support: <a href="mailto:quickfixpro01@gmail.com" className="text-white hover:text-rose-300 hover:underline font-semibold">quickfixpro01@gmail.com</a></span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Catalog: <a href="https://wa.me/c/918095996638" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-semibold">wa.me/c/918095996638</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Operating Hours: 8:00 AM – 9:00 PM (Monday to Sunday, All 7 Days)</span>
              </div>
            </div>

            {/* Quick social icon badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  title={`${link.name} (${link.handle})`}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-slate-900 border ${link.borderClass} ${link.textClass} hover:scale-110 shadow-xs`}
                >
                  <SocialIcon id={link.id} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  About Us (Our Story & Techs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Services & Transparent Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Contact Us & Hub Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Terms of Service & Warranty
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors text-left cursor-pointer flex items-center gap-1">
                  <span>★ Admin Operations Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Appliance Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Appliance Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { onNavigate('services'); }} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Washing Machine (from ₹299)
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('services'); }} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Refrigerator Repair (from ₹399)
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('services'); }} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Air Conditioner Service (from ₹499)
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('services'); }} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Microwave Oven Repair (from ₹249)
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('services'); }} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                  Appliance Care Packages
                </button>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-blue-400 transition-colors text-left cursor-pointer font-semibold text-amber-300">
                  Track Live Service & Warranty
                </button>
              </li>
            </ul>
          </div>

          {/* Bangalore Hubs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Bangalore Hubs
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Mobile technician teams stationed across Koramangala, Whitefield, HSR Layout, Indiranagar, Electronic City, Jayanagar, Marathahalli, Bellandur, JP Nagar, and Hebbal.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors cursor-pointer text-center"
              >
                Book Doorstep Visit
              </button>
            </div>
          </div>

        </div>

        {/* Social Media & Official Channels Bar */}
        <div className="py-6 border-b border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                Follow & Connect With Us
              </h5>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Daily repair guides, customer reviews, WhatsApp catalog & official Bangalore service announcements
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${link.borderClass} ${link.bgClass} ${link.textClass} hover:scale-105`}
                >
                  <SocialIcon id={link.id} className="w-3.5 h-3.5 shrink-0" />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Quick Fix Pro Service Centre Bengaluru.</span>
            <span>•</span>
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
          </div>
          <p className="text-center md:text-right max-w-xl">
            Disclaimer: Quick Fix Pro is an independent third-party home appliance repair provider. All brand logos and names (Whirlpool, Bosch, Godrej, Panasonic, Voltas, Beko, Samsung, LG, IFB) are registered trademarks of their respective manufacturers.
          </p>
        </div>

      </div>
    </footer>
  );
};
