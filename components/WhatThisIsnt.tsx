const limitations = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Not a control system',
    description: 'Provides insights, you make decisions.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: 'Not a replacement',
    description: 'AI assistant, not AI autopilot.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Not predictive (yet)',
    description: 'Real-time analysis & historical comparison.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ),
    title: 'Not a black box',
    description: 'All answers cite data sources.',
  },
]

export default function WhatThisIsnt() {
  return (
    <section className="py-10 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-slate-500 text-xs uppercase tracking-wider font-medium mb-6">
          What this isn&apos;t (for now)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {limitations.map((item, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <span className="text-slate-400 mb-2">{item.icon}</span>
              <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
