'use client'

const layers = [
  {
    label: 'Bioreactor',
    sublabel: 'Hardware',
    color: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    details: ['pH, DO, temperature', 'Biomass, glucose', 'Feed rates, off-gas', 'Weight / volume'],
  },
  {
    label: 'SCADA / DCS',
    sublabel: 'Control Layer',
    color: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    details: ['Historian database', 'Alarms & setpoints', 'Batch records', 'DeltaV, Wonderware'],
  },
  {
    label: 'OPC UA',
    sublabel: 'Data Bridge',
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    details: ['Industry-standard', 'Secure, read-only', 'Vendor-agnostic', 'On-prem or cloud'],
  },
  {
    label: 'AI Agent',
    sublabel: 'Intelligence',
    color: 'from-teal-500/20 to-teal-500/5',
    borderColor: 'border-teal-500/30',
    iconColor: 'text-teal-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    details: ['LLM reasoning', 'Bioprocess context', 'Real-time analysis', 'Conversational UI'],
  },
]

export default function Architecture() {
  return (
    <section id="architecture" className="pt-16 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">Technical Architecture</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">From sensor to insight</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Plugs into your existing infrastructure. No hardware changes. Read-only by design.
          </p>
        </div>

        {/* Pipeline */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {layers.map((layer, i) => (
            <div key={i} className="relative">
              <div className={`bg-gradient-to-b ${layer.color} border ${layer.borderColor} rounded-2xl p-6 h-full`}>
                <div className={`${layer.iconColor} mb-4`}>{layer.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-1">{layer.label}</h3>
                <p className="text-slate-400 text-sm mb-4">{layer.sublabel}</p>
                <ul className="space-y-1.5">
                  {layer.details.map((d, j) => (
                    <li key={j} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className={`mt-1.5 w-1 h-1 rounded-full ${layer.iconColor.replace('text-', 'bg-')} flex-shrink-0`} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Arrow between cards */}
              {i < layers.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 z-10 -translate-y-1/2">
                  <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          {[
            'Works with any SCADA vendor',
            'Industry-standard OPC UA',
            'Read-only by design',
            'On-prem or cloud deployment',
          ].map((badge) => (
            <span key={badge} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
