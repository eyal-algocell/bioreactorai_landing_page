export default function BioreactorShowcase() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-64 md:h-80">
        <img
          src="/images/bioreactor-hero.png"
          alt="Modern bioreactor in pharmaceutical laboratory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-slate-700 text-lg md:text-xl font-medium tracking-wide bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-slate-200/50">
            Built for the bioprocess you already run
          </p>
        </div>
      </div>
    </section>
  )
}
