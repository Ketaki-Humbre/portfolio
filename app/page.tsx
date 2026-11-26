import { CaseStudies } from '@/components/portfolio/case-studies/case-studies'
import { Contact } from '@/components/portfolio/contact'
import { Education } from '@/components/portfolio/education'
import { Experience } from '@/components/portfolio/experience'
import { Hero } from '@/components/portfolio/hero'
import { Navbar } from '@/components/portfolio/navbar'
import { Skills } from '@/components/portfolio/skills'

export default function Page() {
  return (
    <div id="page-content">
      <a
        href="#case-studies"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to case studies
      </a>
      <Navbar />
      <main>
        <Hero />
        <CaseStudies />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
