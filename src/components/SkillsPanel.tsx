import { useState } from 'react';
import { SKILLS, type SkillItem } from '../data/portfolioData';

type FilterKey = 'all' | SkillItem['category'];

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Skills' },
  { key: 'languages', label: 'Languages & DSA' },
  { key: 'development', label: 'App Development' },
  { key: 'security', label: 'Cyber Security' },
];

export function SkillsPanel() {
  const [filter, setFilter] = useState<FilterKey>('all');

  const items =
    filter === 'all' ? SKILLS : SKILLS.filter((skill) => skill.category === filter);

  return (
    <div className="bg-white dark:bg-[#242526] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E4E6EB] dark:border-[#3E4042]">
        <div>
          <h2 className="font-display text-xl font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
            Skills &amp; Cyber Security
          </h2>
          <p className="text-xs sm:text-sm text-[#65676B] dark:text-[#B0B3B8] mt-0.5">
            Core programming languages, data structures, app development, and security focus
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-lg self-start sm:self-auto">
          {FILTER_OPTIONS.map((option) => {
            const active = filter === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setFilter(option.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white dark:bg-[#242526] text-[#1877F2] dark:text-[#2D88FF] shadow-xs'
                    : 'text-[#65676B] dark:text-[#B0B3B8] hover:text-[#1C1E21] dark:hover:text-[#E4E6EB]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((skill) => (
          <article
            key={skill.id}
            className={`rounded-xl p-5 border flex flex-col justify-between ${
              skill.category === 'security'
                ? 'bg-[#0F172A] dark:bg-[#162033] border-[#1E293B] dark:border-[#2D88FF]/40 text-white'
                : 'bg-[#F8F9FA] dark:bg-[#18191A] border-[#DCE0E5] dark:border-[#3E4042] text-[#1C1E21] dark:text-[#E4E6EB]'
            }`}
          >
            <div>
              <div
                className={`flex items-center justify-between text-xs font-medium ${
                  skill.category === 'security'
                    ? 'text-[#94A3B8]'
                    : 'text-[#65676B] dark:text-[#B0B3B8]'
                }`}
              >
                <span className="font-mono tabular-nums">{skill.index}</span>
                <span>{skill.categoryLabel}</span>
              </div>

              <h3 className="mt-3 font-display text-lg font-bold tracking-tight">
                {skill.name}
              </h3>

              <p
                className={`mt-2 text-sm leading-relaxed ${
                  skill.category === 'security'
                    ? 'text-[#CBD5E1]'
                    : 'text-[#4B4F56] dark:text-[#B0B3B8]'
                }`}
              >
                {skill.summary}
              </p>
            </div>

            <div
              className={`mt-4 pt-3 border-t text-xs flex flex-wrap items-center gap-x-2 gap-y-1 ${
                skill.category === 'security'
                  ? 'border-[#1E293B] text-[#94A3B8]'
                  : 'border-[#DCE0E5] dark:border-[#3E4042] text-[#65676B] dark:text-[#B0B3B8]'
              }`}
            >
              {skill.focusAreas.map((area, idx) => (
                <span key={area} className="inline-flex items-center gap-2">
                  <span>{area}</span>
                  {idx < skill.focusAreas.length - 1 && <span aria-hidden="true">·</span>}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
