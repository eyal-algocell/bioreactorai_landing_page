const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-1.5M12 12.75l3-1.5m-3 1.5l-3-1.5M9 11.25L12 9.75m0 0l3 1.5M12 9.75V6.75" />
      </svg>
    ),
    title: 'Predictive Process Monitoring',
    description: 'Not just dashboards. Real-time forward simulation.',
    tag: 'Backed by mechanistic models',
    examples: [
      '"Final titer will be 3.2 ± 0.4 g/L (target: 3.5)" — at hour 96 of a 168-hour batch',
      '"Glucose will deplete in 6.2 hours at current consumption rate — recommend feed rate increase"',
      '"This batch is tracking 12% below historical mean — potential causes ranked by likelihood"',
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: 'Natural Language Process Intelligence',
    description: 'Ask questions, get answers backed by your data.',
    tag: 'Every answer cites sources',
    examples: [
      'Q: "Why is my glucose consumption 2x higher?" → Cites cell density, metabolic indicators, compares to Batch #447',
      'Q: "What feed rate for 200 hour extension?" → Runs simulation, shows predicted outcome ±95% confidence',
      'Q: "Compare this batch to last 10 runs" → Multivariate analysis with key deviations highlighted',
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Institutional Memory That Compounds',
    description: 'Every batch becomes training data. Every decision is captured.',
    tag: 'Model improves with every batch',
    examples: [
      'New engineer: "Why switch to low-lactate feed at day 6?" → Shows historical rationale, original data, engineer notes from 2 years ago',
      'Director: "How many times did pH < 6.8 still hit spec?" → Instant query across 200 batches with outcomes',
      'System learns: Model precision improves continuously. Recommendations get sharper with every run.',
    ],
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">Capabilities</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Three pillars of process intelligence
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Grounded in physics, validated against your data, learning from every batch.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
              <div className="p-3 w-fit rounded-xl bg-teal-50 text-teal-600 mb-5">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600 mb-3">{f.description}</p>
              <div className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-medium mb-5">
                {f.tag}
              </div>
              <div className="space-y-3">
                {f.examples.map((ex, j) => (
                  <div key={j} className="pl-3 border-l-2 border-teal-200">
                    <p className="text-sm text-slate-600 leading-relaxed">{ex}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
