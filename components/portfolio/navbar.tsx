'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'
import { ResumeButton } from './resume-button'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))

    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (window.scrollY < 200) setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200',
        scrolled || open ? 'border-line bg-page/85' : 'border-transparent bg-page/60',
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-brand"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand font-mono text-xs font-medium text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            {profile.monogram}
          </span>
          <span className="font-heading text-base font-bold tracking-tight text-ink">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand',
                    isActive
                      ? 'text-(--brand-soft-text)'
                      : 'text-ink-2 hover:bg-(--brand-soft) hover:text-(--brand-soft-text)',
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <ResumeButton label="Download Resume" className="h-10 px-4" />
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors duration-200 hover:border-brand/50 hover:bg-(--brand-soft) hover:text-(--brand-soft-text) focus-visible:outline-2 focus-visible:outline-brand"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="fade-in border-t border-line bg-page lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-3 text-base font-medium transition-colors',
                    active === link.id
                      ? 'bg-(--brand-soft) text-(--brand-soft-text)'
                      : 'text-ink-2 hover:bg-(--brand-soft) hover:text-(--brand-soft-text)',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <ResumeButton label="Download Resume (PDF)" className="h-11 w-full" />
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
