// Hand-rolled, duration-based smooth scrolling (no libraries). The animation
// runs for a fixed DURATION regardless of distance, so a short hop and a
// full-page glide feel equally deliberate.

// Module-level handle to the in-flight animation so a new scroll cancels the
// previous one instead of two rAF loops fighting over window.scrollY.
let rafId: number | null = null;

// Matches the sections' `scroll-mt-8` (2rem) so headings land 32px below the
// viewport top rather than flush against it.
const SCROLL_OFFSET = 32;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function animateTo(targetY: number, duration: number): void {
  // Cancel any in-progress animation first so rapid clicks don't compound.
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  const clampedTarget = Math.max(0, targetY);

  // Opted-out users get an instant jump — never force the slow glide on them.
  if (prefersReducedMotion()) {
    window.scrollTo(0, clampedTarget);
    return;
  }

  const startY = window.scrollY;
  const distance = clampedTarget - startY;
  if (distance === 0) return;

  let startTime: number | null = null;

  // rAF passes a DOMHighResTimeStamp, so no Date.now()/performance.now() needed.
  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const t = Math.min((now - startTime) / duration, 1);
    // Positional scrollTo respects `scroll-behavior: auto` (the default), so
    // each frame moves instantly and the easing here produces the smoothness.
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = null;
    }
  };

  rafId = requestAnimationFrame(step);
}

/**
 * Smoothly scroll a section (by id) to just below the viewport top and reflect
 * it in the URL hash — without the instant jump that assigning location.hash
 * would trigger.
 */
export function smoothScrollTo(targetId: string, duration = 800): void {
  const el = document.getElementById(targetId);
  if (!el) return;

  const targetY = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  animateTo(targetY, duration);
  window.history.pushState(null, "", `#${targetId}`);
}

/** Smoothly scroll back to the top with the same easing and reduced-motion guard. */
export function smoothScrollToTop(duration = 800): void {
  animateTo(0, duration);
}
