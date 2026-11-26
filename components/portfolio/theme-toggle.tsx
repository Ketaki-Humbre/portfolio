'use client'

import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

const getSnapshot = () => document.documentElement.classList.contains('dark')
const getServerSnapshot = () => false

function setTheme(dark: boolean) {
  const root = document.documentElement
  root.classList.add('no-theme-transition')
  root.classList.toggle('dark', dark)
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {}
  // Force synchronous reflow so the browser commits the new theme in a single frame
  void window.getComputedStyle(root).opacity
  requestAnimationFrame(() => {
    root.classList.remove('no-theme-transition')
  })
}

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const ActiveIcon = isDark ? Moon : Sun

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={() => setTheme(!isDark)}
      className={cn(
        'relative inline-flex h-9 w-[68px] shrink-0 items-center rounded-full border border-line bg-surface-2 p-1 transition-colors duration-200 hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        className,
      )}
    >
      <Sun className="absolute left-2.5 size-3.5 text-ink-2" aria-hidden="true" />
      <Moon className="absolute right-2.5 size-3.5 text-ink-2" aria-hidden="true" />
      <span
        data-theme-toggle-thumb
        className={cn(
          'relative z-10 flex size-7 items-center justify-center rounded-full bg-surface shadow-sm ring-1 ring-line transition-transform duration-150 ease-out',
          isDark ? 'translate-x-[30px]' : 'translate-x-0',
        )}
      >
        <ActiveIcon
          className={cn('size-4 text-brand transition-transform duration-150', isDark ? 'rotate-180' : 'rotate-0')}
          aria-hidden="true"
        />
      </span>
    </button>
  )
}
