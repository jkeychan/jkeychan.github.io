// Site configuration and data
export const SITE_CONFIG = {
  // Basic site info
  name: "Jeff Bollinger",
  title: "Jeff Bollinger | Resume, CV, and Publications",
  description: "Jeff Bollinger's official resume website featuring comprehensive details about his expertise in cybersecurity, executive leadership, security engineering, and publications.",
  url: "https://www.jeff-bollinger.com",
  domain: "www.jeff-bollinger.com",
  
  // Contact & Social
  email: "contact@jeff-bollinger.com", // if applicable
  linkedin: "https://www.linkedin.com/in/jeffb0llinger/",
  github: "https://github.com/jkeychan",
  
  // Professional info
  jobTitle: "Director, Incident Response and Detection Engineering",
  experience: "25 years",
  
  // Navigation
  navigation: [
    { href: "/", label: "Home" },
    { href: "/publications", label: "Publications" },
    { href: "/resume", label: "Resume/CV" }
  ],
  
  // Home page content
  hero: {
    greeting: "Hello I'm",
    name: "Jeff Bollinger",
    avatar: "/static/media/avatar.d355c64ac071e83edeabfc9c51f454d3.svg",
    taglines: [
      "Infosec Professional | 25 years",
      "Threat Detection | Incident Response", 
      "Detection Engineering | Security Architecture",
      "Executive Leadership | Mentoring, Team Building"
    ],
    bio: "Jeff Bollinger is a cybersecurity leader focused on incident response, detection engineering, and large-scale security operations. He has led programs at LinkedIn and Cisco and frequently writes and speaks about security monitoring, threat detection, and response."
  },
  
  // SEO & Schema
  keywords: [
    "Jeff Bollinger",
    "Jeff Bollinger Resume", 
    "Jeff Bollinger CV",
    "Jeff Bollinger Publications",
    "Jeff Bollinger Security",
    "Jeffrey Bollinger",
    "executive leadership",
    "cybersecurity",
    "incident response", 
    "detection engineering",
    "security architecture",
    "security operations"
  ],
  
  organizations: [
    { name: "LinkedIn" },
    { name: "Cisco" },
    { name: "University of North Carolina at Chapel Hill" }
  ],
  
  expertise: [
    "Cybersecurity",
    "Computer Security", 
    "Executive Leadership",
    "Security Engineering",
    "Security Operations",
    "Security Architecture",
    "Incident Response",
    "Detection Engineering"
  ]
} as const;

// Type definitions
export type NavigationItem = {
  href: string;
  label: string;
};

export type ProjectCard = {
  imageSrc: string;
  title: string;
  description: string;
  linkHref: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "center" | "top" | "bottom" | "left" | "right";
};
