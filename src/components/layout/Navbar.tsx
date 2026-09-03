import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { navLinks, profile } from '@/data/portfolio';
import { Button } from '@/components/ui/Button';

type NavbarProps = {
  onAskEngineer: () => void;
};

export function Navbar({ onAskEngineer }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-ink-100 bg-paper/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-content flex h-16 items-center justify-between lg:h-[72px]">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#top');
          }}
          className="flex items-center gap-2.5"
          aria-label={`${profile.name} — home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-500 text-sm font-bold text-white">
            {profile.monogram}
          </span>
          <span className="text-sm font-semibold text-ink-900">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-ink-500 transition-colors duration-200 hover:text-accent-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={onAskEngineer}
            className="group inline-flex items-center gap-1.5 rounded-md border border-accent-500 px-4 py-2 text-sm font-medium text-accent-500 transition-all duration-200 hover:bg-accent-500 hover:text-white"
            aria-label="Ask the Engineer — AI Portfolio Assistant"
          >
            <span className="text-xs">✦</span>
            Ask the Engineer
            <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </button>
          <Button href="#contact" variant="primary" onClick={() => handleNavClick('#contact')}>
            Let&apos;s Talk
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink-700 transition-colors hover:bg-ink-100 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden">
          <div className="container-content flex flex-col gap-1 pb-6 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="rounded-md px-3 py-3 text-base font-medium text-ink-700 transition-colors hover:bg-ink-100"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 space-y-2.5 px-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onAskEngineer();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-accent-500 px-4 py-2.5 text-sm font-medium text-accent-500 transition-all duration-200 hover:bg-accent-500 hover:text-white"
              >
                <span className="text-xs">✦</span>
                Ask the Engineer
              </button>
              <Button
                href="#contact"
                variant="primary"
                onClick={() => handleNavClick('#contact')}
                className="w-full justify-center"
              >
                Let&apos;s Talk
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
