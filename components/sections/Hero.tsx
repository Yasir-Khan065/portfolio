"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/smoothScroll";

const WORDS = ["Yasir Khan.", "a Developer.", "a Freelancer."];

const TYPE_MS = 90;
const DELETE_MS = 45;
const HOLD_MS = 1800;

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// The server can't know the visitor's motion preference, so it assumes "reduce".
// React uses this same snapshot for the hydration render, which means the first
// client paint is always the static headline and can never mismatch the HTML.
function getServerSnapshot() {
  return true;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

type Phase = "holding" | "deleting" | "typing";

export function Hero() {
  const animating = !usePrefersReducedMotion();

  // Start fully typed on the first word — this is what renders on the server and
  // what a reduced-motion visitor keeps forever.
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(WORDS[0].length);
  const [phase, setPhase] = useState<Phase>("holding");

  useEffect(() => {
    if (!animating) return;

    const word = WORDS[wordIndex];
    const delay =
      phase === "holding" ? HOLD_MS : phase === "deleting" ? DELETE_MS : TYPE_MS;

    // Every state change happens inside the timeout, never synchronously in the
    // effect body, so each render schedules exactly one step of the animation.
    const timeout = setTimeout(() => {
      if (phase === "holding") {
        setPhase("deleting");
      } else if (phase === "deleting") {
        if (charCount > 0) {
          setCharCount(charCount - 1);
        } else {
          setWordIndex((wordIndex + 1) % WORDS.length);
          setPhase("typing");
        }
      } else if (charCount < word.length) {
        setCharCount(charCount + 1);
      } else {
        setPhase("holding");
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [animating, phase, charCount, wordIndex]);

  const text = WORDS[wordIndex].slice(0, charCount);

  return (
    // `isolate` keeps the image's and overlay's negative z-indexes contained in
    // this section instead of slipping behind the page background.
    <section
      id="home"
      className="relative isolate flex h-screen scroll-mt-8 flex-col items-center justify-center overflow-hidden py-24 text-center"
    >
      <Image
        src="/images/office.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* 70%, not 60%: measured against this photo, 60% left the muted lines at
          3.97:1 — under the 4.5:1 AA threshold. 70% brings them to 4.65:1. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/70" />

      {/* This section always sits on a dark image, so its text uses the fixed
          sidebar tokens rather than the theme-following ones. */}
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-sidebar-fg">
        Welcome
      </p>

      <h1 className="mt-6 text-5xl font-bold text-sidebar-fg lg:text-6xl">
        I&apos;m {text}
        {animating && (
          <span aria-hidden="true" className="typewriter-caret text-accent">
            |
          </span>
        )}
      </h1>

      <p className="mt-6 text-sidebar-fg">Based in Islamabad, Pakistan.</p>

      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo("contact");
        }}
        className="mt-10 rounded-full border-2 border-accent px-8 py-3 font-medium text-accent transition-colors hover:bg-accent hover:text-sidebar-bg"
      >
        Hire Me
      </a>
    </section>
  );
}
