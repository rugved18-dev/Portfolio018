import { profile } from '@/data/portfolio';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { navLinks } from '@/data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-paper-200/50">
      <div className="container-content py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-500 text-xs font-bold text-white">
                {profile.monogram}
              </span>
              <span className="text-sm font-semibold text-ink-900">{profile.name}</span>
            </div>
            <p className="mt-2 text-sm text-ink-400">{profile.role}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink-500 transition-colors hover:text-accent-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <SocialLinks />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-ink-100 pt-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-xs text-ink-400">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <p className="mt-1 text-xs italic text-ink-400">
              &quot;Software is a medium. Taste is the difference.&quot;
            </p>
          </div>
          <p className="font-mono text-xs text-ink-300">
            Built with React · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
