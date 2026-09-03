import type {
  Project,
  SkillCategory,
  TimelineEntry,
  Certificate,
  ContactLinks,
} from '../types/portfolio.js';

export const profile = {
  name: 'Isra Oun',
  role: 'Full-Stack Web Developer',
  location: 'Tunisia',
  tagline:
    'Building modern, responsive and user-focused web applications with React, Node.js and modern web technologies.',
  status: 'Open to Opportunities',
  currentFocus: 'Full-Stack Development + AI Integration',
  lookingFor: 'Remote junior / full-stack / frontend opportunities',
  about: `Isra became a developer through hands-on, practical learning rather than a traditional path — building real projects, breaking them, and fixing them again. She focuses on the MERN stack (MongoDB, Express, React, Node.js) and modern TypeScript tooling, and is currently expanding into AI-assisted development and prompt engineering. She's a continuous learner who enjoys turning a rough idea into a working, polished product, and is actively looking for a remote junior or full-stack role where she can keep growing alongside an experienced team.`,
} as const;

export const links: ContactLinks = {
  email: 'israoun55@gmail.com', // TODO: replace with Isra's real email before deploying
  github: 'https://github.com/israoun11',
  linkedin: 'https://www.linkedin.com/in/isra-oun-a54727407/',
  cvUrl: '/isra-oun-cv.pdf', // TODO: add the actual CV file to /public
};

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Next.js', 'Bootstrap', 'Redux'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Vercel', 'REST APIs'],
  },
  {
    category: 'Learning',
    skills: [
      'AI API Integration',
      'Prompt Engineering',
      'Vitest',
      'React Testing Library',
      'GitHub Actions',
      'CI/CD',
      'Framer Motion',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'maison-disra',
    title: "Maison D'Isra",
    description:
      'A pastry e-commerce website with product browsing, cart flow and a clean checkout experience, built end-to-end as a full MERN project.',
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/israoun11/Pastry',
    liveUrl: 'https://pastry-front.vercel.app',
    imageUrl: '/projects/maison-disra.svg',
    features: [
      'Product catalog with categories',
      'Shopping cart and order flow',
      'Responsive, mobile-first storefront UI',
      'REST API backed by Express + MongoDB',
    ],
  },
  {
    id: 'jobmatch',
    title: 'JobMatch',
    description:
      'A job matching platform connecting candidates with relevant openings, focused on a fast, filterable browsing experience.',
    technologies: ['React', 'JavaScript', 'Node.js'],
    githubUrl: 'https://github.com/israoun11',
    liveUrl: 'https://jobmatch-cfxi.vercel.app/',
    imageUrl: '/projects/jobmatch.svg',
    features: [
      'Job listing search and filters',
      'Responsive candidate-facing UI',
      'Componentized React architecture',
    ],
  },
  {
    id: 'placeholder-1',
    title: 'Next Project — Coming Soon',
    description:
      'Reserved slot for an upcoming project. Replace this placeholder with a real title, description, tech stack and links.',
    technologies: ['React', 'TypeScript'],
    githubUrl: 'https://github.com/israoun11',
    imageUrl: '/projects/placeholder.svg',
    features: ['Replace with real feature bullets'],
    isPlaceholder: true,
  },
];

export const timeline: TimelineEntry[] = [
  { period: '2023', title: 'Baccalaureate' },
  { period: '2024–2025', title: 'English studies' },
  { period: '2026', title: 'Full-Stack Web Development training' },
  { period: '2026', title: 'Projects, certifications and AI learning' },
];

export const certificates: Certificate[] = [
  {
    title: 'Full-Stack Development',
    organization: 'GoMyCode',
    date: '2026',
    // credentialUrl: 'https://...', // TODO: add the real credential link if you have one
  },
  {
    title: 'Introduction to Cybersecurity',
    organization: 'Cisco Networking Academy',
    date: '2026',
  },
  {
    title: 'AI Agents / Microsoft Foundry',
    organization: 'Microsoft Learn — Applied Skills',
    date: '2026',
  },
  // Add more certificates here as you earn them — same shape as above:
  // { title: '...', organization: '...', date: '...', credentialUrl: '...' },
];

/**
 * Flattened, plain-text knowledge base sent to the AI assistant as its ONLY
 * source of truth. Keeping this in one exported string means the assistant
 * can never answer from outside information — see api/ask.ts.
 */
export function buildAiKnowledgeBase(): string {
  const skillsText = skills
    .map((s) => `- ${s.category}: ${s.skills.join(', ')}`)
    .join('\n');

  const projectsText = projects
    .filter((p) => !p.isPlaceholder)
    .map(
      (p) =>
        `- ${p.title}: ${p.description} Technologies: ${p.technologies.join(', ')}. GitHub: ${p.githubUrl}${p.liveUrl ? `. Live: ${p.liveUrl}` : ''}`,
    )
    .join('\n');

  const timelineText = timeline.map((t) => `- ${t.period}: ${t.title}`).join('\n');

  return `
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Status: ${profile.status}
Current focus: ${profile.currentFocus}
Looking for: ${profile.lookingFor}

About:
${profile.about}

Skills:
${skillsText}

Projects:
${projectsText}

Learning journey:
${timelineText}

Contact:
- GitHub: ${links.github}
- LinkedIn: ${links.linkedin}
- Email: available via the Contact section on the site
`.trim();
}