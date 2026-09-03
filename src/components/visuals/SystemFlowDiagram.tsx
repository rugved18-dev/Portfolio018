import { useReveal } from '@/hooks/useReveal';

const steps = [
  { label: 'THINK', sublabel: 'Understand' },
  { label: 'DESIGN', sublabel: 'Architect' },
  { label: 'BUILD', sublabel: 'Develop' },
  { label: 'SOLVE', sublabel: 'Deliver' },
];

export function SystemFlowDiagram() {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} rounded-xl border border-ink-100 bg-paper-50 p-6 lg:p-8`}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="label-meta">PROCESS DIAGRAM</span>
        <span className="label-meta text-ink-300">04 STAGES</span>
      </div>

      <div className="space-y-1">
        {steps.map((step, i) => (
          <div key={step.label}>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-paper-100">
                <span className="font-mono text-xs font-medium text-accent-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-ink-900">{step.label}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-ink-400">
                  {step.sublabel}
                </div>
              </div>
              <div className="h-2 w-2 rounded-full bg-accent-500" />
            </div>
            {i < steps.length - 1 && (
              <div className="ml-5 h-6 w-px bg-ink-200" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-ink-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="label-meta">INPUT</span>
          <span className="label-meta text-ink-300">→</span>
          <span className="label-meta">OUTPUT</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-ink-400">
          <span>Problem</span>
          <span>Solution</span>
        </div>
      </div>
    </div>
  );
}
