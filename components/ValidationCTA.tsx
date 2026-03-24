'use client'

import { useState } from 'react'

export default function ValidationCTA() {
  const [form, setForm] = useState({
    email: '',
    company: '',
    role: '',
    processType: '',
    feedback: '',
  })
  const [showFeedback, setShowFeedback] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email) return
    try {
      const res = await fetch('https://fggefz1y1c.execute-api.us-east-1.amazonaws.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'validation_cta' }),
      })
      if (!res.ok) throw new Error('Submit failed')
      setSubmitted(true)
    } catch { /* silent */ }
  }

  return (
    <section id="waitlist" className="py-24 bg-navy-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Get Started
          </h2>
          <p className="text-xl text-slate-300">
            See how it works with your process. We&apos;ll reach out personally to discuss fit.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl px-8 py-12 text-center">
            <svg className="w-16 h-16 text-emerald-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-emerald-400 font-semibold text-lg mb-2">
              You&apos;re on the list!
            </p>
            <p className="text-slate-400">
              We&apos;ll reach out within 48 hours to discuss next steps.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Work email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-4 rounded-lg bg-white/5 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-4 rounded-lg bg-white/5 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
              />
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-4 rounded-lg bg-white/5 border border-slate-700 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors appearance-none"
              >
                <option value="" className="bg-navy-900">Your role</option>
                <option value="engineer" className="bg-navy-900">Process Engineer</option>
                <option value="scientist" className="bg-navy-900">Scientist</option>
                <option value="director" className="bg-navy-900">Director / Manager</option>
                <option value="other" className="bg-navy-900">Other</option>
              </select>
            </div>
            <div>
              <select
                value={form.processType}
                onChange={(e) => setForm({ ...form, processType: e.target.value })}
                className="w-full px-4 py-4 rounded-lg bg-white/5 border border-slate-700 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors appearance-none"
              >
                <option value="" className="bg-navy-900">Process type</option>
                <option value="cho_mammalian" className="bg-navy-900">CHO / Mammalian cell culture</option>
                <option value="ecoli_bacterial" className="bg-navy-900">E. coli / Bacterial fermentation</option>
                <option value="yeast" className="bg-navy-900">Yeast</option>
                <option value="other" className="bg-navy-900">Other</option>
              </select>
            </div>

            {showFeedback ? (
              <div>
                <textarea
                  placeholder="What questions would you ask? What would make this useful for you?"
                  value={form.feedback}
                  onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-4 rounded-lg bg-white/5 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors resize-none"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowFeedback(true)}
                className="text-teal-400 text-sm hover:text-teal-300 transition-colors"
              >
                + Want to share more detail? Tell us what you&apos;d ask
              </button>
            )}

            <button
              type="submit"
              className="w-full px-6 py-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Apply for Access
            </button>
            <p className="text-slate-500 text-sm text-center">
              We&apos;ll reach out personally • No spam • Your data stays private
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
