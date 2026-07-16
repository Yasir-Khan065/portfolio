"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { smoothScrollToTop } from "@/lib/smoothScroll";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    // Show the button whenever the Hero is NOT in view — same observer pattern
    // the sidebar scroll-spy uses, rather than a raw scroll listener.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => smoothScrollToTop()}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition duration-300 hover:bg-background ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
