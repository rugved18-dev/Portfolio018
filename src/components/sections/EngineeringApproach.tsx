import { engineeringProcess } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReveal } from '@/hooks/useReveal';

export function EngineeringApproach() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="approach" className="border-y border-ink-100 bg-paper-200/50 py-20 lg:py-28">
      <div className="container-content">
        <SectionHeader
          number="02"
          label="Engineering Approach"
          title="How I build."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} mt-16`}
        >
          {/* Desktop: horizontal connected diagram */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-0 right-0 top-[60px] h-px bg-ink-100" aria-hidden="true" />

              <div className="grid grid-cols-4 gap-8">
                {engineeringProcess.map((step, i) => (
                  <div key={step.number} className="relative">
                    {/* Node on the line */}
                    <div className="absolute left-0 top-[52px] h-4 w-4 rounded-full border-2 border-accent-500 bg-paper-100" />

                    <div className="pt-24">
                      <span className="section-number">{step.number}</span>
                      <h3 className="mt-2 text-lg font-semibold text-ink-900">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow between nodes */}
                    {i < engineeringProcess.length - 1 && (
                      <div className="absolute right-[-16px] top-[56px] text-ink-300" aria-hidden="true">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/tablet: vertical connected diagram */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-100" aria-hidden="true" />

              <div className="space-y-8">
                {engineeringProcess.map((step) => (
                  <div key={step.number} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-accent-500 bg-paper-100" />
                    <span className="section-number">{step.number}</span>
                    <h3 className="mt-1 text-base font-semibold text-ink-900">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
