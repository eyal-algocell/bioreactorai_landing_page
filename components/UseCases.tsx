const useCases = [
  {
    title: 'Deviation Detection',
    before: {
      label: 'Before',
      items: [
        'Deviation detected 8-12 hours post-onset during manual review',
        'Response delayed',
        'Batch compromise risk high',
      ],
    },
    after: {
      label: 'After',
      items: [
        'Alert within 30 minutes of first statistical deviation',
        'Specific root cause hypotheses provided',
        'Average time-to-action: 45 minutes',
      ],
    },
    outcome: '40% reduction in batch failures attributed to late detection',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Scale-Up Transfer',
    before: {
      label: 'Before',
      items: [
        '50L → 500L scale-up requires 3-5 batches to optimize',
        'High variability',
        'Engineering time: 200+ hours of analysis',
      ],
    },
    after: {
      label: 'After',
      items: [
        'Digital twin pre-simulates 500L before first batch',
        'Flags likely issues (mixing time, kLa, feed distribution)',
        'First batch at 500L matches predicted outcome within 8%',
      ],
    },
    outcome: 'Scale-up cycle time reduced from 6 months to 3 months',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Tech Transfer Knowledge Capture',
    before: {
      label: 'Before',
      items: [
        'Senior engineer departure → 6-month knowledge gap',
        'Tribal knowledge lost',
        'New engineer learns by trial-and-error',
      ],
    },
    after: {
      label: 'After',
      items: [
        'All process rationale captured in context',
        'New engineer queries: "Why this feeding strategy?"',
        'Gets full historical context, data-backed reasoning',
      ],
    },
    outcome: 'Onboarding time reduced 60%. Zero batches failed due to knowledge gaps.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
]

export default function UseCases() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">Use Cases</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Before and after bioreactor.ai</h2>
        </div>
        <div className="space-y-8">
          {useCases.map((uc, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
                  {uc.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{uc.title}</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">{uc.before.label}</p>
                  <ul className="space-y-2">
                    {uc.before.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-600 text-sm">
                        <span className="text-red-500 mt-0.5">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-3">{uc.after.label}</p>
                  <ul className="space-y-2">
                    {uc.after.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-600 text-sm">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 flex flex-col justify-center">
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">Outcome</p>
                  <p className="text-slate-900 font-bold leading-snug">{uc.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
