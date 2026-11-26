'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { caseStudies, type CaseStudyId } from '@/src/data/portfolioData'
import { Reveal } from '../reveal'
import { SectionHeading } from '../section-heading'
import { CaseStudyCard } from './case-study-card'
import { CaseStudyModal } from './case-study-modal'
import { EcommerceStudy } from './ecommerce/ecommerce-study'
import { KycStudy } from './kyc/kyc-study'
import { ManufacturingStudy } from './manufacturing/manufacturing-study'

const studyBodies: Record<CaseStudyId, () => React.JSX.Element> = {
  manufacturing: ManufacturingStudy,
  ecommerce: EcommerceStudy,
  kyc: KycStudy,
}

const validIds = new Set<string>(caseStudies.map((s) => s.id))

function readStudyFromUrl(): CaseStudyId | null {
  if (typeof window === 'undefined') return null
  const param = new URLSearchParams(window.location.search).get('study')
  return param && validIds.has(param) ? (param as CaseStudyId) : null
}

export function CaseStudies() {
  const [openId, setOpenId] = useState<CaseStudyId | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const pushedHistoryRef = useRef(false)

  useEffect(() => {
    const initial = readStudyFromUrl()
    if (initial) setOpenId(initial)

    const onPopState = () => {
      pushedHistoryRef.current = false
      setOpenId(readStudyFromUrl())
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const openStudyById = useCallback((id: CaseStudyId, trigger: HTMLElement) => {
    triggerRef.current = trigger
    setOpenId(id)
    const url = new URL(window.location.href)
    url.searchParams.set('study', id)
    window.history.pushState({ study: id }, '', url.toString())
    pushedHistoryRef.current = true
  }, [])

  const close = useCallback(() => {
    setOpenId(null)
    if (pushedHistoryRef.current) {
      pushedHistoryRef.current = false
      window.history.back()
    } else if (readStudyFromUrl()) {
      const url = new URL(window.location.href)
      url.searchParams.delete('study')
      window.history.replaceState({}, '', url.toString())
    }
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const openStudy = caseStudies.find((s) => s.id === openId)
  const Body = openId ? studyBodies[openId] : null

  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="case-studies-title"
          eyebrow="Featured Case Studies"
          title="Requirements, process models, and analytics — end to end"
          description="Three domain projects, each with an interactive model of the workflow or dataset behind it. Open a case study to explore process maps, user stories, SQL, and exception paths."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.id} index={i} className="h-full">
              <CaseStudyCard
                study={study}
                onOpen={(trigger) => openStudyById(study.id, trigger)}
              />
            </Reveal>
          ))}
        </div>
      </div>
      {openStudy && Body && (
        <CaseStudyModal key={openStudy.id} study={openStudy} onClose={close}>
          <Body />
        </CaseStudyModal>
      )}
    </section>
  )
}
