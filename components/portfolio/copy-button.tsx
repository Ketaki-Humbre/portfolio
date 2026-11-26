'use client'

import { Check, Copy, Link2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function CopyButton({
  value,
  label,
  className,
  variant = 'outline',
  icon = 'copy',
  copiedLabel = 'Copied!',
}: {
  value: string
  label: string
  className?: string
  variant?: 'outline' | 'code' | 'subtle'
  icon?: 'copy' | 'link'
  copiedLabel?: string
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const area = document.createElement('textarea')
      area.value = value
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  const IdleIcon = icon === 'link' ? Link2 : Copy

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        variant === 'outline' &&
          'h-11 border-line bg-surface px-4 text-ink hover:-translate-y-0.5 hover:border-ok/55 hover:bg-impact hover:text-impact-num hover:shadow-sm',
        variant === 'subtle' &&
          'h-9 border-line bg-surface px-3 text-xs font-semibold text-ink-2 hover:border-[var(--d-accent)]/60 hover:bg-[var(--d-soft)] hover:text-[var(--d-text)]',
        variant === 'code' &&
          'h-8 border-code-line bg-white/5 px-3 text-xs text-code-ink hover:border-indigo-400/50 hover:bg-indigo-500/15 hover:text-indigo-200',
        copied && variant === 'outline' && 'border-emerald-500/60 bg-impact text-emerald-700 dark:text-emerald-300',
        copied && variant === 'subtle' && 'border-emerald-500/60 bg-impact text-emerald-700 dark:text-emerald-300',
        copied && variant === 'code' && 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300',
        className,
      )}
    >
      <span className="relative size-4 shrink-0" aria-hidden="true">
        <IdleIcon
          className={cn('absolute inset-0 size-4 transition-all duration-200', copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100')}
        />
        <Check
          className={cn('absolute inset-0 size-4 transition-all duration-200', copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0')}
        />
      </span>
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  )
}
