'use client'

import { useState, useEffect, useRef } from 'react'

interface MetricDef {
  key: string
  label: string
  unit: string
  center: number
  jitter: number
  decimals: number
}

const metricDefs: MetricDef[] = [
  { key: 'ph', label: 'pH', unit: '', center: 6.92, jitter: 0.02, decimals: 2 },
  { key: 'do', label: 'DO', unit: '%', center: 42.3, jitter: 1.5, decimals: 1 },
  { key: 'temp', label: 'Temp', unit: '°C', center: 36.50, jitter: 0.05, decimals: 2 },
  { key: 'vcd', label: 'VCD', unit: '×10⁶', center: 8.4, jitter: 0.1, decimals: 1 },
  { key: 'glucose', label: 'Glucose', unit: 'g/L', center: 3.2, jitter: 0.1, decimals: 1 },
  { key: 'viability', label: 'Viability', unit: '%', center: 96.8, jitter: 0.2, decimals: 1 },
  { key: 'co2', label: 'CO₂ off-gas', unit: '%', center: 4.2, jitter: 0.1, decimals: 1 },
  { key: 'o2', label: 'O₂ off-gas', unit: '%', center: 19.1, jitter: 0.1, decimals: 1 },
]

function jitter(current: number, center: number, range: number): number {
  const drift = (center - current) * 0.3
  const noise = (Math.random() - 0.5) * range
  return current + drift + noise
}

export default function DemoSidebar() {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    metricDefs.forEach(m => { init[m.key] = m.center })
    return init
  })
  const [lastUpdate, setLastUpdate] = useState(0)
  const [flashKeys, setFlashKeys] = useState<Set<string>>(new Set())
  const prevValues = useRef(values)

  useEffect(() => {
    const dataInterval = setInterval(() => {
      setValues(prev => {
        const next: Record<string, number> = {}
        metricDefs.forEach(m => {
          next[m.key] = jitter(prev[m.key], m.center, m.jitter)
        })
        return next
      })
      setLastUpdate(0)
      setFlashKeys(new Set(metricDefs.map(m => m.key)))
      setTimeout(() => setFlashKeys(new Set()), 600)
    }, 1500)

    const tickInterval = setInterval(() => {
      setLastUpdate(prev => prev + 1)
    }, 1000)

    return () => { clearInterval(dataInterval); clearInterval(tickInterval) }
  }, [])

  useEffect(() => { prevValues.current = values }, [values])

  return (
    <div className="w-64 bg-navy-800 border-r border-slate-700/50 p-4 flex flex-col gap-4 overflow-y-auto">
      {/* Reactor selector */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white text-sm font-medium">Reactor 3</span>
        </div>
        <p className="text-slate-500 text-xs">Running — Batch #470</p>
      </div>

      {/* Batch info */}
      <div className="bg-navy-900/50 rounded-lg px-3 py-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Day</span>
          <span className="text-slate-300">4 of 14</span>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-slate-500">Started</span>
          <span className="text-slate-300">Mar 19, 2026</span>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-slate-500">Process</span>
          <span className="text-slate-300">CHO Fed-batch</span>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="space-y-1.5">
        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-medium">Live Parameters</p>
        {metricDefs.map(m => (
          <div
            key={m.key}
            className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors duration-300 ${
              flashKeys.has(m.key) ? 'bg-teal-500/10' : 'bg-transparent'
            }`}
          >
            <span className="text-slate-400 text-xs">{m.label}</span>
            <span className="text-white text-xs font-mono tabular-nums">
              {values[m.key].toFixed(m.decimals)}{m.unit && <span className="text-slate-500 ml-0.5">{m.unit}</span>}
            </span>
          </div>
        ))}
      </div>

      {/* Last updated */}
      <div className="mt-auto pt-2 border-t border-slate-700/50">
        <p className="text-slate-600 text-[10px] text-center">
          Updated {lastUpdate}s ago
        </p>
      </div>
    </div>
  )
}
