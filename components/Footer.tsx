export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <p className="text-white font-bold text-lg">
              bioreactor<span className="text-teal-400">.ai</span>
            </p>
            <span className="text-slate-300 text-sm">by</span>
            <img src="/logos/algocell.png" alt="Algocell" className="h-4 w-auto brightness-0 invert opacity-70" />
          </div>
          <p className="text-slate-400 text-sm mb-6">
            Conversational AI for bioprocess monitoring
          </p>
        </div>
      </div>
    </footer>
  )
}
