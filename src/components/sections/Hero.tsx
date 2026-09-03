import { ArrowRight } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { Button } from '@/components/ui/Button';
import { SystemFlowDiagram } from '@/components/visuals/SystemFlowDiagram';

type HeroProps = {
  onAskEngineer: () => void;
};

export function Hero({ onAskEngineer }: HeroProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container-content">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-accent-500" />
              <span className="label-accent">{profile.eyebrow}</span>
            </div>

            <h1 className="mt-6 text-display font-bold text-ink-900 text-balance">
              I build software that solves real-world problems.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
              {profile.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#work" variant="primary" onClick={() => scrollTo('#work')}>
                View Selected Work
                <ArrowRight className="h-4 w-4" />
              </Button>
              <button
                onClick={onAskEngineer}
                className="group inline-flex items-center gap-1.5 rounded-md border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-600 transition-all duration-200 hover:border-accent-500 hover:text-accent-500"
                aria-label="Ask the Engineer — AI Portfolio Assistant"
              >
                <span className="text-xs">✦</span>
                Ask the Engineer
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <div className="relative">
              <div className="absolute -top-4 right-0 hidden lg:block">
                <span className="label-meta">SYSTEM FLOW · v1.0</span>
              </div>
              <SystemFlowDiagram />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-50 opacity-40 blur-3xl" />
    </section>
  );
}
