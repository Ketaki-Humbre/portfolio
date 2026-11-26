import { Award, GraduationCap, Star } from 'lucide-react'
import { education } from '@/src/data/portfolioData'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const cardClass =
  'h-full rounded-xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="scroll-mt-20 border-t border-line bg-surface-2/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="education-title" eyebrow="Education, Certifications & Leadership" title="Engineering foundation, analyst credentials" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <article className={`skill-teal ${cardClass}`}>
              <h3 className="flex items-center gap-2 font-bold text-ink">
                <GraduationCap className="size-5 text-brand" aria-hidden="true" />
                Education
              </h3>
              <ol className="mt-5 flex flex-col gap-5">
                {education.degrees.map((d) => (
                  <li key={d.degree} className="border-l-2 border-brand/40 pl-4">
                    <p className="font-semibold text-ink">{d.degree}</p>
                    <p className="text-sm text-ink-2">
                      {d.school} · {d.location}
                    </p>
                    <p className="mt-1 font-mono text-xs text-ink-2">{d.period}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-2">Relevant Coursework</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <li
                      key={c}
                      className="skill-pill cursor-default rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-ink"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          <Reveal index={1} className="h-full">
            <article className={cardClass}>
              <h3 className="flex items-center gap-2 font-bold text-ink">
                <Award className="size-5 text-brand" aria-hidden="true" />
                Certifications
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {education.certifications.map((c) => (
                  <li key={c.name} className="flex gap-3">
                    <Award className="mt-0.5 size-4 shrink-0 text-impact-num" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{c.name}</p>
                      <p className="text-xs text-ink-2">{c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 flex items-center gap-2 font-bold text-ink">
                <Star className="size-5 text-brand" aria-hidden="true" />
                Leadership & Extracurriculars
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {education.leadership.map((l) => (
                  <li key={l.title} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-sm text-ink">{l.title}</span>
                    <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-medium text-ink-2">{l.level}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
