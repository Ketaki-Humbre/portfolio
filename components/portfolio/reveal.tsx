'use client'

import type { ReactNode } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode
  index?: number
  className?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ transitionDelay: inView ? `${index * 75}ms` : undefined }}
    >
      {children}
    </div>
  )
}
