'use client'

import { Bell, Cpu, ScanSearch } from 'lucide-react'
import { useState } from 'react'
import { kyc, kycLanes, type KycScenario } from '@/src/data/portfolioData'
import { cn } from '@/lib/utils'

const VIEW_W = 1000
const HEADER_H = 44
const LANE_H = 86
const LABEL_W = 150
const COL_W = (VIEW_W - LABEL_W - 10) / 6

const colX = (stageIndex: number) => LABEL_W + COL_W * stageIndex + COL_W / 2
const laneY = (lane: number) => HEADER_H + LANE_H * lane + LANE_H / 2

const toneColor: Record<KycScenario['tone'], string> = {
  ok: 'var(--ok)',
  warn: 'var(--warn)',
  alert: 'var(--alert)',
}

function buildPath(endIndex: number) {
  const pts = kyc.stages.slice(0, endIndex + 1).map((s, i) => [colX(i), laneY(s.lane)] as const)
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    if (y0 === y1) d += ` L ${x1} ${y1}`
    else d += ` C ${x0 + COL_W / 2} ${y0}, ${x1 - COL_W / 2} ${y1}, ${x1} ${y1}`
  }
  return d
}

type NodeState = 'passed' | 'triggered' | 'skipped'

function nodeState(stageIndex: number, scenario: KycScenario): NodeState {
  const detection = scenario.detectionStage - 1
  if (scenario.tone === 'ok') return 'passed'
  if (stageIndex < detection) return 'passed'
  if (stageIndex === detection) return 'triggered'
  return 'skipped'
}

function SwimlaneDiagram({ scenario }: { scenario: KycScenario }) {
  const detection = scenario.detectionStage - 1
  const color = toneColor[scenario.tone]
  const detX = colX(detection)
  const detY = laneY(kyc.stages[detection].lane)
  const branch = scenario.branch
  const branchY = branch ? laneY(branch.lane) : 0
  const branchDir = branchY < detY ? -1 : 1
  const totalH = HEADER_H + LANE_H * kycLanes.length

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${totalH}`} className="h-auto w-full" role="img" aria-labelledby="kyc-diagram-title">
      <title id="kyc-diagram-title">
        {`KYC onboarding swimlane: ${scenario.pill}. ${scenario.detection}.`}
      </title>

      {kycLanes.map((lane, i) => (
        <g key={lane}>
          <rect
            x="0"
            y={HEADER_H + LANE_H * i}
            width={VIEW_W}
            height={LANE_H}
            fill={i % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)'}
          />
          <line x1="0" x2={VIEW_W} y1={HEADER_H + LANE_H * i} y2={HEADER_H + LANE_H * i} stroke="var(--line)" />
          <text x="14" y={laneY(i) + 5} fontSize="13" fontWeight="600" fill="var(--ink)">
            {lane}
          </text>
        </g>
      ))}
      <line x1={LABEL_W - 8} x2={LABEL_W - 8} y1="0" y2={totalH} stroke="var(--line)" />

      {kyc.stages.map((stage, i) => (
        <text
          key={stage.id}
          x={colX(i)}
          y="27"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={nodeState(i, scenario) === 'skipped' ? 'var(--ink-2)' : 'var(--ink)'}
        >
          {`S${stage.id} ${stage.short}`}
        </text>
      ))}

      <path d={buildPath(5)} fill="none" stroke="var(--line)" strokeWidth="3" strokeDasharray="4 6" />

      <g key={scenario.id}>
        <path
          d={buildPath(detection)}
          fill="none"
          stroke="var(--ok)"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          className="draw-path"
          style={{ filter: 'drop-shadow(0 0 4px color-mix(in srgb, var(--ok) 45%, transparent))' }}
        />

        {kyc.stages.map((stage, i) => {
          const state = nodeState(i, scenario)
          const x = colX(i)
          const y = laneY(stage.lane)
          const accent = state === 'passed' ? 'var(--ok)' : state === 'triggered' ? color : 'var(--line)'
          const fill = state === 'skipped' ? 'var(--surface)' : `color-mix(in srgb, ${accent} 22%, var(--surface))`
          return (
            <g key={stage.id} opacity={state === 'skipped' ? 0.45 : 1} className="transition-opacity duration-300">
              {state === 'triggered' && (
                <circle cx={x} cy={y} r="17" fill={color} className="ring-pulse" style={{ animationDelay: '0.9s' }} />
              )}
              <circle
                cx={x}
                cy={y}
                r="17"
                style={{ fill }}
                stroke={accent}
                strokeWidth="2.5"
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={state === 'skipped' ? 'var(--ink-2)' : 'var(--ink)'}
              >
                {stage.id}
              </text>
            </g>
          )
        })}

        {scenario.tone === 'ok' && scenario.endLabel && (
          <g className="fade-in" style={{ animationDelay: '1s' }}>
            <rect x={VIEW_W - 262} y={laneY(1) + 26} width="252" height="30" rx="8" fill="var(--ok)" opacity="0.15" />
            <text x={VIEW_W - 136} y={laneY(1) + 46} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">
              {scenario.endLabel}
            </text>
          </g>
        )}

        {branch && (
          <>
            <path
              d={`M ${detX} ${detY + branchDir * 18} L ${detX} ${branchY - branchDir * 20}`}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              className="draw-path"
              style={{ animationDelay: '0.9s', animationDuration: '0.5s' }}
            />
            <g className="fade-in" style={{ animationDelay: '1.3s' }}>
              <path
                d={`M ${detX - 7} ${branchY - branchDir * 28} L ${detX} ${branchY - branchDir * 18} L ${detX + 7} ${branchY - branchDir * 28}`}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <rect
                x={detX - 84}
                y={branchY - 17}
                width="168"
                height="34"
                rx="8"
                fill="var(--surface)"
                stroke={color}
                strokeWidth="2"
              />
              <text x={detX} y={branchY + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">
                {branch.label}
              </text>
            </g>
          </>
        )}
      </g>
    </svg>
  )
}

function MobileStepper({ scenario }: { scenario: KycScenario }) {
  const color = toneColor[scenario.tone]
  return (
    <ol key={scenario.id} className="flex flex-col" aria-label={`Stage trace for ${scenario.pill}`}>
      {kyc.stages.map((stage, i) => {
        const state = nodeState(i, scenario)
        const isLast = i === kyc.stages.length - 1
        return (
          <li
            key={stage.id}
            className={cn('slide-in relative flex gap-3 pb-4', state === 'skipped' && 'opacity-40')}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-7 h-[calc(100%-20px)] w-0.5"
                style={{ background: state === 'passed' && i < scenario.detectionStage - 1 ? 'var(--ok)' : 'var(--line)' }}
              />
            )}
            <span
              className={cn(
                'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium',
                state === 'skipped' ? 'border border-line bg-surface text-ink-2' : 'border-2 text-ink',
              )}
              style={
                state === 'skipped'
                  ? undefined
                  : (() => {
                      const accent = state === 'triggered' ? color : 'var(--ok)'
                      return { borderColor: accent, background: `color-mix(in srgb, ${accent} 22%, var(--surface))` }
                    })()
              }
            >
              {stage.id}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-sm font-semibold text-ink">{stage.name}</p>
              <p className="text-xs text-ink-2">{kycLanes[stage.lane]}</p>
              {state === 'triggered' && scenario.branch && (
                <p
                  className="mt-1.5 inline-flex rounded-md px-2 py-1 text-xs font-semibold text-ink"
                  style={{ background: `color-mix(in srgb, ${color} 18%, transparent)` }}
                >
                  {'→ '}
                  {kycLanes[scenario.branch.lane]}: {scenario.branch.label}
                </p>
              )}
              {isLast && scenario.tone === 'ok' && scenario.endLabel && (
                <p className="mt-1.5 inline-flex rounded-md bg-ok/15 px-2 py-1 text-xs font-semibold text-ink">
                  {scenario.endLabel}
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export function KycSimulator() {
  const [scenarioId, setScenarioId] = useState('happy')
  const scenario = kyc.scenarios.find((s) => s.id === scenarioId) ?? kyc.scenarios[0]
  const color = toneColor[scenario.tone]

  const outcomes = [
    { title: 'Detection Stage & SLA Rule', body: scenario.detection, icon: ScanSearch },
    { title: 'Automated System Action', body: scenario.systemAction, icon: Cpu },
    { title: 'Customer UI & Recovery Path', body: `"${scenario.customerMessage}"`, icon: Bell },
  ]

  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4 sm:p-6">
      <div role="radiogroup" aria-label="Onboarding scenario" className="flex flex-wrap gap-2">
        {kyc.scenarios.map((s) => {
          const isActive = s.id === scenarioId
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setScenarioId(s.id)}
              className={cn(
                'h-9 rounded-full border px-3.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                isActive
                  ? s.tone === 'ok'
                    ? 'border-ok bg-ok/15 text-ink'
                    : s.tone === 'alert'
                      ? 'border-alert bg-alert-soft text-alert-text'
                      : 'border-warn bg-warn-soft text-warn-text'
                  : s.tone === 'ok'
                      ? 'border-line bg-surface text-ink-2 hover:border-ok/60 hover:bg-ok/10 hover:text-ink'
                      : s.tone === 'alert'
                        ? 'border-line bg-surface text-ink-2 hover:border-alert/60 hover:bg-alert-soft/70 hover:text-alert-text'
                        : 'border-line bg-surface text-ink-2 hover:border-warn/60 hover:bg-warn-soft/70 hover:text-warn-text',
              )}
            >
              {s.pill}
            </button>
          )
        })}
      </div>

      <div className="mt-5 hidden overflow-hidden rounded-xl border border-line md:block">
        <SwimlaneDiagram scenario={scenario} />
      </div>
      <div className="mt-5 rounded-xl border border-line bg-surface p-4 md:hidden">
        <MobileStepper scenario={scenario} />
      </div>

      <ul key={scenario.id} className="mt-4 grid gap-3 md:grid-cols-3" aria-live="polite">
        {outcomes.map((o, i) => (
          <li
            key={o.title}
            className="slide-in rounded-xl border border-line border-l-4 bg-surface p-4"
            style={{ animationDelay: `${i * 90}ms`, borderLeftColor: color }}
          >
            <div className="flex items-center gap-2">
              <o.icon className="size-4 text-ink-2" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">{o.title}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink">{o.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
