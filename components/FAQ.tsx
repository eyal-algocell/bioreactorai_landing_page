'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Is my data secure?',
    answer: 'Your data never trains models for other customers. Dedicated instance. Your IP stays yours. We\'ll sign NDAs. On-premises deployment option available.',
  },
  {
    question: 'What if the AI gives wrong answers?',
    answer: 'Every answer includes data sources and confidence indicators. You verify before acting. This is decision support, not autopilot. We\'re very upfront about limitations.',
  },
  {
    question: 'How long until this is real?',
    answer: 'It\'s live now. We\'re onboarding bioprocess teams on a rolling basis. If you\'re on the waitlist, we\'ll reach out as spots become available.',
  },
  {
    question: 'What does "real-time" mean?',
    answer: 'Data syncs every 30-60 seconds from your historian. Fast enough to be useful during a batch, not overwhelming the system with constant updates.',
  },
  {
    question: 'Does this work with my SCADA vendor?',
    answer: 'Initial support for DeltaV, Wonderware, MFCS, and OSIsoft PI. Custom integrations available. All via standard OPC UA protocol.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Common questions
          </h2>
          <p className="text-lg text-slate-600">
            We get it — you have questions. Here are the most common ones.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
