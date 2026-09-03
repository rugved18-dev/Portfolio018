import { Github, Linkedin, Mail, Globe, Twitter } from 'lucide-react';
import { socialLinks } from '@/data/portfolio';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  globe: Globe,
};

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon] || Globe;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={link.label}
            className="text-ink-400 transition-colors duration-200 hover:text-accent-500"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </a>
        );
      })}
    </div>
  );
}
