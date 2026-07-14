"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// lucide v1 dropped brand icons, so all four marks come from Font Awesome's
// brand pack to keep them visually consistent.
import { FaFacebook, FaGithub, FaLinkedin, FaTiktok } from "react-icons/fa6";
import { navItems, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

const SOCIAL_LINKS = [
  { href: site.socials.github, label: "GitHub profile", Icon: FaGithub },
  { href: site.socials.linkedin, label: "LinkedIn profile", Icon: FaLinkedin },
  { href: site.socials.facebook, label: "Facebook profile", Icon: FaFacebook },
  { href: site.socials.tiktok, label: "TikTok profile", Icon: FaTiktok },
];

export function Sidebar() {
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      // Shrink the observed region to a narrow band across the middle of the
      // viewport, so whichever section crosses the centre wins instead of every
      // on-screen section reporting itself as active.
      { rootMargin: "-45% 0px -45% 0px" },
    );

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-sidebar-border bg-sidebar-bg p-6 lg:flex">
      <div className="flex flex-col items-center text-center">
        {/* The source image is a 3:4 portrait. A fixed square box plus
            object-cover crops it to a true circle instead of squashing it. */}
        <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-sidebar-border">
          <Image
            src={site.avatar}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="128px"
            priority
            className="object-cover"
          />
        </div>
        <p className="mt-4 text-lg font-semibold text-sidebar-fg">
          {site.name}
        </p>
      </div>

      <nav aria-label="Section navigation" className="mt-10">
        <ul className="flex flex-col items-center gap-3">
          {navItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-lg font-medium transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-sidebar-muted hover:text-sidebar-fg"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-6">
        <ul className="flex items-center justify-center gap-5">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-sidebar-muted transition-colors hover:text-sidebar-fg"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
