'use client'

import { useState } from 'react'

export default function WaitlistCTA() {
  const [form, setForm] = useState({ email: '', company: '', role: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.company || !form.role) {
      setError('Please fill in all fields.')
      return
    }
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'cta' }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="waitlist" className="py-24 bg-navy-900">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Be the first to try it.
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          We&apos;re opening early access to a limited number of bioprocess teams.
          Join the waitlist and help shape the product.
        </p>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-8 py-6 text-emerald-400 font-medium text-lg">
            You&apos;re on the list. We&apos;ll reach out personally when your spot opens.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <input
                type="email"
                placeholder="Work email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Company name"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
              />
            </div>
            <div>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-slate-700 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors appearance-none"
              >
                <option value="" className="bg-navy-900">Your role</option>
                <option value="process_engineer" className="bg-navy-900">Process Engineer / Scientist</option>
                <option value="msat" className="bg-navy-900">MSAT / Manufacturing</option>
                <option value="director_vp" className="bg-navy-900">Director / VP</option>
                <option value="other" className="bg-navy-900">Other</option>
              </select>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Request Early Access
            </button>
            <p className="text-slate-500 text-sm text-center">No spam. We&apos;ll reach out personally.</p>
          </form>
        )}
      </div>
    </section>
  )
}
