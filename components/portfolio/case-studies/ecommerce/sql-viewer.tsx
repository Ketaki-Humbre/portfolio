'use client'

import { Database } from 'lucide-react'
import { type KeyboardEvent, type ReactNode, useRef, useState } from 'react'
import { ecommerce } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'
import { CopyButton } from '../../copy-button'

const KEYWORDS =
  /\b(SELECT|FROM|JOIN|LEFT|ON|GROUP|BY|ORDER|DESC|AS|COUNT|DISTINCT|ROUND|NULLIF|SUM|AVG|CASE|WHEN|THEN|ELSE|END|DATEDIFF)\b/g

function highlightLine(line: string): ReactNode {
  if (line.trimStart().startsWith('--')) return <span className="text-slate-400">{line}</span>
  const parts: ReactNode[] = []
  let last = 0
  for (const match of line.matchAll(KEYWORDS)) {
    const index = match.index ?? 0
    if (index > last) parts.push(line.slice(last, index))
    parts.push(
      <span key={index} className="text-indigo-300">
        {match[0]}
      </span>,
    )
    last = index + match[0].length
  }
  parts.push(line.slice(last))
  return parts
}

export function SqlViewer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const queries = ecommerce.sqlQueries
  const active = queries[activeIndex]

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (activeIndex + (e.key === 'ArrowRight' ? 1 : -1) + queries.length) % queries.length
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="overflow-hidden rounded-xl border border-code-line bg-code">
      <div className="flex flex-col gap-3 border-b border-code-line px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div role="tablist" aria-label="SQL queries" className="flex gap-1 overflow-x-auto" onKeyDown={onKeyDown}>
          {queries.map((q, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={q.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`sql-tab-${q.id}`}
                aria-selected={isActive}
                aria-controls="sql-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-indigo-300',
                  isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
                )}
              >
                <Database className="size-3.5" aria-hidden="true" />
                {q.label}
              </button>
            )
          })}
        </div>
        <CopyButton value={active.code} label="Copy SQL" variant="code" className="self-start sm:self-auto" />
      </div>
      <div
        id="sql-panel"
        role="tabpanel"
        aria-labelledby={`sql-tab-${active.id}`}
        tabIndex={0}
        key={active.id}
        className="fade-in max-h-[420px] overflow-auto focus-visible:outline-2 focus-visible:outline-indigo-300"
      >
        <pre className="p-4 font-mono text-[13px] leading-relaxed text-code-ink">
          <code>
            {active.code.split('\n').map((line, i) => (
              <span key={i} className="block">
                <span className="mr-4 inline-block w-5 select-none text-right text-slate-500" aria-hidden="true">
                  {i + 1}
                </span>
                {highlightLine(line)}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
