'use client'

import { Clock, PackageX, RotateCcw, Truck } from 'lucide-react'
import { useState } from 'react'
import { ecommerce } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'

// Shared axis across categories so bar widths animate meaningfully between filters.
const BAR_SCALE_MAX = 60

function BarPanel({
  title,
  bars,
  tone,
  animKey,
}: {
  title: string
  bars: { label: string; value: number }[]
  tone: 'accent' | 'brand'
  animKey: string
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <ul className="mt-4 flex flex-col gap-3.5">
        {bars.map((bar, i) => (
          <li key={i}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span key={`${animKey}-${bar.label}`} className="fade-in min-w-0 text-ink-2">
                {bar.label}
              </span>
              <span key={`${animKey}-v`} className="fade-in font-mono text-sm font-medium tabular-nums text-ink">
                {bar.value}%
              </span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
              <div
                className={cn(
                  'h-full rounded-full transition-[width] duration-500 ease-out',
                  tone === 'accent' ? 'bg-[var(--d-accent)]' : 'bg-brand',
                )}
                style={{ width: `${Math.min((bar.value / BAR_SCALE_MAX) * 100, 100)}%`, opacity: 1 - i * 0.15 }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ReturnsExplorer() {
  const [categoryId, setCategoryId] = useState('all')
  const category = ecommerce.categories.find((c) => c.id === categoryId) ?? ecommerce.categories[0]
  const m = category.metrics

  const tiles = [
    { label: 'Return Rate', value: m.returnRate, detail: m.returns, icon: RotateCcw },
    { label: 'Avg Refund TAT', value: m.refundTat, detail: 'Initiation → refund', icon: Clock },
    { label: 'Pickup Failure', value: m.pickupFailure, detail: 'Of pickup attempts', icon: Truck },
    { label: 'Pending >7d SLA', value: m.pendingSla, detail: m.pendingOpen, icon: PackageX },
  ]

  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4 sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[var(--d-accent)]" aria-hidden="true" />
          <h4 className="font-heading text-base font-semibold text-ink">{ecommerce.explorerTitle}</h4>
        </div>
        <div role="radiogroup" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {ecommerce.categories.map((c) => {
            const isActive = c.id === categoryId
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setCategoryId(c.id)}
                className={cn(
                  'h-9 rounded-full border px-3.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                  isActive
                    ? 'border-[var(--d-accent)] bg-[var(--d-soft)] text-[var(--d-text)] shadow-sm'
                    : 'border-line bg-surface text-ink-2 hover:border-[var(--d-accent)]/60 hover:bg-[var(--d-soft)]/70 hover:text-[var(--d-text)]',
                )}
              >
                {c.label} <span className="font-mono font-medium">({c.orders.toLocaleString('en-US')}{c.id === 'all' ? ' Orders' : ''})</span>
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-live="polite">
        {tiles.map((tile) => (
          <li key={tile.label} className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-ink-2">{tile.label}</p>
              <tile.icon className="size-4 text-[var(--d-accent)]" aria-hidden="true" />
            </div>
            <p
              key={`${categoryId}-${tile.label}`}
              className="fade-in mt-2 whitespace-nowrap font-mono text-xl font-medium sm:text-2xl tabular-nums text-[var(--d-text)]"
            >
              {tile.value}
            </p>
            <p key={`${categoryId}-${tile.label}-d`} className="fade-in mt-0.5 text-xs text-ink-2">
              {tile.detail}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <BarPanel title="Top Return Drivers (%)" bars={category.drivers} tone="accent" animKey={categoryId} />
        <BarPanel title="Reverse Pickup Failure Reasons (%)" bars={category.pickupReasons} tone="brand" animKey={categoryId} />
      </div>

      <p className="mt-4 text-xs italic text-ink-2">{ecommerce.footnote}</p>
    </div>
  )
}
