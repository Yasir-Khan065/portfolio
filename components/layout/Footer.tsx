export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left sm:px-10">
        <p className="text-sm text-muted">
          © {year}{" "}
          <span className="font-semibold text-accent">Yasir Khan</span>. All
          rights reserved.
        </p>
        <p className="text-sm text-muted">
          Built with Next.js, TypeScript &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
