import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectVisual } from '@/components/visuals/ProjectVisual';
import { CaseStudyModal } from '@/components/sections/CaseStudyModal';
import { useReveal } from '@/hooks/useReveal';

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const projectId = (e as CustomEvent<string>).detail;
      const project = projects.find((p) => p.id === projectId);
      if (project) setActiveProject(project);
    };
    window.addEventListener('open-case-study', handler);
    return () => window.removeEventListener('open-case-study', handler);
  }, []);

  return (
    <section id="work" className="py-20 lg:py-28">
      <div className="container-content">
        <SectionHeader
          number="01"
          label="Selected Work"
          title="Things I've built."
        />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {projects.map((project) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              onViewCaseStudy={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

type ProjectShowcaseProps = {
  project: Project;
  onViewCaseStudy: () => void;
};

function ProjectShowcase({ project, onViewCaseStudy }: ProjectShowcaseProps) {
  const { ref, isVisible } = useReveal();

  const info = (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-3">
        <span className="section-number">{project.number}</span>
        <span className="h-px w-6 bg-ink-200" />
        <span className="label-accent">{project.category}</span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-ink-900 lg:text-2xl">{project.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-500">{project.shortDescription}</p>

      <dl className="mt-6 space-y-3">
        <div className="flex gap-3">
          <dt className="w-24 shrink-0 label-meta pt-0.5">Role</dt>
          <dd className="text-sm text-ink-600">{project.role}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-24 shrink-0 label-meta pt-0.5">Decision</dt>
          <dd className="text-sm text-ink-600">{project.engineeringDecision}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-24 shrink-0 label-meta pt-0.5">Stack</dt>
          <dd className="text-sm text-ink-600">{project.technologies.join(' · ')}</dd>
        </div>
      </dl>

      <button
        onClick={onViewCaseStudy}
        className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-500 transition-colors hover:text-accent-600"
      >
        View Case Study
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  );

  const visual = (
    <div
      className="cursor-pointer overflow-hidden rounded-xl border border-ink-100 transition-all duration-300 hover:border-ink-200 hover:shadow-lg"
      onClick={onViewCaseStudy}
    >
      <ProjectVisual type={project.visual.type} label={project.visual.label} className="h-full" />
    </div>
  );

  let layout: React.ReactNode;

  if (project.layout === 'image-left') {
    layout = (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">{visual}</div>
        <div className="lg:col-span-5">{info}</div>
      </div>
    );
  } else if (project.layout === 'image-right') {
    layout = (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 lg:order-1">{info}</div>
        <div className="lg:col-span-7 lg:order-2">{visual}</div>
      </div>
    );
  } else if (project.layout === 'full-width') {
    layout = (
      <div>
        <div className="overflow-hidden rounded-xl border border-ink-100 transition-all duration-300 hover:border-ink-200 hover:shadow-lg">
          <ProjectVisual
            type={project.visual.type}
            label={project.visual.label}
            className="min-h-[280px]"
          />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">{info}</div>
        </div>
      </div>
    );
  } else {
    layout = (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-xl border border-ink-100 transition-all duration-300 hover:border-ink-200 hover:shadow-lg">
          <ProjectVisual type={project.visual.type} label={project.visual.label} />
        </div>
        {info}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''}`}
    >
      {layout}
    </div>
  );
}
