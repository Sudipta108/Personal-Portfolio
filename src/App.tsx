import { useEffect, useState } from 'react';
import {
  FacebookHeader,
  type ProfileTab,
  type ThemeMode,
} from './components/FacebookHeader';
import { ProfileHeader } from './components/ProfileHeader';
import { PostsFeed } from './components/PostsFeed';
import { AboutPanel } from './components/AboutPanel';
import { SkillsPanel } from './components/SkillsPanel';
import { ProjectsPanel } from './components/ProjectsPanel';
import { ContactModal } from './components/ContactModal';
import { PhotoLightbox } from './components/PhotoLightbox';
import { PROFILE } from './data/portfolioData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [contactOpen, setContactOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      return localStorage.getItem('profile-theme') === 'dark' ? 'dark' : 'default';
    } catch {
      return 'default';
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('profile-theme', theme);
    } catch {
      // Ignore storage restrictions
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F2F5] dark:bg-[#18191A] text-[#1C1E21] dark:text-[#E4E6EB] transition-colors duration-150">
      <FacebookHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        theme={theme}
        onSetTheme={setTheme}
      />

      <main className="flex-1 pb-12">
        <ProfileHeader
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenContact={() => setContactOpen(true)}
          onOpenPhotoLightbox={() => setLightboxOpen(true)}
        />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-5">
          {activeTab === 'posts' && (
            <PostsFeed
              onSelectTab={setActiveTab}
              onOpenContact={() => setContactOpen(true)}
            />
          )}

          {activeTab === 'about' && <AboutPanel />}

          {activeTab === 'skills' && <SkillsPanel />}

          {activeTab === 'projects' && (
            <ProjectsPanel onOpenContact={() => setContactOpen(true)} />
          )}
        </div>
      </main>

      <footer className="bg-white dark:bg-[#242526] border-t border-[#DCE0E5] dark:border-[#3E4042]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#65676B] dark:text-[#B0B3B8]">
          <p>
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.institute} · CSE{' '}
            {PROFILE.batch}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="hover:text-[#1877F2] dark:hover:text-[#2D88FF] hover:underline"
            >
              {PROFILE.email}
            </a>
            <a
              href={`tel:${PROFILE.phone}`}
              className="font-mono tabular-nums hover:text-[#1877F2] dark:hover:text-[#2D88FF] hover:underline"
            >
              {PROFILE.phone}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1877F2] dark:hover:text-[#2D88FF] hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1877F2] dark:hover:text-[#2D88FF] hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <PhotoLightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </div>
  );
}
