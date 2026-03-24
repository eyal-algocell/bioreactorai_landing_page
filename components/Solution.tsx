export default function Solution() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3 text-center">The Solution</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 text-center">
            Not a chatbot. A digital twin.
          </h2>

          {/* Proof Point */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-200 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-teal-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-teal-700 mb-1">Pilot Result — mAb Manufacturer</p>
                <p className="text-slate-700 leading-relaxed">
                  In pilot testing with a mAb manufacturer running 2000L fed-batch CHO, bioreactor.ai detected
                  a <strong>dissolved oxygen sensor drift 4.5 hours before the SCADA alarm triggered</strong>.
                  The system recommended a specific corrective action: increase agitation by 15 RPM and verify
                  DO probe calibration. The batch was saved.
                </p>
                <p className="text-slate-900 font-bold mt-3">Estimated loss avoided: $1.2M</p>
              </div>
            </div>
          </div>

          {/* What it does vs won't do */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What it does
              </h3>
              <ul className="space-y-3">
                {[
                  'Runs a mechanistic model (ODEs for cell growth, metabolism, mass balance) alongside your batch',
                  'Compares predicted vs actual every 5 minutes',
                  'Triggers analysis when deviation exceeds threshold',
                  'Searches similar past batches + known failure modes',
                  'Generates testable hypotheses with confidence scores',
                  'Provides simulation-backed recommended actions',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="text-teal-500 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                What it won&apos;t do
              </h3>
              <ul className="space-y-3">
                {[
                  'Replace your SCADA or control system',
                  'Auto-adjust setpoints without approval',
                  'Tell you how to design your process from scratch',
                  'Work without proper model calibration (we handle this during onboarding)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="text-slate-400 mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">How the digital twin works</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {[
                { step: '1', label: 'Real-time data', desc: 'From your bioreactor' },
                { step: '2', label: 'Mechanistic model', desc: 'Predicts expected behavior' },
                { step: '3', label: 'Deviation detection', desc: 'Actual vs predicted' },
                { step: '4', label: 'Root cause analysis', desc: 'AI + historical data' },
                { step: '5', label: 'Recommendation', desc: 'With confidence score' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 font-bold text-lg flex items-center justify-center mb-2">
                    {item.step}
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                  {i < 4 && (
                    <svg className="hidden md:block w-6 h-6 text-slate-300 absolute translate-x-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
