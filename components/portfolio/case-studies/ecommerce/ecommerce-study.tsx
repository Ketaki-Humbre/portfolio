import { ecommerce } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'
import { DataTable } from '../data-table'
import { ExecutiveSummary, StudySection } from '../study-section'
import { ReturnsExplorer } from './returns-explorer'
import { SqlViewer } from './sql-viewer'

type Recommendation = (typeof ecommerce.recommendations)[number]

export function EcommerceStudy() {
  return (
    <>
      <ExecutiveSummary id="ecom-summary">{ecommerce.executiveSummary}</ExecutiveSummary>

      <StudySection
        id="ecom-explorer"
        title="Live BI Dashboard Explorer"
        description="Filter by category to see how return drivers, refund turnaround, and pickup failures shift across the catalog."
      >
        <ReturnsExplorer />
      </StudySection>

      <StudySection id="ecom-kpis" title="6 Business KPIs Tracked" description="Readings from the project dataset model.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ecommerce.kpis.map((kpi, i) => (
            <li key={kpi.name} className="rounded-xl border border-line bg-surface p-5">
              <p className="font-mono text-xs font-medium text-ink-2">KPI {String(i + 1).padStart(2, '0')}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{kpi.name}</p>
              <p className="mt-3 font-mono text-xl font-medium text-[var(--d-text)]">{kpi.value}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{kpi.context}</p>
            </li>
          ))}
        </ul>
      </StudySection>

      <StudySection
        id="ecom-sql"
        title="Interactive SQL Query Viewer"
        description={`Queries run against the modeled tables: ${ecommerce.datasets.join(', ')}.`}
      >
        <SqlViewer />
      </StudySection>

      <StudySection
        id="ecom-recs"
        title={'Prioritized Business Recommendations — "So What?" Matrix'}
        description="Each finding traced to a root cause, an operational action, and a projected impact."
      >
        <DataTable<Recommendation>
          caption="Prioritized business recommendations"
          rows={ecommerce.recommendations}
          rowKey={(r) => r.finding}
          columns={[
            {
              key: 'priority',
              header: 'Priority',
              className: 'w-24',
              render: (r) => (
                <span
                  className={cn(
                    'inline-block whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-xs font-medium',
                    r.priority.startsWith('P1') ? 'bg-alert-soft text-alert-text' : 'bg-warn-soft text-warn-text',
                  )}
                >
                  {r.priority}
                </span>
              ),
            },
            { key: 'finding', header: 'Analytical Finding', render: (r) => <span className="font-medium text-ink">{r.finding}</span> },
            { key: 'cause', header: 'Root Cause', render: (r) => r.rootCause },
            { key: 'action', header: 'Recommended Action', render: (r) => r.action },
            {
              key: 'impact',
              header: 'Projected Impact',
              render: (r) => <span className="text-[var(--d-text)]">{r.impact}</span>,
            },
          ]}
        />
      </StudySection>
    </>
  )
}
