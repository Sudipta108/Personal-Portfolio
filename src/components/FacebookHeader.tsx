import { Moon, Sun } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export type ProfileTab = 'posts' | 'about' | 'skills' | 'projects';
export type ThemeMode = 'default' | 'dark';

interface FacebookHeaderProps {
  activeTab: ProfileTab;
  onSelectTab: (tab: ProfileTab) => void;
  theme: ThemeMode;
  onSetTheme: (theme: ThemeMode) => void;
}

const NAV_TABS: { key: ProfileTab; label: string }[] = [
  { key: 'posts', label: 'Posts' },
  { key: 'about', label: 'About' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
];

export function FacebookHeader({
  activeTab,
  onSelectTab,
  theme,
  onSetTheme,
}: FacebookHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#242526] border-b border-[#DCE0E5] dark:border-[#3E4042] transition-colors duration-150">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('posts')}
          className="font-display text-lg font-bold tracking-tight text-[#1877F2] dark:text-[#2D88FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1877F2] rounded-sm"
        >
          {PROFILE.name}
        </button>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav
          aria-label="Profile sections"
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onSelectTab(tab.key)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1877F2] ${
                  isActive
                    ? 'text-[#1877F2] dark:text-[#2D88FF] font-semibold underline decoration-2'
                    : 'text-[#65676B] dark:text-[#B0B3B8] hover:text-[#1C1E21] dark:hover:text-[#E4E6EB]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Default / Dark Theme Switcher */}
        <div
          role="group"
          aria-label="Theme selection"
          className="inline-flex items-center p-1 bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-lg shrink-0"
        >
          <button
            type="button"
            onClick={() => onSetTheme('default')}
            aria-pressed={theme === 'default'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[32px] ${
              theme === 'default'
                ? 'bg-white text-[#1C1E21] shadow-xs'
                : 'text-[#65676B] dark:text-[#B0B3B8] hover:text-[#1C1E21] dark:hover:text-[#E4E6EB]'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Default</span>
          </button>
          <button
            type="button"
            onClick={() => onSetTheme('dark')}
            aria-pressed={theme === 'dark'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[32px] ${
              theme === 'dark'
                ? 'bg-[#242526] text-[#E4E6EB] shadow-xs'
                : 'text-[#65676B] dark:text-[#B0B3B8] hover:text-[#1C1E21] dark:hover:text-[#E4E6EB]'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>
        </div>
      </div>
    </header>
  );
}
