'use client'

import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Fragment, useState } from 'react'
import { manufacturing } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'

type Mode = 'as-is' | 'to-be'

function Connector({ mode }: { mode: Mode }) {
  const isAsIs = mode === 'as-is'
  const stroke = isAsIs ? 'var(--warn)' : 'var(--d-accent)'
  const lineClass = isAsIs ? 'flow-dash-slow' : 'flow-dash'
  return (
    <div className="flex shrink-0 items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 32 16" className="hidden h-4 w-6 lg:block xl:w-8" preserveAspectRatio="none">
        <line x1="0" y1="8" x2="26" y2="8" stroke={stroke} strokeWidth="2" className={lineClass} />
        <path d="M24 3 L31 8 L24 13" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 16 28" className="h-7 w-4 lg:hidden">
        <line x1="8" y1="0" x2="8" y2="21" stroke={stroke} strokeWidth="2" className={lineClass} />
        <path d="M3 19 L8 27 L13 19" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function ProcessMap() {
  const [mode, setMode] = useState<Mode>('to-be')
  const [selected, setSelected] = useState(0)
  const stages = manufacturing.stages
  const stage = stages[selected]
  const isAsIs = mode === 'as-is'

  return (
    <div className="rounded-xl border border-line bg-surface p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-2">Select a stage to inspect its rule and KPI.</p>
        <div role="radiogroup" aria-label="Process view" className="relative grid grid-cols-2 rounded-full border border-line bg-surface-2 p-1">
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full shadow-sm transition-all duration-300 ease-out',
              isAsIs ? 'translate-x-0 bg-warn-soft ring-1 ring-warn/40' : 'translate-x-full bg-surface ring-1 ring-line',
            )}
          />
          {(
            [
              ['as-is', 'As-Is (Current Bottlenecks)'],
              ['to-be', 'To-Be (Target Workflow)'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={mode === value}
              onClick={() => setMode(value)}
              className={cn(
                'relative z-10 rounded-full px-3 py-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand sm:px-4',
                mode === value ? (value === 'as-is' ? 'text-warn-text' : 'text-ink') : 'text-ink-2 hover:text-ink',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ol className="mt-6 flex flex-col items-stretch lg:flex-row" aria-label="Six-stage process flow">
        {stages.map((s, i) => {
          const isSelected = selected === i
          const hasBottleneck = isAsIs && s.bottleneck
          return (
            <Fragment key={s.id}>
              {i > 0 && (
                <li aria-hidden="true" className="flex justify-center lg:items-center">
                  <Connector mode={mode} />
                </li>
              )}
              <li className="lg:min-w-0 lg:flex-1">
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex h-full w-full flex-col items-start gap-2 rounded-xl border-2 p-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:items-center lg:text-center',
                    isSelected
                      ? 'border-[var(--d-accent)] bg-[var(--d-soft)] shadow-sm'
                      : 'border-line bg-surface hover:border-[var(--d-accent)]/60 hover:bg-[var(--d-soft)]/45',
                  )}
                >
                  <span className="flex w-full items-center gap-2 lg:flex-col">
                    <span
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium transition-colors duration-200',
                        hasBottleneck ? 'bg-warn-soft text-warn-text' : 'bg-[var(--d-soft)] text-[var(--d-text)]',
                      )}
                    >
                      {String(s.id).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold leading-tight text-ink">{s.name}</span>
                  </span>
                  <span className="min-h-6">
                    {isAsIs ? (
                      s.bottleneck ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-warn-soft ring-1 ring-warn/40 px-2 py-0.5 text-[11px] font-semibold text-warn-text">
                          <AlertTriangle className="soft-pulse size-3 shrink-0" aria-hidden="true" />
                          {s.bottleneck}
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-ink-2">Manual handoff</span>
                      )
                    ) : (
                      <span className="fade-in inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--d-text)]">
                        <CheckCircle2 className="size-3.5 text-ok" aria-hidden="true" />
                        {s.ruleId} gate
                      </span>
                    )}
                  </span>
                </button>
              </li>
            </Fragment>
          )
        })}
      </ol>

      <div
        key={`${selected}-${mode}`}
        className="fade-in mt-6 grid gap-4 rounded-xl border border-line bg-surface-2 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4"
        aria-live="polite"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">Stage {stage.id} · Area</p>
          <p className="mt-1 font-heading font-semibold text-ink">{stage.name}</p>
          <p className="text-sm text-ink-2">{stage.area}</p>
        </div>
        <div className={cn('rounded-lg p-3 transition-colors', isAsIs ? 'bg-warn-soft' : '')}>
          <p className={cn('text-[11px] font-semibold uppercase tracking-wide', isAsIs ? 'text-warn-text' : 'text-ink-2')}>
            As-Is Gap
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink">{stage.asIsGap}</p>
        </div>
        <div className={cn('rounded-lg p-3 transition-colors', !isAsIs ? 'bg-[var(--d-soft)]' : '')}>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--d-text)]">
            To-Be Rule · <span className="font-mono">{stage.ruleId}</span>
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink">{stage.rule}</p>
        </div>
        <div className="rounded-lg p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">KPI</p>
          <p className="mt-1 font-mono text-sm font-medium text-impact-num">{stage.kpi}</p>
        </div>
      </div>
    </div>
  )
}
