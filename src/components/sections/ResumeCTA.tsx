import { FileText, ArrowRight } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useReveal } from '@/hooks/useReveal';

export function ResumeCTA() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-16 lg:py-20">
      <div className="container-content">
        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} flex flex-col items-start justify-between gap-6 rounded-xl border border-ink-100 bg-paper-50 p-8 sm:flex-row sm:items-center lg:p-10`}
        >
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-ink-100 bg-paper-100">
              <FileText className="h-6 w-6 text-accent-500" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink-900">Want the complete picture?</h3>
              <p className="mt-1 text-sm text-ink-500">
                Download my resume for a full summary of my experience and education.
              </p>
            </div>
          </div>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-600"
          >
            Download Resume
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
