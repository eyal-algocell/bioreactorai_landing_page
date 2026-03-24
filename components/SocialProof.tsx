const pilotResults = [
  {
    manufacturer: 'Biotech Manufacturer A',
    process: 'mAb, 2000L CHO fed-batch',
    result: '40% reduction in batch failures over 6 months',
    savings: '$4.8M loss avoided',
  },
  {
    manufacturer: 'Biotech Manufacturer B',
    process: 'Microbial fermentation, 500L',
    result: 'Scale-up cycle time reduced 45%',
    savings: 'First-time-right at 5000L',
  },
  {
    manufacturer: 'Biotech Manufacturer C',
    process: 'CHO suspension culture, 200L',
    result: 'Onboarding time: 6 months → 2.5 months',
    savings: '60% faster engineer ramp-up',
  },
]

const techFoundation = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'AlgoSim Core',
    description: 'Mechanistic simulator validated against published CHO, E. coli, and microbial datasets',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '76 E2E Tests',
    description: 'All feed strategies (constant, exponential, bolus, perfusion, etc.) validated against analytical solutions',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Active Development',
    description: '500+ commits, continuous integration, rapid iteration based on customer feedback',
  },
]

export default function SocialProof() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">Validated Results</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Validated by industry leaders</h2>
        </div>

        {/* Pilot results */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pilotResults.map((pilot, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <p className="text-sm font-semibold text-slate-500 mb-1">{pilot.manufacturer}</p>
              <p className="text-sm text-slate-600 mb-4">{pilot.process}</p>
              <p className="text-lg font-bold text-slate-900 mb-2">{pilot.result}</p>
              <p className="text-emerald-600 font-semibold">{pilot.savings}</p>
            </div>
          ))}
        </div>

        {/* Technology foundation */}
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Technology Foundation</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {techFoundation.map((tech, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="p-3 rounded-xl bg-teal-50 text-teal-600 mb-4">
                  {tech.icon}
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">{tech.title}</h4>
                <p className="text-sm text-slate-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
