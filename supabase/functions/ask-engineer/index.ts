import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AskRequest {
  question: string;
  history?: { role: "user" | "model"; text: string }[];
}

const SYSTEM_INSTRUCTION = `You are the AI assistant for Rugved Surve's software engineering portfolio. Your role is to help visitors — recruiters, hiring managers, and other engineers — explore and discover the portfolio's content.

STRICT RULES:
- Answer ONLY using the portfolio information provided as context below.
- NEVER invent professional experience, projects, technologies, achievements, statistics, qualifications, certifications, clients, users, business results, or any other personal information.
- If the portfolio does not contain the requested information, respond clearly: "I don't have that information in the portfolio yet."
- Keep responses concise and professional. Use short paragraphs and bullet points where helpful.
- When appropriate, recommend the relevant project or portfolio section the visitor should look at.
- If a question is about a specific project, reference it by its title (e.g., "JobSmart" or "PrintSmart").
- Do not use filler phrases like "Great question!" or "Let me help you with that."
- Be direct, factual, and easy to scan.

PORTFOLIO CONTEXT:

Profile:
- Name: Rugved Surve
- Monogram: R
- Role: AI Engineer & Full Stack Developer
- Location: Pune, India
- Tagline: I build software that solves real problems.
- Description: Computer Engineering student and developer building full-stack applications, backend systems, AI-powered solutions, and practical software projects.
- Email: rugvedsurve18@gmail.com
- Social & Web: Portfolio (https://rugvedsurve.in/), GitHub (https://github.com/rugved18-dev/), LinkedIn (https://www.linkedin.com/in/rugved-surve-2577a7321/), X (https://x.com)

Projects:

1. JobSmart
- Category: AI & Full Stack
- Description: Intelligent job discovery platform that aggregates opportunities from configured job platforms, removes duplicate listings, and ranks jobs based on relevance.
- Tech: React.js, NestJS, TypeScript, PostgreSQL, Prisma, Apify, AWS S3, Vercel, Render
- Live Demo: https://job-smaart.vercel.app/login

2. PrintSmart
- Category: Full Stack & Automation
- Description: Digital printing platform connecting customers with print shops. Customers upload PDFs/images while shopkeepers process printing workflows.
- Tech: Node.js, Express.js, PostgreSQL, Prisma ORM, AWS S3, JWT
- Live Demo: https://print-smart-18.vercel.app/

3. Batchmate Textbook Exchanger
- Category: MERN Stack
- Description: Campus-focused textbook exchange platform allowing students to buy, sell, and exchange academic books with college-email auth and OAuth.
- Tech: React.js, Node.js, Express.js, MongoDB, Mongoose, Google OAuth, Cloudinary
- Live Demo / Source: https://batchmate-textbook-exchanger.vercel.app/

4. Predictive Maintenance System
- Category: Machine Learning & AI
- Description: Predictive maintenance system analyzing industrial sensor data to identify machine failure risk using failure-prediction models and equipment-health visualization.
- Tech: Python, XGBoost, Scikit-learn, Pandas, NumPy, FastAPI, React
- GitHub: https://github.com/rugved18-dev/predictive-maintenance-system

5. Insurance Email Parser
- Category: Automation & Processing
- Description: Real-time insurance email monitoring and data-processing system that extracts relevant info from incoming emails using IMAP, APIs, and Google Sheets.
- Tech: Python, Gmail IMAP, REST APIs, Google Sheets API
- GitHub: https://github.com/rugved18-dev/Insurance-Parser

6. Hospital Management System
- Category: Backend & Mainframe
- Description: Hospital management system focused on structured patient data, DB design, queue-based workflows, and patient records.
- Tech: React.js, Node.js, IBM DB2, REST APIs, JavaScript
- GitHub: https://github.com/rugved18-dev/HospitalManagement

Skills & Technologies:
- Languages: Java, JavaScript, TypeScript, Python, COBOL, SQL
- Frontend: React.js, Vite, HTML5, CSS3, Tailwind CSS, TanStack
- Backend: Node.js, Express.js, Nest.js, Flask, FastAPI
- Infrastructure & Cloud: Docker, Kubernetes, Terraform, Cloudflare, CI/CD, AWS S3, Vercel, Render, Cloudinary
- Databases: MongoDB, MongoDB Atlas, MySQL, IBM DB2, PostgreSQL
- AI & ML: XGBoost, TensorFlow, Keras, Scikit-learn, Pandas, NumPy, SciPy

Work Experience:
- Backend Developer at BasicBrain / Mahant Enterprises (May 2026 — Present)
  - Engineered cloud storage and backend workflows using AWS S3 and Supabase PostgreSQL.
  - Supported multi-tenant order processing, pricing operations, transactional data integrity, A/B testing, and production SaaS stability.

Education:
- B.Tech, Computer Engineering at Vishwakarma Institute of Information Technology (V.I.I.T.), Pune (Aug. 2023 — Present) | CGPA 8.45 / 10
- Higher Secondary Education at Pragnya College of Management & Computer Studies, Pune (2021 — 2023) | 68.67%
- Secondary Education at Sadhana English Medium School, Pune (2021) | 83.60%

Certifications:
- GenAI Powered Data Analytics — Tata Group & The Forage (2025)
- Mainframe Launchpad Program — BMC Software India (2026)

Portfolio Metrics:
- 6+ years building
- 34 products shipped
- 12M requests served per month
- 98% Lighthouse median
- 2,400+ GitHub stars
- 18 talks and workshops
- 5 hackathons won`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { question, history } = (await req.json()) as AskRequest;

    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Question is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (question.length > 1000) {
      return new Response(
        JSON.stringify({ error: "Question is too long. Please keep it under 1000 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI assistant is temporarily unavailable." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.role === "model" ? "model" : "user",
          parts: [{ text: msg.text }],
        });
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: question }],
    });

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800,
            topP: 0.85,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errorBody);
      return new Response(
        JSON.stringify({ error: "AI assistant is temporarily unavailable." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiData = await geminiResponse.json();
    const text =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ??
      geminiData?.candidates?.[0]?.content?.parts?.map((p: { text: string }) => p.text).join("") ??
      null;

    if (!text) {
      return new Response(
        JSON.stringify({ error: "AI assistant is temporarily unavailable." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ response: text.trim() }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "AI assistant is temporarily unavailable." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
