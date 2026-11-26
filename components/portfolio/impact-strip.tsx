'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '@/hooks/use-in-view'
import { impactMetrics, type ImpactMetric } from '@/src/data/portfolioData'

function CountUp({ value, active }: { value: number; active: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) {
      setCurrent(value)
      return
    }
    const duration = 800
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(Math.round(eased * value))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, value])

  return <>{current}</>
}

function MetricValue({ metric, active }: { metric: ImpactMetric; active: boolean }) {
  if (metric.kind === 'text') return <>{metric.text}</>
  return (
    <>
      <span className="sr-only">
        {metric.prefix}
        {metric.value}
        {metric.suffix}
      </span>
      <span aria-hidden="true">
        {metric.prefix}
        <CountUp value={metric.value} active={active} />
        {metric.suffix}
      </span>
    </>
  )
}

export function ImpactStrip() {
  const { ref, inView } = useInView<HTMLUListElement>({ threshold: 0.3 })
  return (
    <ul ref={ref} aria-label="Impact highlights" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {impactMetrics.map((metric) => (
        <li key={metric.label} className="rounded-xl border border-impact-line bg-impact p-4 sm:p-5">
          <p className="font-mono text-2xl font-medium tabular-nums text-impact-num sm:text-3xl">
            <MetricValue metric={metric} active={inView} />
          </p>
          <p className="mt-2 text-sm font-semibold leading-snug text-ink">{metric.label}</p>
          <p className="mt-1 text-xs text-ink-2">{metric.source}</p>
        </li>
      ))}
    </ul>
  )
}
