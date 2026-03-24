export default function AIKnowledge() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Understands bioprocess. Knows your data.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Not a generic chatbot. An AI agent trained on bioprocess knowledge and your specific process.
          </p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200">
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {[
              'Trained on bioprocess knowledge (cell culture, fermentation, common issues)',
              'Learns from your historical batch data',
              'Understands the context of your specific process',
              'Gets smarter as you use it',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
