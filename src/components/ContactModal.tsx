import { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [copiedField, setCopiedField] = useState<
    'email' | 'phone' | 'linkedin' | 'github' | null
  >(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleCopy = async (
    value: string,
    field: 'email' | 'phone' | 'linkedin' | 'github'
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setReady(true);
  };

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `Message from ${name || 'Visitor'}`
  )}&body=${encodeURIComponent(message)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Message ${PROFILE.name}`}
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs p-4 flex items-center justify-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-[#242526] border border-[#DCE0E5] dark:border-[#3E4042] rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#E4E6EB] dark:border-[#3E4042]">
          <div className="flex items-center gap-3">
            <img
              src={PROFILE.photoUrl}
              alt={PROFILE.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover object-top border border-[#DCE0E5] dark:border-[#3E4042]"
            />
            <div>
              <h2 className="font-display text-base font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
                Message {PROFILE.name}
              </h2>
              <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">
                {PROFILE.institute} · CSE {PROFILE.batch}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close message dialog"
            className="w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E4E6EB] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] flex items-center justify-center text-[#1C1E21] dark:text-[#E4E6EB] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Direct Info Strip */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-3 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] text-[#65676B] dark:text-[#B0B3B8] flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </p>
              <p className="text-xs font-medium text-[#1C1E21] dark:text-[#E4E6EB] truncate mt-0.5">
                {PROFILE.email}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(PROFILE.email, 'email')}
              aria-label="Copy email"
              className="p-1.5 rounded-lg bg-white dark:bg-[#3A3B3C] border border-[#DCE0E5] dark:border-[#3E4042] hover:bg-[#F0F2F5] dark:hover:bg-[#4E4F50] text-[#1C1E21] dark:text-[#E4E6EB] shrink-0"
            >
              {copiedField === 'email' ? (
                <Check className="w-3.5 h-3.5 text-[#1877F2] dark:text-[#2D88FF]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <div className="p-3 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] text-[#65676B] dark:text-[#B0B3B8] flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>Phone</span>
              </p>
              <p className="text-xs font-mono tabular-nums font-medium text-[#1C1E21] dark:text-[#E4E6EB] truncate mt-0.5">
                {PROFILE.phone}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(PROFILE.phone, 'phone')}
              aria-label="Copy phone number"
              className="p-1.5 rounded-lg bg-white dark:bg-[#3A3B3C] border border-[#DCE0E5] dark:border-[#3E4042] hover:bg-[#F0F2F5] dark:hover:bg-[#4E4F50] text-[#1C1E21] dark:text-[#E4E6EB] shrink-0"
            >
              {copiedField === 'phone' ? (
                <Check className="w-3.5 h-3.5 text-[#1877F2] dark:text-[#2D88FF]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <div className="p-3 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] text-[#65676B] dark:text-[#B0B3B8] flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                <span>LinkedIn</span>
              </p>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#1877F2] dark:text-[#2D88FF] hover:underline truncate mt-0.5 inline-flex items-center gap-1 max-w-full"
              >
                <span className="truncate">{PROFILE.linkedinLabel}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(PROFILE.linkedin, 'linkedin')}
              aria-label="Copy LinkedIn profile link"
              className="p-1.5 rounded-lg bg-white dark:bg-[#3A3B3C] border border-[#DCE0E5] dark:border-[#3E4042] hover:bg-[#F0F2F5] dark:hover:bg-[#4E4F50] text-[#1C1E21] dark:text-[#E4E6EB] shrink-0"
            >
              {copiedField === 'linkedin' ? (
                <Check className="w-3.5 h-3.5 text-[#1877F2] dark:text-[#2D88FF]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <div className="p-3 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] text-[#65676B] dark:text-[#B0B3B8] flex items-center gap-1">
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </p>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#1877F2] dark:text-[#2D88FF] hover:underline truncate mt-0.5 inline-flex items-center gap-1 max-w-full"
              >
                <span className="truncate">{PROFILE.githubLabel}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(PROFILE.github, 'github')}
              aria-label="Copy GitHub profile link"
              className="p-1.5 rounded-lg bg-white dark:bg-[#3A3B3C] border border-[#DCE0E5] dark:border-[#3E4042] hover:bg-[#F0F2F5] dark:hover:bg-[#4E4F50] text-[#1C1E21] dark:text-[#E4E6EB] shrink-0"
            >
              {copiedField === 'github' ? (
                <Check className="w-3.5 h-3.5 text-[#1877F2] dark:text-[#2D88FF]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Quick Email Form */}
        {ready ? (
          <div className="mt-5 p-4 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl space-y-3">
            <p className="text-sm font-semibold text-[#1C1E21] dark:text-[#E4E6EB]">
              Ready to send to {PROFILE.email}
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] dark:bg-[#2D88FF] dark:hover:bg-[#3B93FF] rounded-lg"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open Email App</span>
              </a>
              <button
                type="button"
                onClick={() => setReady(false)}
                className="px-4 py-2 text-xs font-semibold text-[#1C1E21] dark:text-[#E4E6EB] bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-lg"
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-lg text-[#1C1E21] dark:text-[#E4E6EB] placeholder:text-[#8A8D91] focus:outline-none focus:border-[#1877F2] dark:focus:border-[#2D88FF]"
            />
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-lg text-[#1C1E21] dark:text-[#E4E6EB] placeholder:text-[#8A8D91] focus:outline-none focus:border-[#1877F2] dark:focus:border-[#2D88FF] resize-y"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F0F2F5] dark:hover:bg-[#3A3B3C] rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] dark:bg-[#2D88FF] dark:hover:bg-[#3B93FF] rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Prepare Email</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
