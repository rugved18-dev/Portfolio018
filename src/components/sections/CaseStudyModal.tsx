import { useEffect } from 'react';
import { ArrowRight, X, Github, ExternalLink, FileText } from 'lucide-react';
import type { Project } from '@/data/portfolio';
import { ProjectVisual } from '@/components/visuals/ProjectVisual';

type CaseStudyModalProps = {
  project: Project | null;
  onClose: () => void;
};

const caseStudySections = [
  { key: 'problem', number: '01', title: 'The Problem' },
  { key: 'context', number: '02', title: 'Context' },
  { key: 'role', number: '03', title: 'My Role' },
  { key: 'approach', number: '04', title: 'The Approach' },
  { key: 'challenge', number: '06', title: 'Challenge' },
  { key: 'solution', number: '07', title: 'Solution' },
  { key: 'outcome', number: '08', title: 'Outcome' },
] as const;

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-900/40 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div
        className="relative my-8 w-full max-w-3xl rounded-2xl border border-ink-100 bg-paper-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-paper-200 text-ink-500 transition-colors hover:bg-ink-200 hover:text-ink-800"
          onClick={onClose}
          aria-label="Close case study"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="section-number">{project.number}</span>
            <span className="h-px w-6 bg-ink-200" />
            <span className="label-accent">{project.category}</span>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-ink-900 sm:text-3xl">{project.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-ink-500">{project.shortDescription}</p>

          <div className="mt-6 overflow-hidden rounded-xl border border-ink-100">
            <ProjectVisual type={project.visual.type} label={project.visual.label} />
          </div>

          <div className="mt-8 space-y-6">
            {caseStudySections.map((section) => (
              <div key={section.key} className="border-l-2 border-ink-100 pl-5">
                <div className="flex items-center gap-2.5">
                  <span className="section-number">{section.number}</span>
                  <span className="label-meta">{section.title}</span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  {project[section.key as keyof Project] as string}
                </p>
              </div>
            ))}

            {/* Engineering decision */}
            <div className="border-l-2 border-accent-500 pl-5">
              <div className="flex items-center gap-2.5">
                <span className="section-number text-accent-500">05</span>
                <span className="label-accent">Engineering Decision</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                {project.engineeringDecision}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="mt-8 border-t border-ink-100 pt-6">
            <span className="label-meta">09 — Technologies</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-ink-100 bg-paper-100 px-3 py-1.5 font-mono text-xs text-ink-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.links.github || project.links.demo || project.links.docs) && (
            <div className="mt-6 border-t border-ink-100 pt-6">
              <span className="label-meta">10 — Links</span>
              <div className="mt-3 flex flex-wrap gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-500"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-500"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {project.links.docs && (
                  <a
                    href={project.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-500"
                  >
                    <FileText className="h-4 w-4" /> Documentation
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
