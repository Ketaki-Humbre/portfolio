import { kyc } from '@/src/data/portfolioData'
import { DataTable, MonoTag } from '../data-table'
import { ExecutiveSummary, StudySection } from '../study-section'
import { KycSimulator } from './kyc-simulator'

type ExceptionRow = (typeof kyc.exceptions)[number]
type UatRow = (typeof kyc.uat)[number]

export function KycStudy() {
  return (
    <>
      <ExecutiveSummary id="kyc-summary">{kyc.executiveSummary}</ExecutiveSummary>

      <StudySection
        id="kyc-simulator"
        title="KYC Onboarding & Exception Path Simulator"
        description="Pick a scenario to trace it across 4 swimlanes: where it is detected, what the system does, and what the customer sees."
      >
        <ul className="mb-4 flex flex-wrap gap-2" aria-label="SLA rules">
          {kyc.slaRules.map((rule) => (
            <li key={rule} className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs font-medium text-ink">
              {rule}
            </li>
          ))}
        </ul>
        <KycSimulator />
      </StudySection>

      <StudySection
        id="kyc-exceptions"
        title="Complete 8 Exception Scenarios Matrix"
        description="Every edge case has a defined detection point, system action, and a non-dead-end recovery path."
      >
        <DataTable<ExceptionRow>
          caption="Exception scenarios matrix"
          rows={kyc.exceptions}
          rowKey={(r) => r.id}
          columns={[
            { key: 'id', header: 'ID', className: 'w-20', render: (r) => <MonoTag>{r.id}</MonoTag> },
            { key: 'scenario', header: 'Exception Scenario', render: (r) => <span className="font-medium text-ink">{r.scenario}</span> },
            { key: 'stage', header: 'Detection Stage', className: 'w-36', render: (r) => r.stage },
            { key: 'action', header: 'System Action', render: (r) => r.action },
            { key: 'recovery', header: 'Customer Notification & Recovery Path', render: (r) => r.recovery },
          ]}
        />
      </StudySection>

      <StudySection
        id="kyc-uat"
        title="UAT Test Scenario Traceability Matrix"
        description="5 core scenarios featured from 24 total UAT cases, each traced to a requirement or exception path (ISTQB-aligned test design)."
      >
        <DataTable<UatRow>
          caption="UAT traceability matrix"
          rows={kyc.uat}
          rowKey={(r) => r.id}
          columns={[
            { key: 'id', header: 'Test ID', className: 'w-24', render: (r) => <MonoTag>{r.id}</MonoTag> },
            { key: 'linked', header: 'Linked Req / Exception', className: 'w-44', render: (r) => <span className="font-medium text-ink">{r.linked}</span> },
            { key: 'steps', header: 'Test Scenario & Steps', render: (r) => r.steps },
            { key: 'expected', header: 'Expected System Outcome', render: (r) => r.expected },
          ]}
        />
      </StudySection>
    </>
  )
}
