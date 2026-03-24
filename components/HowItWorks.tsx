const steps = [
  {
    number: '01',
    title: 'Connect',
    description: 'Plug into your existing SCADA/historian (OPC UA, OSIsoft PI, etc.). Read-only access to your process data. Works with any bioreactor vendor.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.818-1.313a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.75 8.813" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Ask',
    description: 'Natural language questions about your current or past batches. "Show me glucose consumption rate" \u2022 "Why is my DO spiking?" \u2022 "Compare this to batch #342"',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get Insights',
    description: 'AI agent analyzes your data with bioprocess context. Generates charts, highlights patterns, suggests what to look at next. All answers cite their data sources.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v-5.5m3 5.5v-3.5m3 3.5v-1.5" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-24 pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Simple. Real-time. Conversational.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-slate-200">{s.number}</span>
                <div className="p-3 rounded-lg bg-teal-50 text-teal-600">
                  {s.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
