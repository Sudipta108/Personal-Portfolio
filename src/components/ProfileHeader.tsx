import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, MessageSquare, Phone, User } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import type { ProfileTab } from './FacebookHeader';

interface ProfileHeaderProps {
  activeTab: ProfileTab;
  onSelectTab: (tab: ProfileTab) => void;
  onOpenContact: () => void;
  onOpenPhotoLightbox: () => void;
}

const PROFILE_TABS: { key: ProfileTab; label: string }[] = [
  { key: 'posts', label: 'Posts' },
  { key: 'about', label: 'About' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
];

export function ProfileHeader({
  activeTab,
  onSelectTab,
  onOpenContact,
  onOpenPhotoLightbox,
}: ProfileHeaderProps) {
  const [imageError, setImageError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard blocked fallback
    }
  };

  return (
    <section className="bg-white dark:bg-[#242526] border-b border-[#DCE0E5] dark:border-[#3E4042] transition-colors duration-150">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-2">
        {/* Centered Profile Identity */}
        <div className="flex flex-col items-center text-center">
          {/* Centered Circular Profile Photo */}
          <button
            type="button"
            onClick={onOpenPhotoLightbox}
            aria-label="View profile photo"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-4 ring-[#F0F2F5] dark:ring-[#3E4042] bg-[#E4E6EB] dark:bg-[#3A3B3C] overflow-hidden shrink-0 shadow-sm hover:brightness-95 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
          >
            {!imageError ? (
              <img
                src={PROFILE.photoUrl}
                alt="Sudipta Halder profile photo"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#E4E6EB] dark:bg-[#3A3B3C] text-[#65676B] dark:text-[#B0B3B8]">
                <User className="w-12 h-12" />
              </div>
            )}
          </button>

          <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1E21] dark:text-[#E4E6EB]">
            {PROFILE.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-[#65676B] dark:text-[#B0B3B8]">
            {PROFILE.department} · {PROFILE.batch} · {PROFILE.institute}
          </p>
          <p className="mt-1.5 text-xs sm:text-sm text-[#65676B] dark:text-[#B0B3B8] max-w-xl">
            C, C++, Data Structure, Algorithm, Python, App Development · Interest in{' '}
            <span className="font-semibold text-[#1C1E21] dark:text-[#E4E6EB]">
              {PROFILE.interest}
            </span>
          </p>

          {/* Centered Profile Action Buttons & Theme Switcher */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] dark:bg-[#2D88FF] dark:hover:bg-[#3B93FF] rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1C1E21] dark:text-[#E4E6EB] bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-[#1877F2] dark:text-[#2D88FF]" />
                  <span>Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={`tel:${PROFILE.phone}`}
              aria-label="Call Sudipta Halder"
              className="inline-flex items-center justify-center w-10 h-10 text-[#1C1E21] dark:text-[#E4E6EB] bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-lg transition-colors shrink-0"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email Sudipta Halder"
              className="inline-flex items-center justify-center w-10 h-10 text-[#1C1E21] dark:text-[#E4E6EB] bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-lg transition-colors shrink-0"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile of Sudipta Halder"
              className="inline-flex items-center justify-center w-10 h-10 text-[#1C1E21] dark:text-[#E4E6EB] bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-lg transition-colors shrink-0"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile of Sudipta Halder"
              className="inline-flex items-center justify-center w-10 h-10 text-[#1C1E21] dark:text-[#E4E6EB] bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-lg transition-colors shrink-0"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Centered Facebook Profile Sub-Navigation Tabs */}
        <div className="mt-6 pt-1 border-t border-[#DCE0E5] dark:border-[#3E4042] flex items-center justify-center gap-1 overflow-x-auto">
          {PROFILE_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onSelectTab(tab.key)}
                className={`relative px-4 py-3 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[44px] ${
                  isActive
                    ? 'text-[#1877F2] dark:text-[#2D88FF]'
                    : 'text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] hover:text-[#1C1E21] dark:hover:text-[#E4E6EB]'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute inset-x-2 bottom-0 h-[3px] bg-[#1877F2] dark:bg-[#2D88FF] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
