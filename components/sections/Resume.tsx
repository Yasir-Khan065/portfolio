import { Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SKILL_GROUPS: { category: string; items: string[] }[] = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Firebase"],
  },
];

export function Resume() {
  return (
    <section
      id="resume"
      className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20 sm:px-10"
    >
      <SectionHeading watermark="SUMMARY" title="Resume" />

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            My Education
          </h3>

          <div className="mt-6 rounded-xl border border-border bg-surface p-6">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-sidebar-bg">
              2024 — 2028 (Expected)
            </span>
            <h4 className="mt-4 text-lg font-bold text-foreground">
              BS Software Engineering
            </h4>
            <p className="mt-1 text-sm font-medium text-accent">
              University of Swabi
            </p>
            <p className="mt-3 text-sm text-muted">
              Currently in 4th semester.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            My Skills
          </h3>

          <div className="mt-6 space-y-8">
            {SKILL_GROUPS.map((group) => (
              <div key={group.category}>
                <h4 className="text-sm font-semibold text-foreground">
                  {group.category}
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center border-t border-border pt-10">
        <a
          href="/resume.pdf"
          download="Yasir-Khan-CV.pdf"
          className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download CV
        </a>
      </div>
    </section>
  );
}
