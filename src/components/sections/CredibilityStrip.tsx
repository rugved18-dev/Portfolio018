import { credibilityItems } from '@/data/portfolio';

export function CredibilityStrip() {
  return (
    <section className="border-y border-ink-100 bg-paper-200/60">
      <div className="container-content py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-between">
          {credibilityItems.map((item, i) => (
            <div key={item} className="flex items-center gap-8">
              <span className="text-sm font-medium text-ink-500">{item}</span>
              {i < credibilityItems.length - 1 && (
                <span className="hidden h-1 w-1 rounded-full bg-ink-200 lg:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
