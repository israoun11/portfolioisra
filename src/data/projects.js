// Featured projects — controlled manually so Isra can curate which work
// gets the largest visual presentation. Everything else discovered from
// GitHub appears automatically in the "More on GitHub" strip.
// To feature a new project: add an object here with the same shape.
// The `repo` field must match the GitHub repository name exactly so the
// live GitHub data (stars, latest update) can be merged in automatically.

export const featuredProjects = [
  {
    repo: 'Foodly',
    name: 'Foodly',
    tagline: 'An editorial food experience with a 3D hero',
    description:
      'A food-focused web experience shaped like a magazine spread rather than a menu. An interactive 3D hero introduces the concept, then scroll-triggered motion carries the story through the rest of the page.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'React Three Fiber', 'Drei'],
    live: 'https://foodly-kappa-blue.vercel.app/',
    github: 'https://github.com/israoun11/Foodly',
    accent: 'burgundy',
  },
  {
    repo: 'JobMatch',
    name: 'JobMatch',
    tagline: 'A full-stack job matching application',
    description:
      'A job matching platform with real authentication, protected routes and user profiles — the full loop from the React frontend to a Node and Express API backed by MongoDB.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Authentication', 'Protected Routes'],
    live: 'https://jobmatch-cfxi.vercel.app/',
    github: 'https://github.com/israoun11/JobMatch',
    accent: 'gold',
  },
  {
    repo: 'Bloom-Flowers',
    name: 'Bloom Flowers',
    tagline: 'An ecommerce-style flower storefront',
    description:
      'A modern, commerce-flavoured frontend built around product presentation — soft, considered layout choices for a shop that sells something delicate.',
    tech: ['React', 'JavaScript', 'Tailwind CSS'],
    live: 'https://bloom-flowers-omega.vercel.app/',
    github: 'https://github.com/israoun11/Bloom-Flowers',
    accent: 'rose',
  },
  {
    repo: 'Pastry',
    name: 'Pastry',
    tagline: 'A pastry-shop frontend, warm and tactile',
    description:
      'A food-oriented interface exploring warm, tactile visual language — texture and typography doing the work that photography usually would.',
    tech: ['React', 'JavaScript', 'Tailwind CSS'],
    live: 'https://pastry-front.vercel.app/',
    github: 'https://github.com/israoun11/Pastry',
    accent: 'charcoal',
  },
]

export const GITHUB_USERNAME = 'israoun11'
