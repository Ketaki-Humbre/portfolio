import type { ReactNode } from 'react'

export function StudySection({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} data-study-section className="scroll-mt-6">
      <h3 id={`${id}-title`} className="text-xl font-bold tracking-tight text-ink">
        {title}
      </h3>
      {description && <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}

export function ExecutiveSummary({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} data-study-section className="scroll-mt-6">
      <div className="rounded-xl border border-line border-l-4 border-l-[var(--d-accent)] bg-[var(--d-soft)] p-5 sm:p-6">
        <h3 id={`${id}-title`} className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[var(--d-text)]">
          Executive Summary
        </h3>
        <p className="mt-3 text-pretty leading-relaxed text-ink">{children}</p>
      </div>
    </section>
  )
}
