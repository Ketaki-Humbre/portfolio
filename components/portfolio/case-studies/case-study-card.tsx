import { ArrowRight, CalendarDays } from 'lucide-react'
import type { CaseStudyMeta } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'
import { CardMotif } from './card-motifs'

export function CaseStudyCard({ study, onOpen }: { study: CaseStudyMeta; onOpen: (trigger: HTMLElement) => void }) {
  return (
    <article
      className={cn(
        `domain-${study.domain}`,
        'group flex h-full flex-col overflow-hidden rounded-xl border border-line border-t-[3px] border-t-[var(--d-accent)] bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[var(--d-accent)]/50 hover:shadow-lg',
      )}
    >
      <div className="border-b border-line bg-[var(--d-soft)] px-6 py-3">
        <CardMotif domain={study.domain} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full bg-[var(--d-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--d-text)]">
            {study.domainLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-2">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {study.timeline}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{study.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-2">{study.summary}</p>
        <p className="mt-4 rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs font-medium text-ink">
          {study.scope}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools">
          {study.tools.map((tool) => (
            <li
              key={tool}
              className="cursor-default rounded-md border border-[var(--d-accent)]/30 px-2 py-0.5 text-xs font-medium text-[var(--d-text)] transition-colors duration-200 hover:border-[var(--d-accent)]/60 hover:bg-[var(--d-soft)]"
            >
              {tool}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={(e) => onOpen(e.currentTarget)}
            aria-haspopup="dialog"
            aria-label={`View full case study: ${study.title}`}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-semibold text-ink transition-all duration-200 hover:border-[var(--d-accent)] hover:bg-[var(--d-soft)] hover:text-[var(--d-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            View Full Case Study
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
