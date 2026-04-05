export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm ${className}`}
    >
      {title ? <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">{title}</h2> : null}
      {children}
    </section>
  );
}
