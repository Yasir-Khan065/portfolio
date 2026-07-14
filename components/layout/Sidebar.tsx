"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
// lucide v1 dropped brand icons; Simple Icons no longer carries LinkedIn, so
// both marks come from Font Awesome's brand pack to keep them consistent.
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { navItems, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

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

  const iconLink =
    "rounded p-2 text-sidebar-muted transition-colors hover:bg-sidebar-border hover:text-sidebar-fg";

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-sidebar-border bg-sidebar-bg p-6 lg:flex">
      <div className="flex flex-col items-center text-center">
        <Image
          src={site.avatar}
          alt={`Portrait of ${site.name}`}
          width={128}
          height={128}
          priority
          className="rounded-full object-cover ring-4 ring-sidebar-border"
        />
        <p className="mt-4 text-lg font-semibold text-sidebar-fg">
          {site.name}
        </p>
        <p className="mt-1 text-sm text-sidebar-muted">{site.role}</p>
      </div>

      <nav aria-label="Section navigation" className="mt-10">
        <ul className="flex flex-col items-center gap-5">
          {navItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-sm transition-colors ${
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

      <div className="mt-auto flex items-center justify-center gap-1 pt-6">
        <a
          href={site.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${site.name} on GitHub`}
          className={iconLink}
        >
          <FaGithub className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href={site.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${site.name} on LinkedIn`}
          className={iconLink}
        >
          <FaLinkedin className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href={`mailto:${site.socials.email}`}
          aria-label={`Email ${site.name}`}
          className={iconLink}
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
        </a>
        <ThemeToggle />
      </div>
    </aside>
  );
}
