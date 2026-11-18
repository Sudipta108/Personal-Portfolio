import { useState } from 'react';
import {
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  QrCode,
  Shield,
  User,
} from 'lucide-react';
import { PROFILE, SKILLS } from '../data/portfolioData';

type AboutCategory = 'overview' | 'education' | 'skills' | 'contact';

const ABOUT_MENU: { key: AboutCategory; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills & Cyber Security' },
  { key: 'contact', label: 'Contact Info' },
];

export function AboutPanel() {
  const [section, setSection] = useState<AboutCategory>('overview');

  const renderPersonalQrBlock = () => (
    <div className="mt-6 pt-6 border-t border-[#E4E6EB] dark:border-[#3E4042]">
      <div className="p-4 sm:p-5 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="bg-white p-2.5 rounded-xl border border-[#DCE0E5] shrink-0">
          <img
            src={PROFILE.qrCodeUrl}
            alt="QR code containing Sudipta Halder's personal details"
            referrerPolicy="no-referrer"
            className="w-32 h-32 object-contain block"
          />
        </div>

        <div className="text-center sm:text-left flex-1">
          <p className="text-sm font-bold text-[#1C1E21] dark:text-[#E4E6EB] inline-flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-[#1877F2] dark:text-[#2D88FF]" />
            <span>Personal Details QR Code</span>
          </p>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#4B4F56] dark:text-[#B0B3B8]">
            Scan this QR code with your phone camera to quickly access {PROFILE.name}&apos;s
            personal details.
          </p>
          <div className="mt-3">
            <a
              href={PROFILE.qrCodeUrl}
              download="Sudipta_Halder_QR.png"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1C1E21] dark:text-[#E4E6EB] bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download QR</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#242526] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
      {/* Left Vertical Menu (Classic Facebook About Layout) */}
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#DCE0E5] dark:border-[#3E4042] p-4 sm:p-5">
        <h2 className="font-display text-xl font-bold text-[#1C1E21] dark:text-[#E4E6EB] px-2">
          About
        </h2>
        <nav aria-label="About sections" className="mt-3 space-y-1">
          {ABOUT_MENU.map((item) => {
            const active = section === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSection(item.key)}
                className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  active
                    ? 'bg-[#E7F3FF] text-[#1877F2] dark:bg-[#2D88FF]/15 dark:text-[#2D88FF]'
                    : 'text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] hover:text-[#1C1E21] dark:hover:text-[#E4E6EB]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Content Pane */}
      <div className="md:col-span-8 p-5 sm:p-8 space-y-6">
        {section === 'overview' && (
          <div className="space-y-5">
            <h3 className="font-display text-lg font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
              Overview
            </h3>
            <div className="space-y-4 text-sm text-[#1C1E21] dark:text-[#E4E6EB]">
              <div className="flex items-start gap-3.5">
                <User className="w-5 h-5 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">{PROFILE.name}</p>
                  <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">Full Name</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <GraduationCap className="w-5 h-5 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">
                    Studies {PROFILE.department} ({PROFILE.batch}) at {PROFILE.institute}
                  </p>
                  <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">
                    Undergraduate Program
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Shield className="w-5 h-5 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Interested in {PROFILE.interest}</p>
                  <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">
                    Primary Focus Area
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Code2 className="w-5 h-5 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">
                    C programming, C++, Data Structure, Algorithm, Python, App Development
                  </p>
                  <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">
                    Core Technical Stack
                  </p>
                </div>
              </div>
            </div>
            {renderPersonalQrBlock()}
          </div>
        )}

        {section === 'education' && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
              Education
            </h3>
            <div className="p-4 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl flex items-start gap-3.5">
              <GraduationCap className="w-5 h-5 text-[#1877F2] dark:text-[#2D88FF] mt-0.5 shrink-0" />
              <div>
                <p className="font-display text-base font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
                  {PROFILE.institute}
                </p>
                <p className="text-sm text-[#3A3B3C] dark:text-[#B0B3B8] mt-0.5">
                  Department of {PROFILE.department}
                </p>
                <p className="text-xs text-[#65676B] dark:text-[#B0B3B8] mt-1 font-mono tabular-nums">
                  {PROFILE.batch}
                </p>
              </div>
            </div>
          </div>
        )}

        {section === 'skills' && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
              Skills &amp; Cyber Security
            </h3>
            <div className="divide-y divide-[#E4E6EB] dark:divide-[#3E4042] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl overflow-hidden">
              {SKILLS.map((skill) => (
                <div key={skill.id} className="p-4 bg-white dark:bg-[#18191A]">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-[#1C1E21] dark:text-[#E4E6EB]">
                      {skill.name}
                    </p>
                    <span className="text-xs text-[#65676B] dark:text-[#B0B3B8]">
                      {skill.categoryLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#4B4F56] dark:text-[#B0B3B8]">
                    {skill.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'contact' && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
              Contact Info
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
                <div>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-semibold text-[#1877F2] dark:text-[#2D88FF] hover:underline"
                  >
                    {PROFILE.email}
                  </a>
                  <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">Email</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
                <div>
                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="font-mono tabular-nums font-semibold text-[#1C1E21] dark:text-[#E4E6EB] hover:text-[#1877F2] dark:hover:text-[#2D88FF]"
                  >
                    {PROFILE.phone}
                  </a>
                  <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">Mobile</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Linkedin className="w-5 h-5 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1877F2] dark:text-[#2D88FF] hover:underline break-all"
                  >
                    {PROFILE.linkedinLabel}
                  </a>
                  <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">LinkedIn</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Github className="w-5 h-5 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1877F2] dark:text-[#2D88FF] hover:underline break-all"
                  >
                    {PROFILE.githubLabel}
                  </a>
                  <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">GitHub</p>
                </div>
              </div>
            </div>
            {renderPersonalQrBlock()}
          </div>
        )}
      </div>
    </div>
  );
}
