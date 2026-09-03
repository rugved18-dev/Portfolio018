import { portfolioMetrics } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReveal } from '@/hooks/useReveal';

export function Metrics() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="border-t border-ink-100 bg-paper-50 py-20 lg:py-24">
      <div className="container-content">
        <SectionHeader
          number="03"
          label="Metrics"
          title="Numbers worth keeping."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4`}
        >
          {portfolioMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col justify-between rounded-xl border border-ink-100 bg-paper-100/80 p-6 transition-all duration-200 hover:border-accent-500/30 hover:shadow-sm"
            >
              <span className="font-mono text-3xl font-bold tracking-tight text-ink-900 lg:text-4xl">
                {metric.value}
              </span>
              <span className="mt-3 text-xs font-medium uppercase tracking-wider text-ink-500">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
