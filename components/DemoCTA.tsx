'use client'

import { useState } from 'react'

export default function DemoCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'final_cta' }),
      })
      setSubmitted(true)
    } catch { /* silent */ }
  }

  return (
    <section id="demo" className="py-24 bg-navy-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          See bioreactor.ai in action
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Book a demo or download our technical whitepaper to learn how mechanistic models outperform black-box AI in bioprocess monitoring.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <a
            href="https://calendly.com/bioreactor-ai/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-6 rounded-xl transition-colors shadow-xl shadow-teal-600/20"
          >
            <svg className="w-8 h-8 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <p className="text-lg font-bold mb-1">Book a 30-Minute Demo</p>
            <p className="text-teal-100 text-sm">We&apos;ll show you the platform with your process in mind</p>
          </a>

          <a
            href="#"
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-6 rounded-xl transition-colors"
          >
            <svg className="w-8 h-8 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-lg font-bold mb-1">Download Technical Whitepaper</p>
            <p className="text-slate-300 text-sm">10-page deep dive: Mechanistic vs Empirical Models</p>
          </a>
        </div>

        <div className="border-t border-slate-700 pt-12">
          <p className="text-slate-400 mb-6">Not ready yet? Join the waitlist for updates</p>
          {submitted ? (
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-8 py-4 text-emerald-400 font-medium">
              Thanks! We&apos;ll keep you updated.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
