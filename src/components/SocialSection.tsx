import React from 'react';
import { ExternalLink, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { SocialIcon } from './SocialIcons';

interface SocialSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const SocialSection: React.FC<SocialSectionProps> = ({
  className = "",
  title = "Connect With Quick Fix Pro Online",
  subtitle = "Follow our live repair demos, WhatsApp catalog, before-after reels, and real customer reviews across Bangalore."
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Official Social Media & Channels</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          {title}
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-lg hover:-translate-y-0.5 bg-white ${link.borderClass}`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${link.bgClass} ${link.textClass} border transition-transform group-hover:scale-110`}>
                    <SocialIcon id={link.id} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {link.name}
                    </h3>
                    <div className="text-xs font-medium text-slate-500">
                      {link.handle}
                    </div>
                  </div>
                </div>

                {link.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                    {link.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {link.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
              <span className="flex items-center gap-1.5">
                {link.id === 'whatsapp' ? (
                  <>
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Open WhatsApp Catalog</span>
                  </>
                ) : link.id === 'email' ? (
                  <span>Send Direct Email</span>
                ) : (
                  <span>View Official Channel</span>
                )}
              </span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
