const problems = [
  {
    icon: (
      <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'The 2AM deviation you discover at 9AM',
    description: 'Your DO controller drifts overnight. By morning, your cells are stressed and lactate is spiking. The batch is borderline — proceed or terminate? That\'s a $600K decision with incomplete data.',
    tag: 'Sound familiar?',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Scale-up surprises that cost millions',
    description: 'Your 50L fed-batch worked perfectly. At 500L, glucose depletion hits 8 hours early and titer drops 20%. Root cause analysis takes 3 weeks. Your next clinical batch is in 6 weeks.',
    tag: 'Every time.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'The knowledge walk-out',
    description: 'Your senior process engineer who knows exactly when to adjust feed rates just gave notice. Their replacement won\'t be trained for 6 months. You have 12 batches to run in the meantime.',
    tag: 'Terrifying.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Post-batch analysis paralysis',
    description: 'You have 15 data streams × 200 hours × 10 batches = 30,000 data points to analyze. Finding the root cause of your titer drop manually takes your team 2 weeks. The next batch starts Monday.',
    tag: 'Time you don\'t have.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-3">The reality of bioprocess today</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 max-w-2xl">
          You have the data. You need the answers.
        </h2>
        <p className="text-lg text-slate-600 mb-16 max-w-2xl">
          These scenarios happen every week in biotech. They cost millions. They shouldn&apos;t.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((p, i) => (
            <div key={i} className="group relative bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-6 right-6">
                <span className="text-xs font-medium text-slate-400 italic">{p.tag}</span>
              </div>
              <div className="mb-5 p-3 w-fit rounded-xl bg-white group-hover:bg-teal-50 transition-colors">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-600 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
