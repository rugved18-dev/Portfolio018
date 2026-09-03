import { techStack } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReveal } from '@/hooks/useReveal';

export function TechStack() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="stack" className="py-20 lg:py-28">
      <div className="container-content">
        <SectionHeader
          number="03"
          label="Technology"
          title="Tools I work with."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-4`}
        >
          {techStack.map((group) => (
            <div key={group.category} className="bg-paper-50 p-6 lg:p-8">
              <span className="label-accent">{group.category}</span>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-ink-600">
                    <span className="h-1 w-1 rounded-full bg-accent-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
