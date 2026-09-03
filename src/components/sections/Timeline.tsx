import { timeline, type TimelineEntry } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReveal } from '@/hooks/useReveal';

export function Timeline() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="experience" className="py-20 lg:py-28">
      <div className="container-content">
        <SectionHeader
          number="05"
          label="Experience & Education"
          title="Where I've worked and studied."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} mt-12 max-w-3xl`}
        >
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-ink-100" aria-hidden="true" />

            <div className="space-y-10">
              {timeline.map((entry) => (
                <TimelineItem key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const nodeBorder =
    entry.type === 'experience'
      ? 'border-accent-500 bg-paper-100'
      : entry.type === 'certification'
      ? 'border-amber-500 bg-paper-100'
      : 'border-ink-300 bg-paper-100';

  return (
    <div className="relative pl-10">
      {/* Node */}
      <div
        className={`absolute left-[-7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${nodeBorder}`}
      />

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-base font-semibold text-ink-900">{entry.role}</h3>
          <span className="font-mono text-xs text-ink-400">{entry.date}</span>
        </div>
        <p className="text-sm font-medium text-accent-500">{entry.organization}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{entry.description}</p>
        {entry.link && (
          <a
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-accent-500 hover:underline"
          >
            View Certificate &rarr;
          </a>
        )}
        {entry.technologies && (
          <div className="mt-2 flex flex-wrap gap-2">
            {entry.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-ink-100 bg-paper-100 px-2.5 py-1 font-mono text-[11px] text-ink-500"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
