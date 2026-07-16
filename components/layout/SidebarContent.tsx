"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// lucide v1 dropped brand icons, so all four marks come from Font Awesome's
// brand pack to keep them visually consistent.
import { FaFacebook, FaGithub, FaLinkedin, FaTiktok } from "react-icons/fa6";
import { navItems, site } from "@/data/site";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { ThemeToggle } from "./ThemeToggle";

const SOCIAL_LINKS = [
  { href: site.socials.github, label: "GitHub profile", Icon: FaGithub },
  { href: site.socials.linkedin, label: "LinkedIn profile", Icon: FaLinkedin },
  { href: site.socials.facebook, label: "Facebook profile", Icon: FaFacebook },
  { href: site.socials.tiktok, label: "TikTok profile", Icon: FaTiktok },
];

// Shared inner content for both the desktop fixed sidebar and the mobile drawer.
// Returns a fragment so its children are direct flex children of whichever shell
// renders it (the `mt-auto` on the social row depends on that flex-col parent).
export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
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
    <>
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

      <nav aria-label="Section navigation" className="mt-12">
        <ul className="flex flex-col items-center gap-3">
          {navItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    // Left-click = controlled smooth scroll; the href stays a
                    // real anchor so no-JS, right-click, and middle-click work.
                    e.preventDefault();
                    smoothScrollTo(item.id);
                    // Lets the mobile drawer close after a link is chosen.
                    onNavigate?.();
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-base font-medium transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-sidebar-muted hover:text-accent"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme toggle sits in normal flow right after the nav… */}
      <div className="mt-6 flex justify-center">
        <ThemeToggle />
      </div>

      {/* …and mt-auto pushes the social row to the very bottom, absorbing the
          remaining space between it and the toggle. Bottom spacing from the
          sidebar edge is provided by the shell's p-6. */}
      <ul className="mt-auto flex items-center justify-center gap-6 pt-6">
        {SOCIAL_LINKS.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-sidebar-muted transition-colors hover:text-accent"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
