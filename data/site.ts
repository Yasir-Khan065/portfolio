import type { NavItem } from "@/lib/types";

export const site = {
  name: "Yasir Khan",
  role: "Full-Stack Developer",
  tagline: "I build clean, fast, accessible web experiences.",
  avatar: "/images/avatar.jpeg",
  socials: {
    github: "https://github.com/Yasir-Khan065",
    linkedin: "https://www.linkedin.com/in/your-handle",
    email: "you@example.com",
  },
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "skills", label: "What I Do" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];
