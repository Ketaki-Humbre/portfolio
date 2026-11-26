'use client'

import { ArrowLeft, X } from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CaseStudyMeta } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/hooks/use-in-view'
import { CopyButton } from '../copy-button'

export function CaseStudyModal({
  study,
  onClose,
  children,
}: {
  study: CaseStudyMeta
  onClose: () => void
  children: ReactNode
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const jumpLockRef = useRef(0)
  const [activeSection, setActiveSection] = useState(study.sections[0]?.id)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('study', study.id)
    setShareUrl(url.toString())
  }, [study.id])

  useEffect(() => {
    const page = document.getElementById('page-content')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    page?.setAttribute('inert', '')
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      page?.removeAttribute('inert')
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-study-section]'))
    let frame = 0

    const update = () => {
      frame = 0
      if (performance.now() < jumpLockRef.current) return
      const atBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 4
      if (atBottom) {
        setActiveSection(sections[sections.length - 1]?.id)
        return
      }
      const threshold = root.getBoundingClientRect().top + 96
      let current = sections[0]?.id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) current = section.id
      }
      setActiveSection(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    root.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      root.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [study.id])

  function jumpTo(id: string) {
    const root = scrollRef.current
    const target = root?.querySelector<HTMLElement>(`#${id}`)
    if (!root || !target) return
    setActiveSection(id)
    jumpLockRef.current = performance.now() + 700
    const top = target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 24
    root.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    document.getElementById(`pill-${id}`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  return createPortal(
    <div className={cn('fixed inset-0 z-50', `domain-${study.domain}`)}>
      <div className="backdrop-in absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="modal-in absolute inset-0 flex flex-col overflow-hidden bg-page shadow-2xl sm:inset-4 sm:rounded-2xl sm:border sm:border-line lg:inset-x-auto lg:inset-y-6 lg:left-1/2 lg:w-[min(1120px,calc(100%-3rem))] lg:-translate-x-1/2"
      >
        <header className="relative z-10 shrink-0 border-b border-line bg-page shadow-[0_6px_16px_-12px_rgb(0_0_0/0.35)]">
          <div className="h-[3px] bg-[var(--d-accent)]" aria-hidden="true" />
          <div className="flex items-center gap-2.5 px-4 py-3 sm:gap-3 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-ink-2 transition-colors duration-200 hover:bg-[var(--d-soft)] hover:text-[var(--d-text)] focus-visible:outline-2 focus-visible:outline-brand"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </button>
            <h2 id="case-study-title" className="min-w-0 flex-1 truncate text-sm font-bold text-ink sm:text-base">
              {study.title}
            </h2>
            {shareUrl && (
              <CopyButton
                value={shareUrl}
                label="Share"
                copiedLabel="Link Copied"
                variant="subtle"
                icon="link"
                className="hidden sm:inline-flex"
              />
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors duration-200 hover:border-[var(--d-accent)]/60 hover:bg-[var(--d-soft)] hover:text-[var(--d-text)] focus-visible:outline-2 focus-visible:outline-brand"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Case study sections" className="overflow-x-auto px-4 pb-2.5 sm:px-6">
            <ul className="flex w-max gap-1.5">
              {study.sections.map((section) => {
                const isActive = activeSection === section.id
                return (
                  <li key={section.id}>
                    <button
                      id={`pill-${section.id}`}
                      type="button"
                      onClick={() => jumpTo(section.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'h-8 whitespace-nowrap rounded-full border px-3.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand',
                        isActive
                          ? 'border-[var(--d-accent)] bg-[var(--d-soft)] text-[var(--d-text)]'
                          : 'border-line bg-surface text-ink-2 hover:border-[var(--d-accent)]/50 hover:bg-[var(--d-soft)]/70 hover:text-[var(--d-text)]',
                      )}
                    >
                      {section.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
              <span className="rounded-full bg-[var(--d-soft)] px-2.5 py-1 font-semibold text-[var(--d-text)]">
                {study.domainLabel}
              </span>
              <span className="text-ink-2">{study.timeline}</span>
              <span className="font-mono font-medium text-ink">{study.scope}</span>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
