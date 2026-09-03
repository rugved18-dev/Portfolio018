import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type SectionHeaderProps = {
  number: string;
  label: string;
  title: ReactNode;
  className?: string;
};

export function SectionHeader({ number, label, title, className = '' }: SectionHeaderProps) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      <div className="flex items-center gap-4">
        <span className="section-number">{number}</span>
        <span className="h-px w-8 bg-ink-200" />
        <span className="label-accent">{label}</span>
      </div>
      <h2 className="mt-5 max-w-2xl text-headline font-semibold text-ink-900 text-balance">
        {title}
      </h2>
    </div>
  );
}
