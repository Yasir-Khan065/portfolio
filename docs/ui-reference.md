# UI Reference — portfolio

Visual target for this portfolio, derived from 8 screenshots supplied on 2026-07-14
(originals in `docs/ui-reference/`).

**Source:** the "Simone" HTML template by Harnish Design
(`harnishdesign.net/demo/html/simone/index.html`). Used as a *layout and structure*
reference only. Do not copy its stock photography, its demo copy, or its markup —
the visible content (portrait, hero photo, gallery images, "Simone Olivia", the
lorem ipsum) is all placeholder and gets replaced with real content.

---

## Global shell

- **Fixed left sidebar**, roughly 280–290px (our `w-72` = 288px is right).
- The sidebar is **always dark**, in both light and dark mode — near-black
  (~`#12151a`). It is *not* tinted with the page surface colour. This is the single
  biggest deviation from what is currently built, where the sidebar uses `bg-surface`.
- Main content sits to the right on a **light near-white background** (~`#f5f6f7`),
  with white cards raised on top of it.
- **Accent** is an emerald/teal green (~`#2ec4a0`), used for the active nav link,
  underlines, icon glyphs, pills and buttons. Close to our existing `--accent`.
- Type is a geometric sans (Poppins/Montserrat family) — headings heavy (700),
  body regular with generous line-height.

## Sidebar (top → bottom)

1. Large circular avatar, thick subtle ring, centred.
2. Name in white, bold, centred beneath it.
3. Vertical nav, centred, generous spacing. Active link is **green**; inactive is
   light grey and brightens on hover.
4. Social icon row pinned to the bottom (Facebook, Twitter, Dribbble, GitHub in the
   reference — ours will differ).

## Section header pattern (used by every section)

A distinctive two-layer heading:

- A **giant faded watermark word** in the background, centred, very light grey,
  clipped by the section (e.g. `ABOUT ME`, `SERVICES`, `SUMMARY`, `PORTFOLIO`,
  `CONTACT`).
- The **real heading on top**, centred, bold, dark, with a **short green underline
  bar** directly beneath it.

The watermark word and the heading differ: `ABOUT ME` / "Know Me More",
`SERVICES` / "What I Do?", `SUMMARY` / "Resume", `PORTFOLIO` / "My Work",
`CONTACT` / "Get in Touch".

## Per-section layouts

**Hero (`home`)** — full-bleed background photograph with a dark overlay. Centred
stack: small "Welcome", a very large headline with a **typewriter/cycling effect**
and a blinking caret ("I'm Simone Olivia|" → "I'm a Freelancer.|"), a subtitle
line ("based in Los Angeles, California."), then a **pill button with a green
outline** ("Hire Me"). A bouncing chevron sits at the bottom centre.

**About (`about`)** — two columns. Left: heading with the name in green inline,
then two paragraphs of muted body text. Right: a key/value list (Name, Email, Age,
From) with thin dividers between rows, email in green, then a **solid green pill**
("Download CV").

**Services / What I Do (`skills`)** — 2×2 grid. Each cell: a white rounded-square
tile holding a green glyph, with the title and description to its right.

**Resume (`resume`)** — two columns, "My Education" and "My Experience". Each entry
is a bordered white card containing a **small green date pill** (e.g. `2000 - 2004`),
a bold title, the institution/company in a **red/pink accent**, then description text.
Note this implies a *second* accent colour that our token set does not currently have.

**Portfolio (`projects`)** — a centred **filter tab row** (All / Design / Brand /
Photos); the active tab is green with an underline. Below it a 3-column image grid.

**Contact (`contact`)** — left column: `ADDRESS` block, then phone/fax/email rows
each with a small green icon, then a `FOLLOW ME` social row. Right column:
`SEND US A NOTE` form — Name and Email side by side, a full-width message textarea,
and a solid green **"Send Message"** pill.

**Footer** — "Copyright © 2022 Simone. All Rights Reserved." on the left (name in
green), "Terms & Policy | Disclaimer" on the right.

## Floating controls

- A **settings gear** tab clinging to the right edge, vertically centred (in the
  template this opens a colour-scheme switcher — likely where a theme toggle belongs).
- A circular **scroll-to-top** button, bottom-right, appears after scrolling.

---

## Deliberate departures from the reference — do NOT "fix" these

1. **The nav list is intentionally different.** Ours is Home, About Me, What I Do,
   Projects, Journey, Resume, Contact. `Journey` replaces the template's
   `Testimonial` on purpose (a junior developer has no client testimonials), and
   `Projects` replaces `Portfolio` on purpose. Confirmed by the user on 2026-07-14.
   **Do not reconcile `data/site.ts` to the template.** The template is a visual
   reference, not a spec.

## Remaining gaps

1. **No secondary accent token.** The resume cards use a red/pink for
   institution/company text. Not yet tokenised.
2. **Dark mode is not shown.** Every screenshot is the light theme, so the dark
   palette is still our own invention.
3. **Effects not yet built:** scroll-to-top, portfolio filter tabs, hero background
   photo, bouncing chevron.

## Done

- Sidebar is now permanently dark via the fixed `--sidebar-*` tokens (identical
  values in `:root` and `.dark`).
- Accent corrected to `#2EC4A0` (light) / `#3ED8B2` (dark).
- Watermark section heading built as `components/ui/SectionHeading.tsx`.
- Hero typewriter built, with a reduced-motion static fallback.
