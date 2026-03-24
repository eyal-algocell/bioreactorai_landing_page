import type { ChartConfig } from './demoData'

const width = 400
const height = 140
const pad = { top: 16, right: 45, bottom: 24, left: 45 }
const w = width - pad.left - pad.right
const h = height - pad.top - pad.bottom

function generateCurve(fn: (t: number) => number, steps = 60): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const y = Math.max(0, Math.min(1, fn(t)))
    pts.push([pad.left + t * w, pad.top + (1 - y) * h])
  }
  return pts
}

const toPath = (pts: [number, number][]) =>
  pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')

export default function DemoChart({ config }: { config: ChartConfig }) {
  return (
    <div className="bg-navy-900/60 rounded-lg p-2.5 mt-2">
      <div className="flex items-center justify-between mb-1 px-1">
        <span className="text-slate-500 text-[10px]">{config.statusText}</span>
        <div className="flex gap-2 text-[10px] flex-wrap justify-end">
          {config.legend.map((l, i) => (
            <span key={i} style={{ color: l.color }} className="flex items-center gap-1">
              <span
                className="w-1.5 h-0.5 inline-block rounded"
                style={{
                  backgroundColor: l.dashed ? 'transparent' : l.color,
                  ...(l.dashed ? { backgroundImage: `repeating-linear-gradient(90deg, ${l.color} 0px, ${l.color} 2px, transparent 2px, transparent 4px)` } : {}),
                }}
              />
              {l.label}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 'auto' }}>
        {[0.25, 0.5, 0.75].map(f => (
          <line key={f} x1={pad.left} y1={pad.top + f * h} x2={pad.left + w} y2={pad.top + f * h} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        ))}
        <line x1={pad.left} y1={pad.top + h} x2={pad.left + w} y2={pad.top + h} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + h} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <text x={pad.left} y={height - 4} fill="rgba(255,255,255,0.25)" fontSize={8}>{config.timeLabels[0]}</text>
        <text x={pad.left + w / 2} y={height - 4} fill="rgba(255,255,255,0.25)" fontSize={8} textAnchor="middle">{config.timeLabels[1]}</text>
        <text x={pad.left + w} y={height - 4} fill="rgba(255,255,255,0.25)" fontSize={8} textAnchor="end">{config.timeLabels[2]}</text>
        <text x={pad.left - 4} y={pad.top + 3} fill={config.yLeft.color} fontSize={8} textAnchor="end">{config.yLeft.top}</text>
        <text x={pad.left - 4} y={pad.top + h} fill={config.yLeft.color} fontSize={8} textAnchor="end">{config.yLeft.bottom}</text>
        {config.yRight.top && (
          <>
            <text x={pad.left + w + 4} y={pad.top + 3} fill={config.yRight.color} fontSize={8}>{config.yRight.top}</text>
            <text x={pad.left + w + 4} y={pad.top + h} fill={config.yRight.color} fontSize={8}>{config.yRight.bottom}</text>
          </>
        )}
        {config.curves.map((curve, i) => (
          <path key={i} d={toPath(generateCurve(curve.fn))} fill="none" stroke={curve.color} strokeWidth={1.5} strokeLinecap="round" strokeDasharray={curve.dashed ? '3 2' : undefined} />
        ))}
        {config.marker && (
          <>
            <line x1={pad.left + config.marker.t * w} y1={pad.top} x2={pad.left + config.marker.t * w} y2={pad.top + h} stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="2 2" />
            <text x={pad.left + config.marker.t * w} y={pad.top - 3} fill="rgba(255,255,255,0.25)" fontSize={7} textAnchor="middle">{config.marker.label}</text>
          </>
        )}
      </svg>
    </div>
  )
}
