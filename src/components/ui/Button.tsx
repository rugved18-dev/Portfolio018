import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
};

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-white hover:bg-accent-600 border border-accent-500 hover:border-accent-600',
  secondary:
    'bg-transparent text-ink-800 hover:bg-ink-800 hover:text-white border border-ink-200 hover:border-ink-800',
  ghost:
    'bg-transparent text-ink-600 hover:text-accent-500 border border-transparent',
};

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

  const classes = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
