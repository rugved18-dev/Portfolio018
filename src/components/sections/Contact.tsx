import { ArrowRight, Mail } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { useReveal } from '@/hooks/useReveal';

export function Contact() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container-content">
        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl text-center`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-accent-500" />
            <span className="label-accent">Contact</span>
            <span className="h-px w-6 bg-accent-500" />
          </div>

          <h2 className="mt-6 text-headline font-bold text-ink-900 text-balance">
            Let&apos;s build something useful.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
            Open to conversations about software engineering, opportunities, collaboration, and
            interesting technical problems.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={`mailto:${profile.email}`}
              variant="primary"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-accent-500"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
