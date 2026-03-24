type ChartVariant = 'ph' | 'do' | 'offgas' | 'temperature'

interface ChartConfig {
  statusText: string
  legend: { label: string; color: string; dashed?: boolean }[]
  yLeft: { top: string; bottom: string; color: string }
  yRight: { top: string; bottom: string; color: string }
  timeLabels: [string, string, string]
  curves: { points: [number, number][]; color: string; dashed?: boolean }[]
  marker?: { t: number; label: string }
}

const width = 480
const height = 180
const pad = { top: 20, right: 50, bottom: 30, left: 50 }
const w = width - pad.left - pad.right
const h = height - pad.top - pad.bottom

function generateCurve(fn: (t: number) => number, steps = 40): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const y = fn(t)
    pts.push([pad.left + t * w, pad.top + (1 - y) * h])
  }
  return pts
}

const toPath = (pts: [number, number][]) =>
  pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')

function getConfig(variant: ChartVariant): ChartConfig {
  switch (variant) {
    case 'ph':
      return {
        statusText: 'Reactor 3 — Live',
        legend: [
          { label: 'Biomass', color: '#14B8A6' },
          { label: 'Glucose', color: '#FBBF24', dashed: true },
        ],
        yLeft: { top: '20', bottom: '0', color: 'rgba(20,184,166,0.5)' },
        yRight: { top: '40', bottom: '0', color: 'rgba(251,191,36,0.5)' },
        timeLabels: ['0h', '120h', '240h'],
        curves: [
          { points: generateCurve(t => 1 / (1 + Math.exp(-8 * (t - 0.4)))), color: '#14B8A6' },
          { points: generateCurve(t => Math.max(0.05, 1 - 1 / (1 + Math.exp(-10 * (t - 0.5))))), color: '#FBBF24', dashed: true },
        ],
        marker: { t: 0.7, label: 'now' },
      }

    case 'do':
      return {
        statusText: 'Reactor 2 — Batch #467',
        legend: [
          { label: 'DO %', color: '#60A5FA' },
          { label: 'Feed rate', color: '#FB7185', dashed: true },
        ],
        yLeft: { top: '100%', bottom: '0%', color: 'rgba(96,165,250,0.5)' },
        yRight: { top: '2.0', bottom: '0', color: 'rgba(251,113,133,0.5)' },
        timeLabels: ['0h', '48h', '96h'],
        curves: [
          {
            // DO: steady ~40%, spike to ~85% at t=0.5, recovery
            points: generateCurve(t => {
              const base = 0.4
              const spike = 0.45 * Math.exp(-((t - 0.5) ** 2) / 0.002)
              const recovery = t > 0.5 ? -0.15 * Math.exp(-((t - 0.55) ** 2) / 0.01) : 0
              return Math.min(0.95, base + spike + recovery)
            }, 80),
            color: '#60A5FA',
          },
          {
            // Feed rate: steady 0.5, drops to 0 briefly at t=0.49-0.51
            points: generateCurve(t => {
              if (t > 0.48 && t < 0.52) return 0.05
              return 0.5
            }, 80),
            color: '#FB7185',
            dashed: true,
          },
        ],
        marker: { t: 0.5, label: '48h' },
      }

    case 'offgas':
      return {
        statusText: 'Reactor 1 — Batch #470 vs Golden',
        legend: [
          { label: 'CO₂ current', color: '#34D399' },
          { label: 'CO₂ golden', color: '#34D399', dashed: true },
          { label: 'O₂ uptake', color: '#A78BFA' },
        ],
        yLeft: { top: '8.0', bottom: '0', color: 'rgba(52,211,153,0.5)' },
        yRight: { top: '12', bottom: '0', color: 'rgba(167,139,250,0.5)' },
        timeLabels: ['0h', '96h', '192h'],
        curves: [
          {
            // CO2 current — sigmoid rise, higher plateau
            points: generateCurve(t => 0.75 / (1 + Math.exp(-8 * (t - 0.35)))),
            color: '#34D399',
          },
          {
            // CO2 golden batch — same shape, slightly lower
            points: generateCurve(t => 0.65 / (1 + Math.exp(-8 * (t - 0.35)))),
            color: '#34D399',
            dashed: true,
          },
          {
            // O2 uptake — rises then plateaus, mirrors CO2
            points: generateCurve(t => 0.6 / (1 + Math.exp(-7 * (t - 0.4)))),
            color: '#A78BFA',
          },
        ],
        marker: { t: 0.65, label: 'now' },
      }

    case 'temperature':
      return {
        statusText: 'Reactor 1 — Batch #470',
        legend: [
          { label: 'Temp °C', color: '#FB923C' },
          { label: 'Viability %', color: '#F472B6', dashed: true },
        ],
        yLeft: { top: '38.0', bottom: '35.0', color: 'rgba(251,146,60,0.5)' },
        yRight: { top: '100', bottom: '80', color: 'rgba(244,114,182,0.5)' },
        timeLabels: ['0h', '96h', '192h'],
        curves: [
          {
            // Temperature: flat at 0.5 (36.5°C), spike to 0.85 (37.8°C) at t=0.5
            points: generateCurve(t => {
              const base = 0.5
              const spike = 0.35 * Math.exp(-((t - 0.5) ** 2) / 0.0008)
              return base + spike
            }, 80),
            color: '#FB923C',
          },
          {
            // Viability: high ~0.95, dip after temp excursion, slow recovery
            points: generateCurve(t => {
              if (t < 0.5) return 0.95
              const dip = 0.08 * Math.exp(-((t - 0.55) ** 2) / 0.01)
              return 0.95 - dip + (t > 0.6 ? 0.03 * (t - 0.6) : 0)
            }, 80),
            color: '#F472B6',
            dashed: true,
          },
        ],
        marker: { t: 0.5, label: '96h' },
      }
  }
}

export default function BioreactorChart({ variant = 'ph' }: { variant?: ChartVariant }) {
  const config = getConfig(variant)

  return (
    <div className="bg-navy-900/50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1 px-1">
        <span className="text-slate-500 text-xs">{config.statusText}</span>
        <div className="flex gap-3 text-xs flex-wrap justify-end">
          {config.legend.map((l, i) => (
            <span key={i} style={{ color: l.color }} className="flex items-center gap-1">
              <span
                className="w-2 h-0.5 inline-block rounded"
                style={{
                  backgroundColor: l.color,
                  ...(l.dashed ? { backgroundImage: `repeating-linear-gradient(90deg, ${l.color} 0px, ${l.color} 2px, transparent 2px, transparent 4px)`, backgroundColor: 'transparent' } : {}),
                }}
              />
              {l.label}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 'auto' }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={pad.left} y1={pad.top + f * h}
            x2={pad.left + w} y2={pad.top + f * h}
            stroke="rgba(255,255,255,0.05)" strokeWidth={1}
          />
        ))}
        {/* Axes */}
        <line x1={pad.left} y1={pad.top + h} x2={pad.left + w} y2={pad.top + h} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + h} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        {/* Time labels */}
        <text x={pad.left} y={height - 5} fill="rgba(255,255,255,0.3)" fontSize={9}>{config.timeLabels[0]}</text>
        <text x={pad.left + w / 2} y={height - 5} fill="rgba(255,255,255,0.3)" fontSize={9} textAnchor="middle">{config.timeLabels[1]}</text>
        <text x={pad.left + w} y={height - 5} fill="rgba(255,255,255,0.3)" fontSize={9} textAnchor="end">{config.timeLabels[2]}</text>
        {/* Y labels */}
        <text x={pad.left - 5} y={pad.top + 4} fill={config.yLeft.color} fontSize={9} textAnchor="end">{config.yLeft.top}</text>
        <text x={pad.left - 5} y={pad.top + h} fill={config.yLeft.color} fontSize={9} textAnchor="end">{config.yLeft.bottom}</text>
        <text x={pad.left + w + 5} y={pad.top + 4} fill={config.yRight.color} fontSize={9}>{config.yRight.top}</text>
        <text x={pad.left + w + 5} y={pad.top + h} fill={config.yRight.color} fontSize={9}>{config.yRight.bottom}</text>
        {/* Curves */}
        {config.curves.map((curve, i) => (
          <path
            key={i}
            d={toPath(curve.points)}
            fill="none"
            stroke={curve.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={curve.dashed ? '4 3' : undefined}
          />
        ))}
        {/* Marker */}
        {config.marker && (
          <>
            <line
              x1={pad.left + config.marker.t * w} y1={pad.top}
              x2={pad.left + config.marker.t * w} y2={pad.top + h}
              stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="3 3"
            />
            <text
              x={pad.left + config.marker.t * w} y={pad.top - 5}
              fill="rgba(255,255,255,0.3)" fontSize={8} textAnchor="middle"
            >
              {config.marker.label}
            </text>
          </>
        )}
      </svg>
    </div>
  )
}
