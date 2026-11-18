import { useEffect } from 'react';
import { X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface PhotoLightboxProps {
  open: boolean;
  onClose: () => void;
}

export function PhotoLightbox({ open, onClose }: PhotoLightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${PROFILE.name} profile photo`}
      className="fixed inset-0 z-50 bg-black/85 p-4 sm:p-8 flex items-center justify-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-xl w-full bg-white dark:bg-[#242526] rounded-2xl overflow-hidden shadow-2xl border border-transparent dark:border-[#3E4042]">
        <div className="bg-[#0F172A] max-h-[75vh] flex items-center justify-center overflow-hidden">
          <img
            src={PROFILE.photoUrl}
            alt={PROFILE.name}
            referrerPolicy="no-referrer"
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>
        <div className="p-4 flex items-center justify-between gap-4 bg-white dark:bg-[#242526]">
          <div>
            <p className="font-display text-base font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
              {PROFILE.name}
            </p>
            <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">
              {PROFILE.institute} · {PROFILE.department} · {PROFILE.batch}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
