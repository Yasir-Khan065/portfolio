"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { SidebarContent } from "./SidebarContent";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Prevents stealing focus to the hamburger on the initial (closed) mount —
  // focus only returns there after the drawer has actually been opened once.
  const hasOpenedRef = useRef(false);

  const close = () => setIsOpen(false);

  // Escape closes the drawer (listener only attached while open).
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Body scroll lock. This project's scroll container is documentElement (the
  // page scrolls the <html>, not <body> — verified), so body-only overflow
  // would not lock it; we set both and restore the prior values on close/unmount.
  useEffect(() => {
    if (!isOpen) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [isOpen]);

  // Focus into the drawer on open; return focus to the hamburger on close.
  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      const first = panelRef.current?.querySelector<HTMLElement>("a, button");
      first?.focus();
    } else if (hasOpenedRef.current) {
      toggleRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar-bg text-sidebar-fg shadow-md lg:hidden"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Scrim: fades in/out (opacity, not mount/unmount) and closes on click. */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-drawer"
        ref={panelRef}
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar-bg p-6 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onNavigate={close} />
      </div>
    </>
  );
}
