import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "hr-registry-system",
    title: "HR Registry System",
    tagline:
      "A dashboard to manage employee records, track EPF, and monitor workforce status in real-time.",
    description:
      "A centralized dashboard showing all employee records at a glance — tracking total, active, retired, and on-site staff along with individual status and net pay. It automatically calculates EPF contributions and generates the final payout when an employee retires, replacing error-prone Excel-based HR tracking.",
    tech: ["React.js", "Tailwind CSS", "PHP", "MySQL", "GoDaddy"],
    cover: "/images/projects/hr-1.png",
    images: [
      "/images/projects/hr-1.png",
      "/images/projects/hr-2.png",
      "/images/projects/hr-3.png",
      "/images/projects/hr-4.png",
    ],
    github: "https://github.com/Yasir-Khan065/HR-Registry-System",
    demo: "https://hr.viralmobitech.com/login.php",
  },
  {
    slug: "meetnew-admin-console",
    title: "MeetNew Admin Console",
    tagline:
      "A Firebase moderation dashboard for a live random-video-chat app with 271K+ users.",
    description:
      "A single-admin console to review user reports, ban/unban accounts, handle account-deletion requests, look up users, and monitor who's online in real time — running against a production Firebase database with admin-only authenticated access. Built with strict cost discipline: every screen uses capped or single-record reads after an early full-table query caused a 2GB/day bandwidth spike.",
    tech: [
      "Vanilla JS",
      "Firebase Realtime DB",
      "Firebase Auth",
      "Web SDK v9",
    ],
    cover: "/images/projects/meetnew-1.png",
    images: [
      "/images/projects/meetnew-1.png",
      "/images/projects/meetnew-2.png",
      "/images/projects/meetnew-3.png",
    ],
    isPrivate: true,
  },
  {
    slug: "play-listing-checker",
    title: "Play Listing Checker",
    tagline:
      "A tool that audits Google Play listings for policy compliance and ASO optimization in real-time.",
    description:
      "A browser utility for Android developers to test app store metadata before publishing. As you type the Title, Short, and Long Description, it live-updates a compliance score, analytics panel, and flags policy violations — ranking claims, keyword stuffing, readability issues. All analysis runs locally in the browser; nothing is sent to a server.",
    tech: ["React.js", "Tailwind CSS", "Client-side JS"],
    cover: "/images/projects/play-checker-1.png",
    images: [
      "/images/projects/play-checker-1.png",
      "/images/projects/play-checker-2.png",
    ],
    github: "https://github.com/Yasir-Khan065/play-store-checker",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
