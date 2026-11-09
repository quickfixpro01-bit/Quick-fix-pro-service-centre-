import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon-only' | 'compact' | 'pill';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon-only',
  className = ''
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleTheme}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none ${
          isDark
            ? 'bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700 shadow-sm'
            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 shadow-xs'
        } ${className}`}
        title={isDark ? 'Switch to Modern Light Mode' : 'Switch to High-Contrast Dark Mode'}
        aria-label="Toggle visual color theme"
      >
        {isDark ? (
          <>
            <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>Dark Mode</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span>Light Mode</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
          isDark
            ? 'bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700'
            : 'bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200'
        } ${className}`}
        title={isDark ? 'Switch to Modern Light Mode' : 'Switch to High-Contrast Dark Mode'}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500 transition-transform duration-300 rotate-0" />
        )}
        <span>{isDark ? 'Dark' : 'Light'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-xs active:scale-95 ${className}`}
      title={isDark ? 'Switch to Modern Light Mode' : 'Switch to High-Contrast Dark Mode'}
      aria-label="Toggle light or dark theme"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 text-amber-500 absolute transition-all duration-300 transform ${
            isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`w-4 h-4 text-amber-300 absolute transition-all duration-300 transform ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
      </div>
    </button>
  );
};
