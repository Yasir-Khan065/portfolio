import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const INFO: { label: string; value: ReactNode }[] = [
  { label: "Name", value: "Yasir Khan" },
  {
    label: "Email",
    value: (
      <a
        href="mailto:yasirahmadkhan82@gmail.com"
        className="text-accent hover:underline"
      >
        yasirahmadkhan82@gmail.com
      </a>
    ),
  },
  { label: "Age", value: "21" },
  { label: "From", value: "Islamabad, Pakistan" },
];

const STATS: { top: string; label: string }[] = [
  { top: "Software Engineering", label: "Student" },
  { top: "AI Engineer", label: "Intern @ ViralMobitech" },
  { top: "5+", label: "Projects Built" },
  { top: "Continuous", label: "Learner" },
];

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20 sm:px-10"
    >
      <SectionHeading watermark="ABOUT ME" title="Know Me More" />

      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
            I&apos;m <span className="text-accent">Yasir Khan,</span> a Software
            Engineering Student
          </h3>

          <p className="mt-6 leading-relaxed text-muted">
            I&apos;m Yasir Khan, a Software Engineering student and Frontend
            Developer with a passion for building modern, responsive, and
            user-friendly web applications. I enjoy turning ideas into clean,
            functional interfaces while continuously improving my skills through
            real-world projects and hands-on development.
          </p>

          <p className="mt-5 leading-relaxed text-muted">
            Currently, I&apos;m working as an AI Engineer Intern at
            ViralMobitech, where I&apos;m gaining practical experience in modern
            web technologies, software development workflows, and
            problem-solving. I&apos;m always eager to learn new technologies,
            take on meaningful challenges, and build applications that create
            real value.
          </p>
        </div>

        <div className="lg:col-span-1">
          <dl>
            {INFO.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline gap-3 border-b border-border py-3"
              >
                <dt className="font-bold text-foreground">{row.label}:</dt>
                <dd className="text-muted">{row.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href="/resume.pdf"
            download="Yasir-Khan-CV.pdf"
            className="mt-8 inline-block rounded-full bg-accent-strong px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Download CV
          </a>
        </div>
      </div>

      <div className="mt-24 border-t border-border pt-12">
        {/* Dividers only from md up: with grid-cols-2, `divide-x` would also draw
            a stray rule down the left edge of the second row's first cell. */}
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-border">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stat.top}</p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
