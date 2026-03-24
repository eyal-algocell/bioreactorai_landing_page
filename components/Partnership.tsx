export default function Partnership() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Partner with us
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We&apos;re onboarding bioprocess teams now. Limited availability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 border-2 border-teal-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">What you get</h3>
            <ul className="space-y-3">
              {[
                'Partnership program (6 months, no cost)',
                'Direct line to the team building this',
                'Direct influence on roadmap',
                'Priority access to new features',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">What we need</h3>
            <ul className="space-y-3">
              {[
                'Access to anonymized process data (for training)',
                'Weekly feedback calls (15-30 min)',
                'Honesty about what\'s useful vs. not',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 text-center">
          <p className="text-slate-300 text-lg mb-6">
            We&apos;re accepting partnership applications on a rolling basis. Limited spots available.
          </p>
          <a
            href="#waitlist"
            className="inline-block px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors"
          >
            Apply for Partnership
          </a>
        </div>
      </div>
    </section>
  )
}
