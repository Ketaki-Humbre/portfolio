import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  caption,
}: {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  caption: string
}) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-line bg-surface sm:block">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line bg-surface-2">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn('px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-2', col.className)}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={rowKey(row)} className="border-b border-line align-top last:border-0 hover:bg-surface-2/60">
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-4 leading-relaxed text-ink-2', col.className)}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 sm:hidden" aria-label={caption}>
        {rows.map((row) => (
          <li key={rowKey(row)} className="rounded-xl border border-line bg-surface p-4">
            <dl className="flex flex-col gap-3">
              {columns.map((col) => (
                <div key={col.key}>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-2">{col.header}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-2">{col.render(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}

export function MonoTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block whitespace-nowrap rounded-md bg-[var(--d-soft)] px-2 py-0.5 font-mono text-xs font-medium text-[var(--d-text)]">
      {children}
    </span>
  )
}
