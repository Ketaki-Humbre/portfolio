import { Download } from 'lucide-react'
import { profile } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'

export function ResumeButton({
  variant = 'solid',
  label = 'Download Resume',
  className,
}: {
  variant?: 'solid' | 'outline'
  label?: string
  className?: string
}) {
  return (
    <a
      href={profile.resumeUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        variant === 'solid' &&
          'bg-brand text-white shadow-sm hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-md hover:shadow-brand/20',
        variant === 'outline' &&
          'border border-brand/35 bg-surface/85 text-ink hover:-translate-y-0.5 hover:border-brand hover:bg-(--brand-soft) hover:text-(--brand-soft-text) hover:shadow-sm',
        className,
      )}
    >
      <Download className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
      {label}
    </a>
  )
}
