import { Mail } from 'lucide-react'
import { contact, profile } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { Reveal } from './reveal'

const outlineLinkBase =
  'inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-5 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="hero-wash rounded-2xl border border-line p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-12">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand">Contact</p>
            <h2 id="contact-title" className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {contact.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-ink-2">{contact.subtext}</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={`mailto:${profile.email}`}
                className={cn(
                  outlineLinkBase,
                  'hover:border-teal-500/50 hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-500/15 dark:hover:text-teal-300',
                )}
              >
                <Mail className="size-4" aria-hidden="true" />
                Email
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  outlineLinkBase,
                  'hover:border-sky-500/50 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/15 dark:hover:text-sky-300',
                )}
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  outlineLinkBase,
                  'hover:border-indigo-500/50 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-300',
                )}
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      <footer className="mx-auto mt-16 max-w-6xl border-t border-line px-4 pt-8 text-center text-sm text-ink-2 sm:px-6">
        © 2026 {profile.name}
      </footer>
    </section>
  )
}
