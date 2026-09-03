// Centralized portfolio data — replace placeholder content with real information.

export const profile = {
  name: 'Rugved Surve',
  monogram: 'R',
  role: 'AI Engineer & Full Stack Developer',
  tagline: 'I build software that solves real problems.',
  eyebrow: 'AI Engineering · Full-Stack Development',
  description:
    'Computer Engineering student and developer building full-stack applications, backend systems, AI-powered solutions, and practical software projects.',
  email: 'rugvedsurve18@gmail.com',
  resumeUrl: '/resume.pdf',
  portrait: null as string | null,
  location: 'Pune, India',
};

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const credibilityItems = [
  'Computer Engineering Student',
  'Full-Stack Developer',
  'Backend Developer',
  'AI Engineer & Applied ML',
  'Production Software & Automation',
];

export type Project = {
  id: string;
  number: string;
  category: string;
  title: string;
  shortDescription: string;
  problem: string;
  context: string;
  role: string;
  approach: string;
  challenge: string;
  solution: string;
  outcome: string;
  engineeringDecision: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  layout: 'image-left' | 'image-right' | 'full-width' | 'compact';
  visual: {
    type: 'dashboard' | 'analytics' | 'terminal' | 'mobile';
    label: string;
  };
};

export const projects: Project[] = [
  {
    id: 'jobsmart',
    number: '01',
    category: 'AI & Full Stack',
    title: 'JobSmart',
    shortDescription:
      'Intelligent job discovery platform that aggregates opportunities, removes duplicate listings, and ranks jobs based on relevance.',
    problem:
      'Job seekers waste hours scrolling through fragmented job boards, encountering duplicate listings and irrelevant recommendations.',
    context:
      'Built to aggregate listings across configured platforms into a unified, relevance-ranked feed for a streamlined job search experience.',
    role: 'Full Stack & AI Engineer — designed data aggregation pipelines, recommendation logic, and responsive UI.',
    approach:
      'Integrated scraping and API sources via Apify, backed by NestJS and PostgreSQL with Prisma ORM for efficient listing management.',
    challenge:
      'Removing cross-platform duplicate job postings accurately while scoring relevance dynamically for each user.',
    solution:
      'Implemented content-hashing and similarity algorithms to filter duplicates alongside dynamic vector scoring for personalized relevance.',
    outcome:
      'Created a focused, high-signal job discovery platform deployed on Vercel and Render.',
    engineeringDecision:
      'Used NestJS with Prisma and PostgreSQL to ensure strong type safety, relational integrity, and rapid query execution.',
    technologies: ['React.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Apify', 'AWS S3', 'Vercel', 'Render'],
    links: {
      github: 'https://github.com/rugved18-dev/JobSmart',
      demo: 'https://job-smaart.vercel.app/login',
    },
    layout: 'image-left',
    visual: { type: 'dashboard', label: 'JobSmart Platform' },
  },
  {
    id: 'printsmart',
    number: '02',
    category: 'Full Stack & Automation',
    title: 'PrintSmart',
    shortDescription:
      'Digital printing platform connecting customers with print shops to streamline document upload and printing workflows.',
    problem:
      'Traditional print shop orders suffer from long wait times, manual file handoffs, and cumbersome print queue management.',
    context:
      'Designed for students and print vendors to manage print orders, document previews, and fulfillment status in real-time.',
    role: 'Full Stack Developer — built backend REST services, JWT auth, AWS S3 storage pipeline, and print queue UI.',
    approach:
      'Constructed an Express.js backend with PostgreSQL/Prisma for order tracking and secure file hosting via AWS S3.',
    challenge:
      'Handling multi-format file uploads (PDF, DOCX, images) securely with fast file processing for shopkeeper dashboards.',
    solution:
      'Direct S3 pre-signed upload URLs and async job status updates to keep order processing responsive and scalable.',
    outcome:
      'Streamlined print workflows, reduced shop counter waiting times, and provided live order status tracking.',
    engineeringDecision:
      'Chose S3 pre-signed URLs to offload heavy file transfers from the Node.js API server directly to cloud storage.',
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'AWS S3', 'JWT', 'React.js'],
    links: {
      github: 'https://github.com/rugved18-dev/PrintSmart',
      demo: 'https://print-smart-18.vercel.app/',
    },
    layout: 'image-right',
    visual: { type: 'dashboard', label: 'PrintSmart Portal' },
  },
  {
    id: 'batchmate',
    number: '03',
    category: 'MERN Stack',
    title: 'Batchmate Textbook Exchanger',
    shortDescription:
      'Campus-focused textbook exchange platform allowing students to buy, sell, and exchange academic books.',
    problem:
      'Students struggle to buy affordable academic books or resell used textbooks within their own campus community.',
    context:
      'A peer-to-peer campus marketplace requiring verified student identities and easy listing search/filtering.',
    role: 'MERN Developer — created college-email auth system, Google OAuth integration, listing filters, and Cloudinary media pipelines.',
    approach:
      'Leveraged MongoDB and Express for flexible listing schema, paired with a clean React interface for search and filters.',
    challenge:
      'Ensuring trust and verified student access while keeping image upload fast and lightweight.',
    solution:
      'Enforced domain-restricted email authentication alongside Google OAuth, using Cloudinary for instant image optimization.',
    outcome:
      'Facilitated affordable peer-to-peer textbook distribution within campus communities.',
    engineeringDecision:
      'Selected MongoDB for dynamic document schemas to accommodate varying book metadata, condition ratings, and edition tags.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Google OAuth', 'Cloudinary'],
    links: {
      github: 'https://batchmate-textbook-exchanger.vercel.app/',
      demo: 'https://batchmate-textbook-exchanger.vercel.app/',
    },
    layout: 'full-width',
    visual: { type: 'mobile', label: 'Batchmate Campus Marketplace' },
  },
  {
    id: 'predictive-maintenance',
    number: '04',
    category: 'Machine Learning & AI',
    title: 'Predictive Maintenance System',
    shortDescription:
      'Industrial sensor analytics system identifying machine failure risks and supporting proactive maintenance.',
    problem:
      'Unplanned equipment downtime causes massive industrial losses that could be prevented with predictive monitoring.',
    context:
      'Analyzes telemetry and sensor streams to predict equipment health and failure probabilities before breakdown occurs.',
    role: 'ML & Backend Developer — built feature engineering pipelines, trained XGBoost failure prediction models, and exposed FastAPI endpoints.',
    approach:
      'Engineered time-series features from raw sensor data, trained classification models using XGBoost, and wrapped inference inside FastAPI.',
    challenge:
      'Handling highly imbalanced sensor data and preventing false negatives on critical component failures.',
    solution:
      'Applied SMOTE oversampling, custom cost matrix loss functions, and probability thresholding tuned for high recall.',
    outcome:
      'Delivered clear equipment-health visualizations and early failure risk indicators.',
    engineeringDecision:
      'Selected XGBoost over deep neural nets due to tabular sensor data structure, superior interpretability, and low inference latency.',
    technologies: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'NumPy', 'FastAPI', 'React'],
    links: {
      github: 'https://github.com/rugved18-dev/predictive-maintenance-system',
    },
    layout: 'compact',
    visual: { type: 'analytics', label: 'Sensor Analytics Engine' },
  },
  {
    id: 'insurance-parser',
    number: '05',
    category: 'Automation & Processing',
    title: 'Insurance Email Parser',
    shortDescription:
      'Real-time insurance email monitoring and data-processing system extracting structured information into automated workflows.',
    problem:
      'Manual processing of incoming insurance claim email notifications is error-prone, slow, and labor-intensive.',
    context:
      'Automates extraction of policy numbers, claim amounts, and client details directly into structured spreadsheets and databases.',
    role: 'Automation Developer — implemented Gmail IMAP listener, regex pattern matchers, REST API hooks, and Google Sheets sync.',
    approach:
      'Created an event-driven Python daemon listening to mailbox streams, extracting key payload fields, and calling downstream APIs.',
    challenge:
      'Parsing highly inconsistent email formats, unstructured text signatures, and attachment metadata accurately.',
    solution:
      'Combined regex extraction rules with fuzzy string matching and validation fallback handlers to maintain 99%+ extraction accuracy.',
    outcome:
      'Automated insurance email logging, eliminating manual data entry for operational workflows.',
    engineeringDecision:
      'Decoupled email retrieval from parsing logic using queue processing to prevent missing events during high mail volume spikes.',
    technologies: ['Python', 'Gmail IMAP', 'REST APIs', 'Google Sheets API'],
    links: {
      github: 'https://github.com/rugved18-dev/Insurance-Parser',
    },
    layout: 'compact',
    visual: { type: 'terminal', label: 'Email Parser Workflow' },
  },
  {
    id: 'hospital-management',
    number: '06',
    category: 'Backend & Mainframe',
    title: 'Hospital Management System',
    shortDescription:
      'Enterprise backend and database system for structured patient records and queue-based hospital workflows.',
    problem:
      'Managing patient admissions, queue states, and diagnostic records across enterprise systems requires transactional consistency.',
    context:
      'Structured enterprise database design linking frontend clinical dashboards with backend record-keeping engines.',
    role: 'Backend & Database Engineer — designed relational schema on IBM DB2 and built RESTful service layer.',
    approach:
      'Modeled patient entities, doctor schedules, and treatment histories in IBM DB2 with strict foreign key constraints and transactional isolation.',
    challenge:
      'Ensuring data integrity under high-volume queue requests while keeping API responses responsive.',
    solution:
      'Optimized DB2 indexed queries and stored procedures, combined with Node.js async controllers.',
    outcome:
      'Structured database system capable of serving multi-department hospital administrative tasks cleanly.',
    engineeringDecision:
      'Leveraged IBM DB2 enterprise relational capabilities to maintain strict compliance and ACID transactions for medical records.',
    technologies: ['React.js', 'Node.js', 'IBM DB2', 'REST APIs', 'JavaScript'],
    links: {
      github: 'https://github.com/rugved18-dev/HospitalManagement',
    },
    layout: 'compact',
    visual: { type: 'dashboard', label: 'Hospital Records DB' },
  },
];

export const engineeringProcess = [
  {
    number: '01',
    title: 'Understand',
    description:
      'Understand the problem, users, requirements, and constraints before writing a single line of code.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Break the problem into systems, workflows, and technical decisions that can be reasoned about independently.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Develop maintainable, reliable, and scalable software with clear structure and well-defined boundaries.',
  },
  {
    number: '04',
    title: 'Solve',
    description:
      'Test, improve, and deliver a useful solution that actually solves the original problem for real people.',
  },
];

export type TechGroup = {
  category: string;
  items: string[];
};

export const techStack: TechGroup[] = [
  {
    category: 'Languages',
    items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'COBOL', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS', 'TanStack'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Nest.js', 'Flask', 'FastAPI'],
  },
  {
    category: 'Infrastructure & Cloud',
    items: ['Docker', 'Kubernetes', 'Terraform', 'Cloudflare', 'CI/CD', 'AWS S3', 'Vercel', 'Render', 'Cloudinary'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'MongoDB Atlas', 'MySQL', 'IBM DB2', 'PostgreSQL'],
  },
  {
    category: 'AI & Machine Learning',
    items: ['XGBoost', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'SciPy'],
  },
];

export const aboutParagraphs = [
  'Started writing software to understand how things worked. Today, I work at the intersection of applied machine learning, backend systems, and product design.',
  'I build retrieval pipelines, agent tooling, and front-ends that make complex systems legible to real people. I value latency budgets, type safety, motion curves, and precise typography.',
  'My engineering philosophy is simple: Details are not decoration; they are the product.',
];

export type TimelineEntry = {
  id: string;
  type: 'experience' | 'education' | 'certification';
  role: string;
  organization: string;
  date: string;
  description: string;
  technologies?: string[];
  link?: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: 'exp-1',
    type: 'experience',
    role: 'Backend Developer',
    organization: 'BasicBrain / Mahant Enterprises',
    date: 'May 2026 — Present',
    description:
      'Engineered cloud storage and backend workflows using AWS S3 and Supabase PostgreSQL. Supported multi-tenant order processing, pricing operations, transactional data integrity, A/B testing, and production SaaS stability.',
    technologies: ['AWS S3', 'PostgreSQL', 'Supabase', 'Backend', 'SaaS', 'A/B Testing'],
  },
  {
    id: 'edu-1',
    type: 'education',
    role: 'B.Tech, Computer Engineering',
    organization: 'Vishwakarma Institute of Information Technology (V.I.I.T.), Pune',
    date: 'Aug. 2023 — Present',
    description:
      'Current CGPA: 8.45 / 10. Core focus on computer engineering principles, backend systems, machine learning, and database management.',
  },
  {
    id: 'edu-2',
    type: 'education',
    role: 'Higher Secondary Education',
    organization: 'Pragnya College of Management & Computer Studies, Hadapsar, Pune',
    date: '2021 — 2023',
    description:
      'Completed Higher Secondary Certificate (HSC) with 68.67%.',
  },
  {
    id: 'edu-3',
    type: 'education',
    role: 'Secondary Education',
    organization: 'Sadhana English Medium School, Pune',
    date: '[START YEAR] — 2021',
    description:
      'Completed Secondary School Certificate (SSC) with 83.60%.',
  },
  {
    id: 'cert-1',
    type: 'certification',
    role: 'GenAI Powered Data Analytics',
    organization: 'Tata Group & The Forage',
    date: '2025',
    description:
      'Focused on Generative AI, LLMs, prompt engineering, and data analytics.',
    link: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_69352b5f7dfff3887674389c_1765392895914_completion_certificate.pdf',
  },
  {
    id: 'cert-2',
    type: 'certification',
    role: 'Mainframe Launchpad Program',
    organization: 'BMC Software India',
    date: '2026',
    description:
      'Enterprise systems engineering with COBOL, JCL, and z/OS.',
    link: 'https://drive.google.com/file/d/1g3xzYJ5D_SDWi-BFpH76nzByZ5WB3XiE/view?usp=drive_link',
  },
];

export const portfolioMetrics = [
  { value: '6+', label: 'Years building' },
  { value: '34', label: 'Products shipped' },
  { value: '12M', label: 'Requests served / mo' },
  { value: '98%', label: 'Lighthouse median' },
  { value: '2,400+', label: 'GitHub stars' },
  { value: '18', label: 'Talks & workshops' },
  { value: '5', label: 'Hackathons won' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/rugved18-dev/', icon: 'github' as const },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rugved-surve-2577a7321/', icon: 'linkedin' as const },
  { label: 'X', href: 'https://x.com', icon: 'twitter' as const },
  { label: 'Portfolio', href: 'https://rugvedsurve.in/', icon: 'globe' as const },
  { label: 'Email', href: 'mailto:rugvedsurve18@gmail.com', icon: 'mail' as const },
];

