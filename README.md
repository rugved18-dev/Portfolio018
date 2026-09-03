# Rugved Surve — Production Portfolio & AI Engineer Showcase

> Computer Engineering student & full-stack developer building production applications, backend systems, AI solutions, and cloud infrastructure.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Edge%20Functions-3ecf8e?logo=supabase)
![Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?logo=googlegemini)

---

## 📌 Architecture Overview

```
Visitor (Browser)
  └─► Vercel-hosted React (Vite SPA)
        ├─► Contact Form ──► Supabase PostgreSQL (contact_submissions with RLS)
        └─► AI Assistant ──► Supabase Edge Function (ask-engineer) ──► Google Gemini API
```

* **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React icons.
* **Database & Persistence:** Supabase PostgreSQL with Row Level Security (RLS) for contact form submissions.
* **AI Edge Serverless Backend:** Supabase Deno Edge Function (`ask-engineer`) calling Google Gemini API server-side with strict rate-limiting, CORS, and prompt injection guards.
* **Security:** `GEMINI_API_KEY` exists strictly as a Supabase Edge Function secret. Never exposed to browser or git repository.

---

## 🚀 Step-by-Step Production Deployment Guide

### 1. Database Setup (Supabase PostgreSQL)
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) and create a project.
2. Open the **SQL Editor** and run the migration in [`supabase/migrations/20260903000000_create_contact_submissions.sql`](./supabase/migrations/20260903000000_create_contact_submissions.sql):
   ```sql
   CREATE TABLE IF NOT EXISTS public.contact_submissions (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       name TEXT NOT NULL,
       email TEXT NOT NULL,
       message TEXT NOT NULL,
       created_at TIMESTAMPTZ DEFAULT now() NOT NULL
   );

   ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow public insert to contact_submissions"
       ON public.contact_submissions
       FOR INSERT
       TO anon, authenticated
       WITH CHECK (true);
   ```

### 2. Backend Deployment (Supabase Edge Function)
1. Install Supabase CLI and log in:
   ```bash
   npx supabase login
   ```
2. Link your local project to your Supabase project ID:
   ```bash
   npx supabase link --project-ref <your-supabase-project-id>
   ```
3. Set your Google Gemini API Key as a server-side secret:
   ```bash
   npx supabase secrets set GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Deploy the Edge Function:
   ```bash
   npx supabase functions deploy ask-engineer --no-verify-jwt
   ```

### 3. Frontend Deployment (Vercel)
1. Push your code to GitHub.
2. Import repository into [Vercel](https://vercel.com).
3. Set the Framework Preset to **Vite**.
4. Configure Environment Variables in Vercel settings:
   - `VITE_SUPABASE_URL` = `https://<your-project-id>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `<your-supabase-anon-key>`
5. Click **Deploy**.

---

## 💻 Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment file
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env

# 3. Start local development server
npm run dev

# 4. Typecheck and lint
npm run typecheck
npm run lint

# 5. Build for production
npm run build
```

---

## 📄 Full Documentation

For detailed information on system architecture, component breakdown, data schemas, security audits, and testing checklists, see [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md).
