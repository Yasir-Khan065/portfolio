import type { NavItem } from "@/lib/types";

export const site = {
  name: "Yasir Khan",
  tagline: "I build clean, fast, accessible web experiences.",
  avatar: "/images/avatar.jpeg",
  socials: {
    github: "https://github.com/Yasir-Khan065",
    linkedin:
      "https://www.linkedin.com/in/yasir-khan-02bb2136b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    facebook: "https://www.facebook.com/share/1DE5tjrQz5/",
    tiktok: "https://vt.tiktok.com/ZSXhgaBRA/",
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
