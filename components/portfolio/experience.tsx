import { Briefcase, MapPin } from 'lucide-react'
import { experience } from '@/src/data/portfolioData'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 border-t border-line bg-surface-2/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="experience-title" eyebrow="Professional Experience" title="Quality evaluation and process improvement" />
        <div className="grid gap-6 md:grid-cols-2">
          {experience.map((job, i) => (
            <Reveal key={job.company} index={i} className="h-full">
              <article className="skill-indigo flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand-soft-text)]">
                    <Briefcase className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-ink">{job.role}</h3>
                    <p className="font-medium text-ink">{job.company}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-2">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {job.location}
                      </span>
                      <span className="font-mono text-xs">{job.period}</span>
                    </p>
                  </div>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Focus areas">
                  {job.tags.map((tag) => (
                    <li
                      key={tag}
                      className="skill-pill cursor-default rounded-md border border-line bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-ink"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-col gap-3">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
