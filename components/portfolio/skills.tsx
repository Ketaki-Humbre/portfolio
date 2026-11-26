import { BarChart3, ClipboardList, Code2, Users, Workflow, Wrench, type LucideIcon } from 'lucide-react'
import { skills } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const icons: Record<(typeof skills)[number]['icon'], LucideIcon> = {
  clipboard: ClipboardList,
  chart: BarChart3,
  workflow: Workflow,
  wrench: Wrench,
  code: Code2,
  users: Users,
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="skills-title" eyebrow="Skills & Toolkit" title="Methods, tools, and platforms" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const Icon = icons[group.icon]
            return (
              <Reveal key={group.category} index={i % 3} className="h-full">
                <article
                  className={cn(
                    `skill-${group.tone}`,
                    'group h-full rounded-xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--sk-border)] hover:shadow-lg',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[var(--sk-soft)] text-[var(--sk-text)] transition-transform duration-200 group-hover:scale-105">
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <h3 className="font-bold text-ink">{group.category}</h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="skill-pill cursor-default rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
