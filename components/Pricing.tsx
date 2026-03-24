export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">Pricing & ROI</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Pays for itself with one prevented batch failure
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Investment range */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Investment</p>
                <p className="text-3xl font-bold text-slate-900 mb-2">$150K–$300K</p>
                <p className="text-slate-600">annually, depending on # of reactors and deployment model</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Implementation</p>
                <p className="text-3xl font-bold text-slate-900 mb-2">8–12 weeks</p>
                <p className="text-slate-600">from kickoff to first batch monitoring</p>
              </div>
            </div>
          </div>

          {/* ROI calculation */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border-2 border-teal-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">ROI Calculation Example</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Annual batches:</span>
                <span className="font-semibold text-slate-900">50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Historical failure rate:</span>
                <span className="font-semibold text-slate-900">5% (2.5 failures/year)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Average batch value at risk:</span>
                <span className="font-semibold text-slate-900">$800K (2000L mAb, clinical scale)</span>
              </div>
              <div className="flex justify-between items-center border-t border-teal-200 pt-3">
                <span className="text-slate-600">Current annual loss:</span>
                <span className="font-semibold text-red-600">$2M</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-teal-300">
              <p className="text-sm text-slate-600 mb-2">If bioreactor.ai prevents just <strong>2 failures</strong>:</p>
              <p className="text-2xl font-bold text-emerald-600 mb-1">$1.6M saved</p>
              <p className="text-slate-600 font-semibold">5–10x ROI in year one</p>
            </div>
          </div>

          {/* What's included */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">What&apos;s Included</h3>
            <ul className="space-y-3">
              {[
                'Model calibration using your historical data (30-50 batches)',
                'Integration with your SCADA/historian (OPC UA, OSIsoft PI, or custom)',
                'Training for your process engineering team (2-day workshop)',
                'Ongoing model updates as your process evolves',
                '24/7 system monitoring and support',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-200">
              <a
                href="#demo"
                className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors"
              >
                Get a Custom ROI Analysis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
