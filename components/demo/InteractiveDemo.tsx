'use client'

import { useState } from 'react'
import DemoSidebar from './DemoSidebar'
import DemoChat from './DemoChat'
import LiveProcessCharts from './LiveProcessCharts'

export default function InteractiveDemo() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="demo" className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-teal-400 font-semibold text-sm tracking-wide uppercase mb-3">Live Demo</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Talk to your bioreactor</h2>
        </div>
        {/* Demo panel */}
        <div className="bg-navy-800 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-2 text-slate-500 text-xs">bioreactor.ai — Reactor 3</span>
          </div>

          {/* Live process charts on top */}
          <LiveProcessCharts />

          {/* Split layout: sidebar + chat */}
          <div
            className="flex border-t border-slate-700/50 transition-[height] duration-500 ease-in-out"
            style={{ height: expanded ? '650px' : '520px' }}
          >
            {/* Sidebar - hidden on mobile */}
            <div className="hidden md:block">
              <DemoSidebar />
            </div>
            {/* Chat */}
            <DemoChat onInteraction={() => setExpanded(true)} />
          </div>
        </div>
      </div>
    </section>
  )
}
