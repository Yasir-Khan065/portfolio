import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/data/journey";

export function Journey() {
  return (
    <section
      id="journey"
      className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20 sm:px-10"
    >
      <SectionHeading watermark="JOURNEY" title="My Growth" />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {journey.map((item, index) => (
          // Two entries share the year 2026, so the key pairs it with the index.
          <div
            key={`${index}-${item.title}`}
            className={`rounded-xl border border-border bg-surface p-6 transition-transform hover:-translate-y-1 hover:shadow-lg ${
              index === 0 ? "sm:col-span-2" : ""
            }`}
          >
            <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-sm font-semibold text-accent">
              {item.year}
            </span>

            <h3 className="mt-3 text-lg font-bold text-foreground">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
