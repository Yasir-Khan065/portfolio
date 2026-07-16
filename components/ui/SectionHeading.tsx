interface SectionHeadingProps {
  watermark: string;
  title: string;
}

export function SectionHeading({ watermark, title }: SectionHeadingProps) {
  return (
    // `isolate` creates a stacking context so the watermark's negative z-index
    // stays behind the title but never slips behind the page background itself.
    <div className="relative isolate flex flex-col items-center overflow-hidden py-8 text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-8xl font-bold uppercase tracking-tight text-foreground opacity-[0.04] sm:text-9xl"
      >
        {watermark}
      </span>
      <h2 className="text-4xl font-bold text-foreground">{title}</h2>
      <span aria-hidden="true" className="mt-3 h-[3px] w-16 rounded-full bg-accent" />
    </div>
  );
}
