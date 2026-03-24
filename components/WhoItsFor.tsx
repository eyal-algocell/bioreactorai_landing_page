const personas = [
  {
    role: 'Process Development Scientists',
    description: 'Accelerate process characterization. Run what-if scenarios in seconds, not days. Let the digital twin explore parameter space while you focus on the science.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    role: 'Manufacturing & MSAT Teams',
    description: 'Catch deviations early. Reduce batch failures. Maintain consistency at scale with an AI that monitors 24/7 and alerts you before problems become failures.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.083A1.5 1.5 0 014.5 17.03V6.97a1.5 1.5 0 011.536-1.223l5.384 3.083m0 0l5.384 3.083a1.5 1.5 0 010 2.614l-5.384 3.083" />
      </svg>
    ),
  },
  {
    role: 'Bioprocess Directors',
    description: 'Preserve institutional knowledge. Onboard new engineers faster. Make data-driven decisions across your portfolio with a system that remembers everything.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
]

export default function WhoItsFor() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">Who It&apos;s For</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Built for process engineers, by process engineers</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((p, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="p-3 w-fit rounded-xl bg-teal-50 text-teal-600 mb-5">
                {p.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">{p.role}</h3>
              <p className="text-slate-600 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
