const scenarios = [
  {
    num: '01',
    title: 'Mid-batch troubleshooting',
    scenario: 'You\'re at hour 72. Something feels off but all alarms are quiet.',
    instead: 'Instead of digging through historian data for an hour...',
    action: 'Compare this batch to my last 5 runs at the same timepoint',
    outcome: 'Instant visualization + analysis',
  },
  {
    num: '02',
    title: 'Knowledge at your fingertips',
    scenario: 'It\'s 11 PM. Your senior engineer isn\'t available. You need to make a call.',
    instead: 'Instead of guessing or waiting until morning...',
    action: 'Last time pH dropped this fast, what did we do?',
    outcome: 'Historical context + reasoning from past batches',
  },
  {
    num: '03',
    title: 'Faster post-batch analysis',
    scenario: 'Batch just finished. Titer is 15% below target.',
    instead: 'Instead of spending 2 days analyzing 30,000 data points...',
    action: 'What happened differently in this batch?',
    outcome: 'Multivariate analysis highlighting key deviations',
  },
]

export default function ExampleScenarios() {
  return (
    <section className="pt-16 pb-16 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            When you&apos;d use this
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Three situations where a conversational interface beats dashboards
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <div
              key={i}
              className="bg-navy-800 rounded-2xl p-7 border border-slate-700/40 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.06)] transition-all"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-teal-400 text-3xl font-bold font-mono opacity-60">{s.num}</span>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">{s.scenario}</p>
              <p className="text-slate-500 text-sm italic mb-4">{s.instead}</p>
              <div className="bg-teal-500/5 border-l-2 border-teal-400 rounded-r-lg px-4 py-3 mb-4">
                <p className="text-slate-200 text-sm font-medium">&ldquo;{s.action}&rdquo;</p>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-medium">
                {s.outcome}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
