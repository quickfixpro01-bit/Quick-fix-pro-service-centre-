import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageToggleProps {
  variant?: 'header' | 'compact' | 'pill';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'header',
  className = ''
}) => {
  const { language, toggleLanguage, setLanguage } = useLanguage();
  const isKn = language === 'kn';

  if (variant === 'pill') {
    return (
      <div className={`flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-2xs ${className}`}>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            !isKn
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('kn')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            isKn
              ? 'bg-amber-500 text-slate-950 shadow-xs font-heading'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          ಕನ್ನಡ
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
          isKn
            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-400/40'
            : 'bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-700'
        } ${className}`}
        title={isKn ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ (Switch to Kannada)'}
        aria-label="Toggle language between English and Kannada"
      >
        <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
        <span>{isKn ? 'ಕನ್ನಡ' : 'EN'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs active:scale-95 whitespace-nowrap shrink-0 ${className}`}
      title={isKn ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ (Switch to Kannada)'}
      aria-label="Toggle language between English and Kannada"
    >
      <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
      <div className="flex items-center gap-1 font-heading">
        <span className={!isKn ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'opacity-60'}>
          EN
        </span>
        <span className="text-slate-400 dark:text-slate-600 text-[10px]">|</span>
        <span className={isKn ? 'text-amber-600 dark:text-amber-400 font-extrabold' : 'opacity-60'}>
          ಕನ್ನಡ
        </span>
      </div>
    </button>
  );
};
