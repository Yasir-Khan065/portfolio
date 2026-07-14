import type { LucideIcon } from "lucide-react";
import { Briefcase, Code2, Database, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SERVICES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Code2,
    title: "Frontend Development",
    body: "Build modern, responsive, and high-performance web applications using React, Next.js, TypeScript, Tailwind CSS, and JavaScript, with a strong focus on clean architecture, performance, and user experience.",
  },
  {
    icon: Database,
    title: "Firebase & Full-Stack Integration",
    body: "Develop applications powered by Firebase Authentication, Realtime Database, Firestore, Cloud Functions, and modern APIs to create secure, scalable, and real-world solutions.",
  },
  {
    icon: Sparkles,
    title: "AI-Assisted Development",
    body: "Leverage Claude Code, ChatGPT, and modern AI development workflows to accelerate development, improve code quality, debug efficiently, and build production-ready applications.",
  },
  {
    icon: Briefcase,
    title: "Real-World Development Experience",
    body: "Currently working as an AI Engineer Intern at Viral Mobitech, contributing to real-world web applications, solving practical development challenges, and continuously expanding my technical expertise.",
  },
];

export function Skills() {
  return (
    // The section background sits on the full-width element so it runs edge to
    // edge; the max-width constraint lives on the inner div.
    <section id="skills" className="scroll-mt-8 bg-background py-24">
      <div className="mx-auto min-h-screen max-w-6xl px-6 sm:px-10">
        <SectionHeading watermark="SERVICES" title="What I Do?" />

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-5">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-surface shadow-sm">
                <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
