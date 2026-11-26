import { manufacturing } from '@/src/data/portfolioData'
import { DataTable, MonoTag } from '../data-table'
import { ExecutiveSummary, StudySection } from '../study-section'
import { ProcessMap } from './process-map'

type Story = (typeof manufacturing.userStories)[number]
type Kpi = (typeof manufacturing.kpis)[number]

export function ManufacturingStudy() {
  return (
    <>
      <ExecutiveSummary id="mfg-summary">{manufacturing.executiveSummary}</ExecutiveSummary>

      <StudySection
        id="mfg-process"
        title="As-Is vs. To-Be Process Map"
        description="Six stages across Supplier Management, Procurement, Inventory Control, and Quality Control. Toggle views to compare current bottlenecks with the governed target workflow."
      >
        <ProcessMap />
      </StudySection>

      <StudySection
        id="mfg-stories"
        title="Core Functional Requirements & Agile User Stories"
        description="4 featured from 18 total user stories, each traced to a business rule with Given / When / Then acceptance criteria."
      >
        <DataTable<Story>
          caption="Featured user stories with business rules and acceptance criteria"
          rows={manufacturing.userStories}
          rowKey={(r) => r.id}
          columns={[
            { key: 'id', header: 'Req ID', className: 'w-24', render: (r) => <MonoTag>{r.id}</MonoTag> },
            {
              key: 'area',
              header: 'Operational Area',
              className: 'w-36',
              render: (r) => <span className="font-medium text-ink">{r.area}</span>,
            },
            { key: 'story', header: 'Agile User Story', render: (r) => r.story },
            {
              key: 'rule',
              header: 'Business Rule / Acceptance Criteria',
              className: 'sm:w-[38%]',
              render: (r) => (
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-ink">{r.rule}</p>
                  <ul className="flex flex-col gap-1 text-xs">
                    <li>
                      <span className="font-mono font-medium text-[var(--d-text)]">Given</span> {r.given}
                    </li>
                    <li>
                      <span className="font-mono font-medium text-[var(--d-text)]">When</span> {r.when}
                    </li>
                    <li>
                      <span className="font-mono font-medium text-[var(--d-text)]">Then</span> {r.then}
                    </li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </StudySection>

      <StudySection
        id="mfg-kpis"
        title="Operational KPI Governance Matrix"
        description="5 KPIs with modeled as-is baselines against target benchmarks."
      >
        <DataTable<Kpi>
          caption="Operational KPIs with formulas, baselines, and targets"
          rows={manufacturing.kpis}
          rowKey={(r) => r.name}
          columns={[
            { key: 'name', header: 'KPI Name', className: 'w-48', render: (r) => <span className="font-semibold text-ink">{r.name}</span> },
            { key: 'formula', header: 'Formula', render: (r) => <code className="font-mono text-xs text-ink">{r.formula}</code> },
            {
              key: 'target',
              header: 'Modeled Baseline → Target',
              className: 'w-44',
              render: (r) => (
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs font-medium">
                  <span className="rounded bg-warn-soft px-1.5 py-0.5 text-warn-text">{r.baseline}</span>
                  <span aria-hidden="true" className="text-ink-2">
                    →
                  </span>
                  <span className="sr-only">to</span>
                  <span className="rounded bg-impact px-1.5 py-0.5 text-impact-num">{r.target}</span>
                </span>
              ),
            },
            { key: 'decision', header: 'Business Decision Enabled', render: (r) => r.decision },
          ]}
        />
      </StudySection>
    </>
  )
}
