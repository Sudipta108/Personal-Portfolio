import { ArrowUpRight, BookOpen, CheckCircle2, Layers } from 'lucide-react';
import { PROFILE, PROJECTS } from '../data/portfolioData';

interface ProjectsPanelProps {
  onOpenContact: () => void;
}

export function ProjectsPanel({ onOpenContact }: ProjectsPanelProps) {
  return (
    <div className="space-y-5">
      {PROJECTS.map((project) => (
        <article
          key={project.id}
          className="bg-white dark:bg-[#242526] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl p-5 sm:p-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E4E6EB] dark:border-[#3E4042]">
            <div>
              <p className="text-xs font-medium text-[#1877F2] dark:text-[#2D88FF]">
                {project.category} · {project.audience}
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#1C1E21] dark:text-[#E4E6EB]">
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-[#65676B] dark:text-[#B0B3B8]">
                {project.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] dark:bg-[#2D88FF] dark:hover:bg-[#3B93FF] rounded-lg transition-colors whitespace-nowrap shrink-0 self-start"
            >
              <span>Discuss Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Overview */}
          <div className="mt-6">
            <h3 className="font-display text-base font-bold text-[#1C1E21] dark:text-[#E4E6EB] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1877F2] dark:text-[#2D88FF]" />
              <span>Project Overview</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#3A3B3C] dark:text-[#B0B3B8]">
              {project.overview}
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl">
              <h4 className="text-xs font-semibold text-[#65676B] dark:text-[#B0B3B8]">
                Problem Addressed
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#1C1E21] dark:text-[#E4E6EB]">
                {project.problem}
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl">
              <h4 className="text-xs font-semibold text-[#1877F2] dark:text-[#2D88FF]">
                Implemented Approach
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#1C1E21] dark:text-[#E4E6EB]">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-7">
            <h3 className="font-display text-base font-bold text-[#1C1E21] dark:text-[#E4E6EB] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1877F2] dark:text-[#2D88FF]" />
              <span>Key Features &amp; Design Details</span>
            </h3>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature) => (
                <div
                  key={feature.index}
                  className="p-4 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#1877F2] dark:text-[#2D88FF]">
                    <span>{feature.index}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-sans font-semibold text-sm text-[#1C1E21] dark:text-[#E4E6EB]">
                      {feature.title}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4B4F56] dark:text-[#B0B3B8]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Metadata Footer */}
          <div className="mt-6 pt-5 border-t border-[#E4E6EB] dark:border-[#3E4042] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#65676B] dark:text-[#B0B3B8]">
              <Layers className="w-4 h-4 shrink-0" />
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {project.technologies.map((tech, idx) => (
                  <span key={tech} className="inline-flex items-center gap-2">
                    <span>{tech}</span>
                    {idx < project.technologies.length - 1 && (
                      <span aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </span>
            </div>

            <span className="text-xs text-[#65676B] dark:text-[#B0B3B8]">
              Built by {PROFILE.name} ({PROFILE.batch})
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
