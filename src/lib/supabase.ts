import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-supabase-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot anti-bot field
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SUBMISSION_COOLDOWN_MS = 60 * 1000; // 60 seconds rate limit per visitor

export async function submitContactMessage(
  submission: ContactSubmission
): Promise<{ success: boolean; error?: string }> {
  // 1. Honeypot check: if honeypot field is filled, silently reject bot submission
  if (submission.website && submission.website.trim().length > 0) {
    console.warn('Bot submission blocked via honeypot.');
    // Pretend success so bots do not retry with modified scripts
    return { success: true };
  }

  // 2. Validate input presence
  const name = submission.name.trim();
  const email = submission.email.trim();
  const message = submission.message.trim();

  if (!name || !email || !message) {
    return { success: false, error: 'Please complete all required fields.' };
  }

  // 3. Validate input lengths
  if (name.length > 100) {
    return { success: false, error: 'Name must not exceed 100 characters.' };
  }
  if (email.length > 100) {
    return { success: false, error: 'Email address must not exceed 100 characters.' };
  }
  if (message.length > 2000) {
    return { success: false, error: 'Message must not exceed 2000 characters.' };
  }

  // 4. Validate email format
  if (!EMAIL_REGEX.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  // 5. Anti-Spam Rate Limiting (client-side timestamp throttling)
  const lastSubmitStr = localStorage.getItem('last_contact_submission');
  if (lastSubmitStr) {
    const lastSubmitTime = parseInt(lastSubmitStr, 10);
    const elapsed = Date.now() - lastSubmitTime;
    if (elapsed < SUBMISSION_COOLDOWN_MS) {
      const remainingSecs = Math.ceil((SUBMISSION_COOLDOWN_MS - elapsed) / 1000);
      return {
        success: false,
        error: `Please wait ${remainingSecs} seconds before sending another message.`,
      };
    }
  }

  // 6. Submit to Supabase database if configured
  if (!supabase) {
    return {
      success: false,
      error: 'Database connection is unconfigured. Please use direct email.',
    };
  }

  try {
    const { error } = await supabase.from('contact_submissions').insert([
      {
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase DB error (masked from user):', error);
      return {
        success: false,
        error: 'Unable to send message right now. Please try again or email directly.',
      };
    }

    // Record submission timestamp for anti-spam rate limiting
    localStorage.setItem('last_contact_submission', Date.now().toString());

    return { success: true };
  } catch (err) {
    console.error('Unexpected error during contact submission:', err);
    return {
      success: false,
      error: 'Unable to send message right now. Please try again or email directly.',
    };
  }
}
