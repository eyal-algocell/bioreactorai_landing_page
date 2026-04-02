'use client'

import { useEffect, useCallback, useState } from 'react'
import BioreactorChart from './BioreactorChart'

const scenarios = [
  {
    question: 'Is my pH trend normal for day 3?',
    answer: 'Your pH is tracking 0.12 units lower than the average of your last 8 batches at this timepoint. This is within normal variation for day 3 of your CHO process.',
    source: 'Batches #445-452 | Confidence: High',
    chartVariant: 'ph' as const,
  },
  {
    question: 'Why is my DO spiking at hour 48?',
    answer: 'DO spike correlates with a glucose feed pause at 47.5h. Your cells reduced oxygen consumption during the nutrient gap. Feed resumed at 48.2h — DO should normalize within 2 hours.',
    source: 'Reactor 2, Batch #467 | Feed log cross-referenced',
    chartVariant: 'do' as const,
  },
  {
    question: 'How does my CO₂ profile compare to the golden batch?',
    answer: 'Your CO₂ evolution rate is tracking 12% higher than the golden batch at this stage. This typically indicates higher metabolic activity — consistent with the 8% higher VCD you\'re seeing.',
    source: 'Golden Batch #401 vs Current #470 | OUR/CER analysis',
    chartVariant: 'offgas' as const,
  },
  {
    question: 'Did the temperature excursion at hour 96 affect viability?',
    answer: 'Temperature reached 37.8\u00B0C for 23 minutes (setpoint: 36.5\u00B0C). Viability dropped 2.1% in the following 12 hours — within your historical range for similar excursions.',
    source: 'Batch #470, Event log | Historical excursion analysis',
    chartVariant: 'temperature' as const,
  },
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const cycleScenario = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % scenarios.length)
      setVisible(true)
    }, 600)
  }, [])

  useEffect(() => {
    const interval = setInterval(cycleScenario, 3000)
    return () => clearInterval(interval)
  }, [cycleScenario])

  const jumpTo = (index: number) => {
    if (index === activeIndex) return
    setVisible(false)
    setTimeout(() => {
      setActiveIndex(index)
      setVisible(true)
    }, 600)
  }

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scenario = scenarios[activeIndex]

  return (
    <section className="relative min-h-screen bg-navy-900 flex items-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            What if you could{' '}
            <span className="text-teal-400">ask your bioreactor questions</span>{' '}
            while it&apos;s running?
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-lg">
            Connect your process data to an AI agent that understands bioprocess.
            Ask questions in plain language. Get insights in real-time.
          </p>

          <div className="mb-4">
            <button
              onClick={scrollToWaitlist}
              className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-teal-600/20"
            >
              Learn More & Get In Touch
            </button>
          </div>
          <p className="text-slate-500 text-sm">Limited availability • No spam • Personal onboarding</p>
        </div>

        <div className="hidden lg:block">
          <div className="bg-navy-800 rounded-xl border border-slate-700/50 p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-slate-500 text-xs">bioreactor.ai</span>
            </div>

            <div
              className="space-y-4"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
              }}
            >
              <div className="bg-navy-900/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">You ask:</p>
                <p className="text-white text-sm">&quot;{scenario.question}&quot;</p>
              </div>
              <div className="bg-teal-500/5 border border-teal-500/10 rounded-lg p-4">
                <p className="text-teal-400 text-sm mb-2 font-medium">AI Agent:</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  {scenario.answer}
                </p>
                <p className="text-slate-400 text-xs mb-2">Here&apos;s the comparison:</p>
                <BioreactorChart variant={scenario.chartVariant} />
                <p className="text-slate-500 text-xs mt-2">Source: {scenario.source}</p>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {scenarios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-2 h-2 bg-teal-400'
                      : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
