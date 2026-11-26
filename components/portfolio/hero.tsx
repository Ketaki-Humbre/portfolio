import { ArrowDown } from 'lucide-react'
import { profile } from '@/src/data/portfolioData'
import { HeroAmbient } from './hero-ambient'
import { ImpactStrip } from './impact-strip'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="hero-wash relative overflow-hidden border-b border-line">
      <HeroAmbient />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:pb-20 lg:pt-24">
        <div className="max-w-3xl">
          <p
            className="hero-in inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs font-medium text-ink-2 shadow-sm sm:text-sm"
            style={{ animationDelay: '0ms' }}
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.status}
          </p>

          <h1
            id="hero-name"
            className="hero-in mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '80ms' }}
          >
            {profile.name}
          </h1>

          <div className="hero-in" style={{ animationDelay: '160ms' }}>
            <p className="mt-4 font-heading text-lg font-semibold text-ink sm:text-xl">{profile.subtitle}</p>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink-2 sm:text-lg">{profile.pitch}</p>
          </div>

          <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '240ms' }}>
            <a
              href="#case-studies"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-md hover:shadow-brand/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Explore Case Studies
              <ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-in mt-12" style={{ animationDelay: '320ms' }}>
          <ImpactStrip />
        </div>
      </div>
    </section>
  )
}
