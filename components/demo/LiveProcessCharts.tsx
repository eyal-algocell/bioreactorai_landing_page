'use client'

import { useState, useEffect } from 'react'

interface ParamDef {
  key: string
  label: string
  unit: string
  color: string
  center: number
  min: number
  max: number
  yAxis: 'left' | 'right'
  decimals: number
  // Wave dynamics per parameter
  wave: (t: number, current: number, center: number) => number
}

const params: ParamDef[] = [
  {
    key: 'do', label: 'DO', unit: '%', color: '#60A5FA',
    center: 42, min: 0, max: 120, yAxis: 'left', decimals: 0,
    // Slow sine + occasional sharp dip (feed event sawtooth)
    wave: (t, cur, cen) => {
      const drift = (cen - cur) * 0.04
      const sine = Math.sin(t * 0.08) * 3.5
      const sawPeriod = 50
      const sawPhase = t % sawPeriod
      const sawtooth = sawPhase < 5 ? -8 * (1 - sawPhase / 5) : 0
      const noise = (Math.random() - 0.5) * 2
      return cur + drift + sine * 0.06 + sawtooth * 0.04 + noise
    },
  },
  {
    key: 'ph', label: 'pH', unit: '', color: '#14B8A6',
    center: 6.92, min: 5.0, max: 8.5, yAxis: 'right', decimals: 1,
    // Gentle sine with slow downward drift (lactate)
    wave: (t, cur, cen) => {
      const drift = (cen - cur) * 0.03
      const sine = Math.sin(t * 0.06 + 1.5) * 0.06
      const slowDrift = Math.sin(t * 0.015) * 0.04
      const noise = (Math.random() - 0.5) * 0.02
      return cur + drift + sine * 0.08 + slowDrift * 0.05 + noise
    },
  },
  {
    key: 'temp', label: 'Temp', unit: '°C', color: '#FB923C',
    center: 36.5, min: 20, max: 40, yAxis: 'left', decimals: 1,
    // Mostly stable with periodic sawtooth spikes (PID overshoot)
    wave: (t, cur, cen) => {
      const drift = (cen - cur) * 0.08
      const sawPeriod = 35
      const sawPhase = t % sawPeriod
      const spike = sawPhase < 3 ? 0.3 * Math.exp(-sawPhase * 0.8) : 0
      const noise = (Math.random() - 0.5) * 0.04
      return cur + drift + spike * 0.15 + noise
    },
  },
  {
    key: 'agitation', label: 'Stirrer', unit: 'RPM', color: '#818CF8',
    center: 150, min: 0, max: 300, yAxis: 'left', decimals: 0,
    // Step changes with oscillation (cascade control)
    wave: (t, cur, cen) => {
      const stepTarget = Math.floor(t / 60) % 3 === 1 ? cen + 15 : Math.floor(t / 60) % 3 === 2 ? cen - 10 : cen
      const drift = (stepTarget - cur) * 0.06
      const osc = Math.sin(t * 0.12 + 3) * 3
      const noise = (Math.random() - 0.5) * 2
      return cur + drift + osc * 0.05 + noise
    },
  },
  {
    key: 'co2', label: 'CO₂', unit: '%', color: '#34D399',
    center: 4.2, min: 0, max: 10, yAxis: 'right', decimals: 1,
    // Rising trend with sine modulation (growth phase)
    wave: (t, cur, cen) => {
      const drift = (cen - cur) * 0.03
      const sine = Math.sin(t * 0.07 + 4) * 0.3
      const trend = Math.sin(t * 0.012) * 0.08
      const noise = (Math.random() - 0.5) * 0.1
      return cur + drift + sine * 0.08 + trend + noise
    },
  },
]

const HISTORY_LEN = 120

function generateTimeLabels(): string[] {
  const now = new Date()
  const labels: string[] = []
  for (let i = 5; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 20 * 60000)
    labels.push(t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
  }
  return labels
}

export default function LiveProcessCharts() {
  const [tick, setTick] = useState(HISTORY_LEN)
  const [histories, setHistories] = useState<Record<string, number[]>>(() => {
    const init: Record<string, number[]> = {}
    params.forEach(p => {
      const arr: number[] = []
      let val = p.center
      for (let i = 0; i < HISTORY_LEN; i++) {
        val = p.wave(i, val, p.center)
        arr.push(val)
      }
      init[p.key] = arr
    })
    return init
  })

  const [timeLabels, setTimeLabels] = useState(generateTimeLabels)
  const [enabledParams, setEnabledParams] = useState<Set<string>>(() => new Set(params.map(p => p.key)))

  useEffect(() => {
    let t = tick
    const interval = setInterval(() => {
      t++
      setTick(t)
      setHistories(prev => {
        const next: Record<string, number[]> = {}
        params.forEach(p => {
          const arr = [...prev[p.key]]
          const last = arr[arr.length - 1]
          arr.push(p.wave(t, last, p.center))
          if (arr.length > HISTORY_LEN) arr.shift()
          next[p.key] = arr
        })
        return next
      })
    }, 800)

    const timeInterval = setInterval(() => {
      setTimeLabels(generateTimeLabels())
    }, 60000)

    return () => { clearInterval(interval); clearInterval(timeInterval) }
  }, [])

  const toggleParam = (key: string) => {
    setEnabledParams(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // Chart dimensions — tighter padding for wider traces
  const svgW = 900
  const svgH = 220
  const pad = { top: 12, right: 4, bottom: 28, left: 4 }
  const plotW = svgW - pad.left - pad.right
  const plotH = svgH - pad.top - pad.bottom

  const toY = (val: number, p: ParamDef) => {
    const ratio = (val - p.min) / (p.max - p.min)
    return pad.top + (1 - ratio) * plotH
  }

  const getPoints = (p: ParamDef) => {
    const hist = histories[p.key]
    return hist.map((v, i) => {
      const x = pad.left + (i / (HISTORY_LEN - 1)) * plotW
      const y = toY(v, p)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ')
  }

  const leftParams = params.filter(p => p.yAxis === 'left')
  const rightParams = params.filter(p => p.yAxis === 'right')

  return (
    <div className="bg-[#0a1628] border-b border-slate-700/50">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-700/30 bg-[#0d1b30]">
        <span className="text-slate-500 text-[10px] uppercase tracking-wider mr-2 font-medium">Process Parameters</span>
        {params.map(p => (
          <button
            key={p.key}
            onClick={() => toggleParam(p.key)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
              enabledParams.has(p.key)
                ? 'bg-slate-700/50 text-white'
                : 'bg-transparent text-slate-600 hover:text-slate-400'
            }`}
          >
            <span
              className="w-2.5 h-[3px] rounded-sm flex-shrink-0"
              style={{
                backgroundColor: enabledParams.has(p.key) ? p.color : 'rgba(100,116,139,0.3)',
              }}
            />
            {p.label}
            {enabledParams.has(p.key) && (
              <span className="font-mono tabular-nums" style={{ color: p.color }}>
                {histories[p.key][histories[p.key].length - 1].toFixed(p.decimals)}
                {p.unit && <span className="text-slate-500 ml-0.5">{p.unit}</span>}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Chart area */}
      <div className="px-0 py-1">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ height: '200px' }}>
          {/* Background grid */}
          {[0, 0.25, 0.5, 0.75, 1].map(f => (
            <line
              key={f}
              x1={pad.left}
              y1={pad.top + f * plotH}
              x2={pad.left + plotW}
              y2={pad.top + f * plotH}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={f === 1 ? 1 : 0.5}
            />
          ))}
          {/* Vertical grid lines */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map(f => (
            <line
              key={f}
              x1={pad.left + f * plotW}
              y1={pad.top}
              x2={pad.left + f * plotW}
              y2={pad.top + plotH}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth={0.5}
            />
          ))}

          {/* Left Y-axis border */}
          <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
          {/* Right Y-axis border */}
          <line x1={pad.left + plotW} y1={pad.top} x2={pad.left + plotW} y2={pad.top + plotH} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />

          {/* Left Y-axis labels (overlaid on chart) */}
          {(() => {
            const lp = leftParams.find(p => enabledParams.has(p.key)) || leftParams[0]
            const ticks = [0, 0.25, 0.5, 0.75, 1]
            return ticks.map(f => {
              const val = lp.min + (1 - f) * (lp.max - lp.min)
              return (
                <text
                  key={`ly-${f}`}
                  x={8}
                  y={pad.top + f * plotH + 3}
                  fill="rgba(255,255,255,0.35)"
                  fontSize={8}
                  textAnchor="start"
                  fontFamily="monospace"
                >
                  {val.toFixed(0)}
                </text>
              )
            })
          })()}

          {/* Right Y-axis labels (overlaid on chart) */}
          {(() => {
            const rp = rightParams.find(p => enabledParams.has(p.key)) || rightParams[0]
            const ticks = [0, 0.25, 0.5, 0.75, 1]
            return ticks.map(f => {
              const val = rp.min + (1 - f) * (rp.max - rp.min)
              return (
                <text
                  key={`ry-${f}`}
                  x={svgW - 8}
                  y={pad.top + f * plotH + 3}
                  fill="rgba(255,255,255,0.35)"
                  fontSize={8}
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {val.toFixed(1)}
                </text>
              )
            })
          })()}

          {/* Time labels */}
          {timeLabels.map((label, i) => (
            <text
              key={i}
              x={pad.left + (i / (timeLabels.length - 1)) * plotW}
              y={svgH - 4}
              fill="rgba(255,255,255,0.25)"
              fontSize={8}
              textAnchor="middle"
              fontFamily="monospace"
            >
              {label}
            </text>
          ))}

          {/* Data traces */}
          {params.filter(p => enabledParams.has(p.key)).map(p => (
            <g key={p.key}>
              <polyline
                points={getPoints(p)}
                fill="none"
                stroke={p.color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.9}
              />
              {/* Current value dot */}
              {(() => {
                const hist = histories[p.key]
                const lastVal = hist[hist.length - 1]
                const cx = pad.left + ((hist.length - 1) / (HISTORY_LEN - 1)) * plotW
                const cy = toY(lastVal, p)
                return (
                  <>
                    <circle cx={cx} cy={cy} r={3} fill={p.color} />
                    <circle cx={cx} cy={cy} r={6} fill={p.color} opacity={0.15} />
                  </>
                )
              })()}
            </g>
          ))}

          {/* "Now" cursor line */}
          <line
            x1={pad.left + plotW}
            y1={pad.top}
            x2={pad.left + plotW}
            y2={pad.top + plotH}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
            strokeDasharray="3 2"
          />
        </svg>
      </div>
    </div>
  )
}
