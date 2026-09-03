import { aboutParagraphs, profile } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { useReveal } from '@/hooks/useReveal';

export function About() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="about" className="border-y border-ink-100 bg-paper-200/50 py-20 lg:py-28">
      <div className="container-content">
        <SectionHeader
          number="04"
          label="About"
          title="Technology is only valuable when it solves the right problem."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16`}
        >
          <div className="lg:col-span-7">
            <div className="space-y-5">
              {aboutParagraphs.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-600 lg:text-[17px]">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <SocialLinks />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-ink-100 bg-paper-50 p-6 lg:p-8">
              <span className="label-meta">Profile</span>

              <div className="mt-5 space-y-4">
                <div>
                  <span className="label-meta text-ink-300">Name</span>
                  <p className="mt-1 text-sm font-medium text-ink-800">{profile.name}</p>
                </div>
                <div>
                  <span className="label-meta text-ink-300">Role</span>
                  <p className="mt-1 text-sm font-medium text-ink-800">{profile.role}</p>
                </div>
                <div>
                  <span className="label-meta text-ink-300">Location</span>
                  <p className="mt-1 text-sm font-medium text-ink-800">{profile.location}</p>
                </div>
                <div>
                  <span className="label-meta text-ink-300">Focus</span>
                  <p className="mt-1 text-sm font-medium text-ink-800">
                    AI Engineering · Full-Stack · Backend & Applied ML
                  </p>
                </div>
                <div>
                  <span className="label-meta text-ink-300">Status</span>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-ink-800">
                    <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
                    Open for Product Engineering & Applied-AI roles
                  </p>
                </div>
              </div>

              {/* Portrait placeholder */}
              <div className="mt-6 flex h-32 items-center justify-center rounded-lg border border-dashed border-ink-200 bg-paper-100">
                <span className="label-meta">Portrait placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
