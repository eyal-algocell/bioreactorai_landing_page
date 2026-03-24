export default function Credibility() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">Our Foundation</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Grounded in physics, not just statistics.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-10">
            bioreactor.ai is built on AlgoSim, a mechanistic bioprocess simulator that models cell growth,
            metabolism, and feed strategies from first principles. When our AI makes a recommendation,
            it&apos;s backed by validated mass balance equations — not a black box.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              { stat: 'ODE-based', label: 'Mechanistic simulation engine' },
              { stat: '8+', label: 'Feed strategy models validated' },
              { stat: 'Real-time', label: 'Forward prediction capability' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <p className="text-2xl font-bold text-teal-600 mb-1">{item.stat}</p>
                <p className="text-slate-600 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
