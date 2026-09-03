import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { useReveal } from '@/hooks/useReveal';
import { submitContactMessage } from '@/lib/supabase';

export function Contact() {
  const { ref, isVisible } = useReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot anti-spam field
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    // Attempt database insert
    const result = await submitContactMessage(formData);
    
    if (result.success) {
      // ONLY show success when Supabase INSERT completes cleanly
      setStatus('success');
      setFormData({ name: '', email: '', message: '', website: '' });
    } else {
      // Show error state when INSERT fails or database is unconfigured
      setStatus('error');
      setErrorMessage(
        result.error || 'Failed to send message to database. Please check Supabase setup.'
      );
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container-content">
        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto max-w-3xl`}
        >
          <div className="text-center">
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
          </div>

          {/* Contact Form */}
          <div className="mt-12 rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8 lg:p-10 shadow-sm">
            {status === 'success' ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent-500" />
                <h3 className="mt-4 text-xl font-bold text-ink-900">Message Sent!</h3>
                <p className="mt-2 text-sm text-ink-500">
                  Thank you for reaching out. Rugved will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-semibold text-accent-500 hover:text-accent-600"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field - invisible to real visitors, trap for automated bots */}
                <div className="hidden" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-ink-200 bg-paper-100 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={100}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-ink-200 bg-paper-100 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="How can Rugved help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-paper-100 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 resize-y"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50/50 p-3 text-xs text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-2 rounded-md bg-accent-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-accent-500"
                  >
                    <Mail className="h-4 w-4" />
                    Or email directly: {profile.email}
                  </a>
                </div>
              </form>
            )}
          </div>

          <div className="mt-10 flex items-center justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
